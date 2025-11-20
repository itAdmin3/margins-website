"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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
  const [showPopup, setShowPopup] = useState(false);
  const { i18n,  t } = useTranslation("");
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
  const [desiredPrizeIndex, setDesiredPrizeIndex] = useState(null);
  const [finalPrizeName , setFinalPrizeName] = useState("");
  const [alreadyWon, setAlreadyWon] = useState(false);
  const [justValidated, setJustValidated] = useState(false); 

// cookie helpers
const setCookie = (name, value, days = 30) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};
const getCookie = (name) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};
// const eraseCookie = (name) => {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
// };
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
    document.body.style.background = "#b7c1b9"; 
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
const validatePhoneByCountry = (countryCode, national, iso2) => {
  if (!countryCode || !national) return false;

  // Build an international (E.164) candidate
  const e164Candidate = `${countryCode}${national}`; 

  const phone = parsePhoneNumberFromString(e164Candidate);
  if (!phone) return false;

  // Ensures the number is valid overall and (optionally) for the selected region
  if (!phone.isValid()) return false;

  // If we know the 2-letter ISO (e.g. 'sa', 'eg'), ensure it matches
  if (iso2 && phone.country && phone.country !== iso2.toUpperCase()) return false;

  return true;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!userInfo.name.trim()) {
    showNotification("error", t("landingPage.validEmail"));
    return;
  }

  if (!validatePhoneByCountry(userInfo.countryCode, userInfo.phone, userInfo.iso2)) {
  showNotification("error", t("landingPage.validPhone")); // “Please enter a valid phone number”
  return;
}

  setIsSubmitting(true);

  try {
    const countryCode = userInfo.countryCode;
    const response = await fetch("/api/prizes-winners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        phone: userInfo.phone,
        country: countryCode || "+966",
      }),
    });

    if (response.ok) {
      const payload = await response.json();
      setCookie(
        "prizeValidation",
        JSON.stringify({
          name: userInfo.name,
          phone: userInfo.phone,
          country: countryCode || "+966",
        }),
        30
      );
      showNotification("success", t("landingPage.validSucc"));
      setIsValidated(true);
      setShowPopup(false);
      setUserInfo({ name: "", phone: "" });
      setJustValidated(true);
      // Extract prize name and set desired index by name
      const prizeName = payload?.data?.data?.prize?.name;
      setFinalPrizeName(prizeName);
      if (prizeName && Array.isArray(data)) {
        const index = data.findIndex(
          (p) => (p?.option || p?.name || "").toLowerCase() === prizeName.toLowerCase()
        );
        if (index !== -1) {
          setDesiredPrizeIndex(index);
          // Start spinning immediately after validation
          hasStoppedRef.current = false;
          setPrizeNumber(index);
          setMustSpin(true);
        }
      }
      const hasWon = !!payload?.data?.data?.already_won;
      setAlreadyWon(hasWon);
    } else {
      showNotification("error", t("landingPage.validFailed"));
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification("error", t("landingPage.validError"));
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
   if (alreadyWon && !justValidated) {
    setMustSpin(false);
    setShowResult(true); // just show the congrats modal
    return;
  }



  hasStoppedRef.current = false;
  setPrizeNumber(desiredPrizeIndex);
  setMustSpin(true);
  };

useEffect(() => {
  // wait until prizes are loaded so we can map prize name -> index reliably
  if (!mounted || isLoadingPrizes) return;

  const raw = getCookie("prizeValidation");
  if (!raw) return;

  let saved;
  try {
    saved = JSON.parse(decodeURIComponent(raw));
  } catch {
    return;
  }
  if (!saved?.name || !saved?.phone || !saved?.country) return;

  (async () => {
    try {
      const resp = await fetch("/api/prizes-winners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: saved.name,
          phone: saved.phone,
          country: saved.country,
        }),
      });
      const payload = await resp.json();
if (resp.ok) {
  setIsValidated(true);

  const prizeName = payload?.data?.data?.prize?.name;
  const hasWon = !!payload?.data?.data?.already_won;
  setFinalPrizeName(prizeName);

  if (prizeName && Array.isArray(data)) {
    const index = data.findIndex(
      (p) => (p?.option || p?.name || "").toLowerCase() === prizeName.toLowerCase()
    );
    if (index !== -1) {
      setDesiredPrizeIndex(index);

      if (hasWon) {
        // No spin needed: wheel renders at the correct slice via startingOptionIndex
        setShowResult(true); // show the congrats popup
      }
    }
  }
}
      if (resp.ok) {
        setIsValidated(true);
        const prizeName = payload?.data?.data?.prize?.name;
        const hasWon = !!payload?.data?.data?.already_won;
        setFinalPrizeName(prizeName);
        setAlreadyWon(hasWon);
        setJustValidated(false);
        if (prizeName && Array.isArray(data)) {
          const index = data.findIndex(
            (p) => (p?.option || p?.name || "").toLowerCase() === prizeName.toLowerCase()
          );
          if (index !== -1) setDesiredPrizeIndex(index);
        }

        // if (hasWon) {
        //   showNotification("success", t("landingPage.validSucc"));
        // }
      }
    } catch (err) {
      console.error("Error re-checking prize status:", err);
    }
  })();
}, [mounted, isLoadingPrizes, data]);
const startingIndex = useMemo(
  () =>
    alreadyWon && !justValidated &&
    typeof desiredPrizeIndex === "number" && desiredPrizeIndex >= 0
      ? desiredPrizeIndex
      : undefined,
  [alreadyWon, justValidated, desiredPrizeIndex]
);
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
                  className="min-h-fit h-auto text-white font-medium py-2 px-5 shadow-sm bg-[#2E4649] focus:ring-2 focus:ring-teal-400 cursor-pointer"
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
<div className="flex flex-col items-center gap-4 p-6 mt-[150px] mb-[90px] max:w-[100vw] overflow-hidden">
  {isLoadingPrizes ? (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width: 420, height: 420 }}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E4649]"></div>
      <p className="mt-4 text-gray-600">
        {/* {t("landingPage.LoadingPrizes") || "Loading prizes..."} */}
      </p>
    </div>
  ) : mounted && data.length > 0 ? (
    <div className="relative wheelover rotate-[133deg] pointer-events-none" dir="ltr">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        startingOptionIndex={startingIndex}
        onStopSpinning={() => {
          hasStoppedRef.current = true;
          setMustSpin(false);
          setAlreadyWon(true);   
          setJustValidated(false);
          setShowResult(true);
        }}
        backgroundColors={["#163235", "#b7c1b9"]}
        textColors={["#ffff", "#163235"]}
        fontSize={12}
        outerBorderColor="#163235"
        outerBorderWidth={8}
        innerRadius={8}
        innerBorderColor="#333"
        innerBorderWidth={5}
        radiusLineColor="rgba(255, 255, 255, 0.3)"
        radiusLineWidth={2}
        textDistance={55}
        spinDuration={0.6}
        pointerProps={{ style: { display: "none" } }}
        renderText={(option, index) => {
          const lines = option.split("\n");
          return lines.map((line, lineIndex) => (
            <tspan key={lineIndex} x="0" dy={lineIndex === 0 ? "0" : "1.2em"}>
              {line}
            </tspan>
          ));
        }}
      />
      <div className="wheelPointer pointer-events-none absolute z-9 inset-0 flex items-center justify-center rotate-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="380 245 40 70"
          width="80"
          height="80"
          style={{ transform: "rotate(-132deg)" }}

        >
          <g>
            <path
              d="M416.25,264.9l-16.26,41.63-16.21-41.5c4.44-.87,9.92-1.58,16.21-1.61,6.31-.03,11.81.64,16.26,1.47Z"
              fill="#fff"
            />
            <circle xmlns="http://www.w3.org/2000/svg" className="st6" cx="399.99" cy="263.43" r="16.26" fill="#b7c1b9"/>
            <circle cx="399.99" cy="263.43" r="2.96" fill="#163235" />
          </g>
        </svg>
        
      </div>
    </div>
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
    className={`mt-4 px-8 py-0 rounded text-white cursor-pointer p-8 flex justify-center items-center text-xl ${
      isValidated && !isLoadingPrizes && !alreadyWon
        ? "bg-[#2E4649] hover:bg-[#1e3d40]"
        : "bg-[#2E4649] cursor-not-allowed"
    }`}
    onClick={handleSpinClick}
    disabled={mustSpin || isLoadingPrizes || data.length === 0 }
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
  {alreadyWon && finalPrizeName && (
    <p className="text-sm text-[#173235] text-center mt-2">
      {t("landingPage.congratulations")} {t("landingPage.congratulationsMessage")}
      <span className="font-semibold"> {finalPrizeName}</span>!
      <br/>
      <span className="text-[#173235]/80 font-bold my-2">
        {t("landingPage.claimInstructions")}
      </span>
    </p>
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
                      {finalPrizeName}
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
