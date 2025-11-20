"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/pages/Projects.module.scss";
import { motion } from "framer-motion";
import ProjectCard from "../components/projectCard";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
// import { useMetadata } from "../utils/metadataProvider";

export default function ProjectsList({ projects }) {
  // const { setMetadata } = useMetadata();

  // useEffect(() => {
  //   setMetadata({
  //     title: "Projects | Margins Developments",
  //     description:
  //       "Welcome to the home page of my aweUpholding its reputation as an upcoming and progressive property developer, Margins Corporation for Development and Project Management was established to redefine and create impactful entities that base their success on innovation, up to date designs, safety approaches, and global standard construction systems.some Next.js application!",
  //   });
  // }, [setMetadata]);

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };
  const { t } = useTranslation("");

  const router = useRouter();
  const handleNavigation = (projectSlug) => {
    router.push(`/projects/${projectSlug}`);
  };

  return (
    <main className={styles.wrapper}>
      <div className="bg-white relative top-[85px] mb-[85px]">
        <div className={styles.container}>
          <div className="container flex flex-col align-items items-center justify-center mx-auto px-[20px] py-[45px] max-w-[1400px]">
            <div className="relative flex justify-center items-center flex-col">
              <motion.h1 className={`text-[40px] font-bold uppercase mt-[30px] mb-[70px] ${i18n.language === "en" ? "tracking-[10px]" : ""}`} variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
                {t("home.projects")}
              </motion.h1>
              <div className={styles["bg-overlay"]}>
                <h6 className={styles.text}>Margins Developments</h6>
              </div>
              <div className={styles["bg-line"]}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] mt-20">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} onNavigate={handleNavigation} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
