const { Schema, model } = require('mongoose');

const reactionSchema = {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
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

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;