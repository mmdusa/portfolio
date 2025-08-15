import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User2,
  IdCard,
  Rss,
  Linkedin,
  Github,
  Gauge,
  Trophy,
  MessageSquareText,
  LogOut,
  Grid2X2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const enter = (dir = "left", i = 0) => {
  const isPhone =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  const isTablet =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 769px) and (max-width: 1024px)").matches;

  const d = isPhone ? 60 : isTablet ? 80 : 160;
  const from = dir === "right" ? { x: d } : { x: -d };

  return {
    hidden: { opacity: 0, scale: 0.98, ...from },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: i * (isPhone ? 0.08 : 0.12),
        type: "spring",
        stiffness: 70,
        damping: 16,
      },
    },
  };
};

const IconGo = ({ to, href, label = "Open", size = 16 }) => {
  const base =
    "inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 p-2.5 hover:bg-white/20 transition z-20";
  const icon = <LogOut size={size} />;
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={base}>
      {icon}
    </a>
  ) : (
    <Link to={to} className={base}>
      {icon}
    </Link>
  );
};

const rightSafeGap = "pr-12";
const SAFE_BR = "pr-[60px] pb-[60px]";
const CARD_H = "md:h-[220px]";
const PROFILE_H = "md:h-[270px]";

const inView = (() => {
  const isNarrow =
    typeof window !== "undefined" &&
    window.matchMedia &&
    (window.matchMedia("(max-width: 900px)").matches ||
      window.matchMedia("(max-height: 700px)").matches);

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: isNarrow
      ? { once: false, amount: 0.01, margin: "120px 0px -10% 0px" }
      : { once: false, amount: 0.15, margin: "0px 0px -10% 0px" },
  };
})();

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language] ?? {};

  return (
    <PageWrapper>
      <style>{`
        @keyframes marqueeLTR {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .marquee {
          --marquee-duration: 8s;
          --marquee-delay: -4s;
        }
        .marquee-track {
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
          animation: marqueeLTR var(--marquee-duration) linear infinite;
          animation-delay: var(--marquee-delay);
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; transform: none; }
        }
      `}</style>

      <section className="min-h-[92vh] w-full bg-[#0f0f11] text-white relative pb-24 md:pb-28">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-12 gap-3 md:gap-3">
            {/* Profile */}
            <Link to="/about" className="col-span-12 md:col-span-7">
              <motion.div
                {...inView}
                variants={enter("left", 0)}
                whileHover={{ scale: 1.01 }}
                whileOutOfView="hidden"
                className={`rounded-3xl bg-gradient-to-b from-[#1b1c1f] to-[#131416] shadow-lg p-4 flex items-center gap-6 ${PROFILE_H}`}
              >
                <img
                  src="/certs/mmdusa.jpg"
                  alt="profile"
                  className="h-28 w-28 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs text-white/50">{t.role}</p>
                  <h2 className="mt-1 text-2xl font-bold">{t.name}</h2>
                  <p className="mt-1 text-sm text-white/60">{t.tag}</p>
                </div>
                <User2 className="opacity-40 shrink-0" />
              </motion.div>
            </Link>

            {/* Right column */}
            <div className="col-span-12 md:col-span-5 grid grid-cols-12 gap-1 md:gap-1">
              <motion.div
                {...inView}
                variants={enter("right", 0)}
                whileOutOfView="hidden"
                className="col-span-12 rounded-2xl bg-[#17181b] shadow-lg h-[42px] md:h-[46px] overflow-hidden px-4 flex items-center marquee"
                style={{
                  "--marquee-duration": "12s",
                  "--marquee-delay": "-3.75s",
                }}
              >
                <div className="marquee-track text-[12px] md:text-[13px] text-white/70">
                  {t.ticker}
                </div>
              </motion.div>

              {/* Credentials */}
              <motion.div
                {...inView}
                variants={enter("left", 0.5)}
                whileHover={{ scale: 1.01 }}
                whileOutOfView="hidden"
                className={`relative col-span-12 md:col-span-6 rounded-2xl bg-[#17181b] shadow-lg ${CARD_H} ${rightSafeGap} ${SAFE_BR} px-4 md:px-5 pt-6 md:pt-10`}
              >
                <div className="absolute bottom-4 left-4">
                  <p className="text-[11px] text-white/50 uppercase tracking-wide">
                    {t.moreAboutLabel}
                  </p>
                  <h3 className="text-2xl font-bold text-white leading-none">
                    {t.moreAbout}
                  </h3>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none md:left-4 md:top-4 md:translate-x-0 md:translate-y-0">
                  <IdCard className="w-10 h-10 md:w-6 md:h-6" />
                </div>
                <div className="absolute right-3 bottom-3 md:right-4 md:bottom-4">
                  <IconGo
                    to="/credentials"
                    label={t.openCredentials}
                    size={18}
                  />
                </div>
              </motion.div>

              {/* Projects */}
              <motion.div
                {...inView}
                variants={enter("right", 0.6)}
                whileHover={{ scale: 1.01 }}
                whileOutOfView="hidden"
                className={`relative col-span-12 md:col-span-6 rounded-2xl bg-[#17181b] shadow-lg ${CARD_H} ${rightSafeGap} ${SAFE_BR} px-4 md:px-5 pt-6 md:pt-10`}
              >
                <div className="absolute bottom-4 left-4">
                  <p className="text-[11px] text-white/50 uppercase tracking-wide">
                    {t.showcase}
                  </p>
                  <h3 className="text-2xl font-bold text-white leading-none">
                    {t.projects}
                  </h3>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none md:left-4 md:top-4 md:translate-x-0 md:translate-y-0">
                  <Grid2X2 className="w-10 h-10 md:w-6 md:h-6" />
                </div>
                <div className="absolute right-3 bottom-3 md:right-4 md:bottom-4">
                  <IconGo to="/projects" label={t.openProjects} size={18} />
                </div>
              </motion.div>
            </div>

            {/* Blog */}
            <motion.div
              {...inView}
              variants={enter("left", 0.7)}
              whileHover={{ scale: 1.01 }}
              whileOutOfView="hidden"
              className={`relative col-span-12 md:col-span-4 rounded-2xl bg-[#17181b] shadow-lg ${CARD_H} ${rightSafeGap} ${SAFE_BR} px-4 md:px-5 pt-6 md:pt-10`}
            >
              <div className="absolute bottom-4 left-4">
                <p className="text-1xl font-bold text-white/50">
                  {t.blogLabel}
                </p>
                <h3 className="text-2xl font-bold text-white leading-none">
                  {t.blog}
                </h3>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none md:left-4 md:top-4 md:translate-x-0 md:translate-y-0">
                <Rss />
              </div>
              <div className="absolute right-3 bottom-3 md:right-4 md:bottom-4">
                <IconGo to="/blog" label={t.openBlog} size={18} />
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              {...inView}
              variants={enter("right", 0.8)}
              whileHover={{ scale: 1.01 }}
              whileOutOfView="hidden"
              className={`relative col-span-12 md:col-span-6 rounded-2xl bg-[#17181b] shadow-lg ${CARD_H} px-4 md:px-5 pt-4 pb-12 md:pt-10 md:pb-6`}
            >
              <div className="flex justify-center gap-6 opacity-90 mb-6 md:mb-8">
                <img
                  src="https://skillicons.dev/icons?i=nextjs"
                  alt="Next.js"
                  className="h-10 w-10"
                  loading="lazy"
                />
                <img
                  src="https://cdn.simpleicons.org/react/ffffff"
                  alt="React"
                  className="h-10 w-10"
                  loading="lazy"
                />
                <img
                  src="https://cdn.simpleicons.org/tailwindcss/ffffff"
                  alt="Tailwind CSS"
                  className="h-10 w-10"
                  loading="lazy"
                />
                <img
                  src="https://skillicons.dev/icons?i=js"
                  alt="JavaScript"
                  className="h-10 w-10"
                  loading="lazy"
                />
                <img
                  src="https://cdn.simpleicons.org/github/ffffff"
                  alt="GitHub"
                  className="h-10 w-10"
                  loading="lazy"
                />
              </div>
              <div className="mt-2 md:mt-0 md:absolute md:bottom-4 md:left-4">
                <p className="text-1xl font-bold text-white/50">
                  {t.specialization}
                </p>
                <h3 className="text-2xl font-bold">{t.services}</h3>
              </div>
            </motion.div>

            {/* Profiles */}
            <motion.div
              {...inView}
              variants={enter("right", 0.9)}
              whileHover={{ scale: 1.01 }}
              whileOutOfView="hidden"
              className={`relative col-span-12 md:col-span-2 rounded-2xl bg-[#17181b] shadow-lg h-[160px] md:h-[220px] ${rightSafeGap} ${SAFE_BR} px-4 md:px-5 overflow-hidden`}
            >
              <div className="absolute left-1/2 -translate-x-1/2 top-3 flex items-center gap-6 md:left-4 md:translate-x-0 md:gap-3">
                <a
                  href="https://linkedin.com/in/mohammadhosseinrajabi"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 p-3.5 hover:bg-white/20 transition md:p-3"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-7 h-7 md:w-[18px] md:h-[18px]" />
                </a>
                <a
                  href="https://github.com/mmdusa"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 p-3.5 hover:bg-white/20 transition md:p-3"
                  aria-label="GitHub"
                >
                  <Github className="w-7 h-7 md:w-[18px] md:h-[18px]" />
                </a>
              </div>
              <div className="absolute left-4 bottom-4">
                <p className="text-[12px] md:text-[13px] font-semibold text-white/70 leading-none">
                  {t.stayWithMe}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-2 md:mt-3 leading-none">
                  {t.profiles}
                </h3>
              </div>
              <div className="absolute right-3 bottom-3 md:right-4 md:bottom-4">
                <IconGo to="/profiles" label={t.openProfiles} size={18} />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...inView}
              variants={enter("left", 1.0)}
              whileHover={{ scale: 1.01 }}
              whileOutOfView="hidden"
              className={`col-span-6 md:col-span-3 rounded-2xl bg-[#17181b] p-6 shadow-lg flex flex-col items-center justify-center gap-2 ${CARD_H}`}
            >
              <div className="rounded-2xl bg-black/20 p-6">
                <Gauge />
              </div>
              <div className="text-3xl font-bold">{t.yearsNumber}</div>
              <p className="whitespace-pre-line text-center text-[11px] tracking-wide text-white/60">
                {t.yearsExp}
              </p>
            </motion.div>

            <motion.div
              {...inView}
              variants={enter("right", 1.05)}
              whileHover={{ scale: 1.01 }}
              whileOutOfView="hidden"
              className={`col-span-6 md:col-span-3 rounded-2xl bg-[#17181b] p-6 shadow-lg flex flex-col items-center justify-center gap-2 ${CARD_H}`}
            >
              <div className="rounded-2xl bg-black/20 p-6">
                <Trophy />
              </div>
              <div className="text-3xl font-bold">{t.projectsNumber}</div>
              <p className="whitespace-pre-line text-center text-[11px] tracking-wide text-white/60">
                {t.totalProjects}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              {...inView}
              variants={enter("right", 1.2)}
              whileHover={{ scale: 1.01 }}
              whileOutOfView="hidden"
              className={`relative col-span-12 md:col-span-6 rounded-2xl bg-gradient-to-br from-[#17181b] to-[#101114] shadow-lg ${CARD_H} ${rightSafeGap} ${SAFE_BR} p-6 md:p-8 overflow-hidden`}
            >
              <div className="hidden md:block absolute left-4 top-4 opacity-80 pointer-events-none">
                <MessageSquareText className="w-6 h-6" />
              </div>
              <div className="flex h-full items-start">
                <div className="mt-12">
                  <p className="text-3xl font-bold text-white leading-none">
                    {t.lets}
                  </p>
                  <p className="text-4xl font-bold text-white mt-3 leading-none">
                    {t.work}{" "}
                    <span className="text-purple-400">{t.together}</span>
                  </p>
                </div>
              </div>
              <div className="absolute right-3 bottom-3 md:right-4 md:bottom-4">
                <IconGo to="/contact" label={t.contact} size={18} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
