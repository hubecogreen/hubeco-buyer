"use client";
import React, { ChangeEvent, use, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../customInput/CustomTextField";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import * as getEndpoint from "../../network/EndPoints";
import useGetBuyer from "../hooks/useGetBuyer";
import axios from "axios";
import * as Webservices from "../../network/WebServices";
import { getCookie, setCookie } from "cookies-next";
import useApi from "../Fetcher/useAPI";
import { useB2CContext } from "./context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validGSTStateCodes } from "../../lib/commondata";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FiUpload } from "react-icons/fi";
import { MdClose, } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { get } from "lodash";

interface CompanyDetailsFormProps {
  prevStep: () => void;

  nextStep: () => void;
}

const detailsSchema = yup.object({
  companyName: yup
    .string()
    .required("Company Name is required")
    .matches(/^[^\d]+$/, "Company Name cannot contain numbers")
    .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

    // @ts-ignore
    .test(
      "no-leading-space",
      "Empty space at the start is not allowed",
      (value: any) => value && value.trimLeft() === value
    )

    // @ts-ignore
    .test(
      "no-multiple-spaces",
      "Double space are not allowed",
      (value: any) => value && !/\s{2,}/.test(value)
    )
    .min(3, "Company Name  must be at least 3 characters")
    .matches(
      /^(?! )(?=.*[^ ]).{3,}(?<! )$/,
      "No empty spaces and start and end"
    )
    .max(75, "Company Name  cannot exceed 75 characters"),
  businessType: yup
    .string()
    .required("Business Type is required")
    .matches(/^[^\d]+$/, "Business Type cannot contain numbers")
    .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")
    // @ts-ignore
    .test(
      "no-leading-space",
      "Empty space at the start is not allowed",
      (value: any) => value && value.trimLeft() === value
    )

    // @ts-ignore
    .test(
      "no-multiple-spaces",
      "Double space are not allowed",
      (value: any) => value && !/\s{2,}/.test(value)
    )
    .min(3, "Business Type  must be at least 3 characters")
    .matches(/^(?! )(?=.*[^ ]).{3,}(?<! )$/, "Enter valid name")
    .max(75, "Business Type  cannot exceed 75 characters"),
  gst: yup
    .string()
    .required("GST is required")
    .matches(/^[0-9A-Za-z]*$/, "Special Characters are not allowed") // Allows only numbers and uppercase letters
    .test("valid-state-code", "Invalid state code in GST", (value) =>
      validGSTStateCodes.includes(value.substring(0, 2))
    )
    .test(
      "no-multiple-spaces",
      "Double spaces are not allowed",
      (value) => !/\s{2,}/.test(value)
    )
    .matches(
      /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9]{1}[zZ]{1}[0-9A-Za-z]{1}$/,
      "GST format is invalid."
    )
    .trim("GST cannot have empty space at the start or end"),
    tan: yup
    .string()
    .nullable()
    .notRequired()
    .test('is-valid', 'TAN format is invalid', (value: any) => {

      if (!value) return true; // Skip validation if empty or null
      const trimmedValue = value.trim().toUpperCase(); // Trim leading/trailing spaces
      const isValidFormat = /^[A-Z]{4}\d{5}[A-Z]$/.test(trimmedValue);
      const noSpecialChars = /^[A-Z0-9]*$/.test(trimmedValue);
      const noMultipleSpaces = !/\s+/.test(trimmedValue);
      const correctLength = trimmedValue.length === 10;
      // console.log('cjwjrbent', value.toUpperCase(),isValidFormat ,noSpecialChars , noMultipleSpaces , correctLength,trimmedValue)
      return isValidFormat && noSpecialChars && noMultipleSpaces && correctLength;
    }),
  pan: yup
    .string()
    .required("PAN is required")
    .trim("PAN cannot have empty space at the start or end")
    .matches(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/, "Invalid PAN format"),
  companyAddress: yup
    .string()
    .trim("Address cannot have empty spaces at start or end")
    .strict(true)
    .required("Company Address is required")
    .max(95, "Address must be at most 95 characters"),
  panDoc: yup.mixed().nullable().notRequired(),
  gstDoc: yup.mixed().nullable().notRequired(),
  tanDoc: yup.mixed().nullable().notRequired(),
});

const B2BDetails: React.FC<CompanyDetailsFormProps> = ({
  prevStep,

  nextStep,
}) => {
  const { companyInfo, setCompanyInfo } = useB2CContext();
  // State for PAN
  const [isPanNumberEntered, setIsPanNumberEntered] = useState(false);
  const [panError, setPanError] = useState("");
  const [panFileUploaded, setPanFileUploaded] = useState(false);
  const [panFile, setPanFile] = useState(null);
  const [panExtractPathUrl, setPanExtractPathUrl] = useState("");
  const [panImageError, setPanImageError] = useState("");

  // State for GST
  const [isGstNumberEntered, setIsGstNumberEntered] = useState(false);
  const [gstError, setGstError] = useState("");
  const [gstFileUploaded, setGstFileUploaded] = useState(false);
  const [gstFile, setGstFile] = useState(null);
  const [gstExtractPathUrl, setGstExtractPathUrl] = useState("");
  const [gstImageError, setGstImageError] = useState("");

  // State for TAN
  const [isTanNumberEntered, setIsTanNumberEntered] = useState(false);
  const [tanError, setTanError] = useState("");
  const [tanFileUploaded, setTanFileUploaded] = useState(false);
  const [tanFile, setTanFile] = useState(null);
  const [tanExtractPathUrl, setTanExtractPathUrl] = useState("");
  const [tanImageError, setTanImageError] = useState("");
  const [tanFileName, setTanFileName] = useState("");
  const [others, setOthers] = useState<boolean>(false);
  const [bs, setBs] = useState("");  
  const buyerInfo=sessionStorage.getItem('buyerUserInfo') as any;
  const buyerDetails=JSON.parse(buyerInfo);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    clearErrors,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(detailsSchema),
    defaultValues: {
      companyName: companyInfo?.companyName ?companyInfo?.companyName:buyerDetails?.businessInfo?.companyName?buyerDetails?.businessInfo?.companyName: "",
      businessType: companyInfo?.businessType ?companyInfo?.businessType:buyerDetails?.businessInfo?.businessType?buyerDetails?.businessInfo?.businessType: "",
      gst: companyInfo?.gst ?companyInfo?.gst:buyerDetails?.businessInfo?.gstNumber?buyerDetails?.businessInfo?.gstNumber: "",
      tan: companyInfo?.tan ?companyInfo?.tan:buyerDetails?.businessInfo?.tanNumber?buyerDetails?.businessInfo?.tanNumber: "",
      pan: companyInfo?.pan ?companyInfo?.gst:buyerDetails?.businessInfo?.panNumber?buyerDetails?.businessInfo?.panNumber: "",
      companyAddress: companyInfo?.companyaddress ?companyInfo?.companyaddress:buyerDetails?.businessInfo?.companyAddress?buyerDetails?.businessInfo?.companyAddress: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { callApi } = useApi();
  const router = useRouter();

  const [otherbusinessType, setOtherBusinessType] = useState<string>("");
  const [otherbusinessTypeErr, setOtherBusinessTypeErr] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  const token = getCookie("token");
  const businessTypes = [
    { value: "Private Limited", name: "Private Limited" },
    { value: "Partnership", name: "Partnership" },
    { value: "Proprietorship", name: "Proprietorship" },
    { value: "LLP", name: "LLP" },
    { value: "Listed Company", name: "Listed Company" },
    { value: "Others", name: "Others" },
  ];

  useEffect(() => {
    if (companyInfo) {
      setValue("companyName", companyInfo?.companyName);
      // setValue('businessType',companyInfo?.businessType)
      setValue("gst", companyInfo?.gst);
      setValue("tan", companyInfo?.tan);
      setValue("pan", companyInfo?.pan);
      setValue("companyAddress", companyInfo?.companyaddress);
    }
  }, [companyInfo]);


  // console.log('defwrgetny',companyInfo?.businessType,buyerDetails?.businessInfo?.businessType)

  const businessTypeList = [
    "Private Limited",
    "Partnership",
    "Proprietorship",
    "LLP",
    "Listed Company",
  ];
  
  const businessTypeValue = companyInfo?.businessType
    ? companyInfo?.businessType
    : buyerDetails?.businessInfo?.businessType
    ? buyerDetails?.businessInfo?.businessType
    : "";


  useEffect(() => { 

    setValue('companyName',companyInfo?.companyName ?companyInfo?.companyName:buyerDetails?.businessInfo?.companyName?buyerDetails?.businessInfo?.companyName: "")
    // setOthers(companyInfo?.businessType == "Others"?true:false)
    setValue('gst',companyInfo?.gst ?companyInfo?.gst:buyerDetails?.businessInfo?.gstNumber?buyerDetails?.businessInfo?.gstNumber: "")
    setValue('tan',companyInfo?.tan ?companyInfo?.tan:buyerDetails?.businessInfo?.tanNumber?buyerDetails?.businessInfo?.tanNumber: "")
    setValue('pan',companyInfo?.pan ?companyInfo?.pan:buyerDetails?.businessInfo?.panNumber?buyerDetails?.businessInfo?.panNumber: "")
    setValue('companyAddress',companyInfo?.companyaddress ?companyInfo?.companyaddress:buyerDetails?.businessInfo?.companyAddress?buyerDetails?.businessInfo?.companyAddress: "")
    setGstExtractPathUrl(buyerDetails?.businessInfo?.gstDoc?buyerDetails?.businessInfo?.gstDoc: "")
    setPanExtractPathUrl(buyerDetails?.businessInfo?.panDoc?buyerDetails?.businessInfo?.panDoc: "")
    setTanExtractPathUrl(buyerDetails?.businessInfo?.tanDoc?buyerDetails?.businessInfo?.tanDoc: "")

    // if (businessTypeValue === "Others") {
    //   setOthers(true); // Set state to true if businessType is 'Others'
    // } else {
    //   setOthers(false); // Reset state if not 'Others'
    //   if (!businessTypeList.includes(businessTypeValue)) {
    //     // If not included in the predefined list, handle default case
    //     setValue("businessType", "");
    //     setBs("");
    //   } else {
    //     // Set the value if it is valid
    //     setValue("businessType", businessTypeValue);
    //     setBs(businessTypeValue);
    //   }
    // }
  }
  ,[])


   

  const onError2 = (err: any) => {

    if (getValues("tan")) {
      if (tanExtractPathUrl.length == 0) {
        setTanImageError("Please upload TAN");
      }
    }

    if (gstExtractPathUrl.length == 0) {
      setGstImageError("Please upload GST Doc");
    }

    if (panExtractPathUrl.length == 0) {
      setPanImageError("Please upload PAN Doc");
    }
    if (otherbusinessType.length == 0) {
      setOtherBusinessTypeErr("Please Enter Business Type");
    }
  };

  const handleApiError = async (err: any) => {
    const result = err && err.response;

    if (result.status === 401) {
      toast.error("Unauthorized Request to Submit Business Information");
    } else if (result.status === 409) {
      if (result?.data?.intent == "ERROR") {
        if (Array.isArray(result.data.message)) {
          err.response.data.message.forEach((item: any) => {
            let id = item.field;
            let message = item.message;

            if (item.field === "gstNumber") {
              id = "gst";
              message = "GST is already being used by another buyer";

              setError("gst", {
                type: "manual",
                message: "GST is already being used by another buyer",
              });
            }


            
            if (item.field === "tanNumber") {
              id = "tan";
              message = "TAN is already being used by another buyer";
              setError("tan", {
                type: "manual",
                message: "TAN is already being used by another buyer",
              });
            }

            if (item.field === "panNumber") {
              id = "pan";
              message = "PAN is already being used by another buyer";
              setError("pan", {
                type: "manual",
                message: "PAN is already being used by another buyer",
              });
            }

            if (item.field === "companyName") {
              id = "companyName";
              message = "Company name is already being used by another buyer";
              setError("companyName", {
                type: "manual",
                message: "Company name is already being used by another buyer",
              });
            }

            setError(id, {
              type: "manual",
              message: message,
            });
          });
        }
      }
    } else if (result.status === 400) {
      toast.error("Invalid Request to Submit Business Information");
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Business Information Submission Failed"
      );
    }
  };

  const handleDetailsSubmit = async (data: any) => {
    // // console.log(panExtractPathUrl, gstExtractPathUrl, tanExtractPathUrl, "tanExtractPathUrl")
    let status = false;
    if (data?.tan && data?.tan?.length > 0) {
      if (tanExtractPathUrl.length == 0) {
        setTanImageError("Please upload TAN Doc");

        status = true;
      }
    }

    if (gstExtractPathUrl.length == 0) {
      setGstImageError("Please upload GST Doc");

      status = true;
    }

    if (panExtractPathUrl.length == 0) {
      setPanImageError("Please upload PAN Doc");

      status = true;
    }
    if (status) {
      return;
    }

    setIsLoading(true);
    clearErrors();
    setIsLoading(true);

    if (getCookie("companyAdded") == "true") {
      const payload = {
        businessInfo: {
          companyName: data.companyName,
          businessType: others
            ? otherbusinessType
              ? otherbusinessType
              : data.businessType
            : data.businessType,
          gstNumber: data.gst,
          tanNumber: data.tan,
          panNumber: data.pan,
          companyAddress: data.companyAddress,
          website: "",
          panDoc: panExtractPathUrl ? panExtractPathUrl : "",
          tanDoc: tanExtractPathUrl ? tanExtractPathUrl : "",
          gstDoc: gstExtractPathUrl ? gstExtractPathUrl : "",
        },
        userType: "Buyer",
      };

      try {
        const result = await callApi(
          getEndpoint.default.UPDATEBUYER,
          "PATCH",
          payload
        );

        if (result.data == null) {
          handleApiError(result?.errorData);
        } else {
          toast.success("Business Information Updated Successfully", {
            iconTheme: {
              primary: "#439787",
              secondary: "#FFFAEE",
            },
          });

          setCookie("companyAdded", true);
          setCompanyInfo({
            companyName: data.companyName,
            businessType: others
              ? otherbusinessType
                ? otherbusinessType
                : data.businessType
              : data.businessType,
            gst: data.gst,
            tan: data.tan,
            pan: data.pan,
            companyaddress: data.companyAddress,
            website: "",
          });
          // router.push('/registration-success')

          nextStep();
        }
      } catch (e) {
        handleApiError(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      const payload = {
        businessInfo: {
          companyName: data.companyName,
          businessType: others
            ? otherbusinessType
              ? otherbusinessType
              : data.businessType
            : data.businessType,
          gstNumber: data.gst,
          tanNumber: data.tan,
          panNumber: data.pan,
          companyAddress: data.companyAddress,
          website: "",
          panDoc: panExtractPathUrl ? panExtractPathUrl : "",
          tanDoc: tanExtractPathUrl ? tanExtractPathUrl : "",
          gstDoc: gstExtractPathUrl ? gstExtractPathUrl : "",
        },
        userType: "Buyer",
      };

      try {
        const result = await callApi(
          getEndpoint.default.UPDATEBUYER,
          "PATCH",
          payload
        );
        if (result.data == null) {
          handleApiError(result?.errorData);
        } else {
          toast.success("Business Information Submitted Successfully", {
            iconTheme: {
              primary: "#439787",
              secondary: "#FFFAEE",
            },
          });

          // router.push('/welcome')
          setCookie("companyAdded", "true");
          setCompanyInfo({
            companyName: data.companyName,
            businessType: others
              ? otherbusinessType
                ? otherbusinessType
                : data.businessType
              : data.businessType,
            gst: data.gst,
            tan: data.tan,
            pan: data.pan,
            companyaddress: data.companyAddress,
            website: "",
          });
          nextStep();
          // router.push('/registration-success')
        }
      } catch (e) {
        handleApiError(e);
      } finally {
        setIsLoading(false);
      }
    }

    //handleNextStep();
  };

  useEffect(() => {
    if (bs.length > 0) {
      clearErrors("businessType");
    }
  }, [bs]);

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

  const getMedia = (selectedFile?: any, field?: any) => {
    const apiUrl = `media/presignedUrlPublic?fileName=${encodeURIComponent(
      selectedFile.name
    )}&userType=Buyer&fileType=${encodeURIComponent(
      selectedFile.type
    )}&intent=profilePictures`;
    Webservices.callGetApi(apiUrl, token)
      .then(async (response: any) => {
        const extractedPath = extractPath(response.data.url);

        // Set extractPath based on field
        if (field === "pan") setPanExtractPathUrl(extractedPath);
        if (field === "gst") setGstExtractPathUrl(extractedPath);
        if (field === "tan") setTanExtractPathUrl(extractedPath);

        if (response.status === 200) {
          await axios.put(response.data.url, selectedFile,{
            headers:{
              'Content-Type' :  selectedFile.type
            }
          });
        }
      })
      .catch((err) => {
        // // console.log('err', err);
      });
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    // // console.log('first',field)
    const selectedFile = event.target.files?.[0] as any;
    if (selectedFile) {
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 2.5 * 1024 * 1024; // 2.5MB in bytes

      if (!validTypes.includes(selectedFile.type)) {
        if (field === "pan")
          setPanImageError(
            "Please upload a valid file type ( jpeg, png, pdf)."
          );
        if (field === "gst")
          setGstImageError(
            "Please upload a valid file type. ( jpeg, png, pdf)."
          );
        if (field === "tan")
          setTanImageError(
            "Please upload a valid file type. ( jpeg, png, pdf)."
          );
        return;
      }

      if (selectedFile.size > maxSize) {
        if (field === "pan") setPanImageError("File size exceeds 2.5MB.");
        if (field === "gst") setGstImageError("File size exceeds 2.5MB.");
        if (field === "tan") setTanImageError("File size exceeds 2.5MB.");
        return;
      }

      if (field === "pan") {
        setPanImageError("");
        setPanFile(selectedFile); // Set file
        setPanFileUploaded(true);
      }
      if (field === "gst") {
        setGstImageError("");
        setGstFile(selectedFile); // Set file
        setGstFileUploaded(true);
      }
      if (selectedFile && field === "tan") {
        setTanImageError("");
        setTanFile(selectedFile); // Set file
        setTanFileUploaded(true);
        setTanFileName("");
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the file input to allow the same file to be uploaded
        }
      }

      const reader = new FileReader();
      reader.onload = () => {
        // Call your API to upload the file
        getMedia(selectedFile, field);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = (field: string) => {
    if (field === "pan") {
      setPanExtractPathUrl("");
      setPanFileUploaded(false);
    }
    if (field === "gst") {
      setGstExtractPathUrl("");
      setGstFileUploaded(false);
    }
    if (field === "tan") {
      setTanExtractPathUrl("");
      setTanFileUploaded(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the input value so the same file can be uploaded again
      }
    }
  };

  const handleUppercaseChange = (
    fieldName: any,
    value: string,
    onChange: any
  ) => {
    const uppercasedValue = value.toUpperCase();
    onChange(uppercasedValue);

    setValue(fieldName, uppercasedValue, { shouldValidate: true }); // Update the form state with the uppercase value

    // PAN validation logic
    if (fieldName === "pan") {
      if (uppercasedValue.length === 10) {
        setIsPanNumberEntered(true);
        setPanError("");
      } else {
        setIsPanNumberEntered(false);
      }
    }
    // GST validation logic
    if (fieldName === "gst") {
      if (uppercasedValue.length === 15) {
        setIsGstNumberEntered(true);
        setGstError("");
      } else {
        setIsGstNumberEntered(false);
      }
    }
    // TAN validation logic
    // console.log('dvfbfnmjh', uppercasedValue,isTanNumberEntered)
    if (fieldName === "tan") {
      if (uppercasedValue.length === 10) {
        setIsTanNumberEntered(true);
        setTanError("");
      } else {
        setIsTanNumberEntered(false);
      }
    }
  };

  const validateBusinessType = (value: any) => {
    // Define error message variable
    let errorMessage = "";

    // Check for required field
    if (!value) {
      errorMessage = "Business Type is required";
    }
    // Check for numeric characters
    else if (/\d/.test(value)) {
      errorMessage = "Business Type cannot contain numbers";
    }
    // Check for special characters except allowed ones (letters, numbers, spaces)
    else if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
      errorMessage = "Special characters not allowed";
    }
    // Check for leading spaces
    else if (value.trimLeft() !== value) {
      errorMessage = "Empty space at the start is not allowed";
    }
    // Check for multiple spaces
    else if (/\s{2,}/.test(value)) {
      errorMessage = "Double spaces are not allowed";
    }
    // Minimum length
    else if (value.length < 3) {
      errorMessage = "Business Type must be at least 3 characters";
    }
    // Leading/trailing spaces and check length
    else if (!/^(?! )(?=.*[^ ]).{3,}(?<! )$/.test(value)) {
      errorMessage =
        "No empty spaces at the start or end, and must be at least 3 characters";
    }
    // Maximum length
    else if (value.length > 75) {
      errorMessage = "Business Type cannot exceed 75 characters";
    }

    return errorMessage;
  };

  const onChangeOtherBusinessType = (e: any) => {
    setError("businessType", "");
    clearErrors("businessType");
    setOtherBusinessType(e);
    setValue("businessType", "Others");
  };

  const handleBusinessTypeChange = (e: any) => {
    // const value = e.target.value; // Assuming your input's event gives you the value directly.
    const validationError = validateBusinessType(e);

    if (validationError) {
      setOtherBusinessTypeErr(validationError); // Set error state
    } else {
      setOtherBusinessTypeErr(""); // Clear error state if valid
      onChangeOtherBusinessType(e);
    }

    // Update value as needed
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(handleDetailsSubmit, onError2)}
    >
      <div className="flex flex-wrap">
        {/* <div style={{ display: "flex" }}> */}
        <div className={"md:w-3/6 md:p-5 mobile-sm:px-0 mobile-sm:w-full mobile-sm:my-2 "}>
          <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
            Company Name <span className="text-red">*</span>
          </label>
          <Controller
            name="companyName"
            control={control}
            rules={{ required: "Company Name is required" }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your Company Name"
                onChange={onChange}
                value={value}
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                extraClassnames="custom-input"
                errorMessage={errors.companyName?.message}
              />
            )}
          />
        </div>
        <div className={"md:w-3/6 md:p-5 mobile-sm:px-0 mobile-sm:w-full mobile-sm:my-2 "}>
          <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
            Business Type <span className="text-red">*</span>
          </label>
          <Controller
            name="businessType"
            control={control}
            rules={{ required: "Business Type is required" }}
            // disabled={others?true:false}
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={(e: any) => {
                  // // console.log('othn re',e,others)
                  if (e === "Others") {
                    setOthers(true);
                    // onChange(e)
                    setBs(e);
                  } else if (
                    [
                      "Private Limited",
                      "Partnership",
                      "Proprietorship",
                      "LLP",
                      "Listed Company",
                    ].includes(e) == false
                  ) {
                    setOthers(true);
                    // onChange(e)

                    setBs(e);
                  } else {
                    setBs(e);

                    setOthers(false);
                  }
                  onChange(e);
                  if (e.length > 0) {
                    // clearErrors('businessType')
                  }
                }}
                value={
                  [
                    "Private Limited",
                    "Partnership",
                    "Proprietorship",
                    "LLP",
                    "Listed Company",
                  ].includes(bs)
                    ? bs
                    : others
                    ? "Others"
                    : ""
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Business Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"Select Business Type"}>
                      Select Business Type
                    </SelectItem>
                    {Array.isArray(businessTypes) &&
                      businessTypes.map((businessType: any) => (
                        <SelectItem
                          key={businessType.value}
                          value={businessType.name}
                        >
                          {businessType.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors && errors.businessType && (
            <p className="text-[#d22525] text-sm text-left">
              {errors?.businessType?.message}
            </p>
          )}
        </div>
        {others ? (
          <div className={"md:w-3/6 md:p-5 mobile-sm:px-0 mobile-sm:w-full mobile-sm:my-2 "}>
            <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
              Other Business Type<span className="text-red">*</span>
            </label>

            <CustomInput
              placeholder="Enter your Business Type"
              onChange={(e: any) => {
                handleBusinessTypeChange(e);
              }}
              value={others ? otherbusinessType : ""}
              isTextArea={false}
              customStyles={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                color: "black",
              }}
              extraClassnames="custom-input"
              errorMessage={otherbusinessTypeErr}
            />
            {/* )}
          /> */}
          </div>
        ) : null}
        {/* </div> */}
        {/* <div style={{ display: "flex" }}> */}
        <div className={"md:w-3/6 md:p-5 mobile-sm:px-0 mobile-sm:w-full mobile-sm:my-2 "}>
          <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
            GST <span className="text-red">*</span>
          </label>
          <div className="flex juistify-between items-start">
            <Controller
              name="gst"
              control={control}
              rules={{ required: "GST is required" }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Enter your GST"
                  onChange={(e: any) =>
                    handleUppercaseChange("gst", e, onChange)
                  }
                  value={value}
                  isTextArea={false}
                  textInputStyle={{ textTransform: "uppercase" }}
                  customStyles={{
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    color: "black",
                  }}
                  extraClassnames="custom-input "
                  errorMessage={errors.gst?.message}
                />
              )}
            />
            <div className="flex items-center w-[102px] ml-2">
              {/* <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileInputChange(e, 'gst')}
                        className="hidden"
                      // id="file-input"
                      /> */}

              <Button
                variant="outline"
                type="button"
                color="primary"
                className="text-primary border-primary relative opacity-100 cursor-pointer hover:opacity-100 whitespace-nowrap"
              // disabled={!isGstNumberEntered || gstFileUploaded} // Prevents the button from shrinking
              >
                <FiUpload />
                Upload
                <input
                  type="file"
                  {...register("gstDoc")}
                  className="opacity-0 absolute left-0 leading-[32px] w-full cursor-pointer"
                  onChange={(e) => handleFileInputChange(e, "gst")}
                />
              </Button>

            </div>
          </div>
          {(gstError || (gstImageError && !errors.gst)) && (
            <p className="text-[#d22525] text-sm mt-1 text-left" color="error">
              {gstError || gstImageError}
            </p>
          )}
          {/* Uploaded File Preview and Remove Option */}
          <div className="mt-2">
            {gstExtractPathUrl.length === 0 ? (
              ""
            ) : (
              <div className="flex items-center justify-between p-2 bg-[#f6f6f6] rounded">
                <p className="truncate text-black text-[14px] w-[300px] mr-2">

                  {gstExtractPathUrl.split("/").pop()}
                </p>
                <IoEyeOutline
                  size={20}
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() =>
                    window.open(`${assetURL}/${gstExtractPathUrl}`)
                  }
                  // title="Downlaod file"
                />

                <MdClose
                  size={20}
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => handleRemoveFile("gst")} // Pass 'gst' or other necessary data
                  // title="Remove file"
                />
              </div>
            )}
          </div>
        </div>
        <div className={"md:w-3/6 md:p-5 mobile-sm:px-0 mobile-sm:w-full mobile-sm:my-2 "}>
          <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
            TAN
          </label>
          <div className="flex juistify-between items-start">
            <Controller
              name="tan"
              control={control}
              rules={{ required: "TAN is required" }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Enter your TAN"
                  onChange={onChange}
                  value={value?value:''}
                  textInputStyle={{ textTransform: "uppercase" }}
                  isTextArea={false}
                  customStyles={{
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    color: "black",
                  }}
                  extraClassnames="custom-input"
                  errorMessage={errors.tan?.message}
                />
              )}
            />
            <div className="flex items-center w-[102px] ml-2">
              {/* <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileInputChange(e, 'gst')}
                        className="hidden"
                      // id="file-input"
                      /> */}

              <Button
                variant="outline"
                type="button"
                color="primary"
                className="text-primary border-primary relative opacity-100 cursor-pointer hover:opacity-100 whitespace-nowrap"
              // disabled={!isGstNumberEntered || gstFileUploaded} // Prevents the button from shrinking
              >
                <FiUpload />
                Upload
                <input
                  type="file"
                  {...register("tanDoc")}
                  className="opacity-0 absolute left-0 w-full cursor-pointer leading-[32px]"
                  onChange={(e) => handleFileInputChange(e, "tan")}
                />
              </Button>

            </div>
          </div>
          {(tanError || (tanImageError && !errors.tan)) && (
            <p className="text-[#d22525] text-sm mt-1 text-left" color="error">
              {tanError || tanImageError}
            </p>
          )}
          {/* Uploaded File Preview and Remove Option */}
          <div className="mt-2">
            {tanExtractPathUrl.length === 0 ? (
              ""
            ) : (
              <div className="flex items-center justify-between p-2 bg-[#f6f6f6] rounded">
                  <p className="truncate text-black text-[14px] w-[300px] mr-2">
                  {tanExtractPathUrl.split("/").pop()}
                </p>
                <IoEyeOutline
                  size={20}
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() =>
                    window.open(`${assetURL}/${tanExtractPathUrl}`)
                  }
                  // title="View file"
                />

                <MdClose
                  size={20}
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => handleRemoveFile("tan")} // Pass 'gst' or other necessary data
                  // title="Remove file"
                />
              </div>
            )}
          </div>
        </div>
        {/* </div> */}
        {/* <div style={{ display: "flex" }}> */}
        <div className={"md:w-3/6 md:p-5 mobile-sm:px-0 mobile-sm:w-full mobile-sm:my-2 "}>
          <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
            PAN <span className="text-red">*</span>
          </label>
          <div className="flex juistify-between items-start">
            <Controller
              name="pan"
              control={control}
              rules={{ required: "PAN is required" }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Enter your PAN"
                  onChange={onChange}
                  value={value}
                  isTextArea={false}
                  textInputStyle={{ textTransform: "uppercase" }}
                  customStyles={{
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    color: "black",
                  }}
                  extraClassnames="custom-input"
                  errorMessage={errors.pan?.message}
                />
              )}
            />

            <div className="flex items-center w-[102px] ml-2">
              {/* <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileInputChange(e, 'gst')}
                        className="hidden"
                      // id="file-input"
                      /> */}

              <Button
                variant="outline"
                type="button"
                color="primary"
                className="text-primary border-primary relative opacity-100 cursor-pointer hover:opacity-100 whitespace-nowrap"
              // disabled={!isGstNumberEntered || gstFileUploaded} // Prevents the button from shrinking
              >
                <FiUpload />
                Upload
                <input
                  type="file"
                  {...register("panDoc")}
                  className="opacity-0 absolute left-0 w-full cursor-pointer leading-[32px]"
                  onChange={(e) => handleFileInputChange(e, "pan")}
                />
              </Button>

            </div>
          </div>
          {(panError || (panImageError && !errors.pan)) && (
            <p className="text-[#d22525] text-sm mt-1 text-left" color="error">
              {panError || panImageError}
            </p>
          )}
          {/* Uploaded File Preview and Remove Option */}
          <div className="mt-2">
            {panExtractPathUrl.length === 0 ? (
              ""
            ) : (
              <div className="flex items-center justify-between p-2 bg-[#f6f6f6] rounded">
                <p className="truncate text-black text-[14px] w-[300px] mr-2">
                  {panExtractPathUrl.split("/").pop()}
                </p>
                <IoEyeOutline
                  size={20}
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() =>
                    window.open(`${assetURL}/${panExtractPathUrl}`)
                  }
                  // title="View file"
                />

                <MdClose
                  size={20}
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => handleRemoveFile("pan")} // Pass 'gst' or other necessary data
                  // title="Remove file"
                />
              </div>
            )}
          </div>
        </div>
        <div className={"md:w-3/6 md:p-5 mobile-sm:px-0 mobile-sm:w-full mobile-sm:my-2 "}>
          <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
            Company Address <span className="text-red">*</span>
          </label>
          <Controller
            name="companyAddress"
            control={control}
            rules={{ required: "Company Address is required" }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your Company Address"
                onChange={onChange}
                value={value}
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                extraClassnames="custom-input"
                errorMessage={errors.companyAddress?.message}
              />
            )}
          />
        </div>
        {/* </div> */}
      </div>
      <div className="flex p-5">
        {/* <button ref={refbtn} type="button" className="hidden" onClick={handleSubmit(handleDetailsSubmit,onError2)} >jkj</button> */}

        <CustomButton
          title={"Back"}
          className={`md:ml-3 mobile-sm:ml-0 hover:bg-primary  h-12 md:h-12 !md:w-32 mobile-sm:!w-32  w-30 md:text-md text-sm text-black `}
          customStyles={{ backgroundColor: "#E0E0E0" }}
          onPress={prevStep}
        />
        <CustomButton
          title={"Save & Continue"}
          className="ml-3 bg-secondary hover:bg-primary h-12 md:h-12 md:!w-40 mobile-sm:!w-32   mobile-sm:!px-2 md:px-0 md:text-md text-sm text-white"
          customStyles={{}}
          //onPress={onSubmit}
          type="submit"
          loading={isLoading}
        />
      </div>
    </form>
  );
};

export default B2BDetails;
