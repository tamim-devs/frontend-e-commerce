'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const MyNavLink = ({ children ,href, className = '' }) => {
    const pathName = usePathname()

    const isActive = pathName === href
  return (
   <Link href={href} className={`font-semibold pb-2 ${className} 
   ${isActive ? 'text-yellow-600 border-b-2 border-yellow-500' : ''}
   `} >
     {children}
   </Link>
  )
}

export default MyNavLink