"use client"
import React, { useEffect, useState } from 'react'
import SavedAppCard from './SavedAppCard'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { api } from '@/http.config'
import SavedAppPopupCard from './SavedAppPopupCard'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
type App = {
    id: string;
};  
const SavedAppList = () => {
  const [appId , setAppId] = useState<string | null>(null)
  const {data} = useQuery({
    queryKey: ['apps'],
    queryFn : async () => {
      const res = await api.get('/password')
      return res.data
    }
  })
  return (
    <section className=' max-h-[85vh] overflow-y-auto container'>
      <Dialog>
        
        <DialogTrigger className='w-full'>
          {
              data && data.map((app : any) => (
              <div className='w-full h-full' onClick={()=>setAppId(app.id)} key={app.id}><SavedAppCard key={app.id}  data={app} /></div>
        ))
          }
        </DialogTrigger>
        <DialogContent className='w-full'>
          <DialogClose></DialogClose>
          <SavedAppPopupCard id={appId}/>
        </DialogContent>
      </Dialog>

    </section>
  )
}

export default SavedAppList