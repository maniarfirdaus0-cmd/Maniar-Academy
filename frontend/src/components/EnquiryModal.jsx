import { useState, useEffect } from "react";
import { submitEnquiry } from "../api";
import { fallbackCourses } from "../constants";

export default function EnquiryModal({ isOpen, onClose, preselectedCourse, courses = [] }) {
  const displayCourses = courses && courses.length > 0 ? courses : fallbackCourses;
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phoneNumber: "",
    selectedCourse: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Sync preselectedCourse when modal opens
  useEffect(() => {
    if (preselectedCourse) {
      setFormData((prev) => ({ ...prev, selectedCourse: preselectedCourse }));
    } else if (displayCourses.length > 0) {
      setFormData((prev) => ({ ...prev, selectedCourse: displayCourses[0].title }));
    }
  }, [preselectedCourse, courses, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await submitEnquiry(formData);
      setSuccess(true);
      setFormData({
        studentName: "",
        email: "",
        phoneNumber: "",
        selectedCourse: courses[0]?.title || "",
        message: "",
      });
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl transition-all scale-100"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-bold text-white">Course Enquiry</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">Thank You!</h3>
            <p className="mt-2 text-sm text-slate-400">
              Your enquiry has been submitted. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error && (
              <div className="rounded-lg bg-rose-500/10 p-3 text-sm text-rose-400 border border-rose-500/20">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="studentName" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                required
                value={formData.studentName}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="selectedCourse" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Interested Program
              </label>
              <select
                id="selectedCourse"
                name="selectedCourse"
                required
                value={formData.selectedCourse}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-white/15 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {displayCourses.length > 0 ? (
                  displayCourses.map((c) => (
                    <option key={c._id || c.id || c.title} value={c.title} className="bg-slate-900">
                      {c.title} ({c.language || 'General'})
                    </option>
                  ))
                ) : (
                  <option value="">Select a course</option>
                )}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Message / Doubts (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Ask about batch timings, fee structures, or curriculum details..."
                className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-400 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
