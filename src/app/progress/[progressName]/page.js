import { getProgressData } from "../../lib/api";
import ProgressPage from "../../components/progressPage";

export default async function ProgressDetails({ params }) {
  const { progressName } = await params;
  const progressData = await getProgressData(progressName);
  return (
    <>
      <ProgressPage progressData={progressData} />
    </>
  );
}
