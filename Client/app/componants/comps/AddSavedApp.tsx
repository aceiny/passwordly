"use client"
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/http.config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios';
import React, { FormEvent } from 'react'

type Props = {
    onSuccess: () => void;
}

const AddSavedApp: React.FC<Props> = ({ onSuccess }) => {
    const {toast} = useToast()
    const queryClient = useQueryClient()

    const addAppMutation = useMutation({
        mutationFn: async (newApp: { name: string; identifier: string; password: string }) => {
            const response = await api.post('/password', newApp)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['apps'] })
            toast({
                title: "App Added",
                description: "App has been added to your list",
            })
            onSuccess();
        },
        onError: (error : AxiosError<any>) => {
            const errMessage = (typeof error.response?.data.message) === 'string' ? error.response?.data.message : error.response?.data.message[0];

            toast({
                title: "Failed to add app",
                description: errMessage
            })
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get('name') as string,
            identifier: formData.get('identifier') as string,
            password: formData.get('password') as string
        }
        addAppMutation.mutate(body)
    }

    return (
        <form 
            onSubmit={handleSubmit}
            style={{
                scale : 1 ,
                transition: 'all 0.05s ease-in-out'
            }} 
            className=' w-full h-full flex flex-col px-10 py-14 gap-5 bg-white rounded-lg'
        >
            <input type="text" placeholder='App name' name="name" className='AddAppInput'/>
            <input type="text" placeholder='Identifier (username or email)' name="identifier" className='AddAppInput'/>
            <input type="text" placeholder='Password' className='AddAppInput' name="password"/>
            <button type='submit' className='bg-white border cursor-pointer rounded-lg py-3 px-5 text-black font-semibold'>Add</button>
        </form>    
    )
}

export default AddSavedApp;
