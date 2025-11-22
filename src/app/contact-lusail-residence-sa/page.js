"use client";

import React, { Suspense } from "react";
import ContactTemplate from "../components/contactTemplate";

function SupportContactForm() {
  return (
    <ContactTemplate
      backgroundImage="/images/projects/lusail-2.jpg"
      titleText="𝑳𝒖𝒔𝒂𝒊𝒍 𝑹𝒆𝒔𝒊𝒅𝒆𝒏𝒄𝒆"
      subtitleText="Residential Compound New Cairo"
      descriptionUnderImage="Lusail Residence offers an unparalleled living experience at New Cairo, where nature and design seamlessly blend. The thoughtfully crafted units allow residents to enjoy breathtaking views and an abundance of natural light, creating an atmosphere of tranquility and serenity. Inside, every space has been optimized to embrace the warmth of sunlight, brightening interiors and uplifting daily living."
      contactDetails={{
        phone: "16930",
        address: "Building 340, South 90 St., New Cairo, Egypt",
        workHours: "From Sat to Thu, 10am to 6pm",
      }}
      showMap={true}
      mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.3818354395485!2d31.478204689676947!3d30.02590155482679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145823ef567b6027%3A0x912fa48592923a9c!2sMargins%20Developments!5e0!3m2!1sen!2sus!4v1686341909148!5m2!1sen!2sus"
      pageSource="lusail-residence-sa"
      projectId={7}
      metaTitle="𝑳𝒖𝒔𝒂𝒊𝒍 𝑹𝒆𝒔𝒊𝒅𝒆𝒏𝒄𝒆 | Margins Developments"
      metaDescription="Discover Lusail Residence in New Cairo by Margins Developments. Experience nature-integrated living with stunning views and sunlit interiors."
    />
  );
}

export default function ContactSupport() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SupportContactForm />
    </Suspense>
  );
}
