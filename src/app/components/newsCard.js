import React from "react";
import Image from "next/image";
import styles from "../styles/components/NewsCard.module.scss";
import Link from "next/link";

export default function NewsCard({ news }) {
  return (
    <Link href={`/news/${news.slug}`}>
      <div className={styles.wrapper} style={{ cursor: "pointer" }}>
        <div className={`${styles["image-wrapper"]} relative border shadow-lg overflow-hidden`}>
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${news.image.url}`} alt={`Margins - ${news.title}`} className={`${styles.image} w-full h-full object-cover`} width={535} height={525} priority />
          <div className={`text-sm text-white px-3 py-1 bg-black bg-opacity-60 absolute bottom-3 ${news.language === "en" ? "right-3" : "left-3"}`}>{news.type}</div>
        </div>
        <div className="p-3 text-black text-center text-sm">
          <p className="pb-1">{news.date}</p>
          <p className="font-semibold">{news.title}</p>
        </div>
      </div>
    </Link>
  );
}
