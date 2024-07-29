"use client"
import React, { useEffect, useState } from 'react'
import SavedAppCard from './SavedAppCard'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { api } from '@/http.config'
type App = {
    id: string;
};  
const SavedAppList = () => {
  const {data} = useQuery({
    queryKey: ['apps'],
    queryFn : async () => {
      const res = await api.get('/password')
      return res.data
    }
  })
  return (
    <section className=' max-h-[85vh] overflow-y-auto container'>
        {
            data && data.map((app : any) => (
            <SavedAppCard key={app.id}  data={app} />
       ))
        }
    </section>
  )
}

export default SavedAppList