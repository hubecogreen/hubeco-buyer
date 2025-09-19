import { Dialog } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IoIosClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircularProgress } from "@chakra-ui/react";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import useApi from "@/components/Fetcher/useAPI";
import * as getEndpoint from "@/network/EndPoints";
import toast from "react-hot-toast";
import ProductVariantItem from "@/components/product/ProductVariantItem";
import AddVariantToQuote from "@/components/product/AddVariantToQuote";
import QuoteDone from "@/components/product/QuoteDone";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setQuantityForQuote: any;
  setProductSelectedForQuote: any;
  address: any;
  addressId: any;
  pincode: any;
  products: any;
  vendorId: any;
}

export default function QuoteCompo({
  isOpen,
  setIsOpen,
  setQuantityForQuote,
  setProductSelectedForQuote,
  address,
  addressId,
  pincode,
  products,
  vendorId,
}: Props) {
  const [newSelectedVariant, setNewSelectedVariant] = useState<any>("");
  const [clickedOnSubmitQuote, setClickedOnSubmitQuote] = useState(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [doneOpen, setDoneOpen] = useState<boolean>(false);
  const [myAddress, setMyAddress] = useState<any>([]);
  const [addressError, setAddressError] = useState<string>("");
  const [quoteDueDate, setQuoteDueDate] = useState<any>();
  const [dueDateError, setDueDateError] = useState<string>("");
  const [submissionInstructionError, setSubmissionInstructionError] =
    useState<string>("");
  const [submissionInstruction, setSubmissionInstruction] = useState<any>("");
  const [notes, setNotes] = useState<any>("");
  const [notesError, setNotesError] = useState<string>("");
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const { callApi } = useApi();
  const [quoteLoading, setQuoteLoading] = useState(false);
  const router = useRouter();

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

    const payload = {
      products: products,
      vendorId: vendorId,
      addressId: addressId,
      address: address,
      pincode: Number(pincode),
      submissionDate: quoteDueDate,
      submissionInstructions: submissionInstruction,
      notes: notes,
    };
    // console.log('QuotePayload',payload)

    try {
      const res = (await callApi("quotes/createQuote", "POST", payload)) as any;
      if (res.data !== null) {
        // toast.success("Quote request submitted successfully");
        setDoneOpen(true);
      } else {
        toast.error("failed to submit quote request");
      }
    } catch (err: any) {
      toast.error("failed to submit quote request");
    } finally {
      setQuoteLoading(false);
      handleClose(); // Close the current dialog
    }
  }

  function checkErrorsForQuote(call: string) {
    let status = false;

    if (call == "mainSubmit") {
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
    }

    return status;
  }

  useEffect(() => {
    checkErrorsForQuote("fromEffect");
  }, [quoteDueDate, submissionInstruction, notes]);

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
        <DialogContent
          className={`max-w-lg h-fit pb-12 ${addOpen && "hidden"}`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Request Quote
            </DialogTitle>
          </DialogHeader>
          <div className="h-fit scrollbar overflow-y-auto mb-7 pr-2">
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
                  if (e.target.value.length < 3) {
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
                Notes <span className="text-red">*</span>
              </label>
              <textarea
                placeholder="Type here"
                className="border w-full rounded px-3 py-2 focus:outline-none"
                onChange={(e) => {
                  // if (e.target.value.length > 100) {
                  //   setNotesError("Notes should be less than 100 characters");
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
      {/* <AddVariantToQuote
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
      /> */}
      <QuoteDone doneOpen={doneOpen} setDoneOpen={setDoneOpen} />
    </>
  );
}
