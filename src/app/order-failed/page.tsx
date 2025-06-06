'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from 'lottie-react'
import animationData from '../../../public/animations/failure.json'
import Store from '../../reduxStore'
import * as getEndpoint from '../../network/EndPoints'
import * as Webservices from '../../network/WebServices'
// import CustomButton from '../../components/customButton/CustomButton'
import { CircularProgress, Divider } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { setCookie } from 'cookies-next'
import useClient from '@/components/hooks/useClient'

const PaymentFailed = () => {
  const token = Store.getState().user.token
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>(null)
  const isClient = useClient()

  const handleRetry = async () => {
    setLoading(true)
    const successPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-success/`
    const failedPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-failed/`

    const payloadData = {
    //   planId: 'acfc82b7-49bc-41ea-a588-2d3360cb4a62', // Make this dynamic if needed
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

  useEffect(() => {
    setCookie('CartCount',0)
  }, [])

  async function checkTransId(txnId: string,intent?:any) {
    try {
      const res = await Webservices.callPostApi(
        `${getEndpoint.default.VALIDATEPAYMENT}?orderId=${txnId}&intent=${intent}&redirect=${process.env.NEXT_PUBLIC_PROD_URL}/order-success/`,
        token,
        
      )

      if (res.data != null) {
        setData(res.data)
      } else {
        setData(null)
        // Handle any specific error cases here, e.g., redirect to login if needed
      }
    } catch (e) {
      // consoleerror(e)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const txnId = window.location.search.split('orderId=')[1]
    const intent = window.location.search.split('intent=')[1]
    if (txnId === 'undefined' || txnId === 'null' || txnId === '' || txnId.length < 7) {
      // Redirect to login or another page if the txnId is invalid
      router.push('/login')
    } else {
      checkTransId(txnId,intent)
    }
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
          <Lottie animationData={animationData} loop={true} className='w-72 h-72 mx-auto' />

          <h4  className='font-bold text-[#ED615B] mb-4 md:text-3xl text-xl'>
          Order Failed!
          </h4>
          <p  className='text-gray-600'>
          We’re sorry, but your order could not be processed successfully.
          </p>
      
      </div>

        {/* Action Button */}
        <div className='flex justify-center mt-8'>
          <Button
            className='bg-primary !text-white hover:bg-primary px-2 font-medium '
            onClick={() => router.push(`/products`)}
          
          >
          Shop Again
          </Button>

            
        
        </div>
      </div>
    </div>
    </div>
  )
}

export default PaymentFailed
