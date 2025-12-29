"use client";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
// import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import useApi from "../Fetcher/useAPI";
import Link from "next/link";
// import { set } from "lodash";

const schema = yup.object({
  digit1: yup.string().required("Otp must be exactly 4 digits"),
  digit2: yup.string().required("Otp must be exactly 4 digits"),
  digit3: yup.string().required("Otp must be exactly 4 digits"),
  digit4: yup.string().required("Otp must be exactly 4 digits"),
});

interface VerifyNumProps {
  onPress?: () => void;
  mobileNumber?: string;
  resetPass?: boolean;
}

const VerifyNumber: React.FC<VerifyNumProps> = ({ mobileNumber, onPress, resetPass }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidMssg,setInvalidMssg] = useState<boolean>(false);
  const otpToken = getCookie("otpToken");
  const { callApi } = useApi();
  const router = useRouter();
  const formattedNumber = typeof mobileNumber === 'string' 
    ? `+91 ${mobileNumber.slice(0, 2)}******${mobileNumber.slice(-2)}`
    : '';



  const inputRefs = useRef<HTMLInputElement[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const otpValues = watch(['digit1', 'digit2', 'digit3', 'digit4']);

  useEffect(() => {
    // Check if all fields are filled
    if (otpValues.every((value) => value && value.length === 1)) {
      inputRefs.current[3]?.blur(); // Blur the last input field
    }
  }, [otpValues]);

  const handleApiError = (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      if (result?.data?.intent === "INVALID_OTP") {
        // toast.error('Invalid OTP');
        setInvalidMssg(true);
      
      } else if (result?.data?.intent === "OTP_EXPIRED") {
        toast.error('OTP Expired.');
      } else {
        toast.error('Invalid OTP');
      }
    } else {
      toast.error(
        result?.data?.message || 'OTP Verification Failed'
      );
    }
  }




  const resendOTP=async()=>{

     
      
        const payload = {
          mobileNumber: `+91${mobileNumber}`,
          userType: "Buyer",
        
        };


    
    
        try{
          const result =(await callApi(getEndpoint.default.SENDOTP,'POST',payload)) as any;
    
          
   
        if(result.data==null)
          {
            handleApiError(result?.errorData)
          }else{
            toast.success("OTP Resent Successfully",{iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }});
       
            setCookie('otpToken',result?.data?.session)
     
    
            
         
          }
        }catch(e)
        {
          handleApiError(e)
        }finally{
        setIsLoading(false)
        }
     
     
    
    
      }
  

 

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const payloadData = {
      mobileNumber: `+91${mobileNumber}`,
      userType: "Buyer",
      otp: Number(`${data.digit1}${data.digit2}${data.digit3}${data.digit4}`),
    };

    try {
      const result = await callApi(getEndpoint.default.VERIFYOTP, 'POST', payloadData) as any;

      if (result.data == null) {
        handleApiError(result?.errorData);
      } else {

        setCookie('otpToken', result.data?.token);
        toast.success('OTP verified Successfully', {
          iconTheme: {
            primary: '#439787',
            secondary: '#FFFAEE',
          }
        });

        setCookie("encryptedMobile", mobileNumber);

        if (getCookie('passwordNotSet') === 'true') {
          router.push('/set-password');
        } else {
          if (resetPass) {
            router.push(`/reset-password/${result?.data?.token}`);
          } else {
            router.push(`/set-password`);
          }
        }
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setIsLoading(false);
    }
  };


  // const handleInputChange = (onChange: (value: string) => void, value: string, index: number) => {
  //   onChange(value);

  //   // Move focus to next input if value is entered and not on the last input
  //   if (value && index < inputRefs.current.length - 1) {
  //     inputRefs.current[index + 1]?.focus();
  //   } else if (index === inputRefs.current.length - 1) {
  //     // Remove focus if all fields are filled
  //     inputRefs.current[index]?.blur();
  //   }
  // };

  const handleInputChange = (
    onChange: (value: string) => void,
    value: string,
    index: number
  ) => {
    onChange(value);
  
    if (value && index < inputRefs.current.length - 1) {
      // Move focus to next input if value is entered and not on the last input
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      // Move focus to the previous input if the current value is cleared and it's not the first input
      inputRefs.current[index - 1]?.focus();
    } else if (index === inputRefs.current.length - 1 && value) {
      // Remove focus if all fields are filled
      inputRefs.current[index]?.blur();
    }
  };
  

  return (
    <div className="relative mt-30">
      <div className="bg-cover bg-center bg-[url('/images/auth/auth.webp')] h-5/6">
        <div className="bg-opacity-90 h-full flex items-center justify-center py-20 md:py-20">
          <div className="text-center md:p-10 md:pt-10 py-10 md:py-15 max-w-md md:max-w-lg text-white bg-white">
            <h1 className="text-[24px] md:text-3xl font-bold mb-4 text-brown">
              Verify your Number
            </h1>
            <p className="mb-2 md:mb-2 lg:mb-4 text-sm md:text-sm text-brown w-full text-center">
              Enter the code we sent to the number
            </p>
            <p className="text-sm md:text-sm text-brown w-full text-center font-bold">
              {formattedNumber}
            </p>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col p-4">
              <HStack className="py-2 flex justify-center self-center">
              <PinInput>
                    {['digit1', 'digit2', 'digit3', 'digit4'].map((field, index) => (
                      <Controller
                        key={field}
                        name={field}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <PinInputField
                            ref={(el:any) => (inputRefs.current[index] = el)} // Set ref to each input field
                            value={value}
                            onChange={(e) => handleInputChange(onChange, e.target.value, index)}
                            className="text-brown text-center border border-slate-400 rounded-lg p-3 w-[70px] h-[55px]"

                          />
                        )}
                      />
                    ))}
                  </PinInput>
                </HStack>

                <div className="mt-2 h-[20px]">
                  {Object.keys(errors).length>0 ?
                    //  <p key={errorKey} className="text-red text-sm mt-1 text-center">{errors[errorKey]?.message}</p>
                     <p className="text-red text-sm mt-1 text-center">Otp must be exactly 4 digits</p>
                  :<>
                  {
                    invalidMssg ?<> <p className="text-red text-sm mt-1 text-center">Invalid OTP</p></>:<></>

                  }
                  </>}
                                      {/* <p className="text-red text-sm mt-1 text-center">Otp must be exactly 4 digits</p> */}
                </div>

                <div className="flex items-center justify-center mt-3">
                  <div className="flex flex-col md:flex-row gap-4">
                    <CustomButton
                      title={"Continue"}
                      type="submit"
                      className="text-white font-bold h-12 w-full md:w-40 text-sm md:text-md mt-2 md:mt-2"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "white",
                        minWidth: "300px",
                        backgroundColor: "#B90647",
                      }}
                      loading={isLoading}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center mt-3">
                  <p className="text-center text-sm text-brown">If you haven't received any OTP?</p>
                  <p className="text-center text-sm text-secondary" onClick={resendOTP}>
                    <Link href="#" className="text-secondary ml-1 text-md cursor-pointer">Resend</Link>
                  </p>
                </div>

                <button onClick={onPress} className="text-secondary max-w-fit mx-auto mt-3 text-md cursor-pointer bg-transparent border-none">Go Back</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyNumber;
