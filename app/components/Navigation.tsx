import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { Link } from '@radix-ui/react-navigation-menu'
 

  


const Navigation = () => {
  return  (
    
      <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
              <Link href='/1'>Link 1</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href='/2'>Link 2</Link>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )

   
}

export default Navigation
