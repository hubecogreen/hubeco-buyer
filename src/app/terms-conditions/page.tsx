"use client";

import React, { CSSProperties, useEffect, useState } from "react";
// import Footer from "@/components/footer/MainFooter";
import Markdown from "react-markdown";
// import Header from "@/components/header/MainHeader";
import * as Webservices from "../../network/WebServices";
import remarkGfm from "remark-gfm";
import * as getEndpoint from "../../network/EndPoints";
import { AiFillHome } from "react-icons/ai";
import Head from "next/head";
import { CircularProgress } from "@chakra-ui/react";
import Link from "next/link";

export default function Page() {
  const [tandc, settandc] = useState<string | undefined>();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Webservices.callGetApi(
      getEndpoint.default.POLICIES +
        "?policyType=Terms%20and%20Conditions&userType=Buyer",
      ""
    )
      .then((d: any) => {
        // // console.log("data", d);
        settandc(d.data.content);
      })
      .catch((err) => {
        // // console.log("err", err);
      });
  };

  const markdownStyles: { [key: string]: CSSProperties } = {
    h1: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    p: {
      marginBottom: "1rem",
    },
    ul: {
      listStyleType: "disc",
      marginLeft: "1.5rem",
    },
    li: {
      marginBottom: "0.5rem",
    },
    strong: {
      fontWeight: "bold",
    },
  };

  return (
    <div className="bg-white">
      <Head>
        <title>Terms & Conditions | Hubeco Buyer</title>
      </Head>
      {/* <Header /> */}
      <div className="banner-section h-102">
        <div
          className="md:px-20 px-10 relative bg-cover bg-center h-[200px] flex items-center justify-start text-white"
          style={{
            backgroundImage: 'url("images/about/aboutBanner1.png")',
          }}
        >
          <Link
            href="/"
            className="text-white flex items-center no-underline px-2.5 py-1.5 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>
          <span className="text-white mx-2">/</span>
          <Link
            href="#"
            className="text-white no-underline px-2.5 py-1.5 rounded"
          >
            Terms of Use
          </Link>
        </div>
        <div className="bg-secondaryBg w-full">
          <div className="py-12 px-4 lg:px-20 mx-auto max-w-[100%] pb-0">
            {/* <h1 className="text-base font-bold mb-4 mt-4 text-black">
              Hubeco Terms And Conditions
            </h1> */}
          </div>
          <div className="py-12 px-4 lg:px-20 mx-auto max-w-[100%] pt-0 text-sm font-normal text-black tracking-wide leading-8">
            {tandc ? (
              <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-semibold" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-base leading-relaxed" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-5" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-base" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold" {...props} />
                ),
              }}
            >
            
                {tandc}
              </Markdown>
            ) : (
              <CircularProgress isIndeterminate color="#A92449" />
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
