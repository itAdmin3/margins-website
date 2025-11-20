"use client";
import SocialLinks from "../components/socialLinks";
import Footer from "../components/footer";
import Header from "../components/header";
import { Suspense } from "react";
import PostPayContent from "../components/PostPayContent";

export default function PostPayPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ minHeight: "50dvh" }} />}> 
        <PostPayContent />
      </Suspense>
      <SocialLinks />
      <Footer />
    </>
  );
}

