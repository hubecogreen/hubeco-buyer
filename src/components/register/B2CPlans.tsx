// SecurityForm.tsx
import React, { useEffect, useState } from "react";
import CustomInput from "../customInput/CustomTextField";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import useApi from "../Fetcher/useAPI";
import * as getEndpoint from "../../network/EndPoints";
import { useRouter } from "next/navigation";
import { GoArrowRight, GoCheckCircleFill } from "react-icons/go";
import { GiCircle } from "react-icons/gi";
import { getCookie, setCookie } from "cookies-next";
import * as Webservices from "../../network/WebServices";
import useRefreshToken from "../hooks/useRefreshToken";
import { CircularProgress, Spinner } from "@chakra-ui/react";
import useClient from "../hooks/useClient";

interface FormProps {
  prevStep: () => void;
}
const planIdFree = process.env.NEXT_PUBLIC_B_PLAN_ID_FREE
const planIdPaid = process.env.NEXT_PUBLIC_B_PLAN_ID_PAID

const B2CPlans: React.FC<FormProps> = ({ prevStep }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [freemium, setFreemium] = useState([]);
  const [premium, setPremium] = useState([]);
  const [freePlanData, setFreePlanData] = useState<any>({});
  const [prePlanData, setPrePlanData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [freeplan, setFreePlan] = useState("");
  const [premiumplan, setPremiumPlan] = useState("");
  const [term, setTerm] = useState<string>("Monthly");

  const [planId, setPlanId] = useState("");
  const token = getCookie("token");
  const { callApi } = useApi();
  const router = useRouter();
  const { refreshTokens } = useRefreshToken();
  const isClient = useClient()

  useEffect(() => {
    getPlansData();
    if (getCookie("selectedPlanId") == planIdFree) {
      setSelectedPlan("free");
      setPlanId(planIdFree);
      setTerm("Monthly");
    } else if (
      getCookie("selectedPlanId") == planIdPaid
    ) {
      setSelectedPlan("premium");
      setPlanId(planIdPaid);
      if (getCookie("planTerm") == "Monthly") {
        setTerm("Monthly");
      } else if (getCookie("planTerm") == "Yearly") {
        setTerm("Yearly");
      } else {
        setTerm("Monthly");
      }
    } else {
      setSelectedPlan("free");
      setPlanId(planIdFree);
      setTerm("Monthly");
    }
  }, []);

  const handleApiError = async (err: any) => {
    const result = err && err.response;
    // // console.log('errresult',err)
    if (result.status === 201) {
      toast.success("Reset Password link sent successfully", {
        iconTheme: {
          primary: "#439787",
          secondary: "#FFFAEE",
        },
      });
      // reset()
      router.push("/login?fromPage=forget");
    } else if (result.status === 404) {
      toast.error("Buyer not exists.Please enter Valid Email");
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to send Reset Link"
      );
    }
  };

  useEffect(() => {
    // getPlansData();
  }, []);

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
        setFreePlan(result?.data[0].id);
        setPremiumPlan(result?.data[1].id);
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setLoading(false);
    }
  };

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
    setIsLoading(true);
    const successPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-success`;
    const failedPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-failed`;

    const payloadData = {
      planId: planId,
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

      if (result.data == null) {
        handleBuyApiError(result?.errorData);
      } else {
        if (result.data == null) {
          handleBuyApiError(result?.errorData);
        } else {
          toast.success(
            "Registration Successful, redirecting you to the Payment page",
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
      handleBuyApiError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const buyFreePlan = () => {
    router.push("/registration-success");
  };

  if(!isClient)
    return <></>
    
  return (
    <div className="w-full">
      {/* <div style={{ display: "flex" }}> */}
      {loading ? (
        <>
          <div
            className={`${loading ? "md:ml-0" : "md-ml-10"
              } flex items-center justify-center`}
          >
            <Spinner width={25} height={25} color="#439787" />
          </div>
        </>
      ) : (
        <>
          <div className="md:flex block md:gap-2">
            {/* First Column */}
            <div
              onClick={() => {
                setSelectedPlan("free"),
                  setCookie(
                    "selectedPlanId",
                    planIdFree
                  ),
                  setPlanId(planIdFree);
              }}
              className={`md:w-1/2 w-full hover:cursor-pointer  relative border ${selectedPlan == "free"
                  ? "border-secondary bg-[#a9244905]"
                  : "border-buttonGray"
                }  rounded p-4`}
            >
              <div className="border border-[#eaeaea] text-initial">

                <div className="border-b border-[#ededed] border-solid">
                  <h3 className="text-2xl font-bold text-left text-secondary">
                    {freePlanData?.name}
                  </h3>
                  <p className="text-sm font-normal text-brown text-left mt-5 h-[30px]">

                    {freePlanData?.description}
                  </p>
                  <div className="flex justify-start items-center mb-4 mt-4">
                    <h4 className="text-lg text-brown font-bold mt-3 mb-1">
                      Free
                    </h4>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="">
                    {freemium.map((product: any, index: any) => (
                      <div key={index} className="flex items-center mb-5">
                        <div>
                          <GoCheckCircleFill className="h-4 w-5 text-[#B90647]" />
                        </div>

                        <div className="ml-2">
                          <p className="text-sm font-normal">
                            {product.feature.title}
                            {product.feature.title === "Product Listings" &&
                              `: Up to ${freePlanData?.productLimit} products`}
                          </p>
                        </div>
                      </div>
                    ))}

                    {disableFreemium.map((product, index) => (
                      <div key={index} className="flex items-left mb-5">
                        <div>
                        <div>
  <GoCheckCircleFill className="h-4 w-5 text-[#B90647]" />
</div>

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
            <div
              onClick={() => {
                setSelectedPlan("premium"),
                  setCookie(
                    "selectedPlanId",
                    planIdPaid
                  ),
                  setPlanId(planIdPaid);
              }}
              className={`md:w-1/2 w-full hover:cursor-pointer  relative border ${selectedPlan === "premium"
                  ? "border-secondary bg-[#a9244905]"
                  : "border-buttonGray"
                }  rounded p-4`}
            >
              <div className="border border-[#eaeaea] text-initial">
                <div className="border-b border-[#ededed] border-solid">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-left text-secondary">
                      {prePlanData.name}
                    </h3>
                    <div className="flex rounded-full justify-between items-center bg-white shadow-lg mt-[-2px]">

                      <div
                        onClick={() => {
                          setTerm("Monthly"), setCookie("term", "Monthly");
                        }}
                        className={`${term === "Monthly"
                            ? "bg-primary border border-primary rounded-full"
                            : ""
                          }`}
                      >
                        <p
                          className={` ${term === "Monthly" ? "text-white" : "text-brown"
                            } text-xs font-normal  px-4 py-1 `}
                        >
                          Monthly
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          setTerm("Yearly"), setCookie("term", "Yearly");
                        }}
                        className={`${term === "Yearly"
                            ? "bg-primary border border-primary rounded-full"
                            : ""
                          }`}
                      >
                        <p
                          className={` ${term === "Yearly" ? "text-white" : "text-brown"
                            } text-xs font-normal  px-4 py-1`}
                        >
                          Yearly
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-normal text-brown text-left mt-5 h-[30px]">
                    {prePlanData?.description}
                  </p>

                  <div className="flex justify-start items-center mb-4 mt-8">
                    {term === "Monthly" ? (
                      <>
                        {prePlanData?.monthlyDiscount == 0 ? (
                          <h4 className="text-lg flex items-center justify-start font-bold ml-2 text-brown">
                            <span className="text-lg text-brown mr-1 font-mono font-normal">
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
                              <span className="text-lg text-brown mr-1 font-mono font-normal">
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
                        <span className="text-lg text-brown mr-1 font-mono font-normal">
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
                        <span className="text-lg text-brown mr-1 font-mono font-normal">
                            {" "}
                            ₹
                          </span>
                          &nbsp;{prePlanData?.yearlyPrice}
                        </p>
                        <h4 className="text-lg font-bold ml-2 text-brown">
                        <span className="text-lg text-brown mr-1 font-mono font-normal">
                            {" "}
                            ₹
                          </span>
                          &nbsp;
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
                </div>
                <div style={{}} className="mt-6">
                  <div className="">
                    {premium.map((product: any, index: any) => (
                      <div key={index} className="flex  mb-5 items-center">
                        <div>
                        <GoCheckCircleFill className="h-4 w-5 text-[#B90647]" />

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
        </>
      )}

      {/* </div> */}

      <div className="flex flex-col sm:flex-row justify-between mt-10">
        <CustomButton
          title={"Back"}
          className="ml-3 hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-brown "
          customStyles={{ backgroundColor: "#E0E0E0" }}
          onPress={prevStep}
        />
        <CustomButton
          title={"Continue"}
          className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white "
          customStyles={{}}
          onPress={selectedPlan == "free" ? buyFreePlan : buySubscription}
          type="submit"
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default B2CPlans;
