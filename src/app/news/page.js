import Header from "../components/header";
import Footer from "../components/footer";
import SocialLinks from "../../app/components/socialLinks";
import NewsList from "../components/newsList";
import { getNews } from "../lib/api";

export default async function News() {
  const data = await getNews();

  return (
    <div>
      <Header />
      <NewsList newsList={data} />
      <SocialLinks />
      <Footer />
    </div>
  );
}
