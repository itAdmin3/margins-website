"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDeviceType } from "../utils/deviceDetector";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../styles/pages/Progress.module.scss";
import Header from "./header";
import Footer from "./footer";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/style.css";
import SocialLinks from "../../app/components/socialLinks";
import ProgressUpdates from "./progressUpdates";

export default function ProgressPage({ progressData }) {
  const deviceType = useDeviceType();
  const isMobileDevice = ["tablet", "phone"].includes(deviceType);
  const { t, i18n } = useTranslation();

  const progress = progressData[i18n.language] ? progressData[i18n.language] : progressData[i18n.language === "en" ? "ar" : "en"];

  const textVariantsBlur = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
  };

  if (!progress) {
    return <h1>Project progress not found</h1>;
  }

  return (
    <div>
      <Header />
      <main className={styles.wrapper}>
        <div className="bg-white">
          <div className="overflow-hidden">
            <div className="relative">
              <div
                className={`
              ${styles["hero-image"]}
              ${isMobileDevice ? "h-[100vh]" : "h-[550px]"}
            `}
              >
                <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${progress?.fullImage?.url}`} alt={`marginsdevelopments progress - ${progress?.fullImage?.alternativeText}`} width={1920} height={600} quality={100} className={isMobileDevice ? "h-[100vh]" : "h-[550px]"} />
              </div>
              <div className={`absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-center mt-[30px] mb-[40px] max-w-[1400px] pl-5 pr-5 ml-auto mr-auto ${isMobileDevice ? "text-center" : ""}`}>
                <h6 className={`text-white text-[16px] font-extralight text ${styles["text-with-line"]} ${isMobileDevice ? "justify-center" : ""}`}>Progress</h6>
                <motion.h1
                  className="text-white font-bold text-[50px] uppercase mt-4"
                  variants={textVariantsBlur}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  {progress?.title}
                </motion.h1>
                <motion.div className={`text-white text-base mt-4 ${isMobileDevice ? "" : "w-[600px]"} `} variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {}, exit: {} }} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.5 }}>
                  {progress?.subTitle?.split(" ").map((word, index) => (
                    <motion.span key={index} className="inline-block mr-2" variants={textVariantsBlur} transition={{ duration: 0.5 }}>
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          <div className="max-w-[1400px] mr-auto ml-auto px-[20px] py-[75px]">
            {progress.videoUrl && (
              <div className="relative bg-black w-[100%] mb-10">
                <video width="100%" src={progress.videoUrl} title="video" controls></video>
              </div>
            )}
            {progress.progressUpdate.length > 0 ? progress.progressUpdate.map((updateData) => <ProgressUpdates key={updateData.id} updateText={updateData.updateText} updateDate={updateData.updateDate} updateDetails={updateData.updateDetails} updateImages={updateData.updateImages} />) : <></>}
          </div>
        </div>
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}
