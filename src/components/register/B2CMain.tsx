"use client";

import styles from "./B2B.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import B2CPersonal from "./B2C_Personal";
import B2CAddress from "./B2C_Address";
import B2CSecurity from "./B2C_Security";
import B2CPlans from "./B2CPlans";
import { setCookie } from "cookies-next";
import React from "react";
import { B2CContextProvider } from "./context";
import Image from "next/image";

interface B2CProps {
  mobileParam?: any;
}

const B2CMain: React.FC<B2CProps> = ({ mobileParam }) => {
  // const searchParams=useSearchParams();
  // const mobileParam=searchParams.get('mobile');

  const steps = [
    { label: "Personal Information", img: "/images/register/user.png" },
    { label: "Plans", img: "/images/register/add.png" },
  ];

  const [activeStep, setActiveStep] = useState(0);
  // const [submitted, setSubmitted] = useState(false);

  // // console.log('jwwrv')

  useEffect(() => {
    // setCookie("userRegistered", "false");
    // setCookie("addressAdded", "false");
  }, []);

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step: number) => {
    // // console.log("Active Step:", step);

    switch (step) {
      case 0:
        return (
          <div>
            {activeStep === 0 && (
              <B2CPersonal
                imgSrc="/images/user.webp" // Use your default image URL here
                nextStep={handleNextStep}
              />
            )}
          </div>
        );

      case 1:
        return (
          <div>
            {activeStep === 1 && <B2CPlans prevStep={handlePrevStep} />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <B2CContextProvider>
      <div className="bg-cream">
        <Head>
          <title>B2C</title>
        </Head>
        {/* <Header /> */}
        <div className="px-4 md:px-10 pb-10 w-full md:w-[90%] mx-5 md:mx-20">
        <div className="category-section pb-10 text-center text-brown bg-cream shadow-lg">
            <div className="container mx-auto py-10 md:mt-20 ">
              <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-bold mb-5">
                  Welcome to <span className="text-teal-500">hubeco</span> 👋
                </h1>
                <p className="text-lg md:text-xl text-brown mb-10">
                  Let&#39;s set up your B2C profile
                </p>
              </div>
              <div className={`md:flex justify-start items-start `}>
                <div
                  className={`flex md:flex-col  md:justify-center md:items-start justify-center items-center md:mr-8`}
                >
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`${styles.step} ${
                        index === activeStep ? styles.activeStep : ""
                      } flex flex-col md:flex-row items-center justify-center cursor-default mb-4 md:mb-0`}
                      // onClick={() => setActiveStep(index)}
                    >
                      <div className="h-8 w-8 mb-2 md:mb-0 md:mr-2">
                        <Image src={step.img} alt="Image" width={48} height={48} />
                      </div>
                      <div
                        className={`${styles.stepLabel}  text-center md:text-left`}
                      >
                        {step.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`${styles.stepContent} md:border-l md:border-[#C1C1C1] md:!px-[30px] mobile-sm:border-0 mobile-sm:!px-0`}>
                {renderStepContent(activeStep)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </B2CContextProvider>
  );
};

export default B2CMain;
