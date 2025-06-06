import { ReactNode, createContext, useContext, useState } from "react";

// Define the type for your context state
interface B2CContextState {
  personalInfo: {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    displayImage:string
    privacyPolicy:boolean
    tandc:boolean
  };
  setPersonalInfo: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      mobile: string;
      email: string;
      displayImage:string
      privacyPolicy:boolean
      tandc:boolean
    }>
  >;
  shippingInfo: {
    address: string;
    landmark: string;
    city: string;
    state: string;
    postCode: string;
    country: string;  
    isdefault:boolean
  };
  setShippingInfo: React.Dispatch<
    React.SetStateAction<{
      address: string;
      landmark: string;
      city: string;
      state: string;
      postCode: string;
      country: string;
      isdefault:boolean
    }>
  >;
  b2bpersonalInfo: {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    displayImage:string
    privacyPolicy:boolean
    tandc:boolean
  };
  setb2bPersonalInfo: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      mobile: string;
      email: string;
      displayImage:string
      privacyPolicy:boolean
      tandc:boolean
    }>
  >;
  companyInfo: {
    companyName: string;
    businessType: string;
    gst: string;
    tan: string;
    pan:string;
    companyaddress:string;
    website:string
  };
  setCompanyInfo: React.Dispatch<
    React.SetStateAction<{
      companyName: string;
      businessType: string;
      gst: string;
      tan: string;
      pan:string;
      companyaddress:string;
      website:string
    }>
  >;
  b2bshippingInfo: {
    address: string;
    landmark: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
    isdefault:boolean
  };
  setb2bShippingInfo: React.Dispatch<
    React.SetStateAction<{
      address: string;
      landmark: string;
      city: string;
      state: string;
      postCode: string;
      country: string;
      isdefault:boolean
    }>
  >;
  securityInfo: {
    password: string;
    confirmPassword: string;
  };
  setSecurityInfo: React.Dispatch<
  React.SetStateAction<{
    password: string;
    confirmPassword: string; 
  }>
>;
}

// Create the context with a generic type
const B2CContext = createContext<B2CContextState | undefined>(undefined);

// Create a provider component
export const B2CContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    displayImage:'',
    privacyPolicy:false,
    tandc:false
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    landmark: "",
    city: "",
    state: "",
    postCode: "",
    country: "",
    isdefault:false
  });

  const [b2bpersonalInfo, setb2bPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    displayImage:'',
    privacyPolicy:false,
    tandc:false
  });

  const [b2bshippingInfo, setb2bShippingInfo] = useState({
    address: "",
    landmark: "",
    city: "",
    state: "",
    postCode: "",
    country: "",
    isdefault:false
  })  

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    businessType: "",
    gst: "",
    tan: "",
    pan:'',
    companyaddress:'',
    website:''
  })

  const [securityInfo, setSecurityInfo] = useState({
    password: "",
    confirmPassword: "",
  })


  return (
    <B2CContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        shippingInfo,
        setShippingInfo,
        b2bpersonalInfo,
        setb2bPersonalInfo,
        b2bshippingInfo,
        setb2bShippingInfo,
        companyInfo,
        setCompanyInfo,
        securityInfo,
        setSecurityInfo
      }}
    >
      {children}
    </B2CContext.Provider>
  );
};

// Custom hook to use the B2CContext
export const useB2CContext = (): B2CContextState => {
  const context = useContext(B2CContext);
  if (!context) {
    throw new Error("useB2CContext must be used within a B2CContextProvider");
  }
  return context;
  
};
