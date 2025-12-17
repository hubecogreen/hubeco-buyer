"use client";
import React, { useState, useCallback, useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Mock components for demo
interface CustomButtonProps {
  onPress: () => void;
  className: string;
  customStyles: React.CSSProperties;
  title: string;
  rightIcon: React.ReactNode;
}

const CustomButton = ({ onPress, className, customStyles, title, rightIcon }: CustomButtonProps) => (
  <button 
    onClick={onPress} 
    className={className}
    style={customStyles}
  >
    <span>{title}</span>
    {rightIcon}
  </button>
);

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  [key: string]: any;
}

const Image = ({ src, alt, width, height, className, ...props }: ImageProps) => (
  <img src={src} alt={alt} width={width} height={height} className={className} {...props} />
);

const WorksSection = () => {
  const [showBuyer, setShowBuyer] = useState(true);

  const handleBuyerClick = useCallback(() => {
    setShowBuyer(true);
  }, []);

  const handleVendorClick = useCallback(() => {
    setShowBuyer(false);
  }, []);

  const buyerContent = useMemo(
    () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-5 max-[768px]:grid-cols-2 max-[768px]:gap-3 max-[768px]:pt-5">
        {/* BOX 1 */}
        <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-primary hover:shadow-md transition h-[330px] w-[290px] max-[768px]:w-full max-[768px]:h-[180px] max-[768px]:px-3 max-[768px]:pt-5 max-[768px]:pb-3">
          <div className="flex flex-col gap-5 max-[768px]:gap-3">
            <Image src="/images/home/howitwork/search-icon.png" alt="search-icon" height={52} width={52} className="max-[768px]:w-8 max-[768px]:h-8"/>
            <h6 className="font-medium text-[22px] text-black max-[768px]:text-[14px] max-[768px]:leading-tight">Browse Products</h6>
            <p className="text-[18px] leading-6 text-lightGraytext max-[768px]:text-[11px] max-[768px]:leading-[1.3]">
              Filter products using material type, specifications, or browse organized product categories.
            </p>
          </div>
        </div>

        {/* BOX 2 */}
        <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-primary hover:shadow-md transition h-[330px] w-[290px] max-[768px]:w-full max-[768px]:h-[180px] max-[768px]:px-3 max-[768px]:pt-5 max-[768px]:pb-3">
          <div className="flex flex-col gap-5 max-[768px]:gap-3">
            <Image src="/images/home/howitwork/correct-icon.png" alt="correct-icon" height={52} width={52} className="max-[768px]:w-8 max-[768px]:h-8"/>
            <h6 className="font-medium text-[22px] text-black max-[768px]:text-[14px] max-[768px]:leading-tight">Request Quotations</h6>
            <p className="text-[18px] leading-6 text-lightGraytext max-[768px]:text-[11px] max-[768px]:leading-[1.3]">
              Select products and request competitive quotes from verified suppliers.
            </p>
          </div>
        </div>

        {/* BOX 3 */}
        <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-primary hover:shadow-md transition h-[330px] w-[290px] max-[768px]:w-full max-[768px]:h-[180px] max-[768px]:px-3 max-[768px]:pt-5 max-[768px]:pb-3">
          <div className="flex flex-col gap-5 max-[768px]:gap-3">
            <Image src="/images/home/howitwork/cart-icon.png" alt="cart-icon" height={52} width={52} className="max-[768px]:w-8 max-[768px]:h-8"/>
            <h6 className="font-medium text-[22px] text-black max-[768px]:text-[14px] max-[768px]:leading-tight">Procure & Track Impact</h6>
            <p className="text-[18px] leading-6 text-lightGraytext max-[768px]:text-[11px] max-[768px]:leading-[1.3]">
              Approve orders and monitor CO₂ emissions using sustainable materials.
            </p>
          </div>
        </div>

        {/* BOX 4 */}
        <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-primary hover:shadow-md transition h-[330px] w-[290px] max-[768px]:w-full max-[768px]:h-[180px] max-[768px]:px-3 max-[768px]:pt-5 max-[768px]:pb-3">
          <div className="flex flex-col gap-5 max-[768px]:gap-3">
            <Image src="/images/home/howitwork/recycle-icon.png" alt="recycle-icon" height={52} width={52} className="max-[768px]:w-8 max-[768px]:h-8"/>
            <h6 className="font-medium text-[22px] text-black max-[768px]:text-[14px] max-[768px]:leading-tight">Build Sustainably</h6>
            <p className="text-[18px] leading-6 text-lightGraytext max-[768px]:text-[11px] max-[768px]:leading-[1.3]">
              Build eco-friendly structures using our curated green materials.
            </p>
          </div>
        </div>
      </div>
    ),
    []
  );

  const vendorContent = useMemo(
    () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-5 max-[768px]:grid-cols-2 max-[768px]:gap-3 max-[768px]:pt-5">
        {/* BOX 1 */}
        <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-secondary hover:shadow-md transition h-[330px] w-[290px] max-[768px]:w-full max-[768px]:h-[180px] max-[768px]:px-3 max-[768px]:pt-5 max-[768px]:pb-3">
          <div className="flex flex-col gap-5 max-[768px]:gap-3">
            <Image src="/images/home/howitwork/user-icon.png" alt="registration" height={52} width={52} className="max-[768px]:w-8 max-[768px]:h-8"/>
            <h6 className="font-medium text-[22px] text-black max-[768px]:text-[14px] max-[768px]:leading-tight">Registration</h6>
            <p className="text-[18px] leading-6 text-lightGraytext max-[768px]:text-[11px] max-[768px]:leading-[1.3]">
              Sign up quickly with our simple registration process to become a vendor on our platform.
            </p>
          </div>
        </div>

        {/* BOX 2 */}
        <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-secondary hover:shadow-md transition h-[330px] w-[290px] max-[768px]:w-full max-[768px]:h-[180px] max-[768px]:px-3 max-[768px]:pt-5 max-[768px]:pb-3">
          <div className="flex flex-col gap-5 max-[768px]:gap-3">
            <Image src="/images/home/howitwork/cloud-icon.png" alt="upload-products" height={52} width={52} className="max-[768px]:w-8 max-[768px]:h-8"/>
            <h6 className="font-medium text-[22px] text-black max-[768px]:text-[14px] max-[768px]:leading-tight">Upload Products</h6>
            <p className="text-[18px] leading-6 text-lightGraytext max-[768px]:text-[11px] max-[768px]:leading-[1.3]">
              Easily list your products with detailed specifications, certifications, sustainability data, images and prices
            </p>
          </div>
        </div>

        {/* BOX 3 */}
        <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-secondary hover:shadow-md transition h-[330px] w-[290px] max-[768px]:w-full max-[768px]:h-[180px] max-[768px]:px-3 max-[768px]:pt-5 max-[768px]:pb-3">
          <div className="flex flex-col gap-5 max-[768px]:gap-3">
            <Image src="/images/home/howitwork/shop-icon.png" alt="start-selling" height={52} width={52} className="max-[768px]:w-8 max-[768px]:h-8"/>
            <h6 className="font-medium text-[22px] text-black max-[768px]:text-[14px] max-[768px]:leading-tight">Start Selling</h6>
            <p className="text-[18px] leading-6 text-lightGraytext max-[768px]:text-[11px] max-[768px]:leading-[1.3]">
              Reach a broad audience and receive quotation requests from active buyers.
            </p>
          </div>
        </div>

        {/* BOX 4 */}
        <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-secondary hover:shadow-md transition h-[330px] w-[290px] max-[768px]:w-full max-[768px]:h-[180px] max-[768px]:px-3 max-[768px]:pt-5 max-[768px]:pb-3">
          <div className="flex flex-col gap-5 max-[768px]:gap-3">
            <Image src="/images/home/howitwork/graph-icon.png" alt="monitor-sales" height={42} width={42} className="max-[768px]:w-8 max-[768px]:h-8"/>
            <h6 className="font-medium text-[22px] text-black max-[768px]:text-[14px] max-[768px]:leading-tight">Monitor Sales & Revenue</h6>
            <p className="text-[18px] leading-6 text-lightGraytext max-[768px]:text-[11px] max-[768px]:leading-[1.3]">
              Track your sales performance and revenue analytics from your comprehensive vendor dashboard
            </p>
          </div>
        </div>
      </div>
    ),
    []
  );

  return (
    <section className="relative md:flex block max-w-7xl mx-auto items-start h-fit justify-center bg-cream max-[768px]:block max-[768px]:px-4">
      <Image
        src="/images/home/latest/Vector.webp"
        alt="Center Vector"
        width={900}
        height={300}
        className="absolute left-0 bottom-0 pointer-events-none opacity-80 max-[768px]:hidden"
      />

      <div className="md:w-1/2 md:pt-14 pt-8 pr-2 md:pr-10 max-[768px]:w-full max-[768px]:pr-0 max-[768px]:pt-6">
        <div className="">
            <h2 className="text-center md:text-left text-2xl pt-5 md:text-[43px] font-normal text-black mt-30 pb-[20px] max-[768px]:text-center max-[768px]:text-[20px] max-[768px]:pt-0 max-[768px]:pb-3">
            How it Works
            </h2>
          <p className="md:text-[18px] text-md pt-5 text-lightGraytext leading-[30px] w-[390px] h-[120px] mb-[45px] max-[768px]:w-full max-[768px]:h-auto max-[768px]:text-[12px] max-[768px]:leading-[1.5] max-[768px]:pt-0 max-[768px]:mb-4">
            We are passionate about driving the <br className="md:block hidden"/>
            transition towards sustainable living by <br className="md:block hidden"/>
            providing eco-friendly construction <br className="md:block hidden"/>
            materials for both B2B and B2C markets.
          </p>

          <div className="relative md:block items-center justify-start mb-5 md:mb-0 z-20 mt-10 max-[768px]:mt-4 max-[768px]:flex max-[768px]:gap-3">
            <CustomButton
              onPress={handleBuyerClick}
              className={`
                flex items-center justify-between 
                max-w-xs rounded-md border 
                transition-all mb-[25px]
                ${showBuyer 
                  ? "border-primary text-white bg-primary shadow-[0px_6px_20px_rgba(67,151,135,0.45)]" 
                  : "border-primary text-primary bg-white shadow-[0px_4px_12px_rgba(67,151,135,0.25)] hover:shadow-[0px_4px_16px_rgba(67,151,135,0.35)]"
                }
                font-bold text-[30px]
                max-[768px]:text-[16px] max-[768px]:mb-0 max-[768px]:flex-1 max-[768px]:justify-center max-[768px]:gap-2 max-[768px]:py-3
              `}
              customStyles={{ 
                padding: typeof window !== 'undefined' && window.innerWidth < 768 ? "12px 16px" : "22px 62px", 
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? "auto" : "384px" 
              }}
              title="Buyer"
              rightIcon={
                showBuyer 
                  ? <Image src="/images/home/howitwork/white-arrao-icon.png" alt="white arrow" width={30} height={30} className="max-[768px]:w-5 max-[768px]:h-5"/>
                  : <Image src="/images/home/howitwork/green-arrow-icon.png" alt="green arrow" width={30} height={30} className="max-[768px]:w-5 max-[768px]:h-5"/>
              }
            />

            <CustomButton
              onPress={handleVendorClick}
              className={`
                flex items-center justify-between 
                max-w-xs rounded-md border 
                transition-all
                ${!showBuyer 
                  ? "border-secondary text-white bg-secondary shadow-[0px_6px_20px_rgba(169,36,73,0.45)]" 
                  : "border-secondary text-secondary bg-white shadow-[0px_4px_12px_rgba(169,36,73,0.25)] hover:shadow-[0px_4px_16px_rgba(169,36,73,0.35)]"
                }
                font-bold text-[30px]
                max-[768px]:text-[16px] max-[768px]:flex-1 max-[768px]:justify-center max-[768px]:gap-2 max-[768px]:py-3
              `}
              customStyles={{ 
                padding: typeof window !== 'undefined' && window.innerWidth < 768 ? "12px 16px" : "22px 62px", 
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? "auto" : "384px" 
              }}
              title="Vendor"
              rightIcon={
                !showBuyer 
                  ? <Image src="/images/home/howitwork/white-arrao-icon.png" alt="white arrow" width={30} height={30} className="max-[768px]:w-5 max-[768px]:h-5"/>
                  : <Image src="/images/home/howitwork/red-arrow-icon.png" alt="red arrow" width={30} height={30} className="max-[768px]:w-5 max-[768px]:h-5"/>
              }
            />
          </div>
        </div>
      </div>

      <div className="md:w-1/2 md:pl-10 md:pt-14 pt-8 max-[768px]:w-full max-[768px]:pl-0 max-[768px]:pt-4">
        <div className="w-full">{showBuyer ? buyerContent : vendorContent}</div>
      </div>
    </section>
  );
};

export default WorksSection;