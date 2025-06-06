// ProfileForm.tsx
"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import CustomInput from "../customInput/CustomTextField";
import CustomButton from "../customButton/CustomButton";
// import styles from "./B2C.module.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie, setCookie } from "cookies-next";
import useApi from "../Fetcher/useAPI";
import toast from "react-hot-toast";
import * as getEndpoint from "../../network/EndPoints";
import useGetBuyer from "../hooks/useGetBuyer";
import axios from "axios";
import * as Webservices from "../../network/WebServices";
// import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Label } from "../ui/label";
import { HStack, PinInput, PinInputField, Tooltip } from "@chakra-ui/react";
import useRefreshToken from "../hooks/useRefreshToken";
import Image from "next/image";

// import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

interface ProfileFormProps {
  imgSrc: string;
  // mobileNumber?:any
  nextStep: () => void;
}

const personalSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[^\d]+$/, "First Name cannot contain numbers")
    .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

   
    .test(
      "no-leading-space",
      "Empty space at the start is not allowed",
       // @ts-ignore
      (value) => value && value.trimLeft() === value
    )

    // @ts-ignore
    .test(
      "no-multiple-spaces",
      "Double space are not allowed",
       // @ts-ignore
      (value) => value && !/\s{2,}/.test(value)
    )
    .min(3, "First Name must be at least 3 characters")
    .matches(
      /^(?! )(?=.*[^ ]).{3,}(?<! )$/,
      "No empty spaces and start and end"
    )
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
       // @ts-ignore
      (value) => value && value.trimLeft() === value
    )

    // @ts-ignore
    .test(
      "no-multiple-spaces",
      "Double space are not allowed",
       // @ts-ignore
      (value) => value && !/\s{2,}/.test(value)
    )
    .min(3, "Last Name must be at least 3 characters")
    .matches(
      /^(?! )(?=.*[^ ]).{3,}(?<! )$/,
      "No empty spaces and start and end"
    )
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
    .max(10, "No more than 10 digits")
    .matches(/^[6-9][0-9]*$/, "First number must be between 6 to 9")
    .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits"),
  // .required('This field is required')
});

const otpSchema = yup.object({
  digit1: yup.string().required("Otp must be exactly 6 digits"),
  digit2: yup.string().required("Otp must be exactly 6 digits"),
  digit3: yup.string().required("Otp must be exactly 6 digits"),
  digit4: yup.string().required("Otp must be exactly 6 digits"),
  digit5: yup.string().required("Otp must be exactly 6 digits"),
  digit6: yup.string().required("Otp must be exactly 6 digits"),
});

const B2C_editPersonal: React.FC<ProfileFormProps> = ({
  imgSrc,
  // mobileNumber,
  nextStep,
}) => {
  const { callApi } = useApi();
  const buyerUserInfo = sessionStorage.getItem("buyerUserInfo");

  const buyerInfo = JSON.parse(buyerUserInfo);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(personalSchema),
    defaultValues: {
      firstName: buyerInfo?.firstName ?? "",
      lastName: buyerInfo?.lastName ?? "",
      mobile: buyerInfo?.number.replace(/^\+91/, "") ?? "",
      email: buyerInfo?.email ?? "",
    },
  });

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const {
    handleSubmit: handleSubmit1,
    control: control1,
    clearErrors: clearErrors1,
    reset: reset1,
    getValues: getValues1,
    watch: watch1,
    formState: { errors: errors1 },
  } = useForm({
    resolver: yupResolver(otpSchema),

    mode: "onChange",
  });

  const otpValues = watch1([
    "digit1",
    "digit2",
    "digit3",
    "digit4",
    "digit5",
    "digit6",
  ]);

  const [intialNumber, setIntialNumber] = useState<string>(
    buyerInfo?.number.replace(/^\+91/, "")
  );
  const [intialEmail, setIntialEmail] = useState<string>(buyerInfo?.email);
  // const [mobileValue,setMobileValue]= useState<any>(getValues().mobile);
  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [extractPathUrl, setExtractPathUrl] = useState("");
  const [fileInput, setFileInput] = useState<string>("");
  const [editMobile, setEditMobile] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<any>("");
  const [showVerifyPopup, setShowVerifyPopup] = useState<boolean>(false);
  const [formattedNumber, setFormattedNumber] = useState<any>("");
  const [formattedEmail, setFormattedEmail] = useState<any>("");
  const [changeType, setChangeType] = useState<any>("");
  const [updatedMobile, setUpdatedMobile] = useState<any>(intialNumber);
  const [updatedEmail, setUpdatedEmail] = useState<any>(intialEmail);
  const [imageError, setImageError] = useState<string>("");
  const { refreshTokens } = useRefreshToken();
  const [refresh, setRefresh] = useState<number>(0);
  const { getBuyer } = useGetBuyer();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  const token = getCookie('token')

  useEffect(() => {
    // Check if all fields are filled
    if (otpValues.every((value) => value && value.length === 1)) {
      inputRefs.current[5]?.blur(); // Blur the last input field
    }
  }, [otpValues]);


  useEffect(() => {
    if (fileSelected) {
      getMedia();
    }
  }, [fileType, fileName, refresh]);


  useEffect(() => {
    setIntialNumber(buyerInfo?.number.replace(/^\+91/, ""));
    setIntialEmail(buyerInfo?.email);
    // setUpdatedMobile(updatedMobile)
    // setUpdatedEmail(updatedEmail)
    // // console.log('refreshed',buyerInfo?.number.replace(/^\+91/, ''),updatedMobile,intialNumber)

  }, [updatedMobile, updatedEmail, refresh])



  const handleFileInputChange = (file: ChangeEvent) => {
    const selectedFile = file.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
      const maxSize = 2.5 * 1024 * 1024 // 5MB in bytes

      if (!validTypes.includes(selectedFile.type)) {
        setImageError("Please upload a PNG, JPEG, or JPG file.");
        return;
      }

      if (selectedFile.size > maxSize) {
        setImageError('File size exceeds 2.5MB. Please upload a smaller file.')
        return
      } else {
        setImageError('')
      }
    }

    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      const uploadedFile = files[0];
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
        const event = new CustomEvent("changeProfile", {
          detail: {
            url: URL.createObjectURL(uploadedFile),
            email: getValues("email"),
            phone: getValues("mobile"),
          },
        });
        window.dispatchEvent(event);
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
              "Content-Type": fileType,
            },
          });


        }
      })
      .catch((err: any) => {
        // // console.log(err);
      });
  };

  const handleApiError = async (err: any) => {
    const result = err && err.response;

    if (result.status == 400) {
      if (result?.data?.intent == "EMAIL_ALREADY_REGISTERED") {
        toast.error("Email already taken");
      } else if (result?.data?.intent == "PHONE_ALREADY_REGISTERED") {
        toast.error("Mobile Number already taken");
      } else if (result?.data?.intent == "SAME_EMAIL_FOR_UPDATE") {
        toast.error("Current and New Email cannot be same");
      } else {
        toast.error("Invalid Request");
      }
    } else if (result.status == 401) {
      await refreshTokens();
      // toast.error('Unauthorized Request')
    } else if (result.status == 404) {
      toast.error("Invalid Request");
    } else if (result.status == 409) {
      if (result?.data?.intent == "EMAIL_ALREADY_REGISTERED") {
        toast.error("Email already taken");
      } else if (result?.data?.intent == "PHONE_ALREADY_REGISTERED") {
        toast.error("Mobile Number already taken");
      } else {
        toast.error("Buyer Registration Failed");
      }
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Registration Failed"
      );
    }
  };

  const handleProfileSubmit = async (data: any) => {
    clearErrors();
    setIsLoading1(true);

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      displayImage: extractPathUrl ? extractPathUrl : buyerInfo?.displayImage,
      userType: "Buyer",
    };


    try {
      const result = (await callApi(getEndpoint.default.UPDATEBUYER, 'PATCH', payload))


      // // console.log('resultPaqtch',result)
      if (result.data == null) {
        handleApiError(result?.errorData)
      } else {
        toast.success("Personal Information Updated Successfully", {
          iconTheme: {
            primary: '#439787',
            secondary: '#FFFAEE',
          }
        });
        setCookie('userRegistered', true)
        // nextStep();
        getBuyer(token)
      }
    } catch (e) {
      handleApiError(e)
    } finally {
      setIsLoading1(false)
    }


  };

  const VerifyMobile = async (data: any) => {
    setIsLoading2(true);

    const payload = {
      otp: Number(
        `${data.digit1}${data.digit2}${data.digit3}${data.digit4}${data.digit5}${data.digit6}`
      ),
      otpToken: getCookie("updateMobileOtpToken"),
    };

    try {
      const result = await callApi(
        changeType == "mobile"
          ? getEndpoint.default.UPDATEMOBILE
          : getEndpoint.default.UPDATEEMAIL,
        "POST",
        payload
      );

      // // console.log('resultUpdatePhoen',result)
      if (result.data == null) {
        handleOtpApiError(result?.errorData)
      } else {
        toast.success(changeType == 'mobile' ? "Mobile Number Updated Successfully" : "Email Updated Successfully", {
          iconTheme: {
            primary: '#439787',
            secondary: '#FFFAEE',
          }
        });
        setOtpValue('')
        setShowVerifyPopup(false)
        setEditMobile(false)
        setEditEmail(false)
        await refreshTokens()
        setRefresh(refresh + 1)

        setIntialNumber(buyerInfo?.number)
        setIntialEmail(buyerInfo?.email)
        // setValue1('otp','')
        // trigger1('otp')
        // clearErrors1('otp')
        setIntialEmail(updatedEmail)
        setIntialNumber(updatedMobile)
        setRefresh(refresh + 1)









      }
    } catch (e) {
      handleOtpApiError(e)
    } finally {
      setIsLoading2(false)
    }

  }


  const handleOtpApiError = async (err: any) => {
    const result = err && err.response;

    if (result.status == 400) {
      if (result?.data?.intent == "SAME_EMAIL_FOR_UPDATE") {
        toast.error("Current Email and New Email cannot be same");
      } else if (result?.data?.intent == "INVALID_OTP") {
        toast.error("Invalid OTP");
      } else if (result?.data?.intent == "EMAIL_ALREADY_REGISTERED") {
        toast.error("Email already taken");
      } else if (result?.data?.intent == "PHONE_ALREADY_REGISTERED") {
        toast.error("Mobile Number already taken");
      } else if (result?.data?.intent === "INVALID_OTP") {
        toast.error("Invalid OTP");
      } else if (result?.data?.intent === "OTP_EXPIRED") {
        toast.error("OTP Expired.");
      } else {
        toast.error("Something went wrong.Please try Again");
      }
    } else if (result.status == 401) {
      toast.error("Unauthorized Request");
    } else if (result.status == 404) {
      if (result?.data?.intent == "OTP_EXPIRED") {
        toast.error("OTP Expired");
      } else {
        toast.error("Invalid Request");
      }
    } else if (result.status == 409) {
      if (result?.data?.intent == "EMAIL_ALREADY_REGISTERED") {
        toast.error("Email already taken");
      } else if (result?.data?.intent == "PHONE_ALREADY_REGISTERED") {
        toast.error("Mobile Number already taken");
      } else {
        toast.error("Buyer Registration Failed");
      }
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Update Mobile Number Failed"
      );
    }
  };

  const handleSendOtpApiError = async (err: any, from: any) => {
    const result = err && err.response;

    if (result.status == 400) {
      if (result?.data?.intent == "EMAIL_ALREADY_REGISTERED") {
        toast.error("Email already taken");
      } else if (result?.data?.intent == "PHONE_ALREADY_REGISTERED") {
        toast.error("Mobile Number already taken");
      } else if (result?.data?.intent == "SAME_EMAIL_FOR_UPDATE") {
        toast.error("Current and New Email cannot be same");
      } else if (result?.data?.intent == "SAME_PHONE_FOR_UPDATE") {
        toast.error("Current and New Phone Number cannot be same");
      } else {
        toast.error("Invalid Request");
      }
    } else if (result.status == 401) {
      await refreshTokens();
      if (from == "fromMobile") {
        sendOTP("fromMobile");
      } else if (from == "fromEmail") {
        sendOTP("fromEmail");
      } else {
        toast.error("Session Expired. Please Login Again");
      }
    } else if (result.status == 404) {
      toast.error("Invalid Request");
    } else if (result.status == 409) {
      if (result?.data?.intent == "EMAIL_ALREADY_REGISTERED") {
        toast.error("Email already taken");
      } else if (result?.data?.intent == "PHONE_ALREADY_REGISTERED") {
        toast.error("Mobile Number already taken");
      } else {
        toast.error("Buyer Registration Failed");
      }
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Registration Failed"
      );
    }
  };

  const sendOTP = async (from: any) => {
    if (from == "fromMobile") {
      setChangeType("mobile");
      setOtpValue("");
      const payload = {
        newPhoneNumber: `+91${getValues().mobile}`,
      };

      setFormattedNumber(typeof getValues().mobile === 'string'
        ? `+91 ${getValues().mobile.slice(0, 2)}******${getValues().mobile.slice(-2)}`
        : '')


      try {
        const result = (await callApi(getEndpoint.default.SENDUPDATEPHONEOTP, 'POST', payload))


        // // console.log('resultUpdatePhoenOtp',result)
        if (result.data == null) {
          handleSendOtpApiError(result?.errorData, from)
        } else {
          toast.success("OTP Sent to New Mobile Number", {
            iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }
          });
          setShowVerifyPopup(true)
          setCookie('updateMobileOtpToken', result?.data?.session)
          setOtpValue('')
          setUpdatedMobile(getValues().mobile)



        }
      } catch (e) {
        handleSendOtpApiError(e, from)
      } finally {
        setIsLoading1(false)
      }
    } else {
      setChangeType('email')
      setOtpValue('')
      const payload = {
        newEmail: `${getValues().email}`,
      };
      setFormattedEmail(typeof getValues().email === 'string'
        ? `${getValues().email.slice(0, 3)}********${getValues().email.slice(-4)}`
        : '')


      try {
        const result = (await callApi(getEndpoint.default.SENDUPDATEEMAILOTP, 'POST', payload))


        // // console.log('resultUpdateEmailOtp',result)
        if (result.data == null) {
          handleSendOtpApiError(result?.errorData, from)
        } else {
          toast.success("OTP Sent to New Email", {
            iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }
          });
          setShowVerifyPopup(true)
          setCookie('updateMobileOtpToken', result?.data?.session)
          setOtpValue('')
          setUpdatedEmail(getValues().email)



        }
      } catch (e) {
        handleSendOtpApiError(e, from)
      } finally {
        setIsLoading1(false)
      }
    }

  }

  const onClickEdit = () => {
    // // console.log('onClickEdit',intialNumber,updatedMobile,getValues().mobile)

    if (editMobile) {
      // Reset mobile value to the initial number
      // reset({ mobile: updatedMobile });
      setValue("mobile", updatedMobile);
    }
    setOtpValue("");
    // setValue1('otp','')
    // trigger1('otp')
    // clearErrors1('otp')
    setEditMobile(!editMobile);
  };

  const onClickEditEmail = () => {
    // // console.log('onClickEditEmail',intialEmail,updatedEmail,getValues().email)

    if (editEmail) {
      // Reset mobile value to the initial number
      // reset({ email: updatedEmail });
      setValue('email', updatedEmail);

    }
    setOtpValue('')
    // setValue1('otp','')
    reset1()
    // trigger1('otp')
    clearErrors1();
    setEditEmail(!editEmail);
  }


  const resendOTP = async () => {
    if (changeType == "mobile") {
      setOtpValue("");
      const payload = {
        newPhoneNumber: `+91${getValues().mobile}`,
      };




      try {
        const result = (await callApi(getEndpoint.default.SENDUPDATEPHONEOTP, 'POST', payload))


        // // console.log('resultUpdatePhoenOtp',result)
        if (result.data == null) {
          handleOtpApiError(result?.errorData)
        } else {
          toast.success("OTP Sent to New Mobile Number", {
            iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }
          });
          setShowVerifyPopup(true)
          setCookie('updateMobileOtpToken', result?.data?.session)
          setOtpValue('')



        }
      } catch (e) {
        handleOtpApiError(e)
      } finally {
        setIsLoading1(false)
      }
    } else {

      setOtpValue('')
      const payload = {
        newEmail: `${getValues().email}`,
      };


      try {
        const result = (await callApi(getEndpoint.default.SENDUPDATEEMAILOTP, 'POST', payload))


        // // console.log('resultUpdateEmailOtp',result)
        if (result.data == null) {
          handleOtpApiError(result?.errorData)
        } else {
          toast.success("OTP Sent to New Email", {
            iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }
          });
          setShowVerifyPopup(true)
          setCookie('updateMobileOtpToken', result?.data?.session)
          setOtpValue('')



        }
      } catch (e) {
        handleOtpApiError(e)
      } finally {
        setIsLoading1(false)
      }
    }
  }

  const onClickVerify = async (data: any) => {
    const payloadData = {
      phoneNumber: buyerInfo?.number,
      password: 'Test@1232312',
      resendEmailVerificationLink: true
    }

    try {
      const result = (await callApi(getEndpoint.default.LOGIN, 'POST', payloadData))
      // // console.log('loginresult',result)
      if (result.data == null) {
        handleApiError(result?.errorData)
      } else {
        // // console.log('lggedin',result.data)
        if (result?.data?.intent == "EMAIL_LINK_SENT") {
          // setIsOpen(true)
          toast.success("Verfiy Email link sent to the registered email.", {
            iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }
          })
        } else {
          // setCookie('notLoggedIn','false')
          // setCookie('token',result?.data?.token)
          // setCookie('refreshToken',result?.data?.refreshToken?.token)
          // getBuyer(result?.data?.token)

        }

      }

    } catch (e: any) {
      // // console.log('ererrerr',e)
      handleApiError(e)
    }
  };

  const onCLickClose = () => {
    setShowVerifyPopup(false);
    if (getValues1("otp") != "") {
      reset1();
    }
    setUpdatedMobile(intialNumber);
    setUpdatedEmail(intialEmail);
  };

  const handleInputChange = (
    onChange: (value: string) => void,
    value: string,
    index: number
  ) => {
    onChange(value);

    // Move focus to next input if value is entered and not on the last input
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (index === inputRefs.current.length - 1) {
      // Remove focus if all fields are filled
      // inputRefs.current[index]?.blur();
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(handleProfileSubmit)}>
        <div className="p-4 mb-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Image
              height={100}
              width={100}
              className="rounded"
              src={
                file != null
                  ? URL.createObjectURL(file)
                  : buyerInfo?.displayImage
                  ? `${assetURL}/${buyerInfo?.displayImage}`
                  : "/images/user.png"
              }
              alt="Profile"
            />
            <div className="flex flex-grow flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Styled label as a button for file upload */}
                <label
                  className="cursor-pointer py-2 px-4 rounded inline-block"
                  style={{
                    backgroundColor: "#0098862E", // Custom button background color
                    color: "#009886", // Text color
                    transition: "background-color 0.3s ease", // Smooth transition
                  }}
                >
                  {buyerInfo?.displayImage || file
                    ? "Change Profile Picture"
                    : "Upload Profile Picture"}

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
              {imageError ? (
                <p className="text-red  text-left m-0 p-0 text-xs">
                  {imageError}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 p-2 sm:p-5">
            <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
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
            <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
              Last Name
            </label>
            <Controller
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Enter your Last Name"
                  onChange={onChange}
                  value={value}
                  // disabled={buyerInfo?.lastName?true:false}
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
            <div className="flex  justify-between items-start">
              <label className="flex items-center justify-between  text-gray-700 mb-2 text-black text-base font-medium text-left">
                Email Address <span className="text-red mr-3 ml-1"> *</span>
              </label>
              <p
                onClick={onClickEditEmail}
                className={`${
                  editEmail ? "text-gray" : "text-secondary"
                } text-md cursor-pointer font-semibold mr-1`}
              >
                {editEmail ? "Cancel" : "Edit"}
              </p>
            </div>
            <div className="flex justify-between items-center">
              {editEmail ? (
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Enter your Email ID"
                      onChange={onChange}
                      value={value}
                      isTextArea={false}
                      disabled={editEmail ? false : true}
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
              ) : (
                <CustomInput
                  placeholder="Enter your Email"
                  value={updatedEmail ? updatedEmail : intialEmail}
                  // disabled={editMobile ? false:true}
                  disabled={true}
                  isTextArea={false}
                  customStyles={{
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    color: "black",
                  }}
                />
              )}

              {editEmail ? (
                <Button
                  variant={"outline"}
                  onClick={() => sendOTP("fromEmail")}
                  type="button"
                  title="Verify"
                  color="secondary"
                  className="text-secondary hover:text-secondary hover:bg-white  border-secondary ml-2"
                >
                  Verify
                </Button>
              ) : (
                <></>
              )}
            </div>
            <div className="text-left mt-3">
              {buyerInfo?.emailVerified == false && !errors?.email ? (
                <span className="text-red py-2 mt-1 text-left text-[14px]">
                  * Email is not verified.
                  <span
                    className="text-primary text-[14px] cursor-pointer"
                    onClick={onClickVerify}
                  >
                    {" "}
                    Click Here
                  </span>{" "}
                  to resend verify email link.
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="w-full sm:w-1/2 p-2 sm:p-5">
            <div className="flex  justify-between items-center">
              <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                Phone Number <span className="text-red">*</span>
              </label>
              <p
                onClick={onClickEdit}
                className={`${
                  editMobile ? "text-gray" : "text-secondary"
                } text-md cursor-pointer font-semibold mr-1`}
              >
                {editMobile ? "Cancel" : "Edit"}
              </p>
            </div>
            <div className="flex justify-between items-center">
              {editMobile ? (
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Enter your Phone Number"
                      onChange={onChange} //onChange}
                      value={value}
                      // disabled={editMobile ? false:true}
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
              ) : (
                <CustomInput
                  placeholder="Enter your Phone Number"
                  value={updatedMobile ? updatedMobile : intialNumber}
                  // disabled={editMobile ? false:true}
                  disabled={true}
                  isTextArea={false}
                  customStyles={{
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    color: "black",
                  }}
                />
              )}

              {editMobile ? (
                <Button
                  variant={"outline"}
                  onClick={() => sendOTP("fromMobile")}
                  type="button"
                  title="Verify"
                  color="secondary"
                  className="text-secondary hover:text-secondary hover:bg-white  border-secondary ml-2"
                >
                  Verify
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-start mt-4">
          <CustomButton
            title={"Save "}
            onPress={handleSubmit(handleProfileSubmit)}
            loading={isLoading1}
            className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-32  w-30 md:text-md text-sm text-white "
          />
        </div>
      </form>
      <div>
        <Dialog open={showVerifyPopup} onOpenChange={onCLickClose}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-max">
            {/* <DialogClose className='absolute right-4 top-4'>
            <button className="text-gray-600 hover:text-gray-800" type="button" onClick={onCLickClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </DialogClose> */}
            <DialogHeader className="flex sm:justify-center justify-center items-center ">
              <DialogTitle className="text-center text-2xl mb-4">
                Verify OTP
              </DialogTitle>
              <div className="flex items-center justify-center w-max">
                <p className="my-2 md:my-2 lg:my-2 text-sm md:text-sm text-black  text-center">
                  Enter the code we sent to the{" "}
                  {changeType === "email" ? "Email" : "Mobile"}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <p className=" flex text-sm md:text-sm text-black  text-center font-bold">
                  {changeType === "email" ? formattedEmail : formattedNumber}
                </p>
              </div>
            </DialogHeader>

            <form autoComplete="off" onSubmit={handleSubmit1(VerifyMobile)}>
              <div className=" ">
                <div className="flex sm:justify-evenly justify-evenly items-center my-5">
                  <HStack
                    className="py-2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <PinInput>
                      {[
                        "digit1",
                        "digit2",
                        "digit3",
                        "digit4",
                        "digit5",
                        "digit6",
                      ].map((field, index) => (
                        <Controller
                          key={field}
                          name={field}
                          control={control1}
                          render={({ field: { onChange, value } }) => (
                            <PinInputField
                              ref={(el: any) => (inputRefs.current[index] = el)} // Set ref to each input field
                              value={value}
                              onChange={(e) =>
                                handleInputChange(
                                  onChange,
                                  e.target.value,
                                  index
                                )
                              }
                              className="text-black text-center border border-slate-400 rounded-lg p-3"
                              style={{ width: "70px", height: "55px" }}
                            />
                          )}
                        />
                      ))}
                    </PinInput>
                  </HStack>
                </div>
                <div className="mt-2 h-[20px]">
                  {Object.keys(errors1).length > 0 ? (
                    //  <p key={errorKey} className="text-red text-sm mt-1 text-center">{errors[errorKey]?.message}</p>
                    <p className="text-red text-sm mt-1 text-center">
                      Otp must be exactly 6 digits
                    </p>
                  ) : (
                    <></>
                  )}
                  {/* <p className="text-red text-sm mt-1 text-center">Otp must be exactly 6 digits</p> */}
                </div>
              </div>

              <DialogFooter className="flex sm:justify-center justify-center items-center mt-8">
                <CustomButton
                  type="submit"
                  title="Submit"
                  loading={isLoading2}
                  className="w-28 md:28 bg-secondary hover:bg-primary text-white"
                />
              </DialogFooter>
              <div className="flex sm:justify-center justify-center items-center mt-6">
                <DialogDescription className="text-center text-sm ">
                  If you haven't received any OTP?
                </DialogDescription>
                <button
                  className="text-secondary text-center cursor-pointer font-semibold text-sm ml-3 md:text-sm bg-transparent border-none p-0"
                  onClick={resendOTP}
                >
                  Resend
                </button>
              </div>
            </form>
          </DialogContent>
          {/* </div> */}
        </Dialog>
      </div>
    </div>
  );
};

export default B2C_editPersonal;
