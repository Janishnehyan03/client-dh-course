import React from "react";
import Courses from "../components/Courses";

function page() {
  return (
    <main className="flex lg:min-h-screen flex-col items-center justify-start p-5 lg:p-24">
      <Courses />
    </main>
  );
}

export default page;
