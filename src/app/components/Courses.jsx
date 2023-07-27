"use client";
import React, { useEffect, useState } from "react";
import Axios from "../Axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
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
    getUser();
  }, []);
  return (
    <>
      <h1 className="relative text-3xl font-black leading-tight text-gray-900 lg:mb-5 lg:text-4xl">
        Courses
      </h1>
      {loading ? (
        <div className="lg:grid grid-cols-3 gap-3">
          {[1, 1, 1, 1, 1, 1, 11, 1, 1].map((item, index) => (
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
              className="max-w-sm m-2 rounded overflow-hidden group h hover:bg-indigo-100 transition border border-indigo-100"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={500}
                  height={300}
                  className="rounded-t"
                />

                <div className="px-7 pt-4 pb-2 mt-3 mb-2">
                  <span className="inline-block bg-gray-200  group-hover:bg-indigo-700 group-hover:text-white transition rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{course.category?.name}
                  </span>
                </div>
                <div className="px-7">
                  <h2 className="font-bold text-xl mb-2">{course.title}</h2>
                  <div
                    className={`text-gray-700 text-base ${
                      expanded ? "" : "line-clamp-4"
                    }`}
                  >
                    {course.description}
                  </div>
                  {!expanded && (
                    <button
                      className="text-indigo-500 font-semibold mt-2"
                      onClick={() => setExpanded(true)}
                    >
                      Read More
                    </button>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Courses;
