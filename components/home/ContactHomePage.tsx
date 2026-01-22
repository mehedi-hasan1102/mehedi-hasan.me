'use client';

import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";


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
      className="max-w-3xl mx-auto px-4 py-6 text-base-content font-geist"
    >
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold tracking-tight">
          Say Hello
        </h2>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-base-content/70 leading-relaxed max-w-xl">
        Have a question, idea, or opportunity? Send a quick message and connect
        with me directly on WhatsApp.
      </p>

      {/* Input */}
      <div
        className="
          mt-4 flex items-center gap-2
          rounded-md border border-base-content/20
          px-2 py-1.5
          focus-within:border-primary
          transition-colors
        "
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message…"
          className="
            flex-1 bg-transparent outline-none
            text-sm placeholder:text-base-content/50
          "
        />

        <button
          onClick={handleSend}
          aria-label="Send WhatsApp message"
          className="
            inline-flex items-center gap-1
            text-sm font-medium
            text-primary
            hover:underline underline-offset-4
          "
        >
          Send
          <FiArrowUpRight size={14} />
        </button>
      </div>

      {/* Helper text */}
      <p className="mt-2 text-xs text-base-content/45">
        Opens WhatsApp in a new tab.
      </p>
    </section>
  );
};

export default ContactHomePage;
