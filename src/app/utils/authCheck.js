"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const authCheck = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    // Check if the user is authenticated
    const isAuthenticated = Cookies.get("token");

    useEffect(() => {
      // Redirect the user if they are already authenticated
      if (isAuthenticated) {
        router.push("/"); // Replace '/' with the desired page
      }
    }, [isAuthenticated, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default authCheck;
