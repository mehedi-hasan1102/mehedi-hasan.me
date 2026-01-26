'use client';

import { useState, useRef } from 'react';
import { FiMessageSquare, FiX, FiArrowUpRight } from 'react-icons/fi';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

/* ------------------ ENV ------------------ */
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

export default function FloatingContactBot() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  /* ---------- Toasts ---------- */
  const successToast = (message: string) =>
    toast.custom(() => (
      <div className="flex items-center gap-3 rounded-lg border border-(--border) bg-base-200 px-4 py-2 shadow-lg">
        <AiOutlineCheckCircle size={18} className="text-green-500" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    ));

  const errorToast = (message: string) =>
    toast.custom(() => (
      <div className="flex items-center gap-3 rounded-lg border border-(--border) bg-base-200 px-4 py-2 shadow-lg">
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
        successToast('Message sent successfully.');
        formRef.current?.reset();
        setOpen(false);
      },
      () => {
        errorToast('Something went wrong. Please try again.');
      }
    );
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* CHAT PANEL */}
      <div
        className={`
          fixed bottom-24 right-6 z-50
          w-[340px] max-w-[90vw]
          rounded-xl
          border border-(--border)
          bg-base-200/95 backdrop-blur-lg
          shadow-2xl
          transition-all duration-300 ease-out
          ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-(--border)">
          <div>
            <h4 className="text-sm font-semibold">Get in Touch 👋</h4>
            <p className="text-xs text-base-content/60 mt-2">
              I’m here to answer your questions or discuss opportunities. Drop your message below and I’ll get back to you promptly.
            </p>
          </div>

          {/* <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md hover:bg-base-content/10"
          >
            <FiX size={16} />
          </button> */}
        </div>

        {/* Body Form */}
        <form ref={formRef} onSubmit={sendEmail} className="p-4 space-y-3">
          <input
            name="email"
            required
            type="email"
            placeholder="Email"
            className="w-full rounded-md bg-transparent border border-(--border) px-3 py-2 text-sm placeholder:text-base-content/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />

          <textarea
            name="message"
            required
            rows={4}
            placeholder="Message"
            className="w-full rounded-md bg-transparent border border-(--border) px-3 py-2 text-sm placeholder:text-base-content/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none transition-colors"
          />

          <input type="hidden" name="time" value={new Date().toLocaleString()} />

          <button
            type="submit"
            className="w-full rounded-md bg-primary text-primary-content py-2 text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-1 cursor-pointer"
          >
            Send Message <FiArrowUpRight size={14} />
          </button>
        </form>
      </div>

      {/* FLOATING CHAT BUTTON */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full  border border-(--border) text-base-content/70 shadow-xl flex items-center justify-center hover:text-primary hover:border-primary transition cursor-pointer"
        aria-label="Open chat"
      >
        <FiMessageSquare size={20} />
      </button>
    </>
  );
}
