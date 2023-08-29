const { Schema, Types } = require('mongoose'); // Import Types from mongoose

// Schema for what makes up a comment
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId() // Use mongoose.Types.ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
    // You can also remove the 'get' function for timestamp formatting
  }
});

module.exports = reactionSchema;



// Initialize the Comment model
// const Comment = model('comment', commentSchema);



