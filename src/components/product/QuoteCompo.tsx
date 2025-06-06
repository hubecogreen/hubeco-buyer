import { Dialog } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { IoIosClose } from "react-icons/io";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CircularProgress } from "@chakra-ui/react";
import useRefreshToken from "../hooks/useRefreshToken";
import useApi from "../Fetcher/useAPI";
import * as getEndpoint from "../../network/EndPoints";
import toast from "react-hot-toast";
import ProductVariantItem from "./ProductVariantItem";
import AddVariantToQuote from "./AddVariantToQuote";
import QuoteDone from "./QuoteDone";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  totalProduct: any;
  productSelectedForQuote: any;
  setQuantityForQuote: any;
  setMinQuantityForQuote: any;
  minQuantityForQuote: any;
  quantityForQuote: any;
  setProductSelectedForQuote: any;
  combinations: any;
  productData: any;
}

const assetPath = process.env.NEXT_PUBLIC_ASSET_URL;
const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
export default function QuoteCompo({
  isOpen,
  setIsOpen,
  totalProduct,
  productSelectedForQuote,
  setQuantityForQuote,
  setMinQuantityForQuote,
  minQuantityForQuote,
  quantityForQuote,
  setProductSelectedForQuote,
  combinations,
  productData,
}: Props) {
  const [newSelectedVariant, setNewSelectedVariant] = useState<any>("");
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
  const [clickedOnSubmitQuote, setClickedOnSubmitQuote] = useState(false);
  const [tooltipMsg, setTooltipMsg] = useState<string[]>([""]);
  const [showQtyTip, setShowQtyTip] = useState<boolean[]>([false]);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [doneOpen, setDoneOpen] = useState<boolean>(false);
  const [myAddress, setMyAddress] = useState<any>([]);
  const [addressError, setAddressError] = useState<string>("");
  const [quoteDueDate, setQuoteDueDate] = useState<any>();
  const [dueDateError, setDueDateError] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<any>("");
  const [submissionInstructionError, setSubmissionInstructionError] =
    useState<string>("");
  const [submissionInstruction, setSubmissionInstruction] = useState<any>("");
  const [notes, setNotes] = useState<any>("");
  const [notesError, setNotesError] = useState<string>("");
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const [quoteLoading, setQuoteLoading] = useState(false);
  const router = useRouter();
  const handleChangeForQuote = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantityForQuote((prev: any) => {
        prev[index] = value;
        return prev;
      });
    }
  };

  const handleIncrementForQuote = (index: any) => {
    // setQuantity((prev: any) => prev + 1);
    setQuantityForQuote((prev: any) => {
      prev[index] = prev[index] + 1;
      return prev;
    });
  };

  // Handle decrement
  const handleDecrementForQuote = (index: any) => {
    // setQuantity((prev: any) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
    setQuantityForQuote((prev: any) => {
      prev[index] = prev[index] - 1;
      return prev;
    });
  };

  async function handleQuoteSubmit() {
    if (checkErrorsForQuote("mainSubmit")) {
      return;
    }
    if (
      notesError.length > 1 ||
      submissionInstructionError.length > 1 ||
      addressError.length > 1
    ) {

      return;
    }

    setClickedOnSubmitQuote(true);

    setQuoteLoading(true);
    const products = productSelectedForQuote?.map(
      (item: any, index: number) => {
        return {
          variantId: item._id,
          quantity: quantityForQuote[index],
        };
      }
    );

    const payload = {
      products: products,
      vendorId: totalProduct?.createdBy?.id,
      addressId: selectedAddress?.id,
      address: selectedAddress?.address,
      pincode: Number(selectedAddress.postCode),
      submissionDate: quoteDueDate,
      submissionInstructions: submissionInstruction,
      notes: notes,
    };

    try {
      const res = (await callApi("quotes/createQuote", "POST", payload)) as any;
      if (res.data !== null) {
        // toast.success("Quote request submitted successfully");
        setDoneOpen(true);
      } else if (res?.errorData?.response?.data?.message) {
        toast.error(res?.errorData?.response?.data?.message);
      } else {
        toast.error("failed to submit quote request");

      }
      // console.log(res,"Maharashtra"); 
    } catch (err: any) {
      toast.error("failed to submit quote request");
    } finally {
      setQuoteLoading(false);
      handleClose(); // Close the current dialog
    }
  }

  async function getNewVariantIdForTheQuote(mySlug: string) {
    try {
      setAddLoading(true);
      const result2 = (await callApi(
        `${getEndpoint.default.GETPRODUCTWITHSLUG}/${mySlug}`,
        "GET"
      )) as any;
      const result = result2.data as any;
      const selectedProduct = result.product.variants.filter(
        (elem: any, index: number) => {
          if (elem._id === result?.selectedVariant?._id) {
            return elem;
          }
        }
      );
      const filterAllProduct = result.product.variants.filter(
        (elem: any, index: number) => {
          if (elem._id !== result?.selectedVariant?._id) {
            return elem;
          }
        }
      );

      setProductSelectedForQuote((prev: any[]) => {
        const existingIds = new Set(prev.map((product) => product._id));
        const uniqueProducts = selectedProduct.filter(
          (product: { _id: any }) => !existingIds.has(product._id)
        );
        return [...prev, ...uniqueProducts];
      });
      setQuantityForQuote((prev: any) => {
        return [...prev, 1];
      });
    } catch (e: any) {
      // console.log(e, "getNewVariantIdForTheQuoteERRROR");
    } finally {
      setAddLoading(false);
      setAddOpen(false);
      setIsOpen(true);
      setNewSelectedVariant("");
    }
  }

  const removeSelectedProductForQuote = (idToRemove: string, index: number) => {
    setProductSelectedForQuote((prev: any[]) =>
      prev.filter((product) => product._id !== idToRemove)
    );
    if (index > -1 && index < quantityForQuote.length) {
      quantityForQuote.splice(index, 1);
    }
  };

  function checkErrorsForQuote(call: string) {
    let status = false;

    if (call == "mainSubmit") {
      if (selectedAddress == "" || selectedAddress == null) {
        setAddressError("Please select an address");
        status = true;
      } else {
        setAddressError("");
      }

      if (quoteDueDate == "" || quoteDueDate == null) {
        setDueDateError("Please select a due date");
        status = true;
      } else {
        setDueDateError("");
      }

      if (submissionInstruction == "" || submissionInstruction == null) {
        setSubmissionInstructionError("Please enter a submission instruction");
        status = true;
      } else {
        setSubmissionInstructionError("");
      }

      // if (notes == "" || notes == null) {
      //   setNotesError("Please enter a note");
      //   status = true;
      // } else {
      //   setNotesError("");
      // }
    } else if (call == "fromEffect" && clickedOnSubmitQuote) {
      if (selectedAddress == "" || selectedAddress == null) {
        setAddressError("Please select an address");
        status = true;
      } else {
        setAddressError("");
      }

      if (quoteDueDate == "" || quoteDueDate == null) {
        setDueDateError("Please select a due date");
        status = true;
      } else {
        setDueDateError("");
      }

      if (submissionInstruction == "" || submissionInstruction == null) {
        setSubmissionInstructionError("Please enter a submission instruction");
        status = true;
      } else {
        setSubmissionInstructionError("");
      }

      if (notes == "" || notes == null) {
        setNotesError("Please enter a note");
        status = true;
      } else {
        setNotesError("");
      }
    }
    // // console.log("handleQuoteSubmit", selectedAddress === "");

    return status;
  }

  useEffect(() => {
    checkErrorsForQuote("fromEffect");
  }, [selectedAddress, quoteDueDate, submissionInstruction, notes]);

  useEffect(() => {
    if (window) {
      const userInfo = JSON.parse(
        sessionStorage.getItem("buyerUserInfo") as string
      );
      if (userInfo) {
        setMyAddress(userInfo.addresses);
        // // console.log(userInfo.addresses, "sdhsagvdvas");
      }
    }
    return () => {
      setNotesError("");
      setSubmissionInstructionError("");
      setDueDateError("");
      setAddressError("");
    };
  }, []);
  function handleClose() {
    setNotesError("");
    setSubmissionInstructionError("");
    setDueDateError("");
    setAddressError("");
    setIsOpen(false);
    //@ts-ignore
    router.push(window.location.pathname, undefined, { shallow: true });
  }


  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          handleClose();
        }}
      >
        <DialogContent className={`max-w-lg h-full pb-12 ${addOpen && "hidden"}`}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Request Quote
            </DialogTitle>
          </DialogHeader>
          <div className="h-[98%] scrollbar overflow-y-auto mb-7 pr-2">
            {/* Product List */}
            {totalProduct.isSingleProduct == true ? (
              <ProductVariantItem
                elem={productSelectedForQuote[0]}
                index={0}
                assetPath={assetPath}
                quantityForQuote={quantityForQuote}
                setQuantityForQuote={setQuantityForQuote}
                removeSelectedProductForQuote={removeSelectedProductForQuote}
                setTooltipMsg={setTooltipMsg}
                tooltipMsg={tooltipMsg}
                setShowQtyTip={setShowQtyTip}
                showQtyTip={showQtyTip}
                setMinQuantityForQuote={setMinQuantityForQuote}
                minQuantityForQuote={minQuantityForQuote}
                isSingle={true}
              />
            ) : (
              <div className="w-full overflow-x-auto">
                {Array.isArray(productSelectedForQuote) &&
                  productSelectedForQuote?.map((elem: any, index: number) => {
                    return (
                      <ProductVariantItem
                        elem={elem}
                        index={index}
                        assetPath={assetPath}
                        quantityForQuote={quantityForQuote}
                        setQuantityForQuote={setQuantityForQuote}
                        removeSelectedProductForQuote={
                          removeSelectedProductForQuote
                        }
                        setTooltipMsg={setTooltipMsg}
                        tooltipMsg={tooltipMsg}
                        setShowQtyTip={setShowQtyTip}
                        showQtyTip={showQtyTip}
                        setMinQuantityForQuote={setMinQuantityForQuote}
                        minQuantityForQuote={minQuantityForQuote}
                        isSingle={false}
                      />
                    );
                  })}
              </div>
            )}

            {totalProduct.isSingleProduct == false &&
              totalProduct?.variants?.length > 1 && (
                <button
                  className="text-[#B90647] mt-4 font-semibold flex ml-auto "
                  onClick={() => {
                    // setIsOpen(false); // Close the current dialog
                    setAddOpen(true); // Open the new state/dialog
                  }}
                >
                  + Add Variant
                </button>
              )}
            {/* Address Options */}
            <div className={` ${totalProduct.isSingleProduct && "my-4"}`}>
              <label className="block font-semibold mb-1 text-sm">
                Where do you need these?{" "}
                <Link
                  href="/profile?tab=address&redirect=quote"
                  className="text-[#B90647] cursor-pointer text-xs"
                >
                  {" "}
                  Add new address{" "}
                </Link>
              </label>
              {myAddress.length != 0 ? (
                myAddress.map((address: any) => {
                  // console.log("address", address);
                  return (
                    <div className="my-3 flex items-center justify-start">
                      <input
                        type="radio"
                        id={address.id}
                        name="address"
                        className="flex [accent-color:#B90647]"// Tailwind doesn't support accentColor directly
                        defaultChecked={address.id === selectedAddress.id}
                        onChange={(e) => setSelectedAddress(address)}
                      />

                      <label
                        htmlFor={address.id}
                        className="ml-2 cursor-pointer hover:text-[#009886]"
                      >
                        <p className="flex">
                          {" "}
                          {address.address} {address.city}, {address.state},{" "}
                          {address.country}, {address.postCode}
                        </p>
                      </label>
                    </div>
                  );
                })
              ) : (
                <div className="my-3 w-full text-center justify-center items-center text-[#B90647]" >No address found</div>
              )}
              <span className="text-red text-xs">{addressError}</span>
            </div>

            {/* Date Picker */}
            <div className="mb-1">
              <label className="block font-semibold text-sm mb-1">
                Quote Due Date <span className="text-red">*</span>
              </label>
              <label className="relative inline-block w-full">
                <input
                  type="date"
                  className="border w-full rounded px-3 py-2 focus:outline-none picker"
                  placeholder="Select Date"
                  onChange={(e) => setQuoteDueDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  onKeyDown={(e) => e.preventDefault()}
                  id="modified"
                />
              </label>

              <span className="text-red text-xs">{dueDateError}</span>
            </div>

            {/* Instructions & Notes */}
            <div className="mb-1">
              <label className="block font-semibold text-sm mb-1">
                Quote Submission Instructions{" "}
                <span className="text-red">*</span>
              </label>
              <textarea
                placeholder="Submission Instructions"
                className="border w-full rounded px-3 py-2 focus:outline-none"
                onChange={(e) => {
                  if (e.target.value.length > 250) {
                    setSubmissionInstructionError(
                      "Submission instruction should be less than 250 characters"
                    );
                  } else if (e.target.value.length < 3) {
                    setSubmissionInstructionError(
                      "Submission instruction should be at least 3 characters"
                    );
                  } else {
                    setSubmissionInstructionError("");
                  }

                  setSubmissionInstruction(e.target.value);
                }}
              />
              <span className="text-red text-xs">
                {submissionInstructionError}
              </span>
            </div>
            <div className="mb-1">
              <label className="block font-semibold text-sm mb-1">
                Notes
              </label>
              <textarea
                placeholder="Type here"
                className="border w-full rounded px-3 py-2 focus:outline-none"
                onChange={(e) => {
                  // if (e.target.value.length > 250) {
                  //   setNotesError("Notes should be less than 250 characters");
                  // } else if (e.target.value.length < 3) {
                  //   setNotesError("Notes should be at least 3 characters");
                  // } else {
                  //   setNotesError("");
                  // }

                  setNotes(e.target.value);
                }}
              />
              <span className="text-red text-xs">{notesError}</span>
            </div>
          </div>
          {/* Footer Actions */}
          <DialogFooter className="flex justify-between fixed bottom-0 w-full px-5 py-5">
            <Button
              onClick={() => handleClose()}
              className="bg-gray-200 text-[#B90647] px-4 py-2 border border-[#B90647] w-full w-1/2"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#B90647] text-white px-4 py-2 w-full w-1/2"
              onClick={async () => {
                await handleQuoteSubmit();
              }}
            >
              {quoteLoading ? (
                <>
                  <CircularProgress
                    // isIndeterminate
                    color="#ffffff"
                    size={6}
                  />
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AddVariantToQuote
        addOpen={addOpen}
        setIsOpen={setIsOpen}
        productSelectedForQuote={productSelectedForQuote}
        assetPath={assetPath}
        combinations={combinations}
        productData={productData}
        setNewSelectedVariant={setNewSelectedVariant}
        setAddOpen={setAddOpen}
        getNewVariantIdForTheQuote={getNewVariantIdForTheQuote}
        newSelectedVariant={newSelectedVariant}
        addLoading={addLoading}
      />
      <QuoteDone doneOpen={doneOpen} setDoneOpen={setDoneOpen} />
    </>
  );
}
