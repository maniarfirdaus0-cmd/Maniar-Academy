const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new course (Admin)
// @route   POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { title, description, language, level, duration, accent, badge, category, syllabus, perks } = req.body;
    
    const newCourse = new Course({
      title,
      description,
      language,
      level,
      duration,
      accent,
      badge,
      category,
      syllabus,
      perks
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: 'Validation Error', error: error.message });
  }
};

// @desc    Delete a course (Admin)
// @route   DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getCourses,
  createCourse,
  deleteCourse
};
