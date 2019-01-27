const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userEventSchema = new Schema({
  title: String,
  date: Date,
  description: String,
  findOutMore:String,
  eventPhoto: String,

},{timestamps:true});

const UserEvent = mongoose.model('UserEvent',userEventSchema)

module.exports = UserEvent
