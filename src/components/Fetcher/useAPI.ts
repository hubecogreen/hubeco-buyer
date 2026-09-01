import { useState } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'

interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL
// const token = getCookie('token') as string
const useApi = <T>() => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false
  })

  const callApi = async (endpoint: string, method: string, payload?: any) => {
    setResponse({ ...response, loading: true })
    const obj = {
      data: '' as T | null,
      error: '' as string | null,
      loading: true,
      errorData: null
    }
    const token = getTokenFromCookie('token') as string
    // token = token?.replace('%', '|')

    try {
      const config: AxiosRequestConfig = {
        method,
        url: `${API_URL}${'/' + endpoint}`, // Assuming BASE_URL is defined in your environment
        data: payload,
        headers: {
          ...(payload instanceof FormData
            ? {}
            : { 'Content-Type': 'application/json' }),
          Authorization: `Bearer ${token}`
        }
      }

      const apiResponse: AxiosResponse<T> = await axios(config)
      obj.data = apiResponse.data
      obj.loading = false
      setResponse({ data: apiResponse.data, error: null, loading: false })
    } catch (error) {
      obj.data = null
      obj.error = (error as Error).message
      obj.loading = false
      obj.errorData = error as any
      setResponse({ data: null, error: (error as Error).message, loading: false })
    }

    return obj
  }

  return { callApi }
}

export default useApi

export function getTokenFromCookie(key: string) {
  const cookies = document.cookie.split(';') // Split cookies into array of key-value pairs

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim() // Trim any leading or trailing whitespace
    // Check if this is the cookie that contains the token
    if (cookie.startsWith(`${key}=`)) {
      return cookie.substring(`${key}=`.length) // Extract and return the token value
    }
  }

  return null // Return null if token cookie is not found
}