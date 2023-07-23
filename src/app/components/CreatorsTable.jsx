'use client'
import React, { useState, useEffect } from "react";
import Axios from "../Axios";
import Link from "next/link";

function CreatorsTable() {
  const [creators, setCreators] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCreatorId, setSelectedCreatorId] = useState(null);

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

  const handleDelete = async (id) => {
    setSelectedCreatorId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCreatorId) {
      try {
        await Axios.delete(`/creator/${selectedCreatorId}`);
        getCreators(); // Refresh the list after deletion
      } catch (error) {
        console.log(error.response);
      }
      setSelectedCreatorId(null);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedCreatorId(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl text-violet-700 font-bold uppercase">Our Instructors</h2>
        <Link href={"/admin/creator/add"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create
        </Link>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Actions</th> {/* New column for actions */}
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
              <td className="py-2 px-4 border">
                <Link href={`/admin/creator/edit/${creator.slug}`}>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(creator._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this creator?</p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="text-gray-500 hover:text-gray-700 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatorsTable;
