// components/PrivateRoute.tsx
'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import Store from '../reduxStore'
import { getCookie } from 'cookies-next'

import { jwtDecode } from "jwt-decode";
import useClient from './hooks/useClient'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = getCookie('token') as string ;
  const isClient = useClient()

  const [loader, setLoader] = useState<boolean>(true)
  const [validate, setValidate] = useState<boolean>(false)
  const router = useRouter()
  let pathname = usePathname()

  const privateRoutes = [
    '/profile',
    '/payment-failed',
    '/payment-success',
    '/registration-success',
    '/thankyou-page',
    '/welcome',
    '/order-sucesss',
    '/order-failed',
    '/checkout',
    '/orders',
  ]

  // if (pathname.includes('reset-password')) {
  //   pathname = '/reset-password'
  // }

  // if (pathname.includes('verify-email')) {
  //   pathname = '/verify-email'
  // }

  useEffect(() => {
    const checkAuth = async () => {
      setLoader(true) // Ensure loader is set to true when starting the auth check
      const tokenFromUrl = window.location.href.split('authtoken=')[1]

      // if (tokenFromUrl) {
      // saveTokens(tokenFromUrl)
      // setToken(tokenFromUrl, 30)
      // }

      let currentPath = pathname

      // if (currentPath.includes('reset-password')) {
      //   currentPath = '/reset-password'
      // }

      if (!token) {
        if (privateRoutes.some(route => currentPath.startsWith(route))) {
          await router.push('/login')
        }

        setValidate(false)
      } else {
        if (currentPath === '/login') {
          await router.push('/')
        }

        setValidate(true)
      }

      setLoader(false) // Set loader to false after completing the auth check
    }

    checkAuth()
  }, [router, pathname, validate])

  if(!isClient)
    return <></>
    
  // Render children only if the route is public or the user is validated
  if (privateRoutes.includes(pathname) && !validate) return null

  return <>{children}</>
}

export default PrivateRoute

// function setToken(token: any, days: any) {
//   if (typeof token !== 'string') {
//     // consoleerror('Token must be a string')

//     return
//   }

//   const d = new Date()

//   d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
//   const expires = 'expires=' + d.toUTCString()

//   document.cookie = `token=${token};${expires};path=/`
// }
