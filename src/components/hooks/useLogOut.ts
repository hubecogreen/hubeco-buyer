import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { deleteCookie } from 'cookies-next';
import { toast } from 'react-hot-toast';
import useApi from '../Fetcher/useAPI';
import { saveRefreshToken, saveToken, setUser } from '@/reduxStore/slices/userSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const { callApi } = useApi();
  const router = useRouter();

  const handleUserLogout = async (from = 'login') => {
   // // console.log('handleUserLogout called with from:', from); // Debugging log

    try {
      const res = (await callApi('/auth/logout', 'POST')) as any;
     // // console.log('Logout API response:', res); // Debugging log

      dispatch(saveToken(''));
      dispatch(saveRefreshToken(''));
      dispatch(setUser(''));
      deleteCookie('token');

      if (from === 'register') {
       // // console.log('Returning early due to "register" flow'); // Debugging log
        return;
      }

      if (!res.error) {
        toast.success(from === 'terminated' ? 'Session timeout, please log in again' : 'Logout Successful');
      } else {
        toast.error('Logout Failed');
      }

      router.push('/login');
     // // console.log('Navigating to /login'); // Debugging log

    } catch (error: any) {
      // consoleerror('Logout error:', error);
      
      if (from !== 'register') {
        toast.error('An error occurred during logout.');
        router.push('/login');
       // // console.log('Navigating to /login after error'); // Debugging log
      }
    }
  };

  return { handleUserLogout };
};

