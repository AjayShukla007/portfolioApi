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


//NOTES ROUTE 2:
//Creating Project
router.post(
  "/addProject",
  fetchData,
  async (req, res) => {
    try {
      const { title, tags, description, source, live, image, grade } = req.body;
      const newNote = new Notes({
        title,
        tags,
        description,
        source,
        live,
        image,
        grade,
        user: req.user.id,
      });
      const saveProject = await newNote.save();
    } catch (e) {
      res.status(500).json({ error: e, stfu: "server error1" });
      console.log(e);
    }
  }
);

// Update a project
router.patch("/updateProject/:id", fetchData, async (req, res) => {
  try {
    const projectId = req.params.id;
    const updatedFields = req.body;

    const updateProject = await Notes.findByIdAndUpdate(projectId, updatedFields, { new: true });

    if (!updateProject) {
      return res.status(404).json({
        message: "project not found"
      });
    }
    res.status(200).json({
      mesaage: "project updated successfully"
    });
  } catch (e) {
    res.status(500).json({
      message: "server error",
      error:e
    });
  }
});
// Delete a project by ID
router.delete("/deleteProject/:id", fetchData, async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Notes.findByIdAndRemove(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      deletedNote
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


module.exports = router;
