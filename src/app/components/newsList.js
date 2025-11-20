"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import styles from "../styles/pages/News.module.scss";
import NewsCard from "./newsCard";

export default function NewsList({ newsList }) {
  const { t, i18n } = useTranslation("");

  const content = {
    events: newsList[i18n.language].filter((news) => news.type === "event"),
    news: newsList[i18n.language].filter((news) => news.type === "news"),
  };

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [t("news.tabs.ourEvents"), t("news.tabs.ourNews")];

  return (
    <main className={styles.wrapper}>
      <div className="relative w-full overflow-hidden mt-[0px]">
        <Image src="/images/common/news-background.webp" alt="Margins Developments News And Events" className={`${styles.banner} w-full`} width={535} height={525} quality={100} />
        <div className="absolute bottom-0 left-0 right-0 flex justify-between mt-[30px] mb-[40px] max-w-[1400px] pl-5 pr-5 ml-auto mr-auto">
          <h1 className={` text-white text-[40px] font-bold uppercase ${styles.title} ${i18n.language === "en" ? "tracking-[2px]" : ""}`}>{tabs[activeTab]}</h1>
          <div className="flex">
            {tabs.map((tab, index) => (
              <button key={index} className={`flex-1 py-2 text-center text-sm font-medium ${styles["tab-item"]} ${activeTab === index ? styles.active : "text-gray-600 hover:text-blue-500"}`} onClick={() => setActiveTab(index)}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white relative mb-[10px]">
        <div className={styles.container}>
          <div className="container flex flex-col align-items items-center justify-center mx-auto px-[20px] py-[45px] max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
              {content[activeTab === 0 ? "events" : "news"].map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
