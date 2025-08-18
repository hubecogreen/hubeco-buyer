"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

interface GreenHomeLoanFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Fixed Yup validation schema
const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .test(
      "no-multiple-spaces",
      "Double spaces are not allowed",
      (value: any) => value && !/\s{2,}/.test(value)
    ),
  phoneNumber: yup
    .string()
    .required("Phone Number is required"),
  agreedToTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
});

type FormData = yup.InferType<typeof schema>;

export default function GreenHomeLoanForm({
  isOpen,
  onClose,
}: GreenHomeLoanFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      agreedToTerms: false,
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  const handleSubmitForm = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/greenHomeLoan/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            phoneNumber: `+91${data.phoneNumber}`,
          }),
        }
      );

      if (res.ok) {
        toast.success("Application submitted successfully!");
        reset();
        onClose();
      } else {
        const errorData = await res.json();
        toast.error(
          errorData.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    clearErrors();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-[650px] mx-4 my-8 relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div
          className="relative px-6 py-8 text-white flex-shrink-0"
          style={{
            backgroundImage: "url('/images/greenFinance/Form-BG.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0  bg-opacity-30" />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-bold relative z-10 text-center pt-5 pb-5">
            Green Home Loan Financing
          </h2>
        </div>

        {/* Form - Scrollable */}
        <div className="px-20 py-20 overflow-y-auto flex-1">
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="space-y-6"
            noValidate
          >
            {/* Name */}
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Name*
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                required
              />
              {errors.name && (
                <p className="text-red text-xs mt-1 font-small">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Phone Number*
              </label>
              <div className="flex">
                <div className="flex items-center px-4 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                  <span className="text-gray-600">+91</span>
                </div>
                <input
                  type="tel"
                  {...register("phoneNumber")}
                  placeholder="Enter Phone Number"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red text-xs mt-1 font-small">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                {...register("agreedToTerms")}
                className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
              />
              <label className="text-sm text-gray-600 leading-relaxed">
                I agree to Hubeco{" "}
                <Link
                  href="/green-financing-terms-of-use"
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  href="/green-financing-privacy-policy"
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreedToTerms && (
              <p className="text-red text-xs mt-1 font-small">
                {errors.agreedToTerms.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#b90e47] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#a00d3f]"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {/* Logo */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <img
                src="/images/Logo-2.webp"
                alt="Hubeco Logo"
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
