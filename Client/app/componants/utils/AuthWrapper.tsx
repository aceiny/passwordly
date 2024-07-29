"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingPage from './LoadingPage'
import { getCookie, deleteCookie } from 'cookies-next'
import { api } from '@/http.config'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface AuthWrapperProps {
  loading?: boolean
  children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  loading = false,
  children
}) => {
  const [auth, setAuth] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  const checkAuth = async () => {
    const token = getCookie('passoken')
    if (token) {
      try {
        const response = await api.get(`${API_URL}/user`)
        if (response.status === 200) {
          setAuth(true)
        } else {
          setAuth(false)
          deleteCookie('passoken')
        }
      } catch (e) {
        setAuth(false)
        deleteCookie('passoken')
      }
    } else {
      setAuth(false)
    }
    setIsChecking(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (!isChecking && !auth) {
      router.push('/login')
    }
  }, [isChecking, auth, router])

  if (loading || isChecking) {
    return <LoadingPage />
  }

  if (auth) {
    return <>{children}</>
  }

  return null
}

export default AuthWrapper