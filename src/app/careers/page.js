"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Header from "../components/header";
import Footer from "../components/footer";
import { useMetadata } from "../utils/metadataProvider";
import SocialLinks from "../../app/components/socialLinks";

export default function Careers() {
  const { setMetadata } = useMetadata();
  const { t } = useTranslation("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    setMetadata({
      title: "Careers | Margins Developments",
      description:
        "Welcome to the home page of my awesome Next.js application!",
    });
  }, [setMetadata]);

  if (!isClient) return null;

  return (
    <div>
      <Header headerColor="#8aa6a8" />
      <main className="mt-[50px]">
        <div className="grid lg:grid-flow-col lg:grid-cols-2 gap-4 md:grid-flow-row">
          <Image
            src="/images/common/careers.jpg"
            alt="careers.jpg"
            className="h-full object-cover w-full"
            width={535}
            height={525}
          />
          <div className="w-full p-7 lg:p-14 lg:pt-[45px]">
            <div className="max-w-[600px]">
              <h1 className="lg:mt-[140px]">{t("careers.title")}</h1>
              <p className="mt-4 mb-4 text-black text-[16px]">
                {t("careers.subTitle")}
              </p>
              <div>
                <form className="mt-10">
                  {/* Your Name */}
                  <div className="mb-4">
                    <input
                      type="text"
                      id="name"
                      className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                      placeholder="Your name*"
                      required
                    />
                  </div>

                  {/* Country and Phone */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="col-span-1">
                      <select
                        id="country"
                        className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800 text-black"
                        placeholder="Country"
                        defaultValue="20"
                      >
                          <option data-countrycode="" value="">
                            country key*
                          </option>
                          <option
                            data-countrycode="EG"
                            value="20"
                          >
                            Egypt - مصر
                          </option>
                          <optgroup label="Arab">
                            <option data-countrycode="DZ" value="213">
                              Algeria - الجزائر
                            </option>
                            <option data-countrycode="BH" value="973">
                              Bahrain - البحرين
                            </option>
                            <option data-countrycode="IQ" value="964">
                              Iraq - العراق
                            </option>
                            <option data-countrycode="JO" value="962">
                              Jordan - الأردن
                            </option>
                            <option data-countrycode="KW" value="965">
                              Kuwait - الكويت
                            </option>
                            <option data-countrycode="LY" value="218">
                              Libya - ليبيا
                            </option>
                            <option data-countrycode="MA" value="212">
                              Morocco - المغرب
                            </option>
                            <option data-countrycode="OM" value="968">
                              Oman - عمان
                            </option>
                            <option data-countrycode="QA" value="974">
                              Qatar - قطر
                            </option>
                            <option data-countrycode="TN" value="216">
                              Tunisia - تونس
                            </option>
                            <option data-countrycode="SA" value="966">
                              Saudi Arabia - السعودية
                            </option>
                            <option data-countrycode="SD" value="249">
                              Sudan - السودان
                            </option>
                            <option data-countrycode="SI" value="963">
                              Syria - سوريا
                            </option>
                            <option data-countrycode="AE" value="971">
                              United Arab Emirates - الإمارات العربية
                            </option>
                            <option data-countrycode="YE" value="969">
                              Yemen +969 - اليمن
                            </option>
                            <option data-countrycode="YE" value="967">
                              Yemen +967 - اليمن
                            </option>
                            <option data-countrycode="LB" value="961">
                              Lebanon - لبنان
                            </option>
                          </optgroup>
                          <optgroup label="Countries">
                            <option data-countrycode="DE" value="49">
                              Germany
                            </option>
                            <option data-countrycode="GB" value="44">
                              UK
                            </option>
                            <option data-countrycode="US" value="1">
                              USA
                            </option>
                            <option data-countrycode="CA" value="1">
                              Canada
                            </option>
                            <option data-countrycode="IT" value="39">
                              Italy
                            </option>
                            <option data-countrycode="TR" value="90">
                              Turkey
                            </option>
                          </optgroup>
                          <optgroup label="Other countries">
                            <option data-countrycode="AO" value="244">
                              Angola
                            </option>
                            <option data-countrycode="AR" value="54">
                              Argentina
                            </option>
                            <option data-countrycode="AU" value="61">
                              Australia
                            </option>
                            <option data-countrycode="AZ" value="994">
                              Azerbaijan
                            </option>
                            <option data-countrycode="BS" value="1242">
                              Bahamas
                            </option>
                            <option data-countrycode="BE" value="32">
                              Belgium
                            </option>
                            <option data-countrycode="BA" value="387">
                              Bosnia Herzegovina
                            </option>
                            <option data-countrycode="BR" value="55">
                              Brazil
                            </option>
                            <option data-countrycode="BG" value="359">
                              Bulgaria
                            </option>
                            <option data-countrycode="BF" value="226">
                              Burkina Faso
                            </option>
                            <option data-countrycode="CM" value="237">
                              Cameroon
                            </option>
                            <option data-countrycode="CA" value="1">
                              Canada
                            </option>
                            <option data-countrycode="CN" value="86">
                              China
                            </option>
                            <option data-countrycode="HR" value="385">
                              Croatia
                            </option>
                            <option data-countrycode="DK" value="45">
                              Denmark
                            </option>
                            <option data-countrycode="EC" value="593">
                              Ecuador
                            </option>
                            <option data-countrycode="ET" value="251">
                              Ethiopia
                            </option>
                            <option data-countrycode="FI" value="358">
                              Finland
                            </option>
                            <option data-countrycode="FR" value="33">
                              France
                            </option>
                            <option data-countrycode="GE" value="7880">
                              Georgia
                            </option>
                            <option data-countrycode="GR" value="30">
                              Greece
                            </option>
                            <option data-countrycode="GL" value="299">
                              Greenland
                            </option>
                            <option data-countrycode="HK" value="852">
                              Hong Kong
                            </option>
                            <option data-countrycode="HU" value="36">
                              Hungary
                            </option>
                            <option data-countrycode="IS" value="354">
                              Iceland
                            </option>
                            <option data-countrycode="IN" value="91">
                              India
                            </option>
                            <option data-countrycode="ID" value="62">
                              Indonesia
                            </option>
                            <option data-countrycode="IR" value="98">
                              Iran
                            </option>
                            <option data-countrycode="IE" value="353">
                              Ireland
                            </option>
                            <option data-countrycode="JP" value="81">
                              Japan
                            </option>
                            <option data-countrycode="KZ" value="7">
                              Kazakhstan
                            </option>
                            <option data-countrycode="KE" value="254">
                              Kenya
                            </option>
                            <option data-countrycode="KI" value="686">
                              Kiribati
                            </option>
                            <option data-countrycode="KR" value="82">
                              Korea South
                            </option>
                            <option data-countrycode="LU" value="352">
                              Luxembourg
                            </option>
                            <option data-countrycode="MY" value="60">
                              Malaysia
                            </option>
                            <option data-countrycode="MV" value="960">
                              Maldives
                            </option>
                            <option data-countrycode="ML" value="223">
                              Mali
                            </option>
                            <option data-countrycode="MR" value="222">
                              Mauritania
                            </option>
                            <option data-countrycode="MX" value="52">
                              Mexico
                            </option>
                            <option data-countrycode="MN" value="95">
                              Myanmar
                            </option>
                            <option data-countrycode="NL" value="31">
                              Netherlands
                            </option>
                            <option data-countrycode="NZ" value="64">
                              New Zealand
                            </option>
                            <option data-countrycode="NI" value="505">
                              Nicaragua
                            </option>
                            <option data-countrycode="NE" value="227">
                              Niger
                            </option>
                            <option data-countrycode="NG" value="234">
                              Nigeria
                            </option>
                            <option data-countrycode="NO" value="47">
                              Norway
                            </option>
                            <option data-countrycode="PA" value="507">
                              Panama
                            </option>
                            <option data-countrycode="PY" value="595">
                              Paraguay
                            </option>
                            <option data-countrycode="PH" value="63">
                              Philippines
                            </option>
                            <option data-countrycode="PL" value="48">
                              Poland
                            </option>
                            <option data-countrycode="PT" value="351">
                              Portugal
                            </option>
                            <option data-countrycode="RE" value="262">
                              Reunion
                            </option>
                            <option data-countrycode="RO" value="40">
                              Romania
                            </option>
                            <option data-countrycode="RU" value="7">
                              Russia
                            </option>
                            <option data-countrycode="RW" value="250">
                              Rwanda
                            </option>
                            <option data-countrycode="CS" value="381">
                              Serbia
                            </option>
                            <option data-countrycode="SC" value="248">
                              Seychelles
                            </option>
                            <option data-countrycode="SG" value="65">
                              Singapore
                            </option>
                            <option data-countrycode="SK" value="421">
                              Slovak Republic
                            </option>
                            <option data-countrycode="SI" value="386">
                              Slovenia
                            </option>
                            <option data-countrycode="SB" value="677">
                              Solomon Islands
                            </option>
                            <option data-countrycode="SO" value="252">
                              Somalia
                            </option>
                            <option data-countrycode="ZA" value="27">
                              South Africa
                            </option>
                            <option data-countrycode="ES" value="34">
                              Spain
                            </option>
                            <option data-countrycode="LK" value="94">
                              Sri Lanka
                            </option>
                            <option data-countrycode="SH" value="290">
                              St. Helena
                            </option>
                            <option data-countrycode="KN" value="1869">
                              St. Kitts
                            </option>
                            <option data-countrycode="SC" value="1758">
                              St. Lucia
                            </option>
                            <option data-countrycode="SR" value="597">
                              Suriname
                            </option>
                            <option data-countrycode="SZ" value="268">
                              Swaziland
                            </option>
                            <option data-countrycode="SE" value="46">
                              Sweden
                            </option>
                            <option data-countrycode="CH" value="41">
                              Switzerland
                            </option>
                            <option data-countrycode="TW" value="886">
                              Taiwan
                            </option>
                            <option data-countrycode="TJ" value="7">
                              Tajikstan
                            </option>
                            <option data-countrycode="TH" value="66">
                              Thailand
                            </option>
                            <option data-countrycode="TM" value="7">
                              Turkmenistan
                            </option>
                            <option data-countrycode="TM" value="993">
                              Turkmenistan
                            </option>
                            <option data-countrycode="TR" value="90">
                              Turkey
                            </option>
                            <option data-countrycode="TC" value="1649">
                              Turks &amp; Caicos Islands
                            </option>
                            <option data-countrycode="GB" value="44">
                              UK
                            </option>
                            <option data-countrycode="UA" value="380">
                              Ukraine
                            </option>
                            <option data-countrycode="US" value="1">
                              USA
                            </option>
                          </optgroup>
                          <option data-countrycode="-" value="other">
                            Other
                          </option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <input
                        type="tel"
                        id="phone"
                        className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                        placeholder="Your phone*"
                        required
                      />
                    </div>
                  </div>

                  {/* Your Email */}
                  <div className="mb-4">
                    <input
                      type="email"
                      id="email"
                      className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                      placeholder="Your Email"
                    />
                  </div>

                  {/* Job Title */}
                  <div className="mb-4">
                    <input
                      type="text"
                      id="job"
                      className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                      placeholder="Job title"
                    />
                  </div>

                  {/* CV */}
                  <div className="mb-4">
                    <input
                      type="file"
                      id="cv"
                      className="mt-1 w-full border-gray-300 rounded-md"
                      placeholder="C.V."
                    />
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    <textarea
                      id="notes"
                      rows="3"
                      className="mt-1 w-full border-b border-gray-300 focus:outline-hidden focus:border-teal-800"
                      placeholder="Notes"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full btn-primary text-white font-medium py-2 px-4 shadow-sm hover:bg-black focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}
