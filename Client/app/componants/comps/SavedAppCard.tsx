"use client"
import Image from 'next/image'
import React from 'react'
import DiscordLogo from "@/public/discord.png"
import { RiArrowRightWideLine } from 'react-icons/ri'
const SavedAppCard = () => {
  return (
    <div className='SavedAppCard min-w-[500px] '>
        <section className='flex items-center gap-4'>
            <Image
                src={DiscordLogo}
                width={42}
                height={42}
                alt='App Logo'
                className='rounded-md object-fit'
            />
            <article className='flex flex-col h-full justify-between'>
                <span>Discord</span>
                <span>a_zeraibi@estin.dz</span>
            </article>
        </section>
        <RiArrowRightWideLine  size={24}/>
    </div>
  )
}

export default SavedAppCard