import React from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

type Props = {
  link1: {
    name: string;
    href: string;
  };
  link2: {
    name: string;
    href: string;
  };
  link3?: {
    name?: string;
    href?: any;
  };
  link4?: {
    name?: string;
    href?: any;
  };
  link5?: {
    name?: string;
    href?: any;
  };
};

function BannerSection({ link1, link2, link3, link4, link5 }: Props) {  
  
  return (
    <div className="banner-section">
      <div className="relative  md:flex block md:justify-start justify-center items-center md:px-20 px-3 bg-[url('/images/about/aboutBanner1.webp')] bg-cover bg-center h-[150px] md:h-[200px] flex items-center justify-start text-cream mt-[120px] md:mt-[85px]">
        <Link
          href={link1.href}
          className="text-cream flex md:text-md text-sm items-center p-2 rounded"
        >
          <AiFillHome size={16} className="text-cream mr-1.5" />
          {link1.name}
        </Link>
        <span className="text-cream mx-[2px] md:mx-2">/</span>
        <Link
          href={link2.href}
          className="text-cream md:text-md text-sm p-1 md:p-2 rounded"
        >
          {link2.name}
        </Link>
        {link3?.name?.trim() ?(
          <>
            <span className="text-cream mx-[2px] md:mx-2">/</span>
            <Link
              href={link3?.href}
              className="text-cream md:text-md text-sm  p-1 md:p-2 rounded"
            >
              {link3?.name}
            </Link>
          </>
        ) : (
          <></>
        )}
        {link4?.name?.trim() ? (
          <>
            <span className="text-cream mx-[2px] md:mx-2">/</span>
            <Link
              href={link4?.href}
              className="text-cream md:text-md text-sm  p-1 md:p-2 rounded"
            >
              {link4?.name}
            </Link>
          </>
        ) : (
          <></>
        )}
        {link5?.name?.trim() ?(
          <>
            <span className="text-cream mx-[2px] md:mx-2">/</span>
            <Link
              href={link5?.href}
              className="text-cream md:text-md text-sm  p-1 md:p-2 rounded"
            >
              {link5?.name}
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BannerSection;
