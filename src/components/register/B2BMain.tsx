"use client";

import Footer from "@/components/footer/MainFooter";
import Header from "@/components/header/MainHeader";
import styles from "./B2B.module.css";
import Head from "next/head";
import {  useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { toast } from 'react-hot-toast';
import Store from "@/reduxStore";
import B2BPersonal from "./B2B_Personal";
import B2BDetails from "./B2B_Details";
import B2BAddress from "./B2B_Address";
import B2BSecurity from "./B2B_Security";
import { B2CContextProvider } from "./context";
import { setCookie } from "cookies-next";
import B2CPlans from "./B2CPlans";
import Image from "next/image";
const detailsSchema = yup.object({
  companyName: yup
    .string()
    .required("Company Name is required")

    // @ts-ignore
    .test(
      "no-leading-space",
      "Empty space at the start is not allowed",
      (value:any) => value && value.trimLeft() === value
    )

    // @ts-ignore
    .test(
      "no-multiple-spaces",
      "Double space are not allowed",
      (value:any) => value && !/\s{2,}/.test(value)
    )
    .min(3, "Company Name  must be at least 3 characters")
    .matches(/^(?! )(?=.*[^ ]).{3,}(?<! )$/, "No empty spaces and start and end")
    .max(75, "Company Name  cannot exceed 75 characters"),
  businessType: yup
    .string()
    .required("Business Type is required")
    .matches(/^[^\d]+$/, "Business Type cannot contain numbers")
    .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

    // @ts-ignore
    .test(
      "no-leading-space",
      "Empty space at the start is not allowed",
      (value:any) => value && value.trimLeft() === value
    )

    // @ts-ignore
    .test(
      "no-multiple-spaces",
      "Double space are not allowed",
      (value:any) => value && !/\s{2,}/.test(value)
    )
    .min(3, "Business Type  must be at least 3 characters")
    .matches(/^(?! )(?=.*[^ ]).{3,}(?<! )$/, "Enter valid name")
    .max(75, "Business Type  cannot exceed 75 characters"),
  gst: yup
    .string()
    .required("GST is required")
    .matches(
      /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
      "Invalid GST format"
    )
    .trim("GST cannot have leading or trailing spaces"),
  tin: yup
    .string()
    .required("Tax Identification Number is required")
    .trim("TIN cannot have leading or trailing spaces")
    .matches(/^[0-9A-Za-z]{1,30}$/, "InvalidTAN format"),
  pan: yup
    .string()
    .required("PAN is required")
    .trim("PAN cannot have leading or trailing spaces")
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  companyAddress: yup
    .string()
    .trim("Address cannot have empty spaces at start or end")
    .strict(true)
    .required("Company Address is required")
    .max(95, "Address must be at most 95 characters"),
});

interface B2BProps{
  mobileParam?:any
}

const B2BMain:React.FC<B2BProps> = ({mobileParam}) =>  {


  // const mobileParam=searchParams.get('mobile')



  const steps = [
    { label: "Personal Information", img: "/images/register/personal.webp" },
    { label: "Company Details", img: "/images/register/company.webp" },
    { label: "Plans", img: "/images/register/company.webp" },
  ];

  const [activeStep, setActiveStep] = useState(0);


  const token = Store.getState().user.token;

  useEffect(() => {

    // setCookie('userRegistered','false')
    // setCookie('addressAdded','false')
  }, []);

  const [submitted, setSubmitted] = useState(false);



  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };




  const renderStepContent = (step: number) => {
 
    switch (step) {
      case 0:
        return (
          <div>
            {activeStep === 0 && (
              <B2BPersonal
                imgSrc="/images/user.webp" 
                nextStep={handleNextStep}
              />
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <B2BDetails
             
              prevStep={handlePrevStep}
             
              nextStep={handleNextStep}
              // setIsLoading={setIsLoading}
            />
          </div>
        );
        case 2:
          return (
            <div>
              {activeStep === 2 && (
                <B2CPlans
                  prevStep={handlePrevStep}
                />
              )}
            </div>
          );
      default:
        return null;
    }
  };

  // if (submitted) {
  //   // redirect('/welcome')
  //   redirect('/registration-success')
  // }
  return (
    <B2CContextProvider>
    <div className="bg-white">
      <Head>
        <title>B2B</title>
      </Head>
     {/* <Header /> */} 
      <div className="md:px-10 pb-10 md:w-[90%] w-[98%] md:m-20 m-2">
      <div className="category-section pb-10 text-center text-brown bg-white shadow-[8px_4px_8px_8px_rgba(149,157,165,0.2)]">

          <div className="container mx-auto py-10 w-full mobile-sm:px-5">
            <div className="text-center">
              <h1 className="text-[24px] md:text-4xl font-bold mb-5">
                Welcome to <span className="text-teal-500">hubeco</span> 👋
              </h1>
              <p className="text-base md:text-xl text-gray-500 mb-10">
                Let&#39;s set up your <span className="font-semibold">B2B</span> profile
              </p>
            </div>
            <div className={`md:flex justify-start items-start `}>
              <div className={` flex md:flex-col  md:justify-start md:items-start justify-center items-center md:mr-8 md:min-w-[23%]`}>
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`${styles.step} ${
                      index === activeStep ? styles.activeStep : ""
                    } flex flex-col md:flex-row items-center justify-center cursor-default mb-4 md:mb-0`}
                    // onClick={() => setActiveStep(index)}
                  >
                    <div className="h-12 w-12">
                      <Image src={step.img} alt="Image"
                      width={48}
                      height={48}
                      onError={e => {
                        e.currentTarget.src = '/images/user.webp'
                      }}
                      loading="lazy"
                       />
                    </div>
                    <div className={styles.stepLabel}>{step.label}</div>
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
}

export default B2BMain;
