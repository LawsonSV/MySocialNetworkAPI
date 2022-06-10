const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        name: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        name: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('Thought', thoughtSchema);

const Reaction = model('Reaction', reactionSchema);

const handleError = (err) => console.error(err);

Thought.find({}).exec((err, collection) => {
    if (err) {
        return handleError(err);
    }
    if (collection.length === 0) {
        return Thought.insertMany(
            [
                {
                    thoughtText: "howdy doody",
                    name: "steve",
                    reactions: [ { reactionBody: 'top of the morning', name: 'bradley' } ],
                },
                {
                    thoughtText: "I'm a barbie girl",
                    name: "buddy",
                    reactions: { reactionBody: '...in a barbie world :3', name: 'steve' },
                },
                {
                    thoughtText: "steve can't stand me",
                    name: "bradley",
                    reactions: { reactionBody: 'ugh shut up', name: 'steve' },
                },
            ],
            (insertError) =>
                insertError ? handleError(insertError) : console.log('Inserted')
        );
    }
    return console.log('Already populated');
});

module.exports = Thought, Reaction;