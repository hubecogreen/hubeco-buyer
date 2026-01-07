'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import animationData from '../../../public/animations/failure.json'
import Store from '../../reduxStore'
import * as getEndpoint from '../../network/EndPoints'
import * as Webservices from '../../network/WebServices'
import CustomButton from '../../components/customButton/CustomButton'
import { CircularProgress, Divider } from '@chakra-ui/react'
import useClient from '@/components/hooks/useClient'
import LottieWrapper from '@/components/LottieWrapper'

const PaymentFailed = () => {
  const token = Store.getState().user.token
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)
  const isClient = useClient()

  const handleRetry = async () => {
    setLoading(true)
    const successPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-success/`
    const failedPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-failed/`

    const payloadData = {
      planId: 'acfc82b7-49bc-41ea-a588-2d3360cb4a62', // Make this dynamic if needed
      isYearlyPayment: true,
      isReoccurring: true,
      paymentFailedUrl: successPage,
      paymentSuccessUrl: failedPage
    }

    try {
      const result = await Webservices.callPostApi(getEndpoint.default.BUY_SUBSCRIPTION, payloadData, token, )

      if (result.status === 201) {
        setLoading(false)
        setData(result.data)
        document.open()
        document.write(result.data)
        document.close()
      } else {
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      // consoleerror(err)
    }
  }

  // async function checkTransId(txnId: string) {
  //   try {
  //     const res = await Webservices.callPostApi(
  //       getEndpoint.default.VERIFY_SUBSCRIPTION_PAYMENT, // Use the same endpoint as in the success page
  //       { transactionId: txnId },
  //       token,
        
  //     )

  //     if (res.data != null) {
  //       setData(res.data)
  //     } else {
  //       setData(null)
  //       // Handle any specific error cases here, e.g., redirect to login if needed
  //     }
  //   } catch (e) {
  //     // consoleerror(e)
  //     setData(null)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    // const txnId = window.location.search.split('txnId=')[1]
    // if (txnId === 'undefined' || txnId === 'null' || txnId === '' || txnId.length < 7) {
    //   // Redirect to login or another page if the txnId is invalid
    //   router.push('/login')
    // } else {
    //   checkTransId(txnId)
    // }
  }, [])

  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <CircularProgress isIndeterminate color="#A92449"  />
      </div>
    )
  }

  if(!isClient)
    return <></>

  return (
    <div className="bg-white ">
  
    <div className='flex flex-col items-center justify-center min-h-screen bg-red-50 text-center'>
      <div >

        {/* Failure Icon and Message */}
        <div className='mb-8'>
          <LottieWrapper animationData={animationData} loop={true} className='w-72 h-72 mx-auto' />

          <h4  className='font-bold text-red-600 text-xl mt-6 mb-2'>
            Payment Failed
          </h4>
          <p  className='text-brown mb-3 max-w-[60%] mx-auto'>
            Don't worry, your account has been created successfully. Please verify your email address using the link
            we've sent to your registered email. You can then use your mobile number and password to log into your account.
          </p>
          <p className='text-brown mb-6 font-medium'>
            You can upgrade your plan in account details
          </p>
          <p  className='text-brown '>
            Unfortunately, your transaction could not be completed. Please try again.
          </p>
        </div>

        {/* Transaction Details */}
        {/* <div className='mb-4 bg-red-200 p-5 rounded-lg shadow-md'>
          <h6  className='font-bold text-brown'>
            Transaction Details
          </h6>
          <Divider className='my-4' />
          {data ? (
            <>
              <div className='flex justify-between'>
                <p className='font-bold text-brown'>
                  Transaction ID:
                </p>
                <p className='text-brown'>
                  {data.transactionId}
                </p>
              </div>
              <div className='flex justify-between mt-2'>
                <p className='font-bold text-brown'>
                  Date:
                </p>
                <p className='text-brown'>
                  {data.txnTime.split('T')[0]}
                </p>
              </div>
              <div className='flex justify-between mt-2'>
                <p className='font-bold text-brown'>
                  Amount:
                </p>
                <p className='text-gray'>
                
              </div>
            </>
          ) : (
            <p className='text-brown'>
              No transaction details available.
            </p>
          )}
        </div> */}

        {/* Action Button */}
        <div className='flex justify-center'>
          <CustomButton
            title='Go to Home'
            className='bg-secondary text-white hover:bg-red-700'
            onPress={() => router.push('/login')}
            loading={loading}
          />
            
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default PaymentFailed
