"use client";
import React from "react";
import Head from "next/head";
// import CustomInput from "@/components/customInput/CustomTextField";
import CustomButton from "@/components/customButton/CustomButton";
import Image from "next/image";
const Checkout = () => {
  const products = [
    {
      title: "TATA Galvanised Gc Roofing Sheet",
      description: "Tata Tiscon",
      currentPrice: "₹62.00",
      image: "/images/home/cat2.webp",
      quantity: 1,
    },
    {
      title: "TATA Galvanised Gc Roofing Sheet",
      description: "Tata Tiscon",
      currentPrice: "₹62.00",
      image: "/images/home/cat1.webp",
      quantity: 1,
    },
    {
      title: "TATA Galvanised Gc Roofing Sheet",
      description: "Tata Tiscon",
      currentPrice: "₹62.00",
      image: "/images/home/cat3.webp",
      quantity: 1,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 py-8">
        <div className="bg-white min-h-screen flex flex-col items-center pb-12">
          <Head>
            <title>Order Confirmation</title>
          </Head>

          {/* Confirmation Icon and Title */}
          <div className="text-center">
            {/* Order Confirmation Section */}
            <div className="flex flex-col md:flex-row p-5 text-center justify-center items-center">
              <Image
                src="/images/checkout/Group.webp"
                alt="image"
                className="w-20 h-20"
                width={80}
                height={80}
                onError={e => {
                  e.currentTarget.src = '/images/product-placeholder.webp'
                }}
                loading="lazy"
              />
              <div className="mt-4 md:mt-0 md:ml-5">
                <h1 className="text-2xl md:text-4xl font-semibold text-[#B90647]">
                  Order Confirmed
                </h1>
              </div>
            </div>
            <p className="text-xs md:text-sm mt-2 font-semibold text-black">
              Order ID: #H00917725
            </p>
            <p className="mt-4 text-gray-700 text-xs md:text-base px-4 md:px-0">
              Thank you for choosing hubeco – your partner in sustainable
              building materials. We look forward to assisting you!
            </p>
          </div>

          {/* Customer Information Section */}
          <div className="mt-8 border border-gray-200 rounded-lg p-4 md:p-6 w-full max-w-4xl mx-auto">
            <h2 className="text-gray-500 text-xs md:text-sm font-semibold mb-4">
              Customer information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-xs md:text-sm">
              {/* Shipping Address */}
              <div className="text-gray-700">
                <h3 className="font-semibold mb-2">Shipping address</h3>
                <p>Abin Krishnan</p>
                <p>Lal Sadan</p>
                <p>Parakkara</p>
                <p>695524 Athiyannur KL</p>
                <p>India</p>
              </div>

              {/* Billing Address */}
              <div className="text-gray-700">
                <h3 className="font-semibold mb-2">Billing address</h3>
                <p>Abin Krishnan</p>
                <p>Lal Sadan</p>
                <p>Parakkara</p>
                <p>695524 Athiyannur KL</p>
                <p>India</p>
              </div>

              {/* Shipping Method */}
              <div className="text-gray-700">
                <h3 className="font-semibold mb-2">Shipping method</h3>
                <p>UPI Payment</p>
                <p>Heavy Goods Shipping 325 Rs</p>
                <p>Shipping</p>
              </div>
            </div>
          </div>

          {/* Shop More Button */}
          <div className="mt-8 flex justify-center">
            <CustomButton
              title={"Shop More"}
              className="bg-secondary hover:bg-primary h-10 w-32 md:w-48 text-xs md:text-md text-white"
              customStyles={{}}
            />
          </div>
        </div>
        {/* Right Column: Order Summary */}
        <div className="p-6 bg-[#F4F4F4] h-fit">
          <h2 className="text-lg font-semibold mb-4 text-black">Order Summary</h2>
          <div className="w-full">
            {products.map((product, index) => (
              <div className="flex w-full py-3" key={index}>
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover mr-4"
                  width={63.14}
                  height={64}
                  onError={e => {
                    e.currentTarget.src = '/images/product-placeholder.webp'
                  }}
                  loading="lazy"
                />
                <div className="w-full text-black">
                  <p className="font-semibold">{product.title}</p>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Quantity : 100 piece</p>
                    <p className="text-gray-500">{product.currentPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="py-7 px-2 text-black">
            <div className="flex justify-between mb-2">
              <p>Coupon</p>
              <p>₹400.00</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>₹4,394.00</p>
            </div>

            <div className="flex justify-between mb-2">
              <p>Shipping</p>
              <p className="text-gray-400">Enter shipping address</p>
            </div>

            <div className="flex justify-between mb-2">
              <p>GST</p>
              <p>₹404.00</p>
            </div>

            <div className="flex justify-between font-semibold text-lg mt-4">
              <p>Total</p>
              <p>₹4,394.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
