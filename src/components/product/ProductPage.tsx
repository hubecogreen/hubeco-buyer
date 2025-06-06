"use client";
import { CircularProgress } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ProductDetails from '@/components/product/ProductDetails'

const ProductPreview = (params:any) => {

  const [slug, setSlug] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = getQueryParams();
    setProductName(params.product_name || '');
    setSlug(getSlug());
    setLoading(false);
  }, []);

if(loading) return <CircularProgress />

  return (
    <div>
      {(productName.length==0 && slug.length!==0) && <ProductDetails slug={slug} />}
    </div>
  );
};

const getQueryParams = (): { [key: string]: string } => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const params: { [key: string]: string } = {};
    urlParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }
  return {};
};

const getSlug = (): string => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    return path.split('/').pop() || '';
  }
  return '';
};

export default ProductPreview;
