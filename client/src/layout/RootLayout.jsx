import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function RootLayout() {
  return (
    <div className="layout w-full min-h-full max-w-[1280px] mx-auto px-20">
      <Header />
      {/* <Navbar />  */}
      <main className="main w-full h-full ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}