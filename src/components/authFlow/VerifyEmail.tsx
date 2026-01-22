"use client";
import React, { useState } from "react";
// import * as yup from "yup";
import { CircularProgress, HStack, PinInput, PinInputField } from "@chakra-ui/react";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Store from '@/reduxStore'
// import { saveOtpToken } from "@/reduxStore/slices/userSlice";
import { useDispatch } from "react-redux";
// Removed incorrect import with mismatched casing


// const schema = yup.object({
//   otp: yup
//     .number()
//     .required("This field is required")
//     .typeError("OTP must be a number"),
// });

interface VerfiyEmailProps{
mobileNumber:any
}



const VerifyEmail:React.FC<VerfiyEmailProps> = ({ mobileNumber }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  



  const dispatch = useDispatch();
 

  const token = Store.getState().user.token

//  // // console.log('mobib',mobileNumber)

  const onSubmit = () => {
    setIsLoading(true);
    const payloadData = {
      phoneNumber: `+91${mobileNumber}`,
      password: 'hubecotest',
      resendEmailVerificationLink: true,
    };
   

    Webservices.callPostApi(getEndpoint.default.LOGIN, payloadData, "")
      .then((result) => {
       // // console.log("FormData----", result.data.token);

        if (result.status === 201) {
          setIsLoading(false);
       
          // dispatch(setUser(result.data.user))
          toast.success("We've sent a new verification link to your registered email. Kindly check your inbox to verify your mail.",{iconTheme: {
            primary: '#439787',
            secondary: '#FFFAEE',
          }});
    
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
        style={{ backgroundImage: "url(images/auth/auth.webp)" }}
      >
        <div className="bg-opacity-90 h-full flex items-center justify-center py-20 md:py-20">
          <div className="text-center md:p-10 md:pt-10 py-10 md:py-15 max-w-md md:max-w-lg text-white bg-white">
            <h1 className="text-4xl md:text-3xl font-bold mb-4 text-brown">
              Verify your Email
            </h1>
            <div className="flex items-center justify-center">
              <p className="mb-2 md:mb-2 lg:mb-4 text-sm md:text-sm text-brown w-10/12 text-center">
              To proceed, please ensure that you have verified your registered email address.A link is sent to your registered email.
              </p>
            </div>
           
    
              <div className="flex flex-col p-4">
                
             
                <div className="flex items-center justify-center">
                  <div className="flex flex-col md:flex-row gap-2 items-center">
                    <p className="text-brown text-sm">Didn't get the mail?</p>
                    {isLoading?
                    <CircularProgress  isIndeterminate size={20} color="#A92449"  />
                    :
                    <Link href="#" onClick={(e) => { e.preventDefault(); onSubmit(); }} className="text-secondary text-sm font-normal underline hover:cursor-pointer ">Resend</Link>
}
                  </div>
                </div>
              </div>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
