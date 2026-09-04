require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser")

const authRoute = require("./Routes/AuthRoute")
const verifyToken = require("./Middlewares/AuthMiddlewares");

const { ServicesModel } = require('./model/ServicesModel')
const { BookingModel } = require('./model/BookingMdel')

const PORT = process.env.PORT || 3002
const uri = process.env.MONGO_URI;

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
    .connect(uri)
    .then(() => {
        console.log("DB connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

// app.get('/services',async(req,res)=>{
//     let tempServices = [

//     {
//         name: "AC Repair & Service",
//         category: "AC Repair",
//         price: 299,
//         rating: 4.8,
//         reviews: 120,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804568/ac-repair.avif"
//     },

//     {
//         name: "AC Installation",
//         category: "AC Repair",
//         price: 499,
//         rating: 4.2,
//         reviews: 95,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804567/ac-installation.webp"
//     },

//     {
//         name: "AC Gas Refilling",
//         category: "AC Repair",
//         price: 449,
//         rating: 3.8,
//         reviews: 86,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804567/ac-gas.webp"
//     },

//     {
//         name: "AC Deep Cleaning",
//         category: "AC Repair",
//         price: 399,
//         rating: 4.1,
//         reviews: 74,
//         image:"https://res.cloudinary.com/dldun2chs/image/upload/v1787804566/ac-cleaning.webp"
//     },

//     {
//         name: "AC Annual Maintenance",
//         category: "AC Repair",
//         price: 599,
//         rating: 4.9,
//         reviews: 63,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804568/ac-maintenance.webp"
//     },

//     {
//         name: "AC Duct Cleaning",
//         category: "AC Repair",
//         price: 499,
//         rating: 3.6,
//         reviews: 58,
//         image:"https://res.cloudinary.com/dldun2chs/image/upload/v1787804567/ac-duct.jpg"
//     },


//     {
//         name: "Full Home Cleaning",
//         category: "Cleaning",
//         price: 799,
//         rating: 4.5,
//         reviews: 112,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804569/home-cleaning.avif"
//     },

//     {
//         name: "Bathroom Cleaning",
//         category: "Cleaning",
//         price: 399,
//         rating: 3.9,
//         reviews: 91,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804568/bathroom-cleaning.jpg"
//     },


//     {
//         name: "Women's Haircut",
//         category: "Salon",
//         price: 299,
//         rating: 4.7,
//         reviews: 145,
//         image:"https://res.cloudinary.com/dldun2chs/image/upload/v1787804568/haircut.avif"
//     },

//     {
//         name: "Hair Spa",
//         category: "Salon",
//         price: 599,
//         rating: 4.3,
//         reviews: 87,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804569/hair-spa.avif"
//     },


//     {
//         name: "Electrician Service",
//         category: "Electrician",
//         price: 199,
//         rating: 3.7,
//         reviews: 72,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804568/electrician.avif"
//     },


//     {
//         name: "Plumbing Service",
//         category: "Plumbing",
//         price: 249,
//         rating: 4.0,
//         reviews: 64,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804570/plumbing.jpg"
//     },


//     {
//         name: "Home Painting",
//         category: "Painting",
//         price: 999,
//         rating: 3.5,
//         reviews: 43,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804569/painting.jpg"
//     },


//     {
//         name: "Washing Machine Repair",
//         category: "Appliance Repair",
//         price: 349,
//         rating: 4.4,
//         reviews: 55,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804570/washing-machine.webp"
//     },


//     {
//         name: "Pest Control Service",
//         category: "Pest Control",
//         price: 699,
//         rating: 3.9,
//         reviews: 48,
//         image: "https://res.cloudinary.com/dldun2chs/image/upload/v1787804569/pest-control.jpg"
//     }

//     ];

//     tempServices.forEach((item)=>{
//         let newService = new ServicesModel({
//             name: item.name ,
//             category: item.category,
//             price: item.price,
//             rating: item.rating,
//             reviews: item.reviews,
//             image: item.image,
//         });
//         newService.save();
//     })
//     res.send("Done!")
// });

app.get('/allservices', async (req, res) => {
    let allServices = await ServicesModel.find({});
    res.json(allServices);
});

app.post("/newbooking", verifyToken, async (req, res) => {

    try {

        const newBooking = new BookingModel({

            user: req.userId,

            service: req.body.service,

            professional: req.body.professional || null,

            serviceName: req.body.serviceName,

            bookingTime: req.body.bookingTime,

            bookingDate: req.body.bookingDate,

            quantity: req.body.quantity || 1,

            price: req.body.price,

            totalAmount: req.body.totalAmount,

            address: req.body.address,

            status: req.body.status || "pending",

            paymentStatus: req.body.paymentStatus || "pending",
        });

        await newBooking.save();

        res.send("Booking saved!");

    } catch (error) {

        console.error(error);

        res.status(500).send("Error saving booking");

    }
});

app.get("/mybookings", verifyToken, async (req, res) => {
    try {

        const bookings = await BookingModel
            .find({ user: req.userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            bookings,
        });

    } catch (error) {

        console.error("My Bookings Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch bookings",
        });
    }
});

app.use("/", authRoute);
app.listen(PORT, () => {
    console.log("app started")
   
})