import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CartLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white shadow rounded-lg p-4 sm:py-6 sm:px-4">
          <div className="bg-[#F4F4F4] w-full h-14 mb-4 rounded" />
          
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col sm:flex-row items-center py-4 border-b">
              <div className="flex items-center space-x-4 w-full sm:w-[45%]">
                <Skeleton className="h-20 w-20 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              
              <div className="w-full sm:w-[15%] mt-2 sm:mt-0">
                <Skeleton className="h-4 w-16" />
              </div>
              
              <div className="w-full sm:w-[15%] mt-2 sm:mt-0">
                <Skeleton className="h-8 w-24" />
              </div>
              
              <div className="w-full sm:w-[15%] mt-2 sm:mt-0">
                <Skeleton className="h-4 w-20" />
              </div>
              
              <div className="w-full sm:w-[10%] mt-2 sm:mt-0">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white shadow rounded-lg p-6">
          {/* Shipping Calculator Header */}
          <Skeleton className="h-12 w-full mb-4" />
          
          <div className="space-y-3 mb-6">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
          
          <Skeleton className="h-12 w-full mb-4" />
          <div className="space-y-4 p-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-24 w-full" />
          </div>
          
          <div className="mt-6">
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLoadingSkeleton;