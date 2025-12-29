// SecurityForm.tsx
'use client'
import React, { useEffect, useState } from "react";
import CustomInput from "../customInput/CustomTextField";
import CustomButton from "../customButton/CustomButton";
import toast from "react-hot-toast";
import useApi from "../Fetcher/useAPI";
import * as getEndpoint from "../../network/EndPoints";
// import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "../ui/checkbox";
import useRefreshToken from "../hooks/useRefreshToken";

interface SecurityFormProps {
  prevStep: () => void;
}

const securitySchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current Password is required")
    .min(8, "Password should be of minimum 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
  newPassword: yup
    .string()
    .required("New Password is required")
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

const B2B_changePassword: React.FC<SecurityFormProps> = ({

  prevStep,


}) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0)
  const { callApi } = useApi()
  const { refreshTokens } = useRefreshToken()



  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // useEffect(() => {

  //   setValue('currentPassword', '')
  //   setValue('newPassword', '')
  //   setValue('confirmNewPassword', '')
  //   reset({currentPassword: '',newPassword: '',confirmNewPassword: '',})
  // }, [refresh]);


  const handleApiError = async (err: any) => {
    const result = err && err.response
    // // console.log('errresult',err)
    if (result.status === 401) {
      if (result?.data?.intent == 'INCORRECT_PASSWORD') {
        toast.error('Incorrect Current Password')
      }
      else if (result?.data?.intent == 'SESSION TERMINATED') {
        toast.error('Session Expired.Please Login Again.')
      }
      else {
        toast.error('Unauthorized Request to Set Password')
      }

    } else if (result.status === 400) {
      if (result?.data?.intent == 'PASSWORD_ALREADY_USED') {
        toast.error('New password and current password cannot be same')
      } else {
        toast.error('Invalid Request to Set Password')
      }

    } else if (result.status === 404) {
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
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      logoutFromEverywhere: checked,
    };
    try {
      const result = (await callApi(getEndpoint.default.CHANGE_PASSWORD, 'PATCH', payload))

      if (result.data == null) {
        handleApiError(result?.errorData)
      } else {

        toast.success("Password Updated Successfully", {
          iconTheme: {
            primary: '#439787',
            secondary: '#FFFAEE',
          }
        });




        await refreshTokens();
        prevStep()


      }


    } catch (e) {
      handleApiError(e)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <form autoComplete="off" onSubmit={handleSubmit(handleSecuritySubmit)}>
      {/* <div style={{ display: "flex" }}> */}
      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className={"md:w-3/6 w-full p-5"}>
          <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
            Current Password <span className="text-red">*</span>
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Enter your Current Password"
                onChange={onChange}
                type="password"
                value={value}
                isTextArea={false}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                errorMessage={errors.currentPassword?.message}
              />
            )}
            name="currentPassword"
          />
        </div>
      </div>
      {/* <div style={{ display: "flex" }}> */}
      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className={"md:w-3/6 w-full p-5"}>
          <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
            New Password <span className="text-red">*</span>
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
        <div className={"md:w-3/6 w-full p-5"}>
          <label className="block text-gray-700 mb-2 text-brown text-base font-medium text-left">
            Confirm Password <span className="text-red">*</span>
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Confirm your Password"
                onChange={onChange}
                value={value}
                type="password"
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
      <div className="flex items-center space-x-2 ml-5 my-2">
        <Checkbox
          id="terms"
          onCheckedChange={(e: any) => setChecked(e)}
          checked={checked}
          className="accent-[#A92449]"
        />

        <label
          htmlFor="terms"
          className="md:text-sm text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Logout from Everywhere
        </label>
      </div>
      <div className="text-left p-5 md:text-lg text-xs">
        <h1 className="md:text-lg pb-3">Password Requirements:</h1>
        <ul className="list-disc pl-5">

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
          title={"Save Changes"}
          className="ml-3 bg-primary hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white "
          customStyles={{}}
          //onPress={onSubmit}
          type='submit'
          loading={isLoading}
        />
      </div>
    </form>
  );
};

export default B2B_changePassword;