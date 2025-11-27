// src/pages/About.jsx
import PageWrapper from "../components/PageWrapper";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { useMemo, useRef, useState, useEffect } from "react";

/* === Circular gauge === */
function CircleGauge({
  label,
  percent,
  size = "clamp(96px, 11vw, 120px)",
  className = "",
}) {
  const p = Math.min(100, Math.max(0, percent));
  const angle = p * 3.6;
  const styleSize = typeof size === "number" ? `${size}px` : size;
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className="relative rounded-full shadow-[inset_0_0_0_2px_rgba(0,0,0,0.45)]"
        style={{ width: styleSize, height: styleSize }}
        aria-label={`${label} ${p}%`}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(#60a5fa 0deg, #a78bfa ${angle}deg, #1b1c20 ${angle}deg 360deg)`,
          }}
        />
        <div className="absolute inset-2 rounded-full bg-[#0f1013] grid place-items-center">
          <div className="text-center leading-tight">
            <div className="text-[11px] text-white/65">{label}</div>
            <div className="mt-[2px] text-[14px] font-semibold text-white/85">
              {p}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === Helpers for slider === */
const chunk = (arr, n) =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) =>
    arr.slice(i * n, i * n + n)
  );

const useSlider = () => {
  const ref = useRef(null);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setPage(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const goTo = (i) =>
    ref.current?.scrollTo({
      left: i * ref.current.clientWidth,
      behavior: "smooth",
    });
  return { ref, page, goTo };
};

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];

  const gauges = [
    { label: "Next.js", percent: 80 },
    { label: "React.js", percent: 85 },
    { label: "Tailwind", percent: 70 },
    { label: "JavaScript", percent: 85 },
    { label: "CSS", percent: 75 },
    { label: "HTML", percent: 85 },
  ];

  const slides = useMemo(() => chunk(gauges, 4), [gauges]); // 4 per page
  const { ref: railRef, page, goTo } = useSlider();

  return (
    <PageWrapper>
      <section className="min-h-[92vh] w-full bg-[#0f0f11] text-white relative pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-8">
          {/* ===== CARD ===== */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#1b1c1f] to-[#131416] shadow-lg p-6 md:p-8">
            {/* sparkle */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              className="absolute left-4 top-3 opacity-60"
            >
              <path
                d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"
                stroke="white"
                strokeOpacity=".6"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* text + photo */}
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
              <div className="col-span-12 md:col-span-6">
                <h1 className="text-[28px] sm:text-[32px] md:text-[34px] font-extrabold mb-4">
                  {t.name || "Mohammad Rajabi"}
                </h1>
                <p className="text-[14px] sm:text-[15px] leading-7 text-white/90 text-justify max-w-[680px]">
                  {t.intro1}
                  <strong> React</strong>, <strong> Tailwind CSS</strong>,{" "}
                  <strong> Framer Motion</strong>. {t.intro2} {t.intro3}
                </p>
              </div>

              <div className="col-span-12 md:col-span-6 flex justify-center md:justify-end">
                <img
                  src="/my-photo.png"
                  alt={t.name || "Mohammad Rajabi"}
                  className="w-[92%] max-w-[520px] -mt-2 md:mt-0 object-contain rounded-3xl"
                />
              </div>
            </div>

            {/* ===== METERS ===== */}
            <div className="mt-8 md:mt-10">
              {/* LG+ : keep 6 in one row, shrink smoothly */}
              <div className="hidden lg:flex lg:flex-nowrap items-center justify-between gap-4 xl:gap-6">
                {gauges.map((g) => (
                  <CircleGauge
                    key={g.label}
                    label={g.label}
                    percent={g.percent}
                    size="clamp(88px, 9.5vw, 120px)"
                    className="shrink-0"
                  />
                ))}
              </div>

              {/* <LG : paged slider, 4 per page, no peeking */}
              <div
                ref={railRef}
                className="lg:hidden overflow-x-auto snap-x snap-mandatory [scroll-snap-stop:always]
                           [scrollbar-width:none] [-ms-overflow-style:none]"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div className="flex flex-nowrap">
                  {slides.map((group, idx) => (
                    <div key={idx} className="min-w-full shrink-0 snap-start">
                      <div className="grid grid-cols-4 py-2">
                        {group.map((g) => (
                          <div
                            key={g.label}
                            className="flex items-center justify-center"
                          >
                            <CircleGauge
                              label={g.label}
                              percent={g.percent}
                              size="clamp(76px, 20vw, 104px)"
                              className="shrink-0"
                            />
                          </div>
                        ))}
                        {Array.from({ length: 4 - group.length }).map(
                          (_, i) => (
                            <div
                              key={`ph-${i}`}
                              className="flex items-center justify-center"
                            />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* dots */}
              <div className="lg:hidden mt-2 flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === page ? "w-4 bg-white/90" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ===== BOTTOM CARDS ===== */}
          <div className="mt-6 md:mt-8 grid grid-cols-12 gap-4 md:gap-5">
            <div className="col-span-12 md:col-span-6 rounded-3xl bg-[#17181b] shadow-lg p-6">
              <h3 className="text-sm font-semibold tracking-wide text-white/70 mb-6">
                {t.aboutRegisteredCourses}
              </h3>
              <div className="space-y-8 text-[13.5px]">
                <div>
                  <div className="text-white/70">05/2019 – 11/2019</div>
                  <div className="mt-1 font-semibold">
                    HTML, CSS, JavaScript
                  </div>
                  <div className="text-white/60">Everest College</div>
                </div>
                <div>
                  <div className="text-white/70">2020 – 2021</div>
                  <div className="mt-1 font-semibold">
                    HTML, CSS, Bootstrap, JavaScript
                  </div>
                  <div className="text-white/60">ValaCoding</div>
                </div>
                <div>
                  <div className="text-white/70">05/2024 – 12/2024</div>
                  <div className="mt-1 font-semibold">
                    HTML, CSS, JavaScript, Git, React, Next.js
                  </div>
                  <div className="text-white/60">BotoStart</div>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 rounded-3xl bg-[#17181b] shadow-lg p-6">
              <h3 className="text-sm font-semibold tracking-wide text-white/70 mb-6">
                {t.Education}
              </h3>
              <div className="space-y-8 text-[13.5px]">
                <div>
                  <div className="text-white/70">2019 – 2021</div>
                  <div className="mt-1 font-semibold">{t.bachelorTitle}</div>
                  <div className="text-white/60">{t.bachelorPlace}</div>
                </div>
                <div>
                  <div className="text-white/70">
                    2021 – {t.present || "present"}
                  </div>
                  <div className="mt-1 font-semibold">{t.masterTitle}</div>
                  <div className="text-white/60">{t.masterPlace}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
