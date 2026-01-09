import React from 'react';
import { AcmeLogo } from './Icons';

export const Footer = () => {
   return (
      <footer className="py-20 px-6 w-full">
         <div className="flex flex-wrap justify-center items-center gap-10">
            {/* Logo and Links Column 1 */}
            <div className="flex flex-col items-center gap-5 w-[250px]">
               <AcmeLogo />
               <ul className="flex flex-col gap-5 list-none m-0 p-0 text-center">
                  <li className="text-gray-500">First Link</li>
                  <li className="text-gray-500">Second Link</li>
                  <li className="text-gray-500">Third Link</li>
                  <li className="text-gray-500">Forth Link</li>
               </ul>
            </div>
            {/* Resources Column */}
            <div className="flex flex-col items-center gap-5 w-[250px]">
               <h5 className="text-lg font-bold">Resources</h5>
               <ul className="flex flex-col gap-5 list-none m-0 p-0 text-center">
                  <li className="text-gray-500">First Link</li>
                  <li className="text-gray-500">Second Link</li>
                  {/* <li className="text-gray-500">Third Link</li>
                  <li className="text-gray-500">Forth Link</li> */}
               </ul>
            </div>
            {/* Contact Column */}
            <div className="flex flex-col items-center gap-5 w-[250px]">
               <h5 className="text-lg font-bold">Contact</h5>
               <ul className="flex flex-col gap-5 list-none m-0 p-0 text-center">
                  <li className="text-gray-500">First Link</li>
                  <li className="text-gray-500">Second Link</li>
                  {/* <li className="text-gray-500">Third Link</li>
                  <li className="text-gray-500">Forth Link</li> */}
               </ul>
            </div>
            {/* Legal Column */}
            <div className="flex flex-col items-center gap-5 w-[250px]">
               <h5 className="text-lg font-bold">Legal</h5>
               <ul className="flex flex-col gap-5 list-none m-0 p-0 text-center">
                  <li className="text-gray-500">First Link</li>
                  <li className="text-gray-500">Second Link</li>
                  {/* <li className="text-gray-500">Third Link</li>
                  <li className="text-gray-500">Forth Link</li> */}
               </ul>
            </div>
            {/* Press Column */}
            <div className="flex flex-col items-center gap-5 w-[250px]">
               <h5 className="text-lg font-bold">Press</h5>
               <ul className="flex flex-col gap-5 list-none m-0 p-0 text-center">
                  <li className="text-gray-500">Impressum</li>
                  <li className="text-gray-500">Second Link</li>
                  {/* <li className="text-gray-500">Third Link</li>
                  <li className="text-gray-500">Forth Link</li> */}
               </ul>
            </div>
         </div>

         <div className="px-10 md:px-56">
            <div className="mt-14 border-t border-gray-200 flex justify-center" />
            <div className="pt-8 flex flex-wrap justify-center md:justify-between items-center gap-10">
               <div className="flex flex-wrap gap-10 justify-center">
                  <AcmeLogo />
                  <AcmeLogo />
                  <AcmeLogo />
                  <AcmeLogo />
               </div>
               <div className="flex gap-6 text-gray-500">
                  <span>Terms of Service</span>
                  <span>Privacy Policy</span>
               </div>
               <div className="flex gap-6 text-gray-500">
                  <span>© Copyright 2026 Safementor Project.</span>
               </div>
            </div>
         </div>
      </footer>
   );
};
