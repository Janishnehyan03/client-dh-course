"use client";

import { useEffect, useState } from "react";
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
  const [formErrors, setFormErrors] = useState({}); // Initialize formErrors as an empty object

  const [creators, setCreators] = useState([]);
  const [error, setError] = useState([]);

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
  const handleRemoveVideo = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      videos: prevFormData.videos.filter((_, i) => i !== index),
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
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.message); // Update the error state with the error message
        setFormErrors(error.response.data.errors);
      } else {
        setError("An error occurred. Please try again later."); // Generic error message if no specific message from server
      }
    }
  };
  useEffect(() => {
    getCategories();
    getCreators();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen p-6 bg-gray-100 flex items-center justify-center"
    >
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-3">
            <div className="col-span-3">
              <h2 className="font-semibold text-xl text-gray-600 mb-4">
                Create New Course
              </h2>
            </div>

            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.title}
                onChange={handleInputChange}
                // required
              />
            </div>

            <div>
              <label htmlFor="thumbnail">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                id="thumbnail"
                onChange={handleFileChange}
                // required
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="previewVideo">Preview Video URL</label>
              <input
                type="text"
                name="previewVideo"
                id="previewVideo"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.previewVideo}
                onChange={handleInputChange}
                // required
              />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.price}
                onChange={handleInputChange}
                // required
              />
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.category}
                onChange={handleInputChange}
                // required
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
              <label htmlFor="creator">Creator</label>
              <select
                name="creator"
                id="creator"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.creator}
                onChange={handleInputChange}
                // required
              >
                <option hidden>Select a creator</option>
                {creators.map((creator, index) => (
                  <option value={creator._id} key={index}>
                    {creator?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-3">
            <div className="w-full">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  className="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={formData.description}
                  onChange={handleInputChange}
                  // required
                ></textarea>
                {formErrors.description && (
                  <div className="text-red-600 mb-4">{formErrors.description}</div>
                )}
              </div>
              <label htmlFor="videos">Videos</label>
                {formData.videos.map((video, index) => (
                  <div key={index} className="flex space-x-4">
                    <input
                      type="text"
                      name="videoTitle"
                      value={video.videoTitle}
                      onChange={(e) =>
                        handleVideoChange(index, "videoTitle", e.target.value)
                      }
                      placeholder="Video Title"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {formErrors[`videos.${index}.videoTitle`] && (
                      <div className="text-red-600 mb-4">
                        {formErrors[`videos.${index}.videoTitle`]}
                      </div>
                    )}
                    <input
                      type="text"
                      name="videoUrl"
                      value={video.videoUrl}
                      onChange={(e) =>
                        handleVideoChange(index, "videoUrl", e.target.value)
                      }
                      placeholder="Video URL"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {formErrors[`videos.${index}.videoUrl`] && (
                      <div className="text-red-600 mb-4">
                        {formErrors[`videos.${index}.videoUrl`]}
                      </div>
                    )}
                    {formData.videos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVideo(index)}
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Add Video
                </button>
           


              {loading ? (
                <div className="col-span-3">
                  <span className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Processing...
                  </span>
                </div>
              ) : (
                <div className="col-span-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Save Changes
                  </button>
                </div>
              )}
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default adminRestricted(AddCourseForm);
