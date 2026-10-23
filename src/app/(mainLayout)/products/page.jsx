import ProductsContent from '@/components/ProductsContent'
import SearchBar from '@/components/search/SearchBar'
import Title from '@/components/title/Title'
import React from 'react'

const page = () => {
  return (
    <div>
        <Title
  heading="Discover the Goodness of Nature"
  Badge="PureNature Collection"
  description="Explore our collection of pure honey, authentic khati cow milk, fresh fish, and quality fishery products."

  showSecondaryButton={true}
  showTrustPoints={true}
/>

<ProductsContent/>
    </div>
  )
}

export default page