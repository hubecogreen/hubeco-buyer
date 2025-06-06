"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import CustomInput from "@/components/customInput/CustomTextField";
import CustomButton from "@/components/customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from  "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import CouponPopup from "@/components/coupon-popup/CouponPopup";
// import { first, set } from "lodash";
import useApi from "@/components/Fetcher/useAPI";
import * as getEndpoint from "../../network/EndPoints";
import { toast } from "react-hot-toast";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import { getCookie, setCookie } from "cookies-next";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { MdOutlineAddLocationAlt } from "react-icons/md";
// import { Checkbox } from "@/components/ui/checkbox";
import * as Webservices from "../../network/WebServices";
import store from "@/reduxStore";
import { saveCart, saveCartCount } from "@/reduxStore/slices/userSlice";
import { useDispatch } from "react-redux";
import BillingAdd from "@/components/checkout/BillingAdd";
// import { IoIosClose, IoMdCloseCircle } from "react-icons/io";
import { CircularProgress } from "@chakra-ui/react";
import useClient from "@/components/hooks/useClient";
import { normalizePath } from "@/lib/utils";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[^\d]+$/, "First Name cannot contain numbers")
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
    .min(3, "First Name must be at least 3 characters")
    .matches(
      /^(?! )(?=.*[^ ]).{3,}(?<! )$/,
      "No empty spaces and start and end"
    )
    .max(75, "First Name cannot exceed 75 characters"),
  // lastName: yup
  //   .string()
  //   .nullable()
  //   .notRequired()
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

  lastName: yup
    .string()
    .nullable() // Allow null or empty values
    .notRequired() // Field is not required
    .test("no-multiple-spaces", "Double spaces are not allowed", (value) => {
      if (!value) return true; // Skip validation if the field is empty

      return !/\s{2,}/.test(value); // Validate only when there is a value
    })
    .test(
      "no-leading-space",
      "Empty space at the start is not allowed",
      (value) => {
        if (!value) return true; // Skip validation if the field is empty

        return value.trimLeft() === value; // Validate only when there is a value
      }
    )
    .test(
      "no-trailing-space",
      "Empty space at the end is not allowed",
      (value) => {
        if (!value) return true; // Skip validation if the field is empty

        return value.trimRight() === value; // Validate only when there is a value
      }
    )
    .test(
      "min-characters",
      "Last Name must be at least 3 characters",
      (value) => {
        if (!value || value.length === 0) return true; // Skip validation if the field is empty

        return value.length >= 3; // Validate only when there is a value
      }
    )
    .test(
      "max-characters",
      "Last Name cannot exceed 75 characters",
      (value) => {
        if (!value || value.length === 0) return true; // Skip validation if the field is empty

        return value.length <= 75; // Validate only when there is a value
      }
    ),

  addressLine1: yup.string().required("Address Line 1 is required"),
  landmark: yup.string(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pinCode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Pin code must be a valid 6-digit number")
    .required("Pin code is required"),
  country: yup.string().required("Country is required"),
  phoneNumber: yup
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
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address format")
    // .matches(/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/, "Invalid email address format")
    .max(120, "Email address cannot exceed 320 characters"),
});

const Checkout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const currentUserInfo = sessionStorage.getItem("buyerUserInfo") as any;
  const userInfos = JSON.parse(currentUserInfo);
  const [defaultAddress, setDefaultAddress] = useState<any>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<any>(null);
  const [actualAddress, setActualAddress] = useState<any>([]);
  const currentcheckout = sessionStorage.getItem("currentcheckout") as any;
  const currentcheckoutdata = JSON.parse(currentcheckout);
  const [itemsData, setItemsData] = useState<any>([]);
  const [addresses, setAddresses] = useState<any>([]);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const [isLoading, setIsLoading] = useState(false);
  const checkedAddid = getCookie("selectedCheckoutAddress");
  const [changePopup, setChangePopup] = useState<boolean>(false);
  const [addForm, setAddForm] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const router = useRouter();
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
  const [cartData, setCartData] = useState([]);
  const [cost, setCost] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [clearCartLoading, setClearCartLoading] = useState(false);
  const [totalCart, setTotalCart] = useState<any>([]);
  const [enablePayNow, setEnablePayNow] = useState<boolean>(false);
  const [checkedP, setCheckedP] = useState<boolean>(false);
  const [deliveryCharges, setDeliveryCharges] = useState<string>("");
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(true);
  const [differentBilling, setDifferentBilling] = useState<boolean>(false);
  const [billinAddress, setBillingAddress] = useState<any>([]);
  const [showBillingInfo, setShowBillingInfo] = useState<boolean>(false);
  const [cartLoad, setCartLoad] = useState<boolean>(false);
  const dispatch = useDispatch();
    const isClient = useClient()
    
  useEffect(() => {
    userInfos?.addresses.forEach((element: any) => {
      if (element?.id === checkedAddid) {
        // // console.log("cewrvb", element);
        setDefaultAddress(element);
        // setDeliveryAddress(element);
        setSelectedAddress(element?.id);
        handleCalculateShipping(element);
        // return element;
      }
    });
    if (currentcheckoutdata !== null) {
      setItemsData(currentcheckoutdata?.items);
    }
  }, []);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      addressLine1: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      phoneNumber: "",
      email: "",
    },
  });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const userInfo = sessionStorage.getItem("buyerUserInfo") as any;
  const buyerInfo = JSON.parse(userInfo);

  useEffect(() => {
    // getCart();
  }, []);

  const handleCartApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      setCartData([]);
      setCost({});
      dispatch(saveCart([]));
      dispatch(saveCartCount([]));
      setCookie("CartCount", "");
    } else if (result?.status === 401) {
      await refreshTokens();
      getCart();
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const getCart = async () => {
    setLoading(true);

    try {
      const result = (await callApi(getEndpoint.default.CART, "GET")) as any;
      if (result.data == null) {
        handleCartApiError(result?.errorData);
      } else {
        setCartData(result?.data?.items);
        setCookie("CartCount", result?.data?.items?.length);
        setCost(result?.data?.cost);
        setTotalCart(result?.data);
        setDeliveryAddress(result?.data?.actualAddress);
      }
    } catch (e) {
      handleCartApiError(e);
    } finally {
      setLoading(false);
    }
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const changeDialog = () => {
    setChangePopup(true);
    setAddForm(false);
  };

  const handleBuyApiError = async (err: any) => {
    const result = err && err.response;
    // console.log("errresult", err);
    if (result.status === 401) {
      await refreshTokens();
      buySubscription();
      // toast.error('Unauthorized Request')
    } else if (result.status === 404) {
      toast.error("Invalid Request.");
    } else {
      // toast.error(
      //   err && err.response && err.response.data && err.response.data.message
      //     ? err.response.data.message
      //     : "Failed to send Reset Link"
      // );
    }
  };

  const buySubscription = async () => {
    const successPage = `${process.env.NEXT_PUBLIC_PROD_URL}/order-success`;
    const failedPage = `${process.env.NEXT_PUBLIC_PROD_URL}/order-failed`;

    // console.log("buySubscrption", billinAddress);

    const payloadData = {
      email:
        actualAddress &&
        actualAddress?.contactPersonEmail &&
        actualAddress?.contactPersonEmail.includes("|")
          ? actualAddress?.contactPersonEmail.replace("|", " ")
          : userInfos && userInfos.email,
      name:
        actualAddress &&
        actualAddress?.contactPersonName &&
        actualAddress?.contactPersonName.includes("|")
          ? actualAddress?.contactPersonName.replace("|", " ")
          : userInfos?.firstName + " " + userInfos?.lastName,
      phoneNumber:
        actualAddress &&
        actualAddress?.contactPersonPhone &&
        actualAddress?.contactPersonPhone.includes("|")
          ? actualAddress?.contactPersonPhone.replace("|", " ")
          : userInfos && userInfos.number,
      alternateNumber:
        actualAddress &&
        actualAddress?.contactPersonPhone &&
        actualAddress?.contactPersonPhone.includes("|")
          ? actualAddress?.contactPersonPhone.replace("|", " ")
          : userInfos && userInfos.number,
      // billingAddress: billinAddress
      // ? billinAddress
      // : sameAsShipping
      //   ? (userInfos?.buyerInfo?.buyerType === "B2C"
      //       ? deliveryAddress
      //       : userInfos?.businessInfo?.companyAddress || deliveryAddress)
      //   : deliveryAddress,
      billingAddress:
        billinAddress && billinAddress.length > 0
          ? billinAddress
          : sameAsShipping
          ? userInfos?.buyerInfo?.buyerType === "B2C"
            ? deliveryAddress
            : userInfos?.businessInfo?.companyAddress || deliveryAddress
          : deliveryAddress,

      orderInstructions: getCookie("CheckoutReason")
        ? getCookie("CheckoutReason")
        : "",
      furl: failedPage,
      surl: successPage,
    };

    // console.log("cewrbnt", payloadData);
    setIsLoading(true);

    try {
      const result = (await callApi(
        getEndpoint.default.CHECKOUT,
        "POST",
        payloadData
      )) as any;

      if (result.data == null) {
        handleBuyApiError(result?.errorData);
        // console.log("ComeHere2");
      } else {
        if (result.data == null) {
          handleBuyApiError(result?.errorData);
          // console.log("ComeHere3");
        } else {
          toast.success("Redirecting you to the Payment page", {
            iconTheme: {
              primary: "#439787",
              secondary: "#FFFAEE",
            },
          });
          const parser1 = new DOMParser();
          const doc1 = parser1.parseFromString(result.data, "text/html");
          // Extract the form element
          const formElement = doc1.getElementById(
            "payment_post"
          ) as HTMLFormElement | null;
          if (!formElement) return;
          // Get the action attribute
          const actionUrl = formElement?.action;
          // setDatas(result.data);
          // handleClose();
          // Create a new form element
          const form = document.createElement("form");
          form.method = "POST";
          form.action = actionUrl; // Update this with the action URL from the form in `result.data`

          // Parse the inputs from the `result.data` and append them to the form
          const parser = new DOMParser();
          const doc = parser.parseFromString(result.data, "text/html");
          const inputs = doc.querySelectorAll("input");

          // Append all input fields to the newly created form
          inputs.forEach((input) => {
            const clonedInput = document.createElement("input");
            clonedInput.type = "hidden";
            clonedInput.name = input.name;
            clonedInput.value = input.value;
            form.appendChild(clonedInput);
          });

          // Append the form to the body
          document.body.appendChild(form);

          // Submit the form programmatically
          form.submit();
          // document.open();
          // document.write(result?.data);
          // document.close();
          // // console.log('ComeHere4')
        }
      }
    } catch (e) {
      handleBuyApiError(e);
      // console.log("ComeHere5");
    } finally {
      setIsLoading(false);
      // console.log("ComeHere6");
    }
  };

  const changeDelivery = (address: any) => {
    // console.log("OnclickChanges", address);

    const addressParts = [
      address?.address,
      address?.landmark,
      address?.city,
      address?.state,
      address?.pinCode,
      address?.country,
      address?.contactPersonPhone?.replace("+91", ""),
    ];

    // Filter out null or undefined values and join the remaining values with commas
    const formattedAddress = addressParts
      .filter((part) => part !== null && part !== undefined)
      .join(", ");

    setDeliveryAddress(formattedAddress);

    setChangePopup(false);
    setCookie("selectedCheckoutAddress", address.id);
    setSelectedAddress(address?.id);
    handleCalculateShipping(address);
  };

  const OnClickAddNewAdd = () => {
    setAddForm(true);
    setChangePopup(false);
  };

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

  const handleShippingApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      if (
        result?.data?.intent == " CART_NOT_FOUND" &&
        result?.data?.message == "Cart is empty or not found"
      ) {
        // toast.error("No Cart Found");
        dispatch(saveCart([]));
        dispatch(saveCartCount([]));
      } else {
        toast.error(result?.data?.message || "Unable to Calculate Shipping");
      }
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getCart();
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handleCalculateShipping = async (address: any) => {
    setSelectedAddress(address.id);
    setCookie("selectedCheckoutAddress", address.id);
    setCartLoad(true);
    const payload = {
      address: address?.id,
    };
    try {
      const result = (await callApi(
        getEndpoint.default.CALCULATESHIPPING,
        "POST",
        payload
      )) as any;
      // console.log("testing shipping", payload);
      if (result.data == null) {
        handleShippingApiError(result?.errorData);
      } else {
        // setOpen(false);
        // refreshCart();

        setDeliveryCharges(result?.data?.cart?.cost);
        setCost(result?.data?.cart?.cost);
      }
    } catch (e) {
      handleShippingApiError(e);
    } finally {
      getCart();
      setCartLoad(false);
    }
  };

  const handleAddressSubmit = async (data: any) => {
    // console.log("cewvrbtn", data);
    setIsLoading(true);

    const payload = {
      title: "Default",
      address: data.addressLine1,
      city: data.city,
      state: data.state,
      postCode: data.pinCode,
      country: data.country,
      landmark: data.landmark,
      latitude: lat,
      longitude: long,
      contactPersonPhone: data?.phone,
      contactPersonName: data?.firstName + "|" + data?.lastName,
      contactPersonEmail: data?.email,
    };

    // console.log("cwvrbtny", payload);

    try {
      const result = (await callApi(
        getEndpoint.default.ADDADDRESS,
        "POST",
        payload
      )) as any;

      if (result.data == null) {
        handleApiError(result?.errorData);
      } else {
        toast.success("Address Added Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
        });

        setCookie("addressAdded", "true");
        setCookie("currentAddressId", result.data.id);
        setDeliveryAddress(
          result?.data?.address +
            ", " +
            result?.data?.landmark +
            ", " +
            result?.data?.city +
            ", " +
            result?.data?.state +
            ", " +
            result?.data?.country +
            ", " +
            result?.data?.postCode
        );
        setActualAddress(result?.data);
        handleCalculateShipping(result?.data);

        setAddForm(false);
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckPayU = (type: any) => {
    // console.log("enterChe");
    setCheckedP(!checkedP);
    if (type == true) {
      setEnablePayNow(false);
    } else {
      setEnablePayNow(true);
    }
  };

  const handleOnConfirm = (data: any) => {
    // console.log("Diff5", differentBilling);
    setBillingAddress(data);
    setSameAsShipping(false);
    setDifferentBilling(differentBilling);
    setShowBillingInfo(true);
  };

  // console.log("Diff5 check bill", billinAddress);

  const handleShippingCheckBox = (type: any) => {
    // console.log("Diff4", type);
    setSameAsShipping(!sameAsShipping);
    setDifferentBilling(false);
  };

  function formatCurrencyInIndianStyle(amount: number): string {
    // console.log("amount", amount);
    // Round to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;

    // Determine whether to show decimals
    const options: Intl.NumberFormatOptions =
      roundedAmount % 1 === 0
        ? {} // No decimals if the number is whole
        : { minimumFractionDigits: 2, maximumFractionDigits: 2 };

    // Format in Indian numbering style
    return new Intl.NumberFormat("en-IN", options).format(roundedAmount);
  }

  const onClickImage = (slug: any) => {
    if (slug) {
      router.push(`/${slug}`);
    } else {
    }
  };

  if(!isClient)
    return <></>

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="max-w-[1300px] md:mx-auto mx-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 py-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Delivery to</h2>

          <div className="border border-borderGray rounded p-4  flex items-center justify-between">
            <div className=" flex items-center justify-center">
              <IoLocationOutline className="text-secondary mr-2" size={28} />
              <p className="font-semibold text-sm text-black ">
                {actualAddress &&
                actualAddress?.contactPersonName &&
                actualAddress?.contactPersonName.includes("|")
                  ? actualAddress?.contactPersonName.replace("|", " ")
                  : userInfos?.firstName + " " + userInfos?.lastName}
                ,
                <span className="text-sm font-regular text-black">
                  {/* {deliveryAddress?.address +
                    ", " +
                    deliveryAddress?.city +
                    ", " +
                    deliveryAddress?.state +
                    ", " +
                    deliveryAddress?.country +
                    ", " +
                    deliveryAddress?.postCode} */}
                  {deliveryAddress}
                </span>
              </p>
            </div>

            <Dialog open={changePopup} onOpenChange={changeDialog}>
              <DialogTrigger asChild>
                <Button
                  onClick={changeDialog}
                  variant={"outline"}
                  className="bg-transparent hover:bg-secondary hover:text-white text-secondary text-[14px] border border-secondary w-fit mt-4 "
                >
                  Change
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[85%] h-fit  ">
                <DialogHeader className="flex justify-between items-center flex-row ">
                  <DialogTitle>Select Delivery Address</DialogTitle>
                  {/* <DialogClose>
                    <IoMdCloseCircle className="" size={20} />
                  </DialogClose> */}
                </DialogHeader>
                <DialogDescription>
                  Please select the address you want to deliver to.
                </DialogDescription>
                <div className=" gap-4 py-4  max-h-[95%] overflow-y-auto">
                  <div className=" justify-center items-center gap-4 w-full">
                    {userInfos?.addresses.length > 0 ? (
                      userInfos?.addresses?.map((address: any, index: any) => (
                        <div className="w-full p-2 mb-2 border border-borderGray rounded" key={index}>
                          <label
                            key={index}
                            className="flex items-center space-x-3 mb-2"
                          >
                            <input
                              type="checkbox"
                              name="address"
                              value={address?.address}
                              onClick={() => changeDelivery(address)}
                              checked={selectedAddress === address.id}
                              className="h-4 w-4 text-indigo-600 accent-[#B90647]"
                            />

                            <span className="text-sm text-gray-700">
                              {address?.address.includes("?|")
                                ? address?.address.split("?|")[1]
                                : address?.address}
                              {" , " +
                                address?.city +
                                " , " +
                                address?.state +
                                " , " +
                                address?.country +
                                " , " +
                                address?.postCode}
                            </span>
                          </label>
                        </div>
                      ))
                    ) : (
                      <>
                        <p className="text-[14px] text-black">
                          No addresses available.
                          <span
                            className="text-[14px] text-secondary hover:underline"
                            onClick={() => setAddForm(true)}
                          >
                            Click here to Add
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4"></div>
                </div>
                <DialogFooter>
                  <Button
                    className="text-black bg-secondaryBg hover:bg-secondaryBg w-fit mr-4"
                    type="button"
                    onClick={() => {
                      setChangePopup(false);
                    }}
                  >
                    {/* <MdOutlineAddLocationAlt
                      className="mr-2 text-white"
                      size={22}
                    /> */}
                    Cancel
                  </Button>
                  <Button
                    className="text-white bg-secondary hover:bg-primary w-fit"
                    type="button"
                    onClick={OnClickAddNewAdd}
                  >
                    <MdOutlineAddLocationAlt
                      className="mr-2 text-white"
                      size={22}
                    />
                    Add New Address
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Left Column: Form */}
          {addForm ? (
            <>
              <form
                autoComplete="off"
                onSubmit={handleSubmit(handleAddressSubmit)}
              >
                <div className="py-6 border-borderGray border px-4 ">
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
                  <div className="flex justify-start items-center border-b border-borderGray">
                    <p className="text-secondary text-md font-medium pb-1">
                      Add New Address
                    </p>
                  </div>
                  <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-3 my-5">
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
                              value={value ?? undefined}
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
                              value={value ?? undefined}
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
                    </div>
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
                                      <SelectItem
                                        key={state?.name}
                                        value={state.name}
                                      >
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
                                      <SelectItem
                                        key={city?.name}
                                        value={city.name}
                                      >
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

                    <div className="flex flex-col sm:flex-row gap-3 my-5">
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
                    </div>

                    {/* <div className="flex items-center">
                      <input
                        id="tandc"
                        type="checkbox"
                        // {...field}
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded mt-2 dark:bg-gray-700 dark:border-gray-600"
                      
                      />
                      <label
                        htmlFor="email"
                        className="ms-2 mt-2 text-base font-medium text-gray-900 dark:text-gray-300"
                      >
                        Save this information for next time
                      </label>
                    </div> */}
                    {/* <div className="flex items-center">
                      <input
                        id="tandc"
                        type="checkbox"
                        // {...field}
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded mt-2 dark:bg-gray-700 dark:border-gray-600"
                      
                      />
                      <label
                        htmlFor="email"
                        className="ms-2 mt-2 text-base font-medium text-gray-900 dark:text-gray-300"
                      >
                        Text me with news and offers
                      </label>
                    </div> */}
                  </div>

                  <div className="flex flex-row justify-between items-center ">
                    <CustomButton
                      title={"Cancel"}
                      onPress={() => {
                        setAddForm(false);
                        reset();
                      }}
                      className="bg-[#f4f4f4] hover:bg-[#f4f4f4] h-10 md:h-10 md:w-full text-balck w-full md:text-md text-md  z-10 mr-3 font-medium"
                      customStyles={{}}
                      type="button"
                      // loading={isLoading}
                    />
                    <CustomButton
                      title={"Submit"}
                      // onPress={()=>{// console.log('onCLickedAubmit')}}
                      className="bg-secondary hover:bg-primary h-10 md:h-10 md:w-full w-full md:text-md text-md text-white  z-10 font-medium "
                      customStyles={{}}
                      type="submit"
                      loading={isLoading}
                    />
                  </div>
                </div>
              </form>
            </>
          ) : (
            <></>
          )}

          {/* Billing Address */}
          <div className="mb-8 mt-8">
            <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
            {/* <div className="border p-4 flex items-center justify-start">
              <Checkbox
                className="mr-2"
                onClick={() => handleShippingCheckBox(sameAsShipping)}
               
                defaultChecked
               // checked={sameAsShipping && !differentBilling ? true : false}
              />
              <label>Same as shipping address</label>
            </div> */}
            <div className="border p-4 flex items-center justify-start">
              <input
                type="checkbox"
                className="mr-2 accent-[#B90647]"
                onClick={() => {
                  setDifferentBilling(!differentBilling);
                  setSameAsShipping(false);
                }}
                checked={differentBilling}
              />

              <label>Use a different Billing Address</label>
            </div>
            {differentBilling && !sameAsShipping && !showBillingInfo && (
              <>
                <BillingAdd
                  onClose={() => {
                    // console.log("Diff2");
                    setDifferentBilling(false);

                    setSameAsShipping(false);
                    // if(billinAddress && billinAddress.length>0){
                    //   setShowBillingInfo(true);
                    // }else{
                    //   setShowBillingInfo(false);
                    // }

                    // setBillingAddress();
                  }}
                  onConfirm={handleOnConfirm}
                />
              </>
            )}
            {showBillingInfo == true && !sameAsShipping && (
              <>
                <div className="border p-4 rounded border-borderGray w-full my-3">
                  <p className="text-md text-secondary font-medium mb-4 flex justify-start items-center">
                    <IoLocationOutline
                      className="text-secondary mr-3"
                      size={20}
                    />{" "}
                    Billing Address
                  </p>
                  <p className="text-md text-black font-regular">
                    {billinAddress && billinAddress.length > 0
                      ? billinAddress?.replace(/\|/g, ",  ")
                      : billinAddress}
                  </p>
                </div>
                <div className="w-full flex justify-end items-center">
                  <Button
                    variant={"outline"}
                    className="border-secondary border text-secondary "
                    onClick={() => {
                      // console.log("Diff1");
                      setDifferentBilling(true);
                      setSameAsShipping(false);
                      setShowBillingInfo(false);
                      setBillingAddress([]);
                    }}
                  >
                    Add New
                  </Button>
                </div>
              </>
            )}
          </div>
          {/* Payment Section */}
          <div className="my-8">
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            <div className="border border-gray-300 rounded-md bg-[#F4F4F4]">
              <div className="flex items-center mb-4 border-b pb-5 bg-white p-5">
                <input
                  type="checkbox"
                  className="mr-2 z-10 accent-[#B90647]"
                  defaultChecked
                  onClick={() => handleCheckPayU(checkedP)}
                  title="PayU Secure (UPI, Cards, Wallets, NetBanking)"
                />

                <label>PayU Secure (UPI, Cards, Wallets, NetBanking)</label>
              </div>
              <div className="flex items-center justify-center pb-5">
                <Image
                  width={225}
                  height={112}
                  src="/images/checkout/SVG.png"
                  alt="Image"
                  className="text-center"
                  onError={e => {
                    e.currentTarget.src = '/images/product-placeholder.jpg'
                  }}
                  loading="lazy"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center pb-10 px-10">
                After clicking "Pay now", you will be redirected to PayU to
                complete your purchase securely.
              </p>
            </div>
          </div>

          {/* Pay Now Button */}
          <div>
            <Button
              title={"Pay Now"}
              onClick={buySubscription}
              disabled={
                enablePayNow
                //  == true &&
                // (sameAsShipping == true || differentBilling)
                //   ? false
                //   : true
              }
              className="bg-secondary hover:bg-primary h-10 md:h-10 w-full md:text-md text-sm text-white"
              type="button"
            >
              Pay Now
            </Button>
          </div>
        </div>
        {/* Right Column: Order Summary */}
        <div className="p-6 bg-[#F4F4F4] h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {cartLoad ? (
            <>
              <div className="w-full flex justify-center items-center h-full">
                <CircularProgress color="#9B314A" size={10} />
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                {cartData.map((product: any, index: any) => (
                  <div className="flex w-full py-3 justify-start items-start" key={index}>
                    <Image
                      // src={product.image}
                      // src={
                      //   product && product?.productInfo?.image
                      //     ? (
                      //         assetURL +
                      //         "/" +
                      //         product?.productInfo?.image
                      //       ).includes("//admin")
                      //       ? (
                      //           assetURL +
                      //           "/" +
                      //           product?.productInfo?.image
                      //         ).replace("//admin", "/admin")
                      //       : `${assetURL}/${product?.productInfo?.image}`
                      //     : "/images/product-placeholder.jpg"
                      // }
                      src={
                        product?.productInfo?.image
                          ? normalizePath(`${assetURL}/${product.productInfo.image}`)
                          : "/images/product-placeholder.jpg"
                      }
                      alt={product?.productInfo?.productName}
                      width={100}
                      height={100}
                      className="w-16 h-16 object-cover mr-4"
                      onError={e => {
                        e.currentTarget.src = '/images/product-placeholder.jpg'
                      }}
                      loading="lazy"
                      // onClick={()=>onClickImage(product?.product?.slug)}
                    />
                    <div className="w-full">
                      <p className="font-semibold w-[60%]">
                        {(() => {
                          const productName =
                            product?.product?.productName || "";
                          const variantName =
                            product?.product?.variantName || "";

                          let displayName = "";

                          // Apply conditions
                          if (productName === "N/A") {
                            displayName = variantName;
                          } else if (variantName === "Default") {
                            displayName = productName;
                          } else {
                            displayName = productName + "-" + variantName;
                          }

                          // Apply length check
                          return displayName.length > 30
                            ? displayName.slice(0, 30) + "..."
                            : displayName;
                        })()}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-gray-500">
                          Quantity : {product?.quantity}
                        </p>
                        <p className="text-black font-semibold text-md flex item-center justify-start">
                        <span className="text-black text-lg font-normal font-mono mr-1.5">

                            {" "}
                            ₹
                          </span>{" "}
                          {formatCurrencyInIndianStyle(
                            product?.productInfo?.platformPrice -
                              Number(product?.tax / product?.quantity)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="mb-4 mt-4">
            <p className="text-sm text-[#439787] cursor-pointer font-bold">
              Coupons available for this product{" "}
              <span className="text-[#B90647]" onClick={togglePopup}>
                Check Coupons
              </span>
            </p>
            <CouponPopup isOpen={isPopupOpen} onClose={togglePopup} />
          </div> */}
              {/* <div className="flex">
            <div className="w-[80%]">
              <CustomInput
                placeholder="Discount code or gift coupon"
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
              />
            </div>
            <CustomButton
              title={"Apply"}
              className="ml-3 bg-secondary hover:bg-primary  h-10 md:h-10 md:w-24  w-24 md:text-md text-sm text-white "
              customStyles={{}}
            />
          </div> */}

              <div className="py-7">
                {cost?.price && (
                  <div className="flex justify-between mb-2">
                    <p className="text-md text-fontGray font-regular">
                      Subtotal
                    </p>
                    <p className="text-black font-semibold text-md flex item-center justify-start">
                    <span className="text-black text-lg font-normal font-mono mr-1.5">

                        {" "}
                        ₹
                      </span>{" "}
                      {formatCurrencyInIndianStyle(
                        Number(cost?.price) - Number(cost?.taxes)
                      )}
                    </p>
                  </div>
                )}
                {/* {cost?.deliveryCharges && ( */}
                <div className="flex justify-between mb-2">
                  <p>Delivery Charges</p>
                  <p className="text-black font-semibold text-md flex item-center justify-start">
                  <span className="text-black text-lg font-normal font-mono mr-[5px]">

                      {" "}
                      ₹
                    </span>{" "}
                    {formatCurrencyInIndianStyle(cost?.deliveryCharges)}
                  </p>
                </div>
                {/* )} */}
                {cost?.taxes && (
                  <div className="flex justify-between mb-2">
                    <p>Taxes</p>
                    <p className="text-black font-semibold text-md flex item-center justify-start">
                    <span className="text-black text-lg font-normal font-mono mr-[5px]">
                        {" "}
                        ₹
                      </span>{" "}
                      {formatCurrencyInIndianStyle(cost?.taxes)}
                    </p>
                  </div>
                )}
                {cost?.totalCost && (
                  <div className="flex justify-between font-semibold text-lg mt-4">
                    <p>Total</p>
                    <p className="text-black font-semibold text-md flex item-center justify-start">
                    <span className="text-black text-base font-normal font-mono mr-[5px]">

                        {" "}
                        ₹
                      </span>{" "}
                      {formatCurrencyInIndianStyle(cost?.totalCost)}
                    </p>
                  </div>
                )}
                {cost?.roundedValue !== 0 && (
                  <p className="text-black w-full text-start  text-xs font-regular">
                    {" "}
                    Amount rounded off to{" "}
                    <span className="text-black text-xs font-normal font-mono mr-0">

                      ₹
                    </span>
                    <span>{cost?.roundedValue}*</span>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
