"use client"
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/http.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import React, { FormEvent, useState, useEffect } from 'react';
import logoFrame from "@/public/logo-white.png";
type Props = {
    onSuccess: () => void;
}

const AddSavedApp: React.FC<Props> = ({ onSuccess }) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [name, setName] = useState('');
    const [iconUrl, setIconUrl] = useState('');

    const addAppMutation = useMutation({
        mutationFn: async (newApp: { name: string; identifier: string; password: string; icon: string }) => {
            const response = await api.post('/password', newApp);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['apps'] });
            toast({
                title: "App Added",
                description: "App has been added to your list",
            });
            onSuccess();
        },
        onError: (error: AxiosError<any>) => {
            const errMessage = typeof error.response?.data.message === 'string'
                ? error.response?.data.message
                : error.response?.data.message[0];

            toast({
                title: "Failed to add app",
                description: errMessage
            });
        }
    });

    useEffect(() => {
        const fetchIconUrl = async () => {
            if (name) {
                try {
                    const response = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`);
                    if (response.data.length > 0) {
                        setIconUrl(response.data[0].logo);
                    } else {
                        setIconUrl('');
                    }
                } catch (error) {
                    setIconUrl('');
                    console.error("Failed to fetch icon URL:", error);
                }
            } else {
                setIconUrl('');
            }
        };

        fetchIconUrl();
    }, [name]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get('name') as string,
            identifier: formData.get('identifier') as string,
            password: formData.get('password') as string,
            icon: iconUrl
        };
        addAppMutation.mutate(body);
    };

    return (
        <form 
            onSubmit={handleSubmit}
            style={{
                scale: 1,
                transition: 'all 0.05s ease-in-out'
            }} 
            className='w-full h-full flex flex-col px-10 py-14 gap-5 bg-white rounded-lg '
        >
            <div className="flex items-center gap-3">
                <img
                        src={iconUrl== '' ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsI1mkl0VEEIBaGi4O_PdM6t-EPpaDrCSjA&s" : iconUrl} 
                        alt='App Icon'
                        className='rounded-md flex items-center justify-center object-fit border w-[80px] h-[80px]'
                />
                <input 
                    type="text" 
                    placeholder='App name' 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='AddAppInput'
                />
            </div>
            <input 
                type="text" 
                placeholder='Identifier <Username || Email>' 
                name="identifier" 
                className='AddAppInput'
            />
            <input 
                type="text" 
                placeholder='Password' 
                className='AddAppInput' 
                name="password"
            />
            <button type='submit' className='bg-white border cursor-pointer rounded-lg py-3 px-5 text-black font-semibold'>
                Add
            </button>
        </form>    
    );
}

export default AddSavedApp;
