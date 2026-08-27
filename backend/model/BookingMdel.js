const {model} = require('mongoose');

const {BookingSchema} = require('../schemas/BookingSchema');

const BookingModel = new model("booking",BookingSchema);

module.exports = {BookingModel};