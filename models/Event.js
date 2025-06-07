const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date
  },
  description: {
    type: String
    },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
});

module.exports = mongoose.model('Event', eventSchema);
