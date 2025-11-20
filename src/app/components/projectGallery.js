"use client";
import React from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { motion } from "framer-motion";
import styles from "../styles/pages/Project.module.scss";
export default function ProjectGallery({ galleryTitle, galleryImages }) {
  const textVariantsBlur = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
  };
  return (
    <div className={`${styles.banner}` + " px-[60px] py-[20px] max-w-[1360px] mb-[30px] mr-auto ml-auto grid grid-cols-1 place-items-center gap-6"}>
      <motion.div
        className="text-[23px] font-semibold text-white lg:mb-0 md:mb-0 mb-5 this-text"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        transition={{ duration: 1 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
          exit: {},
        }}
      >
        {galleryTitle.split(" ").map((word, index) => (
          <motion.span key={index} className="inline-block mr-2" variants={textVariantsBlur} transition={{ duration: 0.5 }}>
            {word}
          </motion.span>
        ))}
      </motion.div>
      <Gallery options={{ fullscreen: true, bgOpacity: 1, escKey: true, arrowKeys: true, wheelToZoom: true }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-[20px] text-center w-full">
          {galleryImages.map((image, index) => {
            const originalImage = image.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}` : "";
            return (
              <Item key={index} original={originalImage} thumbnail={originalImage} width={1200} height={674}>
                {({ ref, open }) => <Image ref={ref} onClick={open} src={originalImage} alt={`Banner Image ${index}`} width={1200} height={674} className="cursor-pointer" />}
              </Item>
            );
          })}
        </div>
      </Gallery>
    </div>
  );
}
