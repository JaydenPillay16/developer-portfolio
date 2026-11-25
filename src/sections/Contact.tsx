import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import jpLogo from "../assets/jp-monogram.png";

import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "../components/config/contact";

import { Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type ContactField = "name" | "email" | "message";
type FieldErrors = Partial<Record<ContactField, string>>;
type DeliveryFailure = "offline" | "rateLimit" | "unconfirmed" | "error";
type SubmissionStatus = "" | "success" | "validation" | DeliveryFailure;

const linkedInUrl = "https://www.linkedin.com/in/jayden-pillay-44947a261/";
const deliveryMessages: Record<DeliveryFailure, string> = {
  offline: "You’re offline. Reconnect and try again.",
  rateLimit: "Too many attempts. Wait a moment before trying again.",
  unconfirmed: "I couldn’t confirm delivery. If you’re unsure whether it arrived, follow up on LinkedIn.",
  error: "Your message couldn’t be sent. Try again or contact me on LinkedIn.",
};

const currentYear = new Date().getFullYear();

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<SubmissionStatus>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSending, setIsSending] = useState(false);
  const sendingRef = useRef(false);
  const deliveryFailure = status && status !== "success" && status !== "validation" ? status : null;

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "name" || name === "email" || name === "message") {
      setFieldErrors((previous) => ({ ...previous, [name]: undefined }));
    }

    if (status === "success" || status === "validation") {
      setStatus("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (sendingRef.current) return;

    const nextErrors: FieldErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address, such as name@example.com.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Please enter a message.";
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = "Please use at least 10 characters so I can respond helpfully.";
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("validation");
      const firstInvalidField = (Object.keys(nextErrors) as ContactField[])[0];
      const inputIds: Record<ContactField, string> = {
        name: "contact-name",
        email: "contact-email",
        message: "contact-message",
      };
      document.getElementById(inputIds[firstInvalidField])?.focus();
      return;
    }

    if (!navigator.onLine) {
      setStatus("offline");
      return;
    }

    sendingRef.current = true;
    setIsSending(true);
    setStatus("");

    let timeout: number | undefined;
    const deliveryTimeout = new Error("Delivery confirmation timed out");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      const delivery = emailjs.send(
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
      await Promise.race([
        delivery,
        new Promise<never>((_, reject) => {
          timeout = window.setTimeout(() => reject(deliveryTimeout), 15_000);
        }),
      ]);

      setStatus("success");
      setFieldErrors({});

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      if (!navigator.onLine) setStatus("offline");
      else if (error === deliveryTimeout) setStatus("unconfirmed");
      else if (typeof error === "object" && error !== null && "status" in error && error.status === 429) {
        setStatus("rateLimit");
      } else setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      sendingRef.current = false;
      setIsSending(false);
    }
  }

  const inputClass =
    "w-full rounded-[5px] border border-[#9eb2c8] bg-[#f8fbff] px-3.5 py-3 text-base text-[#0b1b30] placeholder:text-[#52677d] transition-colors focus:border-[#1555bf] focus-visible:outline-offset-2";

  const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="contact-section bg-[#f3f7fc] text-[#0b1b30]"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-24">
          <div data-scroll-reveal>
            <h2
              id="contact-heading"
              className="max-w-xl text-balance text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.055em]"
            >
              Let&apos;s build something <span className="text-[#1555bf]">meaningful.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#30455d] sm:text-lg sm:leading-8">
              I&apos;m always interested in connecting with people, exploring
              opportunities, and building useful technology. Whether you&apos;re
              recruiting, have a project in mind, or simply want to collaborate,
              let&apos;s start a conversation.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#bdcde0] pt-4">
              <a
                href="https://github.com/JaydenPillay16"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1555bf]! underline! underline-offset-4 hover:text-[#0b1b30]!"
              >
                <FaGithub aria-hidden="true" className="size-4" />
                GitHub
              </a>

              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1555bf]! underline! underline-offset-4 hover:text-[#0b1b30]!"
              >
                <FaLinkedin aria-hidden="true" className="size-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="min-w-0 border-t-2 border-[#2875ff] bg-white px-4 py-6 sm:border-x sm:border-b sm:border-x-[#cfdae7] sm:border-b-[#cfdae7] sm:p-8">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Send me a message
            </h3>
            <p className="mb-6 mt-2 text-sm leading-6 text-[#52677d]">
              Tell me a little about yourself and what you have in mind.
              I&apos;d love to hear from you.
            </p>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name and email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-[#243c57]"
                  >
                    Full name <span className="text-[#1555bf]">*</span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                  readOnly={isSending}
                    className={`${inputClass} aria-invalid:border-red-700`}
                    aria-invalid={fieldErrors.name ? true : undefined}
                    aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                    required
                    maxLength={100}
                  />
                  {fieldErrors.name && (
                    <p id="contact-name-error" className="mt-2 text-sm text-red-800">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-[#243c57]"
                  >
                    Email address <span className="text-[#1555bf]">*</span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  readOnly={isSending}
                    className={`${inputClass} aria-invalid:border-red-700`}
                    aria-invalid={fieldErrors.email ? true : undefined}
                    aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                    required
                    maxLength={254}
                  />
                  {fieldErrors.email && (
                    <p id="contact-email-error" className="mt-2 text-sm text-red-800">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Optional company */}
              <div>
                <label
                  htmlFor="contact-company"
                  className="mb-2 block text-sm font-medium text-[#243c57]"
                >
                  Company{" "}
                  <span className="font-normal text-[#52677d]">
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
                  readOnly={isSending}
                  className={inputClass}
                  maxLength={150}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-[#243c57]"
                >
                  Your message <span className="text-[#1555bf]">*</span>
                </label>
                <p id="contact-message-hint" className="mb-2 text-sm text-[#52677d]">
                  Use at least 10 characters.
                </p>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your opportunity, project, or idea..."
                  value={formData.message}
                  onChange={handleChange}
                  readOnly={isSending}
                  className={`${inputClass} min-h-36 resize-y aria-invalid:border-red-700`}
                  aria-invalid={fieldErrors.message ? true : undefined}
                  aria-describedby={fieldErrors.message ? "contact-message-error" : "contact-message-hint"}
                  required
                  minLength={10}
                  maxLength={3000}
                />

                {fieldErrors.message && (
                  <p id="contact-message-error" className="mt-2 text-sm text-red-800">
                    {fieldErrors.message}
                  </p>
                )}

                <p className="mt-2 text-right text-xs text-[#52677d]">
                  {formData.message.length}/3000
                </p>
              </div>

              <div className={status ? `rounded-xl border px-4 py-3 text-sm leading-6 ${
                status === "success"
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                  : "border-red-200 bg-red-50 text-red-900"
              }` : "sr-only"}>
                <p role="status">
                  {status === "success"
                    ? "Message sent. Thanks for reaching out."
                    : status === "validation"
                      ? "Please correct the highlighted fields, then try again."
                      : deliveryFailure
                        ? `${deliveryMessages[deliveryFailure]} Your draft is still here.`
                        : isSending ? "Sending your message." : ""}
                </p>
                {deliveryFailure && (
                  <a href={linkedInUrl} target="_blank" rel="noreferrer"
                    className="mt-1 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
                    Contact me on LinkedIn (opens in a new tab)
                  </a>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex min-h-[54px] w-full items-center justify-between gap-5 rounded-[5px] bg-[#1659cd] px-5 py-3 font-bold text-white shadow-[0_4px_0_#0e3c8d] transition-colors hover:bg-[#1049ac] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSending ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 motion-safe:animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    Sending message...
                  </>
                ) : (
                  <>
                    {deliveryFailure ? "Try again" : "Send message"}
                    <Send aria-hidden="true" className="size-4" strokeWidth={1.8} />
                  </>
                )}
              </button>

              <p className="text-xs leading-5 text-[#52677d]">
                Your details will be used to respond to your enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
      <footer aria-label="Site footer" className="bg-[#091a2e] text-[#e0ebf9]">
        <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-12 lg:px-12">
          <div className="grid gap-10 pb-10 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
            <div>
              <a
                href="#home"
                aria-label="Jayden Pillay - Home"
                className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <img
                  src={jpLogo}
                  alt=""
                  aria-hidden="true"
                  className="h-9 w-16 shrink-0 object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold tracking-wide text-white sm:text-[15px]">
                    Jayden Pillay
                  </span>
                  <span className="mt-1 text-[#91baff] text-[9px] font-semibold tracking-[0.19em] sm:text-[10px]">
                    SOFTWARE ENGINEER
                  </span>
                </span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#bdcee3]">
                Building thoughtful software across cloud, automation, and enterprise technology.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9eb4ce]">Explore</h3>
              <ul className="grid grid-cols-2 gap-x-7 gap-y-2 sm:grid-cols-3 sm:gap-x-12">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex py-1 text-sm text-[#bdcee3] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/[0.07] py-5 text-xs text-[#9eb4ce] sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear} Jayden Pillay. All rights reserved.</p>
            <p className="tracking-wide">Designed with purpose. Built with code.</p>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Contact;
