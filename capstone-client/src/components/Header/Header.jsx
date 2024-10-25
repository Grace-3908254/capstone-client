import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <Link to={"/"}>My Fuzzy Buddies</Link>
    </div>
  )
}
