"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/footer/MainFooter";
import Header from "@/components/header/MainHeader";
import PrivateRoute from "@/components/PrivateRouter";
import MeDetails from "@/reduxStore/Compo";
import { RootProvider } from "@/reduxStore/customProvider";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import useClient from "../hooks/useClient";




const MainLayout = ({
  children,
  isProd,
}: {
  children: React.ReactNode;
  isProd: boolean;
}) => {

  const isClient = useClient()

  if(!isClient)
    return <></>


  return (
    <>
      <ErrorBoundary>
        <Toaster
          position={"top-right"}
          toastOptions={{ className: "react-hot-toast abosolute mt-16 " }}
        />
        <RootProvider>
          <MeDetails>
            <ChakraProvider>
              <Header />
              <div className="mt-[128px]">
                <PrivateRoute>{children}</PrivateRoute>
              </div>
              <Footer />
            </ChakraProvider>
          </MeDetails>
        </RootProvider>
        {/* <ToastContainer /> */}
      </ErrorBoundary>
    </>
  );
};

export default MainLayout;
