const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedData = async () => {
    try {
        const users = await User.create([
            { username: 'Michael', email: 'michael@email.com' },
            { username: 'Logan', email: 'logan@email.com' },
            { username: 'Daniel', email: 'daniel@email.com' },
            { username: 'Brittany', email: 'brittany@email.com' },
        ]);

        const thoughts = await Thought.create([
            {
                thoughtText: 'I love to play baseball and video games',
                username: users[0].username,
            },
            {
                thoughtText: 'Dinosaurs and airplanes are the best things ever!',
                username: users[1].username,
            },
            {
                thoughtText: 'What are we having for dinner?',
                username: users[2].username,
            },
            {
                thoughtText: 'I want to sleep!',
                username: users[3].username,
            },
        ]);

        const reactions = await Reaction.create([
            {
                reactionBody: 'Nice dude!',
                username: users[0].username,
                thoughtId: thoughts[0]._id,
            },
            {
                reactionBody: 'And trains too!',
                username: users[1].username,
                thoughtId: thoughts[1]._id,
            },
            {
                reactionBody: 'Learn how to cook and do it yourself!',
                username: users[2].username,
                thoughtId: thoughts[2]._id,
            },
            {
                reactionBody: 'Girl, me too!',
                username: users[3].username,
                thoughtId: thoughts[3]._id,
            },
        ]);

        console.log('Seed data created');
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

seedDate();