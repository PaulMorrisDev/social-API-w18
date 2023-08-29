const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Schema for what makes up a thought
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Please leave a thought',
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, 
{
  toJSON: {
    // virtuals: true,
    getters: true
  },
  id: false
});

// Defined a virtual property 'reactionCount'
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

