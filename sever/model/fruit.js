var mongoose = require("mongoose");
const fruitShema= new mongoose.Schema({
    name:{type: String},
    quantity:{type: Number},
    price:{type: Number},
    status:{type: Number},
    id_distributor:{ type: mongoose.SchemaTypes.ObjectId, ref:'distributor'}

})
const Fruit = mongoose.model('fruit',fruitShema);


module.exports = Fruit;