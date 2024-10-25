import React from 'react'
import './SelectedItem.scss'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function SelectedItem() {

  const [selectOne, setSelectOne] = useState();
  const itemId = useParams()

  async function selectOneItem(id) {
    try {
      const response = await axios.get(`http://localhost:8080/items/${id}`)

      console.log(response)
    } catch(error) {console,error('Cannot find your', error)}
  }

  useEffect(() => {
    selectOneItem(itemId.id);
  }, [itemId])

  return (
    <div>
    
    </div>
  )

  //insert DeleteConfirmation modal here, pass in props for id 
}
