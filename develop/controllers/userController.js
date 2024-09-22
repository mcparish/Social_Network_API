const { User } = require('../models');

module.exports = {
async getAllUsers(_, res) {
        try {
            const dbUserData = await User.find({});
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async getUserById({ params }, res) {
        try {
            const dbUserData = await User
                .findById(params.id)
                .populate({
                    path: 'friends',
                    select: 'username',
                });
            if (!dbUserData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async createUser({ body }, res) {
        try {
            const dbUserData = await User.create(body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async deleteUser({ params }, res) {
        try {
            const dbUserData = await User.findByIdAndDelete(params.id);
            if (!dbUserData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async updateUser({ params, body }, res) {
        try {
            const dbUserData = await User.findByIdAndUpdate(params.id, body, { new: true });
            if (!dbUserData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    async addFriend({ params }, res) {
        try {
            const dbUserData = await User.findByIdAndUpdate(
                params.userId,
                { $addToSet: { friends: params.friendId } },
                { new: true }
            );
            
            return res.json(dbUserData)
                
            if (!dbUserData) {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    async deleteFriend({ params }, res) {
        try {
            const dbUserData = await User.findByIdAndUpdate(
                params.userId,
                { $pull: { friends: params.friendId } },
                { new: true }
            );

            return res.json(dbUserData)
            
            if (!dbUserData) {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
};
