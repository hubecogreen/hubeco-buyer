import React, { useEffect, useState } from "react";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../customInput/CustomTextField";
// import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import ForgotPassword from "./ForgotPassword";
import { AiFillEdit } from "react-icons/ai";
import useGetBuyer from "../hooks/useGetBuyer";
import useApi from "../Fetcher/useAPI";
import { setCookie } from "cookies-next";
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
import Lottie from "lottie-react";
import animationData from '../../../public/animations/verfiyemailpending.json'
import { IoIosClose } from "react-icons/io";
import Link from "next/link";

const schema = yup.object({
  mobile: yup
    .string()
    .required("This field is required")
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .length(10, "Mobile number must be exactly 10 digits"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be of minimum 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
});

interface LoginProps{
  mobile?:string
  onPress?:() => void;
  fromPage?:string;
  resetPass?:()=>void;
}


const Login:React.FC<LoginProps> = ({mobile,onPress,fromPage,resetPass}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen,setIsOpen]=useState<boolean>(false)
  const [isLoading1,setIsLoading1]=useState<boolean>(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to toggle Forgot Password
  const urlParams=useSearchParams()
  const fromUrl=urlParams.get('fromPage')
 // // console.log('firstvwvr',fromUrl)

  // const handleForgotPasswordClick = () => {
  //   // setShowForgotPassword(true);
    
  //   resetPass()

  // };



  const {
    control,
    handleSubmit,
    getValues,
    setValue,
  
    formState: { errors ,isSubmitting},
  } = useForm({
    defaultValues: {
      mobile: mobile?mobile:'',
      password: "",
    },
    resolver: yupResolver(schema),
  });

  //// // console.log('mobileLogn',getValues(),mobile)

  const router = useRouter();
  const { getBuyer } = useGetBuyer()
  const { callApi } = useApi()


  useEffect(() => {
 
 if(fromUrl=='forget')
      {
        setShowForgotPassword(false)
      }else{
        setShowForgotPassword(false)
      }



 
  }, [setValue,fromUrl])



  const handleApiError = async (err: any) => {
    const result = err && err.response
   // // console.log('errresult',err)
    if (result?.status === 401) {
      toast.error('Invalid Credentials')
    } else if (result?.status === 400) {
      if(result?.data?.intent=="CANT_LOGIN")
        {
          toast.error('Unable to Login.Please contact support.')
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

  const onSubmit = async (data: any) => {
    setIsLoading(true)


    const payloadData = {
      phoneNumber:  `+91${data.mobile}`,
      password: data.password,
      resendEmailVerificationLink: false
    }
    
    try{
      const result =(await callApi(getEndpoint.default.LOGIN,'POST',payloadData)) as any;
     // // console.log('loginresult',result)
      if(result.data==null)
        {
          handleApiError(result?.errorData)
        }else{
         // // console.log('lggedin',result.data)
          if(result?.data?.intent=="EMAIL_LINK_SENT")
            {
              setIsOpen(true)
              // toast.success("An email has been sent to your registered email address. Please verify your email address to continue.")
            }else{
              setCookie('notLoggedIn','false')
              setCookie('token',result?.data?.token)
              setCookie('refreshToken',result?.data?.refreshToken?.token)
              getBuyer(result?.data?.token)
              router.push('/')
              toast.success("Logged In Successfully",{iconTheme: {
                primary: '#439787',
                secondary: '#FFFAEE',
              }})
            }
         
        }
      
    }catch(e:any){
     // // console.log('ererrerr',e)
      handleApiError(e)
    }finally{
setIsLoading(false)
    }

    
   

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
      if(result.data==null)
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
      {!showForgotPassword ? ( // Show login form if not in forgot password state
        <div className="bg-cover bg-center bg-[url('/images/auth/auth.png')] h-5/6">
         <div className="h-full flex items-center justify-center py-20 md:py-10 px-[10px] md:px-0">
          {/* <div className=" flex items-center justify-center py-10 md:py-15 w-11/12  px-4 md:max-w-lg   bg-white"> */}
           <div className="text-center py-10 md:py-15 max-w-full md:max-w-lg  text-white bg-white">
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
             <div className="flex items-center justify-center">
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div>
                <div className="p-4 inline-block max-w-full h-[120px] md:w-10/12 w-[98%]">
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
                        disabled={true}
                        value={value}
                        customStyles={{
                          border: "1px solid #E0E0E0",
                          borderRadius: "5px",
                          // width: "400px",
                        }}
                        rightIcon={<AiFillEdit onClick={onPress}  className="text-black w-4 h-4 " />}
                        iconClassnames="right-3"
                        extraClassnames="custom-input  md:w-[400px] w-[100%]"
                        errorMessage={errors.mobile?.message}
                        isMobileInput // This prop enables the restriction for the mobile number field
                      />
                    )}
                    name="mobile"
                  />
                </div>
                <div className="p-4 inline-block max-w-full h-[120px] md:w-10/12 w-[98%]">
                  <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                    Password<span className="text-red font-light pl-1">*</span>
                  </label>
                  <Controller
                    rules={{
                      required: true,
                    }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput
                        placeholder="Password "
                        onChange={onChange}
                        type="password"
                        value={value}
                        // rightIcon={<GoEye className={errors.password?.message ? 'text-red ':'text-black'} />}
                        customStyles={{
                          border: "1px solid #E0E0E0",
                          borderRadius: "5px",
                          // width: "400px",
                        }}
                        errorStyle={{}}
                        iconClassnames="items-center flex"
                        extraClassnames="custom-input  md:w-[400px] w-[100%]"
                        errorMessage={errors.password?.message}
                      />
                    )}
                    name="password"
                  />
                </div>
                <div className="p-4 inline-block max-w-full h-[120px] md:w-10/12 w-[98%]">
                  <div className="">
                    <CustomButton
                      title={"Login"}
                      className="text-white font-bold h-12 w-[100%] md:min-w-[400px] text-sm md:text-md mt-2 md:mt-2"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "white",
                        // minWidth: "400px",
                        backgroundColor: "#B90647",
                      }}
                      loading={isLoading}
                      type="submit"
                    />
                  </div>
                </div>
              
                </div>
              </form>
             
              </div>
              <div className="flex items-center justify-center">
                  {!showForgotPassword && ( // Display "Forgot Password" link only when login form is visible
                    <p className="text-sm md:text-base text-black w-10/12 text-center">
                    <button
                      onClick={resetPass}
                      className="text-[#B90647]"
                    >
                      Forgot Password?
                    </button>
                  </p>
                  
                  )}
                </div>
              </div>
          {/* </div> */}
        </div>
          <Dialog open={isOpen} >
            
      {/* <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger> */}
     
      <DialogContent  className="sm:max-w-md">
      <DialogClose onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
      <IoIosClose className="w-6 h-6  z-10 bg-white  text-black" />


      </DialogClose>
  

        <DialogHeader>
            <Lottie
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
          {/* <Dialog open={isOpen}>
      
      <DialogContent className="custom-dialog" >
      
        <DialogHeader >
  
        <Lottie className="flex justify-center self-center" animationData={animationData} loop={true} style={{ width: 100, height: 100 }} />
          <DialogTitle className="text-center">Your Email is Not Verified</DialogTitle>
          <DialogDescription className="text-center">
          A verification link has been sent to your email. Please click on the link to verify your email.
          </DialogDescription>
        </DialogHeader>
      
        <DialogFooter className="flex items-center justify-self-center self-center mt-5"> */}
        {/* <DialogClose asChild>
            <Button type="button" className="border-0" variant='outline'>
              X
            </Button>
          </DialogClose> */}
        {/* <DialogDescription className="text-center text-sm">
          If you haven't received any email?
          </DialogDescription>
          <a  className="text-secondary  text-center cursor-pointer font-semibold text-sm  md:text-sm " onClick={resendEmail}> 
            Resend
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog> */}
        </div>
      ) : (
        // Show ForgotPassword component
        <ForgotPassword mobile={mobile} />
      )}
    </div>
  );
};

export default Login;
