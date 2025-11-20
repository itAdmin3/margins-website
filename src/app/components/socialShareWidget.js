import styles from "../styles/pages/NewsItem.module.scss";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function SocialShareWidget({ twitterURL, facebookURL, linkedinURL, mailURL }) {
  const { t } = useTranslation("");

  return (
    <div className="sticky top-20 pt-5 z-10 flex justify-end h-max">
      <div className={styles["share-post-wrapper"]}>
        <p className="uppercase text-sm font-semibold">{t("newsItem.sharePost")}</p>
        <div className="flex flex-col items-center gap-4 p-2 mt-2">
          <a href={twitterURL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition">
            <FaTwitter size={16} />
          </a>
          <a href={facebookURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition">
            <FaFacebook size={16} />
          </a>
          <a href={mailURL} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition">
            <FaEnvelope size={16} />
          </a>
          <a href={linkedinURL} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition">
            <FaLinkedin size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
