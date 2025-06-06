'use client'
import React, { useEffect, useState } from "react";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../customInput/CustomTextField";

// import { GoEye } from "react-icons/go";
import axios from "axios";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveToken } from "@/reduxStore/slices/userSlice";
import { deleteCookie } from "cookies-next";
import useApi from "../Fetcher/useAPI";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
// import Login from "./Login";
import Lottie from "lottie-react";
// import animationData from '../../../public/animations/verifyyouremail.json';
import successAnimation from '../../../public/animations/emailverified.json';
import animationDataFailed from '../../../public/animations/failed.json';

interface Resetprops{
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



const ResetPassword:React.FC<Resetprops> = ({token}) => {
  const { callApi } = useApi()



  const [isLoading, setIsLoading] = useState<boolean>(false);

    
   
  
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

  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [isLoadingState, setIsLoadingState] = useState(false)
  const [unauthenticated, setUnauthenticated] = useState(false)
  const [passwordSet,setPasswordSet]= useState(false)
  const dispatch = useDispatch()
  const router=useRouter()


  console.log('checktoken', token)

  const handleApiError = (err: any) => {
    if (!err.response) {
      // Network error
      toast.error('Network error: Please check your internet connection.')

      return
    }

    const status = err.response.status
    const message = err.response.data?.message || ''

    switch (status) {
      case 400:
        // Validation error
        toast.error('Reset Link has been Expired.Try Again')
        router.push('/login')
        break

      case 401:
        // Unauthorized access
        setUnauthenticated(true)
        toast.error('Reset Link has been Expired.Try Again')
        router.push('/login')
        break

      case 403:
        // Forbidden
        toast.error('You do not have permission to perform this action.')
        break

      case 404:
        // Not Found
        toast.error('Buyer Not Found')
        break

      case 429:
        // Too Many Requests
        toast.error('Too many requests: Please slow down and try again later.')
        break

      case 500:
        // Internal Server Error
        toast.error('Server error: Something went wrong on our end. Please try again later.')
        break

      case 503:
        // Service Unavailable
        toast.error('Service unavailable: Please try again later.')
        break

      default:
        // Fallback for other errors
        toast.error(message || 'An unexpected error occurred. Please try again.')
        break
    }
  }

  const handleApiSuccess = (result: any) => {
    if (result.status === 200) {
      setIsLoadingState(false)
      reset()
      toast.success('Password Reset Successfully',{iconTheme: {
        primary: '#439787',
        secondary: '#FFFAEE',
      }})

      setPasswordSet(true)
      
      dispatch(saveToken(''))
      deleteCookie('token')
      deleteCookie('refreshToken')

      router.push('/login')

    } else {
      toast.error('Password Reset Failed')
    }
  }

  const onSubmit = async (data: any) => {
    setIsLoadingState(true)
   // // console.log('newPass',data)
    const payloadData = {
      newPassword: data.newPassword,
      token:token
    }

    if (isSubmitting) return
    await axios
      .patch(`${Webservices.baseURL}/${getEndpoint.default.SETPASSWORDWITHOTPTOKEN}`, payloadData, {
        // headers: {
        //   resettoken: token
        // }
      })
      .then(handleApiSuccess)
      .catch(handleApiError)
      .finally(() => setIsLoadingState(false))
  }

  async function validateToken() {
    const res = await callApi(`auth/validateTempSession/SIGNUP/${token}`, 'GET')
  
    if (res.data == null) {
      setUnauthenticated(true)
     // // console.log('unauth')
    } else {
      setUnauthenticated(false)
     // // console.log('auth')
    }
  }
  
  useEffect(() => {
    validateToken()
  }, [])
  return (
    <div className="relative">
      <div
         className="bg-cover bg-center py-2"
         style={{ backgroundImage: "url(/images/auth/auth.png)" }}
      >
        <div className="bg-white max-w-md md:max-w-lg mx-auto h-full my-16 flex items-center rounded-lg justify-center py-5 md:py-5">
          
          {unauthenticated == false ? 
          passwordSet==false?
          (
          <div className="text-center py-5 md:py-5 max-w-md md:max-w-lg  text-white bg-white">
          <h1 className="text-[24px] md:text-3xl  font-bold mb-4 text-black">
              Reset Password 🔒
            </h1>
            <div className="flex items-center justify-center">
              <p className="mb-2 md:mb-2 lg:mb-4 text-sm md:text-base text-black w-10/12 text-center">
                Please set your password to continue
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
                  New Password <span className="text-red">*</span>
                </label>
                <Controller
                  rules={{
                    required: true,
                  }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Enter Your New Password"
                      onChange={onChange}
                      type="password"
                      value={value}
                      customStyles={{
                        // backgroundColor: "#F3F3F3",
                        border: "1px solid #E0E0E0",
                        borderRadius: "5px",
                        width: "400px",
                      }}
                      extraClassnames="custom-input "
                      errorMessage={errors.newPassword?.message}
                      errorStyle={{width: "400px",}}
                    />
                  )}
                  name="newPassword"
                />
              </div>
              <div className="p-4 inline-block max-w-full ">
                <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                  Confirm Password <span className="text-red">*</span>
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
                        width: "400px",
                      }}
                      extraClassnames="custom-input "
                      errorMessage={errors.confirmPassword?.message}
                    />
                  )}
                  name="confirmPassword"
                />
              </div>
              <div className="px-4 inline-block max-w-full text-left md:w-10/12  w-[98%]">
                  <div>
                  <h1 className="text-xs pb-3 text-black">Password Requirements :</h1>
                  <ul className="list-disc pl-5">

                    <li className="pb-3 text-xs text-black">
                      Minimum 8 characters long - the more, the better
                    </li>
                    <li className="pb-3 text-xs text-black">
                      At least one lowercase and uppercase character
                    </li>
                    <li className="pb-3 text-xs text-black">
                      At least one number or symbol
                    </li>
                  </ul>
                  </div>
                </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col md:flex-row gap-4">
                  <CustomButton
                    title={"Submit"}
                    type="submit"
                    className="text-white font-bold h-12 w-full md:w-40 text-sm md:text-md mt-2 md:mt-2"
                    customStyles={{
                      border: "1px solid #FFFFFF",
                      color: "white",
                      minWidth: "400px",
                      backgroundColor: "#B90647",
                    }}
                    //   hoverBgColor="#A92449"
                    //   hoverColor="black"
                    loading={isLoadingState}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        ):(
          <div className='text-8xl p-4 flex justify-center flex-col items-center'>
          <Lottie
            loop
            animationData={successAnimation}
            className="w-[200px] h-[200px]"
          />
          <p  className='text-center  text-black font-semibold text-lg my-6'>
            Your password has been reset successfully
          </p>
          <CustomButton  title='Login' onPress={() => router.push('/login')}  className="md:ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-28  w-28 md:text-md text-sm text-white "   type='button' />
        </div>
        )
        :
        (
          <div className='text-8xl p-4 flex justify-center flex-col items-center'>
          <Lottie
            loop
            animationData={animationDataFailed}
            className="w-[200px] h-[200px]"
          />
          <h4  className='text-center mt-6 text-2xl'>
            Your reset password link has been expired
          </h4>
          <div className='flex justify-center items-center flex-wrap gap-2 mt-5'>
            <p className='flex justify-center items-center mt-4' color='primary'>
              <span className="text-base text-fontGray font-normal">Please go to login and request new one.</span>
              <Link href='/login' className='flex text-base ml-2 text-secondary items-center font-semibold gap-1.5  hover:underline '>
                <span>Go to Login</span>
              </Link>
            </p>
          </div>
        </div>
        )
      }
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
