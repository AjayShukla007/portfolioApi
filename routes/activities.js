const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const { body, validationResult } = require("express-validator");
const fetchData = require("../middleware/getUser");

// ROUTE 1: Get all activities: GET "/api/activities"
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new activity: POST "/api/activities"
router.post(
  "/",
  fetchData,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
    body("activityType", "Activity type is required").isIn([
      'contribution', 'project', 'learning', 'achievement', 'other'
    ]),
  ],
  async (req, res) => {
    try {
      const { title, description, activityType, relatedProject, link, icon, date } = req.body;
      
      // Debug log
      console.log("Received date:", date, typeof date);

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const activity = new Activity({
        title,
        description,
        activityType,
        relatedProject,
        link,
        icon,
        date: date || Date.now(),
        user: req.user.id,
      });
      
      const savedActivity = await activity.save();
      res.json(savedActivity);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing activity: PUT "/api/activities/:id"
router.put("/:id", fetchData, async (req, res) => {
  const { title, description, activityType, relatedProject, link, icon, date } = req.body;
  try {
    // Create a new activity object
    const newActivity = {};
    if (title) newActivity.title = title;
    if (description) newActivity.description = description;
    if (activityType) newActivity.activityType = activityType;
    if (relatedProject) newActivity.relatedProject = relatedProject;
    if (link) newActivity.link = link;
    if (icon) newActivity.icon = icon;
    if (date) newActivity.date = date;
    
    // Find the activity to be updated and update it
    let activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).send("Not Found");
    }

    activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { $set: newActivity },
      { new: true }
    );
    res.json({ activity });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an activity: DELETE "/api/activities/:id"
router.delete("/:id", fetchData, async (req, res) => {
  try {
    // Find the activity to be deleted and delete it
    let activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).send("Not Found");
    }

    activity = await Activity.findByIdAndDelete(req.params.id);
    res.json({ Success: "Activity has been deleted", activity: activity });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
