"use client";
 
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import useApi from "@/components/Fetcher/useAPI";
import toast from "react-hot-toast";
import * as getEndpoint from "../../../network/EndPoints";
import { useRouter } from "next/navigation";
// import { set } from "lodash";

const PriceRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    min: number;
    max: number;
    step: number;
    value?: [number, number];
    onValueChange: (value: [number, number]) => void;
    refresh: any;
  }
>(
  (
    {
      className,
      min,
      max,
      step,
      value, // [minValue, maxValue]
      onValueChange,
      refresh,
      ...props
    },
    ref
  ) => {
    const [range, setRange] = React.useState<[number, number]>(
      value || [min, max]
    );
    const { callApi } = useApi();
    const [minPrice, setMinPrice] = React.useState<number>(min);
    const [maxPrice, setMaxPrice] = React.useState<number>(max);
    const [timeoutID, setTimeoutID] = React.useState<NodeJS.Timeout>();
    const router = useRouter();
 
    React.useEffect(() => {
      getFilters();
    }, [refresh]);
 
    const handleApiError = async (err: any) => {
      const result = err?.response;
      toast.error(
        result?.data?.message || result?.status === 400
          ? "Buyer Not Found"
          : result?.status === 404
          ? "Invalid Request"
          : "Request Failed"
      );
    };
 
    const getFilters = async () => {
      try {
        const result = (await callApi(
          getEndpoint.default.FLITERS,
          "GET"
        )) as any;
        if (result.data) {
          const lowestAmount = result?.data[1]?.data[0]?.lowestAmount || min;
          const highestAmount = result?.data[1]?.data[0]?.highestAmount || max;
          setMinPrice(lowestAmount);
          setMaxPrice(highestAmount);
          setRange([lowestAmount, highestAmount]);
          onValueChange([lowestAmount, highestAmount]);
        } else {
          handleApiError(result.errorData);
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    const handleSliderChange = (newRange: [number, number]) => {
      setRange(newRange);
      onValueChange(newRange);
    };
 
    const handleInputChange = (
      index: number,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const inputValue = event.target.value;
      if (!/^\d*$/.test(inputValue)) return;

      const newValue = inputValue ? parseInt(inputValue, 10) : 0;
      clearTimeout(timeoutID);
      setTimeoutID(
        setTimeout(() => {
          if (index === 0) {
            if (newValue > range[1] || newValue < minPrice) {
              setRange([minPrice, range[1]]);
              return;
            }
          } else {
            if (newValue > maxPrice || newValue < range[0]) {
              setRange([range[0], maxPrice]);
              return;
            }
          }
        }, 1000)
      );

      const newRange = [...range] as [number, number];
      newRange[index] = newValue;
      setRange(newRange);
      if (
        newRange[0] <= newRange[1] &&
        newRange[0] >= minPrice &&
        newRange[1] <= maxPrice
      ) {
        onValueChange(newRange);
      }
    };
 
    return (
      <div>
        <div className="mb-4">
          <SliderPrimitive.Root
            ref={ref}
            className={cn(
              "relative flex w-full touch-none select-none items-center mb-4",
              className
            )}
            min={minPrice}
            max={maxPrice}
            step={step}
            value={range}
            onValueChange={handleSliderChange}
            {...props}
          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-cream shadow-sm">
              <SliderPrimitive.Range className="absolute h-full bg-cream" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-secondary bg-cream ring-offset-background transition-colors focus-visible:outline-none hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50" />
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-secondary bg-cream ring-offset-background transition-colors focus-visible:outline-none hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50" />
          </SliderPrimitive.Root>
        </div>
        <div className="flex my-4 items-center justify-between">
          <div className="w-2/5">
            <Input
              value={String(range[0])}
              onChange={(event) => handleInputChange(0, event)}
              className="border border-bgGray rounded text-center bg-cream text-brown pr-2"
              placeholder="Min"
            />
          </div>
          <div>
            <p className="text-center text-fontGray text-sm">to</p>
          </div>
          <div className="w-2/5">
            <Input
              value={String(range[1])}
              onChange={(event) => handleInputChange(1, event)}
              className="border border-bgGray rounded text-center bg-cream text-brown pr-2"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    );
  }
);
 
PriceRangeSlider.displayName = SliderPrimitive.Root.displayName;
 
export { PriceRangeSlider };
 