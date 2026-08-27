const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professional",
        default: null
    },

    serviceName: {
        type: String,
        required: true
    },

    bookingTime: {
        type: String,
        required: true
    },

    bookingDate: {
        type: Date,
        required: true
    },

    quantity: {
        type: Number,
        default: 1,
        min: 1
    },

    price: {
        type: Number,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "pending",
            "accepted",
            "in_progress",
            "completed",
            "cancelled"
        ],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: [
            "pending",
            "paid",
            "failed",
            "refunded"
        ],
        default: "pending"
    },

    address: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = { BookingSchema };