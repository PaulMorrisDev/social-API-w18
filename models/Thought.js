const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => {
      // Format the timestamp using your desired format (e.g., using Moment.js)
      // YOU NEED TO INSERT TIME FORMAT HERE 
      return formatDateSomehow(timestamp);
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [{
    // Define the structure of the reaction here, e.g.:
    reactionType: String, // Like, Love, etc.
    reactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  }
});

// Define a virtual property 'reactionCount'
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;