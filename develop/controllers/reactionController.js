const { Thought } = require('../models');

module.exports = {
    // create a new reaction
    async createReaction({ params, body }, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(
                params.thoughtId,
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete a reaction
    async deleteReaction({ params }, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(
                params.thoughtId,
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};