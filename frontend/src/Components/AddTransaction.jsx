import { useState, useEffect } from "react";
import axios from "axios";

function AddTransaction({
    transaction,
    closeModal,
    refreshDashboard
}) {

    const incomeCategories = [
        "Salary",
        "Rapido",
        "Freelance",
        "Interest",
        "Gift",
        "Other"
    ];

    const expenseCategories = [
        "Food",
        "Fuel",
        "Shopping",
        "Medical",
        "Bills",
        "Entertainment",
        "Travel",
        "Investment",
        "Other"
    ];

    const [form, setForm] = useState({

        amount: "",

        type: "Expense",

        category: "Food",

        description: "",

        date: new Date().toISOString().split("T")[0]

    });

    useEffect(() => {

        if (transaction) {

            setForm({

                amount: transaction.amount,

                type: transaction.type,

                category: transaction.category,

                description: transaction.description,

                date: transaction.date.split("T")[0]

            });

        }

    }, [transaction]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "type") {

            setForm({

                ...form,

                type: value,

                category: value === "Income"
                    ? "Salary"
                    : "Food"

            });

        }

        else {

            setForm({

                ...form,

                [name]: value

            });

        }

    };

    const saveTransaction = async () => {

        if (
            form.amount === "" ||
            form.description.trim() === ""
        ) {

            alert("Please fill all fields.");

            return;

        }

        try {

            if (transaction) {

                await axios.put(

                    `/transactions/${transaction._id}`,

                    form

                );

                alert("Transaction Updated Successfully");

            }

            else {

                await axios.post(

                    "/transactions",

                    form

                );

                alert("Transaction Added Successfully");

            }

            await refreshDashboard();

            closeModal();

        }

        catch (err) {

            console.log(err);

            alert("Something went wrong.");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white w-[500px] rounded-2xl shadow-2xl p-8">

                <h1 className="text-3xl font-bold mb-8">

                    {

                        transaction

                            ? "Edit Transaction"

                            : "Add Transaction"

                    }

                </h1>

                <div className="space-y-5">

                    <input

                        type="number"

                        name="amount"

                        value={form.amount}

                        onChange={handleChange}

                        placeholder="Amount"

                        className="w-full border rounded-lg p-3"

                    />

                    <select

                        name="type"

                        value={form.type}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    >

                        <option value="Income">

                            Income

                        </option>

                        <option value="Expense">

                            Expense

                        </option>

                    </select>

                    <select

                        name="category"

                        value={form.category}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    >

                        {

                            form.type === "Income"

                                ?

                                incomeCategories.map((item) => (

                                    <option

                                        key={item}

                                        value={item}

                                    >

                                        {item}

                                    </option>

                                ))

                                :

                                expenseCategories.map((item) => (

                                    <option

                                        key={item}

                                        value={item}

                                    >

                                        {item}

                                    </option>

                                ))

                        }

                    </select>

                    <input

                        type="text"

                        name="description"

                        value={form.description}

                        onChange={handleChange}

                        placeholder="Description"

                        className="w-full border rounded-lg p-3"

                    />

                    <input

                        type="date"

                        name="date"

                        value={form.date}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    />

                </div>

                <div className="flex justify-end gap-4 mt-8">

                    <button

                        onClick={closeModal}

                        className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={saveTransaction}

                        className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"

                    >

                        {

                            transaction

                                ? "Update Transaction"

                                : "Save Transaction"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddTransaction;