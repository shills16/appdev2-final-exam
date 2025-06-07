require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const faker = require('faker');
const User = require('./models/User');
const Event = require('./models/Event');

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    // Clear old data
    await User.deleteMany();
    await Event.deleteMany();

    // Create 5 users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('secret123', 10);
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashedPassword
      });
      users.push(await user.save());
    }

    // Create 10 events
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await Event.create({
        title: faker.lorem.words(3),
        location: faker.address.city(),
        date: faker.date.future(),
        description: faker.lorem.sentence(),
        userId: randomUser._id
      });
    }

    console.log('Seeding done!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
