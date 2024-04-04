'use client'

import { useEditor, EditorContent, EditorProvider } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from './EditorToolbar'

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import CodeInlineLowlight from '@nartix/tiptap-inline-code-highlight'

import { common, createLowlight,  } from 'lowlight';
 

const lowlight = createLowlight(common); // Pass languages directly to createLowlight


import {mergeAttributes} from "@tiptap/core"
 

import './style.scss'
// import './themes/atom-one-dark.css'
// import './themes/ascetic.css'
// import './themes/dracula.css'
// import './themes/tomorrow-night.css'
// import './themes/railscasts.css'
import './themes/atelier-savanna.min.css'

 

const Tiptap = ({onChange, content} : any) => {
 

  const handleChange = (newContent: string)=>{
    onChange(newContent);
  }

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        codeBlock: false, 
        heading: false,
      }),
      CodeBlockLowlight.configure({
        lowlight ,
        HTMLAttributes:{
          class: "border-[1px] border-green-300 p-2"
        },
        languageClassPrefix: 'language-',
        defaultLanguage: 'csharp',
        
      }),
      
      CodeInlineLowlight.configure({
        lowlight,
        HTMLAttributes:{
          class: "border-[1px] border-green-300 p-2"
        },
        languageClassPrefix: 'language-',
        defaultLanguage: 'csharp',
      }),

      Heading.configure({
        levels: [1,2]
      }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {

          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];

          const classes: { [index: number]: string } = {
            1: 'text-5xl ',
            2: 'text-3xl',
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      })
    ],


    editorProps:{
      attributes:{
        class: "flex flex-col px-4 py-3 justify-start border-[1px] border-green-400 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 focus:border-gray-700 outline-none  transition-all duration-200 ease-in-out "
      }
    },

    onUpdate: ({editor})=>{
      handleChange(editor.getHTML());
    },
    
    autofocus: true,
   
    
  }) 
  
  return (
    <div className='w-full '>
      <EditorToolbar editor={editor} content={content}/>
      <EditorContent style={{whiteSpace: "pre-line"}} editor={editor} />
    </div>
  )
}

export default Tiptap