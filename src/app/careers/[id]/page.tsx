"use client";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { jobsData, Job } from "../data/jobsData";
import Link from "next/link";
import Image from "next/image";
type Props = {
  params: {
    id: number;
  };
};

export default function JobDetails({ params }: Props) {
  const job: Job | undefined = jobsData.find(
    (j) => j.id == params.id
  );

  if (!job) return <div>Job not found</div>;
  const [activeTab, setActiveTab] = useState("overview");

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

  return (
    <div>
      <div className="relative md:px-20 px-10 bg-[url('/images/about/aboutBanner1.webp')] bg-cover bg-center h-[200px] flex items-center justify-start text-white">
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

      <section className="w-full flex justify-center bg-cream ">
        <div className="w-full max-w-[1280px] py-[40px]">
          <div className="inline-flex items-center gap-[8px] px-[12px] py-[4px] rounded-full bg-primary/10 w-fit h-[24px]">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span className="text-[12px] tracking-[2px] font-bold uppercase text-primary">
              Hiring Now
            </span>
          </div>

          {/* TOP */}
          <div className="mt-[16px]">

            {/* TITLE */}
            <h1 className="text-[32px] font-semibold leading-[48px] text-brown max-w-[550px]">
              {job.title}
            </h1>

            {/* META + BUTTON ROW */}
            <div className="mt-[16px] flex items-center justify-between">

              {/* LEFT META */}
              <div className="flex items-center gap-[24px] text-[16px] font-medium text-brown max-w-[550px]">

                {/* Location */}
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

                {/* Type */}
                <span className="flex items-center gap-[6px]">
                  <Image
                    src="/images/careers/con3.svg"
                    alt="type"
                    width={12}
                    height={15}
                    className="object-contain"
                  />
                  Product
                </span>



                {/* Experience */}
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

              {/* RIGHT BUTTON + SHARE */}
              <div className="flex items-center gap-[12px] ml-[111.75px]">

                <button
                  onClick={() => {
                    document.getElementById("apply-form")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="w-[260px] h-[48px] px-[32px] py-[12px] bg-primary text-cream rounded-[12px] text-[16px] font-semibold"
                >
                  Apply for this position
                </button>
                <div className="rounded-[12px] flex items-center justify-center">
                  <Image
                    src="/images/careers/share.svg"
                    alt="Share"
                    width={48}
                    height={48}
                  />
                </div>

              </div>
            </div>

            {/* TABS */}
            <div className="mt-[24px] border-b border-primary  font-bold flex gap-[32px] text-[14px]">
              <a
                href="#overview"
                onClick={() => setActiveTab("overview")}
                className={`pb-[8px] ${activeTab === "overview"
                  ? "border-b-2 border-primary text-primary font-medium"
                  : "text-brown"
                  }`}
              >
                Overview
              </a>

              <a
                href="#responsibilities"
                onClick={() => setActiveTab("responsibilities")}
                className={`pb-[8px] ${activeTab === "responsibilities"
                  ? "border-b-2 border-primary text-primary font-medium"
                  : "text-brown"
                  }`}
              >
                Responsibilities
              </a>

              <a
                href="#qualifications"
                onClick={() => setActiveTab("qualifications")}
                className={`pb-[8px] ${activeTab === "qualifications"
                  ? "border-b-2 border-primary text-primary font-medium"
                  : "text-brown"
                  }`}
              >
                Qualifications
              </a>

              <a
                href="#skills"
                onClick={() => setActiveTab("skills")}
                className={`pb-[8px] ${activeTab === "skills"
                  ? "border-b-2 border-primary text-primary font-medium"
                  : "text-brown"
                  }`}
              >
                Skills
              </a>
            </div>

          </div>

          {/* CONTENT */}
          <div className="mt-[32px] max-w-[800px]">

            <div id="overview" className="scroll-mt-[120px]">
              <h2 className="text-[24px] font-semibold mb-[12px]">Job overview</h2>
              <p className="text-[18px] text-brown leading-[22px]">
                {job.overview}
              </p>

            </div>

            <div id="responsibilities" className="scroll-mt-[120px]">
              <h2 className="mt-[24px] text-[24px] font-semibold mb-[12px]">
                Key Responsibilities
              </h2>
              <ul className="space-y-[8px]">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="text-[18px] text-brown">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="qualifications" className="scroll-mt-[120px]">
              <h2 className="mt-[24px] text-[24px] font-semibold mb-[12px]">Requirements</h2>
              <ul className="space-y-[8px]">
                {job.requirements.map((item, i) => (
                  <li key={i} className="text-[18px] text-brown">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="skills" className="scroll-mt-[120px]">
              <h2 className="mt-[24px] text-[24px] font-semibold mb-[12px]">Skills</h2>
              <ul className="space-y-[8px]">
                {job.preferred.map((item, i) => (
                  <li key={i} className="text-[18px] text-brown">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* FORM */}
          <div id="apply-form" className="mt-[40px] w-[704px] border border-primary rounded-[24px] p-[48px] flex flex-col gap-[24px]">

            {/* Heading */}
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-[24px] font-semibold text-brown">
                Apply for this role
              </h3>
              <p className="text-[14px] text-[#5A5A5A]">
                We’re excited to see your work and hear about your journey.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 gap-[16px]">

              <div className="flex flex-col gap-[6px]">
                <label className="text-[12px] text-brown">Full Name *</label>
                <input className="h-[48px] border border-primary rounded-[12px] px-[16px]" placeholder="Jane Doe" />
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[12px] text-brown">Email Address *</label>
                <input className="h-[48px] border border-primary rounded-[12px] px-[16px]" placeholder="jane@example.com" />
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[12px] text-brown">Phone Number</label>
                <input className="h-[48px] border border-primary rounded-[12px] px-[16px]" placeholder="+91 000 000 0000" />
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[12px] text-brown">LinkedIn Profile URL</label>
                <input className="h-[48px] border border-primary rounded-[12px] px-[16px]" placeholder="linkedin.com/in/username" />
              </div>

            </div>

            {/* Upload */}
            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] text-brown">Resume / CV *</label>

              <div className="h-[120px] border border-dashed border-primary rounded-[16px] flex flex-col items-center justify-center text-center gap-[6px]">
                <span className="text-[14px] text-brown font-medium">
                  Upload your resume
                </span>
                <span className="text-[12px] text-brown">
                  PDF, DOCX up to 10MB
                </span>
              </div>
            </div>

            {/* Button */}
            <button className="w-full h-[56px] bg-[#109989] text-white rounded-[12px] text-[16px] font-semibold shadow-[0px_8px_20px_rgba(16,153,137,0.25)]">
              Submit Application
            </button>

          </div>

        </div>
      </section>
    </div>
  );
}