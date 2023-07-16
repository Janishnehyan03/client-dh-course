"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Axios from "../Axios";
import adminRestricted from "../utils/adminRestricted";

const EditCourseForm = () => {
  const router = useParams();
  const { slug } = router;
  const [showModal, setShowModal] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const handleUpdateThumbnail = () => {
    setShowModal(true);
  };
  const uploadThumbnail = async (e) => {
    const thumbnailData =  new FormData();
    thumbnailData.append("thumbnail", thumbnail);
    try {
      let response = await Axios.patch(`/course/${slug}/thumbnail`, thumbnailData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); 
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
      const formDataToSend = {
        title: formData.title,
        description: formData.description,
        previewVideo: formData.previewVideo,
        price: formData.price,
        category: formData.category,
        creator: formData.creator,
        videos: formData.videos,
      };

      await Axios.patch(`/course/${slug}`, formDataToSend);

      setLoading(false);
      router.push("/admin/dashboard"); // Replace '/admin/dashboard' with the desired page
    } catch (error) {
      setLoading(false);
      console.error(error.response);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await Axios.get(`/course/${slug}`);
      const { data } = response;

      setFormData({
        title: data.title,
        description: data.description,
        previewVideo: data.previewVideo,
        price: data.price,
        category: data.category._id,
        creator: data.creator._id,
        videos: data.videos,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCategories = async () => {
    try {
      const response = await Axios.get("/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCreators = async () => {
    try {
      const response = await Axios.get("/creator");
      setCreators(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
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
                Edit Course
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
              <div className="col-span-3">
                <div className="flex items-center mb-4 mt-3">
                  <label htmlFor="thumbnail" className="mr-2">
                    Thumbnail:
                  </label>
                  <button
                    type="button"
                    onClick={handleUpdateThumbnail}
                    className="bg-violet-500 hover:bg-violet-700  text-white py-1 px-2  focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Update Thumbnail
                  </button>
                </div>

                {/* Other code... */}
              </div>
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-500 bg-opacity-50">
                  <div className="bg-white rounded shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">
                      Update Thumbnail
                    </h2>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnail(e.target.files[0])}
                      className="border border-gray-300 p-2"
                    />
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="text-gray-500 hover:text-gray-700 px-4 py-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={uploadThumbnail}
                        type="submit"
                        className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 ml-2"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              )}
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

export default adminRestricted(EditCourseForm);
