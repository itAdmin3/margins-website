"use client";
import React, { useMemo, useState, useEffect } from "react";
import styles from "../styles/pages/Project.module.scss";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/style.css";
import ProjectGallery from "./projectGallery";
import ProjectFacilities from "./projectFacilities";
import ProjectLocation from "./projectLocation";
import RichTextRenderer from "./richTextRenderer";
import { FaHome } from "react-icons/fa";
import { useMetadata } from "../../app/utils/metadataProvider";

export default function ProjectPage({ projectData }) {
  const { setMetadata } = useMetadata();

  const { t, i18n } = useTranslation("");
  const router = useRouter();

  const lang = i18n.language;
  const project = projectData[lang] ? projectData[lang] : projectData[lang === "en" ? "ar" : "en"];
  const [activeTab, setActiveTab] = useState(project?.projectUnitsTypes[0]?.id || 0);
  const activeUnit = useMemo(() => project.projectUnitsTypes.find((u) => u.id === activeTab), [project, activeTab]);

  useEffect(() => {
    setMetadata({
      title: project.SEO.title,
      description: project.SEO.description,
      keywords: project.SEO.keywords,
    });
  }, [setMetadata, project]);

  if (!project) {
    return (
      <main className={styles.wrapper}>
        <h1>Project Not Found</h1>
      </main>
    );
  }

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  const textVariantsBlur = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
  };
  return (
    <main className={styles.wrapper}>
      <div className="overflow-hidden">
        <div>
          <div className={styles["hero-image"]}>
            <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.coverImage.url}`} alt={`${project.coverImage.alternativeText || project.title}`} width={1920} height={1080} className="min-w-[100%] min-h-[100%]" priority={true} />
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 ml-auto mr-auto overflow-hidden flex justify-center">
            <div className={`flex flex-col items-center place-content-center ${styles.heading}`}>
              <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.logoImage.url}`} alt={`${project.logoImage.alternativeText || project.title}`} width={200} height={200} className={`${styles.logo} overflow-hidden`} priority={true} />
              <div className="max-w-[650px] flex flex-col items-center place-content-center">
                <div className={`mt-4 mb-10 font-bold text-4xl uppercase text-center ${router.locale === "en" ? "" : "tracking-[10px]"}`}>{project.heading}</div>
                <div className="text-gray-300 text-lg text-center">{project.subHeading}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[20px] py-[90px] max-w-[1400px] mr-auto ml-auto">
        <div className="sticky top-14 z-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] md:grid-cols-[1fr_2fr] gap-10">
          <div className={styles["sticky-wrapper"] + " bg-white pt-[20px] pb-[20px] lg:p-0 md:p-0 lg:top-[89px] md:top-[89px] top-[44px]"}>
            {project.slogan && (
              <motion.h1 className="text-5xl font-bold mb-4 uppercase" variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 1 }}>
                {project.slogan.split(" ").map((word, index) => (
                  <motion.span key={index} className="inline-block mr-2" variants={textVariantsBlur} transition={{ duration: 0.5 }}>
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            )}
            {/* "href" value should to be replaced by corresponding project link  */}
            <a className={styles["address"]} href={project.address}>
              <p className="flex items-center text-gray-700 mb-4">
                <span className="mr-2">
                  <svg className="h-7 w-7 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>{project.address}</span>
              </p>
            </a>

            {project.brochure && (
              <a href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.brochure.url}`} download target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 cursor-pointer">
                <p className="flex items-center text-gray-700">
                  <span className="mr-2">
                    <svg className="h-7 w-7 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </span>
                  <span>Project Brochure</span>
                </p>
              </a>
            )}
          </div>
          <motion.div className="text-black text-base montserrat-font line-height-2" variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
            <RichTextRenderer content={project.description} />
          </motion.div>
        </div>
      </div>
      {project.galleryTitle && project.galleryImages && <ProjectGallery galleryTitle={project.galleryTitle} galleryImages={project.galleryImages} />}
      {project.videoURL && (
        <div className="max-w-[1200px] pl-20 pr-20 ml-auto mr-auto mt-[100px] mb-20">
          <div className="relative bg-black w-[100%] mb-10">
            <video width="100%" src={project.videoURL} poster={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project?.coverImage?.url}`} title="video" controls></video>
          </div>
        </div>
      )}
      <div className={styles["contact-info"]}>
        {project.facilities ? <ProjectFacilities facilities={project.facilities} /> : <></>}
        <ProjectLocation locationMapURL={project.locationMapURL} locationTitle={project.locationTitle} locationDescription={project.locationDescription} locationFeatures={project.locationFeatures} locationMapImage={project.locationMapImage} />
      </div>
      <div className="bg-white relative mb-[10px]">
        <div className={styles.news}>
          <div className="container flex flex-col align-items items-center justify-center mx-auto px-[20px] py-[45px] max-w-[1400px]">
            <motion.h1 className={`text-[26px] font-bold uppercase mb-[30px] ${i18n.language === "en" ? "tracking-[5px]" : ""}`} variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
              {t("project.projectNewsTitle")}
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
              {project.news_posts.map((news) => (
                <div key={news.id} className={styles.item} style={{ cursor: "pointer" }}>
                  <Link href={`/news/${news.slug}`} className={styles.item}>
                    <div className={`${styles["image-wrapper"]} relative border shadow-lg overflow-hidden`}>
                      <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${news?.image?.url}`} alt={`Margins Developments - ${news.title}`} className={`${styles.image} w-full h-full object-cover`} width={535} height={525} priority={true} />
                      <div className={`text-sm text-white px-3 py-1 bg-teal-900 bg-opacity-80 absolute bottom-3 ${i18n.language === "en" ? "right-3" : "left-3"}`}>{news.type}</div>
                    </div>
                    <div className="p-3 text-black text-center text-sm">
                      <p className="pb-1">{news.date}</p>
                      <p className="font-semibold">{news.title}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {project.projectUnitsTypes.length > 0 && (
        <div className={`${styles["projectUnits"]}`}>
          <motion.h1 className={`text-[26px] font-bold uppercase mb-[30px] ${i18n.language === "en" ? "tracking-[5px]" : ""}`} variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
            {t("project.projectUnitTitle")}
          </motion.h1>
          <div className="w-full max-w-[1400px] px-[20px]">
            <div className="grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-col-1 lg:grid-col-4 md:grid-col-4 border-b border-gray-200">
              {project.projectUnitsTypes.map((tab) => (
                <button key={tab.id} className={`p-10 text-sm ${activeTab === tab.id ? styles["tab-active"] : "font-medium text-gray-500 hover:text-emerald-600 " + styles["tab-item"]}`} onClick={() => setActiveTab(tab.id)}>
                  {tab.title.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeUnit && activeUnit?.id === activeTab && (
              <div key={activeUnit.id} className="m-10">
                <div className="space-y-4 grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
                  <div className="text-base">
                    <div className="flex justify-end"></div>
                    <h2 className="text-2xl font-bold text-teal-600">{activeUnit.title}</h2>
                    <p className="flex items-center font-bold text-gray-700 mb-4 mt-10">
                      <span className="mr-2">
                        <FaHome size={28} />
                      </span>
                      <span> {activeUnit.space}</span>
                    </p>
                    <div className="text-gray-600 mt-6">
                      <RichTextRenderer content={activeUnit.description} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
