import React from "react";
import "./RemovedItems.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import axios from 'axios';

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
    <div>
      <Header />

      <div>
        {allInactive?.map((currItem) => {
          return (
            <>
              <div>
                <div>
                  <img src={`http://localhost:8080/${currItem.photo}`}width="10px"></img>
                  <p>{currItem.nickname}</p>
                  <p>
                    {currItem.brand}: {currItem.type}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
