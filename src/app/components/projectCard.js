"use client";
import React from "react";
import Image from "next/image";
import styles from "../styles/components/ProjectCard.module.scss";

export default function ProjectCard({ project, onNavigate }) {
  return (
    <div className={`${styles.wrapper} relative border shadow-lg overflow-hidden`} onClick={() => onNavigate(project.slug)} style={{ cursor: "pointer" }}>
      {project.projectImage?.url && <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.projectImage.url}`} alt={`Margins Developments - ${project.projectImage.alternativeText}`} className={`${styles.image} w-full h-full object-cover`} width={535} height={525} placeholder="empty" />}
      <div className={`${styles.logo}`}>{project.logoImage?.url && <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.logoImage.url}`} alt={`Margins Developments - ${project.logoImage.alternativeText}`} className={`${styles.image}`} width={535} height={525} placeholder="empty" />}</div>
      <div className={`${styles.overlay} absolute top-0 bottom-0 left-0 right-0`}></div>
    </div>
  );
}
