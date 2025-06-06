// Adjust import based on your actual import path

import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="border w-full grid rounded border-slate-300 shadow-sm justify-start text-left p-5 mb-5"
        >
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex justify-end self-end mt-4 space-x-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
