const { Schema, model } = require('mongoose');

// Schema for what makes up a user
const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"]
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  }, {
    toJSON: {
      virtuals: true
    },
    id: false
  });
  
  // Defined a virtual property 'friendCount'
  userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  
  const User = model('user', userSchema);
  
  module.exports = User;
