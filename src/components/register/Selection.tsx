// components/CustomerTypeSelection.tsx

"use client";

import React from 'react';
import { Box } from "@chakra-ui/react";
import styles from './selection.module.css';
import Image from "next/image";
interface CustomerTypeSelectionProps {
  onSelect: (choice: string) => void;
}

const CustomerTypeSelection: React.FC<CustomerTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="container mx-auto py-10 ">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-5 mobile-sm:text-2xl">
          Welcome to <span className="text-teal-500">hubeco</span> 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-500">Select the Customer Type</p>
      </div>
      <div className="p-5 flex flex-col md:flex-row justify-center items-center md:gap-8">
        <div
          className="p-5 w-full md:w-2/5 mb-5 md:mb-0 mobile-sm:p-0"
          onClick={() => onSelect("B2C")}
        >
   
          <Box
            className="group shadow-card-shadow hover:hover-card-shadow border-solid bg-white   hover:bg-secondary border-secondary rounded-[35px]  px-10 py-5 md:px-20 md:py-10 cursor-pointer transition duration-300 ease-in-out hover:brightness-110"
            
          >
            <div className="flex justify-center mb-4">
            <Image
              className="w-12 h-12 group-hover:hidden"
              src="/images/register/b2c.svg"
              alt="B2B"
              width={48}
              height={48}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
/>
            <Image
              className="w-12 h-12 hidden group-hover:block"
              src="/images/register/b2c-white.svg"
              alt="B2B Hover"
              width={48}
              height={48}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
            />
            </div>
            <h1
              className={` text-xl md:text-4xl group-hover:text-white font-bold mb-4 text-black`}
            >
              B2C
            </h1>
            <p className='text-sm text-fontGray group-hover:text-white'>Businesses sell products or services directly to end-users.</p>
          </Box>
        </div>
        <div
          className="p-5 w-full md:w-2/5 mobile-sm:p-0"
          onClick={() => onSelect("B2B")}
        >
          <Box
            className="group shadow-card-shadow hover:hover-card-shadow  border-solid bg-white  border-secondary hover:bg-secondary  rounded-[35px] px-10 py-5 md:px-20 md:py-10 cursor-pointer transition duration-300 ease-in-out hover:brightness-110"
            
          >
            <div className="flex justify-center mb-4">
            <Image
              className="w-12 h-12 group-hover:hidden"
              src="/images/register/b2b.svg"
              alt="B2B"
              width={48}
              height={48}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
            />
            <Image
              className="w-12 h-12 hidden group-hover:block"
              src="/images/register/b2b-white.svg"
              alt="B2B Hover"
              width={48}
              height={48}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
            />
            </div>
            <h1
              className={` text-xl md:text-4xl group-hover:text-white font-bold mb-4 text-black`}
            >
              B2B
            </h1>
            <p className='text-sm group-hover:text-white text-fontGray'>One business sells products or services to another business.</p>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CustomerTypeSelection;
