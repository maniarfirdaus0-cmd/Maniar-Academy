const express = require('express');
const router = express.Router();
const { getCourses, createCourse, deleteCourse } = require('../controllers/courseController');

router.get('/', getCourses);
router.post('/', createCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
