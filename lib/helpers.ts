import prisma from "@/prisma"
import { NextResponse } from "next/server";

export const connectToDb = async ()=> {
    try{
        await prisma.$connect();

    }catch (error:any){
        throw new Error(error);
    }
}

export const generateErrorMessage = (data: any, status: number) =>  {
    return NextResponse.json(
            {message: "Error", ...data},
            {status: status, statusText: "OK" }
        )
};
export const generateSuccessMessage = (data: any, status: number)=> {
    return NextResponse.json(
        {message: "Success", ...data},
        {status: status, statusText: "ERROR" }
    )
}; 


export const getAllPosts = async (count?:number) =>{
    const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
    });

    const data = await res.json();

    if(count){
        return data.posts.slice(0, count);
    }

    return data.posts;
}

export const getAllCategories = async ()=>{
    const res = await fetch('http://localhost:3000/api/categories',{
        cache: 'no-store'
    });

    const data = await res.json();

    return data.categories;
}


export const exampleTheme = ()=> {
    return {
        code: 'editor-code',
        heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
        },
        image: 'editor-image',
        link: 'editor-link',
        list: {
        listitem: 'editor-listitem',
        nested: {
            listitem: 'editor-nested-listitem',
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
        },
        ltr: 'ltr',
        paragraph: 'editor-paragraph',
        placeholder: 'editor-placeholder',
        quote: 'editor-quote',
        rtl: 'rtl',
        text: {
        bold: 'editor-text-bold',
        code: 'editor-text-code',
        hashtag: 'editor-text-hashtag',
        italic: 'editor-text-italic',
        overflowed: 'editor-text-overflowed',
        strikethrough: 'editor-text-strikethrough',
        underline: 'editor-text-underline',
        underlineStrikethrough: 'editor-text-underlineStrikethrough',
        },
    }
};
  