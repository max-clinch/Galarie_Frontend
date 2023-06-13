import React from "react";
import avater from "../../../assets/img/avatar.png";
import { CustomButton } from "../../../components/buttons/CustomButton";

const Header = () => {
  const walletAddy = localStorage?.getItem("Address");
  function hideCharacters(str) {
    if (str.length <= 9) {
      return str; // Return the original string if it's 9 characters or less
    }

    const firstFive = str.slice(0, 5); // Get the first 5 characters
    const lastFour = str.slice(-4); // Get the last 4 characters

    const hiddenCharacters = "..."; // Hide the middle characters with asterisks

    return firstFive + hiddenCharacters + lastFour; // Concatenate the parts and return the result
  }
  return (
    <div>
      <div
        style={{
          background: "#14142C",
          border: "1px solid #81818E",
          borderRadius: "16px",
        }}
        className="relative h-[384px] w-full"
        data-aos="fade-up" data-aos-duration="2000"
      >
        <div
          style={{
            display: "inline-block",
            background: "#0D0D1E",
            border: "1px solid #81818E",
            borderRadius: "16px",
          }}
          className="relative px-5 py-10 ml-10 mt-20 z-10 "
          data-aos="fade-down" data-aos-duration="2000"
        >
          <div data-aos="fade-left" data-aos-duration="2000" className="flex justify-center">
            <img className="" src={avater} alt="" />
          </div>
          <div className="font-orbitron font-semibold text-white text-2xl text-center">
            Idan
          </div>
          <div className="text-white text-center flex justify-between">
            <div className="px-5 py-2 border-r">
              <div className="text-xl font-semibold">0</div>
              <div className="text-xs">Followers</div>
            </div>
            <div className="px-4 py-2">
              <div className="text-xl font-semibold">{hideCharacters(walletAddy)}</div>
              <div className="text-xs">Address</div>
            </div>
            <div className="px-4 py-2 border-l">
              <div className="text-xl font-semibold">0</div>
              <div className="text-xs">Following</div>
            </div>
          </div>
        </div>
        <div className="flex justify-end -mt-14 gap-5">
          <CustomButton labelText="Create" buttonVariant="secondary" />
          <CustomButton labelText="Sell" buttonVariant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default Header;
