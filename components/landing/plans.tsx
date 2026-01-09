import React from 'react';
import { CheckIcon } from './CheckIcon';

export const Plans = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 px-6">
      <div className="flex flex-col items-center text-center">
        <span className="text-blue-600 font-medium">
          Awesome Feature
        </span>
        <h2 className="text-4xl font-bold">Flexible Plans</h2>
      </div>

      <div className="flex flex-wrap justify-center w-full gap-8">
        {/* Free Plan */}
        <div className="flex flex-col p-6 w-full max-w-[400px] border border-gray-200 rounded-xl shadow-sm bg-white">
          <div className="pl-6 mb-4">
            <h4 className="text-2xl font-bold leading-tight">
              Free
            </h4>
            <p className="text-gray-500 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nisl ut aliquam lacinia, elit
            </p>
          </div>
          <div className="py-4">
            <div className="flex items-baseline">
              <h2 className="text-4xl font-bold">$0</h2>
              <span className="text-gray-500 ml-1">/mo</span>
            </div>

            <button className="w-full mt-7 mb-12 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors">
              Get Started
            </button>

            <div className="h-px w-full bg-gray-200 mb-6" />

            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">1 Team Members</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">1 Website</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">1 GB Storage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">1 TB Transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">Email Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="flex flex-col p-6 w-full max-w-[400px] border border-gray-200 rounded-xl shadow-sm bg-white">
          <div className="pl-6 mb-4">
            <h4 className="text-2xl font-bold leading-tight">
              Premium
            </h4>
            <p className="text-gray-500 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nisl ut aliquam lacinia, elit
            </p>
          </div>
          <div className="py-4">
            <div className="flex items-baseline">
              <h2 className="text-4xl font-bold">$19</h2>
              <span className="text-gray-500 ml-1">/mo</span>
            </div>

            <button className="w-full mt-7 mb-12 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Get Started
            </button>

            <div className="h-px w-full bg-gray-200 mb-6" />

            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">5 Team Members</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">5 Website</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">5 GB Storage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">5 TB Transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">Email Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Startup Plan */}
        <div className="flex flex-col p-6 w-full max-w-[400px] border border-gray-200 rounded-xl shadow-sm bg-white">
          <div className="pl-6 mb-4">
            <h4 className="text-2xl font-bold leading-tight">
              Startup
            </h4>
            <p className="text-gray-500 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nisl ut aliquam lacinia, elit
            </p>
          </div>
          <div className="py-4">
            <div className="flex items-baseline">
              <h2 className="text-4xl font-bold">$99</h2>
              <span className="text-gray-500 ml-1">/mo</span>
            </div>

            <button className="w-full mt-7 mb-12 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors">
              Get Started
            </button>

            <div className="h-px w-full bg-gray-200 mb-6" />

            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">30 Team Members</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">30 Website</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">30 GB Storage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">30 TB Transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">Email Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Enterprise Plan 
        <div className="flex flex-col p-6 w-full max-w-[400px] border border-gray-200 rounded-xl shadow-sm bg-white">
          <div className="pl-6 mb-4">
            <h4 className="text-2xl font-bold leading-tight">
              Enterprise
            </h4>
            <p className="text-gray-500 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nisl ut aliquam lacinia, elit
            </p>
          </div>
          <div className="py-4">
            <div className="flex items-baseline">
              <h2 className="text-4xl font-bold">$199</h2>
              <span className="text-gray-500 ml-1">/mo</span>
            </div>

            <button className="w-full mt-7 mb-12 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors">
              Get Started
            </button>

            <div className="h-px w-full bg-gray-200 mb-6" />

            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">100 Team Members</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">100 Website</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">100 GB Storage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">100 TB Transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-gray-500">Email Support</span>
              </li>
            </ul>
          </div>
        </div>
        
        */}

      </div>

    </div>
  );
};
