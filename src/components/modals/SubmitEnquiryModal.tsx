"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { normalizePath } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import CustomInput from "../customInput/CustomTextField";
import CustomButton from "../customButton/CustomButton";
import { toast } from "react-hot-toast";
import * as getEndpoint from "../../network/EndPoints";
import useApi from "../Fetcher/useAPI";


type EnquiryFormValues = {
    name: string;
    phone: string;
    email: string;
    requirement: string;
};

export default function SubmitEnquiryModal({
    open,
    onClose,
    product,
    mode,
    initialQuantity,
}: {
    open: boolean;
    onClose: () => void;
    product: any;
    mode: "proceed" | "form" | null;
    initialQuantity?: number;
}) {
    const { callApi } = useApi();
    // ✅ normalize product for both Card & Details page
    const resolvedProduct = product?.product ?? product;

    const productName =
        resolvedProduct?.productName &&
            resolvedProduct?.productName !== "N/A"
            ? resolvedProduct.productName
            : resolvedProduct?.variantName ||
            resolvedProduct?.name ||
            "Unnamed Product";

    const productImage =
        resolvedProduct?.image || // ProductCard
        resolvedProduct?.thumbnail || // safety
        resolvedProduct?.variants?.[0]?.thumbnail || // Details page
        resolvedProduct?.variants?.[0]?.images?.[0] || // Details page fallback
        "";


    const router = useRouter();
    const [step, setStep] = useState<"proceed" | "form" | "success">("proceed");
    const [quantity, setQuantity] = useState(initialQuantity ?? 1);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EnquiryFormValues>({
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            requirement: "",
        },
    });

    useEffect(() => {
        if (mode) {
            setStep(mode);
        }
    }, [mode]);

    useEffect(() => {
        if (open) {
            setQuantity(initialQuantity ?? 1);
        }
    }, [open, initialQuantity]);

    if (!open) return null;

    const handleClose = () => {
        reset();
        setQuantity(1);
        setStep("proceed");
        onClose();
    };

    const onSubmit = async (data: EnquiryFormValues) => {
        const payload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            requirement: data.requirement,
            products: [
                {
                    variantId: resolvedProduct?._id || resolvedProduct?.variantId,
                    quantity: quantity,
                },
            ],
        };

        try {
            const result = await callApi(
                getEndpoint.default.GUEST_ENQUIRY,
                "POST",
                payload
            );

            if (result.data == null) {
                toast.error("Failed to submit enquiry");
                return;
            }

            toast.success("Enquiry submitted successfully");
            setStep("success");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
                className="
          bg-[#FFFEF8]
          rounded-[12px]
          shadow-[0px_25px_50px_-12px_#00000040]
          w-[358px]
          sm:w-[500px]
          lg:w-[500px]
          max-w-[672px]
          
          overflow-hidden
          flex flex-col
        "
            >
                <div className="flex flex-col h-full p-6">
                    {/* ================= PROCEED POPUP ================= */}
                    {step === "proceed" && (
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-start">
                                <h2 className="text-lg font-semibold text-brown">
                                    How would you like to proceed?
                                </h2>
                                <button onClick={handleClose}>✕</button>
                            </div>

                            <CustomButton
                                title="Submit an Enquiry"
                                onPress={() => setStep("form")}
                                className="bg-primary text-white"
                            />

                            <CustomButton
                                title="Login / Register"
                                onPress={() => router.push("/login")}
                                className="border border-primary text-primary bg-cream"
                            />
                        </div>
                    )}
                    {/* ================= SUCCESS POPUP ================= */}
                    {step === "success" && (
                        <div
                            className="
                                    flex flex-col items-center  text-center
                                    
                                       
                                    ">
                            {/* CLOSE */}
                            <div className="w-full flex justify-end">
                                <button onClick={handleClose} className="text-gray-500 text-xl">
                                    ✕
                                </button>
                            </div>

                            {/* ICON */}
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#E6F4F1]">
                                <svg
                                    width="36"
                                    height="36"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#109989"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[30px] font-bold text-black">Thank You!</h2>
                                <p className="text-[#667085] text-sm sm:text-base">
                                    Your enquiry has been submitted successfully.
                                    <br />
                                    Our team will contact you within 24 hours.
                                </p>
                            </div>

                            {/* BUTTON */}
                            <CustomButton
                                title="Explore Products"
                                onPress={() => {
                                    handleClose();
                                    router.push("/products");
                                }}
                                className="w-full bg-primary text-white mt-[32px]"
                            />
                        </div>
                    )}
                    
                    {/* ================= ENQUIRY FORM ================= */}
                    {step === "form" && (
                        <div className="flex flex-col h-full max-h-[75vh] md:max-h-[90vh] overflow-hidden"> {/* Container for the whole form view */}

                            {/* FIXED HEADER */}
                            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                                <h2 className="text-lg font-semibold">Submit an Enquiry</h2>
                                <button onClick={handleClose}>
                                    <X size={18} />
                                </button>
                            </div>

                            {/* SCROLLABLE BODY */}
                            <form
                                noValidate
                                className="flex flex-col flex-1 overflow-hidden" // Main form wrapper
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="flex-1 overflow-y-auto pr-2 scrollbar">
                                    {/* Inside here are the scrolling elements. 
                   The padding-right (pr-2) prevents the scrollbar from overlapping content. 
                */}

                                    {/* PRODUCT + QUANTITY (Now inside scroll area) */}
                                    <div className="flex items-center justify-between mb-6 lg:mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-[50px] h-[50px] rounded-[10px] overflow-hidden border">
                                                <Image
                                                    src={productImage ? normalizePath(`${process.env.NEXT_PUBLIC_ASSET_URL}/${productImage}`) : "/images/product-placeholder.webp"}
                                                    alt={productName}
                                                    width={50}
                                                    height={50}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <p className="font-medium text-brown">{productName}</p>
                                        </div>

                                        <div className="flex items-center border border-primary rounded-md overflow-hidden">
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-pink-600 text-lg"
                                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            > − </button>
                                            <span className="px-4 py-2 border-x">{quantity}</span>
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-pink-600 text-lg"
                                                onClick={() => setQuantity((q) => q + 1)}
                                            > + </button>
                                        </div>
                                    </div>

                                    {/* FORM FIELDS */}
                                    <div className="flex flex-col gap-4 lg:gap-3 pb-4">
                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{ required: "Name is required" }}
                                            render={({ field }) => (
                                                <CustomInput
                                                    label="Name*"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    errorMessage={errors.name?.message}
                                                    inputClassNames="h-[48px]"
                                                    placeholder=""
                                                />
                                            )}
                                        />

                                        <Controller
                                            name="phone"
                                            control={control}
                                            rules={{ required: "Phone number is required" }}
                                            render={({ field }) => (
                                                <CustomInput
                                                    label="Phone Number*"
                                                    placeholder="Enter Phone Number"
                                                    prefix="+91"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    errorMessage={errors.phone?.message}
                                                    isMobileInput
                                                    customStyles={{ height: "48px" }}
                                                />
                                            )}
                                        />

                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <CustomInput
                                                    label="Email"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    type="email"
                                                    inputClassNames="h-[48px]"
                                                    placeholder=""
                                                />
                                            )}
                                        />

                                        <Controller
                                            name="requirement"
                                            control={control}
                                            rules={{ required: "Requirement is required" }}
                                            render={({ field }) => (
                                                <CustomInput
                                                    label="Requirement*"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    errorMessage={errors.requirement?.message}
                                                    isTextArea
                                                    numberOfLines={4}
                                                    inputClassNames="min-h-[120px]"
                                                    placeholder=""
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* FIXED FOOTER BUTTONS */}
                                <div className="flex gap-4 pt-4 mt-auto  bg-[#FFFEF8] flex-shrink-0">
                                    <CustomButton
                                        title="Cancel"
                                        onPress={handleClose}
                                        className="w-1/2 border border-primary text-primary bg-cream"
                                    />
                                    <CustomButton
                                        title="Submit Enquiry"
                                        type="submit"
                                        className="w-1/2 bg-primary text-white"
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
