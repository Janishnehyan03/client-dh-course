"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Axios from "../Axios";
import adminRestricted from "../utils/adminRestricted";
const DeleteCourseForm = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState(null); // State to hold the fetched course data

  const handleDelete = async () => {
    setLoading(true);
console.log(courseData._id);

    try {
      await Axios.delete(`/course/${courseData._id}`);
      setLoading(false);
      router.push("/admin/dashboard"); // Replace '/admin/dashboard' with the desired page after successful deletion
    } catch (error) {
      setLoading(false);
      console.error(error.response);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await Axios.get(`/course/${slug}`);
      setCourseData(response.data); // Store the fetched course data in the state
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchCourseDetails(); // Fetch course details when the component mounts
  }, []);

  if (!courseData) {
    return <div>Loading...</div>; // Display a loading message while fetching the course details
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-3">
            <div className="col-span-3">
              <h2 className="font-semibold text-xl text-gray-600 mb-4">
                Delete Course
              </h2>
            </div>

            <div className="col-span-3">
              <p>Are you sure you want to delete this course?</p>
              <p>Course Title: {courseData.title}</p>
              <p>Category: {courseData.category.name}</p>
              {/* Display other relevant fields from the courseData object */}
            </div>

            <div className="col-span-3">
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminRestricted(DeleteCourseForm);