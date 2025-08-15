// src/pages/BlogPost.jsx
import PageWrapper from "../components/PageWrapper";
import { useParams, Link, useNavigate } from "react-router-dom";
import { posts } from "../data/posts";
import { MessageSquareText, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { useEffect, useState } from "react";

const COMMENTS_API = "/.netlify/functions/comments"; // Netlify function

export default function BlogPost() {
  const { language } = useLanguage();
  const t = translations[language] ?? {};
  const { slug } = useParams();
  const navigate = useNavigate();

  // Prefer localized posts if provided
  const sourcePosts =
    Array.isArray(t.blog_posts) && t.blog_posts.length ? t.blog_posts : posts;

  const post = sourcePosts.find((p) => p.slug === slug);

  // --- comments state ---
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // ✅ Load from cache instantly, then refresh from server
  useEffect(() => {
    if (!slug) return;

    // 1. Load cached
    const cached = localStorage.getItem(`comments:${slug}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setComments(parsed);
      } catch {}
    }

    // 2. Fetch fresh
    const loadFresh = async () => {
      try {
        const res = await fetch(
          `${COMMENTS_API}?slug=${encodeURIComponent(slug)}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setComments(data);
          localStorage.setItem(`comments:${slug}`, JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    };

    loadFresh();
  }, [slug]);

  // ✅ Submit comment
  const submitComment = async () => {
    setStatus("saving");
    try {
      const res = await fetch(COMMENTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const json = await res.json();
      if (res.ok && json.ok) {
        setForm({ name: "", email: "", message: "" });
        setStatus("success");
        setTimeout(() => setStatus("idle"), 1200);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (!post) {
    return (
      <PageWrapper>
        <section className="min-h-[70vh] bg-[#0f0f11] text-white grid place-content-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {t.blog_post_not_found || "Post not found"}
            </h2>
            <Link to="/blog" className="text-indigo-400 hover:underline">
              {t.blog_back_to_list || "Back to Blog"}
            </Link>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="min-h-[92vh] w-full bg-[#0f0f11] text-white relative pb-24 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 pt-8 md:pt-12">
          {/* Hero */}
          <div className="flex items-center gap-4 md:gap-6">
            <img
              src={post.cover}
              alt={post.title}
              className="h-20 w-20 md:h-28 md:w-28 object-contain"
            />
            <h1 className="text-2xl md:text-4xl font-extrabold">
              {post.title}
            </h1>
          </div>

          {/* Author */}
          <div className="mt-6 flex items-center gap-3">
            <img
              src="/mmdusa.jpg"
              alt={post.author}
              className="h-10 w-10 rounded-full object-cover border border-white/10"
            />
            <div className="text-sm">
              <div className="font-medium">{post.author}</div>
              {post.role && <div className="text-white/60">{post.role}</div>}
            </div>
          </div>

          {/* Content */}
          <article className="mt-8 rounded-2xl bg-[#17181b] border border-white/5 p-6 leading-7 text-white/90">
            {(post.content ?? []).map((para, i) => (
              <p key={i} className="mb-4">
                {para}
              </p>
            ))}
          </article>

          {/* Back button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 font-medium transition"
            >
              {t.blog_back || "Back"}
            </button>
          </div>

          {/* Comments list */}
          <div className="mt-10 rounded-2xl bg-[#17181b] border border-white/10 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              {t.blog_comments_title || "Comments"}
            </h3>

            {comments.length === 0 ? (
              <p className="text-white/60">
                {t.blog_comments_empty ||
                  "No comments yet. After approval, they will appear here."}
              </p>
            ) : (
              <ul className="space-y-4">
                {comments.map((c) => (
                  <li
                    key={c.id}
                    className="rounded-xl bg-black/20 border border-white/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-white/50">
                          {new Date(c.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap">{c.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Comment form */}
          <div className="mt-6 rounded-2xl bg-[#17181b] border border-white/10 p-6 md:p-8 relative">
            <div className="absolute left-3 top-3 opacity-70 pointer-events-none">
              <MessageSquareText size={24} />
            </div>
            <div className="hidden sm:block absolute right-3 top-3 opacity-60 pointer-events-none">
              <Sparkles size={22} />
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-purple-400">
              {t.blog_comment_title || "Create a comment"}
            </h2>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  !form.name.trim() ||
                  !form.email.trim() ||
                  !form.message.trim()
                ) {
                  return;
                }
                submitComment();
              }}
            >
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  {t.blog_form_name || "Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 placeholder-white/40"
                  placeholder={t.blog_form_placeholder_name || "Name *"}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  {t.blog_form_email || "Email *"}
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 placeholder-white/40"
                  placeholder={t.blog_form_placeholder_email || "Email *"}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  {t.blog_form_message || "Your Message *"}
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, message: e.target.value }))
                  }
                  className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 placeholder-white/40 min-h-[140px]"
                  placeholder={
                    t.blog_form_placeholder_message || "Write your comment…"
                  }
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "saving"}
                  className="rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-60 disabled:cursor-not-allowed border border-white/10 px-6 py-3 font-medium transition"
                >
                  {status === "saving"
                    ? t.blog_form_sending || "Sending…"
                    : t.blog_form_send || "Send Comment"}
                </button>

                {status === "success" && (
                  <span className="text-green-400 text-sm">
                    {t.blog_form_success ||
                      "Thanks! Your comment is awaiting moderation."}
                  </span>
                )}
                {status === "error" && (
                  <span className="text-red-400 text-sm">
                    {t.blog_form_error_generic ||
                      "Something went wrong. Please try again."}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
