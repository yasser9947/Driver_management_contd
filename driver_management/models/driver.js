const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverSchema = new Schema({
name : {type:String},
age : {type:String},
cars: [{type: Schema.Types.ObjectId, ref: 'Car'}]
},{timestamps: true}

)

const Driver = mongoose.model('Driver', driverSchema)
module.exports = Driver;
