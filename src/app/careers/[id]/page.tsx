"use client";

import { useEffect, useRef, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import CustomButton from "@/components/customButton/CustomButton";
import CustomInput from "@/components/customInput/CustomTextField";
import { jobsData, Job } from "../data/jobsData";

type Props = {
  params: {
    id: number;
  };
};

type CareerApplicationFormValues = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
};

export default function JobDetails({ params }: Props) {
  const job: Job | undefined = jobsData.find((j) => j.id == params.id);
  const [activeTab, setActiveTab] = useState("overview");
  const [formResetKey, setFormResetKey] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeTouched, setResumeTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerApplicationFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
    },
  });

  useEffect(() => {
    const sections = ["overview", "responsibilities", "qualifications", "skills"];

    const handleScroll = () => {
      let current = "overview";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 150) {
            current = id;
          }
        }
      });

      setActiveTab(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!job) return <div>Job not found</div>;

  const onSubmit = async (data: CareerApplicationFormValues) => {
    setResumeTouched(true);

    if (!resumeFile) {
      toast.error("Please upload your resume to apply.");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", data.name);
    formData.append("email", data.email);
    formData.append("phone_number", `+91${data.phone}`);
    formData.append("profile_url", data.linkedin);
    formData.append("resume", resumeFile);
    formData.append("job_title", job.title);

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/careers/apply`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to submit application";

        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage;
        } catch {
          // Keep fallback message when response isn't JSON.
        }

        throw new Error(errorMessage);
      }

      toast.success("Application submitted successfully!");
      reset();
      setResumeFile(null);
      setResumeFileName("");
      setResumeTouched(false);
      setFormResetKey((prev) => prev + 1);

      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="relative flex h-[160px] items-center justify-start bg-[url('/images/about/aboutBanner1.webp')] bg-cover bg-center px-4 text-white sm:px-6 lg:h-[200px] lg:px-20">
        <Link
          href="/"
          className="text-white flex items-center no-underline px-2.5 py-1 rounded"
        >
          <AiFillHome size={16} className="text-white mr-1.5" />
          Home
        </Link>

        <span className="text-white mx-2">/</span>
        <Link
          href="/careers"
          className="text-white no-underline px-2.5 py-1 rounded"
        >
          Careers
        </Link>
      </div>

      <section className="flex w-full justify-center bg-cream">
        <div className="w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:py-[40px]">
          <div className="inline-flex h-[24px] w-fit items-center gap-[8px] rounded-full bg-primary/10 px-[12px] py-[4px]">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span className="text-[12px] tracking-[2px] font-bold uppercase text-primary">
              Hiring Now
            </span>
          </div>

          <div className="mt-[16px]">
            <h1 className="max-w-full text-[28px] font-semibold leading-[1.2] text-brown sm:text-[30px] lg:max-w-[550px] lg:text-[32px] lg:leading-[48px]">
              {job.title}
            </h1>

            <div className="mt-[16px] flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-full flex-row flex-wrap  gap-3 text-[14px] font-medium text-brown sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:max-w-[550px] lg:gap-[24px] lg:text-[16px]">
                <span className="flex items-center gap-[6px]">
                  <Image
                    src="/images/careers/con1.svg"
                    alt="location"
                    width={12}
                    height={15}
                    className="object-contain"
                  />
                  {job.location}
                </span>

                {/* <span className="flex items-center gap-[6px]">
                  <Image
                    src="/images/careers/con3.svg"
                    alt="type"
                    width={12}
                    height={15}
                    className="object-contain"
                  />
                  Product
                </span> */}

                <span className="flex items-center gap-[6px]">
                  <Image
                    src="/images/careers/con2.svg"
                    alt="experience"
                    width={12}
                    height={15}
                    className="object-contain"
                  />
                  {job.type}
                </span>
              </div>

              <div className="flex w-full items-center gap-3 lg:ml-[111.75px] lg:w-auto lg:gap-[12px]">
                <CustomButton
                  title="Apply for this position"
                  onPress={() => {
                    const formSection = document.getElementById("apply-form");

                    if (!formSection) return;

                    const headerOffset = 120;
                    const elementTop =
                      formSection.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                      top: Math.max(elementTop - headerOffset, 0),
                      behavior: "smooth",
                    });
                  }}
                  className="h-[48px] w-full rounded-[12px] bg-primary text-[15px] font-semibold text-cream sm:w-[260px] lg:text-[16px]"
                />
                {/* <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px]">
                  <Image
                    src="/images/careers/share.svg"
                    alt="Share"
                    width={48}
                    height={48}
                  />
                </div> */}
              </div>
            </div>

            {/* <div className="mt-[24px] flex gap-5 overflow-x-auto border-b border-primary text-[13px] font-bold whitespace-nowrap lg:gap-[32px] lg:text-[14px]">
              <a
                href="#overview"
                onClick={() => setActiveTab("overview")}
                className={`pb-[8px] ${
                  activeTab === "overview"
                    ? "border-b-2 border-primary text-primary font-medium"
                    : "text-brown"
                }`}
              >
                Overview
              </a>

              <a
                href="#responsibilities"
                onClick={() => setActiveTab("responsibilities")}
                className={`pb-[8px] ${
                  activeTab === "responsibilities"
                    ? "border-b-2 border-primary text-primary font-medium"
                    : "text-brown"
                }`}
              >
                Responsibilities
              </a>

              <a
                href="#qualifications"
                onClick={() => setActiveTab("qualifications")}
                className={`pb-[8px] ${
                  activeTab === "qualifications"
                    ? "border-b-2 border-primary text-primary font-medium"
                    : "text-brown"
                }`}
              >
                Qualifications
              </a>

              <a
                href="#skills"
                onClick={() => setActiveTab("skills")}
                className={`pb-[8px] ${
                  activeTab === "skills"
                    ? "border-b-2 border-primary text-primary font-medium"
                    : "text-brown"
                }`}
              >
                Skills
              </a>
            </div> */}

          </div>
          <div className="w-full h-[0.5px] bg-primary mt-[20px]"></div>

          <div className="mt-[16px] max-w-full lg:max-w-[950px]">
            
            <div id="overview" className="scroll-mt-[100px] lg:scroll-mt-[120px]">
              <h2 className="mb-[12px] text-[22px] font-semibold lg:text-[24px]">
                Job overview
              </h2>
              <p className="text-[16px] leading-7 text-brown lg:text-[18px] lg:leading-[22px]">
                {job.overview}
              </p>
            </div>

            <div id="responsibilities" className="scroll-mt-[100px] lg:scroll-mt-[120px]">
              <h2 className="mt-[24px] mb-[12px] text-[22px] font-semibold lg:text-[24px]">
                Key Responsibilities
              </h2>
              <ul className="space-y-[8px]">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="text-[16px] leading-7 text-brown lg:text-[18px]">
                    {"\u2022"} {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="qualifications" className="scroll-mt-[100px] lg:scroll-mt-[120px]">
              <h2 className="mt-[24px] mb-[12px] text-[22px] font-semibold lg:text-[24px]">
               Requirement
              </h2>
              <ul className="space-y-[8px]">
                {job.requirements.map((item, i) => (
                  <li key={i} className="text-[16px] leading-7 text-brown lg:text-[18px]">
                    {"\u2022"} {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="skills" className="scroll-mt-[100px] lg:scroll-mt-[120px]">
              <h2 className="mt-[24px] mb-[12px] text-[22px] font-semibold lg:text-[24px]">
                Skills
              </h2>
              <ul className="space-y-[8px]">
                {job.preferred.map((item, i) => (
                  <li key={i} className="text-[16px] leading-7 text-brown lg:text-[18px]">
                    {"\u2022"} {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form
            key={formResetKey}
            id="apply-form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="mt-[40px] flex w-full max-w-full flex-col gap-[24px] rounded-[20px] border border-primary p-5 sm:p-6 lg:w-[704px] lg:rounded-[24px] lg:p-[48px]"
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-[24px] font-semibold text-brown">
                Apply for this role
              </h3>
              <p className="text-[14px] text-[#5A5A5A]">
                We&apos;re excited to see your work and hear about your journey.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              <div className="">
                <label className="text-[12px] text-brown font-bold pb-[8.5px]">Full Name *</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <CustomInput
                      placeholder="Enter Full Name"
                      value={field.value}
                      onChange={field.onChange}
                      errorMessage={errors.name?.message}
                      inputClassNames="h-[48px] px-[13px] py-[16px]"
                    />
                  )}
                />
              </div>

{/* 
                <div className=" ">
                          <label className="block text-brown mb-2 text-brown text-base font-medium">
                            Name <span className="text-red">*</span>
                          </label>
                          <Controller
                                            rules={{ required: "Name is required" }}

                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <CustomInput
                                placeholder="Enter Name"
                                onChange={onChange}
                                value={value}
                                customStyles={{
                                  // backgroundColor: "#F3F3F3",
                                  borderRadius: "5px",
                                  // width: "500px",
                                }}
                                extraClassnames="custom-input"
                                errorMessage={errors.name?.message}
                              />
                            )}
                            name="name"
                          />
                        </div> */}

              <div className="">
                <label className="text-[12px] text-brown font-bold pb-[6px]">Email Address *</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  }}
                  render={({ field }) => (
                    <CustomInput
                      placeholder="Enter Email Address"
                      value={field.value}
                      onChange={field.onChange}
                      errorMessage={errors.email?.message}
                      type="email"
                      inputClassNames="h-[48px] px-[13px] py-[16px]"
                    />
                  )}
                />
              </div>

              <div className="">
                <label className="text-[12px] text-brown font-bold pb-[6px]">Phone Number *</label>
                <Controller
                  name="phone"
                  control={control}
             rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <CustomInput
                      placeholder="Enter Phone Number"
                      
                      prefix="+91"
                      value={field.value}
                      onChange={field.onChange}
                      errorMessage={errors.phone?.message}
                      isMobileInput
                      inputClassNames="h-[48px] px-[13px] py-[16px]"
                    />
                  )}
                />
              </div>

              <div className="">
                <label className="text-[12px] text-brown font-bold pb-[6px]">LinkedIn Profile *</label>
                <Controller
                  name="linkedin"
                  control={control}
                  rules={{required:"LinkedIn url is Required"}}
                  render={({ field }) => (
                    <CustomInput
                      placeholder="linkedin.com/in/username"
                      value={field.value}
                      onChange={field.onChange}
                        errorMessage={errors.linkedin?.message}
                      inputClassNames="h-[48px] px-[13px] py-[16px]"
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] text-brown font-bold pb-[6px]">Resume / CV *</label>
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setResumeTouched(true);
                  setResumeFile(file);
                  setResumeFileName(file?.name ?? "");
                }}
              />
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="h-[120px] border border-dashed border-primary rounded-[16px] flex flex-col items-center justify-center text-center gap-[6px] bg-cream"
              >
                <span className={`text-[14px] underline underline-blue font-medium ${resumeTouched && !resumeFileName ? "text-red" : "text-brown "}`}>
                  {resumeFileName || "Upload your resume"}
                </span>
                <span className="text-[12px] text-brown">PDF, DOCX up to 10MB</span>
              </button>
              {resumeTouched && !resumeFileName && (
                <p className="w-full text-sm mt-1 text-left text-[#d22525]">
                  Please upload your resume to apply.
                </p>
              )}
            </div>

            <CustomButton
              title="Submit Application"
              type="submit"
              loading={isSubmitting}
              className="w-full h-[56px] bg-primary text-white rounded-[12px] text-[16px] font-semibold shadow-[0px_8px_20px_rgba(16,153,137,0.25)]"
            />
          </form>
        </div>
      </section>
    </div>
  );
}
