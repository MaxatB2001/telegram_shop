import React from 'react'
import { Image } from '@chakra-ui/react'

const ProductPage = () => {
  const p =  {
    id: 223,
    title: "Щмотка 2",
    cost: 3000,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=8",
  }
  
  return (
    <div>
      <Image src={p.image}/>
    </div>
  )
}

export default ProductPage