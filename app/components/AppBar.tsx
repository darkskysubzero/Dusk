"use client";

import React from 'react'
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Navigation from './Navigation';


const links = [
  {id:"1-1", name: "Item 1", url:"/item1"},
  {id:"1-2",name: "Item 2", url:"/item2"},
  {id:"1-3",name: "Item 3", url:"/item3"}, 

]

 
const AppBar = () => {

  // Getting status from session
  const {status} = useSession(); 

  return (
    <div className='sticky w-full '>

        <nav className=' flex items-center justify-between max-w-7xl mx-auto px-8 py-4 bg-transparent'>
            <Logo/> 
            
            <div className='flex gap-2'>

            <Menu menuButton={<MenuButton className="bg-zinc-900 px-3  ">Menu</MenuButton>} transition >
              {links.map(item=>
                        <MenuItem  key={item.id}>
                            <Link href={item.url} >{item.name}</Link>
                        </MenuItem>
              )}
            </Menu> 
            {/* <Navigation/> */}

            { 

              (status==="authenticated" ? 
                
                  <div className='flex gap-2'>
                    
                    <Button variant={'outline'}>Post</Button>
                    <Button variant={'outline'}>Logout</Button>
                  </div>
                
                 : 
                <Button variant={'outline'}>Login</Button>) 
            }

            </div>
        </nav>
    </div>
  )
}

export default AppBar
