'use client'
import {
    CollectionIcon,
    EyeIcon,
    PlusCircleIcon,
    UsersIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import adminRestricted from "../utils/adminRestricted";
  
function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link
            href={"/admin/create-course"}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <PlusCircleIcon className="h-20 w-20 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Create New Course</h2>
            <p>Create a new course to add to your platform.</p>
          </Link>

          <Link
            href={"/admin/courses"}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <EyeIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">View Courses</h2>
            <p>View and manage existing courses.</p>
          </Link>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <UsersIcon className="h-20 w-20 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">View Creators</h2>
            <p>Manage and collaborate with course creators.</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <CollectionIcon className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
            <p>Manage and categorize your course content.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default adminRestricted(Dashboard);
