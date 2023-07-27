"use client";
import {
  CollectionIcon,
  EyeIcon,
  PlusCircleIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Plus from "@@/svg/plus.svg";
import { motion } from "framer-motion";

import adminRestricted from "../utils/adminRestricted";

function Dashboard() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center min-h-[40rem] gap-7">
      <h1 className="relative text-3xl font-black leading-tight text-gray-900 lg:mb-5 lg:text-4xl">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Link
          href={"/admin/course"}
          className="p-6 m-auto bg-white border border-indigo-100 rounded-xl hover:bg-indigo-100"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <EyeIcon className="h-20 w-20 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-1">View Courses</h2>
            <p className="w-60">View, manage and create courses here </p>
            <div className="mt-4 flex justify-center gap-2">
              <Link
                href={"/admin/course/create"}
                className="px-4 py-2 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
              >
                <Plus className="w-5 h-5 inline" />
                New
              </Link>
              <Link
                href={"/admin/course"}
                className="px-4 py-2 text-sm font-medium text-center border rounded-lg  hover:bg-gray-800 text-white border-gray-600 bg-gray-700 hover:border-gray-700 "
              >
                All Courses
              </Link>
            </div>
          </motion.div>
        </Link>

        <Link
          href={"/admin/creator"}
          className="p-6 m-auto bg-white border border-indigo-100 rounded-xl hover:bg-indigo-100"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <PlusCircleIcon className="h-20 w-20 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-1">View Creators</h2>
            <p className=" w-60">Manage and collaborate with course creators</p>
            <div className="mt-4 flex justify-center gap-2">
              <Link
                href={"/admin/creator/add"}
                className="px-4 py-2 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
              >
                <Plus className="w-5 h-5 inline" />
                New
              </Link>
              <Link
                href={"/admin/creator"}
                className="px-4 py-2 text-sm font-medium text-center border rounded-lg  hover:bg-gray-800 text-white border-gray-600 bg-gray-700 hover:border-gray-700 "
              >
                All Courses
              </Link>
            </div>
          </motion.div>
        </Link>

        <Link
          href={"/admin/category"}
          className="p-6 m-auto bg-white border border-indigo-100 rounded-xl hover:bg-indigo-100"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <CollectionIcon className="h-20 w-20 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-1">Categories</h2>
            <p className="w-60">Manage and categorize your course content</p>
            <div className="mt-4 flex justify-center gap-2">
              <Link
                href={"/admin/category/add"}
                className="px-4 py-2 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
              >
                <Plus className="w-5 h-5 inline" />
                New
              </Link>
              <Link
                href={"/admin/category"}
                className="px-4 py-2 text-sm font-medium text-center border rounded-lg  hover:bg-gray-800 text-white border-gray-600 bg-gray-700 hover:border-gray-700 "
              >
                All Courses
              </Link>
            </div>
          </motion.div>
        </Link>

        <Link
          href={"/admin/dashboard"}
          className="p-6 m-auto bg-white border border-indigo-100 rounded-xl hover:bg-indigo-100"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <UsersIcon className="h-20 w-20 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-1">View Users</h2>
            <p className="w-60">View, manage and create courses here </p>
            <div className="mt-4 flex justify-center gap-2">
              <Link
                href="#"
                className="px-4 py-2 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
              >
                <Plus className="w-5 h-5 inline" />
                New
              </Link>
              <Link
                href="#"
                className="px-4 py-2 text-sm font-medium text-center border rounded-lg  hover:bg-gray-800 text-white border-gray-600 bg-gray-700 hover:border-gray-700 "
              >
                All Courses
              </Link>
            </div>
          </motion.div>
        </Link>
      </div>
    </main>
  );
}

export default adminRestricted(Dashboard);
