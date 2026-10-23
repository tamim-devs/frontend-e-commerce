import EditForm from '@/components/dashboard/admin/EditForm'
import { getProductDetails } from '@/lib/api/api'
import React from 'react'

const page = async({params}) => {
  const {id} = await params
  const product = await getProductDetails(id)
  console.log(product)

  return (
    <div>
      <h1>{product.name}</h1>
        <EditForm product={product}/>
    </div>
  )
}

export default page