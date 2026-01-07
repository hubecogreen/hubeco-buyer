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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling on body and html
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Also prevent scrolling on html element for better mobile support
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

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
        toast.success("Form submitted successfully!");
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden touch-none"
      style={{ touchAction: 'none' }}
    >
      <div className="bg-cream rounded-3xl w-full max-w-[650px] mx-4 my-4 relative overflow-hidden max-h-[95vh] flex flex-col">
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
            className="absolute top-4 right-4 text-white hover:text-brown transition-colors z-10"
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-bold relative z-10 text-center pt-5 pb-5">
            Green Home Loan Financing
          </h2>
        </div>

        {/* Form - Scrollable */}
        <div 
          className="md:px-20 px-8 py-20 overflow-y-auto flex-1 overscroll-contain"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="space-y-6"
            noValidate
          >
            {/* Name */}
            <div>
              <label className="block text-brown font-medium mb-2">
                Name*
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 bg-cream border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
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
              <label className="block text-brown font-medium mb-2 text-sm md:text-base">
                Phone Number*
              </label>
              <div className="flex">
                <div className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-sm sm:text-base">
                  <span className="text-brown">+91</span>
                </div>
                <input
                  type="tel"
                  {...register("phoneNumber")}
                  placeholder="Enter Phone Number"
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-cream border border-gray-300 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm sm:text-base w-[20px]"
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
                className="mt-1 w-4 h-4 bg-cream text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
              />
              <label className="text-sm text-brown leading-relaxed">
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
              className={`w-full bg-primary text-cream py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
                className="h-14 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
