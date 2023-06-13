import React, { useState } from "react";
import DashboardWrapper from "../../components/layout/DashboardWrapper";
import SelectField from "../../components/reusables/SelectField";
import DragDrop from "../../components/DnD/DragDrop";
import { TextInput } from "../../components/reusables/TextInput";
import { useFormik } from "formik";
import { CustomButton } from "../../components/buttons/CustomButton";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import useToggle from "../../utils/hooks/useToggle";
import Web3 from "web3";
import { marketPlaceABI, tokenABI } from "../../constant/constants";
import PageLoader from "../../components/PageLoader";

const CreateNft = () => {
  const [file, setFile] = useState(null);

  const web3 = new Web3(window.ethereum);

  const [loading, toggleLoading] = useToggle();

  const nftMarketPlaceABI = marketPlaceABI.abi;
  const tokenPlaceABI = tokenABI.abi;

  const tokenContractAddress = "0x350792765fFE42fE4874C0191F9308A4fB7ecf47";

  const tokenContract = new web3.eth.Contract(
    tokenPlaceABI,
    tokenContractAddress
  );

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  function convertBase64ToURL(base64String) {
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: "image/png" });
    const url = URL.createObjectURL(blob);
    return url;
  }

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

  const handleCreate = async () => {
    const base64String = await fileToBase64(file);
    const imgUrl = convertBase64ToURL(base64String);
    mintToken(imgUrl);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
    },
  });

  const { handleBlur, handleChange, values } = formik;

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    // Perform any actions with the selected file
  };
  return (
    <div className="bg-[#0D0D1E]  text-white font-orbitron">
      {loading && <PageLoader message={"Creating"} />}
      <DashboardWrapper>
        <div className="flex  justify-center items-center h-screen">
          <div data-aos="zoom-out-left" data-aos-duration="2000" className="p-10 w-6/12 space-y-5 border mt-20 border-white border-opacity-[15%] rounded-3xl mx-20">
            <div
              data-aos="zoom-out-up"
              data-aos-duration="2000"
              className="text-3xl font-semibold"
            >
              Create NFT
            </div>
            <div data-aos="zoom-out-down" data-aos-duration="2000">
              <DragDrop onFileSelect={handleFileSelect} />
            </div>
            <div data-aos="zoom-out-down" data-aos-duration="2000">
              <TextInput
                label="Name"
                type="text"
                name="name"
                placeHolder="e.g Idan moves"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values?.name}
              />
            </div>
            <div data-aos="zoom-out-up" data-aos-duration="2000">
              <TextInput
                label="Description (Optional)"
                type="text"
                name="desc"
                placeHolder="e.g Idan moves"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values?.desc}
              />
            </div>
            <div data-aos="zoom-out-right" data-aos-duration="2000" onClick={() => handleCreate()}>
              <CustomButton labelText="Create" buttonVariant="primary" />
            </div>
          </div>
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default CreateNft;
