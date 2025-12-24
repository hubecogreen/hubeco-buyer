"use client";
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import { GoCheckCircleFill } from "react-icons/go";
import { PiMinusCircleBold, PiPhoneLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import {
  // Accordion,
  // AccordionItem,
  // AccordionButton,
  // AccordionPanel,
  // AccordionIcon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  // CircularProgress,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import { TfiEmail } from "react-icons/tfi";
import { AiFillHome } from "react-icons/ai";
import Head from "next/head";
// import { features } from "process";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCookie, setCookie } from "cookies-next";
type ExpandedIndex = number | null | undefined;
import Image from "next/image";
 
const planIdFree = process.env.NEXT_PUBLIC_B_PLAN_ID_FREE;
const planIdPaid = process.env.NEXT_PUBLIC_B_PLAN_ID_PAID;
export default function Page() {
  const [freePlanData, setFreePlanData] = useState<any>({});
  const [prePlanData, setPrePlanData] = useState<any>({});
  const [freemium, setFreemium] = useState<{ feature: { title: string } }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [premium, setPremium] = useState<{ feature: { title: string } }[]>([]);
 
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
  }, []);
 
  const token = getCookie("token");
 
  const getPlansData = () => {
    setLoading(true);
    Webservices.callGetApi(getEndpoint.default.PLANS + "/Buyer", "")
      .then((result: any) => {
        if (result && result.data && result.status == 200) {
          setFreemium(result.data[0].features);
          setPremium(result.data[1].features);
          setFreePlanData(result.data[0]);
          setPrePlanData(result.data[1]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className="bg-cream">
      <Head>
        <title>Buyer Plans | Hubeco Buyer</title>
      </Head>
      {/* <Header /> */}
      <div className="banner-section">
        <div className="relative md:px-20 px-10 bg-[url('/images/about/aboutBanner1.webp')] bg-cover bg-center h-[200px] flex items-center justify-start text-white">
          <Link
            href="/"
            className="text-white flex items-center no-underline px-2.5 py-1 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>
 
          <span className="text-white mx-2">/</span>
          <Link
            href="/plans"
            className="text-white no-underline px-2.5 py-1 rounded"
          >
            Subscription Plans
          </Link>
        </div>

        <div className="bg-white w-full">
          <div
            className="flex flex-col lg:flex-row items-start justify-between py-12 px-4 md:px-16 lg:px-20 space-y-4 lg:space-x-4 lg:space-y-0 mx-auto w-full bg-[url('/images/home/contactbg.webp')] bg-contain bg-no-repeat bg-left-10% relative max-w-full"
          >
            <div className="overflow-auto p-2 lg:p-4 w-full lg:w-4/12">
              <h1 className="text-4xl font-bold mb-4 text-black">
                Buyer Plans
              </h1>
              <p
                className="text-lg font-thin text-justify text-black leading-relaxed"
              >
                At Hubeco, we offer a variety of subscription plans designed to
                support buyers at every stage of their purchasing journey.
                Whether you&#39;re a small business looking for cost-effective
                resources or a large organization seeking tailored solutions, we
                have a plan to fit your needs.
              </p>
            </div>
            <div className="justify-center items-center flex p-2 lg:p-4 w-full lg:w-8/12">
              <div className="flex justify-center w-full">
                <Tabs variant="soft-rounded" className="w-full justify-center">
                  <div
                    className="flex items-center justify-center mb-8"
                  >
                    <TabList
                      className=" mr-16 border border-[#E5E5E5] rounded-lg p-1.5 w-[180px] hidden"
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
                        className="text-[#4d4d4d] text-sm py-2.5 px-2.5 border border-transparent"
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
                        className="text-[#4d4d4d] text-sm py-2.5 px-2.5 border border-transparent"
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
                            <div className="pr-4 text-current">
                              <h3 className="text-2xl font-bold">
                                {freePlanData.name}
                              </h3>
                              <p className="text-sm font-normal text-black mt-5 h-10">
                                {freePlanData.description}
                              </p>
                              <div className="my-5">
                                <CustomButton
                                  title={"Choose Freemium plan"}
                                  className="bg-secondary h-12 md:h-12 md:w-90 w-full md:text-md text-sm text-white"
                                  rightIcon={<GoArrowRight />}
                                  onPress={() => {
                                    setCookie("selectedPlanId", planIdFree),
                                    router.push("/login");
                                  }}
                                />
                              </div>
                              <h4 className="text-lg text-black font-bold mt-3 mb-1">
                                Free
                              </h4>
                              <div className="mt-10">
                                <p className="text-xs mb-4 font-medium text-[#B90647] border-b border-[#E5E7EB]">
                                  WHAT&#39;S INCLUDED
                                </p>
                                <div>
                                  {freemium.map((product, index) => (
                                    <div key={index} className="flex mb-5">
                                      <div>
                                        <GoCheckCircleFill className="h-4 w-5 text-[#B90647]" />
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
                                        <GiCircle className="h-4 w-5 text-[#D3D4D9]" />
                                      </div>
                                      <div className="ml-2">
                                        <p className="text-sm font-normal text-[#D3D4D9]">
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
                            <div className="pr-4 text-current">
                              <h3 className="text-2xl text-black font-bold">
                                {prePlanData.name}
                              </h3>
                              <p className="text-sm font-normal mb-2 mt-5 h-10">
                                {prePlanData.description}
                              </p>
                              <div className="mt-5">
                                <CustomButton
                                  title={"Choose Premium plan"}
                                  className="bg-secondary h-12 md:h-12 md:w-90 w-full md:text-md text-sm text-white"
                                  rightIcon={<GoArrowRight />}
                                  onPress={() => {
                                    setCookie("selectedPlanId", planIdPaid),
                                    setCookie("planTerm", "monthly"),
                                    router.push("/login");
                                  }}
                                />
                              </div>
                              <div className="flex justify-start items-center mt-5">
                                {prePlanData.monthlyDiscount == 0 ? (
                                  <h4 className="text-lg flex items-center justify-start font-bold ml-2 text-black">
                                    ₹&nbsp;
                                    {prePlanData.monthlyPrice}
                                    <p className="text-sm font-normal ml-2 text-gray">
                                      + {prePlanData.gst}% GST
                                    </p>
                                  </h4>
                                ) : (
                                  <>
                                    <p className="text-sm font-normal line-through text-black">
                                      ₹&nbsp;{prePlanData.monthlyPrice}
                                    </p>
                                    <h4 className="text-lg font-bold ml-2 text-black">
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
                              <div className="mt-10">
                                <p className="text-xs mb-4 font-medium text-[#B90647] border-b border-[#E5E7EB]">
                                  WHAT&#39;S INCLUDED
                                </p>
                                <div>
                                  {premium.map((product, index) => (
                                    <div
                                      key={index}
                                      className="flex mb-5 items-center"
                                    >
                                      <div>
                                        <GoCheckCircleFill className="h-4 w-5 text-[#B90647]" />
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

        <div className="relative">
         
          <div className="bg-cover bg-center h-96" style={{ backgroundImage: "url('images/plans/signupBanner.webp')" }}>
            <div className="bg-opacity-90 h-full flex items-center justify-center py-20">
              <div className="text-center p-4 max-w-5xl text-white">
                <h1 className="text-3xl text-white font-bold mb-4">
                  Sign Up Today
                </h1>
                <p className="mb-10 text-white text-big">
                  Ready to take your business to the next level? Choose the plan
                  that best suits your needs and start selling your sustainable
                  building materials on hubeco.market
                </p>
                <div className="flex items-center justify-center">
                  <div className="flex flex-col md:flex-row gap-4">
                    <CustomButton
                      title={"Become a Vendor"}
                      className="text-white font-semibold h-12 md:h-12 md:w-40 w-30 md:text-md text-sm bg-secondary hover:bg-primary"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "#FFFFFF",
                        minWidth: "200px",
                      }}
                      onPress={() => {
                        router.push("/plans");
                      }}
                      rightIcon={<GoArrowRight />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full py-4 md:flex items-center justify-center p-4 md:p-6">
          <div className="w-full md:w-11/12 md:flex items-center justify-center bg-[url('/images/plans/bg-2-plans.webp')] bg-cover bg-center bg-no-repeat min-h-[330px]">
            <div className="w-full md:w-7/12 px-4 py-4 text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-[#f2f2f2]">
                Need Help Deciding?
              </h1>
              <p className="mt-10 text-bg text-[#f2f2f2] text-2xl">
                If you have any questions or need assistance in selecting the
                right plan for your business, our support team is here to help.
                Contact us on
              </p>
              <div className="md:flex block mt-8">
                <div className="flex items-center mb-4 md:md-0">
                  <div className="bg-white p-1.5 h-8 rounded-md flex items-center justify-center">
                    <TfiEmail className="text-secondary h-4 w-5" />
                  </div>
                  <div className="ml-2">
                    <Link
                      href="mailto:info@hubeco.market"
                      className="font-semibold text-[#f2f2f2] text-md md:text-base no-underline"
                    >
                      info@hubeco.market
                    </Link>
                  </div>
                </div>
                <div className="flex items-center mb-4 md:md-0 md:ml-5">
                  <div className="bg-white p-1.5 h-8 rounded-md flex items-center justify-center">
                    <PiPhoneLight className="text-secondary h-5 w-5" />
                  </div>
                  <div className="ml-2">
                    <h6 className="font-semibold text-md md:text-base text-[#f2f2f2]">
                      +91 9705044055
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-4/12 flex justify-end">
              <Image
                src="images/plans/help.webp"
                alt="banner1"
                className="w-full md:w-auto md:max-w-full h-[330px]"
                width={500}
                height={330}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}