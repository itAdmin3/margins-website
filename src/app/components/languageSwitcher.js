import { Montserrat } from "next/font/google";
import { Cairo } from "next/font/google";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const montserrat = Montserrat({
  subsets: ["latin"],
  weights: ["400", "700"], // Corrected here
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weights: ["400", "700"], // Corrected here
});

export default function LanguageSwitcher() {
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang); 
  };

  return (
    <div className="flex items-center">
      <button onClick={toggleLanguage} className={i18n.language === "en" ? cairo.className + " cursor-pointer" : montserrat.className + " h-auto cursor-pointer"}>{t("nav.langaugeSwitcher")}</button>
    </div>
  );
}
