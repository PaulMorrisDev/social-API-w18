const { Schema } = require('mongoose');

// Schema for what makes up a comment
const reactionSchema = new Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
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
    default: Date.now,
    get: (timestamp) => {
      // Format the timestamp using your desired format (e.g., using Moment.js)
      // ADD TIME STAMP
      return formatDateSomehow(timestamp);
    }
  }
});

module.exports = reactionSchema;



// Initialize the Comment model
// const Comment = model('comment', commentSchema);



