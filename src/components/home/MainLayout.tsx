"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/footer/MainFooter";
import Header from "@/components/header/MainHeader";
import NetworkStatusToast from "@/components/network-status/NetworkStatusToast";
import PrivateRoute from "@/components/PrivateRouter";
import MeDetails from "@/reduxStore/Compo";
import { RootProvider } from "@/reduxStore/customProvider";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import useClient from "../hooks/useClient";
import { useState } from "react";
import SubmitEnquiryModal from "../modals/SubmitEnquiryModal";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const MainLayout = ({
  children,
  isProd,
}: {
  children: React.ReactNode;
  isProd: boolean;
}) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const openEnquiryModal = () => {
    setShowEnquiryModal(true);
  };

  const closeEnquiryModal = () => {
    setShowEnquiryModal(false);
  };
  const isClient = useClient();

  if (!isClient) return <></>;

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
              <Header onSubmitEnquiry={openEnquiryModal}/>
              <div className="mt-[79px] bg-cream">
                <NetworkStatusToast />
                <PrivateRoute>{children}</PrivateRoute>
              </div>
              <BottomNavigation onSubmitEnquiry={openEnquiryModal}/>
              <SubmitEnquiryModal
                open={showEnquiryModal}
                onClose={closeEnquiryModal}
                product={null}
                mode="form"
              />
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
