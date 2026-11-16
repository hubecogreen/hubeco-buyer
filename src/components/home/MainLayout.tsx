"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/footer/MainFooter";
import Header from "@/components/header/MainHeader";
import NetworkStatusToast from "@/components/network-status/NetworkStatusToast";
import PrivateRoute from "@/components/PrivateRouter";
import MeDetails from "@/reduxStore/Compo";
import { RootProvider } from "@/reduxStore/customProvider";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import useClient from "../hooks/useClient";
import { useEffect, useState } from "react";
import SubmitEnquiryModal from "../modals/SubmitEnquiryModal";
import BottomNavigation from "@/components/navigation/BottomNavigation";

// Chakra (about 250 KB) is only needed by inner pages, not the home page.
const ChakraShell = dynamic(() => import("./ChakraShell"), { ssr: false });

const MainLayout = ({
  children,
  isProd,
}: {
  children: React.ReactNode;
  isProd: boolean;
}) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [boqMode, setBoqMode] = useState(false);
  const isHome = usePathname() === "/";

  const openEnquiryModal = () => {
    setBoqMode(false);
    setShowEnquiryModal(true);
  };

  const openBoqModal = () => {
    setBoqMode(true);
    setShowEnquiryModal(true);
  };

  const closeEnquiryModal = () => {
    setShowEnquiryModal(false);
    setBoqMode(false)
  };

  useEffect(() => {
    const handleOpenBoqModal = () => {
      openBoqModal();
    };

    window.addEventListener("hubeco:open-boq-modal", handleOpenBoqModal);

    return () => {
      window.removeEventListener(
        "hubeco:open-boq-modal",
        handleOpenBoqModal
      );
    };
  }, []);
  
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
            <Header onSubmitEnquiry={openEnquiryModal} />
            <div className="mt-[79px] bg-cream">
              <NetworkStatusToast />
              <PrivateRoute>
                {isHome ? children : <ChakraShell>{children}</ChakraShell>}
              </PrivateRoute>
            </div>
            <BottomNavigation onSubmitEnquiry={openEnquiryModal} />
            <SubmitEnquiryModal
              open={showEnquiryModal}
              onClose={closeEnquiryModal}
              product={null}
              mode="form"
              boqMode={boqMode}
            />
            <Footer />
          </MeDetails>
        </RootProvider>
        {/* <ToastContainer /> */}
      </ErrorBoundary>
    </>
  );
};

export default MainLayout;
