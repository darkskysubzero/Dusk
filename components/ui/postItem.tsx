"use client";

import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image';
import { Button } from './button';
  


type Props = {
    id: string;
    title: string;
    description: string;
    imageUrl: null;
    createdAt: string;
    updatedAt: string;
    location: string;
    userId: string;
    categoryId: string;
}


// Function To Extract Text
function getTextFromHtml(html:string){
  const element = document.createElement("span");
  element.innerHTML = html;
  return element.innerText;
}


const PostItem = ( props : Props) => {
  return (
    <Card className='hover:border-green-600 duration-300 flex flex-col 
    h-[400px] justify-between ' >
        <CardHeader className='h-full' >
            
           <div>
             <Image   width={0} height={0} sizes='100vw'  style={{width:'100%', height:'150px', objectFit: 'cover', objectPosition: '50% 10%'}}  alt={props.title} src={props.imageUrl ?? "https://fakeimg.pl/600x400"}    />
           </div>
         
           <CardTitle className='p-2 text-sm '>{props.title}</CardTitle>

           <CardContent className=' w-full my-1 text-xs p-2 h-full overflow-hidden   '>
            <div className='text-wrap break-words   h-[50px] '>
              {getTextFromHtml(props.description)}
            </div>
           </CardContent>
        </CardHeader>

        <CardFooter className='p-2 w-full'>
          <Button variant={'outline'} className='ml-auto' >Check Out</Button>
        </CardFooter>
    </Card>
  )
}

export default PostItem
