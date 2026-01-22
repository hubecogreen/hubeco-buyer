"use client";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import CustomButton from "../customButton/CustomButton";
import { PiTicketFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import useRefreshToken from "../hooks/useRefreshToken";
import useApi from "../Fetcher/useAPI";
import toast from "react-hot-toast";
import * as getEndpoint from "@/network/EndPoints";
interface CustomPopupProps {
  open: boolean;
  onClose: () => void;
//   onSubmit: (values: any) => void;
  submitLoading: boolean;
  orderData?: any; // Adjust the type based on your orderData structure
}

const validationSchema = yup.object().shape({
    ticketType: yup.string().required("Ticket type is required."),
    description: yup
      .string()
      .required("Description is required.")
      .trim()
      .min(3, "Description must be at least 3 characters.")
      .max(1000, "Description must not exceed 1000 characters."),
    order: yup.string().required("Order is required."),
  });

const CustomTicketPopup: React.FC<CustomPopupProps> = ({
  open,
  onClose,
  submitLoading,
  orderData,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ticketType: "",
      description: "",
      order: "",
    },
  });

  const router = useRouter();
  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(false);
  const [openCancel, setOpenCancel] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const [cancelButtonLoading, setCancelButtonLoading] =
    useState<boolean>(false);
    
  const handleFormSubmit = (data: any) => {
    onSubmit(data); // Pass data to parent onSubmit
    reset(); // Reset the form after submission
  };

  const onSubmit = async (data: any) => {
    setCancelButtonLoading(true);
    const payload = {
      order: data.order,
      description: data.description,
      ticketType: data.ticketType,
    };
    // console.log("dvdsvsdf", payload);
    try {
      const result = (await callApi(
        getEndpoint.default.SUPPORT,
        "POST",
        payload
      )) as any;
      if (result.data == null) {
        // handleCancelApiError(result?.errorData, orderId);
      } else {
        toast.success("Ticked Raised Successfully");
        onClose()
        router.push('/tickets')
        // reloadPage();
      }
    } catch (e: any) {
      handleCancelApiError(e, data.order);
    } finally {
      setCancelButtonLoading(false);
      setOpenCancel(false);
    }
  };

  const handleCloseReturn = () => {
    reset()
    onClose()
  };

  const handleCancelApiError = async (err: any, id: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message[0].message == "reason must be a string"
      ) {
        toast.error("Please Enter Valid Reason");
      } else {
        toast.error("Cancel Order Failed");
      }
      // toast.error("Order Not Found");
    } else if (result?.status === 404) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "Order not found"
      ) {
        toast.error("Order not found");
      } else {
        toast.error("Cancel Order Failed");
      }
      // toast.error("Invalid Request");
    } 
    else if (result?.status === 401) {
      await refreshTokens();
      // onSubmit(id);
      toast.error('Failed to raise ticket, Please try again')
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };
  
  if (!open) return null; // Don't render if the popup is closed

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose}></div>

      {/* Popup Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-cream md:w-[500px] p-6 rounded shadow-lg border border-borderGray relative">
          <div className="flex justify-center items-center">
            <p className="text-center text-lg text-brown font-medium mt-4">Raise a Ticket</p>
              <PiTicketFill className="mt-3 ml-2 text-2xl text-primary" />
          </div>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mt-6">
              <label htmlFor="ticketType" className="block text-sm font-medium text-left mb-2">
                Select Ticket Type <span className="text-red">*</span>
              </label>
              <Controller
                name="ticketType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full  rounded">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ORDER_INQUIRY">Order Related</SelectItem>
                      <SelectItem value="REFUND_INQUIRY">Refund Related</SelectItem>
                      <SelectItem value="QUALITY_INQUIRY">Quality Related</SelectItem>
                      <SelectItem value="CANCELLATION_INQUIRY">Cancellation Related</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.ticketType && (
                <p className="text-[#FF4C51] text-xs mt-1">{errors.ticketType.message}</p>
              )}
            </div>
            <div className="mt-2">
              <label htmlFor="description" className="block text-sm font-medium text-left mb-2">
                Description <span className="text-red">*</span>
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="description"
                    placeholder="Provide a brief description of the issue"
                    className="w-full p-2 border border-primary rounded resize-none focus:outline-none bg-cream"
                    rows={4}
                  />
                )}
              />
              {errors.description && (
                <p className="text-[#FF4C51] text-xs mt-1">{errors.description.message}</p>
              )}
            </div>
            <div className="mt-1">
              <label htmlFor="order" className="block text-sm font-medium text-left mb-2">
                Select Order <span className="text-red">*</span>
              </label>
              <Controller
                name="order"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full  rounded">
                      <SelectValue placeholder="Select Order" />
                    </SelectTrigger>
                    <SelectContent>
                      {orderData?.orders?.map((order: any) => (
                        <SelectItem key={order._id} value={order._id}>
                          {order.orderId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.order && <p className="text-[#FF4C51] text-xs mt-1">{errors.order.message}</p>}
            </div>
            <div className="flex justify-end items-center mt-8">
              <Button
                type="button"
                className="py-2 px-4 bg-cream border border-primary text-primary hover:text-cream rounded  ml-6"
                onClick={handleCloseReturn}
              >
                Cancel
              </Button>
              <CustomButton
                title={"Submit"}
                customStyles={{
                  
                  color: "#FFFFFF",
                  minWidth: "200px",
                }}
                className="py-2 px-4 bg-primary text-white rounded  ml-4"
                onPress={handleSubmit(handleFormSubmit)}
                loading={submitLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomTicketPopup;
