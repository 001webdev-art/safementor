import React from 'react';

export function ChildQRPairing() {
  return (
    <div className="flex flex-col h-full bg-white p-6 font-sans border-2 border-black max-w-sm mx-auto items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-8">PAIR DEVICE</h1>

      <div className="w-64 h-64 border-4 border-black bg-gray-200 mb-8 flex items-center justify-center relative">
        <div className="absolute inset-0 border-b-2 border-black animate-pulse bg-black opacity-10 h-1 top-1/2"></div>
        <p className="font-bold">[ CAMERA VIEW ]</p>
        <p className="text-xs absolute bottom-2">Scanning for QR Code...</p>
      </div>

      <p className="text-lg font-bold mb-4">Scan the QR code on your parent's screen</p>
      
      <div className="border border-black p-4 w-full">
        <p className="text-sm font-bold mb-2">Why scan?</p>
        <p className="text-xs">This links your app to your parent's dashboard so they can help keep you safe.</p>
      </div>
    </div>
  );
}
