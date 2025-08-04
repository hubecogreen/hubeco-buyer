import dynamic from 'next/dynamic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Hubeco',
  description: 'The page you are looking for could not be found.',
};

const DynamicCustom404 = dynamic(() => import('@/components/404/page'), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Loading...</p>, // Optional: Loading indicator
});

export default function NotFound() {
  return <DynamicCustom404 />;
}