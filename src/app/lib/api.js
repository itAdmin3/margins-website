"use server";
import { cache } from "react";

export const getHomePage = cache(async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/home-page`, {
      // next: { revalidate: 6 }, // revalidate: 600 = 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Project Data: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching Project data:", error);
    return null;
  }
});

export const getProjects = cache(async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/projects/?fields=slug,title&populate[projectImage][fields]=url,alternativeText&populate[logoImage][fields]=url,alternativeText&sort[0]=projectOrder:desc`, {
      // next: { revalidate: 6 }, // revalidate: 600 = 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Project Data: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching Project data:", error);
    return null;
  }
});

export const getProjectBySlug = cache(async (projectName) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/projects/?populate[facilities][fields]=id,name&populate[facilities][populate][icon][fields]=url&populate[galleryImages][fields]=id,url,alternativeText&populate[coverImage][fields]=url,alternativeText&populate[projectImage][fields]=url,alternativeText&populate[logoImage][fields]=url,alternativeText&populate[locationFeatures][populate]=*&populate[locationMapImage][fields]=id,name,url,alternativeText&populate[news_posts][fields]=title,date,type,locale,slug,newsOrder&populate[news_posts][populate][image][fields]=url,alternativeText&populate[brochure][fields]=url&populate[projectUnitsTypes][populate]=*&populate[SEO][populate]=*&filters[slug][$eq]=${projectName}&locale=*`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch project data: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error("Invalid API response");
    }

    const projectData = { en: null, ar: null };

    data.data.forEach((item) => {
      const locale = item?.locale?.toLowerCase();
      if (locale === "en") {
        projectData.en = item;
      } else if (locale === "ar-eg" || locale === "ar") {
        projectData.ar = item;
      }
    });

    return projectData;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return { en: null, ar: null };
  }
});

export const getProgressData = cache(async (progressName) => {
  try {
    const res = await fetch(`${process.env.API_URL}/progresses?populate[fullImage][fields]=id,name,url,alternativeText&populate[progressUpdate][populate]=*&filters[slug][$eq]=${progressName}&locale=*`, {
      next: { revalidate: 6 }, // revalidate: 600 = 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Progress Data: ${res.statusText}`);
    }

    const data = await res.json();
    const progressData = { en: null, ar: null };
    data.data.forEach((item) => {
      const locale = item?.locale?.toLowerCase();
      if (locale === "en") {
        progressData.en = item;
      } else if (locale === "ar-eg" || locale === "ar") {
        progressData.ar = item;
      }
    });
    return progressData;
  } catch (error) {
    console.error("Error fetching Progress data:", error);
    return null;
  }
});

export const getNews = cache(async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/news-posts?fields=locale,slug,title,date,type&populate[image][fields]=url,alternativeText&sort[0]=newsOrder:desc&locale=*`, {
      next: { revalidate: 6 }, // revalidate: 600 = 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Project Data: ${res.statusText}`);
    }

    const data = await res.json();
    const news = { en: [], ar: [] };
    data.data.forEach((item) => {
      const locale = item?.locale?.toLowerCase();
      if (locale === "en") {
        news.en.push(item);
      } else if (locale === "ar-eg" || locale === "ar") {
        news.ar.push(item);
      }
    });
    return news;
  } catch (error) {
    console.error("Error fetching Project data:", error);
    return null;
  }
});

export const getNewsBySlug = cache(async (newsName) => {
  try {
    const res = await fetch(`${process.env.API_URL}/news-posts?populate[gallery][fields]=url,name,width,height,formats&populate[fullImage][fields]=url,name,width,height&populate[image][fields]=url,name,width,height&filters[slug][$eq]=${newsName}&locale=*`, {
      next: { revalidate: 6 }, // revalidate: 600 = 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Project Data: ${res.statusText}`);
    }

    const data = await res.json();
    const newsPost = { en: null, ar: null };

    data.data.forEach((item) => {
      const locale = item?.locale?.toLowerCase();
      if (locale === "en") {
        newsPost.en = item;
      } else if (locale === "ar-eg" || locale === "ar") {
        newsPost.ar = item;
      }
    });
    return newsPost;
  } catch (error) {
    console.error("Error fetching Project data:", error);
    return null;
  }
});
