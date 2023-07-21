"use client";
import React, { useState, useEffect } from "react";
import Axios from "../Axios";
import Link from "next/link";

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl text-violet-700 font-bold uppercase">Our Instructors</h2>
        <Link
        href={"/admin/creator/add"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create
        </Link>
      </div>
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
