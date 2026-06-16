import { useState } from "react";
import { createCourse, createFeedback } from "../api";

export default function AdminForm({ courses = [], onSuccess }) {
  const [activeForm, setActiveForm] = useState("course"); // "course" or "feedback"
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Course Form State
  const [courseData, setCourseData] = useState({
    title: "",
    language: "",
    level: "Beginner",
    duration: "",
    description: "",
    badge: "",
    accent: "from-indigo-500/20 to-violet-500/10",
  });

  // Feedback Form State
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    course: courses[0]?.title || "",
    rating: 5,
    quote: "",
    accent: "border-indigo-500/20",
  });

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prev) => ({ ...prev, [name]: name === "rating" ? Number(value) : value }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      await createCourse(courseData);
      setMessage({ type: "success", text: "Course created successfully!" });
      setCourseData({
        title: "",
        language: "",
        level: "Beginner",
        duration: "",
        description: "",
        badge: "",
        accent: "from-indigo-500/20 to-violet-500/10",
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to create course." });
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      await createFeedback(feedbackData);
      setMessage({ type: "success", text: "Feedback testimonial created successfully!" });
      setFeedbackData({
        name: "",
        course: courses[0]?.title || "",
        rating: 5,
        quote: "",
        accent: "border-indigo-500/20",
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to create feedback." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
      <div className="flex border-b border-white/10 pb-4 mb-6">
        <button
          onClick={() => {
            setActiveForm("course");
            setMessage({ type: "", text: "" });
          }}
          className={`flex-1 pb-2 text-center text-sm font-semibold transition-colors ${
            activeForm === "course"
              ? "border-b-2 border-indigo-400 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Add Course
        </button>
        <button
          onClick={() => {
            setActiveForm("feedback");
            setMessage({ type: "", text: "" });
            if (!feedbackData.course && courses.length > 0) {
              setFeedbackData((prev) => ({ ...prev, course: courses[0].title }));
            }
          }}
          className={`flex-1 pb-2 text-center text-sm font-semibold transition-colors ${
            activeForm === "feedback"
              ? "border-b-2 border-indigo-400 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Add Testimonial
        </button>
      </div>

      {message.text && (
        <div
          className={`mb-4 rounded-lg p-3 text-sm border ${
            message.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {activeForm === "course" ? (
        <form onSubmit={handleCourseSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="course-title" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Course Title
              </label>
              <input
                type="text"
                id="course-title"
                name="title"
                required
                value={courseData.title}
                onChange={handleCourseChange}
                placeholder="e.g. Node JS Mastery"
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="course-language" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Language / Tech Stack
              </label>
              <input
                type="text"
                id="course-language"
                name="language"
                required
                value={courseData.language}
                onChange={handleCourseChange}
                placeholder="e.g. JavaScript · Express"
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="course-level" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Skill Level
              </label>
              <select
                id="course-level"
                name="level"
                value={courseData.level}
                onChange={handleCourseChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Beginner → Advanced">Beginner → Advanced</option>
              </select>
            </div>

            <div>
              <label htmlFor="course-duration" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Duration
              </label>
              <input
                type="text"
                id="course-duration"
                name="duration"
                required
                value={courseData.duration}
                onChange={handleCourseChange}
                placeholder="e.g. 6 Weeks"
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="course-badge" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Promo Badge
              </label>
              <input
                type="text"
                id="course-badge"
                name="badge"
                value={courseData.badge}
                onChange={handleCourseChange}
                placeholder="e.g. Popular, Hot"
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="course-accent" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Accent Style (Tailwind Classes)
              </label>
              <select
                id="course-accent"
                name="accent"
                value={courseData.accent}
                onChange={handleCourseChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
              >
                <option value="from-emerald-500/20 to-teal-500/10">Emerald / Teal (Beginner)</option>
                <option value="from-orange-500/20 to-amber-500/10">Orange / Amber (Intermediate)</option>
                <option value="from-blue-500/20 to-cyan-500/10">Blue / Cyan (General)</option>
                <option value="from-indigo-500/20 to-violet-500/10">Indigo / Violet (Advanced)</option>
                <option value="from-pink-500/20 to-rose-500/10">Pink / Rose (Design/Web)</option>
                <option value="from-yellow-500/20 to-orange-500/10">Yellow / Orange (Database)</option>
              </select>
            </div>

            <div>
              <label htmlFor="course-category" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Category Slug (Optional)
              </label>
              <input
                type="text"
                id="course-category"
                name="category"
                value={courseData.category}
                onChange={handleCourseChange}
                placeholder="e.g. backend"
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="course-desc" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Description
            </label>
            <textarea
              id="course-desc"
              name="description"
              required
              rows={3}
              value={courseData.description}
              onChange={handleCourseChange}
              placeholder="Summary of course contents, projects, and target audience..."
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-indigo-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:opacity-50"
          >
            {loading ? "Adding course..." : "Add Course to Database"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="review-name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Student Name
              </label>
              <input
                type="text"
                id="review-name"
                name="name"
                required
                value={feedbackData.name}
                onChange={handleFeedbackChange}
                placeholder="e.g. John Doe"
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="review-course" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Course Taken
              </label>
              <select
                id="review-course"
                name="course"
                required
                value={feedbackData.course}
                onChange={handleFeedbackChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
              >
                {courses.length > 0 ? (
                  courses.map((c) => (
                    <option key={c._id || c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Absolute Zero Basics">Absolute Zero Basics</option>
                    <option value="Java Programming">Java Programming</option>
                    <option value="Python for Everyone">Python for Everyone</option>
                    <option value="Full-Stack Development">Full-Stack Development</option>
                    <option value="Web Foundations">Web Foundations</option>
                    <option value="Database & SQL">Database & SQL</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="review-rating" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Rating (1 to 5 Stars)
              </label>
              <input
                type="number"
                id="review-rating"
                name="rating"
                min={1}
                max={5}
                required
                value={feedbackData.rating}
                onChange={handleFeedbackChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="review-accent" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Accent Style (Color Class)
              </label>
              <select
                id="review-accent"
                name="accent"
                value={feedbackData.accent}
                onChange={handleFeedbackChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
              >
                <option value="border-emerald-500/20">Emerald Border (Zero Basics)</option>
                <option value="border-orange-500/20">Orange Border (Java)</option>
                <option value="border-blue-500/20">Blue Border (Python)</option>
                <option value="border-indigo-500/20">Indigo Border (Full Stack)</option>
                <option value="border-pink-500/20">Pink Border (Web Foundations)</option>
                <option value="border-yellow-500/20">Yellow Border (Database)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="review-quote" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Student Quote
            </label>
            <textarea
              id="review-quote"
              name="quote"
              required
              rows={3}
              value={feedbackData.quote}
              onChange={handleFeedbackChange}
              placeholder="What did they say about their learning experience..."
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-indigo-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:opacity-50"
          >
            {loading ? "Adding testimonial..." : "Add Testimonial to Database"}
          </button>
        </form>
      )}
    </div>
  );
}
