
"use client";

import Link from "next/link";
import {  useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Aperture,
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
  { label: "Sound Stages", href: "/studios?category=sound-stages" },
  { label: "Podcast Rooms", href: "/studios?category=podcast-rooms" },
  { label: "Music Suites", href: "/studios?category=music-suites" },
  { label: "Art Workshops", href: "/studios?category=art-workshops" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Become a Host", href: "/studios/new" },
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

  return (
    <footer className="relative overflow-hidden bg-[#101014] text-neutral-300">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-700/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-fuchsia-700/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Newsletter */}
        <div className="border-b border-white/10 py-12 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/80 via-[#21152f] to-[#17131e] p-6 sm:p-9 lg:p-11">
            <div className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full border border-violet-300/10" />
            <div className="pointer-events-none absolute -right-4 -top-8 h-44 w-44 rounded-full border border-violet-300/10" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-12">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-xs font-semibold text-violet-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  A little inspiration in your inbox
                </div>

                <h2 className="max-w-xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Make room for your next big idea.
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-400">
                  Get creative space inspiration, platform updates, and tips
                  for making your next project happen.
                </p>
              </div>

              <div>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Your email address
                  </label>

                  <div className="relative min-w-0 flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

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
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-bold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Joining..." : "Join the list"}
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                {newsletterMessage && (
                  <p
                    role="status"
                    className={`mt-3 flex items-start gap-2 text-xs leading-5 ${
                      subscribed ? "text-emerald-300" : "text-rose-300"
                    }`}
                  >
                    {subscribed && (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    {newsletterMessage}
                  </p>
                )}

                <p className="mt-3 text-xs leading-5 text-neutral-500">
                  By subscribing, you agree to receive updates from
                  StudioSpace. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="StudioSpace home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-900/30 transition-transform group-hover:rotate-[-5deg]">
                <Aperture className="h-6 w-6" strokeWidth={1.8} />
              </span>

              <span className="text-xl font-extrabold tracking-tight text-white">
                Studio<span className="text-violet-400">Space</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400">
              A home for creative spaces and the people who bring ideas to
              life. Discover your next studio, share your workspace, and make
              something extraordinary.
            </p>

            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-neutral-500">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
              <span>Connecting creative spaces with creative people.</span>
            </div>

            {/* Replace these example URLs with your social profiles. */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neutral-400 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
              >
                <Camera className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neutral-400 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
              >
                <span className="text-sm font-bold leading-none">in</span>
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neutral-400 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
              >
                <Video className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold text-white">Explore Spaces</h3>

            <ul className="mt-5 space-y-3.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-violet-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-white">StudioSpace</h3>

            <ul className="mt-5 space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-violet-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/studios/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-xs font-bold text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/20"
            >
              List Your Studio
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-white">Help & Support</h3>

            <ul className="mt-5 space-y-3.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-violet-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="mailto:support@studiospace.example"
              className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-violet-300"
            >
              <Mail className="h-4 w-4" />
              Contact support
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
         <p className="text-sm text-neutral-400">
  © 2026 StudioSpace. All rights reserved.
</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <span className="inline-flex items-center gap-1.5">
              Made for creative minds
              <Music2 className="h-3.5 w-3.5 text-violet-400" />
            </span>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 transition hover:text-violet-200"
          >
            Find your space
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
