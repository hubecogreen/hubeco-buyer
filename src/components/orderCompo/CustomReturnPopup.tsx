"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput/CustomTextField";
// import CustomButton from "@/components/customButton/CustomButton";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import useRefreshToken from "../hooks/useRefreshToken";
import useApi from "../Fetcher/useAPI";
import * as getEndpoint from "../../network/EndPoints";
import { getCookie } from "cookies-next";
import * as Webservices from "../../network/WebServices";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { set } from "lodash";
import { FaFilePdf } from "react-icons/fa";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomReturnPopup = ({ open, onClose, orderId }: any) => {
  if (!open) return null; // Don't render if the popup is closed
  const [cancelButtonLoading, setCancelButtonLoading] =
    useState<boolean>(false);
  const [returnReason, setReturnReason] = useState<string>("");
  const [returnReasonError, setReturnReasonError] = useState<string>("");
  const [imagesArry, setImagesArry] = useState<any[]>([]);
  const [imagesArryErr, setImagesArryErr] = useState<string>("");
  const [payloadImgArr, setPayloadImgArr] = useState<any[]>([]);
  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();
  const token = getCookie("token") as string;
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const [customReturnReason, setCustomReturnReason] = useState("");

  const handleReturnReasonChange = (e:any) => {
    const value = e.target?.value || e.value || e; // handle both native and Select usage
    setReturnReason(value);
    if (value !== "Other") {
      setCustomReturnReason('');
    }
  };  

  const handleCustomReturnReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement> | string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setCustomReturnReason(value);
  };
  

  const handleReturn = async () => {
    if (returnReason.length == 0 && imagesArry.length === 0) {
      // toast.error("Please provide a reason and at least one attachment.");
      setReturnReasonError("Please provide a reason.");
      setImagesArryErr("Please provide at least one attachment.");
      return;
    } else if (returnReason.length > 0 && imagesArry.length === 0) {
      setImagesArryErr("Please provide at least one attachment.");
      setReturnReasonError("");
      return;
    } else if (returnReason.length == 0 && imagesArry.length > 0) {
      setImagesArryErr("");
      setReturnReasonError("Please provide a reason.");
      return;
    } else {
    }

    setCancelButtonLoading(true);
    var now = dayjs();
    const payload = {
      orderId: orderId,
      reason: returnReason === "Other" ? customReturnReason : returnReason,
      returnType: "Refund",
      timeStamp: now,
      attachments: payloadImgArr,
    };

    // console.log("wqefgrhn", payload);

    try {
      const result = (await callApi(
        getEndpoint.default.RETURNORDER,
        "POST",
        payload
      )) as any;
      if (result.data == null) {
        handleReturnApiError(result?.errorData, orderId);
      } else {
        toast.success("Order Return Requested Successfully");
        // reloadPage();
        window.location.reload();
      }
    } catch (e: any) {
      handleReturnApiError(e, orderId);
    } finally {
      setCancelButtonLoading(false);
      //   setOpenCancel(false);
      //   setCancelReason("");
      onClose();
    }
  };
  const handleReturnApiError = async (err: any, id: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message[0].message == "reason must be a string"
      ) {
        toast.error("Please Enter Valid Reason");
      } else {
        toast.error("Return Order Failed");
      }
      // toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "Order not found"
      ) {
        toast.error("Order not found");
      } else {
        toast.error("Return Order Failed");
      }
      // toast.error("Invalid Request");
    } else if (result?.status === 409) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message ==
          "Product can't be returned as it is not yet delivered"
      ) {
        toast.error("Product can't be returned as it is not yet delivered");
      } else if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "Product can't be returned as time elapsed"
      ) {
        toast.error("Product can't be returned as time elapsed");
      } else {
        toast.error("Return Order Failed");
      }
      //
    } else if (result?.status === 401) {
      await refreshTokens();
      handleReturn();
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  // const handleReturnReasonChange = (value: any) => {
  //   // console.log("ReasonValue", value);
  //   setReturnReason(value);
  //   if (value.length < 3) {
  //     setReturnReasonError("Reason should be more than 3 characters");
  //   } else {
  //     setReturnReasonError("");
  //   }
  //   setReturnReason(value);
  // };

  const extractPath = (url: string): string => {
    try {
      const urlObject = new URL(url);
      const fullPath = urlObject.pathname;
      return fullPath.substring(fullPath.indexOf("buyer"));
    } catch (error) {
      // consoleerror("Invalid URL:", error);
      return "";
    }
  };

  const getMedia = async (file: File) => {
    const apiUrl = `media/presignedUrlPublic?fileName=${encodeURIComponent(
      file.name
    )}&userType=Buyer&fileType=${encodeURIComponent(
      file.type
    )}&intent=documents`;

    try {
      const response = await Webservices.callGetApi(apiUrl, token);
      if (response.status === 200) {
        const extractedPath = extractPath(response.data.url);
        setPayloadImgArr((prev: any) => [...prev, extractedPath]);
        await axios.put(response.data.url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
      }
    } catch (err: any) {
      // consoleerror("File upload error:", err);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
      "image/JPG",
      "image/JPEG",
      "image/PNG",
    ];
    const maxSize = 2.5 * 1024 * 1024; // 2.5MB

    const invalidFiles = selectedFiles.filter(
      (file) => !validTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      setImagesArryErr("Some files are invalid (wrong type or size > 2.5MB).");
      return;
    }

    setImagesArryErr("");
    // console.log("selectedFiles", selectedFiles);

    selectedFiles.forEach((file: any) => {
      file.arrayBuffer().then((buffer: any) => {
        const blob = new Blob([buffer], { type: file.type });
        getMedia(new File([blob], file.name, { type: file.type }));
        setImagesArry((prev) => [...prev, URL.createObjectURL(blob)]);
      });
    });
  };

  const removeImage = (index: number) => {
    setImagesArry((prev) => prev.filter((_, i) => i !== index));
    setPayloadImgArr((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      ></div>

      {/* Popup Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white sm:max-w-[425px] p-6 rounded shadow-lg border border-borderGray relative">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/images/ReturnS.svg"
              alt="return order"
              width={70}
              height={70}
              onError={(e) => {
                e.currentTarget.src = "/images/product-placeholder.webp";
              }}
              loading="lazy"
              className="mb-3"
            />
          </div>

          <p className="text-center text-lg text-brown mt-4">
            Are you sure you want to return the order?
          </p>
          <div></div>

          <div className="mt-4">
            <label
              htmlFor="cancelReason"
              className="block text-sm font-regular text-left mb-2"
            >
              Reason for Return <span className="text-red">*</span>
            </label>

            {/* Custom Select Component */}
            <Select
              value={returnReason}
              onValueChange={(value) =>
                handleReturnReasonChange({ target: { value } })
              }
            >
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded mb-2">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Damaged Goods">Damaged Goods</SelectItem>
                  <SelectItem value="Partial Damage">Partial Damage</SelectItem>
                  <SelectItem value="Not Delivered">Not Delivered</SelectItem>
                  <SelectItem value="Wrong Product Delivered">
                    Wrong Product Delivered
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Textarea for additional/custom reason */}
            {returnReason === "Other" && (
              <CustomInput
                placeholder="Enter Reason"
                value={customReturnReason}
                onChange={handleCustomReturnReasonChange}
                extraClassnames="w-full p-2 border border-gray-300 rounded resize-none"
                isTextArea={true}
              />
            )}

            {returnReasonError && (
              <p className="text-red text-sm mt-1">{returnReasonError}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm mb-2">
              Attachments <span className="text-red">*</span>
            </label>
            {/* <input
              type="file"
              multiple
              accept="image/jpeg, image/png, application/pdf"
              onChange={handleFileInputChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer"
            
            /> */}
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="icon text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  fill="currentColor"
                >
                  <path
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="text text-gray-700">
                <span>Click to Upload Images</span>
              </div>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={(e) => {
                  handleFileInputChange(e);
                  // console.log("selectedFiles", e);
                }}
              />
            </label>

            {imagesArryErr && (
              <p className="text-red text-sm mt-1">{imagesArryErr}</p>
            )}

            <div className="flex flex-wrap mt-2 gap-2">
              {imagesArry.map((path: any, index: any) => {
                const encodedPath = encodeURIComponent(path);
                const fullUrl = new URL(path, assetURL).toString();
                return (
                  <div key={payloadImgArr[index]}>
                    {" "}
                    {payloadImgArr[index]?.endsWith(".pdf") ? (
                      <div className="relative flex flex-col items-center">
                        <FaFilePdf size={100} color="red" title="PDF file" />
                        <Link
                          href={`${assetURL}/${payloadImgArr[index]}`}
                          className="text-primary"
                        >
                          Download
                        </Link>
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0 w-[30px] h-[30px] gap-0 !bg-transparent !hover:bg-transparent"
                        >
                          <IoMdCloseCircle
                            size={10}
                            color="#A92449"
                            className="text-secondary bg-white p-0 m-0  rounded-full w-[30px] h-[30px]"
                          />
                        </Button>
                      </div>
                    ) : (
                      <div key={index} className="relative w-[100px] h-[100px]">
                        <Image
                          src={fullUrl}
                          // src={'https://assets-uat.hubeco.market/buyer/profilePictures/ff23034a-20b1-44a0-bb87-7cb309da53af-profile-pic.webp'}
                          alt={`Attachment ${index + 1}`}
                          className="rounded !w-[100px] !h-[100px]"
                          width={100}
                          height={100}
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/product-placeholder.webp";
                          }}
                          // loading="lazy"
                          loading="eager"
                          unoptimized
                        />
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0 w-[30px] h-[30px] gap-0 !bg-transparent !hover:bg-transparent"
                        >
                          <IoMdCloseCircle
                            size={20}
                            color="#A92449"
                            className="text-secondary bg-white p-0 m-0  rounded-full w-[30px] h-[30px]"
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end items-center mt-6">
            <Button
              type="button"
              className="py-2 px-4 bg-secondaryBg text-gray-700 rounded hover:bg-secondaryBg ml-6"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="py-2 px-6 bg-secondary text-white rounded hover:bg-secondary ml-4"
              onClick={() => handleReturn()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomReturnPopup;
