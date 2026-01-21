'use client';

import React, { useState } from "react";

const WHATSAPP_NUMBER = "8801747874773"; // without +

const ContactHomePage: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="hire-me"
      className="text-base-content font-geist max-w-3xl mx-auto pt-10 pb-12"
    >
      {/* Header — previous style */}
      <div className="m-4 text-start">
        <p className="text-sm text-base-content mb-0">• Message</p>
        <h2 className="text-2xl font-geist text-base-content">
          Say <span className="text-base-content/60">Hello</span>
        </h2>
      </div>

      {/* Subtitle */}
      <p className="mt-2 ml-4 text-sm sm:text-base text-base-content/70 leading-relaxed max-w-xl">
        Have a question, idea, or opportunity? Send me a quick message and connect with me directly on WhatsApp.
      </p>

      {/* Peerlist-style Input */}
      <div className="mt-2 mx-4 flex items-center gap-3 rounded-lg border border-base-content/20 bg-base-100 px-1 py-1 shadow-sm transition-shadow hover:shadow-md">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder:text-base-content/50 px-2"
        />

        <button
          onClick={handleSend}
          aria-label="Send WhatsApp message"
          className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
        >
          <span className="text-base">→</span>

          {/* WhatsApp Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-5 w-5 fill-white"
          >
            <path d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.35.617 4.64 1.787 6.666L2.667 29.334l6.854-1.79A13.24 13.24 0 0016 29.333c7.364 0 13.333-5.97 13.333-13.333C29.333 8.636 23.364 2.667 16 2.667zm7.771 18.874c-.323.91-1.588 1.7-2.623 1.923-.709.15-1.636.268-4.75-.999-3.98-1.6-6.54-5.7-6.74-5.964-.199-.266-1.62-2.156-1.62-4.115 0-1.959 1.026-2.926 1.39-3.324.364-.399.793-.499 1.059-.499.266 0 .53.003.762.015.244.012.57-.093.892.68.323.774 1.096 2.67 1.194 2.863.099.192.165.418.033.674-.132.256-.199.416-.397.639-.199.224-.418.499-.597.673-.199.199-.406.417-.174.814.232.399 1.028 1.7 2.207 2.754 1.517 1.354 2.797 1.776 3.196 1.974.399.199.63.166.862-.099.232-.266.995-1.16 1.259-1.558.266-.399.53-.332.892-.199.364.133 2.308 1.09 2.706 1.289.399.199.664.299.764.465.099.166.099.958-.224 1.868z" />
          </svg>
        </button>
      </div>

      <p className="my-4 ml-4 text-xs text-base-content/50 pb-12">
        This will open WhatsApp in a new tab.
      </p>
    </section>
  );
};

export default ContactHomePage;
