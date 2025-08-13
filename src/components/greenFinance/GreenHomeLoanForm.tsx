"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

interface GreenHomeLoanFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GreenHomeLoanForm({
  isOpen,
  onClose,
}: GreenHomeLoanFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
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

    if (!formData.name || !formData.phoneNumber || !formData.agreedToTerms) {
      alert("Please fill all fields and agree to terms");
      return;
    }

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
            name: formData.name,
            phoneNumber: `+91${formData.phoneNumber}`,
          }),
        }
      );

      if (res.ok) {
        alert("Application submitted successfully!");
        setFormData({ name: "", phoneNumber: "", agreedToTerms: false });
        onClose();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please check your connection.");
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
            Green Home Loan Financing
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                required
              />
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
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Phone Number"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
              />
              <label className="text-sm text-gray-600 leading-relaxed">
                I agree to Hubeco{" "}
                <Link href="/termsOf-Use" className="text-blue-600 underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacyPolicy" className="text-blue-600 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

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
