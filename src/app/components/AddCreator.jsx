"use client";
import React, { useState } from "react";
import Axios from "../Axios";

function AddCreator() {
  const [newCreator, setNewCreator] = useState({
    name: "",
    description: "",
    image: null, // Initialize as null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCreator((prevCreator) => ({
      ...prevCreator,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newCreator.name);
      formData.append("description", newCreator.description);
      formData.append("image", newCreator.image); // Append the image file to the formData

      await Axios.post("/creator", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Clear form fields after successful submission
      setNewCreator({
        name: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="mt-8 w-80">
      <div className="flex flex-col mb-4">
        <label htmlFor="name" className="text-lg font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newCreator.name}
          onChange={handleInputChange}
          placeholder="Enter name"
          className="border border-gray-400 rounded-lg py-1 px-4"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="description" className="text-lg font-medium mb-2">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={newCreator.description}
          onChange={handleInputChange}
          placeholder="Enter description"
          className="border border-gray-400 rounded-lg py-1 px-4"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="image" className="text-lg font-medium mb-2">
          Image
        </label>
        <input
          type="file" // Change the input type to "file"
          id="image"
          name="image"
          onChange={(event) => {
            const file = event.target.files[0];
            setNewCreator((prevCreator) => ({
              ...prevCreator,
              image: file, // Store the selected image file in the state
            }));
          }}
          accept="image/*" // Accept only image file types
          className="border border-gray-400 rounded-lg py-1 px-4"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default AddCreator;
