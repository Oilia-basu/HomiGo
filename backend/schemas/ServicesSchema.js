const {Schema} =require('mongoose');

const ServicesSchema = new Schema({
        name: String ,
        category: String,
        price: Number,
        rating: Number,
        reviews: Number,
        image: String,
})

module.exports = {ServicesSchema}