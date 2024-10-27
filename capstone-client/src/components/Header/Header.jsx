import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <Link to={"/"}>My Fuzzy Buddies</Link>
      <section>
        <Link to={"/add"}>Add A New Buddy</Link>
        <Link to={"/inactive"}>Reminiscence</Link>
      </section>
    </div>
  )
}
