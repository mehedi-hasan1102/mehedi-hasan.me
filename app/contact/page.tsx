'use client';

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  AiOutlineArrowRight,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineEnvironment,
  AiOutlineCalendar,
  AiOutlineCopy,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

/* ------------------ ENV ------------------ */

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE!;
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL!;

/* ------------------ Types ------------------ */

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

/* ------------------ Component ------------------ */

const ContactMe: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  /* ---------- Toasts ---------- */

  const successToast = (message: string) =>
    toast.custom(() => (
      <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-base-200 px-4 py-2 shadow-lg">
        <AiOutlineCheckCircle size={18} className="text-green-500" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    ));

  const errorToast = (message: string) =>
    toast.custom(() => (
      <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-base-200 px-4 py-2 shadow-lg">
        <AiOutlineCloseCircle size={18} className="text-red-500" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    ));

  /* ---------- Actions ---------- */

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID).then(
      () => {
        successToast("Message sent successfully.");
        formRef.current?.reset();
      },
      () => {
        errorToast("Something went wrong. Please try again.");
      }
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => successToast("Email copied to clipboard."))
      .catch(() => errorToast("Failed to copy."));
  };

  /* ---------- Contact Info ---------- */

  const contactItems: ContactItem[] = [
    {
      icon: <AiOutlinePhone size={18} />,
      label: "Phone",
      value: CONTACT_PHONE,
    },
    {
      icon: <AiOutlineMail size={18} />,
      label: "Email",
      value: (
        <button
          onClick={() => copyToClipboard(CONTACT_EMAIL)}
          className="inline-flex items-center gap-2 text-sm
                     underline-offset-6 decoration-dashed
                     hover:underline hover:text-primary transition"
        >
          {CONTACT_EMAIL}
          <AiOutlineCopy size={14} />
        </button>
      ),
    },
    {
      icon: <AiOutlineEnvironment size={18} />,
      label: "Location",
      value: "Dhaka, Bangladesh",
    },
    {
      icon: <AiOutlineCalendar size={18} />,
      label: "Meeting",
      value: (
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm
                     underline-offset-6 decoration-dashed
                     hover:underline hover:text-primary transition"
        >
          Schedule on Calendly
          <AiOutlineArrowRight size={14} />
        </a>
      ),
    },
  ];

  return (
    <section className="font-geist text-base-content mx-auto pt-20 max-w-3xl min-h-screen">
      <Toaster position="top-right" />

      {/* Background Accent */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
        <Image
          src="/globe-outline-dark-2.svg"
          alt=""
          width={400}
          height={400}
          className="opacity-80"
          priority
        />
      </div>

      <div className="rounded-lg p-4 backdrop-blur-sm space-y-10">

        {/* Header */}
        <div className="m-4">
  <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
    Contact
  </h1>
  <p className="text-base mt-2 mb-0 text-base-content/75">
    Have a question, idea, or opportunity in mind? I’m always open to meaningful
    conversations, collaborations, and new projects. Feel free to reach out —
    you can also connect with me on{" "}
    <a
      href="https://x.com/mehedihasan1102"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium hover:text-primary underline underline-offset-6 transition-colors"
    >
      X
    </a>.
  </p>
</div>


        <div className="flex flex-col md:flex-row gap-8 px-4 mt-12">

          {/* Form */}
          <div className="w-full md:w-1/2">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="name" required placeholder="Your name" className="input input-bordered rounded-lg" />
                <input name="phone" placeholder="Phone" className="input input-bordered rounded-lg" />
                <input name="email" type="email" required placeholder="Email" className="input input-bordered rounded-lg" />
                <input name="subject" placeholder="Subject" className="input input-bordered rounded-lg" />
              </div>

              <textarea
                name="message"
                required
                rows={5}
                placeholder="Message"
                className="textarea textarea-bordered rounded-lg w-full"
              />

              <input type="hidden" name="time" value={new Date().toLocaleString()} />

              <button
                type="submit"
                className="inline-flex items-center gap-1 text-sm
                           underline-offset-6 decoration-dashed
                           hover:underline hover:text-primary transition"
              >
                Send Message
                <AiOutlineArrowRight size={14} />
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 space-y-6">
            {contactItems.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 pl-4 border-l-2 border-primary/50
                           hover:border-primary transition-colors"
              >
                <div className="mt-1">{item.icon}</div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-base-content/50">
                    {item.label}
                  </p>
                  <div className="mt-1">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      <div className="m-4 mt-6">
  <p className="text-sm text-base-content/60 my-4">
    Got a project idea or want to collaborate? What’s up — feel free to reach out on{" "}
    <a
      href="https://www.linkedin.com/in/mehedi-hasan1102"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium hover:text-primary text-base-content/60 underline underline-offset-6"
    >
      LinkedIn
    </a>{" "}
    or send a message on {" "}
    <a
      href="https://wa.me/8801747874773"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium hover:text-primary text-base-content/60 underline underline-offset-6"
    >
      WhatsApp
    </a>
    . I’m always open to new opportunities and conversations.
  </p>
</div>


      </div>


    </section>
  );
};

export default ContactMe;
