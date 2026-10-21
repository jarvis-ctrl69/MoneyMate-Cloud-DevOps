import { Pencil, Trash2 } from "lucide-react";

function GoalCard({

    goal,

    onEditGoal,

    onDeleteGoal,

    onAllocate,

    onWithdraw

}) {

    const percentage = Math.min(

        (goal.saved / goal.target) * 100,

        100

    );

    const remaining = goal.target - goal.saved;

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 border">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">

                    🎯 {goal.title}

                </h2>

                <div className="text-sm text-gray-500">

                    {percentage.toFixed(0)}%

                </div>

            </div>

            <div className="mt-5 space-y-2">

                <div className="flex justify-between">

                    <span>Allocated</span>

                    <span className="font-semibold text-green-600">

                        ₹ {Number(goal.saved).toLocaleString()}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Target</span>

                    <span className="font-semibold">

                        ₹ {Number(goal.target).toLocaleString()}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Remaining</span>

                    <span className="font-semibold text-red-500">

                        ₹ {Number(remaining).toLocaleString()}

                    </span>

                </div>

            </div>

            {/* Progress Bar */}

            <div className="w-full h-3 bg-gray-200 rounded-full mt-5">

                <div

                    className="h-3 bg-emerald-500 rounded-full"

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

            {/* Buttons */}

            <div className="grid grid-cols-2 gap-3 mt-6">

                <button

                    onClick={() => onAllocate(goal)}

                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg"

                >

                    Allocate

                </button>

                <button

                    onClick={() => onWithdraw(goal)}

                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"

                >

                    Withdraw

                </button>

                <button

                    onClick={() => onEditGoal(goal)}

                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"

                >

                    Edit

                </button>

                <button

                    onClick={() => onDeleteGoal(goal._id)}

                    className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"

                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default GoalCard;