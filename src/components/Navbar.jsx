// src/components/Navbar.jsx
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", drawerOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [drawerOpen]);

  const linkBase = "px-3 py-1.5 text-[14px] rounded-lg transition";
  const linkIdle = "text-white/70 hover:text-white";
  const linkActive = "text-white bg-white/5";
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-14 flex items-center justify-between gap-3">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-white font-semibold tracking-wide">
              Mohammad Rajabi
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cx(linkBase, isActive ? linkActive : linkIdle)
              }
            >
              {t.home}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cx(linkBase, isActive ? linkActive : linkIdle)
              }
            >
              {t.about}
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                cx(linkBase, isActive ? linkActive : linkIdle)
              }
            >
              {t.projects}
            </NavLink>
            <NavLink
              to="/credentials"
              className={({ isActive }) =>
                cx(linkBase, isActive ? linkActive : linkIdle)
              }
            >
              {t.navCredentials}
            </NavLink>
            <NavLink
              to="/certificates"
              className={({ isActive }) =>
                cx(linkBase, isActive ? linkActive : linkIdle)
              }
            >
              {t.navCertificates}
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                cx(linkBase, isActive ? linkActive : linkIdle)
              }
            >
              {t.navBlog}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cx(linkBase, isActive ? linkActive : linkIdle)
              }
            >
              {t.contact}
            </NavLink>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="h-8 pl-2 pr-2.5 rounded-full bg-white/5 text-white/80 hover:text-white flex items-center gap-1.5"
                aria-haspopup="menu"
                aria-expanded={langOpen}
              >
                <img
                  src={`/flags/${language}.png`}
                  alt={language}
                  className="w-4 h-4 rounded object-cover"
                />
                <span className="uppercase text-[12px]">{language}</span>
              </button>
              {langOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-28 rounded-lg bg-[#121317] border border-white/10 overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setLangOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-white/80 hover:bg-white/5 flex items-center gap-2 text-sm"
                  >
                    <img
                      src="/flags/en.png"
                      alt="EN"
                      className="w-4 h-4 rounded"
                    />{" "}
                    EN
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("it");
                      setLangOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-white/80 hover:bg-white/5 flex items-center gap-2 text-sm"
                  >
                    <img
                      src="/flags/it.png"
                      alt="IT"
                      className="w-4 h-4 rounded"
                    />{" "}
                    IT
                  </button>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="hidden md:inline-flex h-8 px-5 rounded-full bg-indigo-600 text-white text-[13px] font-semibold hover:bg-indigo-500 pt-[5px]"
            >
              {t.navLetsTalk}
            </Link>

            {/* Hamburger (mobile) */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 text-white"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-5 h-[2px] bg-white rounded" />
              <span className="w-5 h-[2px] bg-white rounded" />
              <span className="w-5 h-[2px] bg-white rounded" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity md:hidden ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />
      <aside
        className={`fixed right-0 top-0 z-[61] h-full w-[84%] max-w-[340px] bg-[#121317] border-l border-white/10 md:hidden transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
          <Link
            to="/"
            onClick={closeDrawer}
            className="flex items-center gap-2"
          >
            <span className="h-5 w-5 rounded-full bg-white/10" />
            <span className="text-white font-semibold tracking-wide">
              Mohammad Rajabi
            </span>
          </Link>
          <button
            onClick={closeDrawer}
            className="h-9 w-9 rounded-lg bg-white/5 text-white hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-4">
          <nav className="flex flex-col gap-1">
            <NavLink
              to="/"
              end
              onClick={closeDrawer}
              className={({ isActive }) =>
                cx(
                  "w-full px-3 py-3 rounded-lg text-[15px] transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5"
                )
              }
            >
              {t.home}
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeDrawer}
              className={({ isActive }) =>
                cx(
                  "w-full px-3 py-3 rounded-lg text-[15px] transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5"
                )
              }
            >
              {t.about}
            </NavLink>
            <NavLink
              to="/projects"
              onClick={closeDrawer}
              className={({ isActive }) =>
                cx(
                  "w-full px-3 py-3 rounded-lg text-[15px] transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5"
                )
              }
            >
              {t.projects}
            </NavLink>
            <NavLink
              to="/credentials"
              onClick={closeDrawer}
              className={({ isActive }) =>
                cx(
                  "w-full px-3 py-3 rounded-lg text-[15px] transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5"
                )
              }
            >
              {t.navCredentials}
            </NavLink>
            <NavLink
              to="/certificates"
              onClick={closeDrawer}
              className={({ isActive }) =>
                cx(
                  "w-full px-3 py-3 rounded-lg text-[15px] transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5"
                )
              }
            >
              {t.navCertificates}
            </NavLink>
            <NavLink
              to="/blog"
              onClick={closeDrawer}
              className={({ isActive }) =>
                cx(
                  "w-full px-3 py-3 rounded-lg text-[15px] transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5"
                )
              }
            >
              {t.navBlog}
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeDrawer}
              className={({ isActive }) =>
                cx(
                  "w-full px-3 py-3 rounded-lg text-[15px] transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5"
                )
              }
            >
              {t.contact}
            </NavLink>
          </nav>

          <div className="my-4 h-px bg-white/10" />

          {/* Language in mobile menu */}
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">{t.navLanguage}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage("en")}
                className={`h-8 px-3 rounded-full flex items-center gap-2 text-sm ${
                  language === "en"
                    ? "bg-white/10 text-white"
                    : "bg-white/5 text-white/80"
                }`}
              >
                <img src="/flags/en.png" alt="EN" className="w-4 h-4 rounded" />{" "}
                EN
              </button>
              <button
                onClick={() => setLanguage("it")}
                className={`h-8 px-3 rounded-full flex items-center gap-2 text-sm ${
                  language === "it"
                    ? "bg-white/10 text-white"
                    : "bg-white/5 text-white/80"
                }`}
              >
                <img src="/flags/it.png" alt="IT" className="w-4 h-4 rounded" />{" "}
                IT
              </button>
            </div>
          </div>

          <Link
            to="/contact"
            onClick={closeDrawer}
            className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-indigo-600 text-white text-[14px] font-semibold hover:bg-indigo-500"
          >
            {t.navLetsTalk}
          </Link>
        </div>
      </aside>
    </header>
  );
}
