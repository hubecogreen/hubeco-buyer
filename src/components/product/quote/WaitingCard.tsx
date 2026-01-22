import { Clock } from 'lucide-react'
import React from 'react'

export default function WaitingCard({line }:Readonly<{line:any}>) {
  return (
    <div className="border rounded-lg shadow-md max-w-md bg-cream">
      <div className="p-6">
        <div className="flex items-center gap-3 text-brown">
          <Clock className="!w-5 !h-5 animate-pulse" />
          <div className="text-sm text-break text-wrap line-clamp-6">
            {line}
          </div>
        </div>
      </div>
    </div>
  )
}
