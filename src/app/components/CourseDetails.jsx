"use client";
import React, { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/outline";
import { useParams } from "next/navigation";
import Axios from "../Axios";
import YouTubePlayer from "react-youtube";

function CourseDetails() {
  const params = useParams();
  const { slug } = params;

  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseLesson = () => {
    setSelectedLesson(null);
  };
  function getYoutubeVideoId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2]) {
      return match[2];
    } else {
      // Handle invalid URL or if video ID is not found
      return null;
    }
  }

  const getCourse = async () => {
    try {
      let { data } = await Axios.get(`/course/${slug}`);
      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourse();
  }, [slug]);
  return (
    <div className="bg-white text-gray-900">
      {selectedLesson && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black flex items-center justify-center">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-gray-200 hover:text-gray-400"
              onClick={handleCloseLesson}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <YouTubePlayer
              videoId={getYoutubeVideoId(selectedLesson.videoUrl)} // Replace with your actual video ID
            />
          </div>
        </div>
      )}
      <div
        className="h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${course?.thumbnail})` }}
      />
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-4xl font-bold mb-4 text-violet-900">
              {course?.title}
            </h1>
            <p className="text-gray-700 mb-4">{course?.description}</p>
            <div className="flex items-center mb-4">
              <div className="text-gray-700 flex items-center">
                <span>Created by: </span>
                <img
                  src={course?.creator?.image}
                  alt={course?.creator?.name}
                  className="ml-2 mr-1 rounded-full h-9"
                />
                <span className="font-bold">{course?.creator?.name}</span>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-700 mr-2">Price:</span>
              <span className="text-green-600 font-semibold">
                {course?.price}
              </span>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Lessons</h2>
              <ul className="list-disc list-inside">
                {course?.videos.map((lesson, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 mb-2 cursor-pointer"
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <div className="bg-gray-100 flex items-center p-3 min-w-full rounded-[20px]">
                      <PlayIcon className="h-10 mr-3 text-violet-700" />
                      <span className="text-violet-400 font-semibold">
                        {lesson?.videoTitle}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-lg w-1/4 ml-5 overflow-hidden shadow-lg bg-gray-100 px-4 py-6">
            <h2 className="text-lg font-semibold mb-2">
              Join this course now!
            </h2>
            <p className="text-gray-700 mb-4">
              Get started with this comprehensive course.
            </p>
            <div className="flex justify-end">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
