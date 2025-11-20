import { getProjectBySlug } from "../../lib/api";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SocialLinks from "../../components/socialLinks";
import ProjectPage from "../../components/projectPage";

export default async function ProjectDetails({ params }) {
  const { projectName } = await params;
  const projectData = await getProjectBySlug(projectName);

  return (
    <div>
      <Header />
      <ProjectPage projectData={projectData} />
      <SocialLinks />
      <Footer />
    </div>
  );
}
