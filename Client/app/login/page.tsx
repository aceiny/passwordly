"use client"

import { useToast } from '@/components/ui/use-toast';
import { api } from '@/http.config';
import Frame from '@/public/loginFrame.png'
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function Page() {
    const {toast} = useToast();
    const router = useRouter()
    const loginMutation = useMutation({
        mutationFn: async (values: { username: string; password: string }) => {//
            const response = await api.post('/user/signin', values);
            return response.data;
        },
        onSuccess: () => {
            toast({
                title: "Login Successful",
                description: "You will be rediracted",
              })
            router.push('/')
        },
        onError: (error: AxiosError<any>) => {
            const errMessage = (typeof error.response?.data.message) === 'string' ? error.response?.data.message : error.response?.data.message[0];
                toast({
                    title: "Login Failed",
                    description: errMessage
                })
        }
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        if (username && password) {
            loginMutation.mutate({ username, password });
        } else {
            toast({
                title: "Login Failed",
                description: "Please fill in all fields",
            })
        }
    };

    return (
        <div className='flex items-center bg-white'>
            <form className='flex-1 flex flex-col px-[43px] gap-4' onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name="username" className='bg-transparent w-full py-4 border-b outline-none text-black' />
                <input type="password" placeholder="password" name='password' className='bg-transparent w-full py-4 border-b outline-none text-black' />
                <button type='submit' className='bg-[#44448B] text-white font-bold py-4 px-10 rounded-lg border outline-none'>login</button>
                <span className='text-black'>Don&apos;t have an account <Link href={'/signup'} className='text-blue-600 cursor-pointer'>signup</Link></span>
            </form>
            <section className='h-screen'>
                <Image src={Frame} alt="login frame" className='w-full h-full' />
            </section>
        </div>
    )
}