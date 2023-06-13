import React, { useState, useRef } from "react";
import { ReactComponent as Dnd } from "../../assets/svg/dnd.svg";
import { ToastNotify } from "../reusables/helpers/ToastNotify";

const DragDrop = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    // Handle the dropped file here
    setSelectedFile(file);
    onFileSelect(file); // Call the callback function with the selected file
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1048576) {
      // File size exceeds 1MB
      ToastNotify({
        type: "warning",
        message: "File size exceeds the maximum limit of 1MB.",
        position: "top-right",
      });

      setSelectedFile(null);
      return;
    }
    // Handle the uploaded file here
    setSelectedFile(file);
    onFileSelect(file); // Call the callback function with the selected file
  };

  const handleRemove = () => {
    setSelectedFile(null);
    onFileSelect(null); // Call the callback function with null to indicate removal of the file
  };

  return (
    <div
      className={`font-verdana relative flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-lg ${
        isDragging ? "border-blue-500" : "border-white"
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e)}
    >
      {selectedFile ? (
        <div className="text-center text-lg text-white">
          <p>File selected: {selectedFile.name}</p>
          <button
            className="mt-4 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            onClick={handleRemove}
          >
            Remove File
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Dnd />
          </div>
          <div className="text-lg text-white">
            Drop or{" "}
            <span
              className="text-[#FDD01E] cursor-pointer"
              onClick={handleUpload}
            >
              Choose file
            </span>{" "}
            to Upload
          </div>
          <div className="text-md text-white text-opacity-50">
            JPG, PNG, GIF, MP4, WEBM, MP3, WAV, GLB, GLTF. <br /> Max size: 100
            MB
          </div>
          <input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default DragDrop;
