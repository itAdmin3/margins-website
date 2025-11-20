"use client";

import styles from "../styles/components/Header.module.scss";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import { Cairo } from "next/font/google";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import i18n from "../../../i18n";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./languageSwitcher";
import { useDeviceType } from "../utils/deviceDetector";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weights: ["400", "700"],
});

export default function Header({ headerColor }) {
  const deviceType = useDeviceType();
  const isMobileDevice = ["tablet", "phone"].includes(deviceType);

  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [headerCollapse, setHeaderCollapse] = useState("");
  const pathname = usePathname();
  const { t } = useTranslation("");

  // Menu Items
  const menuItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.projects"), path: "/projects" },
    {
      name: t("nav.progress"),
      subItems: [
        { name: t("nav.progressItems.project1"), path: "/progress/[progress-name]", dynamic: true, id: "oaks-progress" },
        { name: t("nav.progressItems.project2"), path: "/progress/[progress-name]", dynamic: true, id: "zia-progress" },
        { name: t("nav.progressItems.project3"), path: "https://shresidencesnewcairo.com/" },
      ],
    },
    { name: t("nav.news"), path: "/news" },
    { name: t("nav.careers"), path: "/careers" },
    { name: t("nav.brokers"), path: "/brokers" },
    { name: t("nav.payment"), path: "/payment" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(`.${styles.dropdown}`)) setDropdownOpen(false);
    };

    document[dropdownOpen ? "addEventListener" : "removeEventListener"]("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  // Handle header scroll animation
  useEffect(() => {
    const headerElement = document.querySelector("header");

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      headerElement.classList.toggle(styles.animated, scrolled);
      headerElement.classList.toggle(styles["has-menu-open"], navOpen && scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    headerElement.classList.toggle(styles["has-menu-open"], navOpen);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navOpen]);

  return (
    <header
      className={`
        ${styles.wrapper}
        ${headerCollapse}
        ${isMobileDevice ? "py-5" : ""} 
        ${isMobileDevice ? "min-h-[55px]" : ""}
        text-white
      `}
      style={{ backgroundColor: headerColor || "" }}
    >
      <div className={`${styles.container}`}>
        <nav
          className={`
            flex align-items justify-between flex-1
            ${isMobileDevice ? "flex-col" : ""}
          `}
        >
          <div
            className={`
            flex align-items
            ${isMobileDevice ? "py-2" : ""}
            `}
          >
            <button
              className={`
                text-white mr-3 md:hidden
                  ${i18n.language === "en" ? "scale-x-[-1]" : ""}
                `}
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? <HiOutlineX size={30} /> : <HiOutlineMenuAlt3 size={30} />}
            </button>
            <Link href="/" className={`${styles.logo} mr-4`}>
              <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 709 178" width="100%" fill="#ffffff">
                <path
                  id="Path 19"
                  fillRule="evenodd"
                  d="m38.2 152.5c0 18.3-14.4 21.6-19.3 22.1-3.9 0.4-11 0.3-13.8 0.3h-5.1c0-3.7 0.2-36.5 0-43.1h10.7c3.6 0 7 0.1 9.4 0.4 5.8 0.7 18.1 6.2 18.1 20.3zm-5 2c0.3-8.9-5.5-17.9-14.8-19.9-3.5-0.9-10.8-0.7-13.5-0.7v38.5c1.3 0.5 12.1 1.1 16.5-0.7 4-1.6 11.4-5.2 11.8-17.2zm61.3 18.3l-0.9 2.1h-24.7v-43.1h21.6l0.9 2.1c-3.1-0.5-17.8-0.3-17.8-0.3 0 0 0 18.7 0 18.6 3.3 0 11.3 0.1 15.1-0.3l-0.1 2.3c-3.7-0.3-8.9-0.3-15-0.2v19.2c0 0 17.6 0.1 20.9-0.4zm61.4-41h1.9l-18.2 43.7h-0.6c0 0-1-2.8-1.7-4.5-5.6-13.9-13.5-33.1-16-39.2h5.3c4.1 11.6 14.3 36.1 14.3 36.1v0.9zm57.4 41l-0.9 2.1h-24.7v-43.1h21.6l0.9 2c-3.1-0.4-17.8-0.3-17.8-0.3 0 0 0.1 18.8 0.1 18.7 3.2 0 11.2 0.1 15-0.4l-0.1 2.4c-3.7-0.3-8.9-0.4-15-0.2v19.1c0 0 17.6 0.2 20.9-0.3zm55.7 0l-0.8 2.1h-25c0-3.8 0.2-36.5 0-43.1h4.9v41.3c0 0 17.7 0.2 20.9-0.3zm71-19.2c0 13.9-9.9 21.9-22.7 21.9-12.9 0-23.1-7.5-23.1-21.5 0-12.2 9.1-22.7 23-22.7 13.9 0 22.8 10.2 22.8 22.3zm-5.4 0c0-9.8-5.3-20.3-17.4-20.3-12.1 0-17.5 10.9-17.5 20.7 0 11.4 7.6 19.6 17.5 19.7 9.9 0.1 17.4-8.7 17.4-20.1zm59.3-10.4c0 6.4-6.1 12.9-17.4 11.1l0.3-0.5c8.7 0 12.5-4.3 12.5-10.2 0-5.3-4.1-10.7-14.1-10l-0.4 0.4v40.9h-4.8c0-3.8 0.1-36.5 0-43.1h9.3c10 0 14.6 5.7 14.6 11.4zm71.3-11.4c1.3 12.5 3.6 35.8 4.4 43.1h-4.8c-1.1-12.4-3.5-37.4-3.5-37.4l0.1-0.7-15.7 39.1h-0.6l-15.5-38.3-0.2-1.3-4.5 38.6-1.9-0.1 4.9-40-0.2-3h4.7c0 0 1 2.5 1.7 4.4 5.4 14 10.2 25.1 12.7 31.1 0.1 0.2 0.1 0.9 0.1 1.1l14.7-36.6zm62.2 41l-0.8 2.1h-24.8v-43.1h21.7l0.8 2c-3-0.4-17.8-0.3-17.8-0.3 0 0 0.1 18.8 0.1 18.7 3.3 0 11.3 0.1 15.1-0.4l-0.1 2.4c-3.7-0.3-8.9-0.4-15.1-0.2v19.1c0 0 17.7 0.2 20.9-0.3zm64.1 2.9c-4.6-5-32.1-38.2-32.1-38.2l0.4 1.4v36h-2.1c0-3.4 0.1-30.5 0-39.8l-0.3-3.3h2.7c2.7 3.5 28.9 34.4 28.9 34.4l0.5 1.2c0-3.9-0.1-29-0.1-35.6h2c0 12.3-0.3 31.6 0.1 43.9zm28.9-43.9h35.4v1.7h-15.9c0 12.3-0.1 29.1-0.1 41.4h-4.8v-41.4h-15.1zm85.1 31.3c0 7.8-6.2 12.4-13.1 12.4-5.4 0-9.1-1.6-12.5-4.4l1.4-4.2c3 5.7 7.1 6.6 11 6.6 5.2 0 9.3-3.2 9.3-8.1 0-12.3-20.3-8.9-20.3-23.3 0-7.1 6.4-10.7 11.9-10.7 3.5 0 7.6 1.1 9.8 3.1l-1.6 3.6c-2.4-4.4-5.6-4.8-8.3-4.8-4.1 0-8.1 2-8.1 6.8 0 12.3 20.5 8.7 20.5 23zm-404.1-60.8h-15.7l-29.5-53.4h14c10 0 18.2-8.2 18.2-18.2 0-10-8.2-18.2-18.2-18.2h-28.8v89.8h-13.6v-102h42.4c16.7 0 30.3 13.7 30.3 30.4 0 14-9.9 26.3-23.4 29.5zm81.8 0c-30.9 0-53.3-21.5-53.3-51 0-29.5 22.1-51 52.5-51 15.1 0 27.4 4.5 35.5 13l1.1 1.1-9.4 9.1-1.1-1.1c-6.4-6.6-15-9.8-26.1-9.8-22.3 0-38.4 16.3-38.4 38.7 0 22.4 16.5 38.7 39.2 38.7 13.9 0 22.7-4.3 27.7-8.1l0.4-15.8h-24.3l9.2-12.5h27.7v2.3 32.1l-0.5 0.5c-4.3 4.1-16.9 13.8-40.2 13.8zm207.4-101.9h12.8v102.4h-4l-59.5-69.9c-1-1.2-2.1-2.7-3.1-4.1v73.8h-13v-0.8h-0.1v-88-12.9-0.8h4.4l1 1.3 58.1 67.9c1.1 1.3 2.4 3 3.6 4.6-0.1-1.9-0.2-4-0.2-5.6zm84.2 102.1c-21 0-31.1-11.2-35.9-20.5l-0.6-1.4 11.4-5.9 0.7 1.3c4.1 7.1 10.1 14.3 24.1 14.3 11.3 0 18.9-6 18.9-15 0-8.3-4.5-13-17.7-18.8l-7.8-3.6c-18.9-8.3-22.7-17.2-22.7-27.8 0-14.4 11.6-24.8 27.5-24.8 12.5 0 21.9 5.2 28.1 15.3l0.8 1.3-11.1 6.7-0.8-1.3c-4.3-6.8-9.5-9.8-17-9.8-8.7 0-14.1 4.7-14.1 12.3 0 7.2 3.3 10.8 14.8 15.9l7.8 3.6c18.4 7.9 25.8 16.9 25.8 31 0 16.3-12.9 27.2-32.2 27.2zm-486.7-0.6c-5.3-13.1-10.7-26.3-15.9-39-4.7-11.4-9.5-23.2-14.3-35-0.7 2.4-1.5 5-2.4 7l-27.5 68h-14.8l38.1-91.3 4-11.2h5.1l42.1 102.5h-14zm-117.6-68.9l-26.9 31.9-27-31.9c-1-1.3-2.3-2.9-3.4-4.4 0.1 1.8 0.3 3.8 0.3 5.5v68.2h-13.1v-88.4l0.2-13.5h4.7l38.3 45.2 38.2-45.2h4.9v101.9h-13v-68.2c0-1.7 0.1-3.7 0.3-5.5-1.1 1.5-2.4 3.1-3.5 4.4zm394.6-23.4l13-9.2v101.9h-13z"
                ></path>
              </svg>
            </Link>
          </div>
          <div
            className={`
              flex align-items justify-between flex-1 
              ${isMobileDevice ? "flex-col" : ""}
              ${i18n.language === "en" ? cairo.className : montserrat.className}`}
          >
            <ul
              className={`
                ${navOpen ? "block" : "hidden"} 
                ${styles.items} 
                md:flex items-center space-x-[5px] lg:mt-0 md:mt-2 sm:mt-4
              `}
            >
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`
                    ${styles.item}
                    ${pathname === item.path ? styles["item-active"] : ""}
                    ${i18n.language === "en" ? montserrat.className : cairo.className}`}
                >
                  {item.subItems ? (
                    <div className={`${styles.dropdown}`} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                      <div className="flex items-center justify-center">
                        <span className={styles["dropdown-title"] + " p-3"}>{item.name}</span>
                        <svg className="w-3 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                        </svg>
                      </div>
                      <ul
                        className={`
                          ${styles["dropdown-menu"]}
                          ${dropdownOpen ? styles["dropdown-open"] : ""}`}
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex} className={styles["dropdown-item"]}>
                            {subItem.dynamic ? (
                              <Link href={`/progress/${subItem.id}`}>{subItem.name}</Link>
                            ) : subItem.external ? (
                              <a href={subItem.path} target="_blank" rel="noopener noreferrer">
                                {subItem.name}
                              </a>
                            ) : (
                              <Link href={subItem.path}>{subItem.name}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <a href={item.path} className="w-full p-3" onClick={() => setNavOpen(false)}>
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div
              className={`
                flex align-items
                ${isMobileDevice ? `${navOpen ? "block" : "hidden"}` : ""}
              `}
            >
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
