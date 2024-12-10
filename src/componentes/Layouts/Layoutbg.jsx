import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="bg-light"><h1></h1>
        <Outlet />
        <Footer />
        </div>
    )
}

export default Layout;