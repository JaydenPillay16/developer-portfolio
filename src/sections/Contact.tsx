import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "../components/config/contact";

import { motion, useReducedMotion } from "motion/react";
import { FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type SubmissionStatus = "" | "success" | "error";

function Contact() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<SubmissionStatus>("");
  const [isSending, setIsSending] = useState(false);

  const smoothEase = [0.22, 1, 0.36, 1] as const;

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status) {
      setStatus("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) return;

    setIsSending(true);
    setStatus("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          reply_to: formData.email.trim(),
          company: formData.company.trim() || "Not provided",
          message: formData.message.trim(),
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#080d1c]/80 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/10";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-[#080b20] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/[0.07] blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet-600/[0.08] blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.12)_0.7px,transparent_0.7px)] [background-size:26px_26px] opacity-[0.08]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-24">
          {/* Left: Introduction */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              ease: smoothEase,
            }}
            className="text-left"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 sm:text-sm">
              Get In Touch
            </p>

            <h2
              id="contact-heading"
              className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl"
            >
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                meaningful
              </span>
            </h2>

            {/* Animated glowing underline */}
            <motion.div
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                ease: smoothEase,
              }}
              className="relative mt-6 h-[3px] w-32 origin-left overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_16px_rgba(59,130,246,0.35)]"
            >
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]"
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{
                    duration: 1.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1.2,
                  }}
                />
              )}
            </motion.div>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-400 sm:text-lg">
              I&apos;m always interested in connecting with people, exploring
              opportunities, and building useful technology. Whether you&apos;re
              recruiting, have a project in mind, or simply want to collaborate,
              let&apos;s start a conversation.
            </p>

            {/* Social links */}
            <div className="mt-10">
              <p className="mb-5 text-sm font-medium text-slate-400">
                You can also find me on
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/JaydenPillay16"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit my GitHub profile"
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]"
                >
                  <FaGithub
                    aria-hidden="true"
                    className="text-xl transition-transform duration-300 group-hover:scale-110"
                  />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/jayden-pillay-44947a261/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit my LinkedIn profile"
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/[0.05] hover:text-white hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]"
                >
                  <FaLinkedin
                    aria-hidden="true"
                    className="text-xl text-[#0A66C2] transition-transform duration-300 group-hover:scale-110"
                  />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.12,
              ease: smoothEase,
            }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 blur-xl" />

            <div className="relative rounded-3xl border border-white/[0.10] bg-[#0d1329]/90 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8 lg:p-9">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
                  Your next step
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Send me a message
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Tell me a little about yourself and what you have in mind.
                  I&apos;d love to hear from you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Full name <span className="text-blue-400">*</span>
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Email address <span className="text-blue-400">*</span>
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={254}
                    />
                  </div>
                </div>

                {/* Optional company */}
                <div>
                  <label
                    htmlFor="contact-company"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Company{" "}
                    <span className="font-normal text-slate-500">
                      (optional)
                    </span>
                  </label>

                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Your company or organisation"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={150}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Your message <span className="text-blue-400">*</span>
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your opportunity, project, or idea..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} min-h-36 resize-y`}
                    required
                    minLength={10}
                    maxLength={3000}
                  />

                  <p className="mt-2 text-right text-xs text-slate-500">
                    {formData.message.length}/3000
                  </p>
                </div>

                {/* Success and error messages */}
                {status && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                      status === "success"
                        ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300"
                        : "border-red-400/20 bg-red-400/[0.06] text-red-300"
                    }`}
                  >
                    {status === "success"
                      ? "Your message has been sent successfully! Thanks for reaching out."
                      : "Sorry, your message couldn't be sent. Please try again in a moment."}
                  </p>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={
                    shouldReduceMotion || isSending
                      ? undefined
                      : { y: -2, scale: 1.01 }
                  }
                  whileTap={
                    shouldReduceMotion || isSending
                      ? undefined
                      : { scale: 0.98 }
                  }
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 via-blue-600 to-violet-600 px-6 py-4 font-semibold text-white shadow-[0_8px_30px_rgba(79,70,229,0.18)] transition-shadow duration-300 hover:shadow-[0_8px_35px_rgba(99,102,241,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1329] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSending ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      />
                      Sending message...
                    </>
                  ) : (
                    <>
                      {status === "success" ? "Message sent!" : "Send message"}
                      <FaPaperPlane
                        aria-hidden="true"
                        className="text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs leading-5 text-slate-500">
                  Your details will be used to respond to your enquiry.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-sm text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Jayden Pillay. All rights reserved.
          </p>
          <p>Designed with purpose. Built with code.</p>
        </footer>
      </div>
    </section>
  );
}

export default Contact;
