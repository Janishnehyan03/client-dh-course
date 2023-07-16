"use client";
import React, { useState, useEffect } from "react";
import Axios from "../Axios";

function CreatorsTable() {
  const [creators, setCreators] = useState([]);

  const getCreators = async () => {
    try {
      let { data } = await Axios.get("/creator");
      setCreators(data)
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getCreators();
  }, []);

  return (
    <div>
      <h2>Creators Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {creators.map((creator) => (
            <tr key={creator.id}>
              <td>{creator.name}</td>
              <td>{creator.description}</td>
              <td>
                <img src={creator.image} alt={creator.title} />
              </td>
              <td>{creator.phone}</td>
              <td>{creator.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CreatorsTable;
