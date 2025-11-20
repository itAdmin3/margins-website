"use client";
import React from "react";
import { FaWhatsapp, FaFacebookMessenger, FaPhone, FaEnvelope } from "react-icons/fa";
import i18n from "../../../i18n";

const SocialLinks = () => {
  return (
    <div className={`fixed top-1/2 transform -translate-y-1/2 space-y-2 z-50 ${i18n.language === "en" ? "right-4" : "left-4"}`}>
      {/* WhatsApp */}
      <a href="https://wa.me/201288595569" target="_blank" rel="noopener noreferrer" className="flex bg-green-700 text-white p-3 rounded-full shadow-lg hover:bg-green-800 transition">
        <FaWhatsapp size={22} className="text-white" />
      </a>

      {/* Messenger */}
      <a href="https://www.messenger.com/t/104364141276657/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0" target="_blank" rel="noopener noreferrer" className="flex bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition">
        <FaFacebookMessenger size={22} className="text-white" />
      </a>

      {/* Phone */}
      <a href="tel:16930" className="flex justify-center items-center bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition w-[43px] h-[43px]">
        <FaPhone size={18} className="text-white rotate-[75deg]" />
      </a>

      {/* Email */}
      <a href="mailto:info@marginsdev.com" className="flex bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-600 transition">
        <FaEnvelope size={22} className="text-white" />
      </a>
    </div>
  );
};

export default SocialLinks;
