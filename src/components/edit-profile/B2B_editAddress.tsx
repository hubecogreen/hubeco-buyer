// AddressForm.tsx
'use client'
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../customInput/CustomTextField";
import CustomButton from "../customButton/CustomButton";
// import CustomSelect from "../register/CustomSelect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie, setCookie } from "cookies-next";
import useGetBuyer from "../hooks/useGetBuyer";
import useApi from "../Fetcher/useAPI";
import store from "@/reduxStore";
import toast from "react-hot-toast";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { CircularProgress } from "@chakra-ui/react";
import SkeletonLoader from "./SkeletonPlaceholder";
import useRefreshToken from "../hooks/useRefreshToken";
import { BsExclamationCircle } from "react-icons/bs";
import { MdMyLocation } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

interface AddressFormProps {
  nextStep:()=>void;
}


const addressSchema = yup.object({
  address: yup
    .string()
    .trim("Address cannot have empty spaces at start or end")
    .strict(true)
    .required("Address is required")
    .max(75, "Address must be at most 75 characters"),
  landmark: yup.string().max(20, "Address must be at most 20 characters"),
  city: yup
    .string()
    .trim("City cannot have leading or trailing spaces")
    .strict(true)
    .required("City is required")
    .max(50, "City must be at most 50 characters"),
  state: yup
    .string()
    .trim("State cannot have leading or trailing spaces")
    .strict(true)
    .required("State is required")
    .max(50, "State must be at most 50 characters"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[1-9][0-9]{5}$/, "Pincode must be a valid 6 digit number"),
  country: yup
    .string()
    .trim("Country cannot have leading or trailing spaces")
    .strict(true)
    .required("Country is required")
    .max(50, "Country must be at most 50 characters"),
  // defaultAddress: yup.boolean().oneOf([true], 'You must agree to the terms and conditions').required('This field is required'),
});

const B2B_editAddress: React.FC<AddressFormProps> = ({
nextStep
}) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const { getBuyer } = useGetBuyer();
  const {callApi}=useApi();
  const buyerUserInfo=sessionStorage.getItem('buyerUserInfo') as any;
  const buyerInfo=JSON.parse(buyerUserInfo);
  const businessInfos=buyerInfo?.businessInfo;
 // // console.log('BuyerUserInfosss',buyerInfo);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    trigger,
    formState: { errors, isValid},
    clearErrors,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addressSchema),
    defaultValues: {
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });


  const countriesData=store.getState().masterData.countries;
  const [statesData,setStatesData]=useState<any>([])
  const [citiesData,setCitiesData]=useState<any>([])
  const [isOpen,setIsOpen]= useState<boolean>(false);


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stateValue,setStateValue]= useState<string>('');
  const [countryValue,setCountryValue]= useState<string>('');
  const [cityValue,setCityValue]= useState<string>('');
  const [address,setAddress]= useState<string>('');
  const [landmark,setLandmark]= useState<string>('');
  const [addresses,setAddresses]=useState<any>([])
  const [checked,setChecked]=useState(false)
  const [refresh,setRefresh]=useState<number>(0)
  const [addId,setAddId]=useState<string>('');
  const [deleteId,setDeleteId]=useState<string>('');
  const [lat,setLat]=useState(0)
  const [long,setLong]=useState(0)
  const { refreshTokens } = useRefreshToken()
  const [disableCheck,setDisableCheck]=useState(false)
  const [loading, setLoading] = useState<boolean>(false);
  const router=useRouter()

  const searchParams = useSearchParams();
const tab2 = searchParams.get("redirect")||null;

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
    reset({
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    })
    setAddId('')
  };

  useEffect(() => {
    getAllAddress()
  },[refresh])

  const getAllAddress=async()=>{
    setIsLoading(true)
    try{
    const result =(await callApi(getEndpoint.default.ADDRESSES,'GET'))

   // // console.log('AddresssesResult',result);
   
    if(result.data==null)
      {
        handleApiErrorAll(result?.errorData)
      }else{
setAddresses(result.data)
      }
    }catch(e){
      handleApiErrorAll(e)
    }finally{
      setIsLoading(false)
    }

  }
  const getPincodeData = async (pincode: any) => {

    const res = (await callApi(`pincodeInfo/${pincode}`, 'GET')) as any
  
  
    if (res?.data?.length == 0) {
      return
    }
  
    let state = ''
    let city = ''
    let country=''


  setLat(res?.data[0]?.geometry?.location?.lat)
  setLong(res?.data[0]?.geometry?.location?.lng)
  
    for (const component of res.data[0].address_components) {
      if (component.types.includes('country')) {
        country = component.long_name
       // // console.log('country',component.long_name)  
        onChangeCountry(component.long_name) 
      }
      if (component.types.includes('administrative_area_level_1')) {
        state = component.long_name
       // // console.log('staattette',component.long_name)
        onChangeState(component.long_name) 
      }
      if (component.types.includes('locality')) {
        city = component.long_name
      
        onChangeCity(component.long_name) 
       
      }
    }
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to ensure values are updated

    setValue('city', city);
    setValue('state', state);
    setValue('country', country);
    setValue('pincode', pincode);
    setCityValue(city);
    setStateValue(state)
    // setValue('address',address)
    setValue('landmark',landmark)
    clearErrors('city');
    clearErrors('state');
    clearErrors('country');
  
  
  };


  
    const getCountryCodeByName = (countryName: string) => {
      const country = countriesData.find((c:any) => c.name === countryName) as any;
      return country ? country.code : null; // Return the code if found, otherwise null
    }
  
    const onChangeCountry=(country:any,from?:string)=>{
  
     // // console.log('conchangecoutr',country,from)
  
      if(from=='dropdown'){
        setValue('state','')
        setValue('city','')
      }
     
      const countryCode=getCountryCodeByName(country)
      setValue('country',country)
      setCountryValue(country)
      // handleCountryChange(countryName);
      Webservices.getStatesApi(getEndpoint.default.STATES+'/'+countryCode).then((result:any)=>{
        //// // console.log('states',result?.data[0].states)
        setStatesData(result?.data[0]?.states)
      }).catch((err:any)=>{
       // // console.log(err)
      })
      clearErrors('country')
  
    }

  
  
  
  
    const onChangeState=(state:any,from?:string)=>{
      if(from=='dropdown'){
  
        setValue('city','')
      }
     // // console.log('stateff',state)
      setValue('state',state)
      setStateValue(state)
      Webservices.getCitiesApi(getEndpoint.default.CITIES+'/'+state).then((result:any)=>{
       // // console.log('cities',result?.data)
  setCitiesData(result?.data)
      }).catch((err:any)=>{
       // // console.log(err)
      })
      clearErrors('state')
    }
  
    const onChangeCity = (city: any) => {
 // // console.log('cistsy',city)
      // if (city !== cityValue) {
        setValue('city', city);
        setCityValue(city);
        clearErrors('city');
        trigger('city');
      // }
    };
  
  
    const handleOnKeyUp = (e: any) => {
     // // console.log('handleKeyup',e)
      const inputValue = e;
      if (inputValue === '') {
        setValue('state', '')
        setValue('city', '')
      } else {
        if (e.length === 6) {
          getPincodeData(e)
        }else{
          setValue('state', '')
        setValue('city', '')
        setValue('country', '')
        setStateValue('')
        setCityValue('')
        setCountryValue('')
        }
      }
    };
  
    const handleApiErrorAll = async (err: any) => {

   
      const result = err && err.response
     
     // // console.log('vjnwrkw',result)
     if (result.status === 401) {
      await refreshTokens();
      getAllAddress()
        toast.error('Unauthorized Request to Edit Address')
      } else if (result.status === 400) {
        toast.error('Invalid Request to submit Address')
      }else if (result.status === 404) {
        toast.error('Invalid Request to Edit Address')
      } else {
        toast.error(
          err && err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'Edit Address Failed'
        )
      }
    }
  
    const handleApiError = async (err: any,data:any) => {

   
      const result = err && err.response
     
   
     if (result.status === 401) {
      await refreshTokens();
      handleAddressSubmit(data)

      
        // toast.error('Unauthorized Request to Edit Address')
      } else if (result.status === 400) {
        toast.error('Invalid Request to submit Address')
      }else if (result.status === 404) {
        toast.error('Invalid Request to Edit Address')
      } else {
        toast.error(
          err && err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'Edit Address Failed'
        )
      }
    }

    const handleApiEditError = async (err: any) => {
  
      const result = err && err.response
     
      
     if (result.status === 401) {
        toast.error('Unauthorized Request to Delete Address')
      } else if (result.status === 400) {
        toast.error('Address Not Found',{iconTheme: {
          primary: '#439787',
          secondary: '#FFFAEE',
        }})
      } else {
        toast.error(
          err && err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'Delete Address Failed'
        )
      }
    }
  
  
    const handleAddressSubmit =async (data: any) => {
    
      
      // setIsLoading(true)
  
      const payload = {
        title: "Default",
        address: data.address,
        city: data.city,
        state: data.state,
        postCode: data.pincode,
        country: data.country,
        landmark:data.landmark,
        latitude:lat,
        longitude:long,
        isDefault:addresses.length==0?true: checked,
        contactPersonName:buyerInfo?.firstName+buyerInfo?.lastName,
        contactPersonEmail:buyerInfo?.email,
        contactPersonPhone:buyerInfo?.number,
      };

     // // console.log("Address Data:", payload,addId.length,getValues());

      if(addId.length>0)
        {
         // // console.log('Address Updated',addId)
          try{
            const result =(await callApi(`${getEndpoint.default.UPDATEADDRESS}/${addId}`,'PUT',payload)) as any;       
            if(result.data==null)
              {
                handleApiError(result?.errorData,data)
               
              }else{
                toast.success("Address Updated Successfully",{iconTheme: {
                  primary: '#439787',
                  secondary: '#FFFAEE',
                }});
    
               
                setCookie('addressAdded','true')
                setCookie('currentAddressId',result.data.id)
                reset()
                setRefresh(refresh+1)
                setFormVisible(false)
                setValue('address','')
                setValue('city','')
                setValue('state','')
                setValue('pincode','')
                setValue('country','')
                setChecked(false)
                getBuyer()
                setAddId('')
                // nextStep()
                if(tab2=='quote')
                {
                  router.back()
                }
              }
      
          }catch(e)
          {
     
              handleApiError(e,data)
          }finally{
              setIsLoading(false)
          }
        }
  else{
   // // console.log('Address Added')
  
      try{
        const result =(await callApi(getEndpoint.default.ADDADDRESS,'POST',payload)) as any;
      
        
       
        if(result.data==null)
          {
            handleApiError(result?.errorData,data)
           
          }else{
            toast.success("Address Added Successfully",{iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }});

           
            setCookie('addressAdded','true')
            setCookie('currentAddressId',result.data.id)
            reset()
            setRefresh(refresh+1)
            setFormVisible(false)
            setValue('address','')
            setValue('city','')
            setValue('state','')
            setValue('pincode','')
            setValue('country','')
            setChecked(false)
            getBuyer()
            if(tab2=='quote')
              {
                router.back()
              }
          }
  
      }catch(e)
      {
 
          handleApiError(e,data)
      }finally{
          setIsLoading(false)
      }
    }
  
  
   
    };
  
    const onChangeAddress=(e:any,onChange:any)=>{
     // // console.log('onChangeAddress',e)
      onChange(e)
      setAddress(e)
    }
  
    const onChangeLandmark=(onChange:any,e:any)=>{
     // // console.log('onChangeLandmark',e)
      onChange(e)
      setLandmark(e)
    }

    const deleteAddress=async (id:any)=>{
     
      setIsLoading(true)
      try{
        const result =(await callApi(`${getEndpoint.default.DELETEADDRESS}/${deleteId}`,'DELETE'))
       // // console.log('DeleteAddress',result);
        
       
        if(result.data==null)
          {
            handleApiEditError(result?.errorData)
          }else{
            toast.success("Address Deleted Successfully",{iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }});
            setIsOpen(false)
            setRefresh(refresh+1)
          }
  
      }catch(e)
      {

        handleApiEditError(e)
      }finally{
          setIsLoading(false)
      }
    }




    const onEditAddress=async (address:any)=>{

      
      setAddId(address?.id)
     // // console.log('vwijrej',address);
      if (address?.address.includes("|")) {
       // // console.log('Includes |')
        setValue('address',address?.address.split("|")[0])
        setValue('landmark',address?.address.split("|")[1])

        clearErrors('address')
      }else{
       // // console.log('Does Not Includes |')
      
        setValue('address',address?.address)
        clearErrors('address')
      }
      // getPincodeData(address['postCode'])

      // onChangeCountry(address['country'])
      setValue('pincode',address['postCode'])
    

      
      onChangeState(address['state'])
      onChangeCountry(address['country'])
   
     

      await new Promise(resolve => setTimeout(resolve, 100));

      onChangeCity(address['city'])
      setValue('city',address['city'])
   
      // setValue('country',address['country'])
      
    
  

    
      setChecked(address?.isDefault)
      if(address?.isDefault==true)
      {
        setDisableCheck(true)
      }else{
        setDisableCheck(false)
      }
      setFormVisible(true)
      setRefresh(refresh+1)


      
    }

    const onError=(data:any)=>{
     // // console.log('onErrorData',data)
    }

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            reverseGeocode(latitude, longitude);
          },
          (error) => {
            setLoading(false);
            // // consoleerror("Error getting location:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };
  
    // Reverse Geocode Function using Google Maps API
    const reverseGeocode = async (latitude:any, longitude:any) => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;  // Add this to .env.local
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          fillAddressForm(addressComponents);
         // // console.log('CurrentUserLocation',addressComponents)
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // consoleerror("Error fetching address:", error);
      }
    };
  
    const fillAddressForm =async (addressComponents:any) => {
      const getAddressComponent = (type:any) =>
        addressComponents.find((component:any) =>
          component.types.includes(type)
        )?.long_name || "";

        // console.log('cewvbtnmu',getAddressComponent('administrative_area_level_1'))
  
      setCookie("culcy", getAddressComponent("locality"));
      
      setCookie("culs", getAddressComponent("administrative_area_level_1"));
      setCookie("culc", getAddressComponent("country"));
      setCookie("culp", getAddressComponent("postal_code"));
      setCookie('cula1',getAddressComponent("sublocality_level_2"))
      setCookie('cula2',getAddressComponent("sublocality_level_1"))
      setValue('address',getAddressComponent("sublocality_level_1")+','+getAddressComponent("sublocality_level_2"))

      setValue('pincode',getAddressComponent("postal_code"))
    

      
      // onChangeState(getAddressComponent("administrative_area_level_1"))
      // onChangeCountry(getAddressComponent("country"))
      // onChangeCity(getAddressComponent("locality"))
   
     

      // await new Promise(resolve => setTimeout(resolve, 100));

      // onChangeCity(getAddressComponent("locality"))
      await new Promise((resolve) => setTimeout(resolve, 100));
      onChangeCountry(getAddressComponent("country"));
      await new Promise((resolve) => setTimeout(resolve, 300));
      onChangeState(getAddressComponent("administrative_area_level_1"));
      await new Promise((resolve) => setTimeout(resolve, 500));
      onChangeCity(getAddressComponent("locality"));
      
      setValue('city',getAddressComponent("locality"))
      
   
      // setValue('country',address['country'])
      setRefresh(refresh+1)
    
    };


  return (
    <>
    {isLoading? <SkeletonLoader /> 
    :
    <div>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-2">
        {Array.isArray(addresses) && addresses.map((address, index) => (
             <div key={index} className="border w-full grid rounded   border-slate-300 shadow-sm justify-start text-left p-5  mb-5">
            <div>
          
             
            <p className="text-brown text-md w-full flex leading-6  break-words  break-all">
             {address?.address.includes("|") ? address.address.replace(/\|/g, ', '):address.address},{' '}{address.city},{' '} {address.state}, {' '}{address.country},{' '} {address.postCode}
          
             </p>
             </div>
             <div className="flex justify-between items-center self-end mt-4  space-x-4">
              <div className={`" flex justify-start w-2/3 h-[22px] " ${address.id} ${addId}`}>
               <button
                 onClick={() => onEditAddress(address)}
                 className={`hover:underline font-bold text-primary ${addId === address.id ? "opacity-50" : ""}`}

                 disabled={addId==address.id}
               >
                 Edit
               </button>
               {addresses.length==1?<></>:
              <>
             <span className="text-pink-600 ml-2">|</span>
            
            
             <button
               className={`hover:underline ml-2 font-bold text-secondary ${addId === address.id ? "opacity-50" : ""}`}

               onClick={() => {setIsOpen(true),setDeleteId(address.id)}}
               disabled={addId==address.id}
             >
               Delete
             </button></>}

               <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
        <BsExclamationCircle className="w-full flex justify-center items-center text-center mb-4" color="#B90647"  size={45} />
        <AlertDialogTitle className="text-center pb-5 mb-5">Are you sure you want to Delete Address?</AlertDialogTitle>
       
        </AlertDialogHeader>
        <AlertDialogFooter className="flex sm:justify-center justify-center w-full items-center">
          <AlertDialogCancel onClick={()=>setIsOpen(false)} className="md:h-12 h-8">Cancel</AlertDialogCancel>
          <CustomButton
          title={"Submit"}
          className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-24  w-24 md:text-md text-sm text-white "
          customStyles={{}}
          onPress={() => deleteAddress(address.id)}
           type='submit'
           loading={isLoading}
        />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>

    {
                address.isDefault?(
                <h2 className="text-xs font-normal flex   justify-center mt-1 text-primary w-16 text-center py-0 h-[20px] border border-primary border-solid rounded ">Default</h2>
                ):<></>
              }
             </div>
           </div>
        ))}
       
      </div>

      {/* Button to toggle form visibility */}
      {!isFormVisible && (
        <div>
          <button
            onClick={toggleForm}
            className="block ml-0 bg-primary rounded-md text-white p-3 hover:bg-primary"
          >
            Add New Address
          </button>
        </div>
      )}

      {/* Address Form */}
      {isFormVisible && (
        <>
           <div className='w-full flex justify-start items-center'>
           <Button  className="bg-primary hover:bg-secondary h-[45px] md:h-[45px] md:w-48  w-48 px-2 md:text-md text-sm text-white flex items-center justify-center"  onClick={()=>getCurrentLocation()} >
            {loading?
            <CircularProgress color="#ffffff" size={15} />
            :
            <>
            <MdMyLocation color='white' size={20} className="mr-2" /> Use Current Location
            </>
}
            
            </Button>
          </div>
         <form autoComplete="off" onSubmit={handleSubmit(handleAddressSubmit,onError)}>
           {/* Close Button */}

        
          
         {/* Address Line 1 and Land Mark */}
         {/* <div style={{ display: "flex" }}> */}
         <div className="flex flex-wrap md:flex-nowrap w-full">
             <div className="md:w-3/6 w-full p-5">
               <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
                 Address Line 1 <span className="text-red">*</span>
               </label>
               <Controller
                 name="address"
                 control={control}
                 rules={{ required: "Address Line 1 is required" }}
                 render={({ field: { onChange, value } }) => (
                   <CustomInput
                     placeholder="Enter your Address"
                     onChange={(e)=>{onChangeAddress(e,onChange)}}
                     value={value}
                     isTextArea={false}
                     customStyles={{
                       borderRadius: "5px",
                       
                       color: "black",
                     }}
                     errorMessage={errors.address?.message}
                   />
                 )}
               />
             </div>
     
             <div className="md:w-3/6 w-full p-5">
               <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
                 Land Mark
               </label>
               <Controller
                 name="landmark"
                 control={control}
                 render={({ field: { onChange, value } }) => (
                   <CustomInput
                     placeholder="Enter your Land Mark"
                     onChange={(e)=>{onChangeLandmark(onChange,e)}}
                     value={value}
                     isTextArea={false}
                     customStyles={{
                       borderRadius: "5px",
                       
                       color: "black",
                     }}
                     errorMessage={errors.landmark?.message}
                   />
                 )}
               />
             </div>
           </div>
     
            {/* Pincode and Country */}
            <div className="flex flex-wrap md:flex-nowrap w-full">
             <div className="md:w-3/6 w-full p-5">
               <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
                 Pincode <span className="text-red">*</span>
               </label>
               <Controller
                 name="pincode"
                 control={control}
                 rules={{ required: "Pincode is required" }}
                 render={({ field: { onChange, value } }) => (
                   <CustomInput
                     placeholder="Enter your Pincode"
                     onChange={(e: any) => {
                      // // console.log('eoncha',e)
                       onChange(e);
                       handleOnKeyUp(e);
                     }}
                     // onChange={onChange}
                     value={value}
                     isTextArea={false}
                     
                     customStyles={{
                       borderRadius: "5px",
                       
                       color: "black",
                     }}
                  
                     errorMessage={errors.pincode?.message}
                   />
                 )}
               />
             </div>
     
             <div className="md:w-3/6 w-full p-5">
               <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
                 Country <span className="text-red">*</span>
               </label>
     
     
               <Controller
                 name="country"
                 control={control}
                 rules={{ required: "Country is required" }}
                 render={({ field: { onChange, value } }) => (
           <Select onValueChange={(e)=>{onChangeCountry(e,'dropdown'),onChange(e)}} value={value}  >
             <SelectTrigger className="w-full ">
               <SelectValue className="text-fontGray " placeholder="Select a Country" />
             </SelectTrigger>
             <SelectContent>
               <SelectGroup>
                 <SelectLabel>Country</SelectLabel>
                 {countriesData.map((country:any) => (
                   <SelectItem key={country?.name} value={country.name}>
                     {country.name}
                   </SelectItem>
                 ))}
               </SelectGroup>
             </SelectContent>
           </Select>
             )}
             />
              <div className="text-left justify-left">
           {errors.country && (
              <span className="text-red text-sm mt-1 text-left">
                {errors.country.message}
              </span>
            )}
            </div>
            
             </div>
           </div>
     
           {/* City and State */}
           <div className="flex flex-wrap md:flex-nowrap w-full">
           <div className="md:w-3/6 w-full p-5">
               
               <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
                 State <span className="text-red">*</span>
               </label>
               <Controller
                 name="state"
                 control={control}
                 rules={{ required: "State is required" }}
                 render={({ field: { onChange, value } }) => (
               <Select onValueChange={(e:any)=>{onChangeState(e,'dropdown'),onChange(e)}} value={value}   >
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select a State" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectGroup>
                     <SelectLabel>State</SelectLabel>
                     {Array.isArray(statesData) && statesData.map((state:any) => (
                   <SelectItem key={state?.name} value={state.name}>
                     {state.name}
                   </SelectItem>
                 ))}
                    
                    
                   </SelectGroup>
                 </SelectContent>
               </Select>
                )}
                />
               <div className="text-left justify-left">
                {errors.state && (
                   <span className="text-red text-sm mt-1 text-left">
                     {errors.state.message}
                   </span>
                 )}
                 </div>
             </div>
             <div className="md:w-3/6 w-full p-5">
              
               <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
                 City <span className="text-red">*</span>
               </label>
                <Controller
                 name="city"
                 control={control}
                 rules={{ required: "City is required" }}
                 render={({ field: { onChange, value } }) => ( 
               <Select onValueChange={(e:any)=>{onChangeCity(e),onChange(e)}} value={value} >
                 <SelectTrigger className="w-full">
                   <SelectValue defaultValue={getValues('city')} placeholder="Select a City" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectGroup>
                     <SelectLabel>City</SelectLabel>
                     {Array.isArray(citiesData) && citiesData.map((city:any) => (
                   <SelectItem key={city?.name} value={city.name}>
                     {city.name}
                   </SelectItem>
                 ))}
                   
                   </SelectGroup>
                 </SelectContent>
               </Select>
               )}
               />
            
               <div  className="text-left justify-left">
                {errors.city && (
                   <span className="text-red text-sm mt-1 text-left">
                     {errors.city.message}
                   </span>
                 )}
                 </div>
             </div>
     
            
           </div>
     
          
     
           {/* Save as Default Address Checkbox */}
           <div className="p-5">
            
          
             <div className="flex items-center space-x-2">
             <Checkbox
              id="terms"
              onCheckedChange={(e: any) => setChecked(e)}
              disabled={disableCheck}
              checked={checked}
              className="accent-[#A92449]"
            />

      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Save as Default Address
      </label>
    </div>
           </div>
     
           {/* Buttons */}
           <div className="flex p-5">
           <CustomButton
               title={"Cancel"}
               className="ml-3 bg-cream border border-primary h-12 md:h-12 md:w-36 w-24 md:text-md text-sm text-white"
               customStyles={{color:"#000"}}
              onPress={toggleForm}
             />
           
             <CustomButton
               title={"Submit"}
               className="ml-3 bg-primary hover:bg-secondary h-12 md:h-12 md:w-48 w-24 md:text-md text-sm text-white"
               customStyles={{}}
              // onPress={onSubmit}
               type='submit'
               loading={isLoading}
             />
           </div>
         </form>
         </>
      )}
    </div>
    }
    </>
  );
};

export default B2B_editAddress;
