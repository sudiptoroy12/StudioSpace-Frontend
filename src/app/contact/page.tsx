
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Mail,
  
  MessageCircle,
  PanelsTopLeft,
  Send,
  Sparkles,
  Headphones,
  HelpCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Have a question? Send us an email.",
    value: "sudiptoroy1521@gmail.com",
    href: "mailto:sudiptoroy1521@gmail.com",
  },
  {
    icon: Clock3,
    title: "Response Time",
    description: "We usually get back to you within",
    value: "24–48 business hours",
    href: null,
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "We're here to help with your",
    value: "StudioSpace experience",
    href: "/help",
  },
];

const faqs = [
  {
    question: "How can I list my studio on StudioSpace?",
    answer:
      "You can create an account and visit the List Your Studio page to submit your studio details. Our platform makes it easy to showcase your creative space.",
  },
  {
    question: "How can I book a creative space?",
    answer:
      "Explore available studios, check their details, choose the space that fits your needs, and follow the booking process.",
  },
  {
    question: "I need help with a booking. What should I do?",
    answer:
      "Send us a message with your booking details. Our support team will help you resolve your issue as quickly as possible.",
  },
  {
    question: "Can I suggest a new feature?",
    answer:
      "Absolutely! We love hearing new ideas. Use the contact form to share your suggestions and help us improve StudioSpace.",
  },
];

export default function ContactPage() {

const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  const contactData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  setLoading(true);
  setSubmitted(false);
  setErrorMessage("");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send message.");
    }

    setSubmitted(true);
    form.reset();
  } catch (error) {
    setErrorMessage(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#211629]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#211629] via-[#39243F] to-[#4A3151] px-6 py-24 md:py-32">

        {/* Decorative Elements */}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#D6B98C]/20" />
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#D6B98C]/20" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#A78BBA]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/30 bg-white/5 px-4 py-2 text-sm text-[#D6B98C]">
              <Sparkles size={15} />
              <span>We&apos;d love to hear from you</span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#F7F1E8] sm:text-5xl md:text-7xl">
              Let&apos;s start a
              <span className="block bg-gradient-to-r from-[#D6B98C] to-[#F7F1E8] bg-clip-text text-transparent">
                conversation.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#E5DCE8]/75 md:text-lg">
              Have a question, an idea, or need a little help?
              We&apos;re always happy to connect with creative people
              and studio owners. Let&apos;s make something amazing together.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D6B98C] px-7 py-4 text-sm font-semibold text-[#211629] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5CAA2]"
              >
                Get in Touch
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <Link
                href="/studios"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-[#F7F1E8] transition-all hover:border-[#D6B98C] hover:text-[#D6B98C]"
              >
                Explore Studios
                <ArrowRight size={17} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT DETAILS + FORM */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-14 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A78BBA]">
              Contact Us
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#211629] md:text-5xl">
              We&apos;re just a message away.
            </h2>

            <p className="mt-5 leading-8 text-[#39243F]/65">
              Whether you&apos;re looking for a creative space, managing
              a studio, or simply exploring possibilities, we&apos;re
              ready to help.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-5">

              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-3xl border border-[#39243F]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D6B98C] hover:shadow-xl hover:shadow-[#211629]/5"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#39243F]/5 text-[#39243F] transition-colors group-hover:bg-[#39243F] group-hover:text-[#D6B98C]">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#211629]">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm text-[#39243F]/60">
                          {item.description}
                        </p>

                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#76577F] hover:text-[#211629]"
                          >
                            {item.value}
                            <ArrowUpRight size={14} />
                          </a>
                        ) : (
                          <p className="mt-2 text-sm font-semibold text-[#76577F]">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* EXTRA CARD */}
              <div className="relative mt-2 overflow-hidden rounded-3xl bg-gradient-to-br from-[#211629] to-[#4A3151] p-8 text-[#F7F1E8]">

                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-[#D6B98C]/20" />

                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D6B98C]/15 text-[#D6B98C]">
                    <MessageCircle size={23} />
                  </div>

                  <h3 className="text-xl font-semibold">
                    Need quick assistance?
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#F7F1E8]/65">
                    Visit our help center to find answers to common
                    questions and learn more about StudioSpace.
                  </p>

                  <Link
                    href="/help"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#D6B98C] transition-all hover:gap-3"
                  >
                    Visit Help Center
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE - CONTACT FORM */}
            <div
              id="contact-form"
              className="scroll-mt-24 rounded-3xl border border-[#39243F]/10 bg-white p-6 shadow-xl shadow-[#211629]/5 sm:p-10"
            >

              <div className="mb-8">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A78BBA]">
                  Send a Message
                </span>

                <h3 className="mt-3 text-2xl font-semibold text-[#211629] md:text-3xl">
                  Tell us what&apos;s on your mind.
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#39243F]/60">
                  Fill out the form below and we&apos;ll be happy to
                  hear from you.
                </p>
              </div>
{submitted && (
  <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
    <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
    <p>
      Your message has been sent successfully!
      We&apos;ll get back to you soon.
    </p>
  </div>
)}

{errorMessage && (
  <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
    {errorMessage}
  </div>
)}
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid gap-6 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#211629]"
                    >
                      Your Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      autoComplete="name"
                      className="w-full rounded-xl border border-[#39243F]/15 bg-[#F7F1E8]/40 px-4 py-3.5 text-sm text-[#211629] outline-none transition-all placeholder:text-[#39243F]/35 focus:border-[#A78BBA] focus:ring-4 focus:ring-[#A78BBA]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#211629]"
                    >
                      Email Address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-[#39243F]/15 bg-[#F7F1E8]/40 px-4 py-3.5 text-sm text-[#211629] outline-none transition-all placeholder:text-[#39243F]/35 focus:border-[#A78BBA] focus:ring-4 focus:ring-[#A78BBA]/10"
                    />
                  </div>

                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-[#211629]"
                  >
                    Subject *
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-[#39243F]/15 bg-[#F7F1E8]/40 px-4 py-3.5 text-sm text-[#39243F] outline-none transition-all focus:border-[#A78BBA] focus:ring-4 focus:ring-[#A78BBA]/10"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Studio Listing">Studio Listing</option>
                    <option value="Booking Support">Booking Support</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Feedback and Suggestions">
                      Feedback & Suggestions
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#211629]"
                  >
                    Your Message *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    minLength={10}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-[#39243F]/15 bg-[#F7F1E8]/40 px-4 py-3.5 text-sm text-[#211629] outline-none transition-all placeholder:text-[#39243F]/35 focus:border-[#A78BBA] focus:ring-4 focus:ring-[#A78BBA]/10"
                  />
                </div>

             <button
  type="submit"
  disabled={loading}
  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#39243F] px-6 py-4 text-sm font-semibold text-[#F7F1E8] transition-all duration-300 hover:-translate-y-1 hover:bg-[#211629] disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Sending Message..." : "Send Message"}

  <Send
    size={17}
    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
  />
</button>

                <p className="text-center text-xs leading-6 text-[#39243F]/45">
                  By submitting this form, your email application
                  will open so you can send your message.
                </p>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">

          <div className="mb-12 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#39243F]/5 text-[#76577F]">
              <HelpCircle size={27} />
            </div>

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A78BBA]">
              FAQs
            </span>

            <h2 className="mt-4 text-3xl font-semibold text-[#211629] md:text-4xl">
              Frequently asked questions
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#39243F]/60">
              Looking for a quick answer? Here are some things
              people often ask us.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-[#39243F]/10 bg-[#F7F1E8]/40 p-6 transition-all duration-300 open:border-[#D6B98C] open:bg-[#F7F1E8]/80"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#211629] sm:text-base">
                  <span>{faq.question}</span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#76577F] transition-transform duration-300 group-open:rotate-45">
                    <span className="text-xl font-normal">+</span>
                  </span>
                </summary>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#39243F]/65">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#76577F] transition-all hover:gap-3 hover:text-[#211629]"
            >
              View All FAQs
              <ArrowRight size={17} />
            </Link>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-6 py-20 md:py-24">
        <div className="relative mx-auto max-w-7xl  overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#211629] via-[#39243F] to-[#51385A] px-4 py-16 text-center  md:py-20 sm:px-6 lg:px-8">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#D6B98C]/20" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-[#D6B98C]/15" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6B98C]/15 text-[#D6B98C]">
              <PanelsTopLeft size={27} />
            </div>

            <h2 className="text-3xl font-semibold leading-tight text-[#F7F1E8] md:text-5xl">
              Your next creative space
              <span className="block text-[#D6B98C]">
                is waiting.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#F7F1E8]/65 md:text-base">
              Discover inspiring studios, connect with creative
              communities, and find the perfect space to bring
              your ideas to life.
            </p>

            <Link
              href="/studios"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#D6B98C] px-8 py-4 text-sm font-semibold text-[#211629] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5CAA2]"
            >
              Explore Studios
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
