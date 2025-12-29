import React from "react";
import { GoArrowRight } from "react-icons/go";
import CustomButton from "../customButton/CustomButton";
import styles from "./Cart.module.css";
import Image from "next/image";
interface ProductCardProps {
  product: any;
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Format a given amount in Indian numbering style, with two decimal places.
 * Rounds the amount to two decimal places first.
 * @param {number} amount The amount to be formatted.
 * @returns {string} The formatted amount in Indian numbering style.
 */
/******  93ade27c-a7ac-4976-8647-830ceb1fde45  *******/

function formatCurrencyInIndianStyle(amount: number): string {
  // Round to two decimal places
  const roundedAmount = Math.round(amount * 100) / 100;

  // Determine whether to show decimals
  const options: Intl.NumberFormatOptions = 
    roundedAmount % 1 === 0
      ? {} // No decimals if the number is whole
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  // Format in Indian numbering style
  return new Intl.NumberFormat('en-IN', options).format(roundedAmount);
}


const CartCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={`${styles.productCard} hover-card m-[10px]`}>

      <div className="product-card-body w-full">
        <div className="flex justify-between w-full top-row">
          <div className={styles.discountBadge}>58% off</div>
        </div>
        <Image
          src={product && product.image}
          alt={product.title}
          className={styles.productImage}
          width={200}
          height={200}
          onError={e => {
            e.currentTarget.src = '/images/product-placeholder.webp'
          }}
          loading="lazy"
        />
        <div className="block flex justify-start justify-between items-center mt-3">
          <div>
            <h3 className="text-primary text-md font-semibold text-left product-card-title truncate overflow-hidden whitespace-nowrap">
              {product && product.title}
            </h3>
          </div>
        </div>
        <p className="text-fontGray md:text-xs text-xs text-left mt-2 mb-3 product-card-desc">
          {product && product.description}
        </p>
        <div className={`${styles.priceSection} block flex justify-start justify-between items-center hover-card`}>
          <CustomButton
            title={"Add to Cart"}
            className={`${styles.addToCart} z-50 lg:px-2 bg-bgGray hover:bg-primary md:w-32 w-24 p-1 md:h-12 h-8 justify-around items-center font-semibold text-tiny md:text-xs text-white hover:bg-secondary`}
            hoverBgColor="#439787"
            hoverColor="#ffffff"
            rightIcon={<GoArrowRight />}
          />
          <div className="flex">
            <p className="md:text-xl text-lg text-left mt-2 mb-3 product-card-desc pl-5 font-bold text-base text-primary">
              {formatCurrencyInIndianStyle(product && product.currentPrice)}
            </p>
            <p className={styles.originalPrice}>{formatCurrencyInIndianStyle(product && product.originalPrice)}</p>
          </div>
        </div>
        <div className={styles.viewButton}>
          <p className="text-brown font-normal text-sm text-center">View</p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
