const express = require('express');
const bookingRouter = express.Router();
const { bookActivity, getMyBookings } = require('../controllers/booking');
const { Auth } = require('../middleware/auth');


bookingRouter.post('/:activityId', Auth, bookActivity);
bookingRouter.get('/my',Auth , getMyBookings);

module.exports = bookingRouter;
