import React from 'react'
import './DeleteConfirmation.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//for redirecting to RIP page 

export default function DeleteConfirmation(props) {
  const navigate = useNavigate()

  async function deleteItem(id) {
    //try
    const response = await axios.delete(`http://localhost:8080/items/${id}`)
    //catch

    navigate('/')
  }

  async function inactivateItem(id) {
    const response = await axios.post(`http://localhost:8080/items/inactive/${id}`)

    navigate('/inactive')
  }

  return (
    <div>
      
    </div>
  )

  //button (onClick) pass in props.id 
}
