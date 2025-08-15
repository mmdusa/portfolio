// src/pages/Certificates.jsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { ExternalLink, FileDown, MoreHorizontal, X } from "lucide-react";

function normalizeCert(c, i) {
  return {
    id: c.id || `cert-${i}`,
    title: c.title ?? "Untitled",
    issuer: c.issuer ?? "",
    date: c.date ?? "",
    img: c.img ?? "/certs/default.png",
    desc: c.desc ?? "",
    viewUrl: c.viewUrl ?? "",
    downloadUrl: c.downloadUrl ?? "",
  };
}

export default function Certificates() {
  const { language } = useLanguage();
  const t = translations[language] ?? {};
  const L = (k, en) => t?.[k] ?? en;

  // Fallback for legacy keys (so nothing breaks)
  const legacyFallback = [
    {
      id: "frontend",
      title: L("cert_frontend_title", "Frontend Developer"),
      issuer: L("cert_frontend_issuer", "ValaCoding"),
      date: L("cert_frontend_date", "2024"),
      img: "/certs/frontend.png",
      desc: L(
        "cert_frontend_desc",
        "This certificate validates my expertise in modern frontend development, including React.js, Next.js, responsive design, and best practices for building high-performance web applications."
      ),
      viewUrl: "#",
      downloadUrl: "#",
    },
    {
      id: "ielts",
      title: L("cert_ielts_title", "IELTS Academic – Overall Band 7.5"),
      issuer: L("cert_ielts_issuer", "British Council / IDP"),
      date: L("cert_ielts_date", "2023"),
      img: "/certs/ielts.png",
      desc: L(
        "cert_ielts_desc",
        "Certified English proficiency at the C1 level, demonstrating excellent skills in reading, writing, speaking, and listening."
      ),
      viewUrl: "#",
      downloadUrl: "#",
    },
  ];

  // Prefer the array from translations if present
  const source = useMemo(() => {
    const list = t?.certificates_list;
    return Array.isArray(list) && list.length ? list : legacyFallback;
  }, [t]);

  const data = useMemo(() => source.map(normalizeCert), [source]);

  const [open, setOpen] = useState(null); // id of the cert opened in modal

  return (
    <PageWrapper>
      <section className="min-h-[92vh] w-full bg-[#0f0f11] text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-center text-2xl md:text-3xl font-bold tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {L("certificates_title", "ALL CERTIFICATES")}
          </h1>

          <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6">
            {data.map((c, i) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 160,
                  damping: 20,
                }}
                className="col-span-12 md:col-span-6 rounded-3xl bg-[#17181b] shadow-lg p-5 md:p-6 relative overflow-hidden"
              >
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="grid place-items-center rounded-full bg-black/20 w-28 h-28 md:w-36 md:h-36 shadow-inner">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-semibold truncate">
                      {c.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-0.5">
                      {c.issuer} {c.date ? `• ${c.date}` : ""}
                    </p>
                    <p className="text-white/70 text-sm mt-2 line-clamp-3 md:line-clamp-3">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(c.id)}
                  className="absolute right-4 bottom-4 inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 p-2 transition"
                  aria-label="More"
                >
                  <MoreHorizontal />
                </button>
              </motion.article>
            ))}
          </div>
        </div>

        {data.map((c) =>
          open === c.id ? (
            <div
              key={c.id}
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
              aria-modal="true"
              role="dialog"
            >
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setOpen(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                className="relative z-10 w-full md:max-w-2xl bg-[#17181b] rounded-t-3xl md:rounded-3xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="grid place-items-center rounded-full bg-black/20 w-16 h-16">
                    <img
                      src={c.img}
                      alt=""
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold">{c.title}</h3>
                    <p className="text-white/60 text-sm">
                      {c.issuer} {c.date ? `• ${c.date}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    className="ml-auto rounded-xl bg-white/10 hover:bg-white/20 p-2"
                    aria-label="Close"
                  >
                    <X />
                  </button>
                </div>

                <p className="text-white/80 text-sm leading-6 mt-4">{c.desc}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {!!c.viewUrl && (
                    <a
                      href={c.viewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-4 h-10 text-sm"
                    >
                      <ExternalLink size={16} />
                      {L("cert_btn_view", "View")}
                    </a>
                  )}
                  {!!c.downloadUrl && (
                    <a
                      href={c.downloadUrl}
                      className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 px-4 h-10 text-sm"
                    >
                      <FileDown size={16} />
                      {L("cert_btn_download", "Download")}
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          ) : null
        )}
      </section>
    </PageWrapper>
  );
}
