import { Pencil, Trash2 } from "lucide-react";

function TransactionTable({
    transactions,
    onEdit,
    onDelete
}) {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-slate-800">

                    Recent Transactions

                </h2>

                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">

                    {transactions.length} Transactions

                </span>

            </div>

            {
                transactions.length === 0 ?

                    (

                        <div className="text-center py-16">

                            <h2 className="text-2xl font-semibold text-gray-500">

                                No Transactions Found

                            </h2>

                            <p className="text-gray-400 mt-2">

                                Click the + button to add your first transaction.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b bg-slate-100">

                                        <th className="text-left px-4 py-4">

                                            Date

                                        </th>

                                        <th className="text-left px-4 py-4">

                                            Description

                                        </th>

                                        <th className="text-left px-4 py-4">

                                            Category

                                        </th>

                                        <th className="text-center px-4 py-4">

                                            Type

                                        </th>

                                        <th className="text-right px-4 py-4">

                                            Amount

                                        </th>

                                        <th className="text-center px-4 py-4">

                                            Action

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        transactions.map((item) => (

                                            <tr

                                                key={item._id}

                                                className="border-b hover:bg-slate-50 transition"

                                            >

                                                <td className="px-4 py-4">

                                                    {

                                                        new Date(item.date)

                                                            .toLocaleDateString()

                                                    }

                                                </td>

                                                <td className="px-4 py-4">

                                                    {item.description}

                                                </td>

                                                <td className="px-4 py-4">

                                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">

                                                        {item.category}

                                                    </span>

                                                </td>

                                                <td className="text-center">

                                                    {

                                                        item.type === "Income"

                                                            ?

                                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                                                Income

                                                            </span>

                                                            :

                                                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                                                                Expense

                                                            </span>

                                                    }

                                                </td>

                                                <td
                                                    className={`text-right font-bold px-4 ${
                                                        item.type === "Income"
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >

                                                    {

                                                        item.type === "Income"

                                                            ?

                                                            `+ ₹${item.amount}`

                                                            :

                                                            `- ₹${item.amount}`

                                                    }

                                                </td>

                                                <td className="text-center">

                                                    <button

                                                        onClick={() => onEdit(item)}

                                                        className="text-blue-600 hover:text-blue-800 mr-3"

                                                    >

                                                        <Pencil size={18} />

                                                    </button>

                                                    <button

                                                        onClick={() => onDelete(item._id)}

                                                        className="text-red-600 hover:text-red-800"

                                                    >

                                                        <Trash2 size={18} />

                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    )

            }

        </div>

    );

}

export default TransactionTable;