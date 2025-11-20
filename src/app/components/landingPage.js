"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import { Cairo } from "next/font/google";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

// Import the Wheel only on the client
const Wheel = dynamic(
  () =>
    import("react-custom-roulette-r19").then(
      (m) => m.Wheel ?? m.default?.Wheel
    ),
  { ssr: false }
);

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const { t } = useTranslation("");
  const [isValidated, setIsValidated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    countryCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [notification, setNotification] = useState(null);

  const [showResult, setShowResult] = useState(false);
  const [prizesData, setPrizesData] = useState([]);
  const [isLoadingPrizes, setIsLoadingPrizes] = useState(true);
  const [prizesError, setPrizesError] = useState(null);

  // Refs to stabilize behavior during spin
  const mustSpinRef = useRef(false);
  useEffect(() => {
    mustSpinRef.current = mustSpin;
  }, [mustSpin]);
  const hasStoppedRef = useRef(false);
  const notificationTimeoutRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Fetch prizes data from API
  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        setIsLoadingPrizes(true);
        setPrizesError(null);

        const response = await fetch("/api/prizes");
        const result = await response.json();

        if (response.ok) {
          setPrizesData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch prizes");
        }
      } catch (error) {
        console.error("Error fetching prizes:", error);
        setPrizesError(error.message);
        // Set fallback data
      } finally {
        setIsLoadingPrizes(false);
      }
    };

    fetchPrizes();
  }, []);

  // Use prizesData instead of hardcoded data (memoized to keep stable reference during spins)
  const data = useMemo(() => prizesData, [prizesData]);

  const showNotification = (type, message) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = null;
    }
    setNotification({ type, message });
    const scheduleClear = () => {
      if (mustSpinRef.current) {
        notificationTimeoutRef.current = setTimeout(scheduleClear, 300);
      } else {
        setNotification(null);
        notificationTimeoutRef.current = null;
      }
    };
    notificationTimeoutRef.current = setTimeout(scheduleClear, 4000);
  };

  const handleInputChange = (e) => {
    if (e && e.target && e.target.name) {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    }
  };
  const quickValidate = (countryCode, national) => {
    return (
      typeof countryCode === "string" &&
      /^\+\d+$/.test(countryCode) &&
      typeof national === "string" &&
      /^\d{6,15}$/.test(national)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.name.trim()) {
      showNotification("error", t("landingPage.validEmail") );
      return;
    }

    if (!quickValidate(userInfo.countryCode, userInfo.phone)) {
      showNotification("error",t("landingPage.validPhone") );
      return;
    }

    setIsSubmitting(true);

    try {
      const countryCode = userInfo.countryCode;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInfo.name,
          phone: userInfo.phone,
          country: countryCode || "+966",
          unitType: " ",
          message: " ",
        }),
      });

      if (response.ok) {
        showNotification(
          "success",
          t("landingPage.validSucc") 
          // "Validation successful! You can now spin the wheel."
        );
        setIsValidated(true);
        setShowPopup(false);
        setUserInfo({ name: "", phone: "" });
      } else {
      showNotification("error", t("landingPage.validFailed"));
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("error",t("landingPage.validError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openPopup = () => {
    if (!isValidated) {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSpinClick = () => {
    if (!isValidated) {
      openPopup();
      return;
    }

    // Pick prize and start spin (ensure order and guards)
    const segmentIndex = Math.floor(Math.random() * data.length);
    hasStoppedRef.current = false;
    setPrizeNumber(segmentIndex);
    setMustSpin(true);
  };
  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  const SlideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.8 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };
  return (
    <>
      <AnimatePresence>
        {notification && (
          <motion.div
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[60] w-auto min-w-[350px]"
          >
            <div
              className={`flex items-center p-4 rounded-lg shadow-lg ${
                notification.type === "success"
                  ? "bg-[#9FABA1] text-[#F4F5F4]"
                  : notification.type === "error"
                  ? "bg-[#FFA875] text-[#F4F5F4]"
                  : "bg-[#FFE2D1] text-[#F4F5F4]"
              }`}
            >
              <div className="flex-shrink-0 mr-3">
                {notification.type === "success" && (
                  <HiOutlineCheckCircle size={24} />
                )}
                {notification.type === "error" && (
                  <HiOutlineXCircle size={24} />
                )}
                {notification.type === "warning" && (
                  <HiOutlineExclamationTriangle size={24} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="ml-3 flex-shrink-0 text-white hover:text-gray-200"
              >
                <HiOutlineXCircle size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Validation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-51 sm:z-50 p-4">
          <div className="bg-[#F4F5F4] rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <motion.h2
                className="text-xl font-bold text-[#173235]"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4 }}
              >
                {t("landingPage.userValidation")}
              </motion.h2>
              <button
                onClick={closePopup}
                className="text-[#173235] text-2xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                variants={SlideVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
              >
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  placeholder={t("landingPage.name")}
                  required
                  className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                />
              </motion.div>

              <motion.div
                variants={SlideVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
                dir="ltr"
              >
                <PhoneInput
                  //   enableSearch
                  country={"sa"}
                  value={`${userInfo.countryCode.replace("+", "")}${
                    userInfo.phone
                  }`}
                  onChange={(value, country) => {
                    const dial = country?.dialCode || ""; // e.g. "966"
                    const iso2 = country?.countryCode || ""; // e.g. "sa"
                    // strip the dial from the start to get national part
                    const national = value.startsWith(dial)
                      ? value.slice(dial.length)
                      : value;
                    setUserInfo({
                      ...userInfo,
                      countryCode: dial ? `+${dial}` : "",
                      phone: national, // national number only
                      iso2,
                    });
                  }}
                  placeholder={t("landingPage.phone")}
                  required
                  inputStyle={{
                    width: "100%",
                  }}
                />
              </motion.div>

              <motion.div
                className="flex space-x-3 pt-4"
                variants={SlideVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  type="button"
                  onClick={closePopup}
                  className="!h-auto flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md bg-[#F4F5F4] cursor-pointer"
                >
                  {t("landingPage.Cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-fit text-white font-medium py-2 px-16 shadow-sm bg-[#2E4649] focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {isSubmitting
                    ? t("landingPage.Submitting")
                    : t("landingPage.validateToSpin")}
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      )}

      {/* Wheel Component */}
      <div className="flex flex-col items-center gap-4 p-6 mt-[150px] mb-[90px]">
        {isLoadingPrizes ? (
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: 360, height: 360 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E4649]"></div>
            <p className="mt-4 text-gray-600">
              {t("landingPage.LoadingPrizes") || "Loading prizes..."}
            </p>
          </div>
        ) : mounted && data.length > 0 ? (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              hasStoppedRef.current = true;
              setMustSpin(false);
              setShowResult(true);
            }}
            // onStopSpinning={() => setMustSpin(false)}
            backgroundColors={["#E9ECEA", "#95A297"]}
            textColors={["#173235", "#F4F5F4"]}
            outerBorderColor="#333"
            outerBorderWidth={8}
            innerRadius={5}
            innerBorderColor="#333"
            innerBorderWidth={4}
            radiusLineColor="#fff"
            radiusLineWidth={2}
            textDistance={70}
            spinDuration={0.6}

            // pointerProps={{
            // src: '/pointer.svg',

            // }}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: 360, height: 360 }}
          >
            <div className="text-center">
              <p className="text-red-600 mb-2">
                {t("landingPage.PrizesError") || "Failed to load prizes"}
              </p>
              {prizesError && (
                <p className="text-sm text-gray-500">{prizesError}</p>
              )}
            </div>
          </div>
        )}

        <motion.button
          className={`mt-4 px-8 py-0 rounded text-white cursor-pointer ${
            isValidated && !isLoadingPrizes
              ? "bg-[#2E4649] hover:bg-[#1e3d40]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSpinClick}
          disabled={mustSpin || isLoadingPrizes || data.length === 0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
        >
          {isLoadingPrizes
            ? t("landingPage.LoadingPrizes") || "Loading prizes..."
            : isValidated
            ? t("landingPage.spin")
            : t("landingPage.validateToSpin")}
        </motion.button>

        {!isValidated && (
          <motion.p
            className="text-sm text-gray-600 text-center"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {t("landingPage.pleaseValidate")}
          </motion.p>
        )}
      </div>
      <AnimatePresence>
        {showResult && (
          <>
            {/* Confetti overlay */}
            <div className="fixed inset-0 pointer-events-none z-[60]">
              <Confetti
                recycle={false}
                numberOfPieces={550}
                tweenDuration={5000}
              />
            </div>

            {/* Congrats modal */}
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-[#F4F5F4] rounded-2xl shadow-xl w-full max-w-md p-6 text-center"
              >
                <h3 className="text-2xl font-bold text-[#173235] mb-2">
                  {t("landingPage.congratulations")}
                </h3>
                <p className="text-[#173235]/80">
                  {t("landingPage.congratulationsMessage")}
                  <span className="font-semibold">
                    {data[prizeNumber]?.option}
                  </span>
                  !
                </p>
                <p className="text-[#173235]/80 font-bold my-2">
                  {t("landingPage.claimInstructions")}
                </p>
                <button
                  onClick={() => setShowResult(false)}
                  className="mt-6 w-full py-2 rounded-xl text-white bg-[#2E4649] hover:bg-[#1e3d40] cursor-pointer"
                >
                  {t("landingPage.close")}
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
