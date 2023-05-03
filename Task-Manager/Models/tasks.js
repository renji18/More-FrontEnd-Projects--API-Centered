const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide a name'],
    trim: true,
    maxlength: [40, 'name cannot be more than 40 characters'],
  },
  completed:{
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Task', TaskSchema)