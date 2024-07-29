"use client"
import React, { useState } from 'react';
import AddSavedApp from './AddSavedApp';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const SavedAppHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <div>
      <section className='w-full flex items-center justify-between mb-4'>
        <h1 className='text-3xl font-semibold'>16 Saved Apps</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div 
              className='bg-white cursor-pointer rounded-lg py-3 px-5 text-black font-semibold'
              onClick={handleOpenDialog}
            >
              Add New APP
            </div>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-[500px]">
            <AddSavedApp onSuccess={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}

export default SavedAppHeader;
