"use client";
import Link from "next/link";
import { useState } from "react";
import Axios from "../Axios";
import Cookies from "js-cookie";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const { data } = await Axios.post("/auth/signup", formData);
      Cookies.set("registered-email", formData.email);
      setFormData({ email: "", password: "" });
      // Log the response or perform other actions
      setLoading(false);
      setError(null);
      window.location.href = "/verify-otp";
    } catch (error) {
      console.error(error.response);
      setLoading(false);
      setError(
        error.response?.data?.message
          ? error.response.data.message
          : "something went wrong"
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-900"
      style={{
        backgroundImage: `url(${"/images/login-bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.8,
      }}
    >
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6">
          Welcome to CPET Online
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="" className="block text-white">
              Name:
            </label>
            <input
              type="text"
              id=""
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="name"
              required
              className="border border-gray-700 bg-gray-900 text-white px-4 py-2 w-full rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email"
              required
              className="border border-gray-700 bg-gray-900 text-white px-4 py-2 w-full rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="password"
              required
              className="border border-gray-700 bg-gray-900 text-white px-4 py-2 w-full rounded"
            />
          </div>
          <p className="text-red-300 text-center">{error} </p>
          {loading ? (
            <div className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full">
              <p className="text-center">Processing...</p>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full"
            >
              Register
            </button>
          )}
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
