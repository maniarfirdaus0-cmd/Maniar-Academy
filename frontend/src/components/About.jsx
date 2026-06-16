import { motion } from "framer-motion";

const timeline = [
  {
    year: "2015",
    title: "The Beginning",
    description:
      "Started with one-on-one computer basics — helping adults who had never touched a keyboard build real confidence.",
  },
  {
    year: "2018",
    title: "Structured Programs",
    description:
      "Launched formal batches for Java, Python, and web foundations with hands-on projects and weekly mentorship.",
  },
  {
    year: "2021",
    title: "Full-Stack Track",
    description:
      "Expanded into MERN stack career tracks, mock interviews, and portfolio-driven learning for job-ready graduates.",
  },
  {
    year: "Today",
    title: "Maniar Academy",
    description:
      "500+ students trained — from absolute zero to advanced developers — with personalized paths at every level.",
  },
];

const teachingMethods = [
  {
    title: "Absolute Beginners",
    tag: "Start from Zero",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "hover:border-emerald-400/40",
    points: [
      "Patient, jargon-free explanations with live demos",
      "Step-by-step labs — mouse, files, internet, then coding",
      "Small batches so no student is left behind",
      "Confidence-first pacing before moving to syntax",
    ],
  },
  {
    title: "Advanced Students",
    tag: "Level Up Fast",
    accent: "from-accentViolet/25 to-violet-950/15",
    border: "hover:border-accentViolet/45",
    points: [
      "Architecture reviews, code quality, and system design",
      "Real-world projects: APIs, auth, databases, deployment",
      "Interview prep, debugging sessions, and peer code reviews",
      "Custom roadmaps aligned to your career goals",
    ],
  },
];

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 15,
      },
    },
  };

  return (
    <section id="about" className="relative overflow-hidden bg-charcoal py-20 sm:py-24">
      {/* Subtle backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal-light/30 via-charcoal to-charcoal"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accentViolet-light">
            Our Story
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A Decade of Teaching,{" "}
            <span className="bg-gradient-to-r from-accentViolet-light to-fuchsia-400 bg-clip-text text-transparent">
              One Student at a Time
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Maniar Academy grew from a simple belief: everyone deserves patient,
            practical IT education — whether you&apos;re opening a laptop for the
            first time or shipping production software.
          </p>
        </div>

        {/* Timeline */}
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto mt-16 max-w-3xl space-y-0"
        >
          <div
            className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-accentViolet/60 via-accentViolet/20 to-transparent sm:left-1/2 sm:-translate-x-px"
            aria-hidden="true"
          />

          {timeline.map(({ year, title, description }, index) => (
            <motion.li
              key={year}
              variants={itemVariants}
              className={`relative flex flex-col gap-4 pb-12 sm:flex-row sm:items-start sm:gap-8 ${
                index % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="hidden flex-1 sm:block" aria-hidden="true" />

              <div className="relative z-10 flex shrink-0 items-center gap-4 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:flex-col sm:gap-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accentViolet/50 bg-accentViolet/20 text-xs font-bold text-accentViolet-light shadow-lg shadow-accentViolet/25">
                  {index + 1}
                </span>
              </div>

              <motion.article
                whileHover={{ scale: 1.02, borderColor: "rgba(139, 92, 246, 0.4)" }}
                className={`group flex-1 rounded-2xl border border-white/5 bg-charcoal-light/50 p-6 backdrop-blur-sm transition-all duration-300 ease-in-out sm:max-w-md ${
                  index % 2 === 0 ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                }`}
              >
                <time className="text-sm font-semibold text-accentViolet-light">{year}</time>
                <h3 className="mt-1 text-lg font-bold text-white group-hover:text-accentViolet-light transition-colors duration-300">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {description}
                </p>
              </motion.article>
            </motion.li>
          ))}
        </motion.ol>

        {/* Teaching methods */}
        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold text-white sm:text-3xl">
            Personalized Teaching for Every Level
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-400">
            Same academy, two tailored approaches — because beginners and
            advanced learners need completely different support.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-12 grid gap-8 lg:grid-cols-2"
          >
            {teachingMethods.map(({ title, tag, accent, border, points }) => (
              <motion.article
                key={title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 15px 30px -10px rgba(139, 92, 246, 0.1)",
                }}
                className={`group rounded-2xl border border-white/5 bg-gradient-to-br ${accent} bg-charcoal-light/50 p-8 backdrop-blur-sm transition-all duration-300 ease-in-out ${border}`}
              >
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accentViolet-light">
                  {tag}
                </span>
                <h4 className="mt-4 text-xl font-bold text-white">{title}</h4>
                <ul className="mt-6 space-y-3">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accentViolet transition-transform duration-300 group-hover:scale-125"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}