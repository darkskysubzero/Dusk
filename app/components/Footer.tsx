
import { Label } from '@/components/ui/label'
import React from 'react'

const Footer = () => {
  return (
    <div className='p-10 w-full flex flex-col justify-center items-center gap-2 bg-zinc-900 h-[200px] mt-[20%] '>
      <Label>2024 &copy; Copyright Dusk</Label>
      <Label className='text-zinc-500'>Developed By Alinsky</Label>
    </div>
  )
}

export default Footer
