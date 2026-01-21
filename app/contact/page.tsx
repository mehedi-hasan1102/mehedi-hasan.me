'use client';
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Copy,
  CheckCircle,
  XCircle
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

// ENV VARIABLES
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE!;
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL!;

// Contact Item Type
interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const ContactMe: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  // Success Toast
  const showSuccessToast = (message: string) => {
    toast.custom((t) => (
      <div className="border border-primary/30 max-w-xs sm:max-w-sm w-full bg-base-200 text-primary px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 whitespace-nowrap">
        <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
        <span className="text-sm sm:text-base font-medium">{message}</span>
      </div>
    ));
  };

  // Error Toast
  const showErrorToast = (message: string) => {
    toast.custom((t) => (
      <div className="border border-primary/30 max-w-xs sm:max-w-sm w-full bg-base-200 text-red-500 px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 whitespace-nowrap">
        <XCircle size={20} className="text-red-500 flex-shrink-0" />
        <span className="text-sm sm:text-base font-medium">{message}</span>
      </div>
    ));
  };

  // Send Email
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID)
      .then(
        () => {
          showSuccessToast("Message sent successfully!");
          formRef.current?.reset();
        },
        () => {
          showErrorToast("Failed to send. Please try again.");
        }
      );
  };

  // Copy to Clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => showSuccessToast("Email copied to clipboard!"))
      .catch(() => showErrorToast("Failed to copy!"));
  };

  // Contact Info Items
  const contactItems: ContactItem[] = [
    {
      icon: <Phone size={20} />,
      label: "Phone Number",
      value: CONTACT_PHONE,
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: (
        <div
          onClick={() => copyToClipboard(CONTACT_EMAIL)}
          className="underline-offset-6 decoration-dashed hover:underline rounded-lg inline-flex items-center gap-2 hover:text-primary font-geist text-sm cursor-pointer transition-all duration-300"
        >
          {CONTACT_EMAIL}
          <Copy size={14} className="transition-transform duration-300" />
        </div>
      ),
    },
    {
      icon: <MapPin size={20} />,
      label: "Address",
      value: "Dhaka, Bangladesh",
    },
    {
      icon: <Calendar size={20} />,
      label: "Book a Meeting",
      value: (
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-6 decoration-dashed hover:underline rounded-lg inline-flex items-center gap-1 hover:text-primary font-geist text-sm cursor-pointer transition-all duration-300"
        >
          Schedule on Calendly
          <ArrowUpRight size={14} className="transition-transform duration-300" />
        </a>
      ),
    },
  ];

  return (
    <section
      className="relative text-base-content font-geist max-w-3xl mx-auto pt-20"
    >
      <Toaster position="top-right" reverseOrder={false} />

      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <Image
          src="/globe-outline-dark-2.svg"
          alt="Globe Background"
          width={600}
          height={600}
          className="opacity-80"
          priority
        />
      </div>

      <div className="min-h-screen rounded-lg p-4 backdrop-blur-sm hover:shadow-primary/10 transition-shadow duration-300">
        {/* Header */}
        <div className="my-4 text-start">
          <h2 className="text-3xl">Contact</h2>
          <h3 className="mt-4 text-sm sm:text-base text-base-content/80 leading-relaxed">
            Actively seeking full-time opportunities where I can contribute as a
            Frontend / Full-Stack Developer. If you are hiring or would like to discuss
            a potential role, feel free to get in touch.
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:mt-10">
          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input type="text" name="name" placeholder="Your name" required className="w-full p-2 input input-bordered focus:border-primary rounded-lg focus:outline-none" />
                <input type="text" name="phone" placeholder="Phone" className="w-full p-2 input input-bordered focus:border-primary rounded-lg focus:outline-none" />
                <input type="email" name="email" placeholder="Email" required className="w-full p-2 input input-bordered focus:border-primary rounded-lg focus:outline-none" />
                <input type="text" name="subject" placeholder="Subject" className="w-full p-2 input input-bordered focus:border-primary rounded-lg focus:outline-none" />
              </div>

              <textarea name="message" rows={5} placeholder="Message" required className="textarea textarea-bordered w-full rounded-lg p-2 focus:border-primary focus:outline-none"></textarea>

              <input type="hidden" name="time" value={new Date().toLocaleString()} />

              <button 
                type="submit"
                className="max-w-40 mt-0 rounded-lg flex items-center gap-0 hover:text-primary font-geist text-sm px-0 py-0 transition-all"
              >
                <span className="underline-offset-6 decoration-dashed hover:underline p-1 rounded-lg inline-flex items-center gap-1 font-geist text-sm cursor-pointer transition-all duration-300">
                  Send Message <ArrowUpRight size={14} className="transition-transform duration-300" />
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {contactItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-0 pl-0 border-l-2 border-primary/50 hover:border-primary transition-colors duration-300"
              >
                <div className="p-3 rounded-md">{item.icon}</div>
                <div className="min-w-0">
                  <p className="text-sm opacity-70">{item.label}</p>
                  <div className="font-geist break-words">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
