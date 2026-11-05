"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  PanelsTopLeft,
  CheckCircle2,
  Camera,
  Mail,
  MapPin,
  Music2,
  Send,
  Sparkles,
  Video,
} from "lucide-react";

const exploreLinks = [
  { label: "Explore Studios", href: "/studios" },
  { label: "Photo Studios", href: "/studios?category=photo-studios" },
  { label: "Film Stages", href: "/studios?category=film-stages" },
  { label: "Podcast Rooms", href: "/studios?category=podcast-rooms" },
  { label: "Music Suites", href: "/studios?category=music-suites" },
  { label: "Art Workshops", href: "/studios?category=art-workshops" },
];

const companyLinks = [
  { label: "About Us", href: "/#about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Become a Host", href: "/add-studios" },
  { label: "Contact Us", href: "/contact" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "FAQs", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterMessage("");
    setSubscribed(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Unable to subscribe right now. Please try again.",
        );
      }

      setSubscribed(true);
      setNewsletterMessage(
        result?.message || "You're on the list! Thanks for subscribing.",
      );
      setEmail("");
    } catch (error) {
      setNewsletterMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const linkClass =
    "group inline-flex items-center gap-2 text-sm text-[#C6B8CB] transition duration-200 hover:text-[#D6B98C]";

  const socialClass =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-[#D6B98C]/15 bg-white/[0.03] text-[#C6B8CB] transition duration-200 hover:border-[#D6B98C]/50 hover:bg-[#D6B98C]/10 hover:text-[#D6B98C]";

  return (
    <footer className="relative overflow-hidden bg-[#211629] text-[#F7F1E8]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#A78BBA]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#D6B98C]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="border-b border-[#D6B98C]/15 py-12 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#D6B98C]/20 bg-gradient-to-r from-[#211629] via-[#39243F] to-[#A78BBA] p-6 shadow-xl shadow-black/10 sm:p-9 lg:p-11">
            {/* Newsletter decoration - same as navbar */}
            <div className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full border border-[#D6B98C]/20" />

            <div className="pointer-events-none absolute -right-4 -top-8 h-44 w-44 rounded-full border border-[#D6B98C]/20" />

            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#D6B98C]/10 blur-2xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-12">
              {/* Newsletter Content */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/20 bg-[#D6B98C]/10 px-3 py-1.5 text-xs font-semibold text-[#D6B98C]">
                  <Sparkles className="h-3.5 w-3.5" />
                  A little inspiration in your inbox
                </div>

                <h2 className="max-w-xl text-2xl font-extrabold tracking-tight text-[#F7F1E8] sm:text-3xl lg:text-4xl">
                  Make room for your next big idea.
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-[#F7F1E8]/75">
                  Get creative space inspiration, platform updates, and tips
                  for making your next project happen.
                </p>
              </div>

              {/* Newsletter Form */}
              <div>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Your email address
                  </label>

                  <div className="relative min-w-0 flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A78BBA]" />

                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      maxLength={254}
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setNewsletterMessage("");
                        setSubscribed(false);
                      }}
                      placeholder="Enter your email address"
                      className="h-12 w-full rounded-xl border border-white/20 bg-[#211629]/50 pl-11 pr-4 text-sm text-[#F7F1E8] outline-none transition placeholder:text-[#C6B8CB]/70 focus:border-[#D6B98C] focus:ring-2 focus:ring-[#D6B98C]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D6B98C] px-5 text-sm font-bold text-[#211629] shadow-md shadow-black/10 transition hover:bg-[#E5CCA5] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Joining..." : "Join the list"}
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                {newsletterMessage && (
                  <p
                    role="status"
                    className={`mt-3 flex items-start gap-2 text-xs leading-5 ${
                      subscribed ? "text-emerald-200" : "text-rose-200"
                    }`}
                  >
                    {subscribed && (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    {newsletterMessage}
                  </p>
                )}

                <p className="mt-3 text-xs leading-5 text-[#F7F1E8]/65">
                  By subscribing, you agree to receive updates from
                  StudioSpace. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="StudioSpace home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D6B98C] text-[#211629] shadow-lg shadow-black/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
                <PanelsTopLeft className="h-6 w-6" strokeWidth={2} />
              </span>

              <span className="text-xl font-extrabold tracking-tight text-[#F7F1E8]">
                Studio
                <span className="text-[#D6B98C]">Space</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#C6B8CB]">
              A home for creative spaces and the people who bring ideas to
              life. Discover your next studio, share your workspace, and make
              something extraordinary.
            </p>

            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#A99BAF]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D6B98C]" />
              <span>Connecting creative spaces with creative people.</span>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={socialClass}
              >
                <Camera className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={socialClass}
              >
                <span className="text-sm font-bold leading-none">in</span>
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className={socialClass}
              >
                <Video className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold text-[#F7F1E8]">
              Explore Spaces
            </h3>

            <ul className="mt-5 space-y-3.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-[#F7F1E8]">
              StudioSpace
            </h3>

            <ul className="mt-5 space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/add-studios"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#D6B98C]/25 bg-[#D6B98C]/10 px-4 py-3 text-xs font-bold text-[#D6B98C] transition hover:border-[#D6B98C]/50 hover:bg-[#D6B98C]/20"
            >
              List Your Studio
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-[#F7F1E8]">
              Help & Support
            </h3>

            <ul className="mt-5 space-y-3.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="mailto:support@studiospace.example"
              className="mt-6 inline-flex items-center gap-2 text-sm text-[#C6B8CB] transition hover:text-[#D6B98C]"
            >
              <Mail className="h-4 w-4" />
              Contact support
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t border-[#D6B98C]/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#C6B8CB]">
            © 2026 StudioSpace. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#A99BAF]">
            <Link
              href="/privacy"
              className="transition hover:text-[#D6B98C]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#D6B98C]"
            >
              Terms
            </Link>

            <span className="inline-flex items-center gap-1.5">
              Made for creative minds
              <Music2 className="h-3.5 w-3.5 text-[#D6B98C]" />
            </span>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B98C] transition hover:text-[#F7F1E8]"
          >
            Find your space
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}