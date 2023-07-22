"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import Axios from "../Axios";
import Logo from "@@/svg/logo.svg";

function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isMobileNavClosed, setIsMobileNavClosed] = useState(true);
  const getUser = async () => {
    try {
      let { data } = await Axios.get("/auth/user");
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    const storedToken = Cookies.get("token"); // or localStorage.getItem('token');
    setToken(storedToken);
    if (storedToken) {
      getUser();
    }
  }, []);

  const handleLogout = () => {
    // Perform logout logic, e.g., clearing cookies or localStorage
    Cookies.remove("token"); // or localStorage.removeItem('token');
    router.push("/login"); // Redirect the user to the login page
  };
  const handleMobileNavToggle = () => {
    setIsMobileNavClosed(!isMobileNavClosed);
  };
  return (
    <header className="relative z-50 w-full h-24 overflow-visible">
      <div className="container flex items-center justify-between h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0">
        <a
          href={"/"}
          className="relative flex items-center h-full font-black leading-none"
        >
          <Logo className="w-auto h-6 text-indigo-600 fill-current" />
          <span className="ml-3 text-xl text-gray-800">
            CPET<span className="text-pink-500">.</span>
          </span>
        </a>
        <nav
          id="nav"
          onClick={handleMobileNavToggle}
          className={`absolute top-0 left-0 z-50 flex flex-col items-center justify-between ${
            isMobileNavClosed ? "hidden" : ""
          } w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative`}
        >
          <a
            href="/"
            className="ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600"
          >
            Home
          </a>
          <Link
            href={"/course"}
            className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600"
          >
            Courses
          </Link>
          <Link
            href="/admin/dashboard"
            className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600"
          >
            Contact
          </Link>

          <div className="flex flex-col w-full font-medium border-t border-gray-200 md:hidden">
            <Link
              href="#"
              className="w-full py-2 font-bold text-center text-pink-500"
            >
              {token && user?.name}
            </Link>
            <Link
              href="#_"
              className="relative inline-block w-full px-5 py-3 text-sm leading-none text-center text-white bg-indigo-700 fold-bold"
            >
              Get Started
            </Link>
          </div>
        </nav>
        <div className="absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between">
          {token ? (
            <Link
              href="#_"
              className={`relative z-40 px-3 py-2 mr-0 text-sm font-bold text-pink-500 md:px-5 ${pathName === "/" ? 'lg:text-white ' : ""}sm:mr-3 md:mt-0`}
            >
              {user?.name}
            </Link>
          ) : (
            <Link
              href={"/login"}
              className={`relative z-40 px-3 py-2 mr-0 text-sm font-bold text-pink-500 md:px-5 ${pathName === "/" ? 'lg:text-white ' : ""}sm:mr-3 md:mt-0`}
            >
              Login
            </Link>
          )}

          {token ? (
            <Link
              href={"/my-courses"}
              onClick={handleLogout}
              className={`relative z-40 inline-block w-auto h-full px-5 py-3 text-sm font-bold leading-none text-white transition-all transition duration-100 duration-300 bg-indigo-700 rounded shadow-md fold-bold ${pathName === "/" ? 'lg:bg-white lg:text-indigo-700 ' : ""} sm:w-full lg:shadow-none hover:shadow-xl`}
            >
              My Courses
            </Link>
          ) : (
            <Link
              href={"/register"}
              className={`relative z-40 inline-block w-auto h-full px-5 py-3 text-sm font-bold leading-none text-white transition-all transition duration-100 duration-300 bg-indigo-700 rounded shadow-md fold-bold ${pathName === "/" ? 'lg:bg-white lg:text-indigo-700 ' : ""} sm:w-full lg:shadow-none hover:shadow-xl`}
            >
              Register
            </Link>
          )}

          {pathName === "/" && (
            <svg
              className="absolute top-0 left-0 hidden w-screen max-w-3xl -mt-64 -ml-12 lg:block home-design"
              viewBox="0 0 818 815"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="c">
                  <stop stopColor="#E614F2" offset="0%" />
                  <stop stopColor="#FC3832" offset="100%" />
                </linearGradient>
                <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="f">
                  <stop stopColor="#657DE9" offset="0%" />
                  <stop stopColor="#1C0FD7" offset="100%" />
                </linearGradient>
                <filter
                  x="-4.7%"
                  y="-3.3%"
                  width="109.3%"
                  height="109.3%"
                  filterUnits="objectBoundingBox"
                  id="a"
                >
                  <feOffset
                    dy={8}
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  />
                  <feGaussianBlur
                    stdDeviation={8}
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                  />
                  <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    in="shadowBlurOuter1"
                  />
                </filter>
                <filter
                  x="-4.7%"
                  y="-3.3%"
                  width="109.3%"
                  height="109.3%"
                  filterUnits="objectBoundingBox"
                  id="d"
                >
                  <feOffset
                    dy={8}
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  />
                  <feGaussianBlur
                    stdDeviation={8}
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                  />
                  <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                    in="shadowBlurOuter1"
                  />
                </filter>
                <path
                  d="M160.52 108.243h497.445c17.83 0 24.296 1.856 30.814 5.342 6.519 3.486 11.635 8.602 15.12 15.12 3.487 6.52 5.344 12.985 5.344 30.815v497.445c0 17.83-1.857 24.296-5.343 30.814-3.486 6.519-8.602 11.635-15.12 15.12-6.52 3.487-12.985 5.344-30.815 5.344H160.52c-17.83 0-24.296-1.857-30.814-5.343-6.519-3.486-11.635-8.602-15.12-15.12-3.487-6.52-5.343-12.985-5.343-30.815V159.52c0-17.83 1.856-24.296 5.342-30.814 3.486-6.519 8.602-11.635 15.12-15.12 6.52-3.487 12.985-5.343 30.815-5.343z"
                  id="b"
                />
                <path
                  d="M159.107 107.829H656.55c17.83 0 24.296 1.856 30.815 5.342 6.518 3.487 11.634 8.602 15.12 15.12 3.486 6.52 5.343 12.985 5.343 30.816V656.55c0 17.83-1.857 24.296-5.343 30.815-3.486 6.518-8.602 11.634-15.12 15.12-6.519 3.486-12.985 5.343-30.815 5.343H159.107c-17.83 0-24.297-1.857-30.815-5.343-6.519-3.486-11.634-8.602-15.12-15.12-3.487-6.519-5.343-12.985-5.343-30.815V159.107c0-17.83 1.856-24.297 5.342-30.815 3.487-6.519 8.602-11.634 15.12-15.12 6.52-3.487 12.985-5.343 30.816-5.343z"
                  id="e"
                />
              </defs>
              <g fill="none" fillRule="evenodd" opacity=".9">
                <g transform="rotate(65 416.452 409.167)">
                  <use fill="#000" filter="url(#a)" xlinkHref="#b" />
                  <use fill="url(#c)" xlinkHref="#b" />
                </g>
                <g transform="rotate(29 421.929 414.496)">
                  <use fill="#000" filter="url(#d)" xlinkHref="#e" />
                  <use fill="url(#f)" xlinkHref="#e" />
                </g>
              </g>
            </svg>
          )}
        </div>
        <div
          id="nav-mobile-btn"
          onClick={handleMobileNavToggle}
          className="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none md:hidden sm:mt-10"
        >
          <span className="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1" />
          <span className="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full" />
        </div>
      </div>
    </header>
  );
}

export default Header;
