import React from 'react'
import "./Header.css"
const tg = window.Telegram.WebApp
import Button from '../Button/Button'

const Header = () => {

  const onClose = () => {
    tg.close()
  }

  return (
    <div className='header'>
      <Button onClick={onClose}>Закрыть</Button>
      <span>{tg.initDataUnsafe?.user?.first_name}</span>
    </div>
  )
}

export default Header