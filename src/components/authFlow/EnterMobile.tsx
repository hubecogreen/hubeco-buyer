"use client"

import React, { useState } from "react";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../customInput/CustomTextField";
import { toast } from 'react-hot-toast';
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";


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

interface MobileProps{
    onPress?:(data:boolean) => void;
}

const EnterMobile:React.FC<MobileProps> = ({onPress}) => {
  const [otpVerified, setOtpVerified] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstStep,setFirstStep]= useState<boolean>(false);

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




  // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI5MDk5OTlAeW9wbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJ1c2VySWQiOiIzN2UyNDRkYi05M2MzLTQwYzQtODNjMy0wMTkxZTI5ZDZiMGQiLCJ1c2VyVHlwZSI6IkJ1eWVyIiwic2Vzc2lvbklkIjoiMTc3NDlkNzAtODg2Ny00MWNmLTkwYjUtYzc5ZGE2N2RmZGY4IiwidGh1bWJuYWlsIjoiaHR0cHM6Ly93d3cuaWFtZ2NvbmZlcmVuY2VzLm9yZy9pYW1nMjAyMi9pbWFnZXMvaWFtZzIwMjIucG5nIiwicGhvbmVOdW1iZXIiOiIyOXpodHpzZndDVHVtVXF2eGU3SmxSMEJTUDI0R2p5ak0ybG45d2c9IiwiaWF0IjoxNzIyMjQ1NTAwLCJleHAiOjE3MjQ4Mzc1MDB9.lJxAGv3rlIU76d_WGWscXE3sR5DlbqCrol-mnA2bxeU"

  const onSubmit = (data: any) => {
    //// // console.log("formmmmm",data);
    setIsLoading(true);
    
    setMobileNumber(data.mobile);
  
    const payloadData = {
      mobileNumber: `+91${data.mobile}`,
      userType: "Buyer"
    };

     Webservices.callPostApi(getEndpoint.default.SENDOTP, payloadData, '')
      .then((result:any) => {
        if (result.status === 201) {
         
          setIsLoading(false);
          toast.success("OTP sent successfully",{iconTheme: {
            primary: '#439787',
            secondary: '#FFFAEE',
          }});
          setOtpVerified(result.data.optVerified);
          
          onPress(true)
       
        } else {
          setIsLoading(false);
          toast.error("User does not exist");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(
          err && err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Login Failed"
        );
      });
  };





  return (
    <div className="relative">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url(images/auth/auth.png)" }}
      >
        <div className="bg-opacity-90 h-full flex items-center justify-center py-20 md:py-20">
          <div className="text-center py-10 md:py-15 max-w-md md:max-w-lg  text-white bg-white">
            <h1 className="text-4xl md:text-3xl  font-bold mb-4 text-black">
              Welcome to{" "}
              <span className="text-primary text-xl md:text-2xl lg:text-3xl font-bold">
                hubeco
              </span>
              👋🏻
            </h1>
            <div className="flex items-center justify-center">
              <p className="mb-2 md:mb-2 lg:mb-4 text-sm md:text-base text-black w-10/12 text-center">
              Discover sustainable products that make a positive impact effortlessly.
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
                          width: "400px",
                        }}
                        extraClassnames="custom-input "
                        errorStyle={{color:'red'}}
                        errorMessage={errors.mobile?.message}
                        isMobileInput // This prop enables the restriction for the mobile number field
                      />
                    )}
                    name="mobile"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex flex-col md:flex-row gap-4">
                    <CustomButton
                      title={"Continue"}
                      className="text-white font-bold h-12 w-full md:w-40 text-sm md:text-md mt-2 md:mt-2"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "white",
                        minWidth: "400px",
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnterMobile;
