'use client'

import React from 'react'

import animationData from '../../../public/animations/payment-success.json'
import useApi from '../../components/Fetcher/useAPI'
import { useDispatch } from 'react-redux'
// import { saveRefreshToken, saveToken, setUser } from '../../reduxStore/slices/userSlice'
// import { deleteCookie } from 'cookies-next'
import { toast } from 'react-hot-toast'
import CustomButton from '../../components/customButton/CustomButton'
import { CircularProgress, Divider } from '@chakra-ui/react'
import LottieWrapper from '@/components/LottieWrapper'

const PaymentSuccessful = () => {
  const { callApi } = useApi()
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [time, setTime] = React.useState<number>(5)
  const dispatch = useDispatch()

  async function checkTransId(txnId: string) {
    setLoading(true)
    try {
      const res = (await callApi('subscriptionPlans/verifySubscriptionPayment', 'POST', {
        transactionId: txnId
      })) as any

      if (res.data) {
        setData(res.data)
      } else {
        if (res.error.includes('400')) {
          handleBackToLogin('run')
        } else {
          toast.error(res.error)
        }
      }
    } catch (e) {
      toast.error('An error occurred while verifying the transaction.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = (change?: string) => {
    // dispatch(saveToken(''))
    // dispatch(saveRefreshToken(''))
    // dispatch(setUser(''))
    // deleteCookie('token')
    // if (change === 'run') {
    //   window.location.href = '/login'
    // } else {
    //   window.location.href = '/registration-success'
    // }
    window.location.href = '/subscriptions'
  }

  React.useEffect(() => {
    const txnId = new URLSearchParams(window.location.search).get('txnId')

    if (!txnId || txnId.length < 7) {
      handleBackToLogin('run')
    } else {
      checkTransId(txnId)
    }

    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          handleBackToLogin()
          clearInterval(interval)
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <CircularProgress isIndeterminate color="#A92449"  />
      </div>
    )
  }

  function formatCurrencyInIndianStyle(amount: number): string {
    // Round to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;
  
    // Determine whether to show decimals
    const options: Intl.NumberFormatOptions = 
      roundedAmount % 1 === 0
        ? {} // No decimals if the number is whole
        : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  
    // Format in Indian numbering style
    return new Intl.NumberFormat('en-IN', options).format(roundedAmount);
  }

  return (
    <div className='flex flex-col items-center justify-center  md:h-screen pb-16 bg-green-50 text-center'>
      <div >

        <div className='mb-1'>
          <LottieWrapper animationData={animationData} loop={true} className='w-64 h-64 mx-auto' />
          <h4  className='font-bold text-primary mb-4 md:text-3xl text-xl'>
            Payment Successful!
          </h4>
          <p  className='text-brown'>
            Thank you for your payment. Your transaction has been completed.
          </p>
        </div>

        <div className='mb-4  p-5 rounded-lg max-w-fit-content inline-block'>
          {/* <h6 className='font-bold text-brown'>
            Transaction Details
          </h6> */}
          {/* <Divider className='my-4' /> */}
          {/* <div className='flex justify-between'>
            <p  className='font-medium text-brown w-[150px] text-left'>
              Transaction ID 
            </p>
            <p  className='text-brown ml-2 min-w-[200px] text-left'>
              {data?.transactionId}
             
        
            </p>
          </div> */}
          {/* <div className='flex justify-between mt-2'>
            <p className='font-medium text-brown'>
              Date:
            </p>
            <p  className='text-brown'>
              {data?.txnTime?.split('T')[0]}
            </p>
          </div> */}
         {data?.txnAmount && <div className='flex justify-between mt-2'>
            <p  className='font-medium text-brown w-[150px] text-left'>
              Amount 
            </p>
            <p  className='text-brown ml-2 min-w-[200px] text-left'>₹{formatCurrencyInIndianStyle(data?.txnAmount)}
            </p>
          </div>}
        </div>

        <div className='flex justify-center'>
          <CustomButton
            
          
            className='bg-primary text-white hover:bg-green-700'
            onPress={() => handleBackToLogin()}
            title={`You will be redirected in ${time}`}
          />
            
        
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessful
