"use client";

import { Button } from '@/components/ui/button'; 
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React, { ChangeEvent,  useEffect, useState } from 'react'
import {useForm} from "react-hook-form";
import placeholderImage from '../../../public/placeholder.png';
import {getAllCategories } from '@/lib/helpers';
import Tiptap from '../../../components/ui/Tiptap';
 
 

const AddPost =  () => {

  const {data:session} = useSession();
  
  const {register, handleSubmit, formState:{errors}, getValues} = useForm();

  const [imageUrl, setImageUrl] = useState<string|null>(null); 

  const [categories, setCategories] = useState([]);

  const [content, setContent] = useState<string>("");

   

  const handleContentChange = (reason:any)=> {
    setContent(reason);
  }

  const handlePublish = (data:any)=>{
    
    console.log(data);
    console.log(content); 
  

  }

  useEffect(()=>{
    async function fetchData(){ 
      setCategories(await getAllCategories());
    }
    fetchData();
  },[])

 
  const isCategorySelected = ()=>{ 
    if(parseInt(getValues("category"))===0){
      return false;
    }
    return true;
  }
   

  return (
    <div className={`max-w-7xl mx-auto px-8 py-4  `}  >

      {/* Author and Publish Button */}
      <div className='flex justify-between '>
          <div className='w-24 text-xs'>
            <span className='font-semibold'>Author</span> : <span className='text-green-500'>{session?.user?.name}</span>
          </div>

          <Button onClick={handleSubmit(handlePublish)}>Publish</Button>
      </div>

      {/* Form Setup */}
      <div className='my-5 flex flex-col gap-5 justify-center items-center'> 

          {/* Title */}
          <input   {...register("title", {
            minLength: 3,
            maxLength: 150,
            required: true,

          })} id='search' className='transition ease duration-400 text-2xl p-4 sm:max-w-[600px] md:w-[600px] xs:w-full  bg-transparent border-green-500 border-[1px] focus:border-gray-700 outline-none text-center transition-all duration-200 ease-in-out' autoComplete='off' placeholder='Enter Title...' />

          {/* Validation for Title */}
          {errors.title && errors.title.type==="required" &&  (<p className='text-red-500 text-xs' role="alert">Enter valid title.</p>)}
          {errors.title && errors.title.type==="maxLength" &&  (<p className='text-red-500 text-xs' role="alert">Exceeding 150 characters.</p>)}
          {errors.title && errors.title.type==="minLength" &&  (<p className='text-red-500 text-xs' role="alert">Enter at least 3 characters.</p>)}


          {/* Image File */}
          <input {...register("image",{required:true, onChange(event) {

            try{
              if(event.target.files[0]===undefined){
                setImageUrl(null);
                return;
              }
              setImageUrl(URL.createObjectURL(event.target.files[0]));
            }catch(e){
              console.log(e);
            }

          },})} type='file'  className='border-green-500 border-[1px] cursor-pointer sm:max-w-[600px] md:w-[600px] xs:w-full m-auto text-green-500 bg-zinc-800 p-4'  />

          {/* Validation for Image */}
          {errors.image && errors.image.type==="required" &&  (<p className='text-red-500 text-xs' role="alert">No Image Selected.</p>)}
          

          {/* Image */}
          <div className='h-[400px] max-w-[600px] border-green-500 border-[1px] overflow-hidden'>

            {!imageUrl && <Image alt='post-image-placeholder' src={placeholderImage} width={300} style={{width:'100%',height:'100%', objectFit: 'cover', objectPosition: '50% 50%'}} />}

            {imageUrl  && <Image src={imageUrl} width={600} height={400} alt='post image'  style={{width:'100%', height:'100%', objectFit: 'cover', objectPosition: '50% 50%'}}/>}
          </div>


          
          {/* Category */}
          <select {...register("category",{required:true, validate:{isCategorySelected}})} name='category' className='bg-zinc-800 border-[1px] border-green-500 outline-none sm:max-w-[600px] md:w-[600px] xs:w-full m-auto p-4'>
            <option value={0} contentEditable={false} >Select A Category</option>
            {categories &&  categories.map((item)=> <option key={item.id} value={item.id} className='bg-zinc-900 '>{item.name}</option>)}
          </select>

          {/* Validation for Category */}
          {errors.category && errors.category.type==="isCategorySelected" &&  (<p className='text-red-500 text-xs' role="alert">Select A Category.</p>)}
          
      </div>



      {/* Rich Text Editor */}
      <Tiptap content={content} onChange={(newContent:string)=> handleContentChange(newContent)} />
 
    </div>
  )
}

export default AddPost
