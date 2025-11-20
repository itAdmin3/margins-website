"use client";

import "./styles/globals.css";
import { Cairo } from "next/font/google";
import React, { useState, useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import Loader from "./components/loader";
import { DeviceTypeProvider } from "./utils/deviceDetector";
import { MetadataProvider } from "./utils/metadataProvider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weights: ["400", "700"],
});

function RootLayout({ children }) {
  const { i18n } = useTranslation();
  const [deviceType, setDeviceType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const getDeviceType = () => {
      const width = window.innerWidth;
      setDeviceType(width >= 1024 ? "desktop" : width >= 768 ? "tablet" : "phone");
    };

    getDeviceType();
    window.addEventListener("resize", getDeviceType);
    return () => window.removeEventListener("resize", getDeviceType);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage).then(() => {
      document.documentElement.lang = savedLanguage;
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    });

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => setIsLoading(false), 1000);
    }, 300);

    return () => clearTimeout(timer);
  }, [i18n]);

  return (
    <html lang={i18n.language || "en"} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T3DD7BQ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${deviceType} ${i18n.language === "ar" ? "is-rtl" : ""}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T3DD7BQ" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <MetadataProvider>
          <DeviceTypeProvider>
            {isLoading && <Loader isFadingOut={isFadingOut} />}
            {React.cloneElement(children, { deviceType })}
          </DeviceTypeProvider>
        </MetadataProvider>
      </body>
    </html>
  );
}

export default appWithTranslation(RootLayout);
