const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You need to leave a username!',
            trim: true,
        },
        email: {
            type: String,
            required: 'You need to leave an email!',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
            lowercase: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('User', userSchema);

module.exports = User;