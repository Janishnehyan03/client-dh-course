"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Axios from "../Axios";

const adminRestricted = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if the user is authenticated
    const isAuthenticated = Cookies.get("token");
    const getUser = async () => {
      try {
        let { data } = await Axios.get("/auth/user", {
          headers: {
            Authorization: `Bearer ${isAuthenticated}`,
          },
        });
        return data;
      } catch (error) {
        console.log(error.response);
      }
    };

    useEffect(() => {
      // Redirect the user if they are already authenticated
      getUser()
        .then((data) => {
          if (!isAuthenticated) {
            router.push("/login"); // Replace '/' with the desired page
          } else if (!data?.role === "admin") {
            setIsAdmin(true);
            router.push("/permission-denied"); // Replace '/' with the desired page
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [isAuthenticated, router, isAdmin]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default adminRestricted;
