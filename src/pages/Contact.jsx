import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Phone,
  Instagram,
  MessageSquareText,
  Sparkles,
  MessageCircle,
  Send,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const gridStagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.25, staggerChildren: 0.12 },
  },
};

const popIn = (i = 0) => {
  const d = i % 3;
  const offset = d === 0 ? { x: -50 } : d === 1 ? { x: 50 } : { y: 50 };
  return {
    hidden: { opacity: 0, scale: 0.96, ...offset },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20, mass: 1.1 },
    },
  };
};

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language] ?? {};
  const L = {
    info: t.contact_info || "Contact Info",
    mail_me: t.contact_mail_me || "Mail me",
    linkedin: t.contact_linkedin || "LinkedIn",
    github: t.contact_github || "GitHub",
    phone: t.contact_phone || "Phone",
    instagram: t.contact_instagram || "Instagram",
    whatsapp: t.contact_whatsapp || "WhatsApp",
    telegram: t.contact_telegram || "Telegram",

    heading: t.contact_heading || "Let’s work together",
    name_label: t.contact_form_name || "Name",
    name_ph: t.contact_form_placeholder_name || "Your name",
    email_label: t.contact_form_email || "Email",
    email_ph: t.contact_form_placeholder_email || "Your email",
    subject_label: t.contact_form_subject || "Your Subject",
    subject_ph: t.contact_form_placeholder_subject || "What’s this about?",
    message_label: t.contact_form_message || "Your Message",
    message_ph:
      t.contact_form_placeholder_message ||
      "Tell me a little about your project…",
    send: t.contact_form_send || "Send Message",
    sending: t.contact_form_sending || "Sending…",
    success: t.contact_form_success || "Thanks! Your message has been sent.",
    error_generic:
      t.contact_form_error_generic || "Something went wrong. Please try again.",
    error_network:
      t.contact_form_error_network || "Network error. Please try again.",
  };

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://formspree.io/f/myzplekr", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(json?.errors?.[0]?.message || L.error_generic);
      }
    } catch {
      setStatus("error");
      setErrorMsg(L.error_network);
    }
  };

  return (
    <PageWrapper>
      <section className="min-h-[92vh] w-full bg-[#0f0f11] text-white relative pb-24 md:pb-28">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <motion.div
            className="grid grid-cols-12 gap-3 md:gap-4"
            variants={gridStagger}
            initial="hidden"
            animate="visible"
          >
            {/* LEFT */}
            <motion.aside
              variants={popIn(0)}
              className="col-span-12 md:col-span-3 rounded-2xl bg-[#17181b] shadow-lg p-5 md:p-6 h-full space-y-4"
            >
              <p className="text-xs text-white/50 uppercase tracking-wide mb-2">
                {L.info}
              </p>

              <ContactItem
                icon={<Mail size={20} />}
                label={L.mail_me}
                value="momo.tkd19@gmail.com"
                href="mailto:momo.tkd19@gmail.com"
              />
              <ContactItem
                icon={<Linkedin size={20} />}
                label={L.linkedin}
                value="mohammadhosseinrajabi"
                href="https://linkedin.com/in/mohammadhosseinrajabi"
              />
              <ContactItem
                icon={<Github size={20} />}
                label={L.github}
                value="MmdUsa"
                href="https://github.com/MmdUsa"
              />
              <ContactItem
                icon={<Phone size={20} />}
                label={L.phone}
                value="+39 327 037 6929"
                href="tel:+393270376929"
              />
              <ContactItem
                icon={<Instagram size={20} />}
                label={L.instagram}
                value="@mmd__usa"
                href="https://instagram.com/mmd__usa"
              />
              <ContactItem
                icon={<MessageCircle size={20} />}
                label={L.whatsapp}
                value="+39 327 037 6929"
                href="https://wa.me/393270376929"
              />
              <ContactItem
                icon={<Send size={20} />}
                label={L.telegram}
                value="Mmd_husa"
                href="https://t.me/Mmd_husa"
              />
            </motion.aside>

            {/* RIGHT */}
            <motion.section
              variants={popIn(1)}
              className="relative col-span-12 md:col-span-9 rounded-2xl bg-gradient-to-br from-[#17181b] to-[#101114] shadow-lg p-5 md:p-11 pt-16 md:pt-11"
            >
              <div className="absolute left-3 top-3 md:left-4 md:top-4 opacity-60 pointer-events-none z-0">
                <MessageSquareText size={26} />
              </div>
              <div className="hidden sm:block absolute right-3 top-3 md:right-4 md:top-4 opacity-50 pointer-events-none z-0">
                <Sparkles size={22} />
              </div>

              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
                    {t.contact_heading_first}{" "}
                    <span className="text-purple-400">
                      {t.contact_heading_second}
                    </span>
                  </h1>
                </h1>

                <form
                  className="space-y-4 md:space-y-5"
                  onSubmit={handleSubmit}
                >
                  <FormRow
                    name="name"
                    label={L.name_label}
                    placeholder={L.name_ph}
                    required
                  />
                  <FormRow
                    name="email"
                    label={L.email_label}
                    type="email"
                    placeholder={L.email_ph}
                    required
                  />
                  <FormRow
                    name="subject"
                    label={L.subject_label}
                    placeholder={L.subject_ph}
                  />
                  <div>
                    <label className="mb-2 block text-sm text-white/70">
                      {L.message_label}
                    </label>
                    <textarea
                      name="message"
                      required
                      className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 placeholder-white/40 min-h-[140px]"
                      placeholder={L.message_ph}
                    />
                  </div>

                  {/* honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    className="hidden"
                    tabIndex={-1}
                  />

                  {/* status area */}
                  <div
                    className="min-h-[28px] text-sm"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {status === "success" && (
                      <span className="text-green-400">{L.success}</span>
                    )}
                    {status === "error" && (
                      <span className="text-red-400">{errorMsg}</span>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full md:w-auto rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-60 disabled:cursor-not-allowed border border-white/10 px-6 py-3 font-medium transition"
                    >
                      {status === "loading" ? L.sending : L.send}
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}

function ContactItem({ icon, label, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl bg-black/20 p-3 md:p-4 hover:bg-black/30 transition min-h-[74px] md:min-h-[88px]"
    >
      <span className="inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-white/10">
        {icon}
      </span>
      <div className="overflow-hidden">
        <p className="text-[11px] text-white/50 leading-none">{label}</p>
        <span className="text-[13px] md:text-[14px] font-medium block truncate">
          {value}
        </span>
      </div>
    </a>
  );
}

function FormRow({ name, label, type = "text", placeholder = "", required }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-white/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 placeholder-white/40"
      />
    </div>
  );
}
