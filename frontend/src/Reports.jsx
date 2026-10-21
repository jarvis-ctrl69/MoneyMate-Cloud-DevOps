import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./Components/Navbar";

function Reports() {

    const [dashboard, setDashboard] = useState({

        openingBalance: 0,

        income: 0,

        expense: 0,

        savings: 0,

        allocated: 0,

        availableBalance: 0,

        goals: []

    });

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        getDashboard();

        getTransactions();

    }, []);

    const getDashboard = async () => {

        try {

            const res = await axios.get(
                "/dashboard"
            );

            setDashboard(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const getTransactions = async () => {

        try {

            const res = await axios.get(
                "/transactions"
            );

            setTransactions(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const expenseByCategory = {};

    transactions.forEach((item) => {

        if (item.type === "Expense") {

            if (!expenseByCategory[item.category]) {

                expenseByCategory[item.category] = 0;

            }

            expenseByCategory[item.category] += Number(item.amount);

        }

    });

    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-slate-100 p-8">

                <h1 className="text-3xl font-bold">

                    📊 Financial Reports

                </h1>

                <p className="text-gray-500 mt-2">

                    Overview of your financial journey

                </p>

                {/* Summary Cards */}

                <div className="grid grid-cols-5 gap-6 mt-8">

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-gray-500">

                            Income

                        </p>

                        <h2 className="text-3xl font-bold text-green-600 mt-2">

                            ₹ {Number(dashboard.income).toLocaleString()}

                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-gray-500">

                            Expense

                        </p>

                        <h2 className="text-3xl font-bold text-red-600 mt-2">

                            ₹ {Number(dashboard.expense).toLocaleString()}

                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-gray-500">

                            Savings

                        </p>

                        <h2 className="text-3xl font-bold text-emerald-600 mt-2">

                            ₹ {Number(dashboard.savings).toLocaleString()}

                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-gray-500">

                            Allocated

                        </p>

                        <h2 className="text-3xl font-bold text-orange-600 mt-2">

                            ₹ {Number(dashboard.allocated).toLocaleString()}

                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-gray-500">

                            Available Balance

                        </p>

                        <h2 className="text-3xl font-bold text-blue-600 mt-2">

                            ₹ {Number(dashboard.availableBalance).toLocaleString()}

                        </h2>

                    </div>

                </div>

                {/* Opening Balance */}

                <div className="bg-white rounded-xl shadow mt-8 p-6">

                    <h2 className="text-2xl font-bold">

                        💳 Opening Balance

                    </h2>

                    <h1 className="text-4xl font-bold text-indigo-600 mt-4">

                        ₹ {Number(dashboard.openingBalance).toLocaleString()}

                    </h1>

                </div>

                {/* Expense by Category */}

                <div className="bg-white rounded-xl shadow mt-8 p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        💸 Expense by Category

                    </h2>

                    {

                        Object.keys(expenseByCategory).length === 0 ?

                            (

                                <p className="text-gray-500">

                                    No Expense Data

                                </p>

                            )

                            :

                            (

                                Object.entries(expenseByCategory).map(

                                    ([category, amount]) => (

                                        <div

                                            key={category}

                                            className="flex justify-between border-b py-3"

                                        >

                                            <span>

                                                {category}

                                            </span>

                                            <span className="font-bold text-red-600">

                                                ₹ {Number(amount).toLocaleString()}

                                            </span>

                                        </div>

                                    )

                                )

                            )

                    }

                </div>

                {/* Goal Progress */}

                <div className="bg-white rounded-xl shadow mt-8 p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        🎯 Goal Progress

                    </h2>

                    {

                        dashboard.goals.length === 0 ?

                            (

                                <p className="text-gray-500">

                                    No Goals Added

                                </p>

                            )

                            :

                            (

                                dashboard.goals.map((goal) => {

                                    const percentage = Math.min(

                                        (goal.saved / goal.target) * 100,

                                        100

                                    );

                                    return (

                                        <div

                                            key={goal._id}

                                            className="mb-6"

                                        >

                                            <div className="flex justify-between mb-2">

                                                <span className="font-semibold">

                                                    {goal.title}

                                                </span>

                                                <span>

                                                    {percentage.toFixed(0)}%

                                                </span>

                                            </div>

                                            <div className="bg-gray-200 rounded-full h-3">

                                                <div

                                                    className="bg-emerald-500 h-3 rounded-full"

                                                    style={{

                                                        width: `${percentage}%`

                                                    }}

                                                ></div>

                                            </div>

                                            <div className="flex justify-between mt-2 text-sm text-gray-500">

                                                <span>

                                                    ₹ {Number(goal.saved).toLocaleString()}

                                                </span>

                                                <span>

                                                    ₹ {Number(goal.target).toLocaleString()}

                                                </span>

                                            </div>

                                        </div>

                                    );

                                })

                            )

                    }

                </div>

            </div>

        </>

    );

}

export default Reports;