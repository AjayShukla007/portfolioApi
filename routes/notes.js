const express = require("express");
const router = express.Router();
router.use(express.json());
const Notes = require("../models/Notes");
const fetchData = require("../middleware/getUser");

//NOTES ROUTE 1:
//Getting projects api/notes/getNotes
router.get("/getProject", fetchData, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
