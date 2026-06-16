import { useState } from "react";
import { motion } from "framer-motion";
import { fallbackCourses } from "../constants";

// Helper to determine icon, border gradient, and hover glow colors based on course contents
const getCourseDetails = (course) => {
  const title = (course.title || "").toLowerCase();
  const language = (course.language || "").toLowerCase();
  
  if (title.includes("basics") || title.includes("fundamental") || language.includes("fundamental")) {
    return {
      glowColor: "rgba(16, 185, 129, 0.15)", // Emerald
      borderColor: "group-hover:border-emerald-500/30",
      accentBg: "from-emerald-500/20 to-teal-500/10",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M12 7v4M9 9h6" />
        </svg>
      )
    };
  }
  if (title.includes("java") || language.includes("java")) {
    return {
      glowColor: "rgba(249, 115, 22, 0.15)", // Orange
      borderColor: "group-hover:border-orange-500/30",
      accentBg: "from-orange-500/20 to-amber-500/10",
      icon: (
        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18c0 1 1 2 3 2h6c2 0 3-1 3-2V9H6v9Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9h12M18 12c1.5 0 2.5-1 2.5-2.5S19.5 7 18 7M9 3v3M12 2v4M15 3v3" />
        </svg>
      )
    };
  }
  if (title.includes("python") || language.includes("python")) {
    return {
      glowColor: "rgba(59, 130, 246, 0.15)", // Blue
      borderColor: "group-hover:border-blue-500/30",
      accentBg: "from-blue-500/20 to-cyan-500/10",
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          <circle cx="14.5" cy="8.5" r="1" fill="currentColor" />
          <circle cx="9.5" cy="15.5" r="1" fill="currentColor" />
        </svg>
      )
    };
  }
  if (title.includes("full-stack") || title.includes("full stack") || language.includes("mern") || language.includes("node")) {
    return {
      glowColor: "rgba(139, 92, 246, 0.15)", // Violet
      borderColor: "group-hover:border-violet-500/30",
      accentBg: "from-accentViolet/25 to-violet-950/15",
      icon: (
        <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4L3 8.5 12 13l9-4.5L12 4Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12.5l9 4.5 9-4.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5l9 4.5 9-4.5" />
        </svg>
      )
    };
  }
  if (title.includes("web") || title.includes("html") || language.includes("html") || language.includes("css") || language.includes("js")) {
    return {
      glowColor: "rgba(244, 63, 94, 0.15)", // Rose/Pink
      borderColor: "group-hover:border-rose-500/30",
      accentBg: "from-pink-500/20 to-rose-500/10",
      icon: (
        <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 8h20M6 5.5h.01M9 5.5h.01M12 5.5h.01" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l-3 3 3 3M16 12l3 3-3 3M13 11l-2 8" />
        </svg>
      )
    };
  }
  if (title.includes("database") || title.includes("sql") || language.includes("sql") || language.includes("db")) {
    return {
      glowColor: "rgba(234, 179, 8, 0.15)", // Yellow
      borderColor: "group-hover:border-yellow-500/30",
      accentBg: "from-yellow-500/20 to-orange-500/10",
      icon: (
        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
        </svg>
      )
    };
  }
  
  // Dynamic fallback for any other course types
  return {
    glowColor: "rgba(139, 92, 246, 0.15)",
    borderColor: "group-hover:border-accentViolet/30",
    accentBg: "from-accentViolet/20 to-violet-950/10",
    icon: (
      <svg className="w-6 h-6 text-accentViolet-light" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  };
};

function CourseCard({ course, onEnquireClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardDetails = getCourseDetails(course);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      whileHover={{
        y: -8,
        scale: 1.025,
        borderColor: "rgba(255, 255, 255, 0.15)",
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`group relative w-80 shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${course.accent || cardDetails.accentBg} bg-[#121215]/60 p-6 shadow-xl backdrop-blur-md transition-all duration-300 ${cardDetails.borderColor}`}
    >
      {/* Radial Hover Glow (follows cursor) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${cardDetails.glowColor}, transparent 80%)`,
        }}
      />

      {/* Subtle top-right accent glow */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header Row: Icon & Badge */}
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              {cardDetails.icon}
            </div>
            {course.badge && (
              <span className="inline-block rounded-full bg-accentViolet/15 border border-accentViolet/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accentViolet-light shadow-sm">
                {course.badge}
              </span>
            )}
          </div>

          <h3 className="mt-5 text-xl font-extrabold text-white group-hover:text-accentViolet-light transition-colors duration-300 tracking-tight leading-tight">
            {course.title}
          </h3>

          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
            {course.language}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-slate-400 min-h-[4.5rem]">
            {course.description}
          </p>
        </div>

        <div>
          {/* Bottom Info details */}
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              {course.level || 'All levels'}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {course.duration}
            </span>
          </div>

          {/* Action button with Shimmer reflection glow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnquireClick(course.title);
            }}
            className="relative mt-5 overflow-hidden group/btn inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-accentViolet py-3 text-sm font-bold text-white transition-all shadow-md shadow-accentViolet/25 hover:shadow-lg hover:shadow-accentViolet/40 hover:bg-accentViolet-hover active:scale-95 z-10"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function CourseSlider({ courses = [], onEnquireClick }) {
  const displayCourses = courses && courses.length > 0 ? courses : fallbackCourses;

  // We duplicate courses dynamically to ensure there are enough cards for a full marquee.
  // We double the dynamic set so the infinite scroll wraps seamlessly from 100% (-50% translateX) back to 0%.
  const getRepeatedCourses = (list) => {
    if (!list || list.length === 0) return [];
    let repeated = [...list];
    // Safeguard for very small lists (e.g. 1 or 2 items)
    while (repeated.length < 12) {
      repeated = [...repeated, ...list];
    }
    // Duplicate the final set to enable seamless 50% translation marquee looping
    return [...repeated, ...repeated];
  };

  const repeatedCourses = getRepeatedCourses(displayCourses);

  return (
    <section id="courses" className="bg-[#09090b] py-20 sm:py-24 relative overflow-hidden">
      {/* Visual Accent Backglows */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accentViolet/5 blur-3xl pointer-events-none" />
      <div className="absolute left-10 top-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accentViolet-light">
            Featured Programs
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Courses Built for Every Stage
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Continuous autoscrolling marquee — hover over any card to pause and explore.
          </p>
        </div>
      </div>

      {/* Marquee Wrapper with fading edges */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Soft edge blur masks for premium transition */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-r from-[#09090b] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-l from-[#09090b] to-transparent z-20 pointer-events-none" />

        {/* Marquee container */}
        <div className="flex w-max gap-6 animate-marquee py-3 hover:[animation-play-state:paused]">
          {repeatedCourses.map((course, index) => (
            <CourseCard
              key={`${course._id || course.id}-${index}`}
              course={course}
              onEnquireClick={onEnquireClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}