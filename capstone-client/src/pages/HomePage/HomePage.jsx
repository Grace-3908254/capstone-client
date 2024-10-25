import React from 'react'
import './HomePage.scss'

import Header from '../../components/Header/Header.jsx'
import ItemsDisplay from '../../components/ItemsDisplay/ItemsDisplay.jsx'

export default function HomePage() {
  return (
    <div>
      <Header />
      <ItemsDisplay />
    </div>
  )
}
