"use client"
import Image from 'next/image'
import React from 'react'
import DiscordLogo from "@/public/discord.png"
import { RiArrowRightWideLine } from 'react-icons/ri'
const SavedAppCard = ({data} : any) => {
  return (
    <div className='SavedAppCard min-w-[500px] '>
        <section className='flex items-center gap-4'>
            <img
                src={data.icon}
                width={42}
                height={42}
                alt='App Logo'
                className='rounded-md object-fit'
            />
            <article className='flex flex-col h-full justify-between'>
                <span>{data.name}</span>
                <span>{data.identifier}</span>
            </article>
        </section>
        <RiArrowRightWideLine  size={24}/>
    </div>
  )
}

export default SavedAppCard