import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchFeedbacks } from "../api";

const fallbackTestimonials = [
  {
    _id: "1",
    name: "Priya S.",
    course: "Absolute Zero Basics",
    rating: 5,
    quote: "I was scared of computers. Within four weeks I was managing files, using email, and actually enjoying learning. The patience here is unmatched.",
    accent: "border-emerald-500/20",
  },
  {
    _id: "2",
    name: "Rahul M.",
    course: "Java Programming",
    rating: 5,
    quote: "Clear OOP explanations and real project work. I cleared my campus interviews because the concepts were drilled with practical examples, not just theory.",
    accent: "border-orange-500/20",
  },
  {
    _id: "3",
    name: "Ananya K.",
    course: "Python for Everyone",
    rating: 5,
    quote: "From zero scripting to building automation tools — the pace was perfect. Every doubt was answered until I truly understood it.",
    accent: "border-blue-500/20",
  },
  {
    _id: "4",
    name: "Vikram D.",
    course: "Full-Stack Development",
    rating: 5,
    quote: "The MERN track felt like an internship. We built a full app with auth and deployment. Recruiters loved my portfolio.",
    accent: "border-accentViolet/20",
  },
  {
    _id: "5",
    name: "Sneha P.",
    course: "Web Foundations",
    rating: 5,
    quote: "Responsive layouts finally made sense. The step-by-step CSS labs and live feedback on my designs boosted my confidence hugely.",
    accent: "border-pink-500/20",
  },
  {
    _id: "6",
    name: "Arjun T.",
    course: "Database & SQL",
    rating: 5,
    quote: "Schema design and complex joins were broken down beautifully. I now write production-ready queries at my internship.",
    accent: "border-yellow-500/20",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:scale-110"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchFeedbacks();
        setFeedbacks(data);
      } catch (err) {
        console.error("Failed to fetch testimonials, using fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, []);

  const displayFeedbacks = feedbacks.length > 0 ? feedbacks : fallbackTestimonials;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section id="reviews" className="bg-[#0b0b0d] py-20 sm:py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute left-0 top-1/4 h-80 w-80 rounded-full bg-accentViolet/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accentViolet-light">
            Student Voices
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Real feedback from learners who started at every skill level.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accentViolet border-t-transparent" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayFeedbacks.map(({ _id, name, course, rating, quote, accent }) => (
              <motion.article
                key={_id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(139, 92, 246, 0.45)",
                  boxShadow: "0 10px 25px -10px rgba(139, 92, 246, 0.15)",
                }}
                className={`group flex flex-col rounded-2xl border ${
                  accent || "border-accentViolet/20"
                } border-white/5 bg-charcoal-light/50 p-6 backdrop-blur-sm transition-colors duration-300`}
              >
                <StarRating count={rating} />

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                  &ldquo;{quote}&rdquo;
                </blockquote>

                <footer className="mt-6 border-t border-white/5 pt-4">
                  <cite className="not-italic">
                    <p className="font-semibold text-white">{name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-accentViolet-light">
                      {course}
                    </p>
                  </cite>
                </footer>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}