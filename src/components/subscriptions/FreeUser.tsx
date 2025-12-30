"use client";
import Footer from "@/components/footer/MainFooter";

import Header from "@/components/header/MainHeader";
import { GoCheckCircleFill } from "react-icons/go";
import { PiMinusCircleBold, PiPhoneLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  CircularProgress,
  Spinner,
  Alert,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import { TfiEmail } from "react-icons/tfi";
import { AiFillHome } from "react-icons/ai";
import Head from "next/head";
import { features } from "process";
import { useRouter } from "next/navigation";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import { toast } from "react-hot-toast";
import useApi from "@/components/Fetcher/useAPI";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { setCookie } from "cookies-next";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type ExpandedIndex = number | null | undefined;
export default function Page() {
  const [freePlanData, setFreePlanData] = useState<any>({});
  const [prePlanData, setPrePlanData] = useState<any>({});
  const [freemium, setFreemium] = useState<{ feature: { title: string } }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  //   const [premium, setPremium] = useState<{ feature: { title: string } }[]>([]);
  const [subData, setSubData] = useState<any>({});
  const [term, setTerm] = useState<string>("Monthly");
  const [premium, setPremium] = useState<
    { title: string; description: string; isActive: boolean }[]
  >([]);
  //   const [loading, setLoading] = useState(false)

  const [daysRemain, setDaysRemain] = useState({
    expiryDate: "",
    daysPassed: "",
    totalDays: "",
    percentage: "",
    remainingDays: "",
    showRenewButton: false,
  });
  const { callApi } = useApi();

  const { refreshTokens } = useRefreshToken();

  const disableFreemium = [
    {
      plan: "Dedicated Account Manager",
    },
    {
      plan: "Bulk Purchase Discounts",
    },
    {
      plan: "Supplier Matching",
    },
    {
      plan: "Dedicated Support Team",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<ExpandedIndex | undefined>(
    undefined
  );

  const handleAccordionChange = (index: ExpandedIndex | undefined) => {
    setSelectedIndex(index === selectedIndex ? undefined : index);
  };
  const router = useRouter();
  useEffect(() => {
    getPlansData();
    getMyPlansData();
  }, []);

  const handleApiError = async (err: any) => {
    const result = err && err.response;
    // // console.log("errresult", err);
    if (result.status === 401) {
      await refreshTokens();
    } else if (result.status === 404) {
      if (
        result?.data?.message == "No active plan found"
      ) {
      } else {
        toast.error("Invalid Request.");
      }
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to send Reset Link"
      );
    }
  };

  function calculateDates(subData: any) {
    const today = dayjs();

    // Assuming the data structure provided in the subData
    const expiryDate = dayjs(subData.expiryDate).format("DD MMM YYYY");
    const startDate = dayjs(subData.startDate);
    const endDate = dayjs(subData.expiryDate);

    // Calculate the total days of the plan
    const totalDays = endDate.diff(startDate, "day"); // Including the start day

    // Calculate the days passed and remaining days
    const daysPassed = today.diff(startDate, "day");
    const remainingDays = Math.max(endDate.diff(today, "day"), 0);

    // Calculate the percentage for the progress bar
    const percentage = (daysPassed / totalDays) * 100;

    // Determine if the renew button should be shown
    const showRenewButton = remainingDays <= 10;

    // Update the state with the calculated values
    setDaysRemain({
      expiryDate,
      daysPassed: daysPassed.toString(),
      totalDays: totalDays.toString(),
      percentage: percentage.toFixed(2),
      remainingDays: remainingDays.toString(),
      showRenewButton,
    });
  }

  const handleBuyApiError = async (err: any) => {
    const result = err && err.response;
    // // console.log('errresult',err)
    if (result.status === 401) {
      await refreshTokens();
      buySubscription();
      // toast.error('Unauthorized Request')
    } else if (result.status === 404) {
      toast.error("Invalid Request.");
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to send Reset Link"
      );
    }
  };

  const buySubscription = async () => {
    // // console.log('regToken', token)
    setLoading(true);
    const successPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-success`;
    const failedPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-failed`;

    const payloadData = {
      planId: prePlanData?.id,
      isYearlyPayment: term == "Monthly" ? false : true,
      isReoccurring: true,
      paymentFailedUrl: failedPage,
      paymentSuccessUrl: successPage,
    };

    try {
      const result = (await callApi(
        getEndpoint.default.BUY_SUBSCRIPTION,
        "POST",
        payloadData
      )) as any;
// // console.log(result,"resultresult")
      if (result.data == null) {
        handleBuyApiError(result?.errorData);
      } else {
        if (result.data == null) {
          handleBuyApiError(result?.errorData);
        } else {
          toast.success(
            "Redirecting you to the Payment page",
            {
              iconTheme: {
                primary: "#439787",
                secondary: "#FFFAEE",
              },
            }
          );

          // // console.log(result.data)
          const parser1 = new DOMParser();
          const doc1 = parser1.parseFromString(result.data, 'text/html');
          // Extract the form element
          const formElement = doc1.getElementById("payment_post") as HTMLFormElement | null;;
          if (!formElement) return
          // Get the action attribute
          const actionUrl = formElement?.action;
          // setDatas(result.data);
          // handleClose();
          // Create a new form element
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = actionUrl; // Update this with the action URL from the form in `result.data`

          // Parse the inputs from the `result.data` and append them to the form
          const parser = new DOMParser();
          const doc = parser.parseFromString(result.data, 'text/html');
          const inputs = doc.querySelectorAll('input');

          // Append all input fields to the newly created form
          inputs.forEach(input => {
            const clonedInput = document.createElement('input');
            clonedInput.type = 'hidden';
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
        }
      }
    } catch (e) {
      // // console.log(e,"resultresult")
      handleBuyApiError(e);
    } finally {
      setLoading(false);
    }
  };

  const getMyPlansData = async () => {
    setLoading(true);

    try {
      const result = await callApi(`${getEndpoint.default.MYPLANS}`, "GET");
      if (result?.data == null) {
        handleApiError(result?.errorData);
      } else {
        setSubData(result.data);
        calculateDates(result.data);
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setLoading(false);
    }
  };

  const token = "";

  //   const getPlansData = () => {
  //     setLoading(true);

  //     Webservices.callGetApi(getEndpoint.default.PLANS + "/Buyer", token)
  //       .then((result: any) => {
  //         if (result && result.data && result.status === 200) {
  //           //// // console.log('resulPlans',result.data[0],result.status)
  //           setFreePlanData(result.data[0]);
  //           setPrePlanData(result.data[1]);

  //           setFreemium(result.data[0].features);
  //           setPremium(result.data[1].features);
  //           //// // console.log('jdsvds',result.data)

  //           setLoading(false);
  //         } else {
  //           setLoading(false);
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //       });
  //   };

  const getPlansData = async () => {
    setLoading(true);

    try {
      const result = (await callApi(
        `${getEndpoint.default.PLANS}/Buyer`,
        "GET"
      )) as any;
      if (result.data == null) {
        handleApiError(result?.errorData);
      } else {
        // // console.log('brebetne',result?.data)

        setFreemium(result?.data[0].features);
        setPremium(result?.data[1].features);
        setFreePlanData(result?.data[0]);
        setPrePlanData(result?.data[1]);
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-cream w-full md:px-24 ">
        <div className="overflow-auto p-2 lg:p-4 w-full bg-[#f8f8f8] shadow-md my-5 rounded-md ">
          <div className="flex flex-col gap-4 ">
            <div className="p-2 md:flex gap-6 justify-between">
              <div className="flex flex-col gap-6 md:w-[60%]">
                <div className="flex flex-col gap-1">
                  <p color="text.primary" className="font-medium">
                    Your Current Plan is{" "}
                    <span className="text-primary">
                      {" "}
                      {subData?.plan?.name ?? "Freemium"}
                    </span>
                  </p>
                  <p>Ideal for buyers exploring sustainable products.</p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <p color="text.primary" className="font-medium">
                      Rs. {prePlanData?.monthlyPrice}/- Per Month
                    </p>
                    <p className="py-[5px] px-[10px]  bg-[#049b8917] text-primary rounded text-[14px]">
                      Popular
                    </p>
                  </div>
                  <p>
                    Ideal for dedicated buyers seeking a wide range of
                    sustainable products.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 md:w-[40%]  justify-center items-center"></div>

              {/* <Button
              variant="secondary"
              color="primary"
              className="text-white"
              onClick={() => alert("Renew Subscription clicked!")}
            >
              Upgrade
            </Button> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    color="primary"
                    className="text-white text-center"
                  >
                    Upgrade
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:w-[40%] flex flex-col justify-center items-center p-6">
                  <DialogHeader>
                    <DialogTitle className="text-center sm:text-center mb-3">
                      Upgrade Plan
                    </DialogTitle>
                    <DialogDescription className="text-center sm:text-center mb-4">
                      Choose the best plan for you
                    </DialogDescription>
                  </DialogHeader>
                  <div
                    className="flex rounded-full  justify-between mt-[5px] items-center bg-white border-broderGray border  shadow-lg"
                    style={{}}
                  >
                    <div
                      onClick={() => {
                        setTerm("Monthly"), setCookie("term", "Monthly");
                      }}
                      className={`${
                        term === "Monthly"
                          ? "bg-primary border border-primary rounded-full"
                          : ""
                      }`}
                    >
                      <p
                        className={` ${
                          term === "Monthly" ? "text-white" : "text-brown"
                        } text-xs font-normal  px-6 py-3 `}
                      >
                        Monthly
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setTerm("Yearly"), setCookie("term", "Yearly");
                      }}
                      className={`${
                        term === "Yearly"
                          ? "bg-primary border border-primary rounded-full"
                          : ""
                      }`}
                    >
                      <p
                        className={` ${
                          term === "Yearly" ? "text-white" : "text-brown"
                        } text-xs font-normal  px-6 py-3`}
                      >
                        Yearly
                      </p>
                    </div>
                  </div>

                  <div className="px-4 rounded-lg text-center">
                    <p className="font-semibold text-lg mt-3">Premium Plan</p>
               
                    <div className="flex justify-start items-center mb-2 mt-4">
                      {term === "Monthly" ? (
                        <>
                          {prePlanData?.monthlyDiscount == 0 ? (
                            <h4 className="text-lg flex items-center justify-start font-bold ml-2 text-brown">
                      {" "}
                              <span
                                className="text-lg text-brown mr-1"
                                style={{
                                  fontWeight: "400",
                                  fontFamily: "monospace",
                                }}
                              >
                                {" "}
                                ₹
                              </span>
                              &nbsp;
                              {prePlanData?.monthlyPrice}
                              <p className="text-sm font-normal ml-2 text-gray">
                                + {prePlanData?.gst}% GST
                              </p>
                            </h4>
                          ) : (
                            <>
                              {" "}
                              <p className="text-sm font-normal line-through  text-brown">
                                <span
                                  className="text-sm text-brown mr-1"
                                  style={{
                                    fontWeight: "400",
                                    fontFamily: "monospace",
                                  }}
                                >
                                  {" "}
                                  ₹
                                </span>
                                &nbsp;{prePlanData.monthlyPrice}
                              </p>
                              <h4 className="text-lg font-bold ml-2 text-brown">
                  ₹&nbsp;
                                {prePlanData.monthlyPrice -
                                  prePlanData.monthlyDiscount}
                              </h4>
                              <p className="text-sm font-normal ml-2 text-gray">
                                / month
                              </p>
                              <p className="text-sm font-normal ml-2 text-gray">
                                + {prePlanData.gst}% GST
                              </p>
                            </>
                          )}
                        </>
                      ) : prePlanData?.yearlyDiscount == 0 ? (
                        <h4 className="text-lg flex items-center justify-start font-bold ml-2 text-brown">
           {" "}
                          <span
                            className="text-lg text-brown mr-1"
                            style={{
                              fontWeight: "400",
                              fontFamily: "monospace",
                            }}
                          >
                            {" "}
                            ₹
                          </span>
                          &nbsp;
                          {prePlanData?.yearlyPrice}
                          <p className="text-sm font-normal ml-2 text-gray">
                            + {prePlanData?.gst}% GST
                          </p>
                        </h4>
                      ) : (
                        <>
                          {" "}
                          <p className="text-sm font-normal line-through  text-brown">
                            <span
                              className="text-sm text-brown mr-1"
                              style={{
                                fontWeight: "400",
                                fontFamily: "monospace",
                              }}
                            >
                              {" "}
                              ₹
                            </span>
                            &nbsp;{prePlanData?.yearlyPrice}
                          </p>
                          <h4 className="text-lg font-bold ml-2 text-brown">
                   ₹&nbsp;
                            {prePlanData?.yearlyPrice -
                              prePlanData?.yearlyDiscount}
                          </h4>
                          <p className="text-sm font-normal ml-2 text-gray">
                            / year
                          </p>
                          <p className="text-sm font-normal ml-2 text-gray">
                            + {prePlanData?.gst}% GST
                          </p>
                        </>
                      )}
                    </div>
                    <Button
                      className="mt-4 text-white"
                      onClick={buySubscription}
                    >
                      Upgrade Plan
                    </Button>
                  </div>

                  <p className="mt-6 text-sm text-gray-500">
                    Need help choosing? Contact our support team.
                  </p>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col lg:flex-row items-start justify-between py-12 px-4 md:px-16 lg:px-20 space-y-4 lg:space-x-4 lg:space-y-0 mx-auto w-full"
        style={{
          backgroundImage: "url('/images/home/contactbg.webp')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left 10%",
          position: "relative",
          maxWidth: "100%",
        }}
      >
        <div className="overflow-auto p-2 lg:p-4 w-full lg:w-4/12">
          <h1 className="text-4xl font-bold mb-4 text-brown">Buyer Plans</h1>
          <p
            className="text-lg font-thin text-justify text-brown"
            style={{ lineHeight: "1.7" }}
          >
            At Hubeco, we offer a variety of subscription plans designed to
            support buyers at every stage of their purchasing journey. Whether
            you&#39;re a small business looking for cost-effective resources or
            a large organization seeking tailored solutions, we have a plan to
            fit your needs.
          </p>
        </div>
        <div className=" justify-center items-center flex p-2 lg:p-4 w-full lg:w-8/12">
          <div className="flex justify-center w-full">
            <Tabs variant="soft-rounded" className="w-full justify-center ">
              <div style={{}} className="flex items-center justify-center mb-8">
                <TabList
                  style={{
                    border: "0.5px solid #E5E5E5",
                    borderRadius: "10px",
                    padding: "5px",
                    width: "180px",
                    // display:'none'
                    // marginRight: "60px",
                  }}
                  className="flex w-full mr-16"
                >
                  <Tab
                    _selected={{
                      color: "#B90647 !important",
                      background: "#F8E7ED",
                      fontSize: "14px",
                      padding: "10px",
                      border: "1px solid #B90647",
                      borderRadius: "10px",
                      fontWeight: "bold",
                    }}
                    style={{
                      color: "#4d4d4d",
                      fontSize: "14px",
                      padding: "10px",
                      border: "1px solid transparent",
                      // fontWeight: "normal",
                    }}
                  >
                    Monthly
                  </Tab>
                  <Tab
                    _selected={{
                      color: "#B90647 !important",
                      background: "#F8E7ED",
                      fontSize: "14px",
                      padding: "10px",
                      border: "1px solid #B90647",
                      borderRadius: "10px",
                      fontWeight: "bold",
                    }}
                    style={{
                      color: "#4d4d4d",
                      fontSize: "14px",
                      padding: "10px",
                      border: "1px solid transparent",
                      // fontWeight: "normal",
                    }}
                  >
                    Annually
                  </Tab>
                </TabList>
              </div>
              {loading ? (
                <div
                  className={`${
                    loading ? "md:ml-0" : "md-ml-10"
                  } flex items-center justify-center`}
                >
                  <Spinner width={25} height={25} color="#439787" />
                </div>
              ) : (
                <TabPanels className="md:ml-10">
                  <TabPanel>
                    <div className="flex flex-wrap gap-4">
                      {/* First Column */}
                      <div className="w-full lg:w-5/12 relative border-r border-gray-100">
                        <div
                          className=" pr-4"
                          style={{ borderColor: "#E5E7EB", color: "initial" }}
                        >
                          <h3 className="text-2xl font-bold">
                            {freePlanData.name}
                          </h3>
                          <p
                            className="text-sm font-normal text-brown"
                            style={{ marginTop: "20px", height: "40px" }}
                          >
                            {/* Ideal for small businesses and new vendors. */}
                            {freePlanData.description}
                          </p>
                       
                          <h4 className="text-lg text-brown font-bold mt-3 mb-1">
                            Free
                          </h4>
                          <div className="mt-10">
                            <p
                              className="text-xs mb-4 font-medium"
                              style={{
                                borderBottom: "1px solid #E5E7EB",
                                color: "#B90647",
                                //   marginTop: "15px",
                              }}
                            >
                              WHAT&#39;S INCLUDED
                            </p>
                            <div className="">
                              {freemium.map((product, index) => (
                                <div key={index} className="flex mb-5">
                                  <div>
                                    <GoCheckCircleFill
                                      style={{
                                        height: "16px",
                                        width: "20px",
                                        color: "#B90647",
                                      }}
                                    />
                                  </div>
                                  <div className="ml-2">
                                    <p className="text-sm font-normal">
                                      {product.feature.title}
                                      {product.feature.title ===
                                        "Product Listings" &&
                                        `: Up to ${freePlanData.productLimit} products`}
                                    </p>
                                  </div>
                                </div>
                              ))}

                              {disableFreemium.map((product, index) => (
                                <div
                                  key={index}
                                  className="flex items-left mb-5"
                                >
                                  <div>
                                    <GiCircle
                                      style={{
                                        height: "16px",
                                        width: "20px",
                                        color: "#D3D4D9",
                                      }}
                                    />
                                  </div>
                                  <div className="ml-2">
                                    <p
                                      className="text-sm font-normal"
                                      style={{ color: "#D3D4D9" }}
                                    >
                                      {product.plan}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Second Column */}
                      <div className="w-full lg:w-5/12 relative border-r border-gray-100">
                        <div
                          className=" pr-4"
                          style={{ borderColor: "#E5E7EB", color: "initial" }}
                        >
                          <h3 className="text-2xl text-brown font-bold">
                            {prePlanData.name}
                          </h3>
                          <p
                            className="text-sm font-normal mb-2"
                            style={{ marginTop: "20px", height: "40px" }}
                          >
                            {prePlanData.description}
                          </p>

                          <div className="flex justify-start items-center mt-5">
                            {prePlanData.monthlyDiscount == 0 ? (
                              <h4 className="text-lg flex items-center justify-start font-bold ml-2 text-brown">
                                <span
                                  className="text-lg text-brown mr-1"
                                  style={{
                                    fontWeight: "400",
                                    fontFamily: "monospace",
                                  }}
                                >
                                  {" "}
                                  ₹
                                </span>
                                &nbsp;
                                {prePlanData.monthlyPrice}
                                <p className="text-sm font-normal ml-2 text-gray">
                                  + {prePlanData.gst}% GST
                                </p>
                              </h4>
                            ) : (
                              <>
                                {" "}
                                <p className="text-sm font-normal line-through  text-brown">
                                  <span
                                    className="text-sm text-brown mr-1"
                                    style={{
                                      fontWeight: "400",
                                      fontFamily: "monospace",
                                    }}
                                  >
                                    {" "}
                                    ₹
                                  </span>
                                  &nbsp;{prePlanData.monthlyPrice}
                                </p>
                                <h4 className="text-lg font-bold ml-2 text-brown">
                                  ₹&nbsp;
                                  {prePlanData.monthlyPrice -
                                    prePlanData.monthlyDiscount}
                                </h4>
                                <p className="text-sm font-normal ml-2 text-gray">
                                  / month
                                </p>
                                <p className="text-sm font-normal ml-2 text-gray">
                                  + {prePlanData.gst}% GST
                                </p>
                              </>
                            )}
                          </div>
                          <div style={{}} className="mt-8">
                            <p
                              className="text-xs mb-4 font-medium"
                              style={{
                                borderBottom: "1px solid #E5E7EB",
                                color: "#B90647",
                                //   marginTop: "15px",
                              }}
                            >
                              WHAT&#39;S INCLUDED
                            </p>
                            <div className="">
                              {premium.map((product: any, index: any) => (
                                <div
                                  key={index}
                                  className="flex  mb-5 items-center"
                                >
                                  <div>
                                    <GoCheckCircleFill
                                      style={{
                                        height: "16px",
                                        width: "20px",
                                        color: "#109899",
                                      }}
                                    />
                                  </div>
                                  <div className="ml-2">
                                    <p className="text-sm font-normal">
                                      {product?.feature.title}
                                      {product?.feature.title ===
                                        "Product Listings" &&
                                        (prePlanData.productLimit === -1
                                          ? ": Unlimited"
                                          : null)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="flex flex-wrap gap-4">
                      {/* First Column */}
                      <div className="w-full lg:w-5/12 relative">
                        <div
                          className="border-r border-gray-100 pr-4"
                          style={{ borderColor: "#E5E7EB", color: "initial" }}
                        >
                          <h3 className="text-2xl font-bold">
                            {freePlanData.name}
                          </h3>
                          <p
                            className="text-sm font-normal text-brown"
                            style={{ marginTop: "20px", height: "40px" }}
                          >
                            {freePlanData.description}
                          </p>
                          {/* <div
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <CustomButton
                      title={"Choose Freemium plan"}
                      className="bg-secondary h-12 md:h-12 md:w-90 w-full md:text-md text-sm text-white opacity-0"
                      rightIcon={<GoArrowRight />}
                      onPress={()=>{
                        setCookie('selectedPlanId','67d7f49a-d601-4d83-ae81-ba1789eddac5'),
                        router.push('/login')
                      }}                               
                      />
                  </div> */}
                          <h4 className="text-lg text-brown font-bold mt-3 mb-1">
                            Free
                          </h4>
                          <div className="mt-10">
                            <p
                              className="text-xs mb-4 font-medium"
                              style={{
                                borderBottom: "1px solid #E5E7EB",
                                color: "#B90647",
                                //   marginTop: "15px",
                              }}
                            >
                              WHAT&#39;S INCLUDED
                            </p>
                            <div className="">
                              {freemium.map((product, index) => (
                                <div key={index} className="flex mb-5">
                                  <div>
                                    <GoCheckCircleFill
                                      style={{
                                        height: "16px",
                                        width: "20px",
                                        color: "#B90647",
                                      }}
                                    />
                                  </div>
                                  <div className="ml-2">
                                    <p className="text-sm font-normal">
                                      {product.feature.title}
                                      {product.feature.title ===
                                        "Product Listings" &&
                                        `: Up to ${freePlanData.productLimit} products`}
                                    </p>
                                  </div>
                                </div>
                              ))}
                              {disableFreemium.map((product, index) => (
                                <div
                                  key={index}
                                  className="flex items-left mb-5"
                                >
                                  <div>
                                    <GiCircle
                                      style={{
                                        height: "16px",
                                        width: "20px",
                                        color: "#D3D4D9",
                                      }}
                                    />
                                  </div>
                                  <div className="ml-2">
                                    <p
                                      className="text-sm font-normal"
                                      style={{ color: "#D3D4D9" }}
                                    >
                                      {product.plan}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Second Column */}
                      <div className="w-full lg:w-5/12 relative">
                        <div
                          className="border-r border-gray-100 pr-4"
                          style={{ borderColor: "#E5E7EB", color: "initial" }}
                        >
                          <h3 className="text-2xl text-brown font-bold">
                            {prePlanData.name}
                          </h3>
                          <p
                            className="text-sm font-normal mb-2"
                            style={{ marginTop: "20px", height: "40px" }}
                          >
                            {prePlanData.description}
                          </p>
                       
                          <div className="flex justify-start items-center mt-5">
                            {prePlanData.yearlyDiscount == 0 ? (
                              <>
                                <h4 className="text-lg flex items-center justify-start font-bold ml-2 text-brown">
                                  <span
                                    className="text-lg text-brown mr-1"
                                    style={{
                                      fontWeight: "400",
                                      fontFamily: "monospace",
                                    }}
                                  >
                                    {" "}
                                    ₹
                                  </span>
                                  &nbsp;
                                  {prePlanData.yearlyPrice}
                                  <p className="text-sm font-normal ml-2 text-gray">
                                    + {prePlanData.gst}% GST
                                  </p>
                                </h4>
                              </>
                            ) : (
                              <>
                                <p className="text-sm font-normal line-through  text-brown">
                                  <span
                                    className="text-sm text-brown mr-1"
                                    style={{
                                      fontWeight: "400",
                                      fontFamily: "monospace",
                                    }}
                                  >
                                    {" "}
                                    ₹
                                  </span>
                                  &nbsp;{prePlanData.yearlyPrice}
                                </p>
                                <h4 className="text-lg font-bold ml-2 text-brown">
                                  <span
                                    className="text-lg text-brown mr-1"
                                    style={{
                                      fontWeight: "400",
                                      fontFamily: "monospace",
                                    }}
                                  >
                                    {" "}
                                    ₹
                                  </span>
                                  &nbsp;
                                  {prePlanData.yearlyPrice -
                                    prePlanData.yearlyDiscount}
                                </h4>
                                <p className="text-sm font-normal ml-2 text-gray">
                                  / year
                                </p>
                                <p className="text-sm font-normal ml-2 text-gray">
                                  + {prePlanData.gst}% GST
                                </p>
                              </>
                            )}
                          </div>
                          <div style={{}} className="mt-8">


                            <p
                              className="text-xs mb-4 font-medium"
                              style={{
                                borderBottom: "1px solid #E5E7EB",
                                color: "#B90647",
                                //   marginTop: "15px",
                              }}
                            >
                              WHAT&#39;S INCLUDED
                            </p>
                            <div className="">
                              {premium.map((product: any, index: any) => (
                                <div
                                  key={index}
                                  className="flex  mb-5 items-center"
                                >
                                  <div>
                                    <GoCheckCircleFill
                                      style={{
                                        height: "16px",
                                        width: "20px",
                                        color: "#B90647",
                                      }}
                                    />
                                  </div>
                                  <div className="ml-2">
                                    <p className="text-sm font-normal">
                                      {product.feature.title}
                                      {product.feature.title ===
                                        "Product Listings" &&
                                        (prePlanData.productLimit === -1
                                          ? ": Unlimited"
                                          : null)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
