"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Axios from "../Axios";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    previewVideo: "",
    price: 0,
    category: "",
    creator: "",
    videos: [{ videoTitle: "", videoUrl: "" }],
  });
  const [categories, setCategories] = useState([]);
  const [creators, setCreators] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getCategories = async (e) => {
    try {
      let { data } = await Axios.get("/category");
      setCategories(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCreators = async (e) => {
    try {
      let { data } = await Axios.get("/creator");
      setCreators(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumbnail: file,
    }));
  };

  const handleVideoChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const videos = [...prevFormData.videos];
      videos[index][field] = value;
      return { ...prevFormData, videos };
    });
  };

  const handleAddVideo = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      videos: [...prevFormData.videos, { videoTitle: "", videoUrl: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("thumbnail", formData.thumbnail);
      formDataToSend.append("previewVideo", formData.previewVideo);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("creator", formData.creator);
      formData.videos.forEach((video, index) => {
        formDataToSend.append(`videos[${index}][videoTitle]`, video.videoTitle);
        formDataToSend.append(`videos[${index}][videoUrl]`, video.videoUrl);
      });

      const response = await Axios.post("/course", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategories();
    getCreators();
  }, []);
  return (
    <div>
      <h1 className="text-center font-bold my-4 text-2xl text-violet-800">
        CREATE NEW COURSE
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-violet-100 p-9 rounded-lg mx-auto"
      >
        <label className="block mb-4 uppercase">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="border border-violet-600 rounded-[10px] mt-1 p-3 block w-full"
          />
        </label>

        <label className="block mb-4 uppercase">
          <span className="text-gray-700">Description:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="border border-violet-600 rounded-[10px]  mt-1 p-3 block w-full"
          />
        </label>

        <label className="block mb-4 uppercase">
          <span className="text-gray-700">Thumbnail:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="border border-violet-600 bg-white rounded-[10px] mt-1 p-3 block w-full"
          />
        </label>

        <label className="block mb-4 uppercase">
          <span className="text-gray-700">Preview Video URL:</span>
          <input
            type="text"
            name="previewVideo"
            value={formData.previewVideo}
            onChange={handleInputChange}
            required
            className="border border-violet-600 rounded-[10px] mt-1 p-3 block w-full"
          />
        </label>

        <label className="block mb-4 uppercase">
          <span className="text-gray-700">Price:</span>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="border border-violet-600 rounded-[10px] mt-1 p-3 block w-full"
          />
        </label>

        <label className="block mb-4 uppercase">
          <span className="text-gray-700">Category:</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="border border-violet-600 rounded-[10px] mt-1 p-3 block w-full"
          >
            <option hidden>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category?.name}
              </option>
            ))}
            {/* Add more options as needed */}
          </select>
        </label>

        <label className="block mb-4 uppercase">
          <span className="text-gray-700">Creator:</span>
          <select
            name="creator"
            value={formData.creator}
            onChange={handleInputChange}
            required
            className="border border-violet-600 rounded-[10px] mt-1 p-3 block w-full"
          >
            <option hidden>Select a creator</option>
            {creators.map((creator, index) => (
              <option value={creator._id} key={index}>
                {creator?.name}
              </option>
            ))}{" "}
            {/* Add more options as needed */}
          </select>
        </label>

        <label className="block mb-4 uppercase">
          <span className="text-gray-700">Videos:</span>
          {formData.videos.map((video, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                name="videoTitle"
                value={video.videoTitle}
                onChange={(e) =>
                  handleVideoChange(index, "videoTitle", e.target.value)
                }
                placeholder="Video Title"
                className="border border-violet-600 rounded-[10px] mr-2 mt-1 p-3 block w-full"
              />
              <input
                type="text"
                name="videoUrl"
                value={video.videoUrl}
                onChange={(e) =>
                  handleVideoChange(index, "videoUrl", e.target.value)
                }
                placeholder="Video URL"
                className="border border-violet-600 rounded-[10px] mt-1 p-3 block w-full"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddVideo}
            className="bg-violet-500 float-right mb-3 hover:bg-violet-700 text-white font-bold py-1 px-2 rounded"
          >
            +
          </button>
        </label>

        <button
          type="submit"
          className="bg-violet-700 hover:bg-violet-700 w-full text-white font-bold py-2 px-4 rounded"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
