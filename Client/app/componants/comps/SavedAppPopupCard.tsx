import { api } from '@/http.config';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const SavedAppPopupCard = ({ id }: { id: string | null }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['app', id],
    queryFn: async () => {
      const res = await api.get(`/password/${id}`);
      console.log(res.data);
      return res.data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading app data</div>;
  }

  return (
    <div className='text-black p-5'>
      <section className='flex items-center gap-3 border-b border-black pb-5 mb-5'>
        <img
          src={data?.icon != "" ? data.icon : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsI1mkl0VEEIBaGi4O_PdM6t-EPpaDrCSjA&s"}
          alt=""
          className='w-[60px] h-[60px] rounded-lg border'
        />
        <article className='flex flex-col items-start justify-between'>
          <span className='font-semibold text-[20px]'>{data ? data.name : "Unknown"}</span>
        </article>
      </section>
      <section className=' grid grid-cols-2 gap-5'>
        <article className='flex flex-col items-center gap-2'>
          <label htmlFor="identifier" className='font-medium'>Identifier:</label>
          <span className=' whitespace-nowrap'>{data ? data.identifier : "Unknown"}</span>
        </article>
        <article className='flex flex-col items-center gap-2'>
          <label htmlFor="password" className='font-medium'>Password:</label>
          <span className=' whitespace-nowrap'>{data ? data.password : "Unknown"}</span>
        </article>
        <article className='flex flex-col items-center gap-2'>
          <label htmlFor="created_at" className='font-medium'>Created At:</label>
          <span className=' whitespace-nowrap'>{data ? data.createdAt : "Unknown"}</span>
        </article>
        <article className='flex flex-col items-center gap-2'>
          <label htmlFor="updated_at" className='font-medium'>Last update:</label>
          <span className=' whitespace-nowrap'>{data ? data.updatedAt : "Unknown"}</span>
        </article>
      </section>
    </div>
  );
};

export default SavedAppPopupCard;
