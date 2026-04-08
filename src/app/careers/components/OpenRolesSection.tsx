"use client";

import { useRouter } from "next/navigation";
import { jobsData, Job } from "../data/jobsData";
import Image from "next/image";

export default function OpenRoles() {
  const router = useRouter();

  return (
    <section id="open-roles" className="flex w-full justify-center bg-cream">
      <div className="w-full max-w-[1280px] px-5 lg:py-[40px] py-[20px] sm:px-6 lg:px-[24px]">
        <h2 className="max-w-[1193px] text-start lg:text-center text-[30px] font-bold leading-[1.15] text-brown sm:text-[36px] lg:text-[45px] lg:leading-[48px]">
          Open Roles in Sustainable Construction, Procurement & Climate Tech
        </h2>

       <p className="mt-[12px] max-w-[700px] text-start text-[18px] leading-[26px] text-brown md:text-start lg:mx-auto lg:text-center lg:text-[18px] lg:leading-[28px]">
  We are hiring across product, engineering, sustainability and business
  functions to scale India’s leading green construction marketplace.
</p>

        <div className=" mt-[24px] lg:mt-[32px] flex flex-col gap-[16px]">
          {jobsData.map((job: Job) => (
            <div
              key={job.id}
              className="flex w-full flex-col gap-6 rounded-[24px] border border-primary p-5  sm:p-6 lg:h-[270px] lg:w-[1232px] lg:flex-row lg:justify-between lg:p-[40px]"
            >
              <div className="flex flex-1 flex-col justify-between gap-5">
                <div>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <span className="text-[12px] font-semibold tracking-wide text-primary">
                        {job.category.toUpperCase()}
                      </span>

                      <h3 className="mt-[4.5px] text-[20px] font-semibold text-brown lg:text-[22px]">
                        {job.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-[8px]">
                      <span className="rounded-full bg-primary/10 px-[10px] py-[4px] text-[11px] font-bold uppercase text-primary">
                        {job.type}
                      </span>

                      <span className="rounded-full bg-primary/10 px-[10px] py-[4px] text-[11px] font-bold uppercase text-primary">
                        HYBRID
                      </span>
                    </div>
                  </div>

                  <p className="mt-[12px] text-[18px] leading-[24px] text-brown lg:text-[18px] lg:leading-[22px]">
                    {job.shortDescription}
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="mt-[8px] flex flex-wrap items-center gap-x-[16px] gap-y-2 text-[14px] font-medium text-brown">
                    <div className="flex items-center gap-[6px]">
                      <img src="/images/careers/con1.svg" alt="Location" className="h-[12px] w-[9px]" />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center gap-[6px]">
                      <img src="/images/careers/container4.svg" alt="Experience" className="h-[11px] w-[11px]" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <div className=" flex justify-end">
                    <button
                      onClick={() => router.push(`/careers/${job.id}`)}
                      className="text-[16px] font-semibold text-primary hover:underline flex justify-end"
                    >
                      Apply Now 
                      <Image alt="arrow" src="/images/careers/right-arrow.svg" width={16} height={16} className="ml-[6px] md:hidden block" />
                       <Image alt="arrow" src="/images/careers/right-arrow.svg" width={20} height={20} className="ml-[6px] md:block hidden" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
