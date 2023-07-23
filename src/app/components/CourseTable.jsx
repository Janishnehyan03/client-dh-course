"use client";
import React, { useEffect, useState } from "react";
import Axios from "../Axios";
import adminRestricted from "../utils/adminRestricted";
import Link from "next/link";

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState("null");
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get("/course");
      setLoading(false);
      setCourses(data.courses);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(courses);

  const handleRowClick = (courseId) => {
    setExpandedRow((prevRow) => (prevRow === courseId ? null : courseId));
  };
  return (
    <>
      {!loading ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left font-bold text-gray-800">#</th>
              <th className="px-6 py-4 text-left font-bold text-gray-800">
                Course Name
              </th>
              <th className="px-6 py-4 text-left font-bold text-gray-800">
                Category
              </th>
              <th className="px-6 py-4 text-left font-bold text-gray-800">
                Price
              </th>
              <th className="px-6 py-4 text-left font-bold text-gray-800">
                Creator
              </th>
              <th className="px-6 py-4 text-left font-bold text-gray-800">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <React.Fragment key={index}>
                <tr
                  className="cursor-pointer"
                  onClick={() => handleRowClick(index)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course?.category?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{course?.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course?.creator?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      href={`/admin/course/edit/${course?.slug}`}
                    >
                      Edit
                    </Link>
                    <Link
                      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                      href={`/admin/course/delete/${course?.slug}`}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr>
                    <td colSpan="3" className="p-6 ">
                      <div className="flex ml-32">
                        <img
                          src={course.thumbnail}
                          alt="Course Thumbnail"
                          className="w-44 mr-4 h-auto rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Course Description
                          </h3>
                          <p className="mb-4">{course.description}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default adminRestricted(CoursesTable);
