import { Users } from '../models/userModel';

module.exports = {
    async getAllUsers(_, res) {
        try {
            const dbUserData = await Users.find({});
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async getUserById({ params }, res) {
        try {
            const dbUserData = await Users
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
            const dbUserData = await Users.create(body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    async deleteUser({ params }, res) {
        try {
            const dbUserData = await Users.findByIdAndDelete(params.id);
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
            const dbUserData = await Users.findByIdAndUpdate(params.id, body, { new: true });
            if (!dbUserData) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
};
   