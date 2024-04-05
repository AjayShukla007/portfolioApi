const express = require("express");
const router = express.Router();
router.use(express.json());

const CaseStudies = require("../models/CaseStudies.js");
const fetchData = require("../middleware/getUser");

router.post("/postCs", fetchData, async (req, res) => {
  try {
    const { title, id, description, flow, feature, techUsed, motivation, conclusion } = req.body;
    const newCaseStudy = new CaseStudies({
      title,
      id,
      description,
      flow,
      feature,
      techUsed,
      motivation,
      conclusion,
      user: req.user.id
    });
    const saveCaseStudy = await newCaseStudy.save();
  } catch (e) {
    res.status(500).json({
      message: "some error occured",
      error: e
    });
    console.log(e);
  }
});

// router.get("/getCs", fetchData, async (req, res) => {
//   try {
//     const caseStudies = await CaseStudies.find({ user: req.user.id });
//     res.json(caseStudies);
//   } catch (e) {
//     res.status(500).json({
//       message: "could not send case studies data right now",
//       error: e
//     });
//   }
// });
router.get("/getCs/:title", fetchData, async (req, res) => {
  try {
    const { title } = req.params;
    const data = await CaseStudies.find({ title }); // Query MongoDB for relevant data
    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: "could not send case studies data right now",
      error: e
    });
  }
});

router.get("/getCsTitle", fetchData, async (req, res) => {
  try {
    const titles = await CaseStudies.distinct('title');
    if (!titles) {
      res.status(404).json({
        message:"cannot find any titles did you created any case studies"
      });
    }
    res.json(titles);
  } catch (e) {
    res.status(500).json({
      message: "could not send case studies titles data right now",
      error: e
    });
  }
});

router.patch("/updateCs/:id", fetchData, async (req, res)=>{
  try {
    const caseStudyId = req.params.id;
    const updateFields = req.body;
    // const updateCaseStudy = await CaseStudies.findByIdAndUpdate(caseStudyId, updateFields, {new: true});
    const updateCaseStudy = await CaseStudies.findByIdAndUpdate(caseStudyId, updateFields, { new: true });

    if (!updateCaseStudy) {
      return res.status(404).json({
        message: "case study not found or some error occured"
      });
    }
    res.status(200).json({
      mesaage: "case study updated successfully"
    });
  } catch (e) {
    res.json({
      message: "unable to update",
      error: e
    });
    console.log(e);
  }
});

router.delete("/deleteCs/:id",fetchData, async (req, res)=>{
  try {
    const caseStudyId = req.params.id;
    const deleteCs = await CaseStudies.findByIdAndRemove(caseStudyId);
   if (!deleteCs) {
      return res.status(404).json({ message: "Case study not found" });
    }
    res.status(200).json({
      message: "Case study deleted successfully",
      deleteCs
    });
  } catch (e) {
    res.json({
      message:"unable to delete vase study",
      error: e
    });
    console.log(e);
  }
});

module.exports = router;
