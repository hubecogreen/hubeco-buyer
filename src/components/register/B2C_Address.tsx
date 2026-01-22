// AddressForm.tsx

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// import CustomSelect from "./CustomSelect"; // Assuming this is your custom select component
import CustomInput from "../customInput/CustomTextField";
import CustomButton from "../customButton/CustomButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import store from "@/reduxStore";
// import { useDispatch } from "react-redux";
import useApi from "../Fetcher/useAPI";
// import { useRouter } from "next/navigation";
import { useB2CContext } from "./context";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie, setCookie } from "cookies-next";
// import data from '../../../public/json/states-of-india.json'
import { Checkbox } from "../ui/checkbox";

interface AddressFormProps {

  prevStep?: () => void;
  nextStep: () => void;

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

const B2CAddress: React.FC<AddressFormProps> = ({

  prevStep,
  nextStep
}) => {


  const { shippingInfo, setShippingInfo } = useB2CContext();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError,
    formState: { errors, isValid },
    clearErrors,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addressSchema),
    defaultValues: {
      address: shippingInfo?.address ?? "",
      landmark: shippingInfo?.landmark ?? "",
      city: shippingInfo?.city ?? "",
      state: shippingInfo?.state ?? "",
      pincode: shippingInfo?.postCode ?? "",
      country: shippingInfo?.country ?? "",
    },
  });

  const countriesData = store.getState().masterData.countries;
  const [statesData, setStatesData] = useState<any>([])
  const [citiesData, setCitiesData] = useState<any>([])



  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stateValue, setStateValue] = useState<string>('');
  const [countryValue, setCountryValue] = useState<string>('');
  const [cityValue, setCityValue] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [checked, setChecked] = useState(false)
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)




  useEffect(() => {
    if (shippingInfo) {
      setValue('address', shippingInfo?.address);
      setValue('landmark', shippingInfo?.landmark);
      setValue('pincode', shippingInfo?.postCode);
      setValue('state', shippingInfo?.state);
      setValue('city', shippingInfo?.city);
      setValue('country', shippingInfo?.country);
      setChecked(shippingInfo?.isdefault)
      setCityValue(shippingInfo?.city)
      setCountryValue(shippingInfo?.country)
      setCityValue(shippingInfo?.city)
      onChangeCountry(shippingInfo?.country)
      onChangeState(shippingInfo?.state)
      onChangeCity(shippingInfo?.city)

      setAddress(shippingInfo?.address);
      setLandmark(shippingInfo?.landmark);
    }

  }, [shippingInfo]);









  const getPincodeData = async (pincode: any) => {

    const res = (await callApi(`pincodeInfo/${pincode}`, 'GET')) as any


    if (res?.data?.length == 0) {
      return
    }

    let state = ''
    let city = ''
    let country = ''

    setLat(res?.data[0]?.geometry?.location?.lat)
    setLong(res?.data[0]?.geometry?.location?.lng)


    for (const component of res.data[0].address_components) {
      if (component.types.includes('country')) {
        country = component.long_name
        // // console.log('country',component.long_name)  
        onChangeCountry(component.long_name)
      } else {
        setError('country', { type: 'custom', message: 'Country is required' })
      }
      if (component.types.includes('administrative_area_level_1')) {
        state = component.long_name
        // // console.log('state',component.long_name)
        onChangeState(component.long_name)
      } else {
        setError('state', { type: 'custom', message: 'State is required' })

      }
      if (component.types.includes('locality')) {
        city = component.long_name
        // // console.log('jvnnvrre',city)
        onChangeCity(component.long_name)

      } else {
        setError('city', { type: 'custom', message: 'City is required' })

      }

    }
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to ensure values are updated

    setValue('city', city);
    setValue('state', state);
    setValue('country', country);
    setValue('pincode', pincode);
    setCityValue(city);
    setStateValue(state)
    setValue('address', address)
    setValue('landmark', landmark)
    clearErrors('city');
    clearErrors('state');
    clearErrors('country');



  };

  const getCountryCodeByName = (countryName: string) => {
    const country = countriesData.find(c => c.name === countryName);
    return country ? country.code : null; // Return the code if found, otherwise null
  }

  const onChangeCountry = (country: any, from?: string) => {

    // // console.log('conchangecoutr',country,from)

    if (from == 'dropdown') {
      setValue('state', '')
      setValue('city', '')
    }

    const countryCode = getCountryCodeByName(country)
    setValue('country', country)
    setCountryValue(country)
    // handleCountryChange(countryName);
    Webservices.getStatesApi(getEndpoint.default.STATES + '/' + countryCode).then((result: any) => {
      //// // console.log('states',result?.data[0].states)
      setStatesData(result?.data[0]?.states)
    }).catch((err: any) => {
      // // console.log(err)
    })
    clearErrors('country')

  }



  const onChangeState = (state: any, from?: string) => {
    if (from == 'dropdown') {

      setValue('city', '')
    }

    setValue('state', state)
    setStateValue(state)
    Webservices.getCitiesApi(getEndpoint.default.CITIES + '/' + state).then((result: any) => {
      // // console.log('cities',result?.data)
      setCitiesData(result?.data)
    }).catch((err: any) => {
      // // console.log(err)
    })


    clearErrors('state')
  }

  const onChangeCity = (city: any) => {
    // console.log('cistsy',city)
    if (city !== cityValue) {
      setValue('city', city);
      setCityValue(city);
      clearErrors('city');
    }
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
      } else {
        setValue('state', '')
        setValue('city', '')
        setValue('country', '')
        setStateValue('')
        setCityValue('')
        setCountryValue('')
      }
    }
  };


  const handleApiError = async (err: any) => {
    const result = err && err.response

    if (result.status === 401) {
      toast.error('Unauthorized Request to Add Address')
    } else if (result.status === 400) {
      toast.error('Invalid Request to submit Address')
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Add Address Failed'
      )
    }
  }


  const handleAddressSubmit = async (data: any) => {
    // // console.log("Address Data:", data,getCookie('addressAdded'));
    setIsLoading(true)

    if (getCookie('addressAdded') == 'true') {
      const payload = {
        title: "Default",
        address: `${data.address}${data.landmark ? '|' + data.landmark : ''}`,
        city: data.city,
        state: data.state,
        postCode: data.pincode,
        country: data.country,
        latitude: lat,
        longitude: long,
        isDefault: checked
      };

      try {
        const result = (await callApi(getEndpoint.default.UPDATEADDRESS + '/' + getCookie('currentAddressId'), 'PUT', payload))



        if (result.data == null) {
          handleApiError(result?.errorData)
        } else {
          toast.success("Address Updated Successfully", {
            iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }
          });

          setCookie('addressAdded', 'true')
          setShippingInfo({
            address: data.address,
            city: data.city,
            state: data.state,
            postCode: data.pincode,
            country: getValues().country,
            landmark: data.landmark,
            isdefault: checked
          })
          nextStep();
        }



      } catch (e) {
        handleApiError(e)
      } finally {
        setIsLoading(false)
      }
    } else {
      const payload = {
        title: "Default",
        address: `${data.address}${data.landmark ? '|' + data.landmark : ''}`,
        city: data.city,
        state: data.state,
        postCode: data.pincode,
        country: data.country,
        // landmark:data.landmark,
        latitude: 12,
        longitude: 13,
        isDefault: checked
      };

      try {
        const result = (await callApi(getEndpoint.default.ADDADDRESS, 'POST', payload))
        // // console.log('AddAddresss',result.data.id,result.data);


        if (result.data == null) {
          handleApiError(result?.errorData)
        } else {
          toast.success("Address Added Successfully", {
            iconTheme: {
              primary: '#439787',
              secondary: '#FFFAEE',
            }
          });

          setCookie('addressAdded', 'true')
          setCookie('currentAddressId', result.data.id)
          setShippingInfo({
            address: data.address,
            city: data.city,
            state: data.state,
            postCode: data.pincode,
            country: getValues().country,
            landmark: data.landmark,
            isdefault: checked
          })
          nextStep();
        }

      } catch (e) {
        handleApiError(e)
      } finally {
        setIsLoading(false)
      }
    }




  };

  const onChangeAddress = (onChange: any, e: any) => {
    // // console.log('onChangeAddress',e)
    onChange(e)
    setAddress(e)
  }

  const onChangeLandmark = (onChange: any, e: any) => {
    // // console.log('onChangeLandmark',e)
    onChange(e)
    setLandmark(e)
  }


  return (
    <form autoComplete="off" onSubmit={handleSubmit(handleAddressSubmit)}>
      {/* Address Line 1 and Land Mark */}
      <div className="flex">
        <div className="w-3/6 p-5">
          <label className="block text-brown mb-2 text-brown text-base font-medium text-left">
            Address Line 1 <span className="text-red">*</span>
          </label>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address Line 1 is required" }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your Address"
                onChange={(e) => { onChangeAddress(onChange, e) }}
                value={value}
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                errorMessage={errors.address?.message}
              />
            )}
          />
        </div>

        <div className="w-3/6 p-5">
          <label className="block text-brown mb-2 text-brown text-base font-medium text-left">
            Land Mark
          </label>
          <Controller
            name="landmark"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your Land Mark"
                onChange={(e) => { onChangeLandmark(onChange, e) }}
                value={value}
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                errorMessage={errors.landmark?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Pincode and Country */}
      <div className="flex">
        <div className="w-3/6 p-5">
          <label className="block text-brown mb-2 text-brown text-base font-medium text-left">
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
                  border: "1px solid #ccc",
                  color: "black",
                }}

                errorMessage={errors.pincode?.message}
              />
            )}
          />
        </div>

        <div className="w-3/6 p-5">
          <label className="block text-brown mb-2 text-brown text-base font-medium text-left">
            Country <span className="text-red">*</span>
          </label>


          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={(e) => { onChangeCountry(e, 'dropdown'), onChange(e) }} value={value}  >
                <SelectTrigger className="w-full">
                  <SelectValue className="text-brown" placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    {countriesData.map((country: any) => (
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
      <div style={{ display: "flex" }}>
        <div className="w-3/6 p-5">

          <label className="block text-brown mb-2 text-brown text-base font-medium text-left">
            State <span className="text-red">*</span>
          </label>
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={(e: any) => { onChangeState(e, 'dropdown'), onChange(e) }} value={value}   >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>State</SelectLabel>
                    {Array.isArray(statesData) && statesData.map((state: any) => (
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
        <div className="w-3/6 p-5">

          <label className="block text-brown mb-2 text-brown text-base font-medium text-left">
            City <span className="text-red">*</span>
          </label>
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={(e: any) => { onChangeCity(e), onChange(e) }} value={value} >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>City</SelectLabel>
                    {Array.isArray(citiesData) && citiesData.map((city: any) => (
                      <SelectItem key={city?.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}

                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <div className="text-left justify-left">
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
          title={"Back"}
          className="ml-3 hover:bg-primary h-12 md:h-12 md:w-48 w-30 md:text-md text-sm text-brown"
          customStyles={{ backgroundColor: "#E0E0E0" }}
          onPress={prevStep}
        />
        <CustomButton
          title={"Save & Continue"}
          className="ml-3 bg-secondary hover:bg-primary h-12 md:h-12 md:w-48 w-30 md:text-md text-sm text-white"
          customStyles={{}}
          // onPress={onSubmit}
          type='submit'
          loading={isLoading}
        />
      </div>
    </form>
  );
};

export default B2CAddress;
