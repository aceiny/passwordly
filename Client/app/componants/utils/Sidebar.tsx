"use client"
import Image from 'next/image'
import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import ProfilePicDefault from "@/public/profile_pic.png"
import { deleteCookie } from 'cookies-next'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
const Sidebar = () => {
    const {toast} = useToast()
    const handleSignOut = () => {
        deleteCookie('passoken')
        location.reload()
        toast({
            title: "Signed Out",
            description: "You have been signed out"
        })
    }
  return (
    <div className=' border-r border-[#343434] flex flex-col justify-between w-fit h-screen pb-20 pt-14 px-7'>
        <section className=' h-[40%] flex flex-col justify-between'>
            <section className='flex items-center gap-3'>
                <Image
                src={ProfilePicDefault}
                width={50}
                height={50}
                alt='Profile Picture'
                className='rounded-full'
                />
                <article className='flex flex-col h-full justify-between'>
                    <span>Yacine Zeraibi</span>
                    <span>a_zeraibi@estin.dz</span>
                </article>
            </section>
            <section className='w-full flex justify-center'>
                <ul className='flex flex-col items-start'>
                    <Link href="/"><li className='Sidebar_Nav'>Dashboard</li></Link>
                    <Link href="credit"><li className='Sidebar_Nav'>Credits</li></Link>
                </ul>
            </section>
        </section>
        <section onClick={handleSignOut} className='hover:opacity-70 hover:text-red-600 transition-all  flex items-center gap-1 w-full justify-center cursor-pointer'>
            <FaSignOutAlt size={24} />
            <span className=' font-semibold text-[20px]'>
                SignOut
            </span>
        </section>
    </div>
  )
}

export default Sidebar