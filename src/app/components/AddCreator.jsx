'use client'
import React, { useState } from "react";
import Axios from "../Axios";

function AddCreator() {
  const [newCreator, setNewCreator] = useState({
    name: "",
    email: "",
    username: "",
    image: "",
    facebook: "",
    twitter: "",
    instagram: "",
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
      await Axios.post("/creator", newCreator);
      // Clear form fields after successful submission
      setNewCreator({
        name: "",
        email: "",
        username: "",
        image: "",
        facebook: "",
        twitter: "",
        instagram: "",
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container mx-auto flex flex-col content-center justify-center items-center mb-4">
      <div className="">
        <h2 className="text-4xl text-violet-700 font-bold uppercase">Add New Creator</h2>
      </div>

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
          <label htmlFor="username" className="text-lg font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={newCreator.username}
            onChange={handleInputChange}
            placeholder="Enter username"
            className="border border-gray-400 rounded-lg py-1 px-4"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="image" className="text-lg font-medium mb-2">
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={newCreator.image}
            onChange={handleInputChange}
            placeholder="Enter image URL"
            className="border border-gray-400 rounded-lg py-1 px-4"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="facebook" className="text-lg font-medium mb-2">
            Facebook
          </label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            value={newCreator.facebook}
            onChange={handleInputChange}
            placeholder="Enter Facebook URL"
            className="border border-gray-400 rounded-lg py-1 px-4"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="twitter" className="text-lg font-medium mb-2">
            Twitter
          </label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            value={newCreator.twitter}
            onChange={handleInputChange}
            placeholder="Enter Twitter URL"
            className="border border-gray-400 rounded-lg py-1 px-4"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="instagram" className="text-lg font-medium mb-2">
            Instagram
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={newCreator.instagram}
            onChange={handleInputChange}
            placeholder="Enter Instagram URL"
            className="border border-gray-400 rounded-lg py-1 px-4"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCreator;
