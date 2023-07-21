'use client'
import React, { useState } from "react";
import Axios from "../Axios";

function AddCreator() {
  const [newCreator, setNewCreator] = useState({
    name: "",
    description: "",
    image: null, // Initialize as null
    email: "",
    phone: "",
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCreator((prevCreator) => ({
      ...prevCreator,
      [name]: value,

    }));
  };
// console.log(newCreator);  

const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", newCreator.name);
    formData.append("description", newCreator.description);
    formData.append("email", newCreator.email);
    formData.append("phone", newCreator.phone);
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
      email: "",
      phone: "",
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
  <div className="flex flex-col mb-4">
    <label htmlFor="email" className="text-lg font-medium mb-2">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={newCreator.email}
      onChange={handleInputChange}
      placeholder="Enter email"
      className="border border-gray-400 rounded-lg py-1 px-4"
    />
  </div>
  <div className="flex flex-col mb-4">
    <label htmlFor="phone" className="text-lg font-medium mb-2">
      Phone
    </label>
    <input
      type="text"
      id="phone"
      name="phone"
      value={newCreator.phone}
      onChange={handleInputChange}
      placeholder="Enter phone number"
      className="border border-gray-400 rounded-lg py-1 px-4"
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
