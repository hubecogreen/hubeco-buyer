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
import { MdOutlineFileDownload } from "react-icons/md";
import useClient from "../hooks/useClient";
type ExpandedIndex = number | null | undefined;

const planIdFree = process.env.NEXT_PUBLIC_B_PLAN_ID_FREE;
const planIdPaid = process.env.NEXT_PUBLIC_B_PLAN_ID_PAID;

export default function Page() {
  const [freePlanData, setFreePlanData] = useState<any>({});
  const [prePlanData, setPrePlanData] = useState<any>({});
  const [freemium, setFreemium] = useState<{ feature: { title: string } }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  //   const [premium, setPremium] = useState<{ feature: { title: string } }[]>([]);
  const [subData, setSubData] = useState<any>({});
  const [premium, setPremium] = useState<
    { title: string; description: string; isActive: boolean }[]
  >([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [term, setTerm] = useState<string>("Monthly");
  const [planId, setPlanId] = useState("");
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  const isClient = useClient()
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
      toast.error("Invalid Request.");
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

  const getPlansData = () => {
    setLoading(true);

    Webservices.callGetApi(getEndpoint.default.PLANS + "/Buyer", token)
      .then((result: any) => {
        if (result && result.data && result.status === 200) {
          //// // console.log('resulPlans',result.data[0],result.status)
          setFreePlanData(result.data[0]);
          setPrePlanData(result.data[1]);
          setFreemium(result.data[0].features);
          setPremium(result.data[1].features);
          //// // console.log('jdsvds',result.data)

          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleDownload = async (url: any) => {
    // window.open(url,'_blank')
    // return

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {},
        mode: "no-cors",
      });
      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob(); // Get the file data as a blob
      const fileName = url.split("/").pop(); // Extract the file name from the URL

      // Create a blob URL and trigger download
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      // Revoke the blob URL after download
      window.URL.revokeObjectURL(blobUrl);
    } catch (error: any) {
      window.open(url);
      // consoleerror("Download Failed:", error?.message);
    }
  };

  if(!isClient)
    return <></>

  return (
    <div>
      <div className="bg-white w-full md:px-24 ">
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
                  <p>{prePlanData.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p color="text.primary" className="font-medium tracking-wide">
                    Active until {daysRemain.expiryDate}
                  </p>
                  <p>
                    We will send you a notification upon Subscription expiration
                  </p>
                </div>

                {/* <div className="flex flex-col gap-1">
                <p color="text.primary" className="font-medium tracking-wide">
                  Current Plan Amount{" "}
                  {subData.planValidity === "ONE_MONTH"
                    ? "Rs. " + prePlanData.monthlyPrice
                    : "Rs. " + prePlanData.yearlyPrice}{" "}
                  /{subData.planValidity === "ONE_MONTH" ? "Monthly" : "Yearly"}
                </p>
                <p>Transaction Id : {subData?.paymentId} </p>
              </div> */}
              </div>
              <div className="flex flex-col gap-6 md:w-[40%] justify-start items-end">
                {Number(daysRemain?.totalDays) - Number(daysRemain.daysPassed) <
                  10 &&
                  daysRemain.showRenewButton && (
                    <Alert>
                      <AlertTitle>We need your attention!</AlertTitle>
                      Your plan requires update
                    </Alert>
                  )}
                <div className="flex flex-col gap-1 mt-4">
                  <div className="flex items-center justify-between">
                    <p color="text.primary" className="font-medium">
                      Days
                    </p>
                    <p color="text.primary" className="font-medium">
                      {daysRemain.daysPassed} of {daysRemain.totalDays} Days
                    </p>
                  </div>
                  {/* <CircularProgress
                  variant='determinate'
                  value={Number(daysRemain.percentage)}
                  sx={{ height: 10, borderRadius: 5, my: 1 }}
                /> */}
                  <Progress
                    value={Number(daysRemain.percentage)}
                    className=" h-[10px] rounded my-1"
                  />
                  <p>
                    {daysRemain.remainingDays} days remaining until your plan
                    requires update
                  </p>
                </div>
                {subData?.invoiceLink && (
                  <Button
                    onClick={() =>
                      handleDownload(`${assetURL}/${subData?.invoiceLink}`)
                    }
                    variant={"outline"}
                    className="mt-2 !py-0 w-fit !h-[35px] !px-2 border-secondary text-secondary rounded-none bg:white hover:bg-white hover:text-secondary "
                  >
                    <MdOutlineFileDownload color="#9B314A" /> Download Invoice
                  </Button>
                )}
              </div>
              {daysRemain.showRenewButton && (
                <Button
                  variant="secondary"
                  color="primary"
                  onClick={() => alert("Renew Subscription clicked!")}
                >
                  Renew Subscription
                </Button>
              )}
            </div>
            <div className="w-full flex justify-end items-center"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-between py-12 px-4 md:px-16 lg:px-20 space-y-4 lg:space-x-4 lg:space-y-0 mx-auto w-full bg-cover bg-no-repeat bg-left-10% relative max-w-full">
        <div className="overflow-auto p-2 lg:p-4 w-full lg:w-6/12">
          <h1 className="text-4xl font-bold mb-4 text-black">Buyer Plans</h1>
          <p className="text-lg font-thin text-justify text-black leading-custom-1.7">
            At Hubeco, we offer a variety of subscription plans designed to
            support buyers at every stage of their purchasing journey. Whether
            you&#39;re a small business looking for cost-effective resources or
            a large organization seeking tailored solutions, we have a plan to
            fit your needs.
          </p>
        </div>
        <div className=" justify-center items-center flex p-2 lg:p-4 w-full lg:w-6/12">
          <div className="flex justify-center w-full">
            <div
              onClick={() => {
                setSelectedPlan("premium"),
                  setCookie("selectedPlanId", planIdPaid),
                  setPlanId(planIdPaid);
              }}
              className={`hover:cursor-pointer  relative border  rounded p-4`}
            >
              <div className="text-inherit">
                <div className="border-b border-[#ededed] border-solid">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-left text-secondary">
                      {prePlanData.name}
                    </h3>
                    {/* <div className="flex rounded-full  justify-between items-center bg-white  shadow-lg" style={{marginTop:'-2px'}}>
                                <div onClick={()=>{setTerm('Monthly'),setCookie('term','Monthly')}} className={`${term==='Monthly' ? 'bg-primary border border-primary rounded-full' : ''}`}>
                                    <p className={` ${term==='Monthly' ? 'text-white' : 'text-black'} text-xs font-normal  px-4 py-1 `}>Monthly</p>
                                </div>
                                <div onClick={()=>{setTerm('Yearly'),setCookie('term','Yearly')}} className={`${term==='Yearly' ? 'bg-primary border border-primary rounded-full' : ''}`}>
                                    <p className={` ${term==='Yearly' ? 'text-white' : 'text-black'} text-xs font-normal  px-4 py-1`}>Yearly</p>
                                </div>
                            </div> */}
                  </div>
                  <p className="text-sm font-normal text-black text-left mt-5 h-[30px]">
                    {prePlanData.description}
                  </p>
                </div>
                <div className="mt-6">
                  <div className="">
                    {premium.map((product: any, index: any) => (
                      <div key={index} className="flex  mb-5 items-center">
                        <div>
                          <GoCheckCircleFill className="w-[20px] h-[16px] text-[#B90647]" />
                        </div>

                        <div className="ml-2">
                          <p className="text-sm font-normal">
                            {product?.feature.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
