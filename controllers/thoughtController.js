const { Thought, User } = require('../models');

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
      .sort({ createdAt: -1 });

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);

      const dbUserData = await User.findOneAndUpdate(
        { id: req.body.userId },
        { $push: {thoughts: dbThoughtData._id } },
        { new: true }
      );

      if(!dbUserData) {
        return res.status(404).json({ message: 'Thought posted but no user attached to this ID' })
      }

      res.json({message: 'Thought successfully made!'});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update thought 
  async updateThought(req, res) {
    const dbThoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought accessed with this id '});
    }

    res.json(dbThoughtData);

    res.status(500).json(err);
  },

  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought attached to this ID' });
      }

      const dbUserData = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!dbUserData) {
        return res
        .status(404)
        .json({ message: 'Thought made but no user attached to this ID ' });
      } 

      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id attached' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction (req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate (
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this ID attached' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;