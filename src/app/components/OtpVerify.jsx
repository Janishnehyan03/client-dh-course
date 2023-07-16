"use client";
import { useState } from "react";
import Axios from "../Axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import authCheck from "../utils/authCheck";

const OTPVerificationPage = () => {
  const [otpToken, setOtpToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.post("/auth/verify-token", {
        otpToken,
        email: Cookies.get("registered-email"),
      });

      // Process the response
      setLoading(false);
      const decodedToken = jwtDecode(data.token);
      const expirationDate = new Date(decodedToken.exp * 1000); // Convert expiration time to milliseconds
      Cookies.set("token", data.token, { expires: expirationDate, path: "/" });
      Cookies.set('email',data.email)
      Cookies.set('email',data.email)
      Cookies.set('role',data.role)
      // Log the response or perform other actions
      Cookies.clear();
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      // Handle error response
      console.error(error.response);
      setMessage(error.response);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">
          OTP Verification
        </h2>
        <p className=" mb-8 text-center">
          we have sent an OTP to your email:{" "}
          <span className="text-blue-600">
            {Cookies.get("registered-email")}
          </span>
        </p>
        {message && (
          <div className="bg-red-100 text-red-700 mb-6 p-4 rounded-md">
            {message}
          </div>
        )}
        <form>
          <div className="mb-6">
            <label htmlFor="otpToken" className="block mb-2 font-medium">
              Enter Your OTP
            </label>
            <input
              type="text"
              id="otpToken"
              value={otpToken}
              onChange={(e) => setOtpToken(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
            />
          </div>

          {loading ? (
            <button
              type="button"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
            >
              Processing...
            </button>
          ) : (
            <button
              type="button"
              onClick={handleVerify}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
            >
              Verify
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default authCheck(OTPVerificationPage);
