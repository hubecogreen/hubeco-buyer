import React, { useState } from "react";
import styles from "./coupon.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

interface PincodePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponPopup: React.FC<PincodePopupProps> = ({ isOpen, onClose }) => {
  const [pincode, setPincode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleSubmit = () => {
    // // console.log("Pincode:", pincode);
    // // console.log("Selected Address:", selectedAddress);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className="bg-white pb-4 rounded-md w-fit p-5">
        <div className="border border-solid border-[1px] rounded-lg overflow-hidden relative">

          <AiFillCloseCircle
            className="hover:cursor-pointer flex"
            size={22}
            onClick={onClose}
            color="#aeaeae"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {/* Coupon Cards */}
          {[
            { discount: 15, code: "HOBHOMEDECOR5" },
            { discount: 25, code: "HOBHOMEDECOR5" },
            { discount: 50, code: "HOBHOMEDECOR5" },
            { discount: 35, code: "HOBHOMEDECOR5" },
            { discount: 15, code: "HOBHOMEDECOR5" },
            { discount: 15, code: "HOBHOMEDECOR5" },
          ].map((coupon, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full max-w-sm p-0 border border-gray-300 border-solid border-[1px] bg-white rounded-lg shadow-md overflow-hidden relative"

            >
              {/* Left Side: Discount */}
              <div
                className="flex flex-col items-center justify-center w-2/5 p-4 text-center relative border-r border-dashed border-gray-300 bg-[linear-gradient(to_right,_#f6f2ff,_#fff0f6)]"
              >
                <span className="text-sm font-bold text-purple-500">Flat</span>
                <span className="text-4xl font-bold text-purple-700">
                  {coupon.discount}% Off
                </span>
              </div>


              {/* Right Side: Coupon Details */}
              <div className="flex flex-col justify-between w-3/5 p-4 bg-white">
                <span className="text-xs font-bold text-gray-500">
                  COUPON NAME
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  #Coupon Code
                </span>
                <span className="text-sm text-gray-800">
                  Code: {coupon.code}
                </span>
                <span className="text-xs text-gray-500">
                  Expiry: 31 Dec 2024{" "}
                  <span className="text-red-600 font-bold">*T&C</span>
                </span>
              </div>
              <div
                className="absolute top-1/2 left-0 h-0.5 w-full bg-dashed bg-gray-300"
              // style={{ borderBottom: "1px dashed #ccc" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponPopup;
