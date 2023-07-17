import React from "react";
import Courses from "../components/Courses";

function page() {
  return (
    <main className="flex lg:min-h-screen lg:flex-col items-center justify-between lg:p-24">
      <Courses />
    </main>
  );
}

export default page;
