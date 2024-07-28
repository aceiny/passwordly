import Frame from '@/public/loginFrame.png'
import Image from 'next/image'
import Link from 'next/link'
export default function Page(){
    return (
        <div className='flex items-center bg-white  '>
            <section className=' h-screen'>
                <Image src={Frame} alt="login frame" className=' w-full h-full' />
            </section>
            <form className='flex-1 flex flex-col px-[43px] gap-4'>
                <input type="text" placeholder="full name" className=' bg-transparent w-full py-4 border-b outline-none text-black' />
                <input type="text" placeholder="username" className=' bg-transparent w-full py-4 border-b outline-none text-black' />
                <input type="password" placeholder="password" className=' bg-transparent w-full py-4 border-b outline-none text-black' />
                <button type='submit' className=' bg-[#44448B] text-white font-bold py-4 px-10 rounded-lg   border outline-none'>signup</button>
                <span className=' text-black'>already have an account <Link href={'/login'} className=' text-blue-600 cursor-pointer'>login</Link></span>
            </form>
        </div>
    )
} 