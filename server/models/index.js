const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LeaderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
    default:0
  },
});
module.exports = mongoose.model("Leader", LeaderSchema);
