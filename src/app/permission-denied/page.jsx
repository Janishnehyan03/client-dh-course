import React from "react";

const PermissionDeniedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Permission Denied
        </h2>
        <p className="text-gray-700 text-base">
          You do not have permission to access this page. Please contact the
          administrator for further assistance.
        </p>
      </div>
    </div>
  );
};

export default PermissionDeniedPage;
