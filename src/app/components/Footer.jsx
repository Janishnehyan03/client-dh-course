import React from "react";
import Logo from "@@/svg/logo.svg";
import Facebook from "@@/svg/fb.svg";
import YouTube from "@@/svg/yt.svg";
import Website from "@@/svg/web.svg";
import Link from "next/link";


function Footer() {
  return (
    <footer className="px-4 pt-12 pb-8 text-white bg-white border-t border-gray-200">
      <div className="container flex flex-col justify-between max-w-6xl px-4 mx-auto overflow-hidden lg:flex-row">
        <div className="w-full pl-12 mr-4 text-left lg:w-1/4 sm:text-center sm:pl-0 lg:text-left">
          <Link
            href="/"
            className="flex justify-start block text-left sm:text-center lg:text-left sm:justify-center lg:justify-start"
          >
            <span className="flex items-start sm:items-center">
              <Logo className="w-auto h-6 text-gray-800 fill-current" />
            </span>
          </Link>          <p className="mt-6 mr-4 text-base text-gray-500">
            Provied By{" "}
            <span className="font-semibold">
              Centre for Public Education and Training
            </span>
          </p>
        </div>
        <div className="block w-full pl-10 mt-6 text-sm lg:w-3/4 sm:flex lg:mt-0">
          <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
            <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
              Product
            </li>
            <li>
              <Link
                href="#_"
                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
              >
                Features
              </Link>            </li>
            <li>
              <Link
                href="#_"
                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
              >
                Integrations
              </Link>            </li>
            <li>
              <Link
                href="#_"
                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
              >
                Pricing
              </Link>            </li>
            <li>
              <Link
                href="#_"
                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
              >
                FAQ
              </Link>            </li>
          </ul>
          <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
            <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
              Company
            </li>
            <li>
              <Link
                href="#_"
                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
              >
                Privacy
              </Link>            </li>
            <li>
              <Link
                href="#_"
                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
              >
                Terms of Service
              </Link>            </li>
          </ul>
          <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
            <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
              TailwindCSS
            </li>
            <li>
              <Link
                href="https://devdojo.com/tailwindcss/components"
                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
              >
                Tailwind Components
              </Link>            </li>
            <li>
              <Link
                href="https://devdojo.com/tailwindcss/templates"
                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
              >
                Tailwind Templates
              </Link>            </li>
            <li>
              <Link
                href="https://devdojo.com/tails"
                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
              >
                Tails
              </Link>            </li>
          </ul>
          <div className="flex flex-col w-full text-gray-700">
            <div className="inline-block px-3 py-2 mt-5 font-bold text-gray-800 uppercase md:mt-0">
              Follow Us
            </div>
            <div className="flex justify-start pl-4 mt-2">
            <Link
                className="flex items-center block mr-5 text-gray-400 no-underline hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
                href="https://cpetdhiu.in/"
              >
                <Website className="w-6 h-6 fill-current" />
              </Link>              <Link
                className="flex items-center block mr-5 text-gray-400 no-underline hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/CPETDHIU/"
              >
                <Facebook className="w-6 h-6 fill-current" />
              </Link>              <Link
                className="flex items-center block text-gray-400 no-underline hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UCto85JBtWPDvcANGFfuENKg"
              >
                <YouTube className="w-6 h-6 fill-current" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 pt-6 mt-10 text-center text-gray-500 border-t border-gray-100">
        © 2023 CPET | All rights reserved.
      </div>
      <div className="pt-2 pt-4 mt-2 text-center text-gray-600 border-t border-gray-100">
        Devoloped By{" "}
        <Link href="https://digitiostack.co.in/" className="text-indigo-500 ">
          Digitio Stack
        </Link>      </div>
    </footer>
  );
}

export default Footer;
