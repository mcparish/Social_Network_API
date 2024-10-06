const { Schema, model, Types } = require('mongoose');

const reactionSchema = {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionText: {
        type: String,
        required: 'You need to leave a reaction!',
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
    },
};



module.exports = reactionSchema;