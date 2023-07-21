"use client";
import React, { useEffect, useState } from "react";
import Axios from "../Axios";
import adminRestricted from "../utils/adminRestricted";
import Link from "next/link";

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

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
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <React.Fragment key={course.id}>
                <tr
                  className="cursor-pointer"
                  onClick={() => handleRowClick(index)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{course.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.creator.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                   <Link href={`/admin/course/edit/${course.slug}`}>
                   Edit 
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
        <div className="grid grid-cols-5 gap-3">
          {[1, 1, 1, 1, 1, 1, 11, 1, 1, 1].map((item, index) => (
            <div
              key={index}
              className="w-64 bg-white rounded-lg shadow-md p-4 animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-300 mb-4"></div>{" "}
              {/* Title Skeleton */}
              <div className="h-40 bg-gray-300 mb-4"></div>{" "}
              {/* Card Image Skeleton */}
              <div className="h-4 w-16 bg-gray-300 mb-2"></div>{" "}
              {/* Text Skeleton */}
              <div className="h-4 w-32 bg-gray-300"></div> {/* Text Skeleton */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default adminRestricted(CoursesTable);
