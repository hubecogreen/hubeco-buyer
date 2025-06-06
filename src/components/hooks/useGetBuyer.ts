import { useState, useEffect } from 'react'
import getEndpoint from '../../network/EndPoints'
import { useDispatch } from 'react-redux'
import { saveRefreshToken, saveToken, setUser } from '@/reduxStore/slices/userSlice'
import axios from 'axios'
import store from '@/reduxStore'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import useRefreshToken from './useRefreshToken'
import { useRouter } from 'next/navigation'
export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const useGetBuyer = () => {
  const [buyer, setBuyer] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter();
  const refreshTokenFromStore = getCookie('refreshToken');
  const [refreshToken, setRefreshToken] = useState(refreshTokenFromStore)
  // const {refreshTokens}=useRefreshToken()

  useEffect(() => {
    const storedBuyer = sessionStorage.getItem('buyerUserInfo')
    if (storedBuyer) {
      setBuyer(JSON.parse(storedBuyer))
    }
  }, [])


 async function callRefreshToken() {
   // // console.log('CallingRefreshToken')
    try {
      // Try to fetch refreshToken from state, if unavailable fallback to cookies
      const currentRefreshToken =  getCookie('refreshToken')

      // if (!currentRefreshToken) {
      //   throw new Error('No refresh token available')
      // }

      // Make an API call to refresh the token
      const response = await axios.post(
        `${baseURL}/auth/refreshSession`,
        {},
        {
          headers: {
            refreshtoken: currentRefreshToken
          }
        }
      )

      

     // // console.log('refreshSession', response)


      // Extract the new tokens from response
      const newRefreshToken = response?.data?.refreshToken?.token
      const sessionToken = response?.data?.token

      // Save new tokens in cookies
      setCookie('token', sessionToken, { path: '/' })
      setCookie('refreshToken', newRefreshToken, { path: '/' })
      getBuyer(sessionToken)

      // Update local state and Redux store with the new refresh token
      // setRefreshToken(newRefreshToken)
      // dispatch(saveToken(sessionToken))

      // Return the new tokens for further use
      return { sessionToken, newRefreshToken }
    } catch (error:any) {
      // consoleerror('Failed to refresh token:5345', error.response)
      if(error?.response?.status === 400) {
        if (error.response.data.intent === 'INVALID_SESSION') {
          // await handleUserLogout('terminated')
         
          // dispatch(saveToken(''));
          // dispatch(saveRefreshToken(''));
          // dispatch(setUser(''));
          deleteCookie('token');
          deleteCookie('refreshToken');
          deleteCookie('otpToken');
          deleteCookie('userRegistered');
          deleteCookie('addressAdded');
          sessionStorage.removeItem('buyerUserInfo');
          sessionStorage.clear();
           window.location.href = '/login';
        }
      }
     

      // Optional: Handle error, maybe redirect to login page
      // throw error
    }
  }



  const fetchBuyer = async (token?: string) => {
    try {
      const response = await axios.get(`${baseURL}/${getEndpoint.AUTH_ME}/Buyer`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      dispatch(setUser(response.data))
      
      setBuyer(response.data)
     // // console.log('formgree',response?.data,window.location.href.includes('profile'))
      sessionStorage.setItem('buyerUserInfo', JSON.stringify(response.data))
      if(response?.data?.buyerInfo==null)
        {
          if(window.location.href.includes('profile') || window.location.href.includes('orders') || window.location.href.includes('wishlist') || window.location.href.includes('cart'))
            {
              router.push('/select-buyer-type');
              setCookie('encryptedMobile',response.data.number)
            }
          //// // console.log('comehrere')
          
        }

        const selectedAddress = getCookie('selectedPincode')
        if (selectedAddress) {
        }else{
          response.data.addresses.forEach((addy:any) => {
            if(addy.isDefault==true){
              setCookie('selectedPincode',addy)
              if(window){
                // window.
                const event = new CustomEvent('selectedAddress', { detail: addy });
                window.dispatchEvent(event);
              }
            }
          })
        }
    
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(''))
      
        if (window && !window.location.href.includes('login')) {
          // window.location.replace('/login')
          dispatch(saveToken(''))
          dispatch(saveRefreshToken(''))
          dispatch(setUser(''))
          deleteCookie('token')
          // deleteCookie('refreshToken')
          // deleteCookie('otpToken')
          deleteCookie('userRegistered')
          deleteCookie('addressAdded')
          sessionStorage.removeItem('buyerUserInfo')
          sessionStorage.clear()
          // refreshTokens()
          callRefreshToken()
        }
      } else {
        // consoleerror('Failed to fetch buyer data:', error)
      }
    }
  }

  const getBuyer = async (token?: string) => {
    const tokenToUse = token || getCookie('token')
    if (!tokenToUse) {
      // Handle the case where no token is available
      // // consoleerror('No token available')
      return
    }
    await fetchBuyer(tokenToUse)
  }

  return {
    buyer,
    getBuyer,
    refreshBuyer: () => getBuyer()
  }
}

export default useGetBuyer
