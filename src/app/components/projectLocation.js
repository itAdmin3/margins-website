"use client";
import React from "react";
import i18n from "../../../i18n";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../styles/pages/Project.module.scss";
import { useDeviceType } from "../utils/deviceDetector";
import RichTextRenderer from "./richTextRenderer";

export default function ProjectLocation({ locationMapURL, locationTitle, locationDescription, locationFeatures, locationMapImage }) {
  const deviceType = useDeviceType();
  const isMobileDevice = ["tablet", "phone"].includes(deviceType);

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };
  return (
    <div className={isMobileDevice ? "px-[20px]" : ""}>
      <motion.h1
        className={`text-white text-center uppercase text-[22px] font-semibold my-10 
          ${i18n.language === "en" ? "tracking-[10px]" : ""}`}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        Location
      </motion.h1>
      <div className="text-white pb-[80px] max-w-[1360px] mr-auto ml-auto grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-20">
        <div className="w-full">
          {locationMapURL ? (
            <iframe src={locationMapURL} width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg shadow-lg"></iframe>
          ) : (
            <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${locationMapImage?.url}`} alt={`Margins Development ${locationMapImage?.alternativeText}}`} width={700} height={700} priority={true} />
          )}
        </div>
        <div>
          <motion.h2 className="text-2xl font-semibold mb-4" variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
            {locationTitle}
          </motion.h2>
          <motion.div className="mb-6 text-gray-300" variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
            {locationDescription ? <RichTextRenderer content={locationDescription} /> : <></>}
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
            {locationFeatures.map((detail, index) => (
              <div key={index} className={"flex flex-col p-5 " + styles["contact-detail"]}>
                <div className="flex">
                  <Image src="/images/icoكns/location.svg" alt="location" fill className={styles.location} priority={true} />
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold mr-2">{detail.time}</span>
                    <span className="text-xl mr-2">{detail.type}</span>
                  </div>
                </div>
                <span className="text-gray-400 text-sm uppercase">{detail.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
