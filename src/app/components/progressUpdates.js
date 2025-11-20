"use client";
import Image from "next/image";
import styles from "../styles/pages/Progress.module.scss";
import { motion } from "framer-motion";
import { Gallery, Item } from "react-photoswipe-gallery";

export default function ProgressUpdates({ updateText, updateDate, updateDetails, updateImages }) {
  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const textVariantsBlur = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
  };
  return (
    <div>
      <div className={styles["progress-block"]}>
        <div className="lg:flex md:flex">
          <div className="lg:flex md:flex lg:flex-col md:flex-col lg:mb-0 md:mb-0 mb-4 justify-center">
            <motion.p className="whitespace-nowrap text-[20px] font-bold" variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {}, exit: {} }} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.5 }}>
              {updateText
                ? updateText.split(" ").map((word, index) => (
                    <motion.span key={index} className="inline-block mr-2" variants={textVariantsBlur} transition={{ duration: 0.5 }}>
                      {word}
                    </motion.span>
                  ))
                : ""}
            </motion.p>
            <motion.p className="whitespace-nowrap text-sm" variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
              Last updated on {updateDate}
            </motion.p>
          </div>
          <div className="hidden md:block w-[1px] bg-gray-300 mx-5"></div>
          <div className="text-sm">{updateDetails}</div>
        </div>
      </div>
      <Gallery options={{ fullscreen: true, bgOpacity: 1, escKey: true, arrowKeys: true, wheelToZoom: true }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-[20px] text-center w-full p-10">
          {updateImages.map((progressImage, index) => (
            <Item key={index} original={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${progressImage?.formats?.small?.url}`} thumbnail={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${progressImage?.formats?.thumbnail?.url}`} width={674} height={674}>
              {({ ref, open }) => (
                <Image ref={ref} onClick={open} src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${progressImage.url}`} alt={`marginsdevelopments progress - ${progressImage.alternativeText}`} width={1200} height={674} className={"cursor-pointer " + styles["progress-item"]} priority={false} />
              )}
            </Item>
          ))}
        </div>
      </Gallery>
    </div>
  );
}
