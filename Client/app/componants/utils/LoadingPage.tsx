import Image from 'next/image'
import React from 'react'
import logo from "@/public/logo-white.png"
const LoadingPage = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
        <Image
            className=' animate-pulse '
            src={logo}
            alt="loading"
            width={300}
            height={300}
        />
    </div>
  )
}

export default LoadingPage