import React from 'react'
import './DeleteConfirmation.scss'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from "react-modal";
//for redirecting to RIP page 
import "./DeleteConfirmation.scss"

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
      <div className="modal">
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Confirmation Modal"
          className="modal__wrap"
        >
          <h2 className='modal__confirm'>How do you want to say goodbye?</h2>
          <button onClick={() => {inactivateItem(id)}} className='modal__inactive'>move my missing/rehomed/destroyed buddy in reminiscence, RIP</button>
          <button onClick={() => {deleteItem(id)}} className='modal__delete'>delete forever</button>
          <button onClick={() => {closeModal()}} className='modal__cancel'>cancel</button>
        </Modal>
      </div>
    );
  }

  //button (onClick) pass in props.id 
