const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone  : {type :String}, 
    addresss : {type : Array}, 
    password : {type :String}, 
    reviewsId :{type :String},
    cartId : {type :String},
    orders : {type :Array},
    wishlistId  : {type : String}, 
    currency : {type : String}, 
    language : {type : String}, 
    country : {type:String},
    city : {type : String},  
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
