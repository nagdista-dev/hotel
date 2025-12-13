import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
_id : {type : String , required: true}, 
username: {type : String , required : true},
email: {type : String , required : true },
image: {type : String , required : true },
recentSearchCities:[ {type : String , required : true }],
role: {type : String , enum : ['user','hotelOwner'] , default:"user"},
},{timestamps : true})

const User = mongoose.model("User",userScheme);
export default User; 