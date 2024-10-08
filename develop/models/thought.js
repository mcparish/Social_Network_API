const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You need to leave a thought!',
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: 'You need to leave a username!',
        },
        reactions:[reactionSchema]

    },
    {
        toJSON: {
            virtual: true,
        },
        id: false,
    }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;