'use client'
import { deleteProduct } from '@/lib/action/action'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteButton = ({productId}) => {
    const router = useRouter()
    const handleButton = async()=>{
      const result =  await deleteProduct(productId) 

        if (result.success) {
      router.refresh()
    }
    }
  return (
    <div>
        <button onClick={handleButton} className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 cursor-pointer">
                  Delete
                </button>
    </div>
  )
}

export default DeleteButton