"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "../styles/pages/Brokers.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import { useMetadata } from "../utils/metadataProvider";
import SocialLinks from "../../app/components/socialLinks";

export default function Brokers() {
  const { setMetadata } = useMetadata();

  useEffect(() => {
    setIsClient(true);

    setMetadata({
      title: "Brokers | Margins Developments",
      description:
        "Welcome to the home page of my awesome Next.js application!",
    });
  }, [setMetadata]);

  const { t } = useTranslation("");

  const [isClient, setIsClient] = useState(false);
  if (!isClient) return null;

  return (
    <div>
      <Header headerColor="#8aa6a8" />
      <main className="mt-[50px]">
        <div className={`${styles.wrapper} grid lg:grid-flow-col lg:grid-cols-[30%_70%] md:grid-flow-row`}>
          <Image
            src="/images/common/brokers.jpg"
            alt="brokers.jpg"
            className="h-full object-cover w-full"
            width={535}
            height={525}
          />
          <div className="w-full p-7 lg:p-14 lg:pt-[45px]">
            <div className="max-w-[900px]">
              <h1 className="lg:mt-[100px]">{t("brokers.title")}</h1>
              <div className="">
                <form className="mt-10">
                  {/* Company Information Section */}
                  <div className="mb-6">
                    <h2 className="text-black text-lg font-semibold bg-gray-200 p-2">
                      Company Information
                    </h2>
                    <input
                        type="text"
                        placeholder="Company Name *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800 col-span-2"
                        required
                      />
                    <div className="grid lg:grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        placeholder="Company Phone *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Company Email *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Address *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Number of Employees *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Number of Branches *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                      <input
                        type="url"
                        placeholder="Facebook Page Link *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                    </div>
                  </div>

                  {/* Official Documentation Section */}
                  <div className="mb-6">
                    <h2 className="text-black text-lg font-semibold bg-gray-200 p-2">
                      Official Documentation
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Commercial Registration
                        </label>
                        <input
                          type="file"
                          className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Tax Card
                        </label>
                        <input
                          type="file"
                          className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Person Section */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold bg-gray-200 p-2">
                      Contact Person
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        placeholder="Name *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Phone *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Job *"
                        className="border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full btn-primary text-white font-medium py-2 px-4 shadow-sm hover:bg-black focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                    >
                      Send
                    </button>
                  </div>

                  {/* Brokers Area Link */}
                  <div className="text-center lg:mt-20 mt-10">
                    <a href="#" className={`${styles["brokers-area-link"]} text-teal-800 p-4 border-b border-gray-300 focus:outline-hidden focus:border-teal-800`}>
                      Brokers Area →
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}
