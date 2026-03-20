export function ParentSettings() {
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
        <h1 className="text-lg font-bold mb-6">Settings</h1>

        {/* 1) Child Access Control */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Child Management</p>
          
          <div className="space-y-4">
            <div className="bg-gray-100 border border-black p-4">
              <p className="text-xs font-bold mb-3">Child: PrincessElsa</p>
              
              <div className="space-y-3">
                {/* Pause Access */}
                <div>
                  <p className="text-xs mb-2">Pause access for:</p>
                  <div className="flex gap-2 mb-2">
                    <div className="border border-black p-2 text-center flex-1">
                      <p className="text-xs">1 day</p>
                    </div>
                    <div className="border border-black p-2 text-center flex-1">
                      <p className="text-xs">3 days</p>
                    </div>
                    <div className="border border-black p-2 text-center flex-1">
                      <p className="text-xs">7 days</p>
                    </div>
                  </div>
                  <div className="border-2 border-black p-2 text-center bg-white">
                    <p className="text-xs font-bold">Pause Connection</p>
                  </div>
                </div>
                
                {/* Delete Child Account */}
                <div className="border-t border-gray-400 pt-3">
                  <div className="border-2 border-black p-2 text-center bg-gray-200">
                    <p className="text-xs font-bold">Delete Child Account</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Permanently removes this child's account and all associated data</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2) Add New Child */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Add New Child</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs mb-2">Nickname</p>
              <div className="border-2 border-black p-3">
                <input 
                  type="text" 
                  placeholder="e.g., PrincessElsa, Popeye, SpiderKid..." 
                  className="text-xs w-full outline-none bg-transparent"
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">Nickname helps AI understand gender context for better support</p>
            </div>

            <div>
              <p className="text-xs mb-2">Birthdate (MM/YY)</p>
              <div className="flex gap-2">
                <div className="border-2 border-black p-3 flex-1">
                  <input 
                    type="text" 
                    placeholder="MM" 
                    maxLength={2}
                    className="text-xs w-full outline-none bg-transparent"
                  />
                </div>
                <div className="border-2 border-black p-3 flex-1">
                  <input 
                    type="text" 
                    placeholder="YY" 
                    maxLength={2}
                    className="text-xs w-full outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs mb-2">Child Language</p>
              <div className="border-2 border-black p-3">
                <select className="text-xs w-full outline-none bg-transparent">
                  <option>English</option>
                  <option>Deutsch</option>
                  <option>Français</option>
                  <option>Español</option>
                </select>
              </div>
            </div>

            <div>
              <p className="text-xs mb-2">Time Limit for Chat Duration</p>
              <div className="border-2 border-black p-3">
                <select className="text-xs w-full outline-none bg-transparent">
                  <option>15 minutes/day</option>
                  <option>30 minutes/day</option>
                  <option>60 minutes/day</option>
                  <option>Unlimited</option>
                </select>
              </div>
            </div>

            <div className="border-2 border-black p-3 text-center bg-white">
              <p className="text-xs font-bold">Generate Child QR Code</p>
            </div>
          </div>
        </div>

        {/* 3) Personal Data */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Personal Data</p>
          
          {/* 3a) Parent Data */}
          <div className="mb-4">
            <p className="text-xs font-bold mb-3">Parent Information</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs mb-2">Name</p>
                <div className="border-2 border-black p-3">
                  <p className="text-xs text-gray-600">Maria Mustermann</p>
                </div>
              </div>

              <div>
                <p className="text-xs mb-2">Street and Number</p>
                <div className="border-2 border-black p-3">
                  <p className="text-xs text-gray-600">Hauptstraße 123</p>
                </div>
              </div>

              <div>
                <p className="text-xs mb-2">City</p>
                <div className="border-2 border-black p-3">
                  <p className="text-xs text-gray-600">Berlin</p>
                </div>
              </div>

              <div>
                <p className="text-xs mb-2">Zip Code</p>
                <div className="border-2 border-black p-3">
                  <p className="text-xs text-gray-600">10115</p>
                </div>
              </div>

              <div>
                <p className="text-xs mb-2">Country</p>
                <div className="border-2 border-black p-3">
                  <p className="text-xs text-gray-600">Germany</p>
                </div>
              </div>

              <div>
                <p className="text-xs mb-2">Phone</p>
                <div className="border-2 border-black p-3">
                  <p className="text-xs text-gray-600">+49 30 12345678</p>
                </div>
              </div>

              <div>
                <p className="text-xs mb-2">Email</p>
                <div className="border-2 border-black p-3">
                  <p className="text-xs text-gray-600">maria.mustermann@email.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3b) Child Data */}
          <div className="border-t-2 border-gray-400 pt-4">
            <p className="text-xs font-bold mb-3">Child Information</p>
            <div className="bg-gray-100 border border-black p-4 mb-3">
              <p className="text-xs font-bold mb-3">Child: PrincessElsa</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Nickname:</p>
                  <p className="text-xs">PrincessElsa</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Birthdate:</p>
                  <p className="text-xs">05/18</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Language:</p>
                  <p className="text-xs">Deutsch</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Time Limit:</p>
                  <p className="text-xs">30 minutes/day</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 border border-black p-4">
              <p className="text-xs font-bold mb-3">Child: Popeye</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Nickname:</p>
                  <p className="text-xs">Popeye</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Birthdate:</p>
                  <p className="text-xs">03/16</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Language:</p>
                  <p className="text-xs">English</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">Time Limit:</p>
                  <p className="text-xs">60 minutes/day</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4) Data Protection */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Data Protection</p>
          
          {/* Data Processing Consent */}
          <div className="mb-4">
            <p className="text-xs font-bold mb-3">Data Processing Consent</p>
            <div className="border border-black p-4 mb-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold">Data Processing Consent</p>
                <div className="border border-black px-3 py-1">
                  <p className="text-xs">✓ Active</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">You have consented to AI analysis of child interactions for safety purposes</p>
              <p className="text-xs text-gray-600 mb-3">Provided on: Jan 15, 2026 via www.safementor.com account setup</p>
              <div className="flex gap-2">
                <div className="border border-black p-2 text-center flex-1">
                  <p className="text-xs">Review Original Consent</p>
                </div>
                <div className="border border-black p-2 text-center flex-1">
                  <p className="text-xs">Withdraw Consent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Deletion Options */}
          <div className="border-t-2 border-gray-400 pt-4">
            <p className="text-xs font-bold mb-3">Data Deletion Options</p>
            <div className="space-y-3">
              <div className="border-2 border-black p-4 bg-gray-100">
                <p className="text-xs font-bold mb-2">Delete All Child Data</p>
                <p className="text-xs text-gray-600 mb-3">Permanently delete all conversation and emotional data for selected child. Child can reconnect afterward with fresh start. (GDPR right to erasure)</p>
                <div className="border-2 border-black p-2 text-center">
                  <p className="text-xs font-bold">Delete Child Data</p>
                </div>
              </div>

              <div className="border-2 border-black p-4 bg-gray-200">
                <p className="text-xs font-bold mb-2">Delete Parent Account</p>
                <p className="text-xs text-gray-600 mb-3">Permanently delete your parent account AND all associated child data. This cannot be undone.</p>
                <div className="border-2 border-black p-2 text-center">
                  <p className="text-xs font-bold">Delete Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5) Notifications */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Notification Preferences</p>
          
          <div className="space-y-4">
            {/* Yellow Flags */}
            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-3">Yellow Flags (Potential Concerns)</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-xs">SMS Notifications</p>
                  <div className="flex gap-2">
                    <div className="border-2 border-black px-3 py-1 bg-white">
                      <p className="text-xs font-bold">Yes</p>
                    </div>
                    <div className="border border-black px-3 py-1">
                      <p className="text-xs">No</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-xs">Email Notifications</p>
                  <div className="flex gap-2">
                    <div className="border-2 border-black px-3 py-1 bg-white">
                      <p className="text-xs font-bold">Yes</p>
                    </div>
                    <div className="border border-black px-3 py-1">
                      <p className="text-xs">No</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Flags */}
            <div className="border-2 border-black p-4 bg-gray-50">
              <p className="text-xs font-bold mb-3">Red Flags (Serious Concerns)</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-xs">SMS Notifications</p>
                  <div className="flex gap-2">
                    <div className="border-2 border-black px-3 py-1 bg-white">
                      <p className="text-xs font-bold">Yes</p>
                    </div>
                    <div className="border border-black px-3 py-1">
                      <p className="text-xs">No</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-xs">Email Notifications</p>
                  <div className="flex gap-2">
                    <div className="border-2 border-black px-3 py-1 bg-white">
                      <p className="text-xs font-bold">Yes</p>
                    </div>
                    <div className="border border-black px-3 py-1">
                      <p className="text-xs">No</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-3">⚠️ Recommended to keep both enabled for serious safety concerns</p>
            </div>
          </div>
        </div>

        {/* 6) Payment Data */}
        <div className="border-2 border-black p-6 mb-4">
          <p className="text-sm font-bold mb-4">Payment Data</p>
          
          <div className="space-y-4">
            <div className="bg-gray-100 border border-black p-4">
              <p className="text-xs font-bold mb-2">Current Payment Method</p>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-xs">Visa •••• 4242</p>
                  <p className="text-xs text-gray-600">Expires: 12/26</p>
                </div>
                <div className="border border-black px-2 py-1">
                  <p className="text-xs">✓ Active</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="border border-black p-2 text-center flex-1">
                  <p className="text-xs">Update Card</p>
                </div>
                <div className="border border-black p-2 text-center flex-1">
                  <p className="text-xs">Remove Card</p>
                </div>
              </div>
            </div>

            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-2">Billing Information</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">Current Plan: Family Plan (€19.99/month)</p>
                <p className="text-xs text-gray-600">Next Billing Date: Feb 15, 2026</p>
                <p className="text-xs text-gray-600">Children Enrolled: 2</p>
              </div>
              <div className="border border-black p-2 text-center mt-3">
                <p className="text-xs">View Billing History</p>
              </div>
            </div>
          </div>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Settings Structure:</p>
          <p className="text-xs">• Child Access Control at top (most critical parental tool)</p>
          <p className="text-xs">• Add New Child with complete setup (nickname, birthdate, language, time limit)</p>
          <p className="text-xs">• Personal Data section includes both parent and child information</p>
          <p className="text-xs">• Data Protection consolidates consent and deletion options</p>
          <p className="text-xs">• Notification preferences split by alert severity (yellow/red flags)</p>
          <p className="text-xs">• Payment data for subscription management</p>
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
          <div className="bg-gray-200 border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs font-bold">Settings</p>
          </div>
          <div className="border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs">Privacy</p>
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
