import React from "react";
import "./RemovedItems.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export default function RemovedItems() {
  const [allInactive, setAllInactive] = useState();

  async function getAllInactive() {
    try {
      const response = await axios.get("http://localhost:8080/items/inactive");

      console.log(response);
      setAllInactive(response.data);
    } catch (error) {
      console.error("Cannot find all of your R.I.P fuzzy buddies", error);
    }
  }
  //'/items' is for calling the route set for the database or info from seed file

  useEffect(() => {
    getAllInactive();
  }, []);

  return (
    <div className="items">
      <div className="items__wrapper">
        {allInactive?.map((currItem) => {
          return (
            <>
              <Link className="items__link" to={`/${currItem.id}`}>
                <div className="items__each">
                  <p className="items__each-nickname">{currItem.nickname}</p>
                  <img
                    className="items__each-img"
                    src={`http://localhost:8080/${currItem.photo}`}
                  ></img>
                  <p className="items__each-brandtype">
                    {currItem.brand}: {currItem.type}
                  </p>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}
