"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { sendContactEmail } from "@/lib/action/action";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    description: "Have questions about products or orders?",
    value: "Add your phone number",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us your questions anytime.",
    value: "Add your email address",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Serving customers with natural goodness.",
    value: "Add your business address",
  },
  {
    icon: Clock,
    title: "Customer Support",
    description: "We are here to help with your inquiries.",
    value: "Contact us for support hours",
  },
];

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    success: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      phone: formData.get("phone")?.toString().trim(),
      subject: formData.get("subject")?.toString(),
      message: formData.get("message")?.toString().trim(),
    };

    try {
      setLoading(true);
      setFeedback({ success: false, message: "" });

      const result = await sendContactEmail(payload);

      setFeedback({
        success: true,
        message: result.message || "Your message was sent successfully!",
      });

      form.reset();
    } catch (error) {
      setFeedback({
        success: false,
        message:
          error.message || "Failed to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-w-0 overflow-x-clip bg-[#fffaf0]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-3 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -left-20 -top-16 -z-10 size-48 rounded-full bg-[#e5ae2f]/15 blur-3xl sm:size-72 lg:size-80" />

        <div className="pointer-events-none absolute -bottom-20 -right-16 -z-10 size-52 rounded-full bg-[#47734e]/15 blur-3xl sm:size-72 lg:size-80" />

        <div className="mx-auto w-full max-w-4xl text-center">
          <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#e5ae2f]/40 bg-white/80 px-3 py-2 text-[10px] font-bold uppercase tracking-[1.5px] text-[#244b35] shadow-sm sm:px-4 sm:text-xs md:text-sm">
            <SparkleIcon />
            We are here for you
          </span>

          <h1 className="mt-5 break-words text-3xl font-extrabold leading-tight tracking-tight text-[#30230e] min-[400px]:text-4xl sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
            Let&apos;s Talk About
            <span className="mt-1 block text-[#47734e]">
              Natural Goodness
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#716957] sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            Questions about our pure honey, authentic khati cow milk, or
            other natural products? We&apos;re always happy to hear from you.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-full bg-[#244b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#193824] sm:mt-8 sm:px-6 sm:text-base"
          >
            Explore Products
            <ArrowUpRight size={18} className="shrink-0" />
          </Link>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="px-3 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-5 sm:gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-10">
          {/* Contact Details */}
          <div className="flex min-w-0 flex-col rounded-2xl bg-[#244b35] p-5 text-white sm:rounded-3xl sm:p-7 md:p-8 lg:p-7 xl:p-9">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#e5ae2f] sm:text-sm">
              Contact Information
            </span>

            <h2 className="mt-3 break-words text-2xl font-bold leading-tight sm:text-3xl">
              Get in Touch
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
              Need help with a product or order? Reach out and we&apos;ll help
              you find the information you need.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-1 lg:gap-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex min-w-0 items-start gap-3 sm:gap-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 sm:size-12">
                      <Icon size={20} className="text-[#e5ae2f]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold sm:text-base">
                        {item.title}
                      </h3>

                      <p className="mt-1 break-words text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">
                        {item.description}
                      </p>

                      <p className="mt-1 break-words text-xs font-medium leading-5 text-white/90 sm:text-sm">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 sm:mt-9 sm:p-5">
              <div className="flex items-center gap-2">
                <MessageCircle
                  size={19}
                  className="shrink-0 text-[#e5ae2f]"
                />

                <h3 className="text-sm font-bold sm:text-base">
                  We value your feedback
                </h3>
              </div>

              <p className="mt-2 text-xs leading-6 text-white/70 sm:text-sm">
                Your feedback helps us improve our products and service.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="min-w-0 rounded-2xl border border-[#eee8da] bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-8 lg:p-7 xl:p-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#47734e] sm:text-sm">
                Send an Inquiry
              </span>

              <h2 className="mt-2 break-words text-2xl font-bold text-[#30230e] sm:text-3xl">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#716957] sm:text-base sm:leading-7">
                Fill in the details below to tell us how we can help.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="min-w-0">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#30230e]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                    className="w-full min-w-0 rounded-xl border border-[#e8e3d7] bg-[#fffdf8] px-3.5 py-3 text-sm text-[#30230e] outline-none transition placeholder:text-gray-400 focus:border-[#47734e] focus:ring-4 focus:ring-[#47734e]/10 sm:px-4 sm:py-3.5"
                  />
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#30230e]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 rounded-xl border border-[#e8e3d7] bg-[#fffdf8] px-3.5 py-3 text-sm text-[#30230e] outline-none transition placeholder:text-gray-400 focus:border-[#47734e] focus:ring-4 focus:ring-[#47734e]/10 sm:px-4 sm:py-3.5"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-[#30230e]"
                >
                  Phone Number
                  <span className="ml-1 font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  autoComplete="tel"
                  className="w-full min-w-0 rounded-xl border border-[#e8e3d7] bg-[#fffdf8] px-3.5 py-3 text-sm text-[#30230e] outline-none transition placeholder:text-gray-400 focus:border-[#47734e] focus:ring-4 focus:ring-[#47734e]/10 sm:px-4 sm:py-3.5"
                />
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-[#30230e]"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  defaultValue=""
                  required
                  className="w-full min-w-0 rounded-xl border border-[#e8e3d7] bg-[#fffdf8] px-3.5 py-3 text-sm text-[#30230e] outline-none transition focus:border-[#47734e] focus:ring-4 focus:ring-[#47734e]/10 sm:px-4 sm:py-3.5"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Order Support">Order Support</option>
                  <option value="Delivery Question">Delivery Question</option>
                  <option value="Product Quality">Product Quality</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[#30230e]"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="How can we help you?"
                  required
                  className="w-full min-w-0 resize-y rounded-xl border border-[#e8e3d7] bg-[#fffdf8] px-3.5 py-3 text-sm leading-6 text-[#30230e] outline-none transition placeholder:text-gray-400 focus:border-[#47734e] focus:ring-4 focus:ring-[#47734e]/10 sm:px-4 sm:py-3.5"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#244b35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#193824] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#47734e] sm:w-auto sm:min-w-48 sm:text-base"
              >
                {loading ? "Sending..." : "Send Message"}

                {loading ? (
                  <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Send size={17} className="shrink-0" />
                )}
              </button>

              {feedback.message && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`flex items-start gap-2 text-sm leading-6 ${
                    feedback.success ? "text-[#244b35]" : "text-red-600"
                  }`}
                >
                  {feedback.success && (
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0"
                    />
                  )}
                  <span>{feedback.message}</span>
                </p>
              )}

              <p className="text-xs leading-5 text-gray-400">
                Your message will be sent securely through our contact service.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-3 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col items-start gap-5 rounded-2xl border border-[#e8dfcc] bg-white p-5 sm:rounded-3xl sm:p-7 md:flex-row md:items-center md:justify-between lg:p-9">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={20}
                className="shrink-0 text-[#47734e]"
              />
              <span className="text-xs font-semibold text-[#47734e] sm:text-sm">
                Pure and Natural
              </span>
            </div>

            <h2 className="mt-2 break-words text-xl font-bold text-[#30230e] sm:text-2xl md:text-3xl">
              Bring Nature to Your Home
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#716957] sm:text-base">
              Explore our carefully selected natural products.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#244b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#193824] sm:w-auto sm:px-6 sm:text-base"
          >
            Explore Products
            <ArrowRight size={18} className="shrink-0" />
          </Link>
        </div>
      </section>
    </main>
  );
};

const SparkleIcon = () => (
  <Leaf size={16} className="shrink-0 text-[#c18a12]" />
);

export default ContactPage;