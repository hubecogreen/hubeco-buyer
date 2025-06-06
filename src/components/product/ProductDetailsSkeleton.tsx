import { Skeleton } from "../ui/skeleton";

function ProductDetailsSkeleton() {
    return (
      <div className="w-full grid grid-cols-1 gap-2">
        {Array.from({ length: 1 }).map((_, index) => (
          <div
            key={index}
            className="border w-full  rounded border-slate-300 shadow-sm justify-start text-left p-5 mb-5"
          >
            <div className="w-full flex">
              <div className="w-1/2 flex">
                <div className="w-32 ">
                  <Skeleton className="h-24 w-full mb-2" />
                  <Skeleton className="h-24 w-full mb-2" />
                  <Skeleton className="h-24 w-full mb-2" />
                </div>

                <div className="w-[70%] h-[350px] ml-3">
                  <Skeleton className="w-full h-full mb-2" />
                </div>
              </div>
              <div className="w-1/2">
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <div className="flex space-x-8 my-4">
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-8 w-24 mb-2" />
                </div>
                <Skeleton className="h-32 w-full mb-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  export default ProductDetailsSkeleton;