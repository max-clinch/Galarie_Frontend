import React, { useEffect, useState } from "react";
import { CustomButton } from "../../../components/buttons/CustomButton";
import { marketPlaceABI, tokenABI } from "../../../constant/constants";
import nft1 from "../../../assets/img/nft1.png";
import Web3 from "web3";
import PageLoader from "../../../components/PageLoader";
import useToggle from "../../../utils/hooks/useToggle";
import { ToastNotify } from "../../../components/reusables/helpers/ToastNotify";

const Menu = () => {
  const [loading, toggleLoading] = useToggle();
  const [tokenURI, setTokenURI] = useState("");
  const web3 = new Web3(window.ethereum);

  const tokenID = 3;

  const nftMarketPlaceABI = marketPlaceABI.abi;
  const tokenPlaceABI = tokenABI.abi;

  const nftMarketContractAddress = "0xa93C5b64B177EFCd6Ca47E65F6B6397bB03a06db";
  const tokenContractAddress = "0x350792765fFE42fE4874C0191F9308A4fB7ecf47";

  const marketContract = new web3.eth.Contract(
    nftMarketPlaceABI,
    nftMarketContractAddress
  );

  const tokenContract = new web3.eth.Contract(
    tokenPlaceABI,
    tokenContractAddress
  );

  const getNft = async () => {
    try {
      const uri = await tokenContract.methods.tokenURI(tokenID).call();
      setTokenURI(uri);
      console.log("Token URI:", uri);
      // Do something with the URI, such as displaying the NFT image or details
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const putItemForSale = async (tokenId, price) => {
    toggleLoading();
    try {
      const result = await marketContract.methods
        .putItemForSale(tokenId, price)
        .send({ from: localStorage?.getItem("Address") });
      toggleLoading();
      ToastNotify({
        type: "success",
        message: "NFT pitched Successfully",
        position: "top-right",
      });
      console.log("Item for sale with token ID:", result);
    } catch (error) {
      toggleLoading();
      ToastNotify({
        type: "error",
        message: "An error occured, try again",
        position: "top-right",
      });
      console.error("Error:", error);
    }
  };

  const getItemsForSale = async () => {
    try {
      const result = await marketContract.methods.itemsForSale().call();
      console.log("Items for sale:", result);
      // Process and display the retrieved items for sale as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getNft();
    getItemsForSale();
  }, []);

  const data = [
    {
      name: "Bala Blu",
      img: tokenURI,
      items: "1",
      flrprice: 0.0,
    },
  ];

  const [menu, setMenu] = useState("Owned");
  return (
    <div>
      {loading && <PageLoader message="Putting item for sale" />}
      <div className="text-white opacity-[60%] flex gap-10 font-verdana mt-40">
        <div
          onClick={() => setMenu("Owned")}
          className={`${
            menu === "Owned" && "border-b-4  border-[#3734D1]"
          } cursor-pointer`}
        >
          Owned
        </div>
        <div
          onClick={() => setMenu("Created")}
          className={`${
            menu === "Created" && "border-b-4  border-[#3734D1]"
          } cursor-pointer`}
        >
          Created
        </div>
        <div
          onClick={() => setMenu("Collection")}
          className={`${
            menu === "Collection" && "border-b-4  border-[#3734D1]"
          } cursor-pointer`}
        >
          Collection
        </div>
        <div
          onClick={() => setMenu("Activity")}
          className={`${
            menu === "Activity" && "border-b-4  border-[#3734D1]"
          } cursor-pointer`}
        >
          Activity
        </div>
        <div
          onClick={() => setMenu("On Sale")}
          className={`${
            menu === "On Sale" && "border-b-4  border-[#3734D1]"
          } cursor-pointer`}
        >
          On Sale
        </div>
        <div className="cursor-pointer">More</div>
      </div>
      <div className="mt-3 mb-5 opacity-[15%]">
        <hr />
      </div>
      <div className="mt-10 font-verdana w-full flex justify-between">
        <div className="flex justify-between gap-10">
          <CustomButton labelText="All" buttonVariant="primary" />
          <CustomButton labelText="Art" buttonVariant="secondary" />
          <CustomButton labelText="Photography" buttonVariant="secondary" />
          <CustomButton labelText="Music" buttonVariant="secondary" />
          <CustomButton labelText="Sport" buttonVariant="secondary" />
          <CustomButton labelText="Gaming" buttonVariant="secondary" />
        </div>
        <div>
          <CustomButton labelText="Recently Listed" buttonVariant="secondary" />
        </div>
      </div>

      <div className="p-5 rounded-3xl border border-white border-opacity-[15%] mt-10">
        {menu === "Owned" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
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
                  <img className="w-full" src={x?.img} alt="" />
                  <div className="flex text-white items-center justify-between mt-5">
                    <div className="text-sm">
                      <div>{x?.name}</div>
                      <div className="text-xs font-light text-opacity-[15%] mt-2 font-verdana">
                        IdanMoves
                      </div>
                    </div>
                    <div onClick={() => putItemForSale(tokenID, x?.flrprice)}>
                      <CustomButton
                        labelText="Put on Sale"
                        buttonVariant="primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {menu === "On Sale" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
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
                  <img className="w-full" src={x?.img} alt="" />
                  <div className="flex text-white items-center justify-between mt-5">
                    <div className="text-sm">
                      <div>{x?.name}</div>
                      <div className="text-xs font-light text-opacity-[15%] mt-2 font-verdana">
                        IdanMoves
                      </div>
                    </div>
                    <div className="text-xl text-[#FDD01E]">{x?.flrprice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
