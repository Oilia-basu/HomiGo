const {Schema} =require('mongoose');
const UserSchema = new Schema({
  fullname:{
    type:String,
    required:[true, "Write your name"]
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  phoneNo: {
    type:Number,
    required:[true,"Enter your mobile number"]
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = {UserSchema}