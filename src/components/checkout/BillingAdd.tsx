"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import store from "@/reduxStore";
import useApi from "../Fetcher/useAPI";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
// import { useRouter } from "next/navigation";
import CustomInput from "../customInput/CustomTextField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomButton from "../customButton/CustomButton";

interface BillingProps {
  billingId?: string;
  amount?: number;
  onConfirm?: (data: any) => void;
  onClose?: () => void;
}

const validationSchema = yup.object().shape({
  // firstName: yup
  //   .string()
  //   .required("First Name is required")
  //   .matches(/^[^\d]+$/, "First Name cannot contain numbers")
  //   .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

  //   // @ts-ignore
  //   .test(
  //     "no-leading-space",
  //     "Empty space at the start is not allowed",
  //     (value: any) => value && value.trimLeft() === value
  //   )

  //   // @ts-ignore
  //   .test(
  //     "no-multiple-spaces",
  //     "Double space are not allowed",
  //     (value: any) => value && !/\s{2,}/.test(value)
  //   )
  //   .min(3, "First Name must be at least 3 characters")
  //   .matches(
  //     /^(?! )(?=.*[^ ]).{3,}(?<! )$/,
  //     "No empty spaces and start and end"
  //   )
  //   .max(75, "First Name cannot exceed 75 characters"),
  // lastName: yup
  //   .string()
  //   .matches(/^[^\d]+$/, "Last Name cannot contain numbers")
  //   .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

  //   // @ts-ignore
  //   .test(
  //     "no-leading-space",
  //     "Empty space at the start is not allowed",
  //     (value: any) => value && value.trimLeft() === value
  //   )

  //   // @ts-ignore
  //   .test(
  //     "no-multiple-spaces",
  //     "Double space are not allowed",
  //     (value: any) => value && !/\s{2,}/.test(value)
  //   )
  //   .min(3, "Last Name must be at least 3 characters")
  //   .matches(
  //     /^(?! )(?=.*[^ ]).{3,}(?<! )$/,
  //     "No empty spaces and start and end"
  //   )
  //   .max(75, "Last Name cannot exceed 75 characters"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  landmark: yup.string(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pinCode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Pin code must be a valid 6-digit number")
    .required("Pin code is required"),
  country: yup.string().required("Country is required"),
  // phoneNumber: yup
  //   .string()
  //   .required("Mobile Number is required")
  //   .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")
  //   .matches(
  //     /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
  //     "Characters are not allowed"
  //   )
  //   .max(10, "No more than 10 digits")
  //   .matches(/^[6-9][0-9]*$/, "First number must be between 6 to 9")
  //   .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits"),
  // email: yup
  //   .string()
  //   .required("Email is required")
  //   .email("Invalid email address format")
  //   .matches(/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/, "Invalid email address format")
  //   .max(120, "Email address cannot exceed 320 characters"),
});

export default function BillingAdd({
  billingId,
  amount,
  onConfirm = () => undefined,
  onClose = () => undefined,
}: BillingProps) {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [stateValue, setStateValue] = useState<string>("");
  const [countryValue, setCountryValue] = useState<string>("");
  const [cityValue, setCityValue] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const countriesData = store.getState().masterData.countries;
  const [statesData, setStatesData] = useState<any>([]);
  const [citiesData, setCitiesData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addForm, setAddForm] = useState<boolean>(false);
  const { callApi } = useApi();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // firstName: "",
      // lastName: "",
      addressLine1: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      // phoneNumber: "",
      // email: "",
    },
  });

  const getPincodeData = async (pincode: any) => {
    const res = (await callApi(`pincodeInfo/${pincode}`, "GET")) as any;

    if (res?.data?.length == 0) {
      return;
    }

    let state = "";
    let city = "";
    let country = "";

    setLat(res?.data[0]?.geometry?.location?.lat);
    setLong(res?.data[0]?.geometry?.location?.lng);

    for (const component of res.data[0].address_components) {
      if (component.types.includes("country")) {
        country = component.long_name;
        // console.log("country", component.long_name);
        onChangeCountry(component.long_name);
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.long_name;
        // console.log("staattette", component.long_name);
        onChangeState(component.long_name);
      }
      if (component.types.includes("locality")) {
        city = component.long_name;
        // console.log("jvnnvrre", city);
        onChangeCity(component.long_name);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to ensure values are updated

    setValue("city", city);
    setValue("state", state);
    setValue("country", country);
    setValue("pinCode", pincode);
    setCityValue(city);
    setStateValue(state);
    // setValue("addressLine1", address);
    // setValue("landmark", landmark);
    clearErrors("city");
    clearErrors("state");
    clearErrors("country");
  };

  const getCountryCodeByName = (countryName: string) => {
    const country = countriesData.find(
      (c: any) => c.name === countryName
    ) as any;
    return country ? country.code : null; // Return the code if found, otherwise null
  };

  const onChangeCountry = (country: any, from?: string) => {
    // console.log("conchangecoutr", country, from);

    if (from == "dropdown") {
      setValue("state", "");
      setValue("city", "");
    }

    const countryCode = getCountryCodeByName(country);
    setValue("country", country);
    setCountryValue(country);
    // handleCountryChange(countryName);
    Webservices.getStatesApi(getEndpoint.default.STATES + "/" + countryCode)
      .then((result: any) => {
        // // console.log('states',result?.data[0].states)
        setStatesData(result?.data[0]?.states);
      })
      .catch((err: any) => {
        // console.log(err);
      });
    clearErrors("country");
  };
  const onChangeState = (state: any, from?: string) => {
    if (from == "dropdown") {
      setValue("city", "");
    }
    // console.log("stateff", state);
    setValue("state", state);
    setStateValue(state);
    Webservices.getCitiesApi(getEndpoint.default.CITIES + "/" + state)
      .then((result: any) => {
        // console.log("cities", result?.data);
        setCitiesData(result?.data);
      })
      .catch((err: any) => {
        // console.log(err);
      });
    clearErrors("state");
  };

  const onChangeCity = (city: any) => {
    // console.log("cistsy", city);
    if (city !== cityValue) {
      setValue("city", city);
      setCityValue(city);
      clearErrors("city");
    }
  };

  const handleOnKeyUp = (e: any) => {
    // console.log("handleKeyup", e);
    const inputValue = e;
    if (inputValue === "") {
      setValue("state", "");
      setValue("city", "");
    } else {
      if (e.length === 6) {
        getPincodeData(e);
      } else {
        setValue("state", "");
        setValue("city", "");
        setValue("country", "");
        setStateValue("");
        setCityValue("");
        setCountryValue("");
      }
    }
  };

  const handleApiError = async (err: any) => {
    const result = err && err.response;

    if (result.status === 401) {
      toast.error("Unauthorized Request to Add Address");
    } else if (result.status === 400) {
      toast.error("Invalid Request to submit Address");
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Add Address Failed"
      );
    }
  };

  const handleAddressSubmit = async (data: any) => {
    // console.log("ewrbetnr", data);
    setIsLoading(true);

    const billingAddress = [
      data?.addressLine1,
      data?.landmark,
      data?.city,
      data?.state,
      data?.country,
      data?.pinCode,
    ]
      .filter(Boolean) // Filters out any falsy values (undefined, null, empty string)
      .join("|");

    onConfirm(billingAddress);
    // onClose();

    // const payload = {
    //     title: "Default",
    //     address: data.addressLine1,
    //     city: data.city,
    //     state: data.state,
    //     postCode: data.pinCode,
    //     country: data.country,
    //     landmark: data.landmark,
    //     latitude: lat,
    //     longitude: long,
    //     contactPersonPhone: data?.phone,
    //     contactPersonName: data?.firstName + "|" + data?.lastName,
    //     contactPersonEmail: data?.email,
    //   };

    // try {
    //     const result = (await callApi(
    //       getEndpoint.default.ADDADDRESS,
    //       "POST",
    //       payload
    //     )) as any;

    //     if (result.data == null) {
    //       handleApiError(result?.errorData);
    //     } else {
    //       toast.success("Billing Address Added Successfully", {
    //         iconTheme: {
    //           primary: "#439787",
    //           secondary: "#FFFAEE",
    //         },
    //       });
    //       // console.log('cewveb',result?.data)
    //       onConfirm(result?.data);
    //       onClose();

    //     }
    //   } catch (e) {
    //     handleApiError(e);
    //   } finally {
    //     setIsLoading(false);
    //   }

    setIsLoading(false);
  };

  return (
    <div>
      <p className="text-lg font-semibold mb-2 mt-4">Add New Billing Address</p>

      <form autoComplete="off" onSubmit={handleSubmit(handleAddressSubmit)}>
        <div className="pb-6 pt-3">
          {/* Account Section */}
          {/* <div className="mb-8"> */}
          {/* <h2 className="text-lg font-semibold mb-4">Account</h2> */}
          {/* <div className="w-full mb-2">
                <CustomInput
                  placeholder="Name"
                  value={buyerInfo?.firstName+buyerInfo?.lastName}
                  isTextArea={false}
                  customStyles={{
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    color: "black",
                  }}
                />
              </div>
              <div className="flex items-center">
                <input
                  id="tandc"
                  type="checkbox"
                  // {...field}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded mt-2 dark:bg-gray-700 dark:border-gray-600"
                  style={{
                    accentColor: "#B90647", // For modern browsers supporting accent-color
                  }}
                />
                <label
                  htmlFor="email"
                  className="ms-2 mt-2 text-base font-medium text-gray-900 dark:text-gray-300"
                >
                  Email me with news and offers
                </label>
              </div> */}
          {/* </div> */}
          {/* Delivery Section */}
          <div className="mb-8">
            {/* <div className="flex flex-col sm:flex-row gap-3 my-5">
                      <div className="w-full sm:w-1/2">
                        <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                          First Name <span className="text-red">*</span>
                        </label>
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <CustomInput
                              placeholder="Enter your First Name"
                              isTextArea={false}
                              onChange={onChange}
                              value={value}
                              customStyles={{
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                color: "black",
                              }}
                              extraClassnames="custom-input"
                              errorMessage={errors.firstName?.message}
                            />
                          )}
                          name="firstName"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                          Last Name
                        </label>
                        <Controller
                          // rules={{ required: true }}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <CustomInput
                              placeholder="Enter your Last Name"
                              isTextArea={false}
                              onChange={onChange}
                              value={value}
                              customStyles={{
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                color: "black",
                              }}
                              extraClassnames="custom-input"
                              errorMessage={errors.lastName?.message}
                            />
                          )}
                          name="lastName"
                        />
                      </div>
                    </div> */}
            <div className="flex flex-col sm:flex-row gap-3 my-5">
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                  Address Line 1 <span className="text-red">*</span>
                </label>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Enter your Address"
                      isTextArea={false}
                      onChange={onChange}
                      value={value}
                      customStyles={{
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        color: "black",
                      }}
                      extraClassnames="custom-input"
                      errorMessage={errors.addressLine1?.message}
                    />
                  )}
                  name="addressLine1"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                  Land Mark
                </label>
                <Controller
                  // rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Enter your Land Mark"
                      isTextArea={false}
                      onChange={onChange}
                      value={value}
                      customStyles={{
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        color: "black",
                      }}
                      extraClassnames="custom-input"
                      errorMessage={errors.landmark?.message}
                    />
                  )}
                  name="landmark"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 my-5">
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                  Pin code <span className="text-red">*</span>
                </label>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Enter your Pincode"
                      isTextArea={false}
                      onChange={(e: any) => {
                        // console.log("eoncha", e);
                        onChange(e);
                        handleOnKeyUp(e);
                      }}
                      value={value}
                      customStyles={{
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        color: "black",
                      }}
                      extraClassnames="custom-input"
                      errorMessage={errors.pinCode?.message}
                    />
                  )}
                  name="pinCode"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                  Country<span className="text-red">*</span>
                </label>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={(e: any) => {
                        onChange(e);
                      }}
                      value={value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Country</SelectLabel>
                          {countriesData.map((country: any) => (
                            <SelectItem
                              key={country?.name}
                              value={country.name}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  name="country"
                />
                <div className="text-left justify-left">
                  {errors.country && (
                    <span className="text-red text-sm mt-1 text-left">
                      {errors.country.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 my-5">
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                  State <span className="text-red">*</span>
                </label>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={(e: any) => {
                        onChange(e);
                      }}
                      value={value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>State</SelectLabel>

                          {Array.isArray(statesData) &&
                            statesData.map((state: any) => (
                              <SelectItem key={state?.name} value={state.name}>
                                {state.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  name="state"
                />
                <div className="text-left justify-left">
                  {errors.state && (
                    <span className="text-red text-sm mt-1 text-left">
                      {errors.state.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                  City <span className="text-red">*</span>
                </label>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={(e: any) => {
                        onChange(e);
                      }}
                      value={value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>City</SelectLabel>
                          {Array.isArray(citiesData) &&
                            citiesData.map((city: any) => (
                              <SelectItem key={city?.name} value={city.name}>
                                {city.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  name="city"
                />
                <div className="text-left justify-left">
                  {errors.city && (
                    <span className="text-red text-sm mt-1 text-left">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-3 my-5">
                      <div className="w-full sm:w-1/2">
                        <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                          Phone Number <span className="text-red">*</span>
                        </label>
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <CustomInput
                              placeholder="Enter your Phone Number"
                              isTextArea={false}
                              onChange={onChange}
                              value={value}
                              customStyles={{
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                color: "black",
                              }}
                              extraClassnames="custom-input"
                              errorMessage={errors.phoneNumber?.message}
                            />
                          )}
                          name="phoneNumber"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
                          Email <span className="text-red">*</span>
                        </label>
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <CustomInput
                              placeholder="Enter your Email ID"
                              isTextArea={false}
                              onChange={onChange}
                              value={value}
                              customStyles={{
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                color: "black",
                              }}
                              extraClassnames="custom-input"
                              errorMessage={errors.email?.message}
                            />
                          )}
                          name="email"
                        />
                      </div>
                    </div> */}
          </div>

          <div className="flex flex-row justify-between items-center ">
            <CustomButton
              title={"Cancel"}
              onPress={() => {
                onClose();
                reset();
              }}
              className="bg-[#e7e7e7] hover:bg-[#e7e7e7] h-10 md:h-10 md:w-full w-full md:text-md text-sm text-black font-medium z-10 mr-3"
              customStyles={{}}
              type="button"
              // loading={isLoading}
            />
            <CustomButton
              title={"Submit"}
              // onPress={()=>{// console.log('onCLickedAubmit')}}
              className="bg-secondary hover:bg-primary h-10 md:h-10 md:w-full w-full md:text-md text-sm text-white font-medium z-10 "
              customStyles={{}}
              type="submit"
              loading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
