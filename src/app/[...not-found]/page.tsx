import dynamic from 'next/dynamic';

const DynamicCustom404 = dynamic(() => import('@/components/404/page'), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Loading...</p>, // Optional: Loading indicator
});

export default function NotFound() {
  return <DynamicCustom404 />;
}