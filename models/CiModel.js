// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

// 2.Defining Schema
const ciSchema = new mongoose.Schema({
  ci_url: {type: String, required: true},
  create_user: {type: String, required: true},
  reference: {type: String},
  create_time: {type: String, default: formattedDate},
},{versionKey: false})

// 3. Creating ci Model
const CiModel = mongoose.model('ci', ciSchema)

// 4. Exporting the Application Model
module.exports = CiModel