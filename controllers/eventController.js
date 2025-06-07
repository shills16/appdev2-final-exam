const Event = require('../models/Event');
const User = require('../models/User');
const transporter = require('../config/nodemailer');
const pug = require('pug');
const path = require('path');

exports.getAllEvents = async (req, res) => {
  const events = await Event.find().populate('userId', 'name email');
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;

  try {
    const newEvent = new Event({
      title : {
        type: String,
      },
      location: {
        String,
        },
      date: {
        type: Date,
      },
      description: {
        type: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        }
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event' });
  }

   // Fetch user email from DB
    const user = await User.findById(req.user.userId);

    // Compile Pug email template
    const html = pug.renderFile(
      path.join(__dirname, '../emails/eventCreated.pug'),
      {
        title,
        location,
        date
      }
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Event Created Successfully',
      html
    });
    // Send response
    res.status(201).json({ message: 'Event created and email sent successfully', event: savedEvent });
  }
  
exports.getMyEvents = async (req, res) => {
  const myEvents = await Event.find({ userId: req.user.userId });
  res.json(myEvents);
};
