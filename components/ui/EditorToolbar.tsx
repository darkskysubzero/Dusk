import React from 'react'

import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
    Cuboid
} from "lucide-react";

import { Editor } from '@tiptap/react';
import { Button } from './button';

type Props = {
    editor : Editor | null;
    content: string;
}

const EditorToolbar = ({editor, content}: Props) => {

    if(!editor){
        return null;
    }

    return (
        <div className='p-4 flex justify-between items-start gap-5 flex-wrap border border-gray-700'>
            
            {/* Buttons */}
            <div className='flex justify-start items-center gap-5 w-full flex-wrap'>

                 {/* Heading 1 */}
                 <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({level:1}).run();
                        }}
    
                        className={editor.isActive("heading", {level:1}) ? "text-green-500" : "text-gray-600"}
                    >
                    <Heading1 className='w-5 h-5'/>
                </button>

                {/* Heading 2 */}
                <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({level:2}).run();
                        }}
    
                        className={editor.isActive("heading",{level:2}) ? "text-green-500" : "text-gray-600"}
                    >
                    <Heading2 className='w-5 h-5'/>
                </button>


                {/* Bold */}
                <button 
                    onClick={(e)=>{
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                    }}

                    className={editor.isActive("bold") ? "text-green-500" : "text-gray-600"}
                
                >
                    <Bold className='w-5 h-5'/> 
                </button>


                {/* Italic */}
                <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                        }}
    
                        className={editor.isActive("italic") ? "text-green-500" : "text-gray-600"}
                    >
                    <Italic className='w-5 h-5'/>
                </button>


               

                {/* Strikethrough */}
                <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                        }}
    
                        className={editor.isActive("strike") ? "text-green-500" : "text-gray-600"}
                    >
                    <Strikethrough className='w-5 h-5'/>
                </button>

                {/* Unordered List */}
                <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                        }}
    
                        className={editor.isActive("bulletList") ? "text-green-500" : "text-gray-600"}
                    >
                    <List className='w-5 h-5'/>
                </button>


                {/* Ordered List */}
                <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().toggleOrderedList().run();
                        }}
    
                        className={editor.isActive("strike") ? "text-green-500" : "text-gray-600"}
                    >
                    <ListOrdered className='w-5 h-5'/>
                </button>


                {/* BlockQuote */}
                <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().toggleBlockquote().run();
                        }}
    
                        className={editor.isActive("blockquote") ? "text-green-500" : "text-gray-600"}
                    >
                    <Quote className='w-5 h-5'/>
                </button>


                {/* Code */}
                <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().setCode().run();
                        }}
    
                        className={editor.isActive("code") ? "text-green-500" : "text-gray-600"}
                    >
                    <Code className='w-5 h-5'/>
                </button>        

                {/* Code Block */}
                <button  
                        onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().toggleCodeBlock().run();
                        }}
    
                        className={editor.isActive("codeBlock") ? "text-green-500" : "text-gray-600"}
                    >
                    <Cuboid className='w-5 h-5'/>
                    
                </button>

                {/* Undo */}
                <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                        }}
    
                        className={editor.isActive("undo") ? "text-green-500" : "text-gray-600"}
                    >
                    <Undo className='w-5 h-5'/>
                </button> 



                {/* Redo */}
                <button
                     onClick={(e)=>{
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                        }}
    
                        className={editor.isActive("redo") ? "text-green-500" : "text-gray-600"}
                    >
                    <Redo className='w-5 h-5'/>
                </button> 
                        
            </div>

        </div>
    )
}

export default EditorToolbar
