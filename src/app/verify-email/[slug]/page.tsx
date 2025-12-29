"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/customButton/CustomButton";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import useApi from "@/components/Fetcher/useAPI";
import axios from "axios";
import animationDataFailed from "../../../../public/animations/failed.json";
// import Head from "next/head";
// import Header from "@/components/header/MainHeader";
// import Footer from "@/components/footer/MainFooter";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import animationData from "../../../../public/animations/verifyyouremail.json";
import successAnimation from "../../../../public/animations/emailverified.json";
import { deleteCookie } from "cookies-next";
// import { useDispatch } from "react-redux";
// import { saveRefreshToken, saveToken, setUser } from "@/reduxStore/slices/userSlice";
import Link from "next/link";
import LottieWrapper from "@/components/LottieWrapper";

const schema = yup.object({
  mobile: yup
    .string()
    .required("Mobile Number is required")
    .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      "Characters are not allowed"
    )
    .matches(/^[6-9][0-9]*$/, "First number must be between 6 to 9")
    .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits")
    .length(10, "Mobile number must be exactly 10 digits"),
});
const VerifyEmail = (param: any) => {
  const { callApi } = useApi();
  
  const paramdds = useParams()


  const slug = param.params.slug;
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [unauthenticated, setUnauthenticated] = React.useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    deleteCookie("token");
    deleteCookie("refreshToken");
  }, []);

  const onSubmit = async () => {
    // // console.log('dafsffdg')
    try {
      const response = (await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verifyEmail`,
        "", // Empty body as per the curl command
        {
          headers: {
            accept: "*/*",
            verifytoken: slug
          },
        }
      )) as any;
      // // console.log('response', response)
      if (response.status === 201) {
        // Adjust the status code as needed
        setEmailVerified(true);
        // toast.success('Email Verified')
      } else {
        toast.error("Email Verification failed");
      }
    } catch (err: any) {
      // // console.log('err', err)

      toast.error(
        err?.response?.data?.message || "Failed to submit verification"
      );
    }
  };

  async function validateToken() {
    const res = await callApi(
      `auth/validateTempSession/VERIFY_EMAIL/${slug}`,
      "GET"
    );

    if (res.data == null) {
      setUnauthenticated(true);
      // // console.log('unauth')
    } else {
      setUnauthenticated(false);
      // // console.log('auth')
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div className="bg-white ">
      {/* <Head>
      <title>Home | Blogs</title>
    </Head> */}
      <head>
        <title>Verify Email | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      {/* <Header /> */}
      <div className="relative">
        <div
          className="bg-cover bg-center py-10"
          style={{ backgroundImage: "url(/images/auth/auth.webp)" }}
        >
          <div className="bg-white max-w-md md:max-w-lg mx-auto h-full flex items-center rounded-lg justify-center py-10 md:py-10">
            {unauthenticated == false && emailVerified == false && (
              <>
                <div className="flex flex-col gap-1 is-full justify-center items-center sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0">
                  <LottieWrapper
                    animationData={animationData}
                    loop={true}
                    className="w-[150px] h-[150px]"
                  />

                  <div className="flex flex-col gap-1 justify-center items-center">
                    <h1 className="text-center font-bold text-big">
                      Verify your email
                    </h1>
                    <p className="text-center text-md text-brown my-4">
                      To proceed, please ensure that you have verified your
                      registered email address.
                    </p>
                  </div>
                  <CustomButton
                    title="Verify"
                    onPress={onSubmit}
                    className="md:ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-28  w-28 md:text-md text-sm text-white "
                    type="submit"
                  />

                  <div className="flex justify-center items-center flex-wrap gap-2">
                    <p
                      className="flex justify-center items-center"
                      color="primary"
                    >
                      <Link
                        href="/login"
                        className="flex items-center gap-1.5  my-4 text-secondary hover:underline"
                      >
                        <span>Go Back</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </>
            )}
            {unauthenticated == false && emailVerified == true && (
              <div className="text-8xl p-4 flex justify-center flex-col items-center">
                <LottieWrapper
                  loop
                  animationData={successAnimation}
                  className="w-[200px] h-[200px]"
                />

                <p className="text-center  text-brown font-semibold text-lg my-6">
                  Your email has been verified successfully
                </p>
                <CustomButton
                  title="Login"
                  onPress={() => router.push("/login")}
                  className="md:ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-28  w-28 md:text-md text-sm text-white "
                  type="button"
                />
              </div>
            )}

            {unauthenticated == true && (
              <div className="text-8xl p-4 flex justify-center flex-col items-center">
                <LottieWrapper
                  loop
                  animationData={animationDataFailed}
                  className="w-[200px] h-[200px]"
                />

                <h4 className="text-center mt-6 text-2xl">
                  Your email verify link has been expired
                </h4>
                <div className="flex justify-center items-center flex-wrap gap-2 mt-5">
                  <p
                    className="flex justify-center items-center mt-4"
                    color="primary"
                  >
                    <span className="text-base text-fontGray font-normal">
                      To get new link please log in{" "}
                    </span>
                    <Link
                      href="/login"
                      className="flex text-base ml-2 text-secondary items-center font-semibold gap-1.5  hover:underline "
                    >
                      <span>Go to Login</span>
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default VerifyEmail;
