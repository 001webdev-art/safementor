export function ParentPrivacy() {
  return (
    <div className="h-full bg-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden border-b-2 border-black p-4 flex justify-between items-center shrink-0">
        <div>
          <p className="text-sm font-bold">SafeMentor</p>
          <p className="text-xs text-gray-600">Parent Dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <h1 className="text-lg font-bold mb-6">Data & Privacy</h1>

        {/* Lawful Basis Transparency (GDPR Required) */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Legal Basis for Processing (GDPR)</p>
          
          <div className="bg-gray-100 border border-black p-4 mb-4">
            <p className="text-xs font-bold mb-3">Why we're allowed to process your child's data:</p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-black pl-3">
                <p className="text-xs font-bold">Child Safety (Vital Interests)</p>
                <p className="text-xs text-gray-600">AI analysis to detect and prevent harm to children</p>
              </div>

              <div className="border-l-4 border-black pl-3">
                <p className="text-xs font-bold">Service Operation (Contractual Necessity)</p>
                <p className="text-xs text-gray-600">Technical processing required to deliver the AI companion service</p>
              </div>

              <div className="border-l-4 border-black pl-3">
                <p className="text-xs font-bold">Legitimate Interest (With Safeguards)</p>
                <p className="text-xs text-gray-600">Improving safety features while protecting child privacy through aggregation</p>
              </div>
            </div>
          </div>

          <div className="border border-black p-3">
            <p className="text-xs">
              <span className="font-bold">Your consent on www.safementor.com:</span> You provided explicit consent during account setup. 
              <span className="underline">View original consent form →</span>
            </p>
          </div>
        </div>

       
        {/* Data Access vs. Data Visibility (GDPR Nuance) */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Data Access vs. Data Visibility</p>
          
          <div className="bg-gray-100 border border-black p-4 mb-4">
            <p className="text-xs font-bold mb-3">Important European Distinction:</p>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold">What You See (Data Visibility):</p>
                <p className="text-xs text-gray-600">• Aggregated emotional trends only</p>
                <p className="text-xs text-gray-600">• Safety alerts with minimal context</p>
                <p className="text-xs text-gray-600">• No raw chat logs or surveillance</p>
              </div>

              <div className="border-t-2 border-black pt-3">
                <p className="text-xs font-bold">What You Can Request (Data Access Rights):</p>
                <p className="text-xs text-gray-600">• Under GDPR, you may request full data access</p>
                <p className="text-xs text-gray-600">• This is exceptional and requires legal justification</p>
                <p className="text-xs text-gray-600">• All requests are logged and reviewed</p>
                <p className="text-xs text-gray-600">• Protects child's dignity and trust</p>
              </div>

              <div className="border-t-2 border-black pt-3">
                <p className="text-xs font-bold">Automatic Data Deletion:</p>
                <p className="text-xs text-gray-600">After 30 days, all conversation data is permanently deleted from our servers (GDPR compliance)</p>
              </div>

             
            </div>
          </div>

          <div className="border-2 border-black p-3 text-center">
            <p className="text-xs font-bold">Request Exceptional Data Access</p>
          </div>
        </div>

       {/* GDPR Rights */}
        <div className="border-2 border-black p-6 mb-4">
          <p className="text-sm font-bold mb-4">Your GDPR Rights</p>
          
          <div className="space-y-3">
            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-2">Right to Access</p>
              <p className="text-xs text-gray-600 mb-3">Download a copy of all data we hold</p>
              <div className="border border-black p-2 text-center inline-block">
                <p className="text-xs">Request Data Export</p>
              </div>
            </div>

            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-2">Right to Erasure</p>
              <p className="text-xs text-gray-600 mb-3">Permanently delete all stored data</p>
              <div className="border border-black p-2 text-center inline-block">
                <p className="text-xs">Delete All Data</p>
              </div>
            </div>

            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-2">Right to Portability</p>
              <p className="text-xs text-gray-600 mb-3">Receive data in machine-readable format</p>
              <div className="border border-black p-2 text-center inline-block">
                <p className="text-xs">Export in JSON Format</p>
              </div>
            </div>

            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-2">Right to Object</p>
              <p className="text-xs text-gray-600 mb-3">Withdraw consent and stop processing</p>
              <div className="border border-black p-2 text-center inline-block">
                <p className="text-xs">Withdraw All Consent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Privacy Page Consolidation:</p>
          <p className="text-xs">• All consents moved to Privacy page (cleaner structure)</p>
          <p className="text-xs">• Lawful basis transparency (GDPR Article 13 requirement)</p>
          <p className="text-xs">• Data access vs. visibility distinction (EU regulatory expectation)</p>
          <p className="text-xs">• Clear link to original consent given on www.safementor.com</p>
          <p className="text-xs">• Exceptional access requests are logged (child dignity protection)</p>
        </div>
      </div>

      {/* Navigation - Sidebar (Desktop) / Bottom Bar (Mobile) */}
      <div className="w-full md:w-48 border-t-2 md:border-t-0 md:border-r-2 border-black p-2 md:p-4 shrink-0 flex flex-col order-last md:order-first">
        <div className="hidden md:block border-b-2 border-black pb-4 mb-4">
          <p className="text-sm font-bold">SafeMentor</p>
          <p className="text-xs text-gray-600">Parent Dashboard</p>
        </div>

        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
          <div className="border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs">Overview</p>
          </div>
          <div className="border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs">Emotions</p>
          </div>
          <div className="border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs">Settings</p>
          </div>
          <div className="bg-gray-200 border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs font-bold">Privacy</p>
          </div>
          <div className="border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs">Help</p>
          </div>
          
          {/* Mobile Logout */}
          <div className="border border-black p-2 min-w-[100px] text-center md:hidden shrink-0">
            <p className="text-xs">Logout</p>
          </div>
        </div>

        <div className="mt-auto pt-8 hidden md:block">
          <div className="border border-black p-2">
            <p className="text-xs">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}