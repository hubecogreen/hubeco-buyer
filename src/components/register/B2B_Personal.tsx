// ProfileForm.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import CustomInput from "../customInput/CustomTextField";
import CustomButton from "../customButton/CustomButton";
import styles from "./B2B.module.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie, setCookie } from "cookies-next";
import useApi from "../Fetcher/useAPI";
import toast from 'react-hot-toast'
import * as getEndpoint from "../../network/EndPoints";
import useGetBuyer from "../hooks/useGetBuyer";
import axios from "axios";
import * as Webservices from "../../network/WebServices";
import { useB2CContext } from "./context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import useRefreshToken from "../hooks/useRefreshToken";
import Link from "next/link";

interface ProfileFormProps {
  imgSrc: string;

  nextStep:()=>void;
}

const personalSchema = yup.object({
  firstName: yup
  .string()
  .required("First Name is required")
  .matches(/^[^\d]+$/, "First Name cannot contain numbers")
  .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

  // @ts-ignore
  .test(
    "no-leading-space",
    "Empty space at the start is not allowed",
    (value:any) => value && value.trimLeft() === value
  )

  // @ts-ignore
  .test(
    "no-multiple-spaces",
    "Double space are not allowed",
    (value:any) => value && !/\s{2,}/.test(value)
  )
  .min(3, "First Name must be at least 3 characters")
  .matches(/^(?! )(?=.*[^ ]).{3,}(?<! )$/, "No empty spaces and start and end")
  .max(75, "First Name cannot exceed 75 characters"),
  lastName: yup
  .string()
  .required("Last Name is required")
  .matches(/^[^\d]+$/, "Last Name cannot contain numbers")
  .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

  // @ts-ignore
  .test(
    "no-leading-space",
    "Empty space at the start is not allowed",
    (value:any) => value && value.trimLeft() === value
  )

  // @ts-ignore
  .test(
    "no-multiple-spaces",
    "Double space are not allowed",
    (value:any) => value && !/\s{2,}/.test(value)
  )
  .min(3, "Last Name must be at least 3 characters")
  .matches(/^(?! )(?=.*[^ ]).{3,}(?<! )$/, "No empty spaces and start and end")
  .max(75, "Last Name cannot exceed 75 characters"),
  email: yup
  .string()
  .required("Email is required")
  .email("Invalid email address format")
  // .matches(/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/, "Invalid email address format")
  .max(120, "Email address cannot exceed 320 characters"),
  mobile: yup
  .string()
  .required("Mobile Number is required")
  .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")
  .matches(
    /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
    "Characters are not allowed"
  )
  .max(10,'No more than 10 digits')
  .matches(/^[6-9][0-9]*$/, "First number must be between 6 to 9")
  .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits"),
  // .required('This field is required')
  tandc: yup
    .boolean()
    .oneOf([true], "You must agree to the terms of use")
    .required("You must agree to the terms of use"),
  privacyPolicy: yup
    .boolean()
    .oneOf([true], "You must agree to the privacy policy")
    .required("You must agree to the privacy policy"),
});

const B2BPersonal: React.FC<ProfileFormProps> = ({
  imgSrc,

  nextStep
}) => {


  const otpToken=getCookie('otpToken')
  const {callApi}=useApi();
  const { b2bpersonalInfo, setb2bPersonalInfo } = useB2CContext();
  const router =useRouter()
  const buyerInfo=sessionStorage.getItem('buyerUserInfo') as any;
  const buyerDetails=JSON.parse(buyerInfo);



  // console.log('vewrgt',buyerDetails)

  const mobileNumber=JSON.parse(buyerInfo)?.number.replace('+91','');
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid,isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(personalSchema),
    defaultValues: {
      firstName: b2bpersonalInfo?.firstName ?b2bpersonalInfo?.firstName: buyerDetails.firstName?buyerDetails?.firstName: "",
      lastName: b2bpersonalInfo?.lastName ?b2bpersonalInfo?.lastName :buyerDetails.lastName?buyerDetails?.lastName: "",
      mobile: mobileNumber ? mobileNumber : buyerDetails?.number?buyerDetails?.number.replace("+91", ""): "",
      email: b2bpersonalInfo?.email ?b2bpersonalInfo?.email: buyerDetails?.email?buyerDetails?.email: "",
      tandc: false,
      privacyPolicy: false,
    },
  });


  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [extractPathUrl, setExtractPathUrl] = useState("");
  const [fileInput, setFileInput] = useState<string>("");
  const [isOpen,setIsOpen]= useState<boolean>(false);
  const [showModal,setShowModal]= useState<boolean>(false);
  const [disableBack,setDisableBack]= useState<boolean>(false);
  const [imageError, setImageError] = useState<string>('')

  const { getBuyer } = useGetBuyer()
  const { refreshTokens}=useRefreshToken()
  const token =getCookie('token')
  


 // // console.log('b2bpersonalInfo',b2bpersonalInfo)
 

  useEffect(() => {
    if (fileSelected) {
      getMedia();
    }

  
  }, [fileName, fileType]);

  
useEffect(()=>{
  if(b2bpersonalInfo)
    {
      setValue('firstName',b2bpersonalInfo?.firstName)
      setValue('lastName',b2bpersonalInfo?.lastName)
      // setValue('mobile',b2bpersonalInfo?.mobile)
      setValue('email',b2bpersonalInfo?.email)
      setValue('privacyPolicy',b2bpersonalInfo?.privacyPolicy)
      setValue('tandc',b2bpersonalInfo?.tandc)
  
    }
},[b2bpersonalInfo])

useEffect(() => {
  setValue("firstName", b2bpersonalInfo?.firstName  ?b2bpersonalInfo?.firstName: buyerDetails.firstName?buyerDetails?.firstName: "");
  setValue("lastName", b2bpersonalInfo?.lastName  ?b2bpersonalInfo?.lastName :buyerDetails.lastName?buyerDetails?.lastName: "");
  // setValue('mobile',personalInfo?.mobile)
  setValue("email", b2bpersonalInfo?.email  ?b2bpersonalInfo?.email: buyerDetails?.email?buyerDetails?.email: "");
  setValue("privacyPolicy", b2bpersonalInfo?.privacyPolicy);
  setValue("tandc", b2bpersonalInfo?.tandc);
  if(getCookie('privacyPolicyCheck')=='true')
  {
    setValue('privacyPolicy',true)
  }
  if(getCookie('tandcCheck')=='true')
  {
    setValue('tandc',true)
  }
  clearErrors()
},[])

const handleFileInputChange = (file: ChangeEvent) => {


  const selectedFile = file.target.files?.[0]
  if (selectedFile) {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
    const maxSize = 2.5 * 1024 * 1024 // 5MB in bytes

    if (!validTypes.includes(selectedFile.type)) {
      setImageError('Please upload a PNG, JPEG, or JPG file.')
      return
    }

    if (selectedFile.size > maxSize) {
      setImageError('File size exceeds 2.5MB. Please upload a smaller file.')
      return
    }else{
      setImageError('')
    }
  }

  const reader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length !== 0) {
    const uploadedFile = files[0]
    reader.onload = () => {
      // setImgSrc(files[0])
      setFile(files[0])
      setFileInput(reader.result as string)
      setFileName(uploadedFile.name)
      setFileType(uploadedFile.type)
      setFileSelected(true)
    }
    const ab = reader.readAsDataURL(uploadedFile)
   // // console.log(URL.createObjectURL(uploadedFile), 'uploadedFile', ab)
    if (window) {
      const event = new CustomEvent('changeProfile', {
        detail: { url: URL.createObjectURL(uploadedFile), email: getValues('email'), phone: getValues('phoneNumber') }
      })
      window.dispatchEvent(event)
    }
  }
};

  const extractPath = (url: string): string => {
    try {
      const urlObject = new URL(url);
      const fullPath = urlObject.pathname;
      const desiredPath = fullPath.substring(fullPath.indexOf("buyer"));

      return desiredPath;
    } catch (error) {
      // consoleerror("Invalid URL:", error);

      return "";
    }
  };

  const getMedia = () => {
    Webservices.callGetApi(
      getEndpoint.default.GET_PUBLIC_MEDIA +
        "?" +
        "fileName=" +
        fileName +
        "&userType=Buyer&" +
        "fileType=" +
        fileType +
        "&" +
        "intent=" +
        "profilePictures",
      token
    )
      .then(async (response: any) => {
     
        const extractedPath = extractPath(response.data.url);

        setExtractPathUrl(extractedPath);


        if (response.status == 200) {
          const uploadS3 = await axios(response?.data?.url, {
            method: "PUT",
            data: file,
            headers: {
              'Content-Type': fileType
            }
          });

       
        }
      })
      .catch((err:any) => {
       // // console.log(err);
      });
  };
  const handleApiError = async (err: any,data:any) => {
    const result = err && err.response
    setIsOpen(false);
 
      if (result.status == 400) {
      toast.error('Buyer Not Found')
    } else if (result.status == 401) {
await refreshTokens();
handleProfileSubmit(data)
      // toast.error('Unauthorized Request') 
    } else if (result.status ==404) {
      toast.error('Invalid Request')
    }  else if (result.status == 409) {
      if(result?.data?.intent == "EMAIL_ALREADY_REGISTERED")
        {
          // toast.error('Email already taken')
          setError('email', {
            type: 'manual',
            message: 'This email already exists'
          })
        }else if(result?.data?.intent == "PHONE_ALREADY_REGISTERED")
          {
            toast.error('Mobile Number already taken')
          }else{
            toast.error('Buyer Registration Failed')
          }
     
      
    }else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Registration Failed'
      )
    }
  }



  const handleProfileSubmit =async (data: any) => {

    
clearErrors();
    setIsLoading1(true)



      if(getCookie('userRegistered') == 'true')
        {

          const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            displayImage: extractPathUrl?extractPathUrl:b2bpersonalInfo?.displayImage,
            userType: "Buyer",
          };


          try{
            const result =(await callApi(getEndpoint.default.UPDATEBUYER,'PATCH',payload))
            if(result.data==null)
              {
                handleApiError(result?.errorData,data)
              }else{
            
   
            
         // // console.log('resultPaqtch',result)
            toast.success("Personal Information Updated Successfully",{iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }});
            setCookie('userRegistered',true)
            setb2bPersonalInfo({
              email: data.email,
            mobile: `+91${data.mobile}`,
            firstName: data.firstName,
            lastName: data.lastName,
            displayImage: extractPathUrl?extractPathUrl:b2bpersonalInfo?.displayImage,
            privacyPolicy:true,
            tandc:true
            })
            getBuyer(token)
            nextStep();
          }

          }catch(e)
          {
      handleApiError(e,data)
          }finally{
          setIsLoading1(false)
          refreshTokens()
          }
        }else{
          const payload = {
            email: data.email,
            // number: `+91${data.mobile}`,
            firstName: data.firstName,
            lastName: data.lastName,
            displayImage: extractPathUrl,
            // token: otpToken,
            buyerType: "B2B",
          };
          try{
            const result =(await callApi(getEndpoint.default.REGISTER,'POST',payload)) as any;
            if(result.data==null)
              {
                handleApiError(result?.errorData,data)
              }else{
                
            
                setCookie('notLoggedIn','true')
                setCookie('temptoken',result?.data?.token)
                setCookie('temprefreshToken',result?.data?.refreshToken?.token)
                getBuyer(result?.data?.token)
                toast.success("Personal Information Submitted Successfully.",{iconTheme: {
                  primary: '#439787',
                  secondary: '#FFFAEE',
                }});
                setCookie('userRegistered','true')
                setb2bPersonalInfo({
                  email: data.email,
                mobile: `+91${data.mobile}`,
                firstName: data.firstName,
                lastName: data.lastName,
                displayImage: extractPathUrl,
                privacyPolicy:true,
                tandc:true
                })
                nextStep();
              }
            

          }catch(e)
          {
      handleApiError(e,data)
          }finally{
          setIsLoading1(false)
          refreshTokens()
          }
        }

  };



  const onSave=()=>{

    if (
      Object.keys(errors).length === 0 && // No validation errors
      getValues().tandc && // Terms and conditions accepted
      getValues().privacyPolicy && // Privacy policy accepted
      getValues().firstName && // First name is not empty
      getValues().lastName && // Last name is not empty
      getValues().email // Email is not empty
    ) {
      // Open the modal or perform the success action
      setIsOpen(true);
    
      // Clear any existing errors for the fields
      clearErrors('email');
      clearErrors('firstName');
      clearErrors('lastName');
      clearErrors('tandc');
      clearErrors('privacyPolicy');
    } else {
      // Set errors for individual conditions
      if (!getValues().firstName) {
        setError('firstName', {
          type: 'required',
          message: 'First name is required', // Custom error message
        });
      }
      if (!getValues().lastName) {
        setError('lastName', {
          type: 'required',
          message: 'Last name is required', // Custom error message
        });
      }
      if (!getValues().email) {
        setError('email', {
          type: 'required',
          message: 'Email is required', // Custom error message
        });
      }
      if (!getValues().tandc) {
        setError('tandc', {
          type: 'required',
          message: 'You must agree to the terms of use', // Custom error message
        });
      }
      if (!getValues().privacyPolicy) {
        setError('privacyPolicy', {
          type: 'required',
          message: 'You must agree to the privacy policy', // Custom error message
        });
      }
    
      // Keep the modal closed or perform failure action
      setIsOpen(false);
    }
    
  }


  const onPressBack=()=>{
    if(getCookie('userRegistered') == 'true'){
      setDisableBack(true)
    }else{
      router.replace(`/select-buyer-type`)
    }
  }

    


  return (
    <form autoComplete="off" >
      <div className="p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Image
            height={100}
            width={100}
            onError={e => {
              e.currentTarget.src = '/images/user.webp'
            }}
            loading="lazy"
            className="rounded"
            src={file != null ? URL.createObjectURL(file) :getCookie('userRegistered') == 'true' ? b2bpersonalInfo.displayImage!='' ? `${assetURL}/${b2bpersonalInfo?.displayImage}`: imgSrc: imgSrc}
            alt="Profile"
          />
          <div className="flex flex-grow flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Styled label as a button for file upload */}
              <label
                className="cursor-pointer py-2 px-4 rounded inline-block bg-[#0098862E] text-[#009886] transition-all duration-300 ease-in-out"
              >

                {b2bpersonalInfo?.displayImage=='' && file==null   ? 'Upload Profile Picture' : 'Change Profile Picture'}

                <input
                  hidden
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileInputChange}
                  id="account-settings-upload-image"
                />
              </label>
            </div>
            <p className="text-slate-400 text-left">
              Allowed JPG, GIF, or PNG. Max size of 2.5MB
            </p>
            {imageError?
            <p className='text-red  text-left m-0 p-0 text-xs'>{imageError}</p>:<></>}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 p-2 sm:p-5">
          <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
            First Name <span className="text-red">*</span>
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your First Name"
                onChange={onChange}
                value={value}
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                errorMessage={errors.firstName?.message}
              />
            )}
            name="firstName"
          />
        </div>
        <div className="w-full sm:w-1/2 p-2 sm:p-5">
          <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
            Last Name <span className="text-red">*</span>
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your Last Name"
                onChange={onChange}
                value={value}
                // disabled={b2bpersonalInfo?.lastName?true:false}
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                errorMessage={errors.lastName?.message}
              />
            )}
            name="lastName"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 p-2 sm:p-5">
          <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
            Email Address <span className="text-red">*</span>
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your Email ID"
                onChange={onChange}
                value={value}
                isTextArea={false}
                disabled={b2bpersonalInfo?.email?true:false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                errorMessage={errors.email?.message}
              />
            )}
            name="email"
          />
        </div>
        <div className="w-full sm:w-1/2 p-2 sm:p-5">
          <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
            Phone Number<span className="text-red">*</span>
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your Phone Number"
                onChange={onChange}
                disabled={mobileNumber ? true:false}
                value={value}
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                errorMessage={errors.mobile?.message}
              />
            )}
            name="mobile"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className={`${styles.checkboxGroup} mobile-sm:!px-2 md:!px-[24px]`}>

        <div className="flex items-center">  
            <Controller
              name="tandc"
              control={control}
              defaultValue={false}
              render={({field:{ onChange, value} }) => (
                <input
                  id="tandc"
                  type="checkbox"
                  onChange={onChange}
                  checked={value}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 accent-[#B90647]"
                />

              )}
            />
            <label
              htmlFor="tandc"
              className="ms-2 mt-2 md:text-base font-medium text-gray-900 dark:text-gray-300 mobile-sm:!text-md"
            >
              I agree to the{" "}
              <Link
                href="https://hubeco.market/terms-of-use"
                target="_blank"
                className="text-[#009886] hover:underline"
              >

                Terms of Use
              </Link>
              
            </label>
            
          </div>
          {errors.tandc && (
              <span className="text-red text-sm mt-1">
                {errors.tandc.message}
              </span>
            )}
          <div className="flex items-center">
            <Controller
              name="privacyPolicy"
              control={control}
              defaultValue={false}
              render={({field:{ onChange, value} }) => (
                <input
                  id="privacyPolicy"
                  type="checkbox"
                  onChange={onChange}
                  checked={value}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 accent-[#B90647]"
                />

              )}
            />
            <label
              htmlFor="privacyPolicy"
              className="ms-2 mt-2 md:text-base font-medium text-gray-900 dark:text-gray-300 mobile-sm:!text-md"
            >
              I agree to the{" "}
              <Link
                href="https://hubeco.market/privacy-policy"
                target="_blank"
                className="hover:underline text-[#009886]"
              >
                Privacy Policy
              </Link>
              
            </label>
           
          </div>
          {errors.privacyPolicy && (
              <span className="text-red text-sm mt-1">
                {errors.privacyPolicy.message}
              </span>
            )}
        </div>
      </div>
      <div className="md:flex md:flex-row sm:flex-row justify-start mt-4 mobile-sm:grid mobile-sm:grid-cols-2">
        <CustomButton
          title={"Back"}
          className={`ml-3 hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-brown ${disableBack ? 'opacity-50':'opacity-100'} `}
          customStyles={{ backgroundColor: "#E0E0E0" }}
          onPress={onPressBack}
        />
       
          <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
      <Button  
      title={"Save & Continue"}
      onClick={onSave}
      className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white ">Save & Continue</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[98%] max-auto">
      <AlertDialogHeader className="mb-[10px]">
          <AlertDialogTitle className="mb-[5px]">Are you sure you want to continue?</AlertDialogTitle>
          <AlertDialogDescription className="mb-[15px]">
          Please verify your details before submitting. Once submitted, your account will be created.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="md:flex md:flex-row sm:flex-row justify-center items-center mobile-sm:grid mobile-sm:grid-cols-2">
          {/* <AlertDialogCancel onClick={()=>setIsOpen(false)} className="md:h-12 h-8">Cancel</AlertDialogCancel> */}
          <CustomButton
          title={"Cancel"}
          className={`ml-3 hover:bg-primary  h-12 md:h-12 md:w-24  w-24 md:text-md text-sm text-brown ${disableBack ? 'opacity-50':'opacity-100'} `}
          customStyles={{ backgroundColor: "#E0E0E0" }}
          onPress={()=>setIsOpen(false)}
        />
          <CustomButton
          title={"Submit"}
          className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-24  w-24 md:text-md text-sm text-white "
          customStyles={{}}
          onPress={handleSubmit(handleProfileSubmit)}
           type='submit'
           loading={isLoading1}
        />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </div>
    </form>
  );
};

export default B2BPersonal;
