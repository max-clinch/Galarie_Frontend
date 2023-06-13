import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateNft from "../view/CreateNFT/CreateNft";
import LandingPage from "../view/LandingPage/LandingPage";
import MarketPlace from "../view/MarketPlace/MarketPlace";
import Profile from "../view/Profile/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/market" element={<MarketPlace />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createnft" element={<CreateNft />} />
    </Routes>
  );
};

export default AppRoutes;
