import PageWrapper from "../components/PageWrapper";
import { BookText, Briefcase } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageWrapper>
      <section className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white px-6 md:px-20 py-16 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">
          {t.aboutMe}
        </h2>

        {/* Intro */}
        <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6 mb-16">
          <p>
            {t.intro1}
            <strong> React</strong>, <strong> Tailwind CSS</strong>, and{" "}
            <strong> Framer Motion</strong>.
          </p>
          <p>{t.intro2}</p>
          <p>{t.intro3}</p>
        </div>

        {/* Education */}
        <div className="mb-16 relative md:pl-16 pl-0 flex flex-col md:block">
          <div className="mb-4 md:mb-0 md:absolute md:left-[-0.5rem] top-0">
            <div className="bg-gradient-to-tr from-pink-500 to-teal-400 w-12 h-12 flex items-center justify-center rounded-2xl shadow-md">
              <BookText className="text-white" size={28} />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-10 text-blue-500 pl-10">
            {t.Education}
          </h3>
          <div className="relative border-l-2 border-gray-400 dark:border-gray-700 ml-4 pl-6 space-y-10">
            <div className="relative">
              <div className="w-3 h-3 bg-pink-500 rounded-full absolute -left-4 top-2"></div>
              <h4 className="font-bold text-lg">Politecnico Di Torino</h4>
              <p className="text-sm text-orange-400">
                September 2021 — Present
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t.politecnicoDesc}
              </p>
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-pink-500 rounded-full absolute -left-4 top-2"></div>
              <h4 className="font-bold text-lg">{t.shiraz}</h4>
              <p className="text-sm text-orange-400">2014 — 2018</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t.shirazDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-16 relative md:pl-16 pl-0 flex flex-col md:block">
          <div className="mb-4 md:mb-0 md:absolute md:left-[-0.5rem] top-0">
            <div className="bg-gradient-to-tr from-pink-500 to-teal-400 w-12 h-12 flex items-center justify-center rounded-2xl shadow-md">
              <Briefcase className="text-white" size={24} />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-10 text-blue-500 pl-10">
            {t.Experience}
          </h3>
          <div className="relative border-l-2 border-gray-400 dark:border-gray-700 ml-4 pl-6 space-y-10">
            <div className="relative">
              <div className="w-3 h-3 bg-pink-500 rounded-full absolute -left-4 top-2"></div>
              <h4 className="font-bold text-lg">{t.aiTitle}</h4>
              <p className="text-sm text-orange-400">March 2023 — Present</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t.aiDesc}
              </p>
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-pink-500 rounded-full absolute -left-4 top-2"></div>
              <h4 className="font-bold text-lg">{t.gameTitle}</h4>
              <p className="text-sm text-orange-400">Feb 2024 — Present 2021</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t.gameDesc}
              </p>
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-pink-500 rounded-full absolute -left-4 top-1.5"></div>
              <h4 className="font-bold text-lg">{t.wpTitle}</h4>
              <p className="text-sm text-orange-400">2022 — Present</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t.wpDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-6 text-blue-500 text-center">
            {t.skillsTitle}
          </h3>
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="space-y-5">
              {[
                { skill: "HTML & CSS", level: 90 },
                { skill: "JavaScript (ES6+)", level: 85 },
                { skill: "React", level: 85 },
                { skill: "Tailwind CSS", level: 80 },
                { skill: "Framer Motion", level: 70 },
                { skill: "Node.js & Express", level: 65 },
                { skill: "WordPress", level: 70 },
                { skill: "Google Sheets API", level: 75 },
                { skill: "Telegram Bot Development", level: 80 },
                { skill: "Git & GitHub", level: 85 },

              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.skill}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.level}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
