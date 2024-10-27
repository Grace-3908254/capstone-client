import React from "react";
import "./ItemsDisplay.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";

export default function ItemsDisplay() {
  const [allItems, setAllItems] = useState();

  async function getItems() {
    try {
      const response = await axios.get("http://localhost:8080/items");

      console.log(response);
      setAllItems(response.data);
    } catch (error) {
      console.error("Cannot fetch fuzzy buddies", error);
    }
  }
  //'/items' is for calling the route set for the database or info from seed file

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <div>
        {allItems?.map((currItem) => {
          return (
            <>
              <Link to={`/${currItem.id}`}>
                <div>
                  <img
                    src={`http://localhost:8080/${currItem.photo}`}
                    width="10px"
                  ></img>
                  <p>{currItem.nickname}</p>
                  <p>
                    {currItem.brand}: {currItem.type}
                  </p>
                </div>
              </Link>
            </>
          );
        })}
      </div>
.    
    </div>
  );
}
