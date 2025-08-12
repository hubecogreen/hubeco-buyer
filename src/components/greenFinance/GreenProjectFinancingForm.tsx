"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import * as yup from "yup";
import { validGSTStateCodes } from "@/lib/commondata";

interface GreenProjectFinancingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const gstSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  gstin: yup
    .string()
    .required("GST is required")
    .matches(/^[0-9A-Za-z]*$/, "Special Characters are not allowed")
    .test("valid-state-code", "Invalid state code in GST", (value) =>
      value ? validGSTStateCodes.includes(value.substring(0, 2)) : false
    )
    .test(
      "no-multiple-spaces",
      "Double spaces are not allowed",
      (value) => !/\s{2,}/.test(value || "")
    )
    .matches(
      /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9]{1}[zZ]{1}[0-9A-Z]{1}$/,
      "GST format is invalid."
    )
    .trim("GST cannot have empty space at the start or end"),
  agreedToTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms to continue"),
});

export default function GreenProjectFinancingForm({
  isOpen,
  onClose,
}: GreenProjectFinancingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    gstin: "",
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await gstSchema.validate(formData, { abortEarly: false });

      setLoading(true);
      const res = await fetch(
        "https://api-uat.hubeco.market/greenProjectFinancing/apply",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phoneNumber: `+91${formData.phoneNumber}`,
            gstNumber: formData.gstin,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      alert("Application submitted successfully!");
      setFormData({
        name: "",
        phoneNumber: "",
        gstin: "",
        agreedToTerms: false,
      });
      onClose();
    } catch (err: any) {
      if (err.name === "ValidationError") {
        alert(err.errors.join("\n"));
      } else {
        alert(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl w-full max-w-[650px] mx-4 relative overflow-hidden">
        {/* Header */}
        <div
          className="relative px-6 py-8 text-white"
          style={{
            backgroundImage: "url('/images/greenFinance/Green BG.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-bold relative z-10 text-center pt-5 pb-5">
            Green Project Financing
          </h2>
        </div>

        {/* Form */}
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            {/* Phone Number */}
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
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Phone Number"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none"
                />
              </div>
            </div>

            {/* GSTIN */}
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                GSTIN*
              </label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                placeholder="Enter GSTIN"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-600 leading-relaxed">
                I agree to Hubeco{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b90e47] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#a00d3f] transition-all duration-200"
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
