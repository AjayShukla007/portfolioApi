const express = require("express");
const router = express.Router();
router.use(express.json());

const CaseStudies = require("../models/CaseStudies.js");
const fetchData = require("../middleware/getUser");

