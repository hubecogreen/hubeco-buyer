import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Hubeco',
  description: 'The page you are looking for could not be found.',
};

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 