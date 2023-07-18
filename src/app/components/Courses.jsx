"use client";
import React, { useEffect, useState } from "react";
import Axios from "../Axios";
import Image from "next/image";
import Link from "next/link";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    try {
      let { data } = await Axios.get("/auth/user");
      console.log(data);
      if (data.role === "admin") setIsAdmin(true);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getCourses = async (e) => {
    setLoading(true);
    try {
      let { data } = await Axios.get("/course");
      setCourses(data.courses);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getCourses();
    getUser()
  }, []);
  return (
    <>
      {loading ? (
        <div className="lg:grid grid-cols-3 gap-3">
          {[1, 1, 1, 1, 1, 1, 11, 1, 1, ].map((item, index) => (
            <div
              key={index}
              className="w-80 bg-white rounded-lg shadow-md p-4 animate-pulse"
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
      ) : (
        <div className="lg:grid grid-cols-3">
          {courses.map((course, index) => (
            <Link
              key={index}
              href={`/course/${course.slug}`}
              className="max-w-sm m-2 rounded overflow-hidden group shadow-lg hover:bg-indigo-300 transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={500}
                  height={300}
                  className="rounded-t "
                />
              </div>
              <div className="px-6 pt-4 pb-2 mt-16">
                <span className="inline-block bg-gray-200 group-hover:bg-gray-200 transition rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{course.category.name}
                </span>
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course.title}</div>
                <p className="text-gray-700 text-base">{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Courses;
