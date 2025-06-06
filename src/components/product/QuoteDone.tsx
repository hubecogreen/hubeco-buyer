import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import Image from 'next/image';
export default function QuoteDone({doneOpen, setDoneOpen}:any) {
  return (
    <Dialog open={doneOpen} onOpenChange={()=>setDoneOpen(false)}>
    <DialogContent className="sm:max-w-lg p-10">
      <div className="flex justify-center items-center gap-5">
        <Image
          src="/images/checkout/Group.png"
          alt="image"
          className="w-16 h-16"
          width={32}
          height={32}
          onError={e => {
            e.currentTarget.src = '/images/product-placeholder.jpg'
          }}
          loading="lazy"
        />
        <div className="gap-5 md:mt-0 md:ml-5 flex justify-center items-center">
          <h1 className="text-2xl md:text-3xl text-center  font-semibold text-[#B90647]">
            Quotation Requested
          </h1>
        </div>
      </div>
      <DialogDescription className="text-center font-sm">
        Thank you for choosing hubeco.market –You will receive the quotation
        with all the details to your email
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
  )
}
