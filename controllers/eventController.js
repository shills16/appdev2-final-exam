const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  const events = await Event.find().populate('userId', 'name email');
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;

  try {
    const newEvent = new Event({
      title,
      location,
      date,
      description,
      userId: req.user.userId
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event' });
  }
};

exports.getMyEvents = async (req, res) => {
  const myEvents = await Event.find({ userId: req.user.userId });
  res.json(myEvents);
};
