"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/style.css";
import styles from "../styles/pages/NewsItem.module.scss";
import Header from "./header";
import Footer from "./footer";
import SocialLinks from "./socialLinks";
import SocialShareWidget from "./socialShareWidget";
import RichTextRenderer from "./richTextRenderer";

export default function NewsPage({ data }) {
  const { t, i18n } = useTranslation("");
  const content = data[i18n.language] ? data[i18n.language] : data[i18n.language === "en" ? "ar" : "en"];
  return (
    <div>
      <Header />
      <main className={`${styles.wrapper} max-w-[1200px] pl-20 pr-20 ml-auto mr-auto mt-[100px] mb-20`}>
        <div className="overflow-hidden">
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${content.fullImage.url}`} alt={`${content.title} || Margins Developments`} layout="responsive" width={1920} height={1080} className="min-w-[100%] min-h-[100%]" />
        </div>
        <div className="flex">
          <div className="p-5 pr-8">
            <div className="mb-20">
              <div className="flex gap-4 text-[14px]">
                <div className="text-gray-900">{content.date}</div>
                <div className="text-gray-900">{content.type}</div>
              </div>
              <div className="mt-3 text-black text-[30px] font-semibold">{content.title}</div>
              <div className="mt-5 text-black text-[14px]">
                <RichTextRenderer content={content.description} />
              </div>
            </div>

            {content.videoUrl && (
              <div className="relative bg-black w-[100%] mb-10">
                <video width="100%" src={content.videoUrl} title="video" controls></video>
              </div>
            )}

            {content.gallery && content.gallery.length > 0 && (
              <Gallery options={{ fullscreen: true, bgOpacity: 1, escKey: true, arrowKeys: true, wheelToZoom: true }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
                  {content.gallery
                    .filter((image) => image.url)
                    .map((image, index) => (
                      <Item key={index} original={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`} thumbnail={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.formats.thumbnail.url}`} width={1200} height={700}>
                        {({ ref, open }) => <Image ref={ref} onClick={open} src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`} alt={image.alternativeText || `News Image ${index + 1}`} layout="intrinsic" width={1200} height={700} className="cursor-pointer" />}
                      </Item>
                    ))}
                </div>
              </Gallery>
            )}
          </div>
          <SocialShareWidget
            twitterURL={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${process.env.WEBSITE_URL}/news/${content.slug}`)}&text=${encodeURIComponent(content.title)}`}
            facebookURL={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.WEBSITE_URL}/news/${content.slug}`)}`}
            linkedinURL={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.WEBSITE_URL}/news/${content.slug}`)}`}
            mailURL={`mailto:?subject=${encodeURIComponent(`Check out this news: ${content.title}`)}&body=${encodeURIComponent(`I found this interesting news and wanted to share it with you:\n\n${content.title}\nRead more here: ${process.env.WEBSITE_URL}/news/${content.slug}`)}`}
          />
        </div>
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}
