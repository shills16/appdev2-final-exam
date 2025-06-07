const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middlewares/authMiddleware');

router.get('/events', eventController.getAllEvents);        // Public
router.post('/events', auth, eventController.createEvent);  // Protected
router.get('/my-events', auth, eventController.getMyEvents); // Protected

module.exports = router;
