"use client";

import Image from "next/image";
import styles from "./editprofile.module.css";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import B2C_editPersonal from "@/components/edit-profile/B2C_editPersonal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import { toast } from 'react-hot-toast';
import axios from "axios";
// import { saveToken, saveRefreshToken } from "@/reduxStore/slices/userSlice";
import { useDispatch } from "react-redux";
import Store from '@/reduxStore'
import B2C_editAddress from "@/components/edit-profile/B2C_editAddress";
import B2C_changePassword from "@/components/edit-profile/B2C_changePassword";

const personalSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[^\d]+$/, "Name cannot contain numbers")
    .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

    
    .min(3, "Name must be at least 3 characters")
    .matches(/^(?! )(?=.*[^ ]).{3,}(?<! )$/, "Enter valid name")
    .max(75, "Name cannot exceed 75 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .matches(/^[^\d]+$/, "Name cannot contain numbers")
    .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

    .min(3, "Name must be at least 3 characters")
    .matches(/^(?! )(?=.*[^ ]).{3,}(?<! )$/, "Enter valid name")
    .max(75, "Name cannot exceed 75 characters"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    )
    .test(
      "no-consecutive-dots",
      "Email cannot have consecutive dots",
      (value) => {
        if (typeof value === "string") {
          return !value.includes("..");
        }
        return true;
      }
    ),
  mobile: yup
    .string()
    .required("Mobile is required")
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .length(10, "Mobile number must be exactly 10 digits"),
  // .required('This field is required')
  tandc: yup.boolean().oneOf([true], 'You must agree to the terms of use').required('This field is required'),
  privacyPolicy: yup.boolean().oneOf([true], 'You must agree to the privacy policy').required('This field is required')
});
const addressSchema = yup.object({
  address: yup
    .string()
    .trim("Address cannot have empty spaces at start or end")
    .strict(true)
    .required("Address is required")
    .max(75, "Address must be at most 75 characters"),
  landmark: yup.string().max(20, "Address must be at most 20 characters"),
  city: yup
    .string()
    .trim("City cannot have leading or trailing spaces")
    .strict(true)
    .required("City is required")
    .max(50, "City must be at most 50 characters"),
  state: yup
    .string()
    .trim("State cannot have leading or trailing spaces")
    .strict(true)
    .required("State is required")
    .max(50, "State must be at most 50 characters"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[1-9][0-9]{5}$/, "Pincode must be a valid 6 digit number"),
  country: yup
    .string()
    .trim("Country cannot have leading or trailing spaces")
    .strict(true)
    .required("Country is required")
    .max(50, "Country must be at most 50 characters"),
  // defaultAddress: yup.boolean().oneOf([true], 'You must agree to the terms and conditions').required('This field is required'),
});

const securitySchema = yup.object().shape({
  currentPassword: yup
  .string()
  .required('Password is required')
  .min(8, 'Password should be of minimum 8 characters')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'
  ),
  newPassword: yup
    .string()
    .required("Password is required")
    .test(
      "hasLowercase",
      "Password must contain at least one lowercase letter",
      (value) => /[a-z]/.test(value)
    )
    .test(
      "hasUppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value)
    )
    .test("hasNumber", "Password must contain at least one number", (value) =>
      /\d/.test(value)
    )
    .test(
      "hasSpecialChar",
      "Password must contain at least one special character",
      (value) => /[@$!%*?&]/.test(value)
    )
    .matches(
      /^[A-Za-z\d@$!%*?&]{8,}$/,
      "Password can only contain letters, numbers, and special characters"
    )
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password can be at most 16 characters"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

const cities = [
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Pune", label: "Pune" },
  { value: "Chennai", label: "Chennai" },
  { value: "Benguluru", label: "Benguluru" },
];

const states = [
  { value: "Telangana", label: "Telangana" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Karnataka", label: "Karnataka" },
];
export default function Page() {

  const dispatch = useDispatch();
  const token = Store.getState().user.token
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState<string>('')
  const [fileType, setFileType] = useState<string>('')
  const [fileSelected, setFileSelected] = useState<boolean>(false)
  const [extractPathUrl, setExtractPathUrl] = useState('')
  const [fileInput, setFileInput] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const {
 
    control: control1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    reset: reset1,
    formState: { errors: errors1, isValid: isValid1 },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(personalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
    },
  });

  const {
 
    control: control2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
 
    reset: reset2,
    formState: { errors: errors2, isValid: isValid2 },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addressSchema),
    defaultValues: {
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const {
    control: control3,
    handleSubmit: handleSubmit3,
    setValue: setValue3,

    reset: reset3,
    formState: { errors: errors3, isValid: isValid3 },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFileInputChange = (file: ChangeEvent) => {
   // // console.log('file------', file)

    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement as any;

    if (files && files.length !== 0) {
      const uploadedFile = files[0]

     // // console.log('fileName----', uploadedFile.name)
     // // console.log('fileType----', uploadedFile.type)

      reader.onload = () => {
        // setImgSrc(files[0])
        setFile(files[0])
        setFileInput(reader.result as string)
        setFileName(uploadedFile.name)
        setFileType(uploadedFile.type)
        setFileSelected(true)
      }

      reader.readAsDataURL(uploadedFile)
    }
  }
 
  const extractPath = (url: string): string => {
    try {
      const urlObject = new URL(url)
      const fullPath = urlObject.pathname
      const desiredPath = fullPath.substring(fullPath.indexOf('vendor'))

      return desiredPath
    } catch (error) {
      // consoleerror('Invalid URL:', error)

      return ''
    }
  }

  const getMedia = () => {
    Webservices.callGetApi(
      getEndpoint.default.GET_MEDIA +
        '?' +
        'fileName=' +
        fileName +
        '&' +
        'fileType=' +
        fileType +
        '&' +
        'intent=' +
        'profilePictures',
      token
    )
      .then(async (response: any) => {
       // // console.log('imageResponse', response)
        const extractedPath = extractPath(response.data.url)

        setExtractPathUrl(extractedPath)
       // // console.log('ExtractedPath---', extractedPath)

        if (response.status == 200) {
          const uploadS3 = await axios(response?.data?.url, {
            method: 'PUT',
            data: file,
            headers: {
              'Content-Type': fileType
            }
          })

         // // console.log('IMG S3---', uploadS3)
        }
      })
      .catch(err => {
       // // console.log('err', err)
      })
  }

  const [activeStep, setActiveStep] = useState(0);

  const handleProfileSubmit = (data: any) => {
   // // console.log("Profile Data:", data);

    const payload = {
      email: data.email,
      number: `+91${data.mobile}`,
      firstName: data.firstName,
      lastName: data.lastName,
      // displayImage: 'https://assets-uat.hubeco.market' + '/' + extractPathUrl,
      displayImage: '/' + extractPathUrl,
      businessInfo: {
        companyName: data.companyName,
        businessType: data.businessType,
        gstNumber: data.gst,
        tinNumber: data.tin,
        panNumber: data.pan,
        companyAddress: data.companyAddress,
        website: data.companyWebsite
      },
      address: {
        title: 'office',
        address: data.address,
        city: data.city,
        state: data.state,
        postCode: data.pincode,
        country: 'India'
      },
      userType: 'Buyer'
    }

   // // console.log('payloadData**', payload)

    Webservices.callPostApi(getEndpoint.default.DETAILS, payload, token)
    .then((result: any) => {
     // // console.log('result---', result)
      toast.success('Changes Saved',{iconTheme: {
        primary: '#439787',
        secondary: '#FFFAEE',
      }})
    })
    .catch((err: any) => {
     // // console.log('error**----', err)
      toast.error('Failed to Save Changes')
    })

    handleNextStep();
  };
   
    const handleAddressSubmit = (data: any) => {
     // // console.log("Address Data: ", data);
    
  
      const payload = {
        title: "Default",
        address: data.address,
        city: data.city,
        state: data.state,
        postCode: data.pincode,
        country: data.country
      }
        Webservices.callPostApi(getEndpoint.default.ADDADDRESS, payload, token)
          .then(result => {
           // // console.log('Form Submission', result.data)
    
            if (result.status === 201) {
              toast.success('Address Info Submitted Successfully',{iconTheme: {
                primary: '#439787',
                secondary: '#FFFAEE',
              }})
            } else {
              toast.error('Submission Failed')
            }
          })
          .catch(err => {
           // // console.log('err', err)
            toast.error(
              err && err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Failed to submit'
            )
          })
        
          handleNextStep();
      };
  
      const handleSecuritySubmit = (data: any) => {
       // // console.log('Security Data:', data);
      const payload={
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        logoutFromEverywhere: false
      }
    
        Webservices.callPatchApi(getEndpoint.default.CHANGE_PASSWORD, payload, token)
            .then(result => {
             // // console.log('Form Submission', result.data)
      
              if (result.status === 201) {
                toast.success('Security Info Submitted Successfully',{iconTheme: {
                  primary: '#439787',
                  secondary: '#FFFAEE',
                }})
              } else {
                toast.error('Submission Failed')
              }
            })
            .catch(err => {
             // // console.log('err', err)
              toast.error(
                err && err.response && err.response.data && err.response.data.message
                  ? err.response.data.message
                  : 'Failed to submit'
              )
            })
      };

    const steps = [
        { label: "Personal Information", img: "/images/register/personal.webp" },
        { label: "Shipping Address", img: "/images/register/shipping.webp" },
        { label: "Account Settings", img: "/images/register/account.webp" },
      ];

      const renderStepContent = (step: number) => {
       // // console.log("Active Step:", step);
        // Debugging errors

        switch (step) {
          case 0:
            return (
              <div>
               {activeStep === 0 && (
            <B2C_editPersonal
       
                
              imgSrc="/images/1.webp" // Use your default image URL here
              nextStep={handleNextStep}
            />
          )}
          
            </div>
            )
          case 1:
            return (
              <div>
                {activeStep === 1 && (
            <B2C_editAddress
            nextStep={handleNextStep}
              // onSubmit={handleSubmit2(handleAddressSubmit)}
              // prevStep={handlePrevStep}
              // control={control2}
              // errors={errors2}
              // states={states}
              // cities={cities}
              // selectedState={selectedState}
              // selectedCity={selectedCity}
              // handleStateChange={handleStateChange}
              // handleCityChange={handleCityChange}
            />
          )}
              </div>
            );
          case 2:
            return (
              <div>
               {activeStep === 2 && (
            <B2C_changePassword
              // onSubmit={handleSubmit3(handleSecuritySubmit)}
              prevStep={handlePrevStep}
              // control={control3}
              // errors={errors3}
            />
          )}
              </div>
            );
          default:
            return null;
        }
      };
    
  return (
    <div className="bg-white">
      <Head>
        <title>Edit Profile</title>
      </Head>
     {/* <Header /> */} 
      <div className="px-4 md:px-30 md:mt-20 pb-10 w-full md:w-11/12 mx-auto">
      <div className="category-section pb-10 text-center text-brown bg-white shadow-[8px_4px_8px_8px_rgba(149,157,165,0.2)]">

          <div className="container mx-auto py-10">
          <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-5">
                Edit Profile
              </h1>
            </div>
          <div className={styles.stepper}>
              <div className={styles.steps}>
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`${styles.step} ${
                      index === activeStep ? styles.activeStep : ""
                    } flex flex-col md:flex-row items-center mb-4 md:mb-0`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className="h-12 w-12 mb-2 md:mb-0 md:mr-2">
                      <Image
                      src={step.img} 
                      alt="Image" 
                      width={100}
                      height={58.95}
                      onError={e => {
                        e.currentTarget.src = '/images/user.webp'
                      }}
                      loading="lazy"

                      />
                    </div>
                    <div className={`${styles.stepLabel} text-center md:text-left`}>{step.label}</div>
                  </div>
                ))}
              </div>
              <div className={styles.stepContent} >
                {renderStepContent(activeStep)}
                {/* <div className="flex">
                
                  <CustomButton
                    title={"Back"}
                    className="ml-3 hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-brown "
                    customStyles={{ backgroundColor:'#E0E0E0'}}
                    onPress={prevStep}
                  />
                  {activeStep < steps.length - 1 ? (
                    <CustomButton
                    title={"Save & Continue"}
                    className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white "
                    customStyles={{}}
                    onPress={nextStep}
                  />
                  ) : (
                    <CustomButton
                    title={"Get Started"}
                    className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white "
                    customStyles={{}}
                    onPress={handleSubmit}
                  />
                  )}
                </div> */}
              </div>
              </div>
        </div>
        </div>
      </div>
     {/* <Footer /> */}
    </div>
  );
}
