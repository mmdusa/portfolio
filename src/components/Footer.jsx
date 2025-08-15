// src/components/Footer.jsx
import { Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

export default function Footer() {
  const year = new Date().getFullYear();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-[#0f0f11] border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 text-center space-y-2">
        {/* Footer nav */}
        <nav className="flex justify-center gap-x-6 text-sm text-white/60 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link to="/" className="hover:text-white transition">
            {t.home}
          </Link>
          <Link to="/about" className="hover:text-white transition">
            {t.about}
          </Link>
          <Link to="/projects" className="hover:text-white transition">
            {t.projects}
          </Link>
          <Link to="/credentials" className="hover:text-white transition">
            {t.navCredentials}
          </Link>
          <Link to="/certificates" className="hover:text-white transition">
            {t.navCertificates}
          </Link>
          <Link to="/contact" className="hover:text-white transition">
            {t.contact}
          </Link>
        </nav>

        {/* Credit line — logo always on the left of the text */}
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 max-w-full">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
            />
            {/* Keep the code icon only on sm+ to avoid crowding */}
            <Code2 size={16} className="opacity-80 hidden sm:block" />
            <p className="text-white/60 text-sm sm:text-[15px] leading-tight text-left">
              {t.footerDevelopedBy}{" "}
              <span className="text-white">Mohammad Rajabi</span>. © {year}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
