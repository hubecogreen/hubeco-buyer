'use client'

import React from 'react'

import animationData from '../../../public/animations/payment-success.json'
import { useDispatch } from 'react-redux'
import { saveRefreshToken, saveToken, setUser } from '../../reduxStore/slices/userSlice'
import { deleteCookie } from 'cookies-next'
import CustomButton from '../../components/customButton/CustomButton'
import { CircularProgress } from '@chakra-ui/react'
import LottieWrapper from '@/components/LottieWrapper'

const PaymentSuccessful = () => {

  const [loading, setLoading] = React.useState<boolean>(true)
  const [time, setTime] = React.useState<number>(5)
  const dispatch = useDispatch()



  const handleBackToLogin = (change?: string) => {
    // dispatch(saveToken(''))
    // dispatch(saveRefreshToken(''))
    // dispatch(setUser(''))
    // deleteCookie('token')
    // if (change === 'run') {
    //   window.location.href = '/login'
    // } else {
    //   window.location.href = '/'
    // }
    window.location.href = '/subscriptions'
  }


  React.useEffect(() => {
   

   

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





  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-green-50 text-center'>
      <div >
      

        <div className='mb-8'>
          <LottieWrapper animationData={animationData} loop={true} className='w-72 h-72 mx-auto' />
          <h4  className='font-bold text-2xl text-primary'>
            Registration Complete
          </h4>
          <p  className='text-black text-md mt-4'>
          Thank you for registering. Your account has been successfully created.
          </p>
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
