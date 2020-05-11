const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema(
  {
    // _id is generated automatically by Mongo
    // timestamp - createdAt everytime Pin is created or edited
    title: String,
    content: String,
    image: String,
    latitude: Number,
    longitude: Number,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User' // User Schema
    },
    comments: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now
        },
        author: {
          type: mongoose.Schema.ObjectId,
          ref: 'User' // User Schema
        }
      }
    ]
  },
  { timestamps: true }
);

// Pin collection and PinSchema schema
module.exports = mongoose.model('Pin', PinSchema);
