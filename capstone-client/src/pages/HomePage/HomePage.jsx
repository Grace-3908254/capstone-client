import React from 'react'
import './HomePage.scss'

import Header from '../../components/Header/Header.jsx'
import ItemsDisplay from '../../components/ItemsDisplay/ItemsDisplay.jsx'
import Footer from '../../components/Footer/Footer.jsx'

export default function HomePage() {
  return (
    <div>
      <Header />
      <ItemsDisplay />
      <Footer />
    </div>
  )
}
