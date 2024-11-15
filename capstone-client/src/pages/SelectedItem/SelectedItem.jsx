import React from "react";
import "./SelectedItem.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation";
import EditItem from "../../components/EditItem/EditItem";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer"

export default function SelectedItem() {
  const [selectOne, setSelectOne] = useState();
  const itemId = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  async function selectOneItem(id) {
    try {
      const response = await axios.get(`http://localhost:8080/items/${id}`);

      console.log(response);
      setSelectOne(response.data);
    } catch (error) {
      console, error("Cannot find your fuzzy buddy", error);
    }
  }

  useEffect(() => {
    selectOneItem(itemId.id);
  }, [itemId]);

  if (!selectOne) {
    return <div>loading...</div>;
  }

  return (
    <div className="selected">
      <Header />
      <EditItem />
      <div className="selected__remove">
        <button className="selected__remove-button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Remove
        </button>
        {isOpen && selectOne && (
          <DeleteConfirmation
            isOpen={isOpen}
            closeModal={closeModal}
            id={selectOne.id}
          />
        )}
      </div>
      <Footer />
    </div>
  );

  //insert DeleteConfirmation modal here, pass in props for id
}
