import { useState } from "react";
import axios from "axios";

function OpeningBalanceModal({

    closeModal,

    refreshDashboard,

    currentBalance

}) {

    const [amount, setAmount] = useState(currentBalance || "");

    const saveOpeningBalance = async () => {

        if (amount === "" || Number(amount) < 0) {

            alert("Enter a valid amount");

            return;

        }

        try {

            await axios.post(

                "/opening-balance",

                {

                    amount: Number(amount)

                }

            );

            alert("Opening Balance Saved");

            await refreshDashboard();

            closeModal();

        }

        catch (err) {

            console.log(err);

            alert("Failed to save opening balance");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-[450px] rounded-2xl shadow-2xl p-8">

                <h1 className="text-3xl font-bold mb-6">

                    💳 Opening Balance

                </h1>

                <p className="text-gray-500 mb-5">

                    Enter your current bank balance.

                    This is NOT considered as income.

                </p>

                <input

                    type="number"

                    value={amount}

                    onChange={(e) =>

                        setAmount(e.target.value)

                    }

                    placeholder="Enter Current Balance"

                    className="w-full border rounded-lg p-3"

                />

                <div className="flex justify-end gap-4 mt-8">

                    <button

                        onClick={closeModal}

                        className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={saveOpeningBalance}

                        className="px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"

                    >

                        Save

                    </button>

                </div>

            </div>

        </div>

    );

}

export default OpeningBalanceModal;