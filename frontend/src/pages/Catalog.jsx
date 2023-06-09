import React, { useState } from 'react'
import ProductList from '../components/ProductList/ProductList'
import { items } from '../mock'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Catalog = () => {
  const {categoryName} = useParams()
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`http://localhost:5000/api/item/${categoryName}`).then(data => data.json()).then(data => setItems(data))
  }, [])
  return (
    <ProductList items={items}/>
  )
}

export default Catalog