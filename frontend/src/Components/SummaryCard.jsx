function SummaryCard({ title, amount, color }) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">

            <p className="text-gray-500 text-lg">

                {title}

            </p>

            <h1 className={`text-4xl font-bold mt-4 ${color}`}>

                ₹ {Number(amount).toLocaleString()}

            </h1>

        </div>

    );

}

export default SummaryCard;