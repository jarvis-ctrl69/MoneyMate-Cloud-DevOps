import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./Components/Navbar";
import TransactionTable from "./Components/TransactionTable";
import AddTransaction from "./Components/AddTransaction";

function Ledger() {

    const [transactions, setTransactions] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {

        getTransactions();

    }, []);

    const getTransactions = async () => {

        try {

            const res = await axios.get(

                `/transactions?search=${search}`

            );

            setTransactions(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        getTransactions();

    }, [search]);

    const deleteTransaction = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this transaction?"

        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `/transactions/${id}`

            );

            getTransactions();

        }

        catch (err) {

            console.log(err);

        }

    };

    const editTransaction = (transaction) => {

        setSelectedTransaction(transaction);

        setShowModal(true);

    };

        return (

        <>

            <Navbar />

            <div className="min-h-screen bg-slate-100 p-8">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Ledger

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Complete Transaction History

                        </p>

                    </div>

                    <button

                        onClick={() => {

                            setSelectedTransaction(null);

                            setShowModal(true);

                        }}

                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl"

                    >

                        + Add Transaction

                    </button>

                </div>

                {/* Search */}

                <div className="bg-white rounded-xl shadow-md p-5 mt-8">

                    <div className="flex justify-between items-center">

                        <input

                            type="text"

                            placeholder="Search Description..."

                            value={search}

                            onChange={(e) =>

                                setSearch(e.target.value)

                            }

                            className="border rounded-lg p-3 w-96"

                        />

                        <div className="text-gray-600 font-semibold">

                            Total Records : {transactions.length}

                        </div>

                    </div>

                </div>

                {/* Table */}

                <div className="mt-8">

                    <TransactionTable

                        transactions={transactions}

                        onEdit={editTransaction}

                        onDelete={deleteTransaction}

                    />

                </div>

                {

                    showModal &&

                    <AddTransaction

                        transaction={selectedTransaction}

                        closeModal={() => {

                            setShowModal(false);

                            setSelectedTransaction(null);

                        }}

                        refreshDashboard={async () => {

                            await getTransactions();

                            setShowModal(false);

                            setSelectedTransaction(null);

                        }}

                    />

                }

            </div>

        </>

    );

}

export default Ledger;