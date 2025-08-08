import PageWrapper from "../components/PageWrapper";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  const contactItems = [
    {
      icon: FaLinkedin,
      label: t.linkedin,
      info: "linkedin.com/in/mohammadhosseinrajabi",
      link: "https://linkedin.com/in/mohammadhosseinrajabi",
    },
    {
      icon: FaGithub,
      label: t.github,
      info: "github.com/mmdusa",
      link: "https://github.com/mmdusa",
    },
    {
      icon: FaEnvelope,
      label: t.email,
      info: "momo.tkd19@gmail.com",
      link: "mailto:momo.tkd19@gmail.com",
    },
    {
      icon: FaPhone,
      label: t.phone,
      info: "+39 327 037 6929",
      link: "tel:+393270376929",
    },
  ];

  return (
    <PageWrapper>
      <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-20 px-6 md:px-20 text-center transition-colors duration-500">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-12">
          {t.contactMe}
        </h2>

        {/* motion.div wrapper with layout to prevent flickers */}
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
        >
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                layout="position"
                initial={false}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                className="min-h-[100px] flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                <div className="text-left">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.info}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>
    </PageWrapper>
  );
}
