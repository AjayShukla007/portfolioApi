const express = require("express");
const router = express.Router();

router.use(express.json());
const Blogs = require("../models/Blogs.js");
const fetchData = require("../middleware/getUser");

// Route one creating blogs data
router.post("/addBlog", fetchData, async (req, res) => {
  try {
    const { title, details, link, tags, date } = req.body;
    const newBlog = new Blogs({
      title,
      details,
      link,
      tags,
      date,
      user: req.user.id
    });
    const saveBlog = await newBlog.save();
    res.status(200).json({ message: "added" });
  } catch (e) {
    res.status(500).json({ error: e, mesaage: "internal server error" });
    console.log(e);
  }
});

// Route 2 getting Blogs
router.get("/getBlog", fetchData, async (req, res) => {
  try {
    const blogs = await Blogs.find({ user: req.user.id });
    res.json(blogs);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});

// Route 3 updating blogs
router.patch("/updateBlog/:id", fetchData, async (req, res) => {
  try {
    const blogId = req.params.id;
    const updateFields = req.body;
    const updateBlog = await Blogs.findByIdAndUpdate(blogId, updateFields, {
      new: true
    });
    if (!updateBlog) {
      return res.status(404).json({
        message: "blog not found"
      });
    }
    res.status(200).json({
      mesaage: "blog updated successfully"
    });
  } catch (e) {
    res.status(500).json({ error: e, message: "error updating blog" });
  }
});

router.delete("/deleteBlog/:id", fetchData, async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blogs.findByIdAndRemove(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
      deletedBlog
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


module.exports = router;
