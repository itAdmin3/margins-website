"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "photoswipe/style.css";
import styles from "../styles/pages/Home.module.scss";
import ProjectCard from "./projectCard";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useDeviceType } from "../utils/deviceDetector";
import { motion } from "framer-motion";
import { useMetadata } from "../utils/metadataProvider";
import { IoVolumeMuteOutline, IoVolumeHighSharp } from "react-icons/io5";

export default function HomePage({ projects, news, homePageData }) {
  const { t, i18n } = useTranslation();

  const newsList = news[i18n.language] || [];

  const { setMetadata } = useMetadata();

  useEffect(() => {
    setMetadata({
      title: "Home | Margins Developments",
      description:
        "Welcome to the home page of my aweUpholding its reputation as an upcoming and progressive property developer, Margins Corporation for Development and Project Management was established to redefine and create impactful entities that base their success on innovation, up to date designs, safety approaches, and global standard construction systems.some Next.js application!",
    });
  }, [setMetadata]);

  const deviceType = useDeviceType();
  const isMobileDevice = ["tablet", "phone"].includes(deviceType);

  const router = useRouter();
  const handleNavigation = (projectName) => {
    router.push(`/projects/${projectName}`);
  };

  const [isVectorVisible, setIsVectorVisible] = useState(false);

  const aboutTextWrapperVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const aboutTextVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  const projectVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const projectVariantsAnimation = {
    hidden: { opacity: 0, transform: "translate3d(0, 100px, 0)" },
    visible: { opacity: 1, transform: "translate3d(0, 0, 0)", transition: { duration: 0.4 } },
  };

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.play();
      } else {
        videoRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };
  return (
    <main className="mt-[70px]">
      <div className={styles.wrapper}>
        {/* Background Video Section */}
        <div className="relative w-full pt-[54.9%] overflow-hidden mt-[-70px] z-10">
          <video ref={videoRef} onClick={toggleMute} className="absolute top-0 left-0 w-full h-full object-fill" src={homePageData?.data?.videoUrl} autoPlay loop muted={isMuted} playsInline preload="auto"></video>
          <div className="absolute top-0 left-0 w-full h-full bg-cyan-700/25 z-5 pointer-events-none"></div>
          <button onClick={toggleMute} className="absolute bottom-4 right-4 z-20 p-2 bg-gray-800 text-white rounded">
            {isMuted ? <IoVolumeMuteOutline size={30} /> : <IoVolumeHighSharp size={30} />}
          </button>
        </div>

        {/* About Section */}
        <div className={`container flex ${isMobileDevice ? "flex-col" : ""} items-center justify-center mx-auto px-[20px] py-[45px] max-w-[1400px] ${styles["about-wrapper"]}`}>
          <motion.div className="relative p-[60px]" initial={{ opacity: 0, y: -300 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Image src={"/images/common/about-section.jpg"} alt={"About Margins Developments"} className={`${styles.image} w-[430px] h-full object-cover relative z-10`} width={435} height={425} />
            <motion.div className={`${styles["vector"]} ${isVectorVisible ? "about-vector-animate" : ""}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} onViewportEnter={() => setIsVectorVisible(true)} transition={{ duration: 0.5 }}>
              <svg viewBox="0 0 438 379" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="path"
                  d="M0.00118738 264.799L33.591 293.865M33.591 293.865L0.00237476 322.93M33.591 293.865L119.625 368.312M33.591 293.865L119.625 219.419M33.591 293.865V331.089M0.00118738 174.037L33.591 144.973M33.591 144.973L0.00593691 115.911M33.591 144.973L119.625 219.419M33.591 144.973L119.625 70.5271M33.591 144.973V182.197M29.0647 -0.00184078L0 25.1483M21.2363 379.002L33.591 368.312M33.591 368.312L0.00593691 339.249M33.591 368.312L119.625 293.865M33.591 368.312L45.9517 379.007M0.00237476 248.483L33.591 219.419M33.591 219.419L0.00593691 190.357M33.591 219.419L119.625 144.973M33.591 219.419L119.625 293.865M0.00237476 99.5919L33.591 70.5271M33.591 70.5271L0.00118738 41.4613M33.591 70.5271L115.099 -0.00184078M33.591 70.5271L119.625 144.973M33.591 70.5271V107.751M119.625 144.973L205.659 219.419M119.625 144.973L205.659 70.5271M119.625 144.973V182.197M119.625 293.865L205.659 368.312M119.625 293.865L205.659 219.419M119.625 293.865V331.089M107.27 379.003L119.625 368.312M119.625 368.312L205.659 293.865M119.625 368.312L131.981 379.002M119.625 219.419L205.659 144.973M119.625 219.419L205.659 293.865M119.625 70.5271L38.1185 -0.00184078M119.625 70.5271L201.133 -0.00184078M119.625 70.5271L205.659 144.973M119.625 70.5271V107.751M205.659 144.973L291.693 219.419M205.659 144.973L291.693 70.5271M205.659 293.865L291.693 368.312M205.659 293.865L291.693 219.419M193.304 379.001L205.659 368.312M205.659 368.312L291.693 293.865M205.659 368.312L218.013 379.002M205.659 219.419L291.693 144.973M205.659 219.419L291.693 293.865M205.659 70.5271L124.153 -0.00184078M205.659 70.5271L287.159 0.00535144M205.659 70.5271L291.693 144.973M291.693 144.973L377.727 219.419M291.693 144.973L377.727 70.5271M291.693 144.973V182.196M291.693 293.865L377.727 368.312M291.693 293.865L377.727 219.419M291.693 293.865V331.089L313.201 349.7M279.339 379.002L291.693 368.312M291.693 368.312L377.727 293.865M291.693 368.312L304.046 379M291.693 219.419L377.727 144.973M291.693 219.419L377.727 293.865M291.693 70.5271L210.194 0.00535144M291.693 70.5271L373.192 0.0063789M291.693 70.5271L377.727 144.973M291.693 70.5271V107.75M377.727 144.973L437.996 92.8209M377.727 144.973L437.992 197.12M377.727 144.973V182.196M377.727 293.865L437.996 241.714M377.727 293.865L438 346.02M377.727 293.865V331.089L399.236 349.7M365.374 379L377.727 368.312M377.727 368.312L437.996 316.161M377.727 368.312L390.083 379.002M377.727 219.419L437.999 167.268M377.727 219.419L438 271.573M377.727 70.5271L296.214 -0.00800554M377.727 70.5271L437.999 18.3753M377.727 70.5271L437.996 122.678M377.727 70.5271V107.75M382.263 0.00535144L437.996 48.2322M270.186 51.9147L291.693 33.3043M291.693 33.3043V-0.0151978M291.693 33.3043L313.201 51.9147M356.22 51.9147L377.727 33.3043M377.727 33.3043V-0.00492316M377.727 33.3043L399.236 51.9147M270.186 126.361L291.693 107.75M291.693 107.75L313.201 126.362M356.22 126.361L377.727 107.75M377.727 107.75L399.236 126.362M270.186 200.808L291.693 182.196M291.693 182.196L313.201 200.809M356.22 200.808L377.727 182.196M377.727 182.196L399.236 200.809M12.0816 14.6929L0 4.23848M81.1302 -0.00595062L98.1169 14.6929M184.151 14.6929L167.17 0.000214138M270.184 14.6929L253.211 0.0063789M356.218 14.6929L339.245 0.0063789M425.282 0.00843381L438.004 11.0166M33.591 -0.00492316V33.3043M33.591 33.3043L55.098 51.9147M33.591 33.3043L12.3179 51.9147M119.625 -0.00492316V33.3043M119.625 33.3043L141.132 51.9147M119.625 33.3043L98.352 51.9147M205.647 -0.00492316V33.3043M205.647 33.3043L227.156 51.9147M205.647 33.3043L184.374 51.9147M33.591 107.751L55.098 126.362M33.591 107.751L12.3179 126.361M119.625 107.751L141.132 126.362M119.625 107.751L98.352 126.361M205.647 70.5271V107.751M205.647 107.751L227.156 126.362M205.647 107.751L184.374 126.361M33.591 182.197L55.098 200.809M33.591 182.197L12.3179 200.808M119.625 182.197L141.132 200.809M119.625 182.197L98.352 200.808M205.647 144.973V182.197M205.647 182.197L227.156 200.809M205.647 182.197L184.374 200.808M33.591 219.42V256.644L55.098 275.256M12.3179 275.255L33.591 256.643M119.625 219.42V256.644L141.132 275.256M119.625 256.643L98.352 275.255M205.647 219.42V256.644L227.156 275.256M291.693 219.42V256.644L313.201 275.256M377.727 219.42V256.644L399.236 275.256M205.647 256.643L184.374 275.255M33.591 331.089L55.098 349.7M33.591 331.089L12.3179 349.7M119.625 331.089L141.132 349.7M119.625 331.089L98.352 349.7M205.647 293.865V331.089M205.647 331.089L227.156 349.7M205.647 331.089L184.374 349.699M55.3355 14.6929L72.1358 -0.00595062M141.37 14.6929L158.169 -0.00492316M227.404 14.6929L244.191 0.0063789M313.438 14.6929L330.225 0.0063789M399.472 14.6929L416.283 -0.0141703M0 78.6831L12.0816 89.1385M76.6086 33.3043V70.5281M76.6086 70.5281L98.1169 89.1385M76.6086 70.5281L55.3355 89.1385M162.643 33.3043V70.5281M162.643 70.5281L184.151 89.1385M162.643 70.5281L141.37 89.1385M248.677 33.3043V70.5281M248.677 70.5281L270.184 89.1385M248.677 70.5281L227.404 89.1385M334.711 33.3043V70.5281M334.711 70.5281L356.218 89.1385M334.711 70.5281L313.438 89.1385M420.745 33.3043V70.5281M420.745 70.5281L437.996 85.4561M420.745 70.5281L399.472 89.1385M12.0816 163.585L0 153.13M76.6086 107.75V144.974M76.6086 144.974L98.1169 163.585M76.6086 144.974L55.3355 163.585M162.643 107.75V144.974M162.643 144.974L184.151 163.585M162.643 144.974L141.37 163.585M248.677 107.75V144.974M248.677 144.974L270.184 163.585M248.677 144.974L227.404 163.585M420.745 107.75V144.974M420.745 144.974L437.996 159.903M420.745 144.974L399.472 163.585M334.711 107.75V144.974M334.711 144.974L356.218 163.585M334.711 144.974L313.438 163.585M12.0816 238.032L0.00237476 227.579M76.6086 182.196V219.419M76.6086 219.419L98.1169 238.032M76.6086 219.419L55.3355 238.032M162.643 182.196V219.419M162.643 219.419L184.151 238.032M162.643 219.419L141.37 238.032M248.677 182.196V219.419M248.677 219.419L270.184 238.032M248.677 219.419L227.404 238.032M334.711 182.196V219.419M334.711 219.419L356.218 238.032M334.711 219.419L313.438 238.032M420.745 182.196V219.419M420.745 219.419L437.996 234.349M420.745 219.419L399.472 238.032M270.186 275.244L291.693 256.634M356.22 275.244L377.727 256.634M270.186 349.7L291.693 331.09M356.22 349.7L377.727 331.09M12.0816 312.468L0.00831167 302.019M76.6086 256.633V293.856M76.6086 293.856L98.1169 312.468M76.6086 293.856L55.3355 312.468M162.643 256.633V293.856M162.643 293.856L184.151 312.468M162.643 293.856L141.37 312.468M248.677 256.633V293.856M248.677 293.856L270.184 312.468M248.677 293.856L227.404 312.468M420.745 256.633V293.856M420.745 293.856L437.996 308.786M420.745 293.856L399.472 312.468M334.711 256.633V293.856M334.711 293.856L356.218 312.468M334.711 293.856L313.438 312.468M76.6086 331.088V368.311M76.6086 368.311L88.9645 379.002M76.6086 368.311L64.3905 379M162.643 331.088V368.311M162.643 368.311L174.999 379.002M162.643 368.311L150.423 379M248.677 331.088V368.311M248.677 368.311L261.031 379.002M248.677 368.311L236.456 379.002M420.745 331.088V368.311M420.745 368.311L433.1 379.002M420.745 368.311L408.524 379.002M334.711 331.088V368.311M334.711 368.311L347.063 379M334.711 368.311L322.49 379.002"
                  stroke="#93adae"
                  strokeWidth="1"
                  strokeMiterlimit="10"
                ></path>
              </svg>
            </motion.div>
          </motion.div>
          <motion.div className="flex flex-col align-items flex-1 about-text" variants={aboutTextWrapperVariants} initial="hidden" whileInView="visible">
            <motion.span
              className={`
              ${styles["text-with-line"]}
              ${i18n.language === "en" ? "tracking-[8px]" : ""}
              text-[15px] font-medium uppercase`}
              variants={aboutTextVariants}
            >
              {t("home.aboutSuperTitle")}
            </motion.span>
            <motion.span className="text-[30px] uppercase font-bold tracking-[1px] mb-[35px]" variants={aboutTextVariants}>
              {t("home.aboutTitle")}
            </motion.span>
            <motion.span className="mb-[30px] text-[16px] text-[#404040] tracking-[2px] font-medium" variants={aboutTextVariants}>
              {t("home.aboutDescription")}
            </motion.span>
            <motion.a className={`flex w-fit ${styles.more}`} href="/about" variants={aboutTextVariants}>
              {t("home.viewMore")}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[20px] ml-2 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Projects Section */}
        <div className="container flex flex-col items-center justify-center mx-auto px-[20px] py-[45px] max-w-[1400px]">
          <motion.h1 className={`text-[30px] font-bold uppercase mt-[30px] mb-[70px] ${i18n.language === "en" ? "tracking-[5px]" : ""}`} variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
            {t("home.projects")}
          </motion.h1>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]" variants={projectVariants} initial="hidden" whileInView="visible">
            {projects.data.map((project) => (
              <ProjectCard key={project.id} project={project} onNavigate={handleNavigation} />
            ))}
          </motion.div>
        </div>

        {/* News Section */}
        <div className={`${styles["news-wrapper"]} flex ${isMobileDevice ? "flex-col" : ""} justify-between w-full px-[20px] py-[45px] max-w-[1400px]`}>
          <div className={`${isMobileDevice ? "mb-4" : "w-[20%]"} flex flex-col justify-center`}>
            <span className="text-4xl font-semibold mb-8">{t("home.latestNews")}</span>
            <motion.a className={`flex w-fit font-semibold ${styles["news-view-more"]}`} href="/news" variants={aboutTextVariants}>
              {t("home.viewMore")}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[20px] ml-2 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </motion.a>
          </div>
          <div className={isMobileDevice ? "" : "w-[75%]"} dir="ltr">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              speed={1300}
              direction={isMobileDevice ? "vertical" : "horizontal"}
              spaceBetween={20}
              slidesPerView={isMobileDevice ? 1 : 3}
              className={`${styles["news-wrapper"]} w-full`}
              style={isMobileDevice ? { height: "340px" } : { height: "auto" }}
            >
              {newsList.map((news) => (
                <SwiperSlide key={news.id} className={styles["slide-item"]}>
                  <div className={`${styles["slide-item-inner"]} relative bg-blue-500 h-64 flex items-center justify-center text-white`}>
                    <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${news.image.url}`} alt={`Margins Developments News - ${news.name}`} className={`${styles.image} w-full h-full object-cover`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    <div className={`${styles["slide-item-text"]} absolute bottom-0 left-0 right-0`}>
                      <span className="text-lg font-bold">{news.title}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="relative flex justify-center items-center flex-col">
          <div className={styles["bg-overlay"]}>
            <h6 className={styles.text}>Margins Developments</h6>
          </div>
          <div className={styles["bg-line"]}></div>
        </div>
      </div>
    </main>
  );
}
