const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.use(express.json());

//IMPORTING FILES AND CUSTOM MODULES
const User = require("../models/User");
const fetchData = require("../middleware/getUser");

//USER ROUTE 1
//Creating user using POST and validating using express validator
router.post("/singUp", async (req, res) => {
  try {
    //CREATE NEW USER
    //Securing Passwords of users
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_secret);

    res.json({ authToken });
  } catch (e) {
    console.error(e.messege);
    res.status(500).json({ error: e });
  }
});

//USER ROUTE 2
// Login user using POST and authenticating user
// const storedUser = process.env.USER
// const storedPass = process.env.API_PASS
router.post("/singIn", async (req, res) => {
  // CHECKING IF USER EXIST
  const { userName, password } = req.body;
  // console.log(userName, password);
  // console.log(storedUser, storedPass);
  try {
    // const user = await User.findOne({ userName });
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        error: "unable to login, try again using current userName and password",
      });
    }
    const checkPass = bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(400).json({
        error:
          "unable to login, try again using currect userName and password 2",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_secret);
    res.json({ authToken });
  } catch (e) {
    console.error(e.messege);
    res.status(500).json({ error: e });
  }
});

//USER ROUTE 3
router.get("/getData", fetchData, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
