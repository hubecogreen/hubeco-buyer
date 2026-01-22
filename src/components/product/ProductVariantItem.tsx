import { FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import Image from "next/image";
import { normalizePath } from "@/lib/utils";
const ProductVariantItem = ({
  elem,
  index,
  assetPath,
  setQuantityForQuote,
  removeSelectedProductForQuote,
  isSingle,
  quantity= elem.minBuyQty
}: any) => {
  const [tooltipMsg, setTooltipMsg] = useState<string>();
  const [showQtyTip, setShowQtyTip] = useState<boolean>(false);
  const [quantityForQuote, setQuantityForQuoteSingle] = useState(
    quantity
  );
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();

  const handleDecrementForQuote = (index: any) => {
    setQuantityForQuoteSingle((prev: number) => Math.max(prev - 1, 1));
  };

  const handleIncrementForQuote = (index: any) => {
    setQuantityForQuoteSingle((prev: number) => prev + 1);
  };

  const handleChangeForQuote = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    clearTimeout(timeoutID);
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);

    if (value === "") {
      setQuantityForQuoteSingle("");
      setShowQtyTip(false); // Hide tooltip while user is editing
    } else if (!isNaN(value) && value > 0) {
      setQuantityForQuoteSingle(value);
      setShowQtyTip(value < elem.minBuyQty);
      setTooltipMsg(
        value < elem.minBuyQty
          ? `Minimum purchase quantity is ${elem.minBuyQty}`
          : ""
      );
    }

    // Delay to reset quantity if left empty or below minBuyQty
    setTimeoutID(
      setTimeout(() => {
        if (value === "" || (value < elem.minBuyQty && value !== "")) {
          setQuantityForQuoteSingle(elem.minBuyQty);
          setTooltipMsg("");
          setShowQtyTip(false);
        } else {
          setShowQtyTip(false);
          setQuantityForQuoteSingle(value);
        }
      }, 1000)
    );
  };

  useEffect(() => {
    setQuantityForQuote((prev: any[]) => {
      const updatedQuantity = [...prev];
      updatedQuantity[index] = quantityForQuote;
      return updatedQuantity;
    });
  }, [quantityForQuote]);
  return (
    <div className="flex items-center justify-between w-full p-4 border-b">
      {/* Product Info Section */}
      <div className="flex items-start space-x-4 flex-1">
        {/* Product Image */}
        <Image
          className="w-12 h-12 rounded object-cover"
          // src={
          //   elem?.thumbnail
          //     ? `${assetPath}/${elem?.thumbnail}`
          //     : "/api/placeholder/48/48"
          // }
          // src={
          //   elem?.thumbnail
          //     ? (assetPath + "/" + elem?.thumbnail).includes("//admin")
          //       ? (assetPath + "/" + elem?.thumbnail).replace(
          //           "//admin",
          //           "/admin"
          //         )
          //       : `${assetPath}/${elem?.thumbnail}`
          //     : "/images/product-placeholder.webp"
          // }
          src={
            elem?.thumbnail
              ? normalizePath(`${assetPath}/${elem?.thumbnail}`)
              : "/images/product-placeholder.webp"
          }
          alt={elem?.variantName || "Product variant"}
          width={100}
          height={100}
          onError={(e) => {
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
          loading="lazy"
        />

        {/* Product Details */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">
            {isSingle ? elem?.productName : `${elem?.variantName}`}
          </h3>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded">
          <TooltipProvider>
            <Tooltip open={showQtyTip}>
              <TooltipTrigger className="flex">
                <Button
                  type="button"
                  onClick={() => handleDecrementForQuote(index)}
                  disabled={elem.minBuyQty >= quantityForQuote}
                  className="px-3 py-2 bg-transparent hover:bg-gray-100 text-secondary"
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={quantityForQuote}
                  onChange={(e) => handleChangeForQuote(e, index)}
                  className="bg-cream w-16 text-center border-0 focus:ring-0"
                />
                <Button
                  type="button"
                  onClick={() => handleIncrementForQuote(index)}
                  className="px-3 py-2 bg-transparent hover:bg-gray-100 text-secondary"
                >
                  +
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={5}
                className="border-transparent px-0 bg-black z-20 max-w-[270px]"
              >
                <TooltipArrow className="fill-black" />
                {tooltipMsg && (
                  <p className="text-sm text-white font-medium py-2 px-2">
                    {tooltipMsg}
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Delete Button */}
        {index !== 0 && (
          <button
            onClick={() => removeSelectedProductForQuote(elem._id, index)}
            className="p-2 text-red-600 hover:text-red-700"
          >
            <FaTrash className="w-4 h-4 text-[#B90647]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductVariantItem;
