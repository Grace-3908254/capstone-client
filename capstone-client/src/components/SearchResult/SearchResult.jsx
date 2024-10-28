import React from "react";

export default function SearchResult({ results }) {
  console.log("Displaying results:", results); // Log results received

  return (
    <div>
      {results?.map((item) => (
        <div
          key={item.serial_num}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
            <p>
              <strong>Brand:</strong> {item.brand}
            </p>
            <p>
              <strong>Type:</strong> {item.type}
            </p>
            <p>
              <strong>Citizenship:</strong> {item.citizenship}
            </p>
            <p>
              <strong>Size:</strong> {item.size}
            </p>
            <p>
              <strong>Birthdate:</strong> {item.birthdate}
            </p>
            <p>
              <strong>Address:</strong> {item.address}
            </p>
            <p>
              <strong>Serial Number:</strong> {item.serial_num}
            </p>
        </div>
      ))}
    </div>
  );
}
