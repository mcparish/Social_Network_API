const { Reaction } = require('../models');

module.exports = {
    // get all reactions
    async getAllReactions(req, res) {
        try {
            const dbReactionData = await Reaction.find({});
            res.json(dbReactionData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // get one reaction by id
    async getReactionById({ params }, res) {
        try {
            const dbReactionData = await Reaction.findById(params.id);
            if (!dbReactionData) {
                return res.status(404).json({ message: 'Reaction not found' });
            }
            res.json(dbReactionData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // create a new reaction
    async createReaction({ body }, res) {
        try {
            const dbReactionData = await Reaction.create(body);
            res.json(dbReactionData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};