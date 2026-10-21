import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./Components/Navbar";
import SummaryCard from "./Components/SummaryCard";
import GoalCard from "./Components/GoalCard";
import TransactionTable from "./Components/TransactionTable";
import AddTransaction from "./Components/AddTransaction";
import GoalModal from "./Components/GoalModal";
import MoneyTransferModal from "./Components/MoneyTransferModal";
import OpeningBalanceModal from "./Components/OpeningBalanceModal";


function Home() {

    const [dashboard, setDashboard] = useState({

    availableBalance: 0,

    allocated: 0,

    income: 0,

    expense: 0,

    savings: 0,

    goals: [],

    recentTransactions: []

});

    // ---------------- Transaction Modal ----------------

    const [showTransactionModal, setShowTransactionModal] = useState(false);

    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // ---------------- Goal Modal ----------------

    const [showGoalModal, setShowGoalModal] = useState(false);

    const [selectedGoal, setSelectedGoal] = useState(null);

    const [showMoneyModal, setShowMoneyModal] = useState(false);

    const [transferType, setTransferType] = useState("allocate");

    const [showOpeningBalanceModal, setShowOpeningBalanceModal] = useState(false);

    useEffect(() => {

        loadDashboard();

    }, []);

    // ====================================================

    // ====================================================
    // Dashboard
    // ====================================================

    const loadDashboard = async () => {

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

    // ====================================================
    // Delete Transaction
    // ====================================================

    const deleteTransaction = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this transaction?"

        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `/transactions/${id}`

            );

            loadDashboard();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ====================================================
    // Edit Transaction
    // ====================================================

    const editTransaction = (transaction) => {

        setSelectedTransaction(transaction);

        setShowTransactionModal(true);

    };

    // ====================================================
    // Delete Goal
    // ====================================================

    const deleteGoal = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this Goal?"

        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `/goals/${id}`

            );

            loadDashboard();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ====================================================
    // Edit Goal
    // ====================================================

    const editGoal = (goal) => {

        setSelectedGoal(goal);

        setShowGoalModal(true);

    };

    const allocateMoney = (goal) => {

    setSelectedGoal(goal);

    setTransferType("allocate");

    setShowMoneyModal(true);

};

const withdrawMoney = (goal) => {

    setSelectedGoal(goal);

    setTransferType("withdraw");

    setShowMoneyModal(true);

};

    // ====================================================
    // Today's Snapshot
    // ====================================================

    const today = new Date().toDateString();

    const todayIncome = dashboard.recentTransactions

        .filter(

            item =>

                item.type === "Income" &&

                new Date(item.date).toDateString() === today

        )

        .reduce(

            (sum, item) => sum + Number(item.amount),

            0

        );

    const todayExpense = dashboard.recentTransactions

        .filter(

            item =>

                item.type === "Expense" &&

                new Date(item.date).toDateString() === today

        )

        .reduce(

            (sum, item) => sum + Number(item.amount),

            0

        );

    // ====================================================
    // Greeting
    // ====================================================

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour < 17) {

        greeting = "Good Afternoon";

    }

  return (

    <>

        <Navbar />

        <div className="min-h-screen bg-slate-100 p-8">

            <h2 className="text-3xl font-bold text-slate-800">

                {greeting} 👋

            </h2>

            <p className="text-gray-500 mt-2">

                Welcome back to MoneyMate

            </p>

            {/* Balance */}

            <div className="mt-8 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-3xl p-8 text-white shadow-xl">

                <p className="text-lg">

                    Available Balance

                </p>

                <h1 className="text-5xl font-bold mt-4">

                   ₹ {Number(dashboard.availableBalance).toLocaleString()}

                </h1>

                <div className="mt-6 flex justify-between items-center">

                    <div>

                        <p className="text-sm opacity-80">

                            Opening Balance

                        </p>

                        <p className="text-xl font-semibold">

                            ₹ {Number(dashboard.openingBalance).toLocaleString()}

                        </p>

                    </div>

                    <button

                        onClick={() => setShowOpeningBalanceModal(true)}

                        className="bg-white text-emerald-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100"

                    >

                        {dashboard.openingBalance > 0

                            ? "Edit"

                            : "Set Opening Balance"}

                    </button>

                </div>

            </div>



            {/* Summary */}

            

               <div className="grid grid-cols-4 gap-6 mt-8">

    <SummaryCard
        title="Income"
        amount={dashboard.income}
        color="text-green-600"
    />

    <SummaryCard
        title="Expense"
        amount={dashboard.expense}
        color="text-red-600"
    />

    <SummaryCard
        title="Savings"
        amount={dashboard.savings}
        color="text-blue-600"
    />

    <SummaryCard
        title="Allocated"
        amount={dashboard.allocated}
        color="text-orange-600"
    />

</div>

            

            {/* Bottom */}

            <div className="grid grid-cols-3 gap-6 mt-8">

                {/* Left */}

                <div className="space-y-6">

                    {/* Today's Snapshot */}

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-bold">

                            📅 Today's Snapshot

                        </h2>

                        <div className="mt-5 space-y-3">

                            <div className="flex justify-between">

                                <span>

                                    Income

                                </span>

                                <span className="text-green-600 font-semibold">

                                    ₹ {todayIncome}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>

                                    Expense

                                </span>

                                <span className="text-red-600 font-semibold">

                                    ₹ {todayExpense}

                                </span>

                            </div>

                            <hr />

                            <div className="flex justify-between font-bold">

                                <span>

                                    Net

                                </span>

                                <span>

                                    ₹ {todayIncome - todayExpense}

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Goals */}

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-xl font-bold">

                                🎯 Financial Goals

                            </h2>

                            <button

                                onClick={() => {

                                    setSelectedGoal(null);

                                    setShowGoalModal(true);

                                }}

                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"

                            >

                                + Add Goal

                            </button>

                        </div>

                        {

                            dashboard.goals.length === 0 ?

                            (

                                <div className="text-center text-gray-500 py-10">

                                    No Goals Added Yet

                                </div>

                            )

                            :

                            (

                                <div className="space-y-5">

                                    {

                                        dashboard.goals.map((goal) => (

                                            <GoalCard

                                              key={goal._id}

                                             goal={goal}

                                            onAllocate={allocateMoney}

                                            onWithdraw={withdrawMoney}

                                            onEditGoal={editGoal}

                                            onDeleteGoal={deleteGoal}

/>

                                        ))

                                    }

                                </div>

                            )

                        }

                    </div>

                </div>

                {/* Right */}

                <div className="col-span-2">

                    <TransactionTable

                        transactions={dashboard.recentTransactions}

                        onEdit={editTransaction}

                        onDelete={deleteTransaction}

                    />

                </div>

            </div>
                        {/* Floating Add Transaction Button */}

            <button

                onClick={() => {

                    setSelectedTransaction(null);

                    setShowTransactionModal(true);

                }}

                className="fixed bottom-8 right-8 bg-emerald-600 hover:bg-emerald-700 text-white w-16 h-16 rounded-full shadow-2xl text-4xl flex justify-center items-center transition"

            >

                +

            </button>

            {/* Transaction Modal */}

            {

                showTransactionModal && (

                    <AddTransaction

                        transaction={selectedTransaction}

                        closeModal={() => {

                            setShowTransactionModal(false);

                            setSelectedTransaction(null);

                        }}

                        refreshDashboard={async () => {

                            await loadDashboard();

                            setShowTransactionModal(false);

                            setSelectedTransaction(null);

                        }}

                    />

                )

            }

            {/* Goal Modal */}

            {

                showGoalModal && (

                    <GoalModal

                        goal={selectedGoal}

                        closeModal={() => {

                            setShowGoalModal(false);

                            setSelectedGoal(null);

                        }}

                        refreshDashboard={async () => {

                            await loadDashboard();

                            setShowGoalModal(false);

                            setSelectedGoal(null);

                        }}
                        

                    />
                    


                )

            }
                                {
                        showMoneyModal && (

                            <MoneyTransferModal

                                goal={selectedGoal}

                                type={transferType}

                                availableBalance={dashboard.availableBalance}

                                closeModal={() => {

                                    setShowMoneyModal(false);

                                    setSelectedGoal(null);

                                }}

                                refreshDashboard={async () => {

                                    await loadDashboard();

                                    setShowMoneyModal(false);

                                    setSelectedGoal(null);

                                }}

                            />

                        )
                    }

                    {
    showOpeningBalanceModal && (

        <OpeningBalanceModal

            currentBalance={dashboard.openingBalance}

            closeModal={() =>

                setShowOpeningBalanceModal(false)

            }

            refreshDashboard={async () => {

                await loadDashboard();

                setShowOpeningBalanceModal(false);

            }}

        />

    )
}

        </div>

    </>

);

}

export default Home;