import React from "react";
import { CustomButton } from "../../components/buttons/CustomButton";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import Web3 from "web3";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import { marketPlaceABI, tokenABI } from "../../constant/constants";
import useToggle from "../../utils/hooks/useToggle";
import PageLoader from "../../components/PageLoader";

const data = [
  {
    name: "Tink Blu",
    img: "https://i.ibb.co/CBt4gWN/nft8.png",
    items: "43,209",
    flrprice: "0.00ETH",
  },
  {
    name: "Bala",
    img: "https://i.ibb.co/c3fHDLK/nft2.png",
    items: "43,209",
    flrprice: "0.00ETH",
  },
  {
    name: "Bala Blu",
    img: "https://i.ibb.co/xXN6dnQ/nft7.png",
    items: "43,209",
    flrprice: "0.00ETH",
  },
  {
    name: "Bala Blu",
    img: "https://i.ibb.co/NrKSFT1/nft6.png",
    items: "43,209",
    flrprice: "0.00ETH",
  },
];

const MarketPlace = () => {
  const web3 = new Web3(window.ethereum);

  const [loading, toggleLoading] = useToggle();

  const nftMarketPlaceABI = marketPlaceABI.abi;
  const tokenPlaceABI = tokenABI.abi;

  const nftMarketContractAddress = process.env.ART_MARKET_PLACE_CONTRACT;
  const tokenContractAddress = "0x350792765fFE42fE4874C0191F9308A4fB7ecf47";

  const marketContract = new web3.eth.Contract(
    nftMarketPlaceABI,
    nftMarketContractAddress
  );

  const tokenContract = new web3.eth.Contract(
    tokenPlaceABI,
    tokenContractAddress
  );

  const mintToken = async (uri) => {
    toggleLoading();
    console.log(localStorage?.getItem("Address"));
    try {
      // Call the 'mint' method on the contract
      const result = await tokenContract.methods
        .mint(uri)
        .send({ from: localStorage?.getItem("Address") }); // Replace with your address
      toggleLoading();
      ToastNotify({
        type: "success",
        message: "NFT Created Successfully",
        position: "top-right",
      });
      console.log("Token ID:", result);
    } catch (error) {
      toggleLoading();
      console.error("Error:", error);
      ToastNotify({
        type: "error",
        message: "An error occured, try again",
        position: "top-right",
      });
    }
  };

  const getNft = async () => {
    try {
      const uri = await tokenContract.methods.tokenURI(1).call();
      console.log("Token URI:", uri);
      // Do something with the URI, such as displaying the NFT image or details
    } catch (error) {
      console.error("Error:", error);
    }
  };

  getNft();

  return (
    <div className="bg-[#0D0D1E] font-orbitron">
      {loading && <PageLoader message="Minting" />}
      <DashboardWrapper>
        <div className="mt-20 mx-20">
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            className="text-3xl font-semibold text-white text-center"
          >
            Browse Marketplace
          </div>
          <div className="mt-10 font-verdana w-full flex justify-between">
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="flex justify-between gap-10"
            >
              <CustomButton labelText="All" buttonVariant="primary" />
              <CustomButton labelText="Art" buttonVariant="secondary" />
              <CustomButton labelText="Photography" buttonVariant="secondary" />
              <CustomButton labelText="Music" buttonVariant="secondary" />
              <CustomButton labelText="Sport" buttonVariant="secondary" />
              <CustomButton labelText="Gaming" buttonVariant="secondary" />
            </div>
            <div data-aos="fade-left" data-aos-duration="2000">
              <CustomButton
                labelText="Recently Listed"
                buttonVariant="secondary"
              />
            </div>
          </div>
          <div data-aos="zoom-out-up" data-aos-duration="2000">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
              {data?.map((x, index) => (
                <div key={index} className="font-orbitron">
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
                    <img className="w-full" src={`${x?.img}`} alt="" />
                    <div className="flex text-white items-center justify-between mt-5">
                      <div className="text-sm">{x?.name}</div>
                      <div onClick={() => mintToken(x?.img)}>
                        <CustomButton
                          labelText="Collect"
                          buttonVariant="primary"
                        />
                      </div>
                    </div>
                    <div className="flex text-white items-center justify-between mt-5">
                      <div>
                        <div className="text-xs">Items</div>
                        <div className="text-xl">{x?.items}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs">Floor Price</div>
                        <div className="text-xl text-[#FDD01E]">
                          {x?.flrprice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default MarketPlace;
