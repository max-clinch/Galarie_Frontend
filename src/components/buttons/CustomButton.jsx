import Preloader from "../mics/Preloader";

export const CustomButton = ({
  labelText,
  variant = "font-medium ",
  containerVariant = "py-3 px-4 rounded-xl flex justify-center",
  buttonVariant = "primary",
  isDisabled = false,
  isLoading = false,
  icon,
}) => {
  return (
    <button
      type="submit"
      className={`${variant} shadow-md ${
        isDisabled
          ? `${
              buttonVariant === "primary" &&
              `bg-[#A9083680] text-[#E0B8C4] cursor-not-allowed py-3`
            } ${
              buttonVariant === "secondary" &&
              `border-[1.5px] border-[#E0B8C4] text-[#E0B8C4] cursor-not-allowed py-3`
            }`
          : `${
              buttonVariant === "primary" &&
              `bg-[#3734D1] hover:bg-[#2e2c9d] text-white py-3 cursor-pointer`
            } ${
              buttonVariant === "secondary" &&
              `border-[1.5px] border-[#ffffff] text-[#ffffff] py-3 cursor-pointer`
            }`
      } 
      ${containerVariant}`}
      disabled={isDisabled}
    >
      <div className="flex items-center">
        {icon?.active && (
          <div className={`${icon.variant}`}>{icon.preview}</div>
        )}
        {isLoading ? <Preloader variant="w-6 h-6" /> : labelText}
      </div>
    </button>
  );
};
