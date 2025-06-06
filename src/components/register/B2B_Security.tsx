// SecurityForm.tsx
import React, { useState } from "react";
import CustomInput from "../customInput/CustomTextField";
import CustomButton from "../customButton/CustomButton";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import useApi from "../Fetcher/useAPI";
import * as getEndpoint from "../../network/EndPoints";
import { useRouter } from "next/navigation";
import { useB2CContext } from "./context";

interface SecurityFormProps {
 
  prevStep: () => void;


}

const securitySchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .test(
      "hasLowercase",
      "Password must contain at least one lowercase letter",
      (value) => /[a-z]/.test(value)
    )
    .test(
      "hasUppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value)
    )
    .test("hasNumber", "Password must contain at least one number", (value) =>
      /\d/.test(value)
    )
    .test(
      "hasSpecialChar",
      "Password must contain at least one special character",
      (value) => /[@$!%*?&]/.test(value)
    )
    .matches(
      /^[A-Za-z\d@$!%*?&]{8,}$/,
      "Password can only contain letters, numbers, and special characters"
    )
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password can be at most 16 characters"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

const B2BSecurity: React.FC<SecurityFormProps> = ({

  prevStep,

}) => {

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(securitySchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {setShippingInfo,setPersonalInfo,setCompanyInfo,setSecurityInfo,setb2bPersonalInfo,setb2bShippingInfo}=useB2CContext()
  const {callApi}=useApi()
  const router =useRouter()
  
  const handleApiError = async (err: any) => {
    const result = err && err.response
   // // console.log('errresult',err)
    if (result.status === 401) {
      toast.error('Unauthorized Request to Set Password')
    } else if (result.status === 400) {
      toast.error('Invalid Request to Set Password')
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Set Password Failed'
      )
    }
  }

  const handleSecuritySubmit = async (data: any) => {
   // // console.log("Security Data:", data);
    setIsLoading(true)
    const payload = {
      currentPassword: "currentPassword123",
      newPassword: data.newPassword,
      logoutFromEverywhere: false,
    };
    try{
      const result =(await callApi(getEndpoint.default.SETPASSWORD,'PATCH',payload))
     // // console.log('setPassresult',result);
     
      toast.success("Password Set Successfully",{iconTheme: {
        primary: '#439787',
        secondary: '#FFFAEE',
      }});
      setShippingInfo({
        address: '',
        city: '',
        state: '',
        postCode: '',
        country: '',
        landmark:'',
        isdefault:false
        })
        setCompanyInfo({
          companyName: '',
          businessType:'',
          gst: '',
          tan: '',
          pan: '',
          companyaddress: '',
          website: "",
        })
        setPersonalInfo({
          email: '',
          mobile: '',
          firstName: '',
          lastName: '',
          displayImage: '',
          privacyPolicy:false,
          tandc:false
        })
        setb2bPersonalInfo({
          email: '',
          mobile: '',
          firstName: '',
          lastName: '',
          displayImage: '',
          privacyPolicy:false,
          tandc:false
        })
      setSecurityInfo({
        password: '',
        confirmPassword:''
      })
      setb2bShippingInfo({
        address: '',
        city: '',
        state: '',
        postCode: '',
        country: '',
        landmark:'',
        isdefault:false
      })
        
      router.push('/welcome')

      


    }catch(e)
    {
      handleApiError(e)
    }finally{
      setIsLoading(false)
    }

  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(handleSecuritySubmit)}>
      <div style={{ display: "flex" }}>
        <div className={"w-3/6 p-5"}>
          <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
            Password <span className="text-red">*</span>
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your Password"
                onChange={onChange}
                value={value}
                type="password"
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                errorMessage={errors.newPassword?.message}
              />
            )}
            name="newPassword"
          />
        </div>
        <div className={"w-3/6 p-5"}>
          <label className="block text-gray-700 mb-2 text-black text-base font-medium text-left">
            Confirm Password <span className="text-red">*</span>
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Confirm your Password"
                onChange={onChange}
                type="password"
                value={value}
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                errorMessage={errors.confirmNewPassword?.message}
              />
            )}
            name="confirmNewPassword"
          />
        </div>
      </div>
      <div className="text-left p-5">
        <h1 className="text-lg pb-3">Password Requirements:</h1>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
          <li className="pb-3 ">
            Minimum 8 characters long - the more, the better
          </li>
          <li className="pb-3 ">
            At least one lowercase and uppercase character
          </li>
          <li className="pb-3 ">
            At least one number or symbol
          </li>
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row justify-start mt-4">
        <CustomButton
          title={"Back"}
          className="ml-3 hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-black "
          customStyles={{ backgroundColor: "#E0E0E0" }}
          onPress={prevStep}
        />
        <CustomButton
          title={"Submit"}
          className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white "
          customStyles={{}}
          //onPress={onSubmit}
           type='submit'
           loading={isLoading}
        />
      </div>
    </form>
  );
};

export default B2BSecurity;
