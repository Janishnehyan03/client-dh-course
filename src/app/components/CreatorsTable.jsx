"use client";
import React, { useState, useEffect } from "react";
import Axios from "../Axios";

function CreatorsTable() {
  const [creators, setCreators] = useState([]);

  const getCreators = async () => {
    try {
      let { data } = await Axios.get("/creator");
      console.log(data);
      setCreators(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getCreators();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-4xl text-violet-700 font-bold my-4 text-center uppercase">Our Instructors</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {creators.map((creator) => (
            <tr key={creator._id}>
              <td className="py-2 px-4 border">{creator.name}</td>
              <td className="py-2 px-4 border">{creator.description}</td>
              <td className="py-2 px-4 border">
                <img src={creator.image} alt={creator.title} className="w-16 h-16" />
              </td>
              <td className="py-2 px-4 border">{creator.phone}</td>
              <td className="py-2 px-4 border">{creator.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CreatorsTable;