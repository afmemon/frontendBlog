import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import AuthGuard from "./auth-guard";

const Layout = ({ children }) => {
  return (
    <>
      <AuthGuard>
        <Header />
        {children}
        <Footer />
      </AuthGuard>
    </>
  );
};

export default Layout;
