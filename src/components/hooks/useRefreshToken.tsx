import { useState, useCallback } from 'react'
import axios from 'axios'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'
import useGetBuyer from './useGetBuyer'
// import { useRouter } from 'next/navigation'


export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

// const dispatch = useDispatch();
const useRefreshToken = () => {
  const refreshTokenFromStore = getCookie('refreshToken');
  // const router=useRouter();
  const [refreshToken, setRefreshToken] = useState(refreshTokenFromStore)
 
  // Fetch refresh token from the Redux store
 
  // const { handleUserLogout } = useLogout()

  const {getBuyer}=useGetBuyer();



  // Store the refresh token locally



  const refreshTokens = useCallback(async () => {
    try {
      // Try to fetch refreshToken from state, if unavailable fallback to cookies
      const currentRefreshToken =  getCookie('refreshToken')

      if (!currentRefreshToken && window) {
        // throw new Error('No refresh token available')
        // console.log('NorefreshToken')
        window.location.href = '/login';
      }

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
      // consoleerror('Failed to refreshvwrt', error?.response?.status)
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
  }, [refreshToken])

  return { setRefreshToken, refreshTokens }
}

export default useRefreshToken
