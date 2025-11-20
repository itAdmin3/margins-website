"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import styles from "../styles/pages/About.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import { useMetadata } from "../../app/utils/metadataProvider";
import { useDeviceType } from "../utils/deviceDetector";
import { motion } from "framer-motion";
import SocialLinks from "../../app/components/socialLinks";

export default function About() {
  const { setMetadata } = useMetadata();

  useEffect(() => {
    setMetadata({
      title: "About | Margins Developments",
      description:
        "Welcome to the home page of my aweUpholding its reputation as an upcoming and progressive property developer, Margins Corporation for Development and Project Management was established to redefine and create impactful entities that base their success on innovation, up to date designs, safety approaches, and global standard construction systems.some Next.js application!",
    });
  }, [setMetadata]);

  const { t } = useTranslation("");

  const router = useRouter();
  const deviceType = useDeviceType();
  const isMobileDevice = ["tablet", "phone"].includes(deviceType);

  const aboutTextWrapperVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const aboutTextVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariantsBlur = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
  };

  const [activeTab, setActiveTab] = useState("vision");

  return (
    <div>
      <Header />
      <main>
        <div className={styles.wrapper}>
          <div className={`relative w-full h-screen overflow-hidden flex-1 ${styles["hero-image"]}`}>
            <Image className="absolute top-0 left-0 w-full h-full object-cover" src={"/images/about/about.jpg"} alt={"about.jpg"} fill quality={100} />
            <div className="relative h-[100vh] flex justify-center items-center">
              <div className={styles["bg-overlay"]}></div>
              <div className={styles["bg-line"]}></div>
            </div>
            <motion.div className={`absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-center mt-[30px] mb-[40px] max-w-[1400px] pl-5 pr-5 ml-auto mr-auto text-center ${isMobileDevice ? "w-[100%]" : "w-[440px]"}`}>
              <h6
                className={`text-white text-[16px] justify-center
                  ${styles["text-with-line"]}
                  ${styles.title} ${router.locale === "en" ? "tracking-[2px]" : ""}`}
              >
                {t("about.superTitle")}
              </h6>
              <motion.h1
                className={`text-white font-bold uppercase ${isMobileDevice ? "text-[40px]" : ""} ${i18n.language === "en" ? "mt-6 text-[60px]" : "text-[50px]"} `}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                  hidden: {},
                  exit: {},
                }}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                transition={{ duration: 2 }}
              >
                {t("about.title")
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mr-2"
                      variants={textVariantsBlur}
                      transition={{
                        duration: 2.5,
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
              </motion.h1>
            </motion.div>
          </div>

          <div className={`container flex ${isMobileDevice ? "flex-col" : ""} items-center justify-center mx-auto px-[20px] py-[45px] max-w-[1400px] ${styles["about-wrapper"]}`}>
            <motion.div
              className={`relative
                          ${i18n.language === "en" ? "pr-10" : "pl-10"}
                        `}
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image src={"/images/about/margins-1.jpg"} alt={"margins-1.jpg"} className={`${styles.image} h-full object-cover relative z-10`} width={435} height={425} />
            </motion.div>
            <motion.div className="flex flex-col align-items flex-1 about-text" variants={aboutTextWrapperVariants} initial="hidden" whileInView="visible">
              <motion.span
                className={`
                  ${styles["text-with-line"]}
                  ${i18n.language === "en" ? "tracking-[8px]" : ""}
                  text-[15px] font-medium uppercase
                `}
                variants={aboutTextVariants}
              >
                {t("about.aboutSuperTitle")}
              </motion.span>
              <motion.span className="text-[30px] uppercase font-bold tracking-[1px] mb-[35px]" variants={aboutTextVariants}>
                {t("about.aboutTitle")}
              </motion.span>

              {Object.values(t("about.aboutDescription", { returnObjects: true })).map((description, index) => (
                <motion.span key={index} className="mb-[20px] text-[14px] text-[#404040] tracking-[2px] font-medium" variants={aboutTextVariants}>
                  {description}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="hidden md:block w-full max-w-[1360px] h-[1px] bg-gray-300 mx-5"></div>

          <div className={`container flex ${isMobileDevice ? "flex-col" : ""} items-center justify-center mx-auto px-[20px] py-[45px] max-w-[1400px] ${styles["about-wrapper"]}`}>
            <motion.div
              className={`relative flex flex-col items-center
                          ${i18n.language === "en" ? "pr-10" : "pl-10"}
                        `}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={"/images/about/Eng-MOHAMED-EL-AASAR.jpg"}
                alt={"Eng-MOHAMED-EL-AASAR.jpg"}
                className={`${styles.image} h-full object-cover relative z-10 border-opacity-50 ${i18n.language === "en" ? "border-r-8 border-r-teal-950" : "border-l-8 border-l-teal-950"}`}
                width={290}
                height={370}
                quality={100}
              />
              <div className="text-center pt-5 text-black max-w-[290px]">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-semibold">
                  Eng. MOHAMED EL AASAR
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-sm">
                  Bachelor Degree in Civil Engineering from Cairo University
                </motion.div>
              </div>
            </motion.div>
            <motion.div className="flex flex-col align-items flex-1 about-text" variants={aboutTextWrapperVariants} initial="hidden" whileInView="visible">
              <motion.span
                className={`
                  ${styles["text-with-line"]}
                  ${i18n.language === "en" ? "tracking-[8px]" : ""}
                  text-[15px] font-medium uppercase
                `}
                variants={aboutTextVariants}
              >
                {t("about.messageFrom")}
              </motion.span>
              <motion.span className="text-[30px] uppercase font-bold tracking-[1px] mb-[35px]" variants={aboutTextVariants}>
                {t("about.chairman")}
              </motion.span>

              <motion.span className="mb-[20px] text-[14px] text-[#404040] tracking-[2px] font-medium" variants={aboutTextVariants}>
                {t("about.ceoMessage")}
              </motion.span>
            </motion.div>
          </div>

          <div className="hidden md:block w-full max-w-[1360px] h-[1px] bg-gray-300 mx-5"></div>

          <div className={`container flex ${isMobileDevice ? "flex-col" : ""} items-center justify-center mx-auto px-[20px] py-[45px] max-w-[1400px] ${styles["about-wrapper"]}`}>
            <motion.div
              className={`relative flex flex-col items-center
                ${i18n.language === "en" ? "pr-10" : "pl-10"}
              `}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={"/images/about/Eng-ASHRAF-SHAHEEN.jpg"}
                alt={"Eng-ASHRAF-SHAHEEN.jpg"}
                className={`${styles.image} h-full object-cover relative z-10 border-opacity-50 ${i18n.language === "en" ? "border-r-8 border-r-teal-950" : "border-l-8 border-l-teal-950"}`}
                width={290}
                height={370}
                quality={100}
              />
              <div className="text-center pt-5 text-black max-w-[290px]">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-semibold">
                  Eng. ASHRAF SHAHEEN
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-sm">
                  Bachelor Degree in Architectural Engineering from Cairo University
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="flex flex-col align-items flex-1 about-text" variants={aboutTextWrapperVariants} initial="hidden" whileInView="visible">
              <motion.span
                className={`
                  ${styles["text-with-line"]}
                  ${i18n.language === "en" ? "tracking-[8px]" : ""}
                  text-[15px] font-medium uppercase
                `}
                variants={aboutTextVariants}
              >
                {t("about.messageFrom")}
              </motion.span>
              <motion.span className="text-[30px] uppercase font-bold tracking-[1px] mb-[35px]" variants={aboutTextVariants}>
                {t("about.ceo")}
              </motion.span>

              <motion.span className="mb-[20px] text-[14px] text-[#404040] tracking-[2px] font-medium" variants={aboutTextVariants}>
                {t("about.ceoMessage")}
              </motion.span>
            </motion.div>
          </div>

          <div className="w-full max-w-[1400px] px-[20px]">
            {/* Tabs Navigation */}
            <div className="grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-col-1 lg:grid-col-4 md:grid-col-4 border-b border-gray-200">
              {["vision", "mission", "values", "our partners"].map((tab) => (
                <button key={tab} className={`p-10 text-sm ${activeTab === tab ? "border-b-2 font-bold " + styles["tab-active"] : "font-medium text-gray-500 hover:text-emerald-600 " + styles["tab-item"]}`} onClick={() => setActiveTab(tab)}>
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="m-10">
              {activeTab === "vision" && (
                <div className="space-y-4 grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
                  <div className="text-base">
                    <h2 className="text-2xl font-bold text-teal-600">Vision</h2>
                    <p className="text-gray-600 font-bold mt-10">To be a world-class Real Estate Development company.</p>
                    <p className="text-gray-600 mt-6">
                      As we are committed to prioritize our customer contentment levels, we see our customer as a main pillar in our success journey. We understand the importance of human-centric architecture, design aesthetics, and building a suitable community in which all the amenities come
                      together for the sole reason of reaching impressive levels of customer satisfaction. As such, we aim to establish ourselves as a world-class Real Estate Development Company in the MENA region.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/v.jpg"} alt={"vision.jpg"} fill quality={100} />
                  </div>
                </div>
              )}
              {activeTab === "mission" && (
                <div className="space-y-4 grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
                  <div className="text-base">
                    <h2 className="text-2xl font-bold text-teal-600">Mission</h2>
                    <p className="text-gray-600 mt-6">
                      As an evolving real estate development company in a field that undergoes continuous development, it is our mission to continuously improve our performance to surpass previous achievements; we aim to deliver impeccable establishments by applying exceptional architectural,
                      administrative and corporate strategies that prioritize wellness, whether it is within our company or our developed communities. Our projects mobilize an unconditional vision of life across an attractive and evergrowing portfolio of specialized properties. With skyline-defining
                      architecture, an up to date take on interiors and our focus on seamless amenities and services; we are committed to developing destinations that are both authentic and bench-mark standard
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/m-1.jpg"} alt={"mission.jpg"} fill quality={100} />
                  </div>
                </div>
              )}
              {activeTab === "values" && (
                <div>
                  <div className="space-y-4 grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
                    <div className="text-base">
                      <h2 className="text-2xl font-bold text-teal-600">Corporate Integrity</h2>
                      <p className="text-gray-600 mt-6">By being transparent and straightforward. We say what we mean, and mean what we say. Margins Developments takes pride in its integrity; promoting balanced constructions and buildings that are optimized towards optimum wellbeing.</p>
                    </div>
                    <div className="flex justify-end">
                      <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/aaa4.jpg"} alt={"mission.jpg"} fill quality={100} />
                    </div>
                  </div>
                  <div className="space-y-4 grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
                    <div className="text-base">
                      <h2 className="text-2xl font-bold text-teal-600">Valuing people</h2>
                      <p className="text-gray-600 mt-6">We care about people and place value on cooperating, and assisting our community; hence we take strides to bridge the gap between both our company and our valued tenants</p>
                    </div>
                    <div className="flex justify-end">
                      <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/aaw.jpg"} alt={"mission.jpg"} fill quality={100} />
                    </div>
                  </div>
                  <div className="space-y-4 grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
                    <div className="text-base">
                      <h2 className="text-2xl font-bold text-teal-600">Seizing opportunities</h2>
                      <p className="text-gray-600 mt-6">Margins Developments is always open to new opportunities and original ideas. We are keen for flexible and creative approaches that draw the guidelines on ways to upcoming novel endeavors..</p>
                    </div>
                    <div className="flex justify-end">
                      <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/aaa3.jpg"} alt={"mission.jpg"} fill quality={100} />
                    </div>
                  </div>
                  <div className="space-y-4 grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
                    <div className="text-base">
                      <h2 className="text-2xl font-bold text-teal-600">Pursuing Excellence</h2>
                      <p className="text-gray-600 mt-6">We strive to be the very best in the field, by focusing on always producing the highest safety standard and quality product possible. Margins Developments ensures excellence as a staple priority to its success.</p>
                    </div>
                    <div className="flex justify-end">
                      <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/aaa2.jpg"} alt={"mission.jpg"} fill quality={100} />
                    </div>
                  </div>
                  <div className="space-y-4 grid grid-flow-row lg:grid-flow-col md:grid-flow-col grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
                    <div className="text-base">
                      <h2 className="text-2xl font-bold text-teal-600">Helping our people</h2>
                      <p className="text-gray-600 mt-6">Just as we develop in lands, we develop in the community we live in. we aim to give back to the people by improving our strategies whenever we can in order to have a hand in a productive environment. </p>
                    </div>
                    <div className="flex justify-end">
                      <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/aaa.jpg"} alt={"mission.jpg"} fill quality={100} />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "our partners" && (
                <div>
                  <div className="grid grid-flow-col lg:grid-cols-6 md:grid-cols-6 grid-cols-1">
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/Minor-450x225.png"} alt={"minor.png"} fill quality={100} />
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/Osol-450x225.png"} alt={"Osol-450x225.png"} fill quality={100} />
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/Keva-450x225.png"} alt={"Keva-450x225.png"} fill quality={100} />
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/NAC-450x225.png"} alt={"NAC-450x225.png"} fill quality={100} />
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/EFS-450x225.png"} alt={"EFS-450x225.png"} fill quality={100} />
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/Cove-450x225.png"} alt={"Cove-450x225.png"} fill quality={100} />
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center items-center">
                    <div></div>
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/Well-450x225.png"} alt={"Well-450x225.png"} fill quality={100} />
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/Creative-1.png"} alt={"Creative-1.png"} fill quality={100} />
                    <Image className={`${styles["tab-image"]} lg:flex-none md:flex-none flex-1`} src={"/images/about/Arkan-1.png"} alt={"Arkan-1.png"} fill quality={100} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}
