"use client"
import React, { useState } from "react";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../customInput/CustomTextField";
import { toast } from 'react-hot-toast';
// import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import VerifyEmail from "./VerifyEmail";
import { getCookie, setCookie } from "cookies-next";
import useApi from "../Fetcher/useAPI";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import animationData from '../../../public/animations/verfiyemailpending.json'
import { IoIosClose } from "react-icons/io";
import LottieWrapper from "../LottieWrapper";



const schema = yup.object({
  email: yup
  .string()
    .required("Email is required")
    .email("Invalid email address format")
    // .matches(/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/, "Invalid email address format")
    .max(120, "Email address cannot exceed 320 characters"),
});


interface ForgotProps{
  mobile?:string
  onPress?:() => void;
}


const ForgotPassword:React.FC<ForgotProps> = ({mobile,onPress}) => {

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
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
  const [isOpen,setIsOpen]=useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router=useRouter()

  const handleApiError = async (err: any) => {
    const result = err && err.response
   // // console.log('errresult',err)
    if (result.status === 404) {
      toast.error('Buyer not exists.Please enter Valid Email')
    } else if(result.status === 400) {
      if(result.data && result.data.intent=='EMAIL_NOT_VERIFIED'){
        setIsOpen(true)
      }
    } else {
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
        const result =(await callApi(getEndpoint.default.FORGOT_PASSWORD,'POST',payloadData)) as any;
       // // console.log('reerer',result)
        if(result.data==null)
          {
            handleApiError(result?.errorData)
          }else{
            toast.success('Reset Password link sent Successfully',{iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }})
            router.push('/login?fromPage=forget')
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


    const resendEmail =async () => {
      setIsLoading(true)
      const payloadData = {
        phoneNumber:  `+91${mobile}`,
        password: 'password',
        resendEmailVerificationLink: true
      }
      
      try{
        const result =(await callApi(getEndpoint.default.LOGIN,'POST',payloadData)) as any;
        //// // console.log('loginresult',result)
        if(result?.data==null)
          {
            handleApiError(result?.errorData)
          }else{
           // // console.log('lggedin',result.data)
            if(result?.data?.intent=="EMAIL_LINK_SENT")
              {
            
               
                 toast.success("Verification Mail resent successfully",{iconTheme: {
                  primary: '#439787',
                  secondary: '#FFFAEE',
                }})
                 setIsOpen(false)
              }else{
                setCookie('token',result?.data?.token)
                setCookie('refreshToken',result?.data?.refreshToken?.token)
                getBuyer(result?.data?.token)
                router.push('/')
              }
           
          }
        
      }catch(e:any){
       // // console.log('ererrerr',e)
        handleApiError(e)
      }finally{
  setIsLoading(false)
      }
    }


  return (
    <div className="relative">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url(images/auth/auth.webp)" }}
      >
        <div className="bg-opacity-90 h-full flex items-center justify-center py-20 md:py-20">
          <div className="text-center py-10 md:py-15 max-w-md md:max-w-lg  text-white bg-white">
            <h1 className="text-4xl md:text-3xl flex items-center justify-center font-bold mb-4 text-brown">
              Forgot Password 
              <Image src='/images/login/forgot-icon.webp' className="w-[28px] h-[28px] ml-1" alt='Login' 
              height={25} 
              width={25}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy" />
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
                  <label className="block text-brown mb-2 text-brown text-base font-medium text-left">
                    Email ID<span className="text-red">*</span>
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
            <Dialog open={isOpen} >
            
            {/* <DialogTrigger asChild>
              <Button variant="outline">Share</Button>
            </DialogTrigger> */}
           
            <DialogContent  className="sm:max-w-md">
            <DialogClose onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
            <IoIosClose className="w-6 h-6  z-10 bg-white  text-brown" />
      
      
            </DialogClose>
        
      
              <DialogHeader>
                  <LottieWrapper
                    className="flex justify-center self-center w-[100px] h-[100px]"
                    animationData={animationData}
                    loop={true}
                  />
                <DialogTitle className="text-center">Your Email is Not Verified</DialogTitle>
                <DialogDescription className="text-center">
                A verification link has been sent to your email. Please click on the link to verify your email.
                </DialogDescription>
              </DialogHeader>
            
              <DialogFooter className="flex items-center justify-self-center self-center mt-5">
            
              <DialogDescription className="text-center text-sm">
                If you haven't received any email?
                </DialogDescription>
                <button className="text-secondary text-center cursor-pointer font-semibold text-sm md:text-sm" onClick={resendEmail}>
                  Resend
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
function getBuyer(token: any) {
  throw new Error("Function not implemented.");
}

