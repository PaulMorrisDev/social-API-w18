const { Schema, model } = require('mongoose');

// Schema to create User model
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
  
  // Define a virtual property 'friendCount'
  userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  
  const User = model('user', userSchema);
  
  module.exports = User;
  // Please make sure to replace 'Thought' and 'User' with the actual names of your Mongoose models if they are named differently. You can use this model definition to interact with your MongoDB database according to the specified criteria.
