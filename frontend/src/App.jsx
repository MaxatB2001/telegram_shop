import { useEffect, useState } from 'react'
const tg = window.Telegram.WebApp
import './App.css'
import Header from './components/header/Header'
import {Routes, Route} from "react-router-dom"
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'

function App() {

  useEffect(() => {
    tg.ready()
    console.log(tg)
    // tg.MainButton.isVisible = true9
  }, [])

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/:categoryName' element={<Catalog/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
      </Routes>
    </>
  )
}

export default App
