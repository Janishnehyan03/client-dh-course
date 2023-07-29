"use client";
import React, { useEffect, useState } from "react";
import Axios from "../Axios";
import adminRestricted from "../utils/adminRestricted";
import Link from "next/link";
import Plus from "@@/svg/plus.svg";
import Edit from "@@/svg/edit.svg";
import Bin from "@@/svg/bin.svg";
import Previous from "@@/svg/previous.svg";
import Next from "@@/svg/next.svg";

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
      <main className="h-full pb-16 overflow-y-auto">
        <div className="container grid px-6 mx-auto">
          <h2 className="my-6 text-2xl font-semibold text-gray-700">Tables</h2>
          <Link
            className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
            href="https://github.com/estevanmaito/windmill-dashboard"
          >
            <div className="flex items-center">
              <Plus className="w-5 h-5 mr-2 inline" />
              <span>Star this project on GitHub</span>
            </div>
            <span>View more →</span>
          </Link>          {/* With actions */}
          <h4 className="mb-4 text-lg font-semibold text-gray-600">
            Table with actions
          </h4>
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-700 bg-gray-50">
                    <th className="px-4 py-3">Course Name</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Creator</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-700">
                  {courses.map((course, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className="text-gray-700"
                        onClick={() => handleRowClick(index)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src={course.thumbnail}
                                alt="image"
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              />
                            </div>
                            <div>
                              <p className="font-semibold">{course?.title}</p>
                              <p className="text-xs text-gray-600">
                                {course?.category?.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">₹ {course?.price}</td>
                        <td className="px-4 py-3 text-xs">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                            Approved
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {course?.creator?.name}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-4 text-sm">
                            <Link
                              href={`/admin/course/edit/${course?.slug}`}
                              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                              aria-label="Edit"
                            >
                              <Edit className="w-5 h-5 inline" />
                            </Link>
                            <Link
                              href={`/admin/course/delete/${course?.slug}`}
                              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                              aria-label="Delete"
                            >
                              <Bin className="w-5 h-5 inline" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      {expandedRow === index && (
                        <tr className="">
                          <td colSpan="5">
                            <img
                              src={course.thumbnail}
                              alt="Course Thumbnail"
                              className="w-44 mr-4 h-auto rounded-lg"
                            />
                            <h3 className="text-lg font-semibold mb-2">
                              Course Description
                            </h3>
                            <p className="mb-4">{course.description}</p>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t border-gray-700 bg-gray-50 sm:grid-cols-9">
              <span className="flex items-center col-span-3">
                Showing 21-30 of 100
              </span>
              <span className="col-span-2" />
              {/* Pagination */}
              <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul className="inline-flex items-center">
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous"
                      >
                        <Previous className="w-5 h-5 inline" />
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        1
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        2
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                        3
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        4
                      </button>
                    </li>
                    <li>
                      <span className="px-3 py-1">...</span>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        8
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        9
                      </button>
                    </li>
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next"
                      >
                        <Next className="w-5 h-5 inline" />
                      </button>
                    </li>
                  </ul>
                </nav>
              </span>
            </div>
          </div>
        </div>
      </main>

    </>
  );
};

export default adminRestricted(CoursesTable);
