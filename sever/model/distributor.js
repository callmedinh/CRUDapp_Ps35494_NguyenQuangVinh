const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const distributor = new Schema({
    name: {type: String},
},{

    timestamps: true
})

module.exports = mongoose.model('distributor',distributor);