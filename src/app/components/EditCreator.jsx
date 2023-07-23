"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Axios from "../Axios";
import adminRestricted from "../utils/adminRestricted";

const EditCreatorForm = () => {
  const router = useParams();
  const { slug } = router;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [oldData, setOldData] = useState({
    name: "", // Initialize with empty values
    description: "",
    image: null,
  });
  const handleUpdateThumbnail = () => {
    setShowModal(true);
  };
  const uploadThumbnail = async (e) => {
    const thumbnailData = new FormData();
    thumbnailData.append("thumbnail", thumbnail);
    try {
      let response = await Axios.patch(
        `/creator/thumbnail/${slug}`,
        thumbnailData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {}
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = {
        name: formData.name,
        description: formData.description,
      };

      await Axios.patch(`/creator/${slug}`, formDataToSend);

      setLoading(false);
      window.location.href = "/admin/creator"; // Use window.location.href to navigate to the desired page
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const fetchCreatorDetails = async () => {
    try {
      const response = await Axios.get(`/creator/${slug}`);
      const { data } = response;

      // Set older data to the state so that it preloads the form fields
      setOldData({
        name: data.name,
        description: data.description,
        image: null, // Since we are not preloading the image, set it to null
      });

      // Set form data to the older data initially
      setFormData({
        name: data.name,
        description: data.description,
        image: null, // Since we are not preloading the image, set it to null
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchCreatorDetails();
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
                Edit Creator
              </h2>
            </div>

            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
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
                  required
                ></textarea>
              </div>
            </div>

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
            <div className="col-span-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
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

export default adminRestricted(EditCreatorForm);
