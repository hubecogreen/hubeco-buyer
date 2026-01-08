'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { IoIosClose } from 'react-icons/io';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';
export default function quoteComponent() {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [doneOpen, setDoneOpen] = useState<boolean>(false);
  const [minQty, setMinQty] = useState<number>(1);
  const [maxQty, setMaxQty] = useState<number>(1);
  const [quantity, setQuantity] = useState(minQty);
  const thicknessList = [100, 150, 200, 250];

  const [selectedAddress, setSelectedAddress] = useState("");

  const handleIncrement = () => {
    setQuantity((prev: any) => prev + 1);
  };

  // Handle decrement
  const handleDecrement = () => {
    setQuantity((prev: any) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const [product, setProduct] = useState([
    {
      id: 1,
      name: "TATA Galvanised Gc Roofing Sheet",
      thickness: "6mm",
      brand: "Tata Tiscon",
      quantity: 1,
    },
    {
      id: 2,
      name: "TATA Galvanised Gc Roofing Sheet",
      thickness: "8mm",
      brand: "Tata Tiscon",
      quantity: 1,
    },
  ]);
  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="max-w-lg">
          <DialogClose
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4"
          >
            <IoIosClose className="w-6 h-6 text-brown" />
          </DialogClose>

          <DialogHeader>
            <DialogTitle className="text-brown text-xl font-bold">
              Request Quote
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[500px] overflow-y-auto pr-2">
            {product.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between mb-4 border-b pb-3"
              >
                <div className="flex items-center">
                  <Image
                    className="w-12 h-12 rounded"
                    src="/images/products/sand.webp"
                    alt={product.name}
                    width={100}
                    height={100}
                    onError={e => {
                      e.currentTarget.src = '/images/product-placeholder.webp'
                    }}
                    loading="lazy"
                  />
                  <div className="ml-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="font-semibold w-36">
                          {product.name}
                        </p>
                        <p className="text-xs">{product.brand}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm pt-1">
                          {product.thickness}
                        </p>
                        <p className="text-sm pt-1">Thickness</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center  border border-borderGray w-fit">
                  <div className="flex items-center">
                    <Button
                      type="button"
                      onClick={handleDecrement}
                      className="pl-4 pr-0 py-2 bg-transparent text-lg hover:bg-transparent  text-secondary"
                      disabled={quantity <= minQty ? true : false}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      min={minQty}
                      max={maxQty}
                      value={quantity}
                      onChange={handleChange}
                      className="w-16 pl-0 text-center  custom-input"
                    />
                    <Button
                      type="button"
                      onClick={handleIncrement}
                      className="pr-4 pl-0 py-2 text-lg bg-transparent hover:bg-transparent text-secondary"
                      disabled={quantity >= maxQty ? true : false}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))}


            <button
              className="text-[#B90647] mt-4 hover:bg-slate-400 font-semibold flex ml-auto"
              onClick={() => {
                setIsOpen(false); // Close the current dialog
                setAddOpen(true); // Open the new state/dialog
              }}
            >
              + Add Product
            </button>
            {/* Address Options */}
            <div className="my-4">
              <label className="block font-semibold mb-1 text-sm">
                Where do you need these?
              </label>
              <input
                type="text"
                placeholder="Address"
                className="border w-full rounded px-3 py-2 mb-2 focus:outline-none"
              />
              {/* <button className="text-green-500">Locate Me</button> */}
              <div className="mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="address1"
                    name="address"
                    value="Chhota Anjaiah Nagar"
                    className="form-radio text-[#B90647] focus:ring-[#B90647] [accent-color:#B90647]"

                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />
                  <label htmlFor="address1" className="ml-2">
                    Chhota Anjaiah Nagar, Gachibowli, Hyderabad, Telangana 500032
                  </label>
                </div>

                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="address2"
                    name="address"
                    value="Botiguda, Bhoiguda"
                    className="form-radio text-[#B90647] focus:ring-[#B90647] [accent-color:#B90647]"

                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />
                  <label htmlFor="address2" className="ml-2">
                    Botiguda, Bhoiguda, Secunderabad, Telangana 500025
                  </label>
                </div>

                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="address3"
                    name="address"
                    value="Chhota Anjaiah Nagar"
                    className="form-radio text-[#B90647] focus:ring-[#B90647] [accent-color:#B90647]"

                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />
                  <label htmlFor="address3" className="ml-2">
                    Chhota Anjaiah Nagar, Gachibowli, Hyderabad, Telangana 500032
                  </label>
                </div>
              </div>

            </div>

            {/* Date Picker */}
            <div className="mb-1">
              <label className="block font-semibold text-sm mb-1">
                Quote Due Date
              </label>
              <input
                type="date"
                className="border w-full rounded px-3 py-2 focus:outline-none"
                placeholder="Select Date"
              />
            </div>

            {/* Instructions & Notes */}
            <div className="mb-1">
              <label className="block font-semibold text-sm mb-1">
                Quote Submission Instructions
              </label>
              <textarea
                placeholder="Submission Instructions"
                className="border w-full rounded px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="mb-1">
              <label className="block font-semibold text-sm mb-1">
                Notes
              </label>
              <textarea
                placeholder="Type here"
                className="border w-full rounded px-3 py-2 focus:outline-none"
              />
            </div>
          </div>
          {/* Footer Actions */}
          <DialogFooter className="flex justify-between">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-gray-200 text-[#B90647] px-4 py-2 border border-[#B90647] w-full w-1/2"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#B90647] text-white px-4 py-2 w-full w-1/2"
              onClick={() => {
                setIsOpen(false); // Close the current dialog
                setDoneOpen(true); // Open the new state/dialog
              }}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen}>

        <DialogContent className="sm:max-w-md">
          <DialogClose
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4"
          >
            <IoIosClose className="w-6 h-6  z-10 bg-white  text-brown" />
          </DialogClose>

          <DialogHeader>
            <DialogTitle className="text-left">
              Add Product
            </DialogTitle>
          </DialogHeader>

          {product.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center justify-between mb-4 border-b pb-3"
            >
              <div className="flex items-center">
                <Image
                  className="w-12 h-12 rounded"
                  src="/images/products/imageQuote.webp"
                  alt={product.name}
                  width={100}
                  height={100}
                  onError={e => {
                    e.currentTarget.src = '/images/product-placeholder.webp'
                  }}
                  loading="lazy"
                />
                <div className="ml-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <p className="font-semibold w-36">
                        {product.name}
                      </p>
                      <p className="text-xs">{product.brand}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center  border border-borderGray w-fit">
                <div className="flex items-center">
                  <Button
                    type="button"
                    onClick={handleDecrement}
                    className="pl-4 pr-0 py-2 bg-transparent text-lg hover:bg-transparent  text-secondary"
                    disabled={quantity <= minQty ? true : false}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min={minQty}
                    max={maxQty}
                    value={quantity}
                    onChange={handleChange}
                    className="w-16 pl-0 text-center  custom-input"
                  />
                  <Button
                    type="button"
                    onClick={handleIncrement}
                    className="pr-4 pl-0 py-2 text-lg bg-transparent hover:bg-transparent text-secondary"
                    disabled={quantity >= maxQty ? true : false}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <p className="text-md text-brown text-normal mb-1">
            Thickness
          </p>
          <div className="flex md:space-x-2 flex-wrap ">
            {thicknessList.map((thickness: any) => (
              <button
                key={thickness}
                className="px-4 py-2 border md:mr-0 mr-2 md:mt-0 mt-2 focus:border-primary hover:border-primary hover:text-primary focus:text-primary  text-center bg-white hover:bg-gray-100"
              >
                {thickness}mm
              </button>
            ))}
          </div>

          <DialogFooter className="flex justify-between pt-3">
            <Button
              onClick={() => setAddOpen(false)}
              className="bg-gray-200 text-[#B90647] px-4 py-2 border border-[#B90647] w-full w-1/2"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#B90647] text-white px-4 py-2 w-full w-1/2"
              onClick={() => {
                setAddOpen(false); // Close the current dialog
                // setDoneOpen(true); // Open the new state/dialog
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={doneOpen}>
        <DialogContent className="sm:max-w-lg p-10">
          <div className="flex">
            <Image
              src="/images/checkout/Group.webp"
              alt="image"
              className="w-16 h-16"
              width={100}
              height={100}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
            />
            <div className="mt-4 md:mt-0 md:ml-5">
              <h1 className="text-2xl md:text-3xl text-center pt-3 font-semibold text-[#B90647]">
                Quotation Requested
              </h1>
            </div>
          </div>
          <DialogDescription className="text-center font-sm">
            Thank you for choosing hubeco.market –You will receive
            the quotation with all the details to your email
          </DialogDescription>
          <DialogFooter className="flex justify-center items-center pt-3">
            <Button
              className="bg-[#B90647] text-white px-4 py-2 justify-center w-full"
              onClick={() => {
                setDoneOpen(false); // Open the new state/dialog
              }}
            >
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  )
}
