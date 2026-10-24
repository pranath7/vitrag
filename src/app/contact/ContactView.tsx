"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/config";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Send,
  AlertCircle,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

export function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Showroom Visit Appointment",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMsg("Please enter a valid phone or WhatsApp number.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg("Please enter your message or question.");
      return;
    }

    setErrorMsg("");
    const number = siteConfig.contact.whatsappNumber;
    let text = `Hello VITRAG Team,\n\nI would like to get in touch:\n\n`;
    text += `*Name:* ${formData.name}\n`;
    text += `*Phone:* ${formData.phone}\n`;
    if (formData.email) text += `*Email:* ${formData.email}\n`;
    text += `*Subject:* ${formData.subject}\n`;
    text += `*Message:* ${formData.message}\n`;

    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#6E2023] font-bold">
          Showroom & Studio
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#6E2023] font-medium">
          Visit Us in Chennai
        </h1>
        <p className="text-base text-[#84766A] font-light max-w-xl mx-auto leading-relaxed">
          Experience our tactile glazes, examine porcelain weight, and consult with our table styling specialists in person.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 border border-[#EADBC8] rounded-2xl space-y-6 shadow-sm">
            <h2 className="font-heading text-2xl text-[#6E2023] border-b border-[#EADBC8] pb-4 font-medium">
              Studio Location
            </h2>

            <div className="space-y-4 text-xs text-[#252522]/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#6E2023] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#6E2023] font-medium">
                    Showroom & Design Studio
                  </strong>
                  <span>{siteConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#6E2023] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#6E2023] font-medium">
                    Visiting Hours
                  </strong>
                  <span>{siteConfig.contact.hours}</span>
                  <span className="block text-[11px] text-[#84766A] mt-0.5">
                    Sunday by prior appointment only
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#6E2023] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#6E2023] font-medium">
                    Telephone &amp; WhatsApp
                  </strong>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="hover:underline text-[#6E2023] font-semibold"
                      title="Direct Phone Call"
                    >
                      {siteConfig.contact.displayPhone}
                    </a>
                    <span className="text-[#84766A]">•</span>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#6E2023] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#6E2023] font-medium">
                    Electronic Mail
                  </strong>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:underline text-[#6E2023] font-medium"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <InstagramIcon className="w-5 h-5 text-[#6E2023] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#6E2023] font-medium">
                    Instagram
                  </strong>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-[#6E2023] font-medium"
                  >
                    {siteConfig.social.instagramHandle}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EADBC8]">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello VITRAG, I would like to schedule a visit to your Chennai showroom.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all rounded-lg shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                WhatsApp Appointment (6369142027)
              </a>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#EADBC8] rounded-2xl shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#CBAE9B]/30 border border-[#CBAE9B] flex items-center justify-center mx-auto text-[#6E2023]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-heading text-3xl text-[#6E2023] font-medium">
                Message Sent
              </h2>
              <p className="text-xs text-[#84766A] max-w-md mx-auto leading-relaxed font-light">
                Thank you, {formData.name}. Your message has been sent to our concierge desk on WhatsApp (6369142027). We will respond promptly.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                size="sm"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-[#EADBC8] pb-4">
                <h2 className="font-heading text-2xl text-[#6E2023] font-medium">
                  Send an Enquiry
                </h2>
                <p className="text-xs text-[#84766A] mt-1 font-light">
                  Have a question regarding custom dinner sets, packaging, or store visits? Reach out below.
                </p>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-[16px] sm:text-xs p-3.5 sm:p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98400 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-[16px] sm:text-xs p-3.5 sm:p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-[16px] sm:text-xs p-3.5 sm:p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                  Topic of Interest
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-[16px] sm:text-xs p-3.5 sm:p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                >
                  <option value="Showroom Visit Appointment">Showroom Visit Appointment</option>
                  <option value="Custom Dinner Set Request">Custom Dinner Set Request</option>
                  <option value="Wedding Registry Consultation">Wedding Registry Consultation</option>
                  <option value="Corporate Gifting Enquiry">Corporate Gifting Enquiry</option>
                  <option value="Product Care & Material Question">Product Care & Material Question</option>
                  <option value="Other">Other Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="How can our tableware team assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-[16px] sm:text-xs p-3.5 sm:p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full py-4 shadow-md"
                rightIcon={<Send className="w-4 h-4" />}
              >
                Send via WhatsApp Desk (6369142027)
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
