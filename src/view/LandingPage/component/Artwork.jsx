import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img from "../../../assets/img/nft1.png";
import img2 from "../../../assets/img/nft2.png";
import img3 from "../../../assets/img/nft3.png";
import img4 from "../../../assets/img/nft4.png";
import img5 from "../../../assets/img/nft5.png";
import { CustomButton } from "../../../components/buttons/CustomButton";

const data = [
  {
    name: "Bala Blu",
    img: img,
    items: "43,209",
    flrprice: "0.02ETH",
  },
  {
    name: "Bala Blu",
    img: img2,
    items: "43,209",
    flrprice: "0.02ETH",
  },
  {
    name: "Bala Blu",
    img: img4,
    items: "43,209",
    flrprice: "0.02ETH",
  },
  {
    name: "Bala Blu",
    img: img5,
    items: "43,209",
    flrprice: "0.02ETH",
  },
  {
    name: "Bala Blu",
    img: img3,
    items: "43,209",
    flrprice: "0.02ETH",
  },
];

const Artwork = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
      <div className="flex justify-between items-center mt-20 font-orbitron text-white">
        <div className=" font-semibold text-3xl">Top Artworks</div>
        <div>
          <CustomButton labelText="See More" buttonVariant="secondary" />
        </div>
      </div>
      <Slider {...settings}>
        {data?.map((x, index) => (
          <div
            key={index}
            className="font-orbitron mx-auto items-center grid grid-cols-1 md:grid-cols-3 gap-5 mt-10"
          >
            <div
              style={{
                display: "inline-block",
                boxSizing: "border-box",
                borderRadius: "15px",
                backdropFilter: "blur(15px)",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                background:
                  "linear-gradient(93.17deg, #2A2252 0.92%, #070711 100%), linear-gradient(93.17deg, #2C2455 0.92%, #ACA2EB 100%), linear-gradient(0deg, rgba(114, 91, 218, 0.1), rgba(114, 91, 218, 0.1))",
                border: "1px solid white",
                borderImageSource:
                  "linear-gradient(93.17deg, #2C2455 0.92%, #ACA2EB 100%), linear-gradient(93.17deg, #2A2252 0.92%, #070711 100%)",
              }}
              className="px-3 py-5 w-[90%]"
            >
              <img className="w-full" src={x?.img} alt="" />
              <div className="flex text-white items-center justify-between mt-5">
                <div className="text-sm">{x?.name}</div>
                <div>
                  <CustomButton labelText="Collect" buttonVariant="primary" />
                </div>
              </div>
              <div className="flex text-white items-center justify-between mt-5">
                <div>
                  <div className="text-xs">Items</div>
                  <div className="text-xl">{x?.items}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs">Floor Price</div>
                  <div className="text-xl text-[#FDD01E]">{x?.flrprice}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Artwork;
