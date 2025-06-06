"use client"

import React, { useEffect, useState } from "react";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../customInput/CustomTextField";
import { toast } from "react-hot-toast";
import * as getEndpoint from "../../network/EndPoints";
import Login from "./Login";
import VerifyNumber from "./VerifyNumber";
import { useDispatch } from "react-redux";
// import {  saveToken } from "@/reduxStore/slices/userSlice";
import { setCookie } from "cookies-next";
// import { useRouter } from "next/navigation";
import useApi from "../Fetcher/useAPI";

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
const AuthData = () => {
  const [otpVerified, setOtpVerified] = useState<any>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstStep,setFirstStep]= useState<boolean>(false);
  const [refresh,setRefresh]=useState<number>(0)
  const [resetPush,setResetPush]= useState<boolean>(false);
  const { callApi } = useApi()
  const dispatch=useDispatch();


  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: "",
    },
    mode:'onChange',
    resolver: yupResolver(schema),
  });


useEffect(()=>{

},[refresh])


const handleApiError = async (err: any) => {
  const result = err && err.response as any;
 // // console.log('errresult',err)
  // if (result.status === 201) {
  //   setIsLoading(false)
  //   const myToken = result && result.data && result.data.token
  //   dispatch(saveToken(myToken))
   
  // } else
   if (result.status === 401) {
    toast.error('Incorrect Email or Password')
  } else if (result.status === 400) {
    if(result.data.intent=='ERROR')
    {
      if(result.data.message=="please login to Vendor panel"){
        toast.error('Mobile Number Already Registered as Vendor')
      }if(result.data.message=="please login to Admin panel"){
        toast.error('Mobile Number Already Registered as Admin')
      }
      else{
        // toast.error('Buyer Not Found')
      }
    }else{
      toast.error('Buyer Not Found')
    }
    
   
  } else {
    toast.error(
      err && err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'Login Failed'
    )
  }
}

  const onSubmit =async (data: any) => {
    //// // console.log("formmmmm",data);
    setIsLoading(true);
    
    setMobileNumber(data.mobile);
  
    const payloadData = {
      mobileNumber: `+91${data.mobile}`,
      userType: "Buyer"
    };

    try{
      const result =(await callApi(getEndpoint.default.SENDOTP,'POST',payloadData)) as any;
     // // console.log('sendotp',result)
     
      if(result.data==null)
        {
          handleApiError(result?.errorData)
        }
        else
        {
 //@ts-ignore
          if(result?.data?.otpSent == true && result?.data?.passwordSet==false)
            {
              toast.success("OTP sent successfully",{iconTheme: {
                primary: '#439787',
                secondary: '#FFFAEE',
              }},);
              setFirstStep(false)
              setOtpVerified(false)
            }
             //@ts-ignore
            else if(result?.data?.otpSent == false && result?.data?.passwordSet==true){
              setFirstStep(false)
              setOtpVerified(true)
            }else{

            }   
        }
   

    }catch(e){
      handleApiError(e)
    }finally{
      setIsLoading(false)
    }

  };

  const onEditPhone=()=>{
   // // console.log('hello')
    setFirstStep(true)
  }

  const onClickForgot=async ()=>{

    // setIsLoading(true);
    
    // setMobileNumber(data.mobile);
  


    const payloadData = {
      mobileNumber: `+91${getValues().mobile}`,
      userType: "Buyer",
      forForgetPassword: true
    };

    try{
      const result =(await callApi(getEndpoint.default.SENDOTP,'POST',payloadData))
     // // console.log('sendotp',result)
     
      if(result.data==null)
        {
          handleApiError(result?.errorData)
        }
        else
        {
        //@ts-ignore
          if(result?.data?.otpSent == true && result?.data?.passwordSet==false)
            {
              toast.success("OTP sent successfully",{iconTheme: {
                primary: '#439787',
                secondary: '#FFFAEE',
              }},);
              setFirstStep(false)
              setOtpVerified(false)
            }
        //@ts-ignore
            else if(result?.data?.otpSent == false && result?.data?.passwordSet==true){
              setFirstStep(false)
              setOtpVerified(true)
            
            }
        //@ts-ignore
            else if(result?.data?.otpSent == true && result?.data?.passwordSet==true){

              setFirstStep(false)
              setOtpVerified(false)
              setResetPush(true)
              setCookie('passwordNotSet','false')
            }
            else{

            }   
        }
   

    }catch(e){
      handleApiError(e)
    }finally{
      setIsLoading(false)
    }


  }

  const onGoBack=()=>{
    setFirstStep(true)
  }



  if (otpVerified === true && !firstStep) {
    return <Login onPress={onEditPhone} mobile={getValues()?.mobile}  resetPass={onClickForgot} />; // Render Login component if OTP is verified
  }

  if (otpVerified === false && !firstStep) {
    return <VerifyNumber onPress={onGoBack} mobileNumber={mobileNumber} resetPass={resetPush==true ? true :false} />; // Render VerifyNumber component if OTP is not verified
  }

  // if (otpVerified === false && !firstStep && resetPush==true) {
  //   return <VerifyNumber onPress={onGoBack} mobileNumber={mobileNumber} resetPass={true}  />; // Render VerifyNumber component if OTP is not verified
  // }

 
  return (
    <div className="relative mt-30">
      <div
        className="bg-cover bg-center bg-[url('/images/auth/auth.png')] h-5/6"
      >
        <div className="flex items-center justify-center py-20 md:py-20">
          <div className=" flex items-center justify-center py-10 md:py-15 w-11/12  px-4 md:max-w-lg md:h-[360px]  bg-white">
          <div>
            <h1 className="text-center text-[22px] md:text-3xl  font-bold mb-4 text-black">
              Welcome to{" "}
              <span className="text-primary text-[22px] md:text-2xl lg:text-3xl font-bold">
              hubeco.market
              </span>
              👋🏻
            </h1>
            <div className="flex items-center justify-center">
              <p className="mb-2 md:mb-2 lg:mb-4 text-xs md:text-[13px] text-black w-10/12 text-center">
              Log in to access your account, track orders, and explore our selection of sustainable building materials.
              </p>
            </div>

            <form
              // noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              //   className="flex flex-col gap-5"
            >
              <div className="flex justify-center items-center">
                <div className='text-center w-full'>
                <div className="p-4 md:inline-block max-w-full h-[120px] ">
                  <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                    Phone Number<span className="text-red font-light pl-1">*</span>
                  </label>
                  <Controller
                    rules={{
                      required: true,
                    }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput
                        placeholder="Enter Your Phone Number"
                        prefix="+91"
                        onChange={onChange}
                        value={value}
                        customStyles={{
                          // backgroundColor: "#F3F3F3",
                          border: "1px solid #E0E0E0",
                          borderRadius: "5px",
                          // width: "400px",
                        }}
                        extraClassnames="custom-input md:w-[400px] w-[100%]"
                        errorStyle={{color:'red'}}
                        errorMessage={errors.mobile?.message}
                        isMobileInput // This prop enables the restriction for the mobile number field
                      />
                    )}
                    name="mobile"
                  />
                </div>

                <div className="px-4 md:inline-block max-w-full">
                  <div className="flex flex-col md:flex-row gap-4">
                    <CustomButton
                      title={"Continue"}
                      className="text-white font-bold h-12 w-[100%] md:min-w-[400px] text-sm md:text-md mt-2 md:mt-2"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "white",
                        // minWidth: "400px",
                        backgroundColor: "#B90647",
                      }}
                      //   hoverBgColor="#A92449"
                      //   hoverColor="black"
                      loading={isLoading} 
                      type="submit"
                    />
                  </div>
                </div>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthData;
