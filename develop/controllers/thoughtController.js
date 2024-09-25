const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({});
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    // get one thought by id
    async getThoughtById({ params }, res) {
        try {
            const dbThoughtData = await Thought.findById(params.id);
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // create a new thought
    async createThought({ body }, res) {
        try {
            const dbThoughtData = await Thought.create(body);
            const dbUserData = await User.findByIdAndUpdate(
                body.userId,
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update a thought
    async updateThought({ params, body }, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(params.id, body, { new: true });
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete a thought
    async deleteThought({ params }, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndDelete(params.id);
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            const dbUserData = await User.findByIdAndUpdate(
                dbThoughtData.userId,
                { $pull: { thoughts: dbThoughtData._id } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addReaction({ params, body }, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(
                {_id:params.thoughtID},
                { $addToSet: { reactions: body } },
                { new: true }
            );

            

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'reaction not found' });
            }
            return res.json(dbThoughtData)
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    async deleteReaction({ params }, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(
                {_id:params.thoughtID},
                { $pull: { reactions: {_id: params.reactionID} } },
                { new: true }
            );

            

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'thought not found' });
            }
            return res.json(dbThoughtData)
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
};