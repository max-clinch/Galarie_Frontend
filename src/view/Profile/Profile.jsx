import React from "react";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import Header from "./components/Header";
import Menu from "./components/Menu";

const Profile = () => {
  return (
    <div className="bg-[#0D0D1E]">
      <DashboardWrapper>
        <div data-aos="zoom-out" data-aos-duration="2000" className="mt-20 mx-20">
          <Header />
          <Menu />
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default Profile;
