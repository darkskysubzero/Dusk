import Link from 'next/link'
import React from 'react'  

import localFont from "next/font/local";


const monument  = localFont({
  src: "../../public/fonts/MonumentExtended-Regular.otf"
})
 
 
const Logo = () => {
  return (
    <Link 
        href={'/'} 
        className={`${monument.className}  text-2xl text-green-500 hover:text-green-600 transition ease duration-200 tracking-wider `}

      >
        Dusk
    </Link>
  )
   
}

export default Logo
 