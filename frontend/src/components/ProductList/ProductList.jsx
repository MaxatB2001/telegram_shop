import React from 'react'
import Product from '../Product/Product'
import "./ProductList.css"

const ProductList = ({items}) => {
  return (
    <div className='product-list'>
      {items.map(item => 
        <Product key={item._id} product={item}/>  
      )}
    </div>
  )
}

export default ProductList