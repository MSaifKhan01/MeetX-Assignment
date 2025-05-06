const Activity = require('../models/activity');

exports.AllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();

    if (!activities || activities.length === 0) {
      return res.status(404).send({ msg: "No activities found" });
    }

    res.status(200).send({ msg: "Activities retrieved successfully", activities });
  } catch (error) {
    res.status(500).send({ msg: "Server error while fetching activities", error: error.message });
  }
};




exports.addActivity = async (req, res) => {
    let { title, description, location, dateTime } = req.body;
  
    try {
      if (!title || !description || !location) {
        return res.status(400).send({ message: 'All fields (title, description, location) are required' });
      }
  
      // If dateTime not provided, set it to current date and time
      dateTime = dateTime ? new Date(dateTime) : new Date();
  
      // Check if an activity with the same title, location, and time already exists
      const existingActivity = await Activity.findOne({
        title,
        location,
        dateTime,
      });
  
      if (existingActivity) {
        return res.status(409).send({ message: 'Activity already exists at this time and location' });
      }
  
      const newActivity = new Activity({
        title,
        description,
        location,
        dateTime,
      });
  
      await newActivity.save();
  
      res.status(201).send({
        message: 'Activity added successfully',
        activity: {
          id: newActivity._id,
          title: newActivity.title,
          description: newActivity.description,
          location: newActivity.location,
          dateTime: newActivity.dateTime,
        },
      });
    } catch (error) {
      res.status(500).send({ message: 'Server error while adding activity', error: error.message });
    }
  };
  

