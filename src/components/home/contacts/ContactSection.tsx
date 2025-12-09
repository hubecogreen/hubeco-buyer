"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
        } else {
          alert("Failed to send message");
        }
        setLoading(false);
      })
      .catch(() => {
        alert("Something went wrong");
        setLoading(false);
      });
  };
  // Reopen form after success
    useEffect(() => {
      if (isSubmitted) {
        const timer = setTimeout(() => {
          setIsSubmitted(false); // reopen form automatically
        }, 4000);

        return () => clearTimeout(timer);
      }
    }, [isSubmitted]);

  return (
    <section
      className="w-full flex justify-center py-10 font-[Poppins]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-[1200px] w-full flex flex-col md:flex-row h-[963.63px]">
        {/* LEFT IMAGE */}
        <div className="w-[550px] h-[963.63px] flex-shrink-0">
          <img
            src="/images/contacts/image.png"
            alt="contact"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT FORM SECTION */}
        <div
          className="
            w-full md:w-[650px]
            h-[963.63px]
            flex flex-col gap-[22px]
            text-white
            px-[50px] py-[50px]
            bg-gradient-to-br from-[#109989] to-[#084A42]
          "
        >
          {/* Heading */}
          <h2
            className="
              w-[550px]
              text-white
              font-semibold
              text-[36px]
              leading-[1em]
            "
          >
            Let’s Build Sustainably Together
          </h2>

          <p className="w-[550px] text-white text-[25px] leading-[1em] font-normal">
            Reach out for certified materials, partnerships and RFQ’s
          </p>

          {!isSubmitted ? (
            <>
              {/* NAME */}
              <label className="text-[19px] font-medium mt-[10px]">Name</label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Jane Smith"
                    className="
                      w-[572px] h-[63px] px-[19px] py-[15px]
                      bg-transparent text-black placeholder:text-white/40
                      text-[22.1px] font-medium rounded-[10px]
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
              <label className="text-[19px] font-medium mt-[10px]">Email</label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="jane@framer.com"
                    className="
                      w-[572px] h-[63px] px-[19px] py-[15px]
                      bg-transparent text-black placeholder:text-white/40
                      text-[22.1px] font-medium rounded-[10px]
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
              <label className="text-[19px] font-medium mt-[10px]">
                Phone No
              </label>
              <Controller
                control={control}
                name="mobile"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="9876543210"
                    className="
                      w-[572px] h-[63px] px-[19px] py-[15px]
                      bg-transparent text-black placeholder:text-white/40
                      text-[22.1px] font-medium rounded-[10px]
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
              <label className="text-[19px] font-medium mt-[10px]">
                Message
              </label>
              <Controller
                control={control}
                name="message"
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Your message..."
                    className="
                      w-[572px] h-[189px] p-[18px]
                      bg-transparent text-black placeholder:text-white/40
                      text-[22.1px] font-medium rounded-[10px]
                      border border-transparent border-b-white
                      hover:border-white focus:border-white focus:outline-none
                      transition-all resize-none
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
                  group w-[572px] h-[63px] rounded-[10px] mt-[20px]
                  bg-[linear-gradient(129deg,#F0FDFA_-23%,#109989_24%)]
                  text-white text-[25px] font-normal
                  relative overflow-hidden transition-all duration-600
                  hover:shadow-[0px_6px_14px_rgba(0,0,0,0.25)]
                "
              >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:left-[60px] transition-all">
                  {loading ? "Sending..." : "Submit"}
                </span>

                <span
                  className="
                    absolute right-[20px] top-1/2 -translate-y-1/2
                    opacity-0 group-hover:opacity-100
                    translate-x-3 group-hover:translate-x-0
                    transition-all
                  "
                >
                  →
                </span>
              </button>
            </>
          ) : (
            <h3 className="text-white text-3xl mt-10">
              Thank you! Message sent.
            </h3>
          )}
        </div>
      </div>
    </section>
  );
};





export default ContactSection;
