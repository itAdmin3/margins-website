import { getNewsBySlug } from "../../lib/api";
import NewsPage from "../../components/newsPage";

export default async function NewsDetails({ params }) {
  const { newsName } = await params;
  const data = await getNewsBySlug(newsName);
  return (
    <>
      <NewsPage data={data} />
    </>
  );
}
