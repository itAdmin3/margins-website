"use client";

import Header from "../components/header";
import React, { useEffect, useState } from "react";
import { useMetadata } from "../utils/metadataProvider";
import styles from "../styles/pages/Payment.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Script from "next/script";

export default function Payment() {
  const { setMetadata } = useMetadata();

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const [salesmanName, setSalesmanName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentReason, setPaymentReason] = useState("");

  const { t } = useTranslation("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    setMetadata({
      title: "Online Payment | Margins Developments",
      description: "Welcome to the home page of my awesome Next.js application!",
    });
  }, [setMetadata]);

  if (!isClient) return null;

  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];

  const reference = Date.now() + Math.floor(Math.random() * 9999) + 99;

  const formatNumberWithCommas = (number) => {
    if (!number) return "0";
    return parseFloat(number).toLocaleString("en-US");
  };

  const pay = (e) => {
    e.preventDefault();
    SimplifyCommerce.hostedPayments(
      function (response) {
        console.log(response);
        if (response && response.data && response.data.paymentStatus == "APPROVED") {
          // console.log("Payment Success");

          setLoading(true);

          fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerName,
              customerPhone,
              paymentAmount: parseFloat(paymentAmount / 100),
              reference: new String(reference),
              reason: paymentReason,
              salesmanName,
            }),
          })
            .then((response) => {
              if (response.ok) {
                setLoading(false);
                setResponseMsg("Thank you, Payment received.");
                alert("Thank you, Payment received.");
                window.location.href = "/";
                e.target.reset();
              } else {
                setLoading(false);
                setResponseMsg("Failed to process payment. Please try later.");
              }
            })
            .catch((error) => {
              setLoading(false);
              setResponseMsg("Failed to process payment. Please try later.");
            });
        } else if (response[0].error.message) {
          // console.log("Payment Failure");
          // console.log(response[0].error.message);

          alert("Sorry, Payment failed.");
        }
      },
      {
        scKey: "lvpb_OTk5YTFmZjktZDFhOC00MTA1LWI3NjQtZmJlNTI3ZGI1N2Qz",
        color: "#0798a7",
        amount: paymentAmount * 100,
        name: customerName,
        description: `Sales name: ${salesmanName}, Customer phone: ${customerPhone}`,
        reference,
        customerName: customerName,
      }
    ).closeOnCompletion();

    document.querySelector("#handlerButton").click();

    return false;
  };

  return (
    <>
      <div className="background-primary p-10">
        <main className={styles.wrapper}>
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white shadow-md w-full max-w-[1360px] px-16 py-10 grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
              {/* Left Form Section */}
              <div>
                <Link href="/" className={`${styles.logo} mr-4`}>
                  <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 709 178" width="100%" fill="#8aa6a8">
                    <path
                      id="Path 19"
                      fillRule="evenodd"
                      d="m38.2 152.5c0 18.3-14.4 21.6-19.3 22.1-3.9 0.4-11 0.3-13.8 0.3h-5.1c0-3.7 0.2-36.5 0-43.1h10.7c3.6 0 7 0.1 9.4 0.4 5.8 0.7 18.1 6.2 18.1 20.3zm-5 2c0.3-8.9-5.5-17.9-14.8-19.9-3.5-0.9-10.8-0.7-13.5-0.7v38.5c1.3 0.5 12.1 1.1 16.5-0.7 4-1.6 11.4-5.2 11.8-17.2zm61.3 18.3l-0.9 2.1h-24.7v-43.1h21.6l0.9 2.1c-3.1-0.5-17.8-0.3-17.8-0.3 0 0 0 18.7 0 18.6 3.3 0 11.3 0.1 15.1-0.3l-0.1 2.3c-3.7-0.3-8.9-0.3-15-0.2v19.2c0 0 17.6 0.1 20.9-0.4zm61.4-41h1.9l-18.2 43.7h-0.6c0 0-1-2.8-1.7-4.5-5.6-13.9-13.5-33.1-16-39.2h5.3c4.1 11.6 14.3 36.1 14.3 36.1v0.9zm57.4 41l-0.9 2.1h-24.7v-43.1h21.6l0.9 2c-3.1-0.4-17.8-0.3-17.8-0.3 0 0 0.1 18.8 0.1 18.7 3.2 0 11.2 0.1 15-0.4l-0.1 2.4c-3.7-0.3-8.9-0.4-15-0.2v19.1c0 0 17.6 0.2 20.9-0.3zm55.7 0l-0.8 2.1h-25c0-3.8 0.2-36.5 0-43.1h4.9v41.3c0 0 17.7 0.2 20.9-0.3zm71-19.2c0 13.9-9.9 21.9-22.7 21.9-12.9 0-23.1-7.5-23.1-21.5 0-12.2 9.1-22.7 23-22.7 13.9 0 22.8 10.2 22.8 22.3zm-5.4 0c0-9.8-5.3-20.3-17.4-20.3-12.1 0-17.5 10.9-17.5 20.7 0 11.4 7.6 19.6 17.5 19.7 9.9 0.1 17.4-8.7 17.4-20.1zm59.3-10.4c0 6.4-6.1 12.9-17.4 11.1l0.3-0.5c8.7 0 12.5-4.3 12.5-10.2 0-5.3-4.1-10.7-14.1-10l-0.4 0.4v40.9h-4.8c0-3.8 0.1-36.5 0-43.1h9.3c10 0 14.6 5.7 14.6 11.4zm71.3-11.4c1.3 12.5 3.6 35.8 4.4 43.1h-4.8c-1.1-12.4-3.5-37.4-3.5-37.4l0.1-0.7-15.7 39.1h-0.6l-15.5-38.3-0.2-1.3-4.5 38.6-1.9-0.1 4.9-40-0.2-3h4.7c0 0 1 2.5 1.7 4.4 5.4 14 10.2 25.1 12.7 31.1 0.1 0.2 0.1 0.9 0.1 1.1l14.7-36.6zm62.2 41l-0.8 2.1h-24.8v-43.1h21.7l0.8 2c-3-0.4-17.8-0.3-17.8-0.3 0 0 0.1 18.8 0.1 18.7 3.3 0 11.3 0.1 15.1-0.4l-0.1 2.4c-3.7-0.3-8.9-0.4-15.1-0.2v19.1c0 0 17.7 0.2 20.9-0.3zm64.1 2.9c-4.6-5-32.1-38.2-32.1-38.2l0.4 1.4v36h-2.1c0-3.4 0.1-30.5 0-39.8l-0.3-3.3h2.7c2.7 3.5 28.9 34.4 28.9 34.4l0.5 1.2c0-3.9-0.1-29-0.1-35.6h2c0 12.3-0.3 31.6 0.1 43.9zm28.9-43.9h35.4v1.7h-15.9c0 12.3-0.1 29.1-0.1 41.4h-4.8v-41.4h-15.1zm85.1 31.3c0 7.8-6.2 12.4-13.1 12.4-5.4 0-9.1-1.6-12.5-4.4l1.4-4.2c3 5.7 7.1 6.6 11 6.6 5.2 0 9.3-3.2 9.3-8.1 0-12.3-20.3-8.9-20.3-23.3 0-7.1 6.4-10.7 11.9-10.7 3.5 0 7.6 1.1 9.8 3.1l-1.6 3.6c-2.4-4.4-5.6-4.8-8.3-4.8-4.1 0-8.1 2-8.1 6.8 0 12.3 20.5 8.7 20.5 23zm-404.1-60.8h-15.7l-29.5-53.4h14c10 0 18.2-8.2 18.2-18.2 0-10-8.2-18.2-18.2-18.2h-28.8v89.8h-13.6v-102h42.4c16.7 0 30.3 13.7 30.3 30.4 0 14-9.9 26.3-23.4 29.5zm81.8 0c-30.9 0-53.3-21.5-53.3-51 0-29.5 22.1-51 52.5-51 15.1 0 27.4 4.5 35.5 13l1.1 1.1-9.4 9.1-1.1-1.1c-6.4-6.6-15-9.8-26.1-9.8-22.3 0-38.4 16.3-38.4 38.7 0 22.4 16.5 38.7 39.2 38.7 13.9 0 22.7-4.3 27.7-8.1l0.4-15.8h-24.3l9.2-12.5h27.7v2.3 32.1l-0.5 0.5c-4.3 4.1-16.9 13.8-40.2 13.8zm207.4-101.9h12.8v102.4h-4l-59.5-69.9c-1-1.2-2.1-2.7-3.1-4.1v73.8h-13v-0.8h-0.1v-88-12.9-0.8h4.4l1 1.3 58.1 67.9c1.1 1.3 2.4 3 3.6 4.6-0.1-1.9-0.2-4-0.2-5.6zm84.2 102.1c-21 0-31.1-11.2-35.9-20.5l-0.6-1.4 11.4-5.9 0.7 1.3c4.1 7.1 10.1 14.3 24.1 14.3 11.3 0 18.9-6 18.9-15 0-8.3-4.5-13-17.7-18.8l-7.8-3.6c-18.9-8.3-22.7-17.2-22.7-27.8 0-14.4 11.6-24.8 27.5-24.8 12.5 0 21.9 5.2 28.1 15.3l0.8 1.3-11.1 6.7-0.8-1.3c-4.3-6.8-9.5-9.8-17-9.8-8.7 0-14.1 4.7-14.1 12.3 0 7.2 3.3 10.8 14.8 15.9l7.8 3.6c18.4 7.9 25.8 16.9 25.8 31 0 16.3-12.9 27.2-32.2 27.2zm-486.7-0.6c-5.3-13.1-10.7-26.3-15.9-39-4.7-11.4-9.5-23.2-14.3-35-0.7 2.4-1.5 5-2.4 7l-27.5 68h-14.8l38.1-91.3 4-11.2h5.1l42.1 102.5h-14zm-117.6-68.9l-26.9 31.9-27-31.9c-1-1.3-2.3-2.9-3.4-4.4 0.1 1.8 0.3 3.8 0.3 5.5v68.2h-13.1v-88.4l0.2-13.5h4.7l38.3 45.2 38.2-45.2h4.9v101.9h-13v-68.2c0-1.7 0.1-3.7 0.3-5.5-1.1 1.5-2.4 3.1-3.5 4.4zm394.6-23.4l13-9.2v101.9h-13z"
                    ></path>
                  </svg>
                </Link>
                <form onSubmit={pay}>
                  <div className="flex flex-col justify-between">
                    <div className="mt-14">
                      {/* Customer Name */}
                      <div className="mb-14 grid lg:grid-flow-col lg:grid-cols-[40%_60%] md:grid-flow-row">
                        <div>
                          <h3>Customer Name</h3>
                          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                            Enter Full Customer Name
                          </label>
                        </div>
                        <input type="text" id="customerName" placeholder="Enter Full Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border border-gray-300 p-2 focus:outline-hidden focus:border-teal-800 text-black" required maxLength={30} />
                      </div>

                      {/* Customer Phone */}
                      <div className="mb-14 grid lg:grid-flow-col lg:grid-cols-[40%_60%] md:grid-flow-row">
                        <div>
                          <h3>Customer Phone</h3>
                          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">
                            Phone number with Country code
                          </label>
                        </div>

                        <input
                          type="tel"
                          id="customerPhone"
                          placeholder="Phone number with Country code"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="mt-1 w-full border border-gray-300 p-2 focus:outline-hidden focus:border-teal-800 text-black"
                          required
                          maxLength={15}
                        />
                      </div>

                      {/* Payment Amount */}
                      <div className="mb-14 grid lg:grid-flow-col lg:grid-cols-[40%_60%] md:grid-flow-row">
                        <div>
                          <h3>Payment Amount</h3>
                          <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
                            In Egyptian pounds
                          </label>
                        </div>
                        <input type="number" id="paymentAmount" placeholder="In Egyptian pounds" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="mt-1 w-full border border-gray-300 p-2 focus:outline-hidden focus:border-teal-800 text-black" required min={0} />
                      </div>

                      {/* Reason for Payment */}
                      <div className="mb-14 grid lg:grid-flow-col lg:grid-cols-[40%_60%] md:grid-flow-row">
                        <div>
                          <h3>Reason for Payment</h3>
                          <label htmlFor="reasonForPayment" className="block text-sm font-medium text-gray-700">
                            Enter Full Customer Name
                          </label>
                        </div>
                        <input type="text" id="reasonForPayment" placeholder="Enter reason for payment" value={paymentReason} onChange={(e) => setPaymentReason(e.target.value)} className="mt-1 w-full border border-gray-300 p-2 focus:outline-hidden focus:border-teal-800 text-black" required />
                      </div>

                      {/* Salesman Name */}
                      <div className="mb-14 grid lg:grid-flow-col lg:grid-cols-[40%_60%] md:grid-flow-row">
                        <div>
                          <h3>Salesman Name</h3>
                          <label htmlFor="salesmanName" className="block text-sm font-medium text-gray-700">
                            Your sales name
                          </label>
                        </div>

                        <input type="text" id="salesmanName" placeholder="Your sales name" value={salesmanName} onChange={(e) => setSalesmanName(e.target.value)} className="mt-1 w-full border border-gray-300 p-2 focus:outline-hidden focus:border-teal-800 text-black" required />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <a href="" className="w-[45px] h-[45px] flex justify-center p-1 border-gray-300 transition-all duration-500 bg-green-700 hover:bg-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 71 72" fill="none">
                          <path
                            d="M12.5068 56.8405L15.7915 44.6381C13.1425 39.8847 12.3009 34.3378 13.4211 29.0154C14.5413 23.693 17.5482 18.952 21.89 15.6624C26.2319 12.3729 31.6173 10.7554 37.0583 11.1068C42.4992 11.4582 47.6306 13.755 51.5108 17.5756C55.3911 21.3962 57.7599 26.4844 58.1826 31.9065C58.6053 37.3286 57.0535 42.7208 53.812 47.0938C50.5705 51.4668 45.8568 54.5271 40.5357 55.7133C35.2146 56.8994 29.6432 56.1318 24.8438 53.5513L12.5068 56.8405ZM25.4386 48.985L26.2016 49.4365C29.6779 51.4918 33.7382 52.3423 37.7498 51.8555C41.7613 51.3687 45.4987 49.5719 48.3796 46.7452C51.2605 43.9185 53.123 40.2206 53.6769 36.2279C54.2308 32.2351 53.445 28.1717 51.4419 24.6709C49.4388 21.1701 46.331 18.4285 42.6027 16.8734C38.8745 15.3184 34.7352 15.0372 30.8299 16.0736C26.9247 17.11 23.4729 19.4059 21.0124 22.6035C18.5519 25.801 17.2209 29.7206 17.2269 33.7514C17.2237 37.0937 18.1503 40.3712 19.9038 43.2192L20.3823 44.0061L18.546 50.8167L25.4386 48.985Z"
                            fill="#ffffff"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M43.9566 36.8847C43.5093 36.5249 42.9856 36.2716 42.4254 36.1442C41.8651 36.0168 41.2831 36.0186 40.7236 36.1495C39.8831 36.4977 39.3399 37.8134 38.7968 38.4713C38.6823 38.629 38.514 38.7396 38.3235 38.7823C38.133 38.8251 37.9335 38.797 37.7623 38.7034C34.6849 37.5012 32.1055 35.2965 30.4429 32.4475C30.3011 32.2697 30.2339 32.044 30.2557 31.8178C30.2774 31.5916 30.3862 31.3827 30.5593 31.235C31.165 30.6368 31.6098 29.8959 31.8524 29.0809C31.9063 28.1818 31.6998 27.2863 31.2576 26.5011C30.9157 25.4002 30.265 24.42 29.3825 23.6762C28.9273 23.472 28.4225 23.4036 27.9292 23.4791C27.4359 23.5546 26.975 23.7709 26.6021 24.1019C25.9548 24.6589 25.4411 25.3537 25.0987 26.135C24.7562 26.9163 24.5939 27.7643 24.6236 28.6165C24.6256 29.0951 24.6864 29.5716 24.8046 30.0354C25.1049 31.1497 25.5667 32.2144 26.1754 33.1956C26.6145 33.9473 27.0937 34.6749 27.6108 35.3755C29.2914 37.6767 31.4038 39.6305 33.831 41.1284C35.049 41.8897 36.3507 42.5086 37.7105 42.973C39.1231 43.6117 40.6827 43.8568 42.2237 43.6824C43.1018 43.5499 43.9337 43.2041 44.6462 42.6755C45.3588 42.1469 45.9302 41.4518 46.3102 40.6512C46.5334 40.1675 46.6012 39.6269 46.5042 39.1033C46.2714 38.0327 44.836 37.4007 43.9566 36.8847Z"
                            fill="#ffffff"
                          />
                        </svg>
                      </a>
                      {/* Proceed Button */}
                      <div className="flex items-center gap-4">
                        <button type="submit" disabled={loading} className={`${styles["proceed-payment-btn"]}`}>
                          <i className="fab fa-whatsapp mr-2"></i> Proceed to payment
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[20px] ml-2 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-10">
                      <Link href="/" className={`${styles["back-to-website-link"]} flex`}>
                        Back to website
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[15px] ml-2 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </form>
                {responseMsg && <p className="text-center text-red-500 mt-2">{responseMsg}</p>}
              </div>

              {/* Right Card Section */}
              <div className="flex flex-col items-center rounded-lg">
                <div className="bg-white w-full max-w-sm rounded-lg overflow-hidden relative">
                  <Image src="/images/common/payment.jpg" alt="payment.jpg" className="w-full" width={535} height={525} />
                  <div className="p-10 absolute bottom-0 left-0 right-0">
                    <div className="mb-36">
                      <div className="grid grid-flow-row gap-2 p-10">
                        <h3 className="text-lg font-bold text-gray-700 flex-1 break-all">{customerName || ".."}</h3>
                        <p className="text-sm text-gray-500 break-all">{customerPhone || "****************"}</p>
                      </div>
                    </div>
                    <div className="mb-20">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-700 flex-1">Sales Name</h3>
                        <p className="text-lg text-gray-500 break-all">{salesmanName || "..."}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-700 mt-4 flex-1">Date</h3>
                        <p className="text-lg text-gray-500 mt-4">{currentDate}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4">
                      <h3 className="text-lg font-bold text-gray-700">You have to Pay</h3>
                      <p className="text-3xl font-bold text-teal-800 break-all">{formatNumberWithCommas(paymentAmount) || "0"} EGP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full max-w-[1360px] gap-8 mt-5">
              <Link href="/contact" className="text-white">
                <p className="uppercase tracking-[13px]">Need Help?</p>
                <h2 className="flex items-center uppercase">
                  Contact Us Now
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[20px] ml-2 mr-2 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </h2>
              </Link>
              <Link href="/" className={`${styles.logo} mr-4`}>
                <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 709 178" width="100%" fill="#ffffff">
                  <path
                    id="Path 19"
                    fillRule="evenodd"
                    d="m38.2 152.5c0 18.3-14.4 21.6-19.3 22.1-3.9 0.4-11 0.3-13.8 0.3h-5.1c0-3.7 0.2-36.5 0-43.1h10.7c3.6 0 7 0.1 9.4 0.4 5.8 0.7 18.1 6.2 18.1 20.3zm-5 2c0.3-8.9-5.5-17.9-14.8-19.9-3.5-0.9-10.8-0.7-13.5-0.7v38.5c1.3 0.5 12.1 1.1 16.5-0.7 4-1.6 11.4-5.2 11.8-17.2zm61.3 18.3l-0.9 2.1h-24.7v-43.1h21.6l0.9 2.1c-3.1-0.5-17.8-0.3-17.8-0.3 0 0 0 18.7 0 18.6 3.3 0 11.3 0.1 15.1-0.3l-0.1 2.3c-3.7-0.3-8.9-0.3-15-0.2v19.2c0 0 17.6 0.1 20.9-0.4zm61.4-41h1.9l-18.2 43.7h-0.6c0 0-1-2.8-1.7-4.5-5.6-13.9-13.5-33.1-16-39.2h5.3c4.1 11.6 14.3 36.1 14.3 36.1v0.9zm57.4 41l-0.9 2.1h-24.7v-43.1h21.6l0.9 2c-3.1-0.4-17.8-0.3-17.8-0.3 0 0 0.1 18.8 0.1 18.7 3.2 0 11.2 0.1 15-0.4l-0.1 2.4c-3.7-0.3-8.9-0.4-15-0.2v19.1c0 0 17.6 0.2 20.9-0.3zm55.7 0l-0.8 2.1h-25c0-3.8 0.2-36.5 0-43.1h4.9v41.3c0 0 17.7 0.2 20.9-0.3zm71-19.2c0 13.9-9.9 21.9-22.7 21.9-12.9 0-23.1-7.5-23.1-21.5 0-12.2 9.1-22.7 23-22.7 13.9 0 22.8 10.2 22.8 22.3zm-5.4 0c0-9.8-5.3-20.3-17.4-20.3-12.1 0-17.5 10.9-17.5 20.7 0 11.4 7.6 19.6 17.5 19.7 9.9 0.1 17.4-8.7 17.4-20.1zm59.3-10.4c0 6.4-6.1 12.9-17.4 11.1l0.3-0.5c8.7 0 12.5-4.3 12.5-10.2 0-5.3-4.1-10.7-14.1-10l-0.4 0.4v40.9h-4.8c0-3.8 0.1-36.5 0-43.1h9.3c10 0 14.6 5.7 14.6 11.4zm71.3-11.4c1.3 12.5 3.6 35.8 4.4 43.1h-4.8c-1.1-12.4-3.5-37.4-3.5-37.4l0.1-0.7-15.7 39.1h-0.6l-15.5-38.3-0.2-1.3-4.5 38.6-1.9-0.1 4.9-40-0.2-3h4.7c0 0 1 2.5 1.7 4.4 5.4 14 10.2 25.1 12.7 31.1 0.1 0.2 0.1 0.9 0.1 1.1l14.7-36.6zm62.2 41l-0.8 2.1h-24.8v-43.1h21.7l0.8 2c-3-0.4-17.8-0.3-17.8-0.3 0 0 0.1 18.8 0.1 18.7 3.3 0 11.3 0.1 15.1-0.4l-0.1 2.4c-3.7-0.3-8.9-0.4-15.1-0.2v19.1c0 0 17.7 0.2 20.9-0.3zm64.1 2.9c-4.6-5-32.1-38.2-32.1-38.2l0.4 1.4v36h-2.1c0-3.4 0.1-30.5 0-39.8l-0.3-3.3h2.7c2.7 3.5 28.9 34.4 28.9 34.4l0.5 1.2c0-3.9-0.1-29-0.1-35.6h2c0 12.3-0.3 31.6 0.1 43.9zm28.9-43.9h35.4v1.7h-15.9c0 12.3-0.1 29.1-0.1 41.4h-4.8v-41.4h-15.1zm85.1 31.3c0 7.8-6.2 12.4-13.1 12.4-5.4 0-9.1-1.6-12.5-4.4l1.4-4.2c3 5.7 7.1 6.6 11 6.6 5.2 0 9.3-3.2 9.3-8.1 0-12.3-20.3-8.9-20.3-23.3 0-7.1 6.4-10.7 11.9-10.7 3.5 0 7.6 1.1 9.8 3.1l-1.6 3.6c-2.4-4.4-5.6-4.8-8.3-4.8-4.1 0-8.1 2-8.1 6.8 0 12.3 20.5 8.7 20.5 23zm-404.1-60.8h-15.7l-29.5-53.4h14c10 0 18.2-8.2 18.2-18.2 0-10-8.2-18.2-18.2-18.2h-28.8v89.8h-13.6v-102h42.4c16.7 0 30.3 13.7 30.3 30.4 0 14-9.9 26.3-23.4 29.5zm81.8 0c-30.9 0-53.3-21.5-53.3-51 0-29.5 22.1-51 52.5-51 15.1 0 27.4 4.5 35.5 13l1.1 1.1-9.4 9.1-1.1-1.1c-6.4-6.6-15-9.8-26.1-9.8-22.3 0-38.4 16.3-38.4 38.7 0 22.4 16.5 38.7 39.2 38.7 13.9 0 22.7-4.3 27.7-8.1l0.4-15.8h-24.3l9.2-12.5h27.7v2.3 32.1l-0.5 0.5c-4.3 4.1-16.9 13.8-40.2 13.8zm207.4-101.9h12.8v102.4h-4l-59.5-69.9c-1-1.2-2.1-2.7-3.1-4.1v73.8h-13v-0.8h-0.1v-88-12.9-0.8h4.4l1 1.3 58.1 67.9c1.1 1.3 2.4 3 3.6 4.6-0.1-1.9-0.2-4-0.2-5.6zm84.2 102.1c-21 0-31.1-11.2-35.9-20.5l-0.6-1.4 11.4-5.9 0.7 1.3c4.1 7.1 10.1 14.3 24.1 14.3 11.3 0 18.9-6 18.9-15 0-8.3-4.5-13-17.7-18.8l-7.8-3.6c-18.9-8.3-22.7-17.2-22.7-27.8 0-14.4 11.6-24.8 27.5-24.8 12.5 0 21.9 5.2 28.1 15.3l0.8 1.3-11.1 6.7-0.8-1.3c-4.3-6.8-9.5-9.8-17-9.8-8.7 0-14.1 4.7-14.1 12.3 0 7.2 3.3 10.8 14.8 15.9l7.8 3.6c18.4 7.9 25.8 16.9 25.8 31 0 16.3-12.9 27.2-32.2 27.2zm-486.7-0.6c-5.3-13.1-10.7-26.3-15.9-39-4.7-11.4-9.5-23.2-14.3-35-0.7 2.4-1.5 5-2.4 7l-27.5 68h-14.8l38.1-91.3 4-11.2h5.1l42.1 102.5h-14zm-117.6-68.9l-26.9 31.9-27-31.9c-1-1.3-2.3-2.9-3.4-4.4 0.1 1.8 0.3 3.8 0.3 5.5v68.2h-13.1v-88.4l0.2-13.5h4.7l38.3 45.2 38.2-45.2h4.9v101.9h-13v-68.2c0-1.7 0.1-3.7 0.3-5.5-1.1 1.5-2.4 3.1-3.5 4.4zm394.6-23.4l13-9.2v101.9h-13z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Script src="https://www.simplify.com/commerce/simplify.pay.js" strategy="lazyOnload" onLoad={() => console.log("SimplifyCommerce loaded correctly")} />

      <button id="handlerButton" data-sc-key="lvpb_OTk5YTFmZjktZDFhOC00MTA1LWI3NjQtZmJlNTI3ZGI1N2Qz" data-amount="500000" data-color="#0798a7" style={{ width: 0, padding: "0 !important", opacity: 0 }}></button>
    </>
  );
}
