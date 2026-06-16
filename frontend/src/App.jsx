import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CourseSlider from "./components/CourseSlider";
import About from "./components/About";
import Feedback from "./components/Feedback";
import Footer from "./components/Footer";
import EnquiryModal from "./components/EnquiryModal";
import AdminAuthModal from "./components/AdminAuthModal";
import AdminDashboard from "./pages/AdminDashboard";
import { fetchCourses, fetchFeedbacks } from "./api";

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [courses, setCourses] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const loadAllData = async () => {
    try {
      const [coursesData, feedbacksData] = await Promise.all([
        fetchCourses(),
        fetchFeedbacks(),
      ]);
      setCourses(coursesData);
      setFeedbacks(feedbacksData);
    } catch (err) {
      console.error("Failed to load initial data, using fallbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleEnquireClick = (courseTitle) => {
    setPreselectedCourse(courseTitle);
    setIsModalOpen(true);
  };

  const handleAdminToggle = () => {
    const isAuth = sessionStorage.getItem("isAdminAuthenticated") === "true";
    if (isAuth) {
      setIsAdminMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    setIsAdminMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthenticated = () => {
    sessionStorage.setItem("isAdminAuthenticated", "true");
    setIsAdminMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isAdminMode) {
    return (
      <div className="bg-charcoal min-h-screen">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-accentViolet/15 bg-charcoal/85 backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
            <div className="group flex items-center gap-2.5 text-white">
              <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-gradient-to-br from-accentViolet to-violet-600 shadow-md shadow-accentViolet/20">
                <span className="text-sm font-bold text-white">MA</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                Maniar <span className="text-accentViolet-light font-medium">Academy (Admin)</span>
              </span>
            </div>
            <button
              onClick={handleAdminLogout}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </nav>
        </header>

        <AdminDashboard
          courses={courses}
          feedbacks={feedbacks}
          onRefresh={loadAllData}
          onBackToHome={() => setIsAdminMode(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-charcoal min-h-screen text-slate-200 antialiased selection:bg-accentViolet/30 selection:text-white">
      <Navbar onAdminClick={handleAdminToggle} />
      <main>
        <Hero />
        <CourseSlider courses={courses} onEnquireClick={handleEnquireClick} />
        <About />
        <Feedback />
        <Footer onAdminClick={handleAdminToggle} />
      </main>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedCourse={preselectedCourse}
        courses={courses}
      />

      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
}