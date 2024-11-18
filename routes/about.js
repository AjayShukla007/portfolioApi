const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  AboutSchema,
  CertSchema,
  EduSchema,
  ExperienceSchema,
} = require("../models/About.js");
const fetchData = require("../middleware/getUser");

// ABOUT
// Route one creating about data
router.post("/addAbout", fetchData, async (req, res) => {
  try {
    const { intro, skills, color } = req.body;
    const newIntro = new AboutSchema({
      intro,
      skills,
      color,
      user: req.user.id,
    });
    const saveIntro = await newIntro.save();
    res.status(200).json({ message: "added" });
  } catch (e) {
    res.status(500).json({ error: e, mesaage: "internal server error" });
    console.log(e);
  }
});
// Route 2 getting about
router.get("/getAbout", fetchData, async (req, res) => {
  try {
    const intro = await AboutSchema.find({ user: req.user.id });
    res.json(intro);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});
// Route 3 updating about
router.patch("/updateAbout/:id", fetchData, async (req, res) => {
  try {
    const introId = req.params.id;
    const updateFields = req.body;
    const updateIntro = await AboutSchema.findByIdAndUpdate(
      introId,
      updateFields,
      {
        new: true,
      }
    );
    if (!updateIntro) {
      return res.status(404).json({
        message: "about not found",
      });
    }
    res.status(200).json({
      mesaage: "about updated successfully",
    });
  } catch (e) {
    res.status(500).json({ error: e, message: "error updating about" });
  }
});
// Route 4 deleting about
router.delete("/deleteAbout/:id", fetchData, async (req, res) => {
  try {
    const introId = req.params.id;
    const deletedIntro = await AboutSchema.findByIdAndRemove(introId);

    if (!deletedIntro) {
      return res.status(404).json({ message: "About not found" });
    }

    res.status(200).json({
      message: "About deleted successfully",
      deletedIntro,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// CERTIFICATION
// Route one creating Certification data
router.post("/addCert", fetchData, async (req, res) => {
  try {
    const { name, description, date, type, learned, provider } = req.body;
    const newCert = new CertSchema({
      name,
      description,
      date,
      type,
      learned,
      provider,
      user: req.user.id,
    });
    const saveCert = await newCert.save();
    res.status(200).json({ message: "added" });
  } catch (e) {
    res.status(500).json({ error: e, mesaage: "internal server error" });
    console.log(e);
  }
});
// Route 2 getting Certification
router.get("/getCert", fetchData, async (req, res) => {
  try {
    const cert = await CertSchema.find({ user: req.user.id });
    res.json(cert);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});
// Route 3 updating Certification
router.patch("/updateCert/:id", fetchData, async (req, res) => {
  try {
    const certId = req.params.id;
    const updateFields = req.body;
    const updateCert = await CertSchema.findByIdAndUpdate(
      certId,
      updateFields,
      {
        new: true,
      }
    );
    if (!updateCert) {
      return res.status(404).json({
        message: "cert not found",
      });
    }
    res.status(200).json({
      mesaage: "cert updated successfully",
    });
  } catch (e) {
    res.status(500).json({ error: e, message: "error updating cert" });
  }
});
// Route 4 deleting Certification
router.delete("/deleteCert/:id", fetchData, async (req, res) => {
  try {
    const certId = req.params.id;
    const deletedCert = await CertSchema.findByIdAndRemove(certId);

    if (!deletedCert) {
      return res.status(404).json({ message: "Cert not found" });
    }

    res.status(200).json({
      message: "Certification deleted successfully",
      deletedCert,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// EDUCATION
// Route one creating Education data
router.post("/addEdu", fetchData, async (req, res) => {
  try {
    const { collage, name, year, location } = req.body;
    const newEdu = new EduSchema({
      collage,
      name,
      year,
      location,
      user: req.user.id,
    });
    const saveCert = await newEdu.save();
    res.status(200).json({ message: "added" });
  } catch (e) {
    res.status(500).json({ error: e, mesaage: "internal server error" });
    console.log(e);
  }
});
// Route 2 getting Education
router.get("/getEdu", fetchData, async (req, res) => {
  try {
    const edu = await EduSchema.find({ user: req.user.id });
    res.json(edu);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});
// Route 3 updating Education
router.patch("/updateEdu/:id", fetchData, async (req, res) => {
  try {
    const eduId = req.params.id;
    const updateFields = req.body;
    const updateEdu = await EduSchema.findByIdAndUpdate(eduId, updateFields, {
      new: true,
    });
    if (!updateEdu) {
      return res.status(404).json({
        message: "edu not found",
      });
    }
    res.status(200).json({
      mesaage: "edu updated successfully",
    });
  } catch (e) {
    res.status(500).json({ error: e, message: "error updating edu" });
  }
});
// Route 4 deleting Education
router.delete("/deleteEdu/:id", fetchData, async (req, res) => {
  try {
    const eduId = req.params.id;
    const deletedEdu = await EduSchema.findByIdAndRemove(eduId);

    if (!deletedEdu) {
      return res.status(404).json({ message: "Edu not found" });
    }

    res.status(200).json({
      message: "Education deleted successfully",
      deletedEdu,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// EXPERIENCE
router.post("/addExp", fetchData, async (req, res) => {
  try {
    const { company, position, duration, description } = req.body;
    const newExp = new ExperienceSchema({
      company,
      position,
      duration,
      description,
      user: req.user.id,
    });
    const saveExp = await newExp.save();
    res.status(200).json({ message: "added" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e, message: "internal server error" });
  }
});

router.get("/getExp", fetchData, async (req, res) => {
  try {
    const exp = await ExperienceSchema.find({ user: req.user.id });
    res.json(exp);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});
router.delete("/deleteExp/:id", fetchData, async (req, res) => {
  try {
    const expId = req.params.id;
    const deletedExp = await ExperienceSchema.findByIdAndRemove(expId);

    if (!deletedExp) {
      return res.status(404).json({ message: "Exp not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});
router.patch("/updateExp/:id", fetchData, async (req, res) => {
  try {
    const expId = req.params.id;
    const updateFields = req.body;
    const updateExp = await ExperienceSchema.findByIdAndUpdate(expId, updateFields, {
      new: true,
    });
    if (!updateExp) {
      return res.status(404).json({ message: "Exp not found" });
    }
    res.status(200).json({ message: "Exp updated successfully" });
  } catch (e) {
    res.status(500).json({ error: e, message: "error updating exp" });
    console.log(e);
  }
});
module.exports = router;
