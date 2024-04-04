import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { FaSearch } from "react-icons/fa";
import {Inter} from "@next/font/google"; 

import { getAllCategories, getAllPosts } from '@/lib/helpers';
import PostItem from '@/components/ui/postItem';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] })  


const HomePage = async () => {


  const posts = await getAllPosts(7);

  const categories = await getAllCategories();

  return (
    <div className={`max-w-7xl mx-auto px-8 py-4 flex flex-col gap-5 ${inter.className} `}> 
    
      <div className='w-80 flex gap-2 mx-auto'>
        <Input id='search' className='transition ease duration-400' autoComplete='off'/>
        <Button ><FaSearch /></Button>
      </div>

 
 
      <div className='mx-auto flex gap-3 flex-wrap'>
          {categories.map(category=> {
            return <Button key={category.id} variant={"outline"} className='border-gray-700 border-[1px] hover:border-gray-400 transition-all ease-in duration-300 text-xs' size={'sm'}>{category.name}</Button> 
          })}
      </div>


      <div className='w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 transition duration-200 ease-in-out '>
          {posts.map(post=> <PostItem {...post} key={post.id} />)}
      </div>
 
 
    </div>
  )
}

export default HomePage
