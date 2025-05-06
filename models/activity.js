const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  dateTime: {
    type: Date,

    default: Date.now, 
  },
});

module.exports = mongoose.model('Activity', activitySchema);
