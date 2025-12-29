'use client'
import React, { useEffect, useState } from "react";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../customInput/CustomTextField";

// import { GoEye } from "react-icons/go";
// import axios from "axios";
// import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
// import { saveToken } from "@/reduxStore/slices/userSlice";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import useApi from "../Fetcher/useAPI";
import { useRouter } from "next/navigation";
// import Login from "./Login";
import useGetBuyer from "../hooks/useGetBuyer";

interface Setprops{
token?:string
}

const schema = yup.object({
  newPassword: yup
  .string()
    .required('Password is required')
    .test('hasLowercase', 'Password must contain at least one lowercase letter', value => /[a-z]/.test(value))
    .test('hasUppercase', 'Password must contain at least one uppercase letter', value => /[A-Z]/.test(value))
    .test('hasNumber', 'Password must contain at least one number', value => /\d/.test(value))
    .test('hasSpecialChar', 'Password must contain at least one special character', value => /[@$!%*?&]/.test(value))
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password can be at most 16 characters')
    .matches(/^[A-Za-z\d@$!%*?&]{8,}$/, 'Password can only contain letters, numbers, and special characters'),
  confirmPassword: yup
  .string()
  .required('Confirm Password is required')
  .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});



const SetPassword:React.FC<Setprops> = ({token}) => {
  const { callApi } = useApi()

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {getBuyer}=useGetBuyer()
  
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors,isSubmitting },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
    mode:'onChange'
  });


  const [isLoadingState, setIsLoadingState] = useState(false)
  const [unauthenticated, setUnauthenticated] = useState(false)
  const dispatch = useDispatch()
  const router=useRouter()
  const otpToken=getCookie('otpToken')

  const handleApiError = async (err: any) => {
    const result = err && err.response
   // // console.log('errresult',err)
    if (result.status === 401) {
      toast.error('Unauthorized Request to Set Password')
    } else if (result.status === 400) {
      toast.error('Invalid Request to Set Password')
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Set Password Failed'
      )
    }
  }


  const Login=async (password:any)=>{



    const payloadData = {
      phoneNumber:  `+91${getCookie('encryptedMobile')}`,
      password: password,
      resendEmailVerificationLink: false
    }

    try{
      const result =(await callApi(getEndpoint.default.LOGIN,'POST',payloadData))
      
      if(result.data==null)
        {
          handleApiError(result?.errorData)
        }else{
         // // console.log('lggedin',result.data)
          if(result?.data?.intent=="EMAIL_LINK_SENT")
            {
   
              // toast.success("An email has been sent to your registered email address. Please verify your email address to continue.")
            }else{

              

              setCookie('notLoggedIn','false')
              setCookie('token',result?.data?.token)
              setCookie('refreshToken',result?.data?.refreshToken?.token)
              getBuyer(result?.data?.token)
              router.replace('/select-buyer-type')
            }
         
        }
      
    }catch(e:any){
     // // console.log('ererrerr',e)
      handleApiError(e)
    }finally{

    }


  }



  const onSubmit = async (data: any) => {
    setIsLoadingState(true)
    const payloadData = {
      newPassword: data.newPassword,
      token:otpToken
    }

    try{
      const result =(await callApi(getEndpoint.default.SETPASSWORDWITHOTPTOKEN,'PATCH',payloadData))
     // // console.log('setPassresult',result);
      if(result.data==null)
        {
          handleApiError(result?.errorData)
        }else{
     
      toast.success("Password Set Successfully",{iconTheme: {
        primary: '#439787',
        secondary: '#FFFAEE',
      }});
    
   Login(data?.newPassword)
   
        }


    }catch(e)
    {
      handleApiError(e)
    }finally{
      setIsLoading(false)
    }

  }


  return (
    <div className="relative mt-30">
      <div
        className="bg-cover bg-center bg-[url('/images/auth/auth.webp')] h-5/6"
      >
        <div className=" h-full flex items-center justify-center py-20 md:py-10 px-[10px] md:px-0">
          <div className="text-center py-10 md:py-15 max-w-full md:max-w-lg  text-white bg-white">
            <h1 className="text-[24px] md:text-3xl  font-bold mb-4 text-brown">
              Set Password 🔒
            </h1>
            <div className="flex items-center justify-center">
              <p className="mb-2 md:mb-2 lg:mb-4 text-sm md:text-base text-brown w-10/12 text-center">
                Please set your password to continue
              </p>
            </div>
<div className="flex items-center justify-center">
            <form
              // noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              //   className="flex flex-col gap-5"
            >
              
              <div className="">
                <div className="p-4 inline-block max-w-full h-[120px] md:w-10/12 w-[98%]">
                  <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
                    Password<span className="text-red">*</span>
                  </label>
                  <Controller
                    rules={{
                      required: true,
                    }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput
                        placeholder="Enter Your Password"
                        onChange={onChange}
                        type="password"
                        value={value}
                        customStyles={{
                          // backgroundColor: "#F3F3F3",
                          border: "1px solid #E0E0E0",
                          borderRadius: "5px",
                          // width: "400px",
                        }}
                        extraClassnames="custom-input  md:w-[400px]  w-[100%]"
                        errorMessage={errors.newPassword?.message}
                        errorStyle={{}}
                      />
                    )}
                    name="newPassword"
                  />
                </div>
                <div className="p-4 inline-block max-w-full h-[120px] md:w-10/12  w-[98%]">
                  <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
                    Confirm Password<span className="text-red">*</span>
                  </label>
                  <Controller
                    rules={{
                      required: true,
                    }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput
                        placeholder="Confirm Password"
                        onChange={onChange}
                        type="password"
                        value={value}
                        customStyles={{
                          // backgroundColor: "#F3F3F3",
                          border: "1px solid #E0E0E0",
                          borderRadius: "5px",
                          // width: "400px",
                        }}
                        extraClassnames="custom-input  md:w-[400px] w-[100%]"
                        errorMessage={errors.confirmPassword?.message}
                      />
                    )}
                    name="confirmPassword"
                  />
                </div>
                <div className="px-4 inline-block max-w-full text-left md:w-10/12  w-[98%]">
                  <div>
                  <h1 className="text-xs pb-3 text-brown">Password Requirements :</h1>
                  <ul className="list-disc pl-5">
                  <li className="pb-3 text-xs text-brown">
                      Minimum 8 characters long - the more, the better
                    </li>
                    <li className="pb-3 text-xs text-brown">
                      At least one lowercase and uppercase character
                    </li>
                    <li className="pb-3 text-xs text-brown">
                      At least one number or symbol
                    </li>
                  </ul>
                  </div>
                </div>
                <div className="px-4 inline-block max-w-full text-left md:w-10/12  w-[98%]">
                  <div className=" ">
                    <CustomButton
                      title={"Submit"}
                      type="submit"
                      className="text-white font-bold h-12 w-[100%] md:min-w-[400px] text-sm md:text-md mt-2 md:mt-2"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "white",
                        // minWidth: "400px",
                        backgroundColor: "#B90647",
                      }}
                      loading={isLoadingState}
                    />
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
export default SetPassword;
