const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "MoneyMate Backend"
    });
});

const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/MoneyMate";

mongoose.connect(MONGO_URI)
.then(() => {

    console.log("✅ MongoDB Connected");

})
.catch((err) => {

    console.log(err);

});

// =======================================================
// Transaction Schema
// =======================================================

const transactionSchema = new mongoose.Schema({

    amount: {

        type: Number,

        required: true

    },

    type: {

        type: String,

        required: true

    },

    category: {

        type: String,

        required: true

    },

    description: {

        type: String,

        required: true

    },

    date: {

        type: Date,

        required: true

    }

});

const Transaction = mongoose.model(

    "Transaction",

    transactionSchema

);

// =======================================================
// Goal Schema
// =======================================================

const goalSchema = new mongoose.Schema({

    title: {

        type: String,

        required: true

    },

    target: {

        type: Number,

        required: true

    },

    saved: {

        type: Number,

        default: 0

    },

    createdAt: {

        type: Date,

        default: Date.now

    }

});

const Goal = mongoose.model(

    "Goal",

    goalSchema

);

// =======================================================
// ADD TRANSACTION
// =======================================================

app.post("/transactions", async (req, res) => {

    try {

        const transaction = new Transaction(req.body);

        await transaction.save();

        res.json({

            success: true,

            message: "Transaction Added"

        });

    }

    catch (err) {

        res.status(500).json(err);

    }

});

// =======================================================
// GET ALL TRANSACTIONS
// =======================================================

app.get("/transactions", async (req, res) => {

    try {

        const search = req.query.search || "";

        const transactions = await Transaction.find({

            description: {

                $regex: search,

                $options: "i"

            }

        }).sort({

            date: -1

        });

        res.json(transactions);

    }

    catch (err) {

        res.status(500).json(err);

    }

});

// =======================================================
// UPDATE TRANSACTION
// =======================================================

app.put("/transactions/:id", async (req, res) => {

    try {

        await Transaction.findByIdAndUpdate(

            req.params.id,

            req.body

        );

        res.json({

            success: true,

            message: "Transaction Updated"

        });

    }

    catch (err) {

        res.status(500).json(err);

    }

});

// =======================================================
// DELETE TRANSACTION
// =======================================================

app.delete("/transactions/:id", async (req, res) => {

    try {

        await Transaction.findByIdAndDelete(

            req.params.id

        );

        res.json({

            success: true,

            message: "Transaction Deleted"

        });

    }

    catch (err) {

        res.status(500).json(err);

    }

});

// =======================================================
// ADD GOAL
// =======================================================

app.post("/goals", async (req, res) => {

    try {

        const goal = new Goal(req.body);

        await goal.save();

        res.json({

            success: true,

            message: "Goal Added"

        });

    }

    catch (err) {

        res.status(500).json(err);

    }

});

// =======================================================
// GET ALL GOALS
// =======================================================

app.get("/goals", async (req, res) => {

    try {

        const goals = await Goal.find()

        .sort({

            createdAt: -1

        });

        res.json(goals);

    }

    catch (err) {

        res.status(500).json(err);

    }

});

// =======================================================
// UPDATE GOAL
// =======================================================

app.put("/goals/:id", async (req, res) => {

    try {

        await Goal.findByIdAndUpdate(

            req.params.id,

            req.body

        );

        res.json({

            success: true,

            message: "Goal Updated"

        });

    }

    catch (err) {

        res.status(500).json(err);

    }

});

// =======================================================
// DELETE GOAL
// =======================================================

app.delete("/goals/:id", async (req, res) => {

    try {

        await Goal.findByIdAndDelete(

            req.params.id

        );

        res.json({

            success: true,

            message: "Goal Deleted"

        });

    }

    catch (err) {

        res.status(500).json(err);

    }

});

// =======================================================
// DASHBOARD
// =======================================================

app.get("/dashboard", async (req, res) => {


    try {

        const transactions = await Transaction.find();

        let income = 0;

        let expense = 0;

        transactions.forEach((item) => {

            if (item.type === "Income") {

                income += Number(item.amount);

            }

            else {

                expense += Number(item.amount);

            }

        });
const setting = await Setting.findOne();

const openingBalance = setting ? setting.openingBalance : 0;

const savings = openingBalance + income - expense;

const goals = await Goal.find()

            .sort({

                createdAt: -1

            });

        

const allocated = goals.reduce(

    (sum, goal) => sum + Number(goal.saved),

    0

);

const availableBalance = savings - allocated;

        const recentTransactions = await Transaction.find()

            .sort({

                date: -1

            })

            .limit(5);

        

        res.json({

    openingBalance,

    income,

    expense,

    savings,

    allocated,

    availableBalance,

    goals,

    recentTransactions

});

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});
// =======================================================
// ALLOCATE MONEY
// =======================================================

app.put("/goals/:id/allocate", async (req, res) => {

    try {

        const amount = Number(req.body.amount);

        if (amount <= 0) {

            return res.status(400).json({

                message: "Enter Valid Amount"

            });

        }

        const transactions = await Transaction.find();

        let income = 0;

        let expense = 0;

        transactions.forEach((item) => {

            if (item.type === "Income") {

                income += item.amount;

            }

            else {

                expense += item.amount;

            }

        });

        const setting = await Setting.findOne();

        const openingBalance = setting ? setting.openingBalance : 0;

        const savings = openingBalance + income - expense;

        const goals = await Goal.find();

        const allocated = goals.reduce(

            (sum, goal) => sum + Number(goal.saved),

            0

        );

        const availableBalance = savings - allocated;

        if (amount > availableBalance) {

            return res.status(400).json({

                message: "Insufficient Available Balance"

            });

        }

        const goal = await Goal.findById(req.params.id);

        goal.saved = Number(goal.saved) + amount;

        await goal.save();

        res.json({

            success: true,

            message: "Money Allocated"

        });

    }

    catch (err) {

        res.status(500).json(err);

    }

});
// =======================================================
// WITHDRAW MONEY
// =======================================================

app.put("/goals/:id/withdraw", async (req, res) => {

    try {

        const amount = Number(req.body.amount);

        const goal = await Goal.findById(req.params.id);

        if (amount > goal.saved) {

            return res.status(400).json({

                message: "Cannot Withdraw More Than Allocated"

            });

        }

        goal.saved = Number(goal.saved) - amount;

        await goal.save();

        res.json({

            success: true,

            message: "Money Withdrawn"

        });

    }

    catch (err) {

        res.status(500).json(err);

    }

});

//===
const settingSchema = new mongoose.Schema({

    openingBalance: {

        type: Number,

        default: 0

    }

});

app.post("/opening-balance", async (req, res) => {

    try {

        await Setting.deleteMany();

        const setting = new Setting({

            openingBalance: Number(req.body.amount)

        });

        await setting.save();

        res.json({

            success: true

        });

    }

    catch (err) {

        res.status(500).json(err);

    }

});

const Setting = mongoose.model("Setting", settingSchema);
// =======================================================
// SERVER
// =======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Running On Port ${PORT}`);
});