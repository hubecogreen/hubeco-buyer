"use client";

// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import { Box, CircularProgress } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./editProfile.module.css";
// import Head from "next/head";
import React, { ChangeEvent, useEffect, useState } from "react";
import B2C_editPersonal from "@/components/edit-profile/B2C_editPersonal";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import * as Webservices from "../../network/WebServices";
// import * as getEndpoint from "../../network/EndPoints";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import {
//   saveToken,
//   saveRefreshToken,
//   setUser,
// } from "@/reduxStore/slices/userSlice";
// import { useDispatch } from "react-redux";
// import Store from "@/reduxStore";
import B2B_changePassword from "@/components/edit-profile/B2B_changePassword";
import B2B_editAddress from "@/components/edit-profile/B2B_editAddress";
import B2B_editDetails from "@/components/edit-profile/B2B_editDetails";
import B2B_editPersonal from "@/components/edit-profile/B2B_editPersonal";
import B2C_editAddress from "@/components/edit-profile/B2C_editAddress";
import B2C_changePassword from "@/components/edit-profile/B2C_changePassword";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const buyerInfo = sessionStorage.getItem("buyerUserInfo") as any;
  const [isCheckingUserType, setIsCheckingUserType] = useState(true);
  const [jddd, setJddd] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState(0);

  const userType = JSON.parse(buyerInfo)?.buyerInfo?.buyerType;

  const router = useRouter();
  const searchParams = useSearchParams();
  const tab2 = searchParams.get("redirect") || null;

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (userType == "B2B") {
      switch (tab) {
        case "profile":
          setActiveStep(0);
          break;
        case "company":
          setActiveStep(1);
          break;
        case "address":
          setActiveStep(2);
          break;
        case "account":
          setActiveStep(3);
          break;
        default:
          setActiveStep(0);
      }
    } else if (userType == "B2C") {
      switch (tab) {
        case "profile":
          setActiveStep(0);
          break;
        case "address":
          setActiveStep(1);
          break;
        case "account":
          setActiveStep(2);
          break;
        default:
          setActiveStep(0);
      }
    } else {
      setActiveStep(0);
    }
  }, [searchParams]);

  useEffect(() => {
    if (userType === null || undefined) {
      router.replace("/select-buyer-type");
    } else {
      setIsCheckingUserType(false); // Set to false when userType is determined
      setJddd(false);
    }
  }, [userType, router]);

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep(0);
  };

  const handleAddParams = (activeStep: any, step: any) => {
    // console.log("dewrhetj", activeStep, step);
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    setActiveStep(activeStep);

    if (step == "Personal Information") {
      url.searchParams.set("tab", "profile");
    } else if (step == "Company Details") {
      url.searchParams.set("tab", "company");
    } else if (step == "Shipping Address") {
      url.searchParams.set("tab", "address");
    } else if (step == "Account Settings") {
      url.searchParams.set("tab", "account");
    } else {
      url.searchParams.set("tab", "profile");
    }
    // Add or update query parameters

    // Update the browser URL without reloading the page
    router.push(url.toString());
  };

  const stepsB2B = [
    { label: "Personal Information", img: "/images/register/personal.webp" },
    { label: "Company Details", img: "/images/register/company.webp" },
    { label: "Shipping Address", img: "/images/register/shipping.webp" },
    { label: "Account Settings", img: "/images/register/account.webp" },
  ];
  const stepsB2C = [
    { label: "Personal Information", img: "/images/register/personal.webp" },
    { label: "Shipping Address", img: "/images/register/shipping.webp" },
    { label: "Account Settings", img: "/images/register/account.webp" },
  ];

  //s// console.log('getvaluessss',getValues1())

  const renderStepB2BContent = (step: number) => {
    // // console.log("Active Step:", step);
    // Debugging errors

    switch (step) {
      case 0:
        return (
          <div>
            {activeStep === 0 && (
              <B2B_editPersonal
                imgSrc="/images/user.webp" // Use your default image URL here
                // mobileNumber={mobileParam}
                nextStep={handleNextStep}
              />
            )}
          </div>
        );
      case 1:
        return (
          <div>
            {activeStep === 1 && <B2B_editDetails nextStep={handleNextStep} />}
          </div>
        );
      case 2:
        return (
          <div>
            {activeStep === 2 && <B2B_editAddress nextStep={handleNextStep} />}
          </div>
        );
      case 3:
        return (
          <div>
            {activeStep === 3 && (
              <B2B_changePassword prevStep={handlePrevStep} />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepB2CContent = (step: number) => {
    // // console.log("Active Step:", step);
    // Debugging errors

    switch (step) {
      case 0:
        return (
          <div>
            {activeStep === 0 && (
              <B2C_editPersonal
                imgSrc="/images/user.webp" // Use your default image URL here
                // mobileNumber={mobileParam}
                nextStep={handleNextStep}
              />
            )}
          </div>
        );
      case 1:
        return (
          <div>
            {activeStep === 1 && <B2C_editAddress nextStep={handleNextStep} />}
          </div>
        );
      case 2:
        return (
          <div>
            {activeStep === 2 && (
              <B2C_changePassword prevStep={handlePrevStep} />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const steps = userType === "B2B" ? stepsB2B : stepsB2C;

  // setTimeout(()=>{
  //   setIsLoading(false)

  // },2000)

  if (isCheckingUserType) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <CircularProgress isIndeterminate color="#A92449" />
        </div>
      </>
    );
  }

  return (
    <div>
      {jddd ? (
        <div className="w-full h-screen flex justify-center items-center">
          <CircularProgress isIndeterminate color="#A92449" />
        </div>
      ) : (
        <div className="bg-white">
          {/* <Head>
        <title>Edit Profile</title>
      </Head> */}
          <head>
            <title>Profile | Hubeco</title>
            {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
            {/* <meta name="author" content={productsData?.author.firstName} /> */}
            {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
          </head>
          {/* <Header /> */}
          <div className="px-4 md:px-30 md:mt-20 pb-10 w-full md:w-11/12 mx-auto">
            
            <div
  className="category-section pb-10 text-center text-brown bg-white shadow-[rgba(149,157,165,0.2)_8px_4px_8px_8px]"
>

              <div className="container mx-auto py-10">
                <div className="text-center">
                  <h1 className="text-2xl md:text-4xl font-bold mb-5">
                    Edit Profile
                  </h1>
                </div>
               
                <div className={`${styles.stepper} flex md:flex-row flex-col`}>
                  {/* Stepper Steps */}
                  <div className={`${styles.steps} `}>
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className={`${styles.step} ${
                          index === activeStep ? styles.activeStep : ""
                        } flex flex-col md:flex-row items-center mb-4 md:mb-0 px-4 py-2 cursor-pointer`}
                        onClick={() => handleAddParams(index, step?.label)}
                      >
                        <div className="h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-0 md:mr-2 rounded-full bg-gray-200 flex items-center md:items-start md:pb-2 justify-center">
                          <Image
                            src={step.img}
                            alt="Step"
                            className="w-8 h-8 md:w-10 md:h-10 object-contain"
                            width={10}
                            height={10}
                            onError={e => {
                              e.currentTarget.src = '/images/user.webp'
                            }}
                            loading="lazy"
                          />
                        </div>
                        <div
                          className={`${styles.stepLabel} text-sm md:text-base text-center md:text-left break-words`}
                        >
                          {step.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Step Content */}
                  <div className={`${styles.stepContent} md:px-8`}>
                    {userType !== "" && userType === "B2B"
                      ? renderStepB2BContent(activeStep)
                      : renderStepB2CContent(activeStep)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* <Footer /> */}
        </div>
      )}
    </div>
  );
}
