const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects');
const catchAsync = require('../utils/catchAsync');
// const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Project = require('../models/project');

router.route('/')
    .get(catchAsync(projects.index))
    .post(upload.array('image'), catchAsync(projects.createProject))

router.get('/new',projects.renderNewForm);

router.route('/:id')
    .get(catchAsync(projects.showProject))




module.exports = router;