"use client"

// import styles from './404.module.css';
import Head from 'next/head';
// import Header from '@/components/header/MainHeader';
// import Footer from '@/components/footer/MainFooter';
import dynamic from 'next/dynamic';

const DynamicCustom404 = dynamic(() => import('@/components/404/page'), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Loading...</p>, // Optional: Loading indicator
});

export default function My404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <DynamicCustom404 />
    </>
  );
}


// const Custom404: React.FC = () => {
//   const isClient = useClient()

//   if(!isClient)
//     return <></>
 
//   return (
//     <>
//       <div className="bg-white">
//         <Head>
//           <title>Contact Us | Hubeco Buyer</title>
//         </Head>
        
//         <div className='flex items-center flex-col text-center bg-white'>
//           <div className="w-[400px] h-[400px]">
//             <Lottie animationData={animationData} loop={true} />
//           </div>

//           <div className='flex flex-col gap-2 w-[90vw] sm:w-auto mb-6'>
//             <h2 className='text-4xl text-gray-800 font-semibold'>Page Not Found ⚠️</h2>
//             <p className='text-gray-700'>We couldn&#39;t find the page you are looking for.</p>
//           </div>
          
//           <Link href='/home' className='font-semibold hover:text-primary inline-block bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700'>
//             Back To Home
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Custom404;