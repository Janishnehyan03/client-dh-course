"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Axios from "../Axios";
import adminRestricted from "../utils/adminRestricted";

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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

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
      setFormData({
        title: "",
        description: "",
        thumbnail: null,
        previewVideo: "",
        price: 0,
        category: "",
        creator: "",
        videos: [{ videoTitle: "", videoUrl: "" }],
      });
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      console.error(error.response);
    }
  };
  useEffect(() => {
    getCategories();
    getCreators();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      class="min-h-screen p-6 bg-gray-100 flex items-center justify-center"
    >
      <div class="container max-w-screen-lg mx-auto">
        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-3">
            <div class="col-span-3">
              <h2 class="font-semibold text-xl text-gray-600 mb-4">
                Create New Course
              </h2>
            </div>

            <div>
              <label for="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label for="thumbnail">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                id="thumbnail"
                onChange={handleFileChange}
                required
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div>
              <label for="previewVideo">Preview Video URL</label>
              <input
                type="text"
                name="previewVideo"
                id="previewVideo"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.previewVideo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label for="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label for="category">Category</label>
              <select
                name="category"
                id="category"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option hidden>Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label for="creator">Creator</label>
              <select
                name="creator"
                id="creator"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.creator}
                onChange={handleInputChange}
                required
              >
                <option hidden>Select a creator</option>
                {creators.map((creator, index) => (
                  <option value={creator._id} key={index}>
                    {creator?.name}
                  </option>
                ))}
              </select>
            </div>

            <div class="col-span-3">
              <div className="w-full">
                <label for="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  class="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <label for="videos">Videos</label>
              {formData.videos.map((video, index) => (
                <div key={index} class="flex space-x-4">
                  <input
                    type="text"
                    name="videoTitle"
                    value={video.videoTitle}
                    onChange={(e) =>
                      handleVideoChange(index, "videoTitle", e.target.value)
                    }
                    placeholder="Video Title"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                  <input
                    type="text"
                    name="videoUrl"
                    value={video.videoUrl}
                    onChange={(e) =>
                      handleVideoChange(index, "videoUrl", e.target.value)
                    }
                    placeholder="Video URL"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddVideo}
                class="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                add video
              </button>
            </div>

            <div class="col-span-3">
              <button
                type="submit"
                disabled={loading}
                class="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default adminRestricted(AddCourseForm);
