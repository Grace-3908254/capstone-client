import React from 'react'
import './DeleteConfirmation.scss'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from "react-modal";
//for redirecting to RIP page 

export default function DeleteConfirmation({ isOpen, closeModal, id }) {
  const navigate = useNavigate()

  async function deleteItem(id) {
    //try
    const response = await axios.delete(`http://localhost:8080/items/${id}`)
    //catch

    closeModal();
    navigate('/');
  }

  async function inactivateItem(id) {
    const response = await axios.post(`http://localhost:8080/items/inactive/${id}`)

    closeModal();
    navigate('/inactive');
  }
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
      >
        <h2>How do you want to say goodbye?</h2>
        <button onClick={() => {deleteItem(id)}}>Delete forever</button>
        <button onClick={() => {inactivateItem(id)}}>I would like to keep my missing/rehomed/destroyed buddy in reminiscence, RIP</button>
        <button onClick={() => {closeModal()}}>Cancel</button>
      </Modal>
    );
  }

  //button (onClick) pass in props.id 
