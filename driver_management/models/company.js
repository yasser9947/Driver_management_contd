// Lets think about this for a second, what fields and data types do we require to build our models.
// Company should have a :name, :logo, :address, :city, :telephone, :createdAt,
//  :updatedAt and :whatever.you.see.fit.
// Company should also a have driver: hmm... we should add a :driver and embedded in driver
// , we need to know driver needs a :name, :age, :image
// Company should also have a car: for car I'd leave this to you to figure out what you need for this.
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name: String,
    logo: String,
    address: String,
    city: String,
    telephone: Number,
    drivers: [{type: Schema.Types.ObjectId, ref: 'Driver'}],
    cars: [{type: Schema.Types.ObjectId, ref: 'Car'}],
}, {
    timestamps: true
})

const Company = mongoose.model('Company', companySchema)
module.exports = Company;