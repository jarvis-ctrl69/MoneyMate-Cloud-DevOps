import { useState } from "react";
import axios from "axios";

function MoneyTransferModal({

    goal,

    type,

    availableBalance,

    closeModal,

    refreshDashboard

}) {

    const [amount, setAmount] = useState("");

    const handleSubmit = async () => {

        if (!amount || Number(amount) <= 0) {

            alert("Enter a valid amount");

            return;

        }

        try {

            const url =
                type === "allocate"
                    ? `/goals/${goal._id}/allocate`
                    : `/goals/${goal._id}/withdraw`;

            await axios.put(url, {

                amount: Number(amount)

            });

            alert(

                type === "allocate"

                    ? "Money Allocated Successfully"

                    : "Money Withdrawn Successfully"

            );

            await refreshDashboard();

            closeModal();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Something went wrong"

            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-[420px] rounded-2xl shadow-2xl p-8">

                <h1 className="text-2xl font-bold mb-6">

                    {type === "allocate"

                        ? "💰 Allocate Money"

                        : "💸 Withdraw Money"}

                </h1>

                <div className="space-y-4">

                    <div>

                        <p className="text-gray-500">

                            Goal

                        </p>

                        <p className="font-semibold">

                            {goal.title}

                        </p>

                    </div>

                    {

                        type === "allocate"

                        ?

                        <div>

                            <p className="text-gray-500">

                                Available Balance

                            </p>

                            <p className="text-green-600 font-bold">

                                ₹ {Number(availableBalance).toLocaleString()}

                            </p>

                        </div>

                        :

                        <div>

                            <p className="text-gray-500">

                                Allocated Amount

                            </p>

                            <p className="text-blue-600 font-bold">

                                ₹ {Number(goal.saved).toLocaleString()}

                            </p>

                        </div>

                    }

                    <input

                        type="number"

                        placeholder="Enter Amount"

                        value={amount}

                        onChange={(e) =>

                            setAmount(e.target.value)

                        }

                        className="w-full border rounded-lg p-3"

                    />

                </div>

                <div className="flex justify-end gap-4 mt-8">

                    <button

                        onClick={closeModal}

                        className="bg-gray-300 px-5 py-2 rounded-lg"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleSubmit}

                        className={`px-5 py-2 rounded-lg text-white ${
                            type === "allocate"

                                ? "bg-emerald-600 hover:bg-emerald-700"

                                : "bg-blue-600 hover:bg-blue-700"
                        }`}

                    >

                        {

                            type === "allocate"

                            ? "Allocate"

                            : "Withdraw"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default MoneyTransferModal;