import React from 'react';

const OrderSummary = () => {
  return (
    <div className="w-full mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
      {/* Product details and pricing */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4 cursor-pointer">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <img
            src="https://img.freepik.com/free-photo/simple-brick-wall-surface-texture_23-2151262438.jpg?t=st=1729591936~exp=1729595536~hmac=322cd8daa15a79d59d9bc7c5420261be94d814c2e24f2f0cedfc3c9b00b7fb30&w=1060"
            alt="Product"
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-md"
          />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold line-clamp-2">
              The fundamental building block The fundamental building block The fundamental building block
            </h3>
            <p className="text-gray-500 text-base sm:text-lg font-normal">Ultratech cement for construction</p>
            <p className="text-[#087a74] text-sm sm:text-base">Coupon applied ₹500/-</p>
          </div>
        </div>
        <div className="text-left sm:text-right mt-4 sm:mt-0 flex flex-col justify-center items-start sm:items-center md:items-end">
          <p className="text-lg sm:text-2xl font-semibold whitespace-nowrap">₹ 2000/-</p>
          <p className="text-gray-500 text-sm sm:text-base whitespace-nowrap">Quantity: 700 Sqft</p>
        </div>
      </div>

      {/* Return policy */}
      <div className="bg-[#F4F4F4] p-4 rounded-md mb-4 text-base sm:text-lg">
        <p className="text-gray-600 font-semibold">
          Return policy valid till <span>Today, Jul 12</span>
          <span className="text-[#B90647] ml-2 cursor-pointer">KNOW MORE</span>
        </p>
      </div>

      {/* Shipping details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Shipping address */}
        <div>
          <h4 className="font-semibold text-base sm:text-lg mb-2">Shipping address</h4>
          <p className="text-[#2E2E2E] text-sm sm:text-base">
            Abin krishnan S <br />
            7012198927 <br />
            Lal sadan <br />
            Parakkara <br />
            695524 ATHIYANNUR KL <br />
            India
          </p>
        </div>

        {/* Shipping method */}
        <div>
          <h4 className="font-semibold text-base sm:text-lg mb-2">Shipping method</h4>
          <p className="text-[#2E2E2E] text-sm sm:text-base">
            Cash on Delivery - Heavy Goods <br />
            Shipping 325 Rs <br />
            Shipping | Packing + 75 Rs <br />
            COD Charges
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
