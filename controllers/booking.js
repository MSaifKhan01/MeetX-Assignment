const Booking = require('../models/booking');
const Activity = require('../models/activity');

exports.bookActivity = async (req, res) => {
  const { activityId } = req.params;

  try {
    if (!activityId) {
      return res.status(400).send({ message: 'Activity ID is required' });
    }

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).send({ message: 'Activity not found' });
    }

    const existingBooking = await Booking.findOne({ user: req.userID, activity: activityId });
    if (existingBooking) {
      return res.status(409).send({ message: 'You have already booked this activity' });
    }

    const booking = new Booking({ user: req.userID, activity: activityId });
    await booking.save();

    res.status(201).send({ message: 'Activity booked successfully', booking });
  } catch (error) {
    res.status(500).send({ message: 'Server error while booking activity', error: error.message });
  }
};



exports.getMyBookings = async (req, res) => {
    try {
    
      const bookings = await Booking.find({ user: req.userID }).populate('activity').populate('user');;
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).send({ message: 'No bookings found for this user' });
      }
  
      res.status(200).send({ message: 'Bookings retrieved successfully', bookings });
    } catch (error) {
      res.status(500).send({ message: 'Server error while fetching bookings', error: error.message });
    }
  };
  