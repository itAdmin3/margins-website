"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "../styles/pages/Contact.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import { useMetadata } from "../utils/metadataProvider";
import { useDeviceType } from "../utils/deviceDetector";
import { motion } from "framer-motion";
import { RxCalendar } from "react-icons/rx";
import { PiPhoneThin } from "react-icons/pi";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import SocialLinks from "../../app/components/socialLinks";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    unitType: "Unit Type",
    message: "",
    country: "20",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMsg("Thank you for reaching out to us! Our team will contact you shortly.");
        e.target.reset();
      } else {
        setResponseMsg("Failed to send message. Please try later.");
      }
    } catch (error) {
      setResponseMsg("Failed to send message. Please try later.");
    }
    setLoading(false);
  };

  const { setMetadata } = useMetadata();
  const { t } = useTranslation("");
  const router = useRouter();
  const deviceType = useDeviceType();
  const isMobileDevice = ["tablet", "phone"].includes(deviceType);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setMetadata({
      title: "Contact Us | Margins Developments",
      description: "Welcome to the home page of my awe-inspiring Next.js application!",
    });
  }, [setMetadata]);

  if (!hydrated) {
    return null;
  }

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  const SlideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div>
      <Head>
        <title>My Client Page</title>
        <meta name="description" content="This is a client-side rendered page" />
      </Head>
      <Header />
      <main className={styles.wrapper}>
        <div className="relative w-full overflow-hidden mt-[0px]">
          <Image src="/images/common/contact-background.webp" alt="contact-background.webp" className={`${styles.banner} w-full`} width={535} height={525} quality={100} />
          <div className={`absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-center mt-[30px] mb-[40px] max-w-[1400px] pl-5 pr-5 ml-auto mr-auto ${isMobileDevice ? "text-center" : ""}`}>
            <h6
              className={`text-white text-[16px]
                 ${styles["text-with-line"]}
                 ${isMobileDevice ? "justify-center" : ""}
                 ${styles.title} ${router.locale === "en" ? "tracking-[2px]" : ""}`}
            >
              {t("contact.title")}
            </h6>
            <h1 className={`text-white font-bold uppercase ${isMobileDevice ? "w-[100%] text-[40px]" : "text-[80px] w-[440px]"} `}>{t("contact.subTitle")}</h1>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex flex-wrap justify-between mx-auto px-[20px] py-[45px] max-w-[1400px]">
            <div className="w-full md:w-1/2 lg:w-2/5">
              <motion.h2 className="text-xl mb-10 text-black" variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
                Contact Us now
              </motion.h2>
              <motion.ul
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                exit="exit"
                transition={{ duration: 1 }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1, // Delay between each word animation
                    },
                  },
                  hidden: {},
                  exit: {},
                }}
              >
                <motion.li
                  className={`flex items-center ${styles.detail}`}
                  variants={SlideVariants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <div className={styles["detail-inner"]}>
                    <span className="mr-3">
                      <PiPhoneThin size={16} />
                    </span>
                    <span>Call Now: </span>
                  </div>
                  <span className={styles.line}></span>
                  <span className={styles.text}>16930</span>
                </motion.li>
                <motion.li
                  className={`flex items-center ${styles.detail}`}
                  variants={SlideVariants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <div className={styles["detail-inner"]}>
                    <span className="mr-3">
                      <LiaMapMarkerAltSolid size={16} />
                    </span>
                    <span>Address: </span>
                  </div>
                  <span className={styles.line}></span>
                  <span className={styles.text}>Building 340, South 90 St., New Cairo, Egypt</span>
                </motion.li>
                <motion.li
                  className={`flex items-center ${styles.detail}`}
                  variants={SlideVariants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <div className={styles["detail-inner"]}>
                    <span className="mr-3">
                      <RxCalendar size={16} />
                    </span>
                    <span>Work hours: </span>
                  </div>
                  <span className={styles.line}></span>
                  <span className={styles.text}>From Sat to Thu, 10am to 8pm</span>
                </motion.li>
              </motion.ul>
            </div>
            <div className="hidden md:block w-[1px] bg-gray-300 mx-5"></div>
            <div className="w-full md:w-1/2 lg:w-2/5">
              <motion.h2 className="text-xl mb-5" variants={textVariants} initial="hidden" whileInView="visible" exit="exit" transition={{ duration: 0.4 }}>
                Get in Touch
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" onChange={handleChange} placeholder="Your name" required className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800" />
                <div className="flex space-x-3">
                  <select id="country" name="country" onChange={handleChange} className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800 text-black" placeholder="Country" defaultValue="20">
                    <option data-countrycode="" value="">
                      country key*
                    </option>
                    <option data-countrycode="EG" value="20">
                      Egypt - مصر
                    </option>
                    <optgroup label="Arab">
                      <option data-countrycode="DZ" value="213">
                        Algeria - الجزائر
                      </option>
                      <option data-countrycode="BH" value="973">
                        Bahrain - البحرين
                      </option>
                      <option data-countrycode="IQ" value="964">
                        Iraq - العراق
                      </option>
                      <option data-countrycode="JO" value="962">
                        Jordan - الأردن
                      </option>
                      <option data-countrycode="KW" value="965">
                        Kuwait - الكويت
                      </option>
                      <option data-countrycode="LY" value="218">
                        Libya - ليبيا
                      </option>
                      <option data-countrycode="MA" value="212">
                        Morocco - المغرب
                      </option>
                      <option data-countrycode="OM" value="968">
                        Oman - عمان
                      </option>
                      <option data-countrycode="QA" value="974">
                        Qatar - قطر
                      </option>
                      <option data-countrycode="TN" value="216">
                        Tunisia - تونس
                      </option>
                      <option data-countrycode="SA" value="966">
                        Saudi Arabia - السعودية
                      </option>
                      <option data-countrycode="SD" value="249">
                        Sudan - السودان
                      </option>
                      <option data-countrycode="SI" value="963">
                        Syria - سوريا
                      </option>
                      <option data-countrycode="AE" value="971">
                        United Arab Emirates - الإمارات العربية
                      </option>
                      <option data-countrycode="YE" value="969">
                        Yemen +969 - اليمن
                      </option>
                      <option data-countrycode="YE" value="967">
                        Yemen +967 - اليمن
                      </option>
                      <option data-countrycode="LB" value="961">
                        Lebanon - لبنان
                      </option>
                    </optgroup>
                    <optgroup label="Countries">
                      <option data-countrycode="DE" value="49">
                        Germany
                      </option>
                      <option data-countrycode="GB" value="44">
                        UK
                      </option>
                      <option data-countrycode="US" value="1">
                        USA
                      </option>
                      <option data-countrycode="CA" value="1">
                        Canada
                      </option>
                      <option data-countrycode="IT" value="39">
                        Italy
                      </option>
                      <option data-countrycode="TR" value="90">
                        Turkey
                      </option>
                    </optgroup>
                    <optgroup label="Other countries">
                      <option data-countrycode="AO" value="244">
                        Angola
                      </option>
                      <option data-countrycode="AR" value="54">
                        Argentina
                      </option>
                      <option data-countrycode="AU" value="61">
                        Australia
                      </option>
                      <option data-countrycode="AZ" value="994">
                        Azerbaijan
                      </option>
                      <option data-countrycode="BS" value="1242">
                        Bahamas
                      </option>
                      <option data-countrycode="BE" value="32">
                        Belgium
                      </option>
                      <option data-countrycode="BA" value="387">
                        Bosnia Herzegovina
                      </option>
                      <option data-countrycode="BR" value="55">
                        Brazil
                      </option>
                      <option data-countrycode="BG" value="359">
                        Bulgaria
                      </option>
                      <option data-countrycode="BF" value="226">
                        Burkina Faso
                      </option>
                      <option data-countrycode="CM" value="237">
                        Cameroon
                      </option>
                      <option data-countrycode="CA" value="1">
                        Canada
                      </option>
                      <option data-countrycode="CN" value="86">
                        China
                      </option>
                      <option data-countrycode="HR" value="385">
                        Croatia
                      </option>
                      <option data-countrycode="DK" value="45">
                        Denmark
                      </option>
                      <option data-countrycode="EC" value="593">
                        Ecuador
                      </option>
                      <option data-countrycode="ET" value="251">
                        Ethiopia
                      </option>
                      <option data-countrycode="FI" value="358">
                        Finland
                      </option>
                      <option data-countrycode="FR" value="33">
                        France
                      </option>
                      <option data-countrycode="GE" value="7880">
                        Georgia
                      </option>
                      <option data-countrycode="GR" value="30">
                        Greece
                      </option>
                      <option data-countrycode="GL" value="299">
                        Greenland
                      </option>
                      <option data-countrycode="HK" value="852">
                        Hong Kong
                      </option>
                      <option data-countrycode="HU" value="36">
                        Hungary
                      </option>
                      <option data-countrycode="IS" value="354">
                        Iceland
                      </option>
                      <option data-countrycode="IN" value="91">
                        India
                      </option>
                      <option data-countrycode="ID" value="62">
                        Indonesia
                      </option>
                      <option data-countrycode="IR" value="98">
                        Iran
                      </option>
                      <option data-countrycode="IE" value="353">
                        Ireland
                      </option>
                      <option data-countrycode="JP" value="81">
                        Japan
                      </option>
                      <option data-countrycode="KZ" value="7">
                        Kazakhstan
                      </option>
                      <option data-countrycode="KE" value="254">
                        Kenya
                      </option>
                      <option data-countrycode="KI" value="686">
                        Kiribati
                      </option>
                      <option data-countrycode="KR" value="82">
                        Korea South
                      </option>
                      <option data-countrycode="LU" value="352">
                        Luxembourg
                      </option>
                      <option data-countrycode="MY" value="60">
                        Malaysia
                      </option>
                      <option data-countrycode="MV" value="960">
                        Maldives
                      </option>
                      <option data-countrycode="ML" value="223">
                        Mali
                      </option>
                      <option data-countrycode="MR" value="222">
                        Mauritania
                      </option>
                      <option data-countrycode="MX" value="52">
                        Mexico
                      </option>
                      <option data-countrycode="MN" value="95">
                        Myanmar
                      </option>
                      <option data-countrycode="NL" value="31">
                        Netherlands
                      </option>
                      <option data-countrycode="NZ" value="64">
                        New Zealand
                      </option>
                      <option data-countrycode="NI" value="505">
                        Nicaragua
                      </option>
                      <option data-countrycode="NE" value="227">
                        Niger
                      </option>
                      <option data-countrycode="NG" value="234">
                        Nigeria
                      </option>
                      <option data-countrycode="NO" value="47">
                        Norway
                      </option>
                      <option data-countrycode="PA" value="507">
                        Panama
                      </option>
                      <option data-countrycode="PY" value="595">
                        Paraguay
                      </option>
                      <option data-countrycode="PH" value="63">
                        Philippines
                      </option>
                      <option data-countrycode="PL" value="48">
                        Poland
                      </option>
                      <option data-countrycode="PT" value="351">
                        Portugal
                      </option>
                      <option data-countrycode="RE" value="262">
                        Reunion
                      </option>
                      <option data-countrycode="RO" value="40">
                        Romania
                      </option>
                      <option data-countrycode="RU" value="7">
                        Russia
                      </option>
                      <option data-countrycode="RW" value="250">
                        Rwanda
                      </option>
                      <option data-countrycode="CS" value="381">
                        Serbia
                      </option>
                      <option data-countrycode="SC" value="248">
                        Seychelles
                      </option>
                      <option data-countrycode="SG" value="65">
                        Singapore
                      </option>
                      <option data-countrycode="SK" value="421">
                        Slovak Republic
                      </option>
                      <option data-countrycode="SI" value="386">
                        Slovenia
                      </option>
                      <option data-countrycode="SB" value="677">
                        Solomon Islands
                      </option>
                      <option data-countrycode="SO" value="252">
                        Somalia
                      </option>
                      <option data-countrycode="ZA" value="27">
                        South Africa
                      </option>
                      <option data-countrycode="ES" value="34">
                        Spain
                      </option>
                      <option data-countrycode="LK" value="94">
                        Sri Lanka
                      </option>
                      <option data-countrycode="SH" value="290">
                        St. Helena
                      </option>
                      <option data-countrycode="KN" value="1869">
                        St. Kitts
                      </option>
                      <option data-countrycode="SC" value="1758">
                        St. Lucia
                      </option>
                      <option data-countrycode="SR" value="597">
                        Suriname
                      </option>
                      <option data-countrycode="SZ" value="268">
                        Swaziland
                      </option>
                      <option data-countrycode="SE" value="46">
                        Sweden
                      </option>
                      <option data-countrycode="CH" value="41">
                        Switzerland
                      </option>
                      <option data-countrycode="TW" value="886">
                        Taiwan
                      </option>
                      <option data-countrycode="TJ" value="7">
                        Tajikstan
                      </option>
                      <option data-countrycode="TH" value="66">
                        Thailand
                      </option>
                      <option data-countrycode="TM" value="7">
                        Turkmenistan
                      </option>
                      <option data-countrycode="TM" value="993">
                        Turkmenistan
                      </option>
                      <option data-countrycode="TR" value="90">
                        Turkey
                      </option>
                      <option data-countrycode="TC" value="1649">
                        Turks &amp; Caicos Islands
                      </option>
                      <option data-countrycode="GB" value="44">
                        UK
                      </option>
                      <option data-countrycode="UA" value="380">
                        Ukraine
                      </option>
                      <option data-countrycode="US" value="1">
                        USA
                      </option>
                    </optgroup>
                    <option data-countrycode="-" value="other">
                      Other
                    </option>
                  </select>
                  <input type="number" name="phone" onChange={handleChange} placeholder="Your phone" required className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800" />
                </div>
                <select name="unitType" onChange={handleChange} className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800" defaultValue="Unit type">
                  <option value="Unit type">Unit type</option>
                  <option value="Administrative unit">Administrative unit</option>
                  <option value="Commercial unit">Commercial unit</option>
                  <option value="Medical unit">Medical unit</option>
                  <option value="Residential unit">Residential unit</option>
                </select>
                <textarea name="message" onChange={handleChange} placeholder="Your message" required rows="4" className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800"></textarea>
                <button type="submit" className="btn-primary text-white font-medium py-2 px-16 shadow-sm hover:bg-black focus:outline-hidden focus:ring-2 focus:ring-teal-400">
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
              {responseMsg && <p className="text-center text-red-500 mt-2">{responseMsg}</p>}
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.3818354395485!2d31.478204689676947!3d30.02590155482679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145823ef567b6027%3A0x912fa48592923a9c!2sMargins%20Developments!5e0!3m2!1sen!2sus!4v1686341909148!5m2!1sen!2sus"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow-lg"
        ></iframe>
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}
