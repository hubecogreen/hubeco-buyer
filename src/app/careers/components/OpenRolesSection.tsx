"use client";

import { useRouter } from "next/navigation";
import { jobsData, Job } from "../data/jobsData";

export default function OpenRoles() {
  const router = useRouter();

  return (
    <section className="w-full flex justify-center bg-cream">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1280px] h-[659.5px] py-[40px] px-[24px]">

        {/* HEADING */}
        <h2 className="text-[45px] leading-[48px] font-bold text-brown max-w-[1193px]">
          Open Roles in Sustainable Construction, Procurement & Climate Tech
        </h2>

        {/* SUBTEXT */}
        <p className="mt-[12px] text-[18px] leading-[28px] text-brown max-w-[700px]">
          We are hiring across product, engineering, sustainability, and business
          functions to scale India’s leading green construction marketplace.
        </p>

        {/* JOB LIST */}
        <div className="mt-[32px] flex flex-col gap-[16px]">

          {jobsData.map((job: Job) => (
            <div
              key={job.id}
              className="w-[1232px] h-[270px] border border-[#109989] rounded-[24px] p-[40px] backdrop-blur-[12px] flex justify-between"
            >

              {/* LEFT SIDE */}
              <div className="flex flex-col justify-between">

                {/* TOP CONTENT */}
                <div>

                  {/* CATEGORY */}
                  <div className="flex justify-between items-center">
                  <div>
                  <span className="text-[12px] font-semibold text-primary tracking-wide">
                    {job.category.toUpperCase()}
                  </span>

                  {/* TITLE */}

                  <h3 className="mt-[4.5px] text-[22px] font-semibold text-brown">
                    {job.title}
                  </h3>
                  </div>
                    <div className="flex gap-[8px]">

                  <span className="text-[11px] px-[10px] py-[4px]  bg-primary/10 text-primary uppercase rounded-full font-bold">
                    {job.type}
                  </span>

                  {/* OPTIONAL (if you add later in JSON) */}
                  <span className="text-[11px] px-[10px] py-[4px]  bg-primary/10 text-primary uppercase rounded-full font-bold">
                    HYBRID
                  </span>

                </div>
                </div>

                  {/* DESCRIPTION */}
                  <p className="mt-[12px] text-[18px] leading-[22px] text-brown max-w-auto">
                    {job.shortDescription}
                  </p>

                  {/* EXTRA MANUAL LINE (as you requested) */}
                  {/* <p className="mt-[8px] text-[13px] text-[#5A5A5A]">
                    A {job.location} Role · {job.experience}
                  </p> */}

                </div>

                {/* BOTTOM META */}
                <div className="flex justify-between items-center">
                <div className="flex items-center gap-[16px] mt-[16px] font-bold text-[13px] text-brown">
                  <span>📍 {job.location}</span>
                  
                  <span><span>•</span>{job.experience}</span>
                </div>

                <div> <button
                  onClick={() => router.push(`/careers/${job.id}`)}
                  className="text-primary font-semibold text-[14px] hover:underline"
                >
                  Apply Now →
                </button>
                </div>
                </div>

              </div>

             

            </div>
          ))}

        </div>

        {/* BOTTOM TEXT */}
        <div className="mt-[32px] text-center">

          <p className="text-[18px] text-brown">
            Don’t see a role that fits? Join our talent network and help build India’s largest sustainable construction ecosystem.
          </p>

          <p className="mt-[23.5px] text-primary font-semibold text-[18px] cursor-pointer">
            Send a general application →
          </p>

        </div>

      </div>
    </section>
  );
}