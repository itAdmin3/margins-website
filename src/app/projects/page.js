import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import ProjectList from "../components/projectsList";
import SocialLinks from "../../app/components/socialLinks";
import { getProjects } from "../lib/api";

export default async function Projects() {
  const projects = await getProjects();
  return (
    <div>
      <Head>
        <title>My Client Page</title>
        <meta name="description" content="This is a client-side rendered page" />
      </Head>
      <Header headerColor="#8aa6a8" />
      <ProjectList projects={projects.data} />
      <SocialLinks />
      <Footer />
    </div>
  );
}
