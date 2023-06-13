import React from "react";
import { CustomButton } from "../../../components/buttons/CustomButton";
import hero from "../../../assets/img/hero.png";
import vector from "../../../assets/svg/vector-1.svg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-white mt-20 font-orbitron">
        <div className="text-6xl mx-20 text-center font-semibold">
          Empowering Artists,
          <br />
          Empowering You.
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="3000"
          className="text-center mx-20 text-lg mt-8"
        >
          Explore a Decentralized Marketplace Where Artists Thrive
          <br />
          and Art Lovers Connect
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="3000"
          className="flex justify-center mx-20 mt-10 gap-5"
        >
          <div onClick={() => navigate("/createNFT")}>
            <CustomButton labelText="Create Nfts" buttonVariant="primary" />
          </div>
          <div onClick={()=> navigate("/market")}>
            <CustomButton
              labelText="Explore Marketplace"
              buttonVariant="secondary"
            />
          </div>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-duration="3000"
          style={{
            backgroundImage: `url(${vector})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
          className="mt-10 h-auto w-full flex justify-center"
        >
          <img src={hero} alt="hero" className="" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
