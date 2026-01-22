"use client";
import Footer from "@/components/footer/MainFooter";

import Header from "@/components/header/MainHeader";
// import { GoCheckCircleFill } from "react-icons/go";
// import { PiMinusCircleBold, PiPhoneLight } from "react-icons/pi";
// import { GiCircle } from "react-icons/gi";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import {
  CircularProgress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import Premium from '@/components/subscriptions/PremiumUser'
import Freemium from '@/components/subscriptions/FreeUser'
import { useLogout } from "@/components/hooks/useLogOut";
import { getCookie } from "cookies-next";
import BannerSection from "@/components/sharedComponents/BannerSection";


type SubscriptionStatus = 'premium' | 'freemium' | null
export default function Page() {
    const [subscription, setSubscription] = useState<SubscriptionStatus>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { refreshTokens } = useRefreshToken()
    const { handleUserLogout } = useLogout()
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imo5dVg2c3RDLytua1ZUU3NJUWFiRjFkY0ZLM2dCV1hsWno4d3IzK2pScit5aVNEb3g3VmloUT09IiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6IkFkbWluIiwidXNlcklkIjoiNzU2ZDEzODQtZWE2Mi00NTc4LWJkYzUtY2E4ZGJiYzcyMDdlIiwidXNlclR5cGUiOiJBZG1pbiIsInNlc3Npb25JZCI6ImZlNjNkMDIzLTdmOWQtNGQ5MS04ZGE0LTY4MjdhOTMyZTNhMyIsInRodW1ibmFpbCI6bnVsbCwiaWF0IjoxNzIxMjk0MTg5LCJleHAiOjE3MjM4ODYxODl9.kbFPt7byLPwsocSyv15ljGS_sMP-XpYsClLz6t-laqg'
  
    const token = getCookie('token')
  
    useEffect(() => {
      // Function to fetch subscription data from API
      const fetchSubscription = async () => {
        setLoading(true)
  
        try {
          // Call the API using Webservices.callGetApi method
          const result = await Webservices.callGetApi(getEndpoint.default.MYPLANS, token)
  
          // Check if API response is valid
          if (result && result.data && result.status === 200) {
            // Extract the plan name from the API response
            const planName = result.data.plan.name.toLowerCase()
  
            setLoading(false)
  

            // Update subscription state based on the plan name
            if (planName === 'premium' || planName === 'premium plan') {
              setSubscription('premium')
            } else if (planName === 'freemium') {
              setSubscription('freemium')
            } else {
              setSubscription(null)
            }
          } else {
            // consoleerror('Error fetching subscription status:', result)
            setSubscription(null)
          }
        } catch (err: any) {
          // consoleerror('Error fetching subscription status:', err)
         // // console.log('err', err)
          if (err?.response?.status === 401) {
            const rememberMe = localStorage.getItem('rememberMe')
            if (rememberMe === 'true') {
              await refreshTokens()
              window.location.reload()
            } else {
              handleUserLogout('terminated')
            }
          }
          setSubscription(null)
        }
  
        setLoading(false)
      }
  
      // Fetch subscription data on component mount
      fetchSubscription()
    }, [])








  return (
    <div className="bg-cream">
      {/* <Head>
        <title>Plans | Hubeco Buyer</title>
      </Head> */}
       <head>
        <title>Plans | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      <Header />
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Subscriptions", href: "#" }}
  
      />
      <div>
      {loading ? (
        <div className={'w-full flex pt-20 h-1/2 justify-center items-center'}>
          <CircularProgress isIndeterminate color='primary' size={50} />
        </div>
      ) : (
        // renderPage()
        <>{subscription == 'premium' ? <Premium /> : <Freemium />}</>
      )}
    </div>
   
    </div>
  );
}

