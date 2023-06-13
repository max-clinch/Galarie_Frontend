import React from "react";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import Artwork from "./component/Artwork";
import Collections from "./component/Collections";
import HeroSection from "./component/HeroSection";

const LandingPage = () => {
  return (
    <div className="bg-[#0D0D1E]">
      <DashboardWrapper>
        <div data-aos="fade-right" data-aos-duration="3000">
          <HeroSection />
        </div>
        <div data-aos="zoom-out-up" data-aos-duration="3000" className="mx-20">
          <Collections />
          <Artwork />
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default LandingPage;
