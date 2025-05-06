const express = require('express');
const activityRouter = express.Router();
const { AllActivities,addActivity } = require('../controllers/activity');

activityRouter.get('/', AllActivities);
activityRouter.post('/add', addActivity);

module.exports = activityRouter;
