import { useRef } from "react";
import { motion } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";

export default function Hero() {
  const containerRef = useRef(null);
  const { x, y } = useMousePosition(containerRef);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="group relative min-h-[90vh] overflow-hidden bg-charcoal pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      {/* Soft gradient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-charcoal-light via-charcoal to-charcoal"
        aria-hidden="true"
      />

      {/* Mouse following radial gradient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(650px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.12), transparent 85%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Accent glow center top */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accentViolet/15 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center lg:px-8"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 inline-flex items-center rounded-full border border-accentViolet/30 bg-accentViolet/10 px-4 py-1.5 text-sm font-medium text-accentViolet-light"
        >
          Premium IT Education · Beginner to Pro
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-accentViolet-light via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Maniar Academy
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
        >
          Your complete learning spectrum — from{" "}
          <span className="font-semibold text-white">
            Absolute Zero Computer Basics
          </span>{" "}
          all the way to advanced{" "}
          <span className="font-semibold text-accentViolet-light">
            Full-Stack Software Development
          </span>
          . One academy, every skill level.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <motion.a
            href="#courses"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-accentViolet px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accentViolet/20 transition-all hover:bg-accentViolet-hover"
          >
            Explore Courses
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            Book a Free Consultation
          </motion.a>
        </motion.div>

        <motion.dl
          variants={itemVariants}
          className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {[
            { label: "Courses", value: "12+" },
            { label: "Students Trained", value: "500+" },
            { label: "Industry Mentors", value: "Expert-Led" },
          ].map(({ label, value }) => (
            <motion.div
              key={label}
              variants={statVariants}
              whileHover={{ scale: 1.03, borderColor: "rgba(139, 92, 246, 0.4)" }}
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm transition-colors duration-300"
            >
              <dt className="text-sm font-medium text-slate-400">{label}</dt>
              <dd className="mt-1 text-2xl font-bold text-white">{value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}