"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { getCookie } from "cookies-next";
import * as Webservices from "../../../network/WebServices";
import * as getEndpoint from "../../../network/EndPoints";

const schema = yup.object({
  name: yup.string().required("Name is required").min(3).max(75),
  email: yup.string().required("Email is required").email("Invalid email"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),
  message: yup.string().required("Message is required").max(1000),
});

const ContactSection: React.FC = () => {
  const token = getCookie("token");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    setLoading(true);

    const payload = {
      name: data.name,
      email: data.email,
      mobile: `+91${data.mobile}`,
      subject: "Contact Section",
      message: data.message,
    };

    Webservices.callPostApi(getEndpoint.default.CONTACTUS, payload, token)
      .then((res) => {
        if (res.status === 201) {
          setIsSubmitted(true);
          reset();
        } else alert("Failed to send message");
        setLoading(false);
      })
      .catch(() => {
        alert("Something went wrong");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => setIsSubmitted(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <section
      className="w-full flex justify-center pt-10 p-[8px] font-[Poppins]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-[1200px] w-full flex flex-col lg:flex-row">

        {/* LEFT IMAGE */}
        <div className="hidden lg:block lg:flex-1 relative">
          <Image
            src="/images/contacts/image.png"
            alt="contact"
            className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
            width={100}
            height={100}
          />
        </div>

        {/* RIGHT FORM */}
        <div
          className="
    w-full
    flex flex-col
    gap-[12px]
    p-[20px]
    text-center
    lg:text-start
    lg:flex-1
    lg:gap-[22px]
    lg:px-[50px] lg:py-[50px]

    text-white
    bg-gradient-to-br from-[#109989] to-[#084A42]
    rounded-lg lg:rounded-r-lg lg:rounded-l-none
  "
        >
          {/* Heading */}
          <h2 className="text-[28px] lg:text-[36px] font-semibold leading-tight">
            Let’s Build Sustainably Together
          </h2>

          <p className="text-[15px] lg:text-[20px] leading-tight">
            Reach out for certified materials,<br className ="lg:hidden"/> partnerships and RFQ’s
          </p>

          {!isSubmitted ? (
            <>
              {/* NAME */}
              <label className="hidden lg:block text-[16px] lg:text-[19px] font-medium mt-2">
                Name
              </label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter Name"
                    className="
                      w-full lg:w-[572px] h-[55px] lg:h-[63px]
                      px-[15px] lg:px-[19px]
                      bg-transparent  placeholder:text-white/40
                      text-[18px] lg:text-[22px] font-medium rounded-[10px]
                      border border-transparent border-b-white
                      hover:border-white focus:border-white focus:outline-none
                      transition-all
                    "
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-300 text-sm">{errors.name.message}</p>
              )}

              {/* EMAIL */}
              <label className="hidden lg:block text-[16px] lg:text-[19px] font-medium mt-2">
                Email
              </label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter Email"
                    className="
                      w-full lg:w-[572px] h-[55px] lg:h-[63px]
                      px-[15px] lg:px-[19px]
                      bg-transparent  placeholder:text-white/40
                      text-[18px] lg:text-[22px] font-medium rounded-[10px]
                      border border-transparent border-b-white
                      hover:border-white focus:border-white focus:outline-none
                      transition-all
                    "
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-300 text-sm">{errors.email.message}</p>
              )}

              {/* PHONE */}
              <label className="hidden lg:block text-[16px] lg:text-[19px] font-medium mt-2">
                Phone No
              </label>
              <Controller
                control={control}
                name="mobile"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter Phone Number"
                    className="
                      w-full lg:w-[572px] h-[55px] lg:h-[63px]
                      px-[15px] lg:px-[19px]
                      bg-transparent  placeholder:text-white/40
                      text-[18px] lg:text-[22px] font-medium rounded-[10px]
                      border border-transparent border-b-white
                      hover:border-white focus:border-white focus:outline-none
                      transition-all
                    "
                  />
                )}
              />
              {errors.mobile && (
                <p className="text-red-300 text-sm">{errors.mobile.message}</p>
              )}

              {/* MESSAGE */}
              <label className="hidden lg:block text-[16px] lg:text-[19px] font-medium mt-2">
                Message
              </label>
              <Controller
                control={control}
                name="message"
                render={({ field }) => (
                  <textarea
  {...field}
  placeholder="Write Your Message Here..."
  className="
    w-full lg:w-[572px]
    h-[55px] lg:h-[63px]
    px-[15px] lg:px-[19px]
    bg-transparent placeholder:text-white/40
    text-[18px] lg:text-[22px] font-medium rounded-[10px]
    border border-transparent border-b-white
    hover:border-white focus:border-white focus:outline-none
    transition-all
    resize-none
  "
/>
                )}
              />
              {errors.message && (
                <p className="text-red-300 text-sm">{errors.message.message}</p>
              )}

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleSubmit(onSubmit)}
                className="
                  group w-[200px] lg:w-[572px] h-[60px] lg:h-[63px] rounded-[10px] mt-[20px] p-[20px]
                  mx-auto lg:mx-0
                  bg-[linear-gradient(129deg,#F0FDFA_-23%,#109989_24%)]
                  text-white text-[20px] lg:text-[25px] font-normal
                  relative overflow-hidden transition-all duration-600
                  hover:shadow-[0px_6px_14px_rgba(0,0,0,0.25)]
                "
              >
                <span className="absolute left-1/2 top-1/2 
                  -translate-x-1/2 -translate-y-1/2 
                  group-hover:left-[40px] lg:group-hover:left-[60px]
                  transition-all"
                >
                  {loading ? "Sending..." : "Submit"}
                </span>

                <span
                  className="
                    absolute right-[15px] lg:right-[20px] top-1/2 -translate-y-1/2
                    opacity-0 group-hover:opacity-100
                    translate-x-3 group-hover:translate-x-0
                    transition-all
                  "
                >
                  <Image
                    src="/images/home/howitwork/white-arrao-icon.png"
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </span>
              </button>
            </>
          ) : (
            <h3 className="text-white text-2xl lg:text-3xl mt-10">
              Thank you! Message sent.
            </h3>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
