require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Feedback = require('../models/Feedback');

const initialCourses = [
  {
    title: "Absolute Zero Basics",
    language: "Computer Fundamentals",
    level: "Beginner",
    duration: "4 Weeks",
    description: "Mouse, keyboard, files, internet, and everyday computer confidence from scratch.",
    accent: "from-emerald-500/20 to-teal-500/10",
    badge: "Start Here",
    category: "beginner"
  },
  {
    title: "Java Programming",
    language: "Java",
    level: "Intermediate",
    duration: "8 Weeks",
    description: "OOP, collections, JDBC, and real-world backend patterns used in enterprise apps.",
    accent: "from-orange-500/20 to-amber-500/10",
    badge: "Popular",
    category: "backend"
  },
  {
    title: "Python for Everyone",
    language: "Python",
    level: "Beginner → Advanced",
    duration: "10 Weeks",
    description: "Scripting, data handling, automation, and foundations for AI & data science.",
    accent: "from-blue-500/20 to-cyan-500/10",
    badge: "Versatile",
    category: "beginner"
  },
  {
    title: "Full-Stack Development",
    language: "MERN Stack",
    level: "Advanced",
    duration: "16 Weeks",
    description: "React, Node.js, APIs, databases, auth, and deployment — build production apps.",
    accent: "from-indigo-500/20 to-violet-500/10",
    badge: "Career Track",
    category: "fullstack"
  },
  {
    title: "Web Foundations",
    language: "HTML · CSS · JS",
    level: "Beginner",
    duration: "6 Weeks",
    description: "Responsive layouts, modern CSS, and interactive JavaScript for the open web.",
    accent: "from-pink-500/20 to-rose-500/10",
    badge: "Essential",
    category: "frontend"
  },
  {
    title: "Database & SQL",
    language: "MySQL / PostgreSQL",
    level: "Intermediate",
    duration: "5 Weeks",
    description: "Schema design, queries, joins, indexing, and data modeling for real applications.",
    accent: "from-yellow-500/20 to-orange-500/10",
    badge: "Core Skill",
    category: "database"
  }
];

const initialFeedbacks = [
  {
    name: "Priya S.",
    course: "Absolute Zero Basics",
    rating: 5,
    quote: "I was scared of computers. Within four weeks I was managing files, using email, and actually enjoying learning. The patience here is unmatched.",
    accent: "border-emerald-500/20"
  },
  {
    name: "Rahul M.",
    course: "Java Programming",
    rating: 5,
    quote: "Clear OOP explanations and real project work. I cleared my campus interviews because the concepts were drilled with practical examples, not just theory.",
    accent: "border-orange-500/20"
  },
  {
    name: "Ananya K.",
    course: "Python for Everyone",
    rating: 5,
    quote: "From zero scripting to building automation tools — the pace was perfect. Every doubt was answered until I truly understood it.",
    accent: "border-blue-500/20"
  },
  {
    name: "Vikram D.",
    course: "Full-Stack Development",
    rating: 5,
    quote: "The MERN track felt like an internship. We built a full app with auth and deployment. Recruiters loved my portfolio.",
    accent: "border-indigo-500/20"
  },
  {
    name: "Sneha P.",
    course: "Web Foundations",
    rating: 5,
    quote: "Responsive layouts finally made sense. The step-by-step CSS labs and live feedback on my designs boosted my confidence hugely.",
    accent: "border-pink-500/20"
  },
  {
    name: "Arjun T.",
    course: "Database & SQL",
    rating: 5,
    quote: "Schema design and complex joins were broken down beautifully. I now write production-ready queries at my internship.",
    accent: "border-yellow-500/20"
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await Course.deleteMany({});
    console.log("Cleared existing courses.");

    await Feedback.deleteMany({});
    console.log("Cleared existing feedbacks.");

    // Insert new data
    await Course.insertMany(initialCourses);
    console.log("Seeded initial courses successfully.");

    await Feedback.insertMany(initialFeedbacks);
    console.log("Seeded initial feedbacks successfully.");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
