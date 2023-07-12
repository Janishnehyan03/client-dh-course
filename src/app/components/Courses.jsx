"use client";
import React, { useEffect, useState } from "react";
import Axios from "../Axios";

function Courses() {
  const [courses, setCourses] = useState([]);

  const getCourses = async (e) => {
    try {
      let { data } = await Axios.get("/course");
      setCourses(data.courses);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {courses.map((course, index) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src={course.thumbnail}
              alt={course.title}
            />
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{course.category.name}
              </span>
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{course.title}</div>
              <p className="text-gray-700 text-base">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Courses;
