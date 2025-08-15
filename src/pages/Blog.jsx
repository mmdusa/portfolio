import PageWrapper from "../components/PageWrapper";
import { posts } from "../data/posts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const grid = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.12 },
  },
};
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function Blog() {
  const { language } = useLanguage();
  const t = translations[language] ?? {};

  // If you provide translations.blog_posts, we use those; else fallback to /data/posts
  const localizedPosts =
    Array.isArray(t.blog_posts) && t.blog_posts.length ? t.blog_posts : posts;

  return (
    <PageWrapper>
      <section className="min-h-[92vh] w-full bg-[#0f0f11] text-white relative pb-24 md:pb-28">
        <div className="mx-auto max-w-6xl px-4 pt-10 md:pt-12">
          <h1 className="text-center text-2xl md:text-3xl font-extrabold tracking-wide mb-8">
            {t.blog_title || "Blog"}
          </h1>

          <motion.div
            variants={grid}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
          >
            {localizedPosts.map((p) => (
              <motion.article
                key={p.slug}
                variants={card}
                className="rounded-2xl bg-[#121317] shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                {/* Author row */}
                <div className="px-5 md:px-6 pt-5 md:pt-6 flex items-center gap-3">
                  <img
                    src="/mmdusa.jpg"
                    alt={p.author}
                    className="h-8 w-8 rounded-full object-cover opacity-90"
                  />
                  <span className="text-[13px] text-white/70">{p.author}</span>
                </div>

                {/* Cover image */}
                <div className="px-5 md:px-6 pt-4">
                  <div className="h-48 md:h-56 bg-black/10 rounded-xl grid place-content-center">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="h-40 md:h-44 object-contain opacity-95"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] md:text-sm text-white/70 flex-1">
                    {p.excerpt}
                  </p>

                  {/* Divider + Read More button */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <Link
                      to={`/blog/${p.slug}`}
                      className="w-full inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 transition"
                    >
                      {t.blog_read_more || "READ MORE"}
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
