"use client"
import React, { useEffect, useState } from 'react'
import SavedAppCard from './SavedAppCard'

type App = {
    id: string;
};  
const SavedAppList = () => {
    const [apps , setApps] = useState<App[]>([]);
  return (
    <section className=' max-h-[85vh] overflow-y-auto container'>
        {
        /*apps.map(app => (
            <SavedAppCard key={app.id} />
        ))*/
       Array(15).fill(0).map((_,i) => (
            <SavedAppCard key={i} />
       ))
        }
    </section>
  )
}

export default SavedAppList