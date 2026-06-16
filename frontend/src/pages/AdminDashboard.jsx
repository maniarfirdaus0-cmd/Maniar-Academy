import { useState, useEffect } from "react";
import { fetchEnquiries, deleteCourse, deleteFeedback } from "../api";
import AdminForm from "../components/AdminForm";

export default function AdminDashboard({ courses = [], feedbacks = [], onRefresh, onBackToHome }) {
  const [activeTab, setActiveTab] = useState("enquiries");
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    async function loadEnquiries() {
      try {
        const data = await fetchEnquiries();
        setEnquiries(data);
      } catch (err) {
        console.error("Failed to load enquiries:", err);
      } finally {
        setLoadingEnquiries(false);
      }
    }
    loadEnquiries();
  }, [activeTab]);

  const triggerRefresh = async () => {
    if (onRefresh) await onRefresh();
    // reload enquiries
    try {
      const data = await fetchEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setActionLoading(true);
    setStatusMsg({ type: "", text: "" });
    try {
      await deleteCourse(id);
      setStatusMsg({ type: "success", text: "Course deleted successfully!" });
      await triggerRefresh();
    } catch (err) {
      setStatusMsg({ type: "error", text: err.message || "Failed to delete course." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    setActionLoading(true);
    setStatusMsg({ type: "", text: "" });
    try {
      await deleteFeedback(id);
      setStatusMsg({ type: "success", text: "Testimonial deleted successfully!" });
      await triggerRefresh();
    } catch (err) {
      setStatusMsg({ type: "error", text: err.message || "Failed to delete review." });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Manage student registrations, courses, and student feedback.
            </p>
          </div>
          <button
            onClick={onBackToHome}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
          >
            ← Back to Landing Page
          </button>
        </div>

        {statusMsg.text && (
          <div
            className={`mb-6 rounded-lg p-3 text-sm border ${
              statusMsg.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "enquiries", label: `Enquiries (${enquiries.length})` },
            { id: "courses", label: `Courses (${courses.length})` },
            { id: "reviews", label: `Reviews (${feedbacks.length})` },
            { id: "add", label: "Add New Item" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setStatusMsg({ type: "", text: "" });
              }}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="mt-4">
          {activeTab === "enquiries" && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4">Student Enquiries</h2>
              {loadingEnquiries ? (
                <div className="flex justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent" />
                </div>
              ) : enquiries.length === 0 ? (
                <p className="text-slate-400 text-sm py-8 text-center">No enquiries found in the database yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/15 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Course Requested</th>
                        <th className="py-3 px-4">Message</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                      {enquiries.map((enq) => (
                        <tr key={enq._id} className="hover:bg-white/5">
                          <td className="py-3.5 px-4 font-semibold text-white">{enq.studentName}</td>
                          <td className="py-3.5 px-4">
                            <div>{enq.email}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{enq.phoneNumber}</div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-indigo-300">{enq.selectedCourse}</td>
                          <td className="py-3.5 px-4 max-w-xs truncate" title={enq.message}>
                            {enq.message || <span className="text-slate-500 italic">None</span>}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-400">
                            {new Date(enq.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "courses" && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4">Manage Courses</h2>
              {courses.length === 0 ? (
                <p className="text-slate-400 text-sm py-8 text-center">No courses found. Add a course to display.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <div
                      key={course._id || course.id}
                      className="flex flex-col justify-between rounded-xl border border-white/5 bg-slate-950 p-5"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-300">
                            {course.badge || "Standard"}
                          </span>
                          <span className="text-xs text-slate-400">{course.duration}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-white">{course.title}</h3>
                        <p className="text-xs text-indigo-400 font-medium">{course.language}</p>
                        <p className="mt-2 text-xs text-slate-400 line-clamp-2">{course.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-slate-400">{course.level || "All levels"}</span>
                        <button
                          disabled={actionLoading}
                          onClick={() => handleDeleteCourse(course._id)}
                          className="rounded bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-400 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4">Manage Testimonials</h2>
              {feedbacks.length === 0 ? (
                <p className="text-slate-400 text-sm py-8 text-center">No reviews found. Add a review to display.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {feedbacks.map((f) => (
                    <div
                      key={f._id}
                      className="flex flex-col justify-between rounded-xl border border-white/5 bg-slate-950 p-5"
                    >
                      <div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: f.rating || 5 }).map((_, i) => (
                            <svg key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-slate-300 italic">
                          &ldquo;{f.quote}&rdquo;
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-white">{f.name}</p>
                          <p className="text-[10px] text-indigo-400 font-medium">{f.course}</p>
                        </div>
                        <button
                          disabled={actionLoading}
                          onClick={() => handleDeleteFeedback(f._id)}
                          className="rounded bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-400 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "add" && (
            <AdminForm courses={courses} onSuccess={triggerRefresh} />
          )}
        </div>

      </div>
    </div>
  );
}
