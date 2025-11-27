// src/pages/Credentials.jsx
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { Linkedin, Github, Mail, Phone, Globe, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

export default function Credentials() {
  const { language } = useLanguage();
  const t = translations[language] ?? {};

  // tiny helper with safe fallback
  const L = (key, en) => t?.[key] ?? en;

  const aboutText = L(
    "credentials_about_text",
    "I am a passionate and dedicated Next.js developer with expertise in building full-stack applications using Next.js, React.js, and modern web technologies. Currently pursuing a Master's in Material Engineering, my true passion is web development. I enjoy server components, API routes, data fetching, and building responsive, accessible UIs with Tailwind. I love collaborating, shipping polished interactions, and continuously learning new patterns and tools."
  );

  const skills = [
    {
      id: "next",
      title: L("skills_next_title", "Next.js"),
      pct: "80%",
      body: L(
        "skills_next_body",
        "Solid understanding of App Router, server components, API routes, dynamic routing and data fetching."
      ),
    },
    {
      id: "react",
      title: L("skills_react_title", "React.js"),
      pct: "85%",
      body: L(
        "skills_react_body",
        "Comfortable building component-driven UIs, state management, and performance-focused patterns."
      ),
    },
    {
      id: "tailwind",
      title: L("skills_tailwind_title", "Tailwind"),
      pct: "70%",
      body: L(
        "skills_tailwind_body",
        "Utility-first styling for responsive, accessible, and consistent interfaces."
      ),
    },
    {
      id: "js",
      title: L("skills_js_title", "JavaScript"),
      pct: "85%",
      body: L(
        "skills_js_body",
        "ES6+ syntax, DOM APIs, async patterns, fetch/REST integrations and tooling."
      ),
    },
    {
      id: "css",
      title: L("skills_css_title", "CSS"),
      pct: "75%",
      body: L(
        "skills_css_body",
        "Modern layout (Flex/Grid), animations, responsive design, and best practices."
      ),
    },
    {
      id: "html",
      title: L("skills_html_title", "HTML"),
      pct: "85%",
      body: L(
        "skills_html_body",
        "Semantic structure, accessibility, and SEO-friendly markup."
      ),
    },
  ];

  // Cover Letters data from translations.js
  const {
    recommendations = [],
    recommendationsTitle = L("recommendationsTitle", "Cover Letters"),
  } = t;

  const [selectedRec, setSelectedRec] = useState(null);

  return (
    <PageWrapper>
      <section className="min-h-[92vh] w-full bg-[#0f0f11] text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-12 gap-6">
            {/* Left profile card */}
            <div className="col-span-12 md:col-span-4">
              <div className="rounded-3xl bg-[#17181b] p-6 shadow-lg h-full md:min-h-[560px]">
                {/* Responsive image */}
                <div className="relative rounded-2xl overflow-hidden bg-black/20 aspect-[4/5] md:aspect-auto md:h-80">
                  <img
                    src="/certs/mmdusa.jpg"
                    alt="Profile"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top md:object-center"
                  />
                </div>

                <div className="px-2 py-6 flex flex-col items-center">
                  <h2 className="font-semibold text-xl">Aria Rajabi</h2>
                  <p className="text-white/60 text-sm">@Mmmdusa</p>

                  {/* Social icons */}
                  <div className="mt-5 flex items-center gap-4 flex-wrap justify-center">
                    <a
                      href="https://linkedin.com/in/mohammadhosseinrajabi"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={22} />
                    </a>
                    <a
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                      aria-label="GitHub"
                    >
                      <Github size={22} />
                    </a>
                    <a
                      href="mailto:you@example.com"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                      aria-label="Email"
                    >
                      <Mail size={22} />
                    </a>
                    <a
                      href="tel:+0000000000"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                      aria-label="Phone"
                    >
                      <Phone size={22} />
                    </a>
                    <a
                      href="https://your-site.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                      aria-label="Website"
                    >
                      <Globe size={22} />
                    </a>
                  </div>

                  <Link
                    to="/contact"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 h-12 text-sm font-semibold"
                  >
                    {L("btn_contact_me", "Contact me")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="col-span-12 md:col-span-8">
              {/* About */}
              <div className="rounded-3xl bg-[#17181b] p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  {L("credentials_about_title", "About ME")}
                </h3>
                <p className="text-sm text-white/80 leading-6">{aboutText}</p>
              </div>

              {/* Skills */}
              <div className="mt-6 rounded-3xl bg-[#17181b] p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {L("credentials_skills_title", "SKILLS")}
                </h3>

                <div className="grid grid-cols-12 gap-5 text-sm">
                  {skills.map((s) => (
                    <div key={s.id} className="col-span-12 sm:col-span-6">
                      <div className="rounded-2xl bg-black/20 p-4">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-semibold">{s.title}</h4>
                          <span className="text-white/60">{s.pct}</span>
                        </div>
                        <p className="mt-2 text-white/70 leading-6">{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cover Letters */}
              {recommendations.length > 0 && (
                <div className="mt-6 rounded-3xl bg-[#17181b] p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    {recommendationsTitle}
                  </h3>

                  <div className="grid grid-cols-12 gap-5">
                    {recommendations.map((rec, i) => (
                      <div
                        key={rec.id ?? i}
                        className="col-span-12 md:col-span-6"
                      >
                        <div
                          onClick={() => setSelectedRec(rec)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedRec(rec);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={`Open cover letter from ${rec.name}`}
                          className="relative rounded-3xl bg-black/20 p-5 md:p-6 shadow-inner cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 transition"
                        >
                          {/* Avatar */}
                          <div className="absolute -top-6 left-6">
                            <img
                              src={rec.avatar ?? "/recs/default.jpg"}
                              alt={rec.name}
                              className="h-16 w-16 rounded-2xl object-cover shadow-lg border border-white/10 bg-black/30"
                              loading="lazy"
                            />
                          </div>

                          <div className="pt-10">
                            <h4 className="text-lg md:text-xl font-semibold">
                              {rec.name}
                            </h4>
                            {rec.title && (
                              <p className="text-white/60 text-sm mt-0.5">
                                {rec.title}
                              </p>
                            )}
                            <p className="text-white/80 text-sm mt-3 line-clamp-3">
                              {rec.preview}
                            </p>
                          </div>

                          {/* subtle hover outline */}
                          <span className="pointer-events-none absolute inset-0 rounded-3xl ring-0 group-hover:ring-1 ring-white/10 transition" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cover Letters Modal */}
        {selectedRec && (
          <div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setSelectedRec(null)}
            />
            <div className="relative z-10 w-full md:max-w-2xl bg-[#17181b] rounded-t-3xl md:rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <img
                  src={selectedRec.avatar ?? "/recs/default.jpg"}
                  alt={selectedRec.name}
                  className="h-12 w-12 rounded-xl object-cover border border-white/10"
                />
                <div className="min-w-0">
                  <h4 className="text-lg font-semibold">{selectedRec.name}</h4>
                  {selectedRec.title && (
                    <p className="text-white/60 text-sm">{selectedRec.title}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedRec(null)}
                  className="ml-auto rounded-xl bg-white/10 hover:bg-white/20 p-2"
                  aria-label="Close"
                >
                  <X />
                </button>
              </div>

              <article className="text-white/90 text-sm leading-7 mt-4 space-y-3">
                {(selectedRec.content ?? [selectedRec.preview]).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </article>
            </div>
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
