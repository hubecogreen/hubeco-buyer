// MeDetails.tsx (or .jsx)
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import store from './index'
import * as Webservices from "../network/WebServices";
import * as getEndpoint from "../network/EndPoints";
import { setUser } from './slices/userSlice';
import { saveCountries } from './slices/masterDataSlice';
import useGetBuyer from '@/components/hooks/useGetBuyer';
import { getCookie } from 'cookies-next';


const MeDetails: React.FC<{ children: React.ReactNode }> = ({ children }) => {


const token=getCookie('token');
const dispatch=useDispatch();
const {getBuyer}=useGetBuyer()


//// // console.log('buyerInfo',getBuyer(token))

// const countriesData=store.getState().masterData.countries;

useEffect(() => {
    // getMe()
    getBuyer(token)
    getCountries()
       
      }, []);
    
      // const getMe=()=>{
      //   Webservices.callGetApi(getEndpoint.default.AUTH_ME+'/Buyer', token)
      //   .then((result) => {
      //    // // console.log("ME--", result.data);
    
      //     if (result.status === 200) {
      //      dispatch(setUser(result?.data))
      //       // router.push('/thankyou-page');
      //     } else {
        
      //     }
      //     // clearFormFields();
      //   })
      //   .catch((err) => {
      //    // // console.log("err", err);
          
      //   });
      // }

      const getCountries=()=>{
        Webservices.callGetApi(getEndpoint.default.COUNTRIES,'').then((result:any)=>{
          dispatch(saveCountries(result.data))
    
        }).catch((err:any)=>{
         // // console.log('err',err)
        })
      }

    return <>{children}</>;
};

export default MeDetails;
