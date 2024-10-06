const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let applicationCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (applicationCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    const users = [
        {
            username: 'johndoe',
            email: 'johndoe@example.com'
        },
        {
            username: 'jane Smith',
            email: 'janesmith@example.com'
        },
        {
            username: 'tim Brown',
            email: 'timbrown@example.com'
        
        },
        {
            username: 'Mark',
            email: 'mark@example.com'
        },
        {
            username: 'David',
            email: 'david@example.com'
        },
        {
            username: 'Sarah',
            email: 'sarah@example.com'
        },
        {
            username: 'Mike',
            email: 'mike@example.com'
        },
        {
            username: 'Emily',
            email: 'emily@example.com'
        },
        {
            username: 'Jessica',
            email: 'jessica@example.com'
        }
    ];
    const thoughts = [
        {
            thoughtText: 'This is a thought!',
            username: 'johndoe',
            reactions: [
                {
                    reactionText: 'This is a reaction',
                },
                {
                    reactionText: '��️',
                }
            ]
        },
        {
            thoughtText: 'This is another thought!',
            username: 'jane Smith',
            reactions: [
                {
                    reactionText: 'This is a reaction',
                },
                {
                    reactionText: '��️',
                }
            ]
        },
        {
            thoughtText: 'This is a thought!',
            username: 'tim Brown',
            reactions: [
                {
                    reactionText: 'This is a reaction',
                },
                {
                    reactionText: '��️',
                }
            ]
        },
        {
            thoughtText: 'This is another thought!',
            username: 'Mark',
            reactions: [
                {
                    reactionText: 'This is a reaction',
                },
                {
                    reactionText: '��️',
                }
            ]
        },
        {
            thoughtText: 'This is a thought!',
            username: 'David',
            reactions: [
                {
                    reactionText: 'This is a reaction',
                },
                {
                    reactionText: '��️',
                }
            ]
        },
        {
            thoughtText: 'This is another thought!',
            username: 'Sarah',
            reactions: [
                {
                    reactionText: 'This is a reaction',
                },
                {
                    reactionText: '��️',
                }
            ]
        },
        {
            thoughtText: 'This is a thought!',
            username: 'Mike',
            reactions: [
                {
                    reactionText: 'This is a reaction',
                },
                {
                    reactionText: '��️',
                }
            ]
        },
        {
            thoughtText: 'This is another thought!',
            username: 'Emily',
            reactions: [
                {
                    reactionText: 'This is a reaction',
                },
                {
                    reactionText: '��️',
                }
            ]
        },
        {
            thoughtText: 'This is a thought!',
            username: 'Jessica',
            reactions: [
                {
                    reactionText: 'This is a reaction',
                },
                {
                    reactionText: '��️',
                }
            ]
}]

    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
