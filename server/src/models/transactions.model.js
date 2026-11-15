import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    amount: {
        type: Number,
        required: true,
    },
    movement: {
        type: String,
        enum: ["Ingreso", "Consumo"],
        required: true,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
},{ timestamps: true });

export const transactionsModel = mongoose.model('Transactions', transactionSchema);