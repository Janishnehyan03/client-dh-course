'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Change next/navigation to next/router
import Axios from "../Axios";
import adminRestricted from "../utils/adminRestricted";

const EditCreatorForm = () => {
  const router = useParams();
  const { slug } = router;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null, // Add an image field to handle the image upload
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: imageFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await Axios.patch(`/creator/${slug}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      window.location.href = "/admin/dashboard"; // Use window.location.href to navigate to the desired page
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const fetchCreatorDetails = async () => {
    try {
      const response = await Axios.get(`/creator/${slug}`);
      const { data } = response;

      setFormData({
        name: data.name,
        description: data.description,
        phone: data.phone,
        email: data.email,
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

            <div>
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

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-span-3">
              <div className="flex items-center mb-4 mt-3">
                <label htmlFor="image" className="mr-2">
                  Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2"
                />
              </div>
            </div>

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
