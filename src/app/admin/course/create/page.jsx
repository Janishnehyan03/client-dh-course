import AddCourseForm from "@/app/components/CreateCourse";
import React from "react";
export const metadata = {
    title: 'Create Course | CPET Online',
    description: 'Generated by create next app',
  }
function page() {
  return (
    <div>
      <AddCourseForm />
    </div>
  );
}

export default page;