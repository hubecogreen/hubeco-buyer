"use client";
import { Component, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// import { Button } from './ui/button';
import Head from 'next/head';
import Lottie from 'lottie-react';
import animationData from '../../public/animations/failure.json'
import Link from 'next/link';


interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }


  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // consoleerror("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  handleHomeRedirect = () => {
    const router = useRouter();
    router.push('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white">
          <Head>
            <title>Contact Us | Hubeco Buyer</title>
          </Head>
          {/* <Header /> */}
          <div className='flex items-center flex-col text-center bg-white'>
            {/* <img
          alt='error-404-illustration'
          src='/images/error404/error.png'
          className='object-contain h-[250px] md:h-[250px] lg:h-[250px] mb-10 md:mb-8 md:mt-4 lg:mb-20'
        /> */}
            <Lottie animationData={animationData} loop={true} className='w-72 h-72 mx-auto' />

            <div className='flex flex-col gap-2 w-[90vw] sm:w-auto mb-6'>
              {/* <h1 className='font-medium text-8xl text-gray-900'>404</h1> */}
              <h2 className='text-4xl text-[#A92449] font-semibold'>Something went wrong </h2>
              <p className='text-gray-700'>We're sorry for the inconvenience.</p>
            </div>
            <Link  href='/' className='text-primary text-[#439787]'>
              Back To Home
            </Link>

          </div>
          {/* <Footer /> */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
