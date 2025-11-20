"use client";
import i18n from "../../../i18n";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../styles/pages/Project.module.scss";
export default function ProjectFacilities({ facilities }) {
  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  return (
    <div className="px-[60px] py-[20px] max-w-[1360px] mr-auto ml-auto text-white">
      <motion.h1 className={`text-center uppercase text-[22px] font-semibold my-10  ${i18n.language === "en" ? "tracking-[10px]" : ""}`} variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
        Facilities
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
        {facilities && facilities.length > 0 ? (
          facilities.map((facility, index) => {
            return (
              <div key={index} className="flex flex-col items-center my-4">
                {facility?.icon?.url ? <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${facility.icon.url}`} alt={facility.name} width={40} height={40} className={styles["facility-image"]} /> : <></>}
                <p className="my-4 mb-10 text-sm text-center">{facility.name}</p>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
