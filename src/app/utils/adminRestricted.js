"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const adminRestricted = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    // Check if the user is authenticated
    const isAuthenticated = Cookies.get("token");
    const isAdmin = Cookies.get("role")==='admin'

    useEffect(() => {
      // Redirect the user if they are already authenticated
      if (!isAuthenticated) {
        router.push("/login"); // Replace '/' with the desired page
      } else if (!isAdmin) {
        router.push("/permission-denied"); // Replace '/' with the desired page
      }
    }, [isAuthenticated, router, isAdmin]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default adminRestricted;
