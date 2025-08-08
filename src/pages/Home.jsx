// src/pages/Home.jsx
import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import HeroParticles from "../components/HeroParticles";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  // pull localized data from translations.js
  const {
    recommendations = [],
    achievements = [],
    recommendationsTitle = "Cover Letters",
    achievementsTitle = "Achievements",
    heroTitle,
    heroSubtitle,
    heroCTA,
  } = t;

  const [selectedRec, setSelectedRec] = useState(null);

  // optional: close modal on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelectedRec(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PageWrapper>
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-[60vh] bg-gradient-to-b from-blue-100 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-white overflow-hidden">
        <HeroParticles />

        <div className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20">
          {/* Left */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 dark:text-blue-300 mb-4">
              {heroTitle}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {heroSubtitle}
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {heroCTA}
            </a>
          </motion.div>

          {/* Right */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
              alt="Developer Illustration"
              className="rounded-xl shadow-md max-w-[90%] max-h-[60vh] object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== RECOMMENDATIONS ===== */}
      <section className="w-full bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
            {recommendationsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedRec(rec)}
                className="cursor-pointer bg-blue-900 dark:bg-gray-800 text-white rounded-2xl p-6 shadow-xl flex items-start gap-4 hover:shadow-2xl transition"
              >
                <img
                  src={rec.avatar}
                  alt={rec.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-white/20"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{rec.name}</h3>
                  <p className="text-white/80 leading-relaxed line-clamp-3">
                    {rec.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedRec && (
          <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setSelectedRec(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl shadow-xl p-6 bg-blue-900 text-white"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedRec.avatar}
                    alt={selectedRec.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white/20"
                  />
                  <h3 className="text-2xl font-bold">{selectedRec.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedRec(null)}
                  className="text-white/70 hover:text-white text-xl leading-none"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <p className="leading-relaxed whitespace-pre-line">
                {selectedRec.text}
              </p>
            </motion.div>
          </div>
        )}
      </section>

      {/* ===== ACHIEVEMENTS / CERTIFICATES ===== */}
      <section className="w-full bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
            {achievementsTitle}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
            {achievements.map((a, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex flex-col items-center"
                title={a.title}
              >
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-40 h-40 object-contain drop-shadow-xl rounded-full bg-white/5"
                />
                <figcaption className="mt-3 text-center text-sm opacity-80 max-w-[12rem]">
                  {a.title}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
