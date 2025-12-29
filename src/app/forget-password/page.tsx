"use client"

import React, { useState } from "react";
import CustomButton from "@/components/customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/components/customInput/CustomTextField";
import { toast } from 'react-hot-toast';
// import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import VerifyEmail from "@/components/authFlow/VerifyEmail";
import { getCookie } from "cookies-next";
import useApi from "@/components/Fetcher/useAPI";
import { useRouter } from "next/navigation";
import Login from "@/components/authFlow/Login";
// import Footer from "@/components/footer/MainFooter";
// import Head from "next/head";
// import Header from "@/components/header/MainHeader";

const schema = yup.object({
  email: yup
  .string()
    .required("Email is required")
    .email("Invalid email address format")
    // .matches(/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/, "Invalid email address format")
    .max(120, "Email address cannot exceed 120 characters"),
});


interface ForgotProps{
  mobile?:string
  onPress?:() => void;
}


const ForgotPassword:React.FC<ForgotProps> = ({mobile,onPress}) => {

  const {
    control,
    handleSubmit,
    // setValue,
    // setError,
    // reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
    mode:"onChange"
  });

  const token =getCookie('token')
  const [showEmailComponent,setShowEmailComponent]=useState<boolean>(false)
  const {callApi}=useApi()
  const [loading,setLoading]=useState<boolean>(false)
  const router=useRouter()

  const handleApiError = async (err: any) => {
    const result = err && err.response
   // // console.log('errresult',err)
    if (result.status === 201) {
      toast.success('Reset Password link sent successfully',{iconTheme: {
        primary: '#439787',
        secondary: '#FFFAEE',
      }})
      // reset()
      router.push('/login')
    } else if (result.status === 404) {
      toast.error('Buyer not exists.Please enter Valid Email')
    }  else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Failed to send Reset Link'
      )
    }
  }

  const onSubmit =async (data: any) => {
   
setLoading(true)
    const payloadData = {
        email: data.email,
        userType: "Buyer"
      }

      try{
        const result =(await callApi(getEndpoint.default.FORGOT_PASSWORD,'POST',payloadData))
       // // console.log('reerer',result)
        if(result.data==null)
          {
            handleApiError(result?.errorData)
          }else{
            toast.success('Reset Password link sent Successfully',{iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }})
            return <Login fromPage='forgot' />
          }

      }catch(e:any){
     
      handleApiError(e)

      }finally{
        setLoading(false)
      }

    
  };

 // // console.log('firstsds',mobile)

  if(showEmailComponent)
    {
      return <VerifyEmail mobileNumber={mobile} />
    }


  return (
    <div className="bg-white">
    {/* <Head>
      <title>Contact Us | Hubeco Buyer</title>
    </Head> */}
     <head>
        <title>Forgot Password | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
   {/* <Header /> */} 
    <div className="relative">
    <div className="bg-cover bg-center bg-[url('/images/auth/auth.webp')]">

        <div className="bg-opacity-90 h-full flex items-center justify-center py-20 md:py-20">
          <div className="text-center py-10 md:py-15 max-w-md md:max-w-lg  text-white bg-white">
            <h1 className="text-4xl md:text-3xl  font-bold mb-4 text-brown">
              Forgot Password 🔒
            </h1>
            <div className="flex items-center justify-center">
              <p className="mb-2 md:mb-2 lg:mb-4 text-sm md:text-base text-brown w-10/12 text-center">
              Enter your email address below. We will send a password reset link to your email.
              </p>
            </div>

            <form
              // noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              //   className="flex flex-col gap-5"
            >
              <div className="">
                <div className="p-4 inline-block max-w-full ">
                  <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
                    Email ID
                  </label>
                  <Controller
                    rules={{
                      required: true,
                    }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput
                        placeholder="Enter Your Email ID"
                        onChange={onChange}
                        value={value}
                        customStyles={{
                          // backgroundColor: "#F3F3F3",
                          border: "1px solid #E0E0E0",
                          borderRadius: "5px",
                          width: "400px",
                        }}
                        extraClassnames="custom-input "
                        errorMessage={errors.email?.message}
                      />
                    )}
                    name="email"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex flex-col md:flex-row gap-4">
                    <CustomButton
                      title={"Continue"}
                      type="submit"
                      className="text-white font-bold h-12 w-full md:w-40 text-sm md:text-md mt-2 md:mt-2"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "white",
                        minWidth: "400px",
                        backgroundColor: "#B90647",
                      }}
                      loading={loading}
                      //   hoverBgColor="#A92449"
                      //   hoverColor="black"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   {/* <Footer /> */}
    </div>
  );
};
export default ForgotPassword;
