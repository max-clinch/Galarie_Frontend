import React from "react";
import Navbar from "../navbar/Navbar";
import ReactSuspenceWrapper from "./ReactSuspenseWrapper";

const DashboardWrapper = ({ children }) => {
  return (
    <ReactSuspenceWrapper>
      <div className="min-h-screen w-full pb-20 overflow-scroll">
        <div className="mt-5  mx-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </ReactSuspenceWrapper>
  );
};

export default DashboardWrapper;
