import Header from "./components/header";
import Footer from "./components/footer";
import SocialLinks from "../app/components/socialLinks";
import HomePage from "./components/homePage";
import { getProjects } from "./lib/api";
import { getNews } from "./lib/api";
import { getHomePage } from "./lib/api";

export default async function Home() {
  const projects = await getProjects();
  const news = await getNews();
  const homePageData = await getHomePage();

  return (
    <>
      <Header />
      <HomePage projects={projects} news={news} homePageData={homePageData} />
      <SocialLinks />
      <Footer />
    </>
  );
}
