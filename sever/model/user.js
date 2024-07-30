var mongoose = require("mongoose");
const UserShema = new mongoose.Schema({
    fullname:{type: String},
    email:{type: String},
    password:{type: String},
    phone:{type: String},
    address:{type: String}
})
const User = mongoose.model('User',UserShema);


module.exports = User;