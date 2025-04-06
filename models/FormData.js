const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  assemblyPoll: String,
  wordNo: String,
  boothNo: String,
  responses: [Boolean] // [true, false, true, ...]
}, { timestamps: true });

module.exports = mongoose.model('FormData', formDataSchema);
