"use client";
import React, { useState, useEffect } from "react";
import Axios from "../Axios";
import Link from "next/link";

function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showNewCategoryPopup, setShowNewCategoryPopup] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const getCategories = async () => {
    try {
      let { data } = await Axios.get("/category");
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleEditClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowEditPopup(true);
    // Fetch the current data for the selected category and populate the input fields
    const selectedCategory = categories.find(
      (category) => category._id === categoryId
    );
    if (selectedCategory) {
      setEditedCategoryName(selectedCategory.name);
      // Set other state variables for other fields you want to edit
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Perform the PATCH request to update the category with edited data
    try {
      await Axios.patch(`/category/${selectedCategoryId}`, {
        name: editedCategoryName,
        // Include other fields you want to edit
      });
      setShowEditPopup(false);
      // You can perform any additional actions after successful editing if required
      // For example, you can update the categories list to reflect the changes in the table.
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Axios.delete(`/category/${categoryToDelete._id}`);
      setShowDeletePopup(false);
      // You can perform any additional actions after successful deletion if required
      // For example, you can update the categories list to remove the deleted category from the table.
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleNewCategoryClick = () => {
    setShowNewCategoryPopup(true);
  };

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    // Perform the POST request to create a new category with the entered data
    try {
      await Axios.post("/category", {
        name: newCategoryName,
        // Include other fields you want to add
      });
      setShowNewCategoryPopup(false);
      setNewCategoryName("");
      // You can perform any additional actions after successful category creation if required
      // For example, you can update the categories list to include the newly added category in the table.
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl text-violet-700 font-bold uppercase">
          Categories
        </h2>
        <button
          onClick={handleNewCategoryClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Category
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Options</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="py-2 px-4 border">{category.name}</td>
              <td className="py-2 px-4 border">
                <button
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
                  onClick={() => handleEditClick(category._id)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
                  onClick={() => handleDeleteClick(category)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit Category Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  type="text"
                  id="categoryName"
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>
              {/* Add other input fields for other fields you want to edit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 ml-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditPopup(false)}
                  className="text-gray-500 hover:text-gray-700 px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}{" "}
      {/* Delete Category Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Delete Category</h2>
            <p>
              Are you sure you want to delete the category "
              {categoryToDelete.name}"?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 ml-2"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 ml-2"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}{" "}
      {/* New Category Popup */}
      {showNewCategoryPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">New Category</h2>
            <form onSubmit={handleNewCategorySubmit}>
              <div className="mb-4">
                <label htmlFor="newCategoryName">Category Name</label>
                <input
                  type="text"
                  id="newCategoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>
              {/* Add other input fields for other fields you want to add */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 ml-2"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCategoryPopup(false)}
                  className="text-gray-500 hover:text-gray-700 px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryTable;
