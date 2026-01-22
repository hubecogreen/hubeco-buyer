'use client';
import React, { useEffect, useState } from "react";
import styles from "./PincodePopup.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
// import CustomInput from "../customInput/CustomTextField";
// import CustomButton from "../customButton/CustomButton";
import { setCookie, getCookie } from "cookies-next";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface PincodePopupProps {
  isOpen: boolean;
  onClose: () => void;

}

const PincodePopup: React.FC<PincodePopupProps> = ({ isOpen, onClose }) => {
  const [pincode, setPincode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const buyerInfo = sessionStorage.getItem("buyerUserInfo") as any;
  const addresses = JSON.parse(buyerInfo)?.addresses;
  const router=useRouter()



  // Function to handle selecting an address and storing it in the cookie
  const handleAddressSelect = (address: string) => {
   // // console.log('AddressSha',address)
    setSelectedAddress(address);
    setCookie("selectedPincode", address); // Store in cookie
    if(window){
      // window.
      const event = new CustomEvent('selectedAddress', { detail: address });
      window.dispatchEvent(event);
    }
    onClose();
  };

  // Handle form submission for entering a pincode manually
  const handleSubmit = () => {
   // // console.log("Pincode:", pincode);
   // // console.log("Selected Address:", selectedAddress);
    onClose();
  };

  const getDefaultLoc=()=>{
    // console.log(addresses,"addresses")
    if(addresses && addresses.length>0){
      addresses.forEach((addy:any) => {
       if(addy.isDefault==true){
         setSelectedAddress(addy?.address)
       }
      });
    }
 }

 const onClickAdd=()=>{
  router.push('/profile?tab=address')
  onClose()
 }

  // When the popup is opened, get the stored address from the cookie
  useEffect(() => {
    if (isOpen) {
      const storedAddress = getCookie("selectedPincode");
      if (storedAddress) {
        // console.log("addresses", isOpen,  JSON.parse(storedAddress)?.id,addresses);

        setSelectedAddress(storedAddress); // Automatically select the stored address
      }else{
        getDefaultLoc()
      }
      
    }
  }, [isOpen]);
  


  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className="bg-white pb-4 rounded-md w-96 z-50">
      <div className="flex h-12 px-4 items-center justify-between border-b border-[#f0f0f0]">

          <h2 className="text-brown font-medium text-base">Choose your location</h2>
          <AiFillCloseCircle
            className="hover:cursor-pointer"
            size={22}
            onClick={onClose}
            color="#aeaeae"
          />
        </div>

        <p className="text-brown px-4 font-normal text-xs mt-4">
          Select a delivery location to see product availability and delivery options
        </p>
        {
          addresses && addresses.length>0 ?<>
 <div className="px-4 mt-4">
          {/* <RadioGroup   > */}
            {addresses && addresses.map((address: any) => 
            {
              let checky='';
              
              if(selectedAddress && typeof (selectedAddress) == 'string' && JSON.parse(selectedAddress)?.id!==undefined){
                const setAddress=JSON.parse(selectedAddress)
                if(setAddress?.id===address?.id){
                  checky='true';
                }else{
                  checky='false';
                }
              }else{
                checky='false';
              }

              
              
              return(
              <div key={address.id} className={styles.radioContainer}>
                <Checkbox
                  value={address.value}
                  id={`address-${address.id}`}
                  className={styles.radioInput}
                 checked={checky==='true'?true:false}
                  onClick={() => handleAddressSelect(address)}
                  
                />
                <label
                  htmlFor={`address-${address.id}`}
                  className={styles.radioLabel}
                >
                  {`${address?.address.includes("|") ? address?.address.replace("|",', ') : address?.address}, ${address?.city}, ${address?.state}, ${address?.postCode}`}
                </label>
              </div>
            )}
            )}
          {/* </RadioGroup> */}
        </div>
          </>:<>
          <div className="flex justify-center items-center flex-col mt-4">
          {/* <p className="text-brown px-4 font-normal text-xs my-4">
          No address found
        </p> */}
        <Button variant={'outline'} onClick={onClickAdd} className="border-secondary rounded mb-4 text-secondary hover:text-secondary hover:bg-white">
          Add Address
        </Button>
        </div>
          </>
        }

       

        {/* <div className="flex h-8 px-4 items-center justify-between w-full mt-5">
          <CustomInput
            placeholder="Enter Pincode"
            onChange={(e: any) => setPincode(e.target.value)}
            customStyles={{
              border: "1px solid #BCBCBC",
              color: "#333",
              width: "95%",
            }}
            extraClassnames="w-full h-8 text-xs rounded-sm"
          />
          <CustomButton
            title={"Apply"}
            className="text-white bg-secondary font-normal h-8 md:h-8 md:w-44 w-30 md:text-md text-xs hover:bg-primary"
            onPress={handleSubmit}
          />
        </div> */}
      </div>
    </div>
  );
};

export default PincodePopup;
