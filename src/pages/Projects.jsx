// src/pages/Projects.jsx
import PageWrapper from "../components/PageWrapper";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.12 },
  },
};

const cardPop = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

// English fallback list (used if translations are missing)
const fallbackProjects = [
  {
    title: "Telegram Bot Integrated with Google sheet",
    status: "In Progress",
    stack: "Python, Google Sheet API, Database SQL",
    desc: "Corporate website for a UPS company with clean design, product specs, navigation, company info, and contact details.",
    image: "/telegram.png",
    link: "https://github.com/yourusername/tiam-alborz",
  },
  {
    title: "Portfolio Website",
    status: "Completed",
    stack: "HTML, CSS, JavaScript, React",
    desc: "Personal portfolio with clean navigation, sections for bio, projects, blog, and contact. Fully responsive and fast.",
    image: "/portfoliopng.png",
    link: "https://mhrajabi-portfolio.netlify.app/",
  },
  {
    title: "Weather App",
    status: "Completed",
    stack: "HTML, CSS, JavaScript, React, Redux Toolkit",
    desc: "A sleek weather app with current conditions, hourly and long-term forecasts, built with a user-friendly interface.",
    image: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
    link: "https://github.com/yourusername/weather-app",
  },
  {
    title: "Blog",
    status: "Completed",
    stack: "HTML, Material-UI, JavaScript, React, Redux Toolkit, GraphQL",
    desc: "Dynamic blog with GraphQL backend, fast content fetching, real-time updates, and a scalable API.",
    image: "/blogger.png",
    link: "https://github.com/yourusername/blog",
  },
];

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language] ?? {};

  const title = t.projects_title || "ALL PROJECTS";
  const statusLabel = t.projects_status_label || "Status:";
  const stackLabel = t.projects_stack_label || "Created With:";
  const projects =
    Array.isArray(t.projects_list) && t.projects_list.length
      ? t.projects_list
      : fallbackProjects;

  return (
    <PageWrapper>
      <section className="min-h-[92vh] w-full bg-[#0f0f11] text-white relative pb-24 md:pb-28">
        <div className="mx-auto max-w-6xl px-4 pt-10 md:pt-12">
          {/* Title bar */}
          <div className="rounded-2xl bg-[#17181b] border border-white/5 shadow-inner px-5 py-3 md:py-4 mb-6 md:mb-8">
            <h1 className="text-center text-2xl md:text-3xl font-extrabold tracking-wide">
              {title}
            </h1>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {projects.map((p, i) => (
              <ProjectCard
                key={(p.title || "proj") + i}
                project={p}
                statusLabel={statusLabel}
                stackLabel={stackLabel}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}

function ProjectCard({ project, statusLabel, stackLabel }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  // Entire card is a link
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      ref={cardRef}
      variants={cardPop}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -2 }}
      className="group relative rounded-2xl bg-[#17181b] border border-white/5 shadow-lg p-6 overflow-hidden outline-none ring-0 focus-visible:ring-2 focus-visible:ring-white/20 transition"
      aria-label={`Open ${project.title}`}
      title={project.title}
    >
      {/* Round preview badge */}
      <div className="flex items-center gap-4">
        <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-black/30 shadow-inner grid place-content-center overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-14 w-14 md:h-16 md:w-16 object-contain opacity-90"
              loading="lazy"
            />
          ) : (
            <div className="text-white/50 text-sm">Preview</div>
          )}
        </div>
      </div>

      {/* Meta rows */}
      <div className="mt-5 text-[13px] leading-5">
        <div>
          <span className="text-white/60">{statusLabel}</span>{" "}
          <span className="text-white/90">{project.status}</span>
        </div>
        <div className="mt-1">
          <span className="text-white/60">{stackLabel}</span>{" "}
          <span className="text-white/90">{project.stack}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg md:text-xl font-semibold group-hover:text-white">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm md:text-[15px] text-white/70">
        {project.desc}
      </p>

      {/* Subtle hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-white/0 via-white/0 to-white/[0.03]" />
    </motion.a>
  );
}
