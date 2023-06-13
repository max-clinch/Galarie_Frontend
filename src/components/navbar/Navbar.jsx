import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CustomButton } from "../buttons/CustomButton";
import { ReactComponent as Avatar } from "../../assets/svg/avatar.svg";
import Meta from "../../assets/img/meta.png";
import WC from "../../assets/img/wc.png";
import Coinbase from "../../assets/img/coinbase.png";
import Phantom from "../../assets/img/phantom.png";
import useToggle from "../../utils/hooks/useToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [centerModal, toggleCenterModal] = useToggle();
  const [selectedAccount, setSelectedAccount] = useState("");
  const [networkName, setNetworkName] = useState("");

  const isWeb3Available = () => {
    return Boolean(window.ethereum);
  };

  useEffect(() => {
    if (localStorage.getItem("Address") !== "") {
      setSelectedAccount(localStorage.getItem("Address"));
    }
  }, []);

  const connectWithMetaMask = () => {
    if (isWeb3Available()) {
      // Check if MetaMask is the selected wallet
      if (window.ethereum.isMetaMask) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            // Handle successful connection
            // Store the selected account address for future use
            const selectedWalletAccount = accounts[0];
            setSelectedAccount(selectedWalletAccount);
            localStorage.setItem("Address", selectedWalletAccount);
          })
          .catch((error) => {
            // Handle connection error
            console.error("MetaMask connection error:", error);
          });
      } else {
        // MetaMask not detected
        console.error("MetaMask not detected.");
      }
    } else {
      // Web3 provider not available
      console.error("Web3 provider not found.");
    }
  };

  const connectWithCoinbaseWallet = () => {
    if (isWeb3Available()) {
      // Check if Coinbase Wallet is the selected wallet
      if (window.ethereum.isCoinbaseWallet) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            // Handle successful connection
            // Store the selected account address for future use
            const selectedWalletAccount = accounts[0];
            setSelectedAccount(selectedWalletAccount);
          })
          .catch((error) => {
            // Handle connection error
            console.error("Coinbase Wallet connection error:", error);
          });
      } else {
        // Coinbase Wallet not detected
        console.error("Coinbase Wallet not detected.");
      }
    } else {
      // Web3 provider not available
      console.error("Web3 provider not found.");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleConnectWallet = () => {
    // Implement your logic for connecting the wallet here
    console.log("Connecting wallet...");
  };

  // to hide characters
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
    <>
      <div className="flex flex-wrap justify-between mx-2 sm:mx-6 md:mx-20 items-center">
        <div
          onClick={() => navigate("/")}
          className="font-orbitron cursor-pointer text-2xl text-white font-bold"
        >
          Galarie
        </div>
        <div className="w-full sm:w-auto mt-3 sm:mt-0">
          <input
            type="text"
            placeholder="Search NFTs, collections or users"
            className="border rounded font-inter placeholder-white bg-[#ffffff] opacity-10 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
            style={{ "::placeholder": { opacity: "0.1" } }}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e)}
          />
        </div>

        {/* Hamburger menu */}
        <input
          type="checkbox"
          className="hidden"
          id="menu-toggle"
          checked={menuOpen}
          onChange={toggleMenu}
        />
        <label
          htmlFor="menu-toggle"
          className="cursor-pointer sm:hidden bg-transparent p-2"
        >
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>

        {/* nav links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } sm:flex font-orbitron text-white text-sm text-nav-item-inactive items-center gap-5 transition-all`}
        >
          <div>
            <NavLink to={"/"} onClick={toggleMenu}>
              Learn
            </NavLink>
          </div>
          <div>
            <NavLink to={"/"} onClick={toggleMenu}>
              Sell
            </NavLink>
          </div>
          <div>
            <NavLink to={"/market"} onClick={toggleMenu}>
              Marketplace
            </NavLink>
          </div>
          <div>
            <NavLink to={"/"} onClick={toggleMenu}>
              💡
            </NavLink>
          </div>
          {selectedAccount ? (
            <div className="p-3 border border-white rounded-xl sm:hidden font-verdana">
              💼 {hideCharacters(selectedAccount)}
            </div>
          ) : (
            <div className="sm:hidden" onClick={() => toggleCenterModal()}>
              <CustomButton
                labelText="Connect Wallet"
                buttonVariant="primary"
                onClick={handleConnectWallet}
              />
            </div>
          )}
        </div>

        <div className="font-orbitron text-white hidden sm:block">
          {selectedAccount ? (
            <div className="flex items-center gap-4">
              <div className="p-3 border border-white rounded-xl font-verdana">
                💼 {hideCharacters(selectedAccount)}
              </div>
              <div
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                <Avatar />
              </div>
            </div>
          ) : (
            <div onClick={() => toggleCenterModal()}>
              <CustomButton
                labelText="Connect Wallet"
                buttonVariant="primary"
                onClick={handleConnectWallet}
              />
            </div>
          )}
        </div>
      </div>

      {centerModal && (
        <div
          onClick={toggleCenterModal}
          className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black/80 p-5 z-50 overflow-scroll backdrop-filter backdrop-blur-sm"
        >
          <center className="flex justify-center items-center w-full">
            <div
              className="h-auto w-auto bg-[#14142C] text-white font-orbitron fixed border z-5000 rounded-3xl py-2 overflow-y-auto"
              style={{ maxHeight: "80vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-6 my-4">
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-semibold text-left text-alat-im-black">
                    Connect your wallet
                  </p>
                  <div
                    className="cursor-pointer text-xl"
                    onClick={toggleCenterModal}
                  >
                    X
                  </div>
                </div>
                <p className="text-sm font-normal font-verdana mt-3 text-left pt-0.5 text-nav-item-inactive">
                  Select your wallet from the options to get started.
                </p>
                <div className="mt-6 py-2 text-center flex gap-5 font-verdana justify-between">
                  <div
                    onClick={connectWithMetaMask}
                    className="bg-[#0D0D1E] flex flex-col items-center gap-3 border rounded-xl cursor-pointer border-white border-opacity-[15%] p-6 w-32"
                  >
                    <div>
                      <img src={Meta} alt="" />
                    </div>
                    <div>Metamask</div>
                  </div>
                  <div className="bg-[#0D0D1E] flex flex-col items-center gap-3 border rounded-xl cursor-pointer border-white border-opacity-[15%] p-6 w-32">
                    <div>
                      <img src={WC} alt="" />
                    </div>
                    <div>Wallet Connect</div>
                  </div>
                  <div
                    onClick={connectWithCoinbaseWallet}
                    className="bg-[#0D0D1E] flex flex-col items-center gap-3 border rounded-xl cursor-pointer border-white border-opacity-[15%] p-6 w-32"
                  >
                    <div>
                      <img src={Coinbase} alt="" />
                    </div>
                    <div>Coinbase Wallet</div>
                  </div>
                  <div
                    onClick={connectWithMetaMask}
                    className="bg-[#0D0D1E] flex flex-col items-center gap-3 border rounded-xl cursor-pointer border-white border-opacity-[15%] p-6 w-32"
                  >
                    <div>
                      <img src={Phantom} alt="" />
                    </div>
                    <div>Phantom</div>
                  </div>
                </div>
              </div>
              {/* <div className="px-4 py-2"></div> */}
            </div>
          </center>
        </div>
      )}
    </>
  );
};

export default Navbar;
