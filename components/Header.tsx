"use client";

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Form from "next/form";
import React from "react";
import Link from "next/link";
import { PackageIcon, SearchIcon, TrolleyIcon } from "@sanity/icons";

const Header = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <header className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between items-center px-4 py-2 sm:space-x-4">
      <div className="flex items-center space-x-4 w-[40%]">
        <Link href={"/"} className="font-bold text-xl text-blue-500">
          Shop
        </Link>
        <Form action="/search" className="w-full flex">
          <SearchIcon className="w-10 h-10 rounded border border-white border-r-0 text-slate-300 font-bold" />
          <input
            type="text"
            name="query"
            placeholder="Search for Products"
            className="bg-gray-100 text-gray-800
px-4 py-2
rounded
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:ring-opacity-56
border
w-full text-center"
          />
        </Form>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <div
          className="relative flex justify-center sm:justify-start
sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          <Link
            className="flex items-center justify-center gap-2"
            href={"/basket"}
          >
            <TrolleyIcon className="w-6 h-6" />
            <span>My Basket</span>
          </Link>
        </div>
        <ClerkLoaded>
          {user && (
            <div
              className="flex-1 relative flex justify-center sm:justify-start
sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              <Link
                className="flex items-center justify-center gap-2"
                href={"/basket"}
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </div>
          )}

          {user ? (
            <div className="flex items-center space-x-2">
              <UserButton />
              <div className="hidden sm:block text-xs">
                <p className="text-gray-400">Welcome Back</p>
                <p className="font-bold">{user.fullName}!</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal" />
          )}
        </ClerkLoaded>
      </div>
    </header>
  );
};

export default Header;
