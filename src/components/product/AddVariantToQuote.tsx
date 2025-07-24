import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
// import { IoIosClose } from "react-icons/io";
import AttributeDisplayForQuote from "./AttributeDisplayForQuote";
import { Button } from "../ui/button";
import { CircularProgress } from "@chakra-ui/react";
import Image from "next/image";
import { normalizePath } from "@/lib/utils";
export default function AddVariantToQuote({
  addOpen,
  setIsOpen,
  productSelectedForQuote,
  assetPath,
  combinations,
  productData,
  setNewSelectedVariant,
  setAddOpen,
  getNewVariantIdForTheQuote,
  newSelectedVariant,
  addLoading,
}: any) {
  return (
    <Dialog
      open={addOpen}
      onOpenChange={() => {
        setAddOpen(false);
        setIsOpen(true);
      }}
    >
      <DialogContent className="sm:max-w-md overflow-y-auto scrollbar">
        {/* <DialogClose
           onClick={() => {
            setAddOpen(false);
            setIsOpen(true);
          }}
          className="absolute top-4 right-4"
        >
          <IoIosClose className="w-6 h-6  z-10 bg-white  text-black" />
        </DialogClose> */}

        <DialogHeader>
          <DialogTitle className="text-left">Add Product</DialogTitle>
        </DialogHeader>

        {Array.isArray(productSelectedForQuote) &&
          productSelectedForQuote?.map((elem: any) => {
            return (
              <React.Fragment>
                <div
                  key={elem._id}
                  className="flex items-center justify-between mb-4 border-b pb-3"
                >
                  <div className="flex items-center">
                    <Image
                      className="w-12 h-12 rounded"
                      // src={
                      //   elem?.thumbnail ? `${assetPath}/${elem?.thumbnail}` : ""
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
                      alt={
                        elem?.thumbnail
                          ? `${assetPath}/${elem?.variantName}`
                          : ""
                      }
                      width={100}
                      height={100}
                      onError={(e) => {
                        e.currentTarget.src = "/images/product-placeholder.webp";
                      }}
                      loading="lazy"
                    />
                    <div className="ml-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col">
                          <p className="font-semibold  w-full">
                            {elem?.variantName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}

        <p className="text-md text-fontGray text-normal">Select Variant</p>
        <div className="flex md:space-x-2 flex-wrap  w-full">
          <AttributeDisplayForQuote
            attributes={combinations}
            currentAttributes={productData?.attributes}
            setNewSelectedVariant={setNewSelectedVariant}
          />
        </div>

        <DialogFooter className="flex justify-between pt-3">
          <Button
            onClick={() => {
              setAddOpen(false);
              setIsOpen(true);
            }}
            className="bg-gray-200 text-[#B90647] px-4 py-2 border border-[#B90647] w-full w-1/2"
          >
            Cancel
          </Button>
          <Button
            className="bg-[#B90647] text-white px-4 py-2 w-full w-1/2"
            onClick={() => {
              // setAddOpen(false); // Close the current dialog
              // setDoneOpen(true); // Open the new state/dialog
              getNewVariantIdForTheQuote(newSelectedVariant);
            }}
          >
            {addLoading ? (
              <>
                <CircularProgress
                  // isIndeterminate
                  color="#ffffff"
                  size={6}
                />
              </>
            ) : (
              "Add"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
