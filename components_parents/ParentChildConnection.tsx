export function ParentChildConnection() {
  return (
    <div className="h-full bg-white flex">
      {/* Sidebar Navigation */}
      <div className="w-48 border-r-2 border-black p-4">
        <div className="border-b-2 border-black pb-4 mb-4">
          <p className="text-sm font-bold">SafeMentor</p>
          <p className="text-xs text-gray-600">Parent Dashboard</p>
        </div>

        <div className="space-y-2">
          <div className="border border-black p-2">
            <p className="text-xs">Overview</p>
          </div>
          <div className="bg-gray-200 border border-black p-2">
            <p className="text-xs font-bold">Child Connections</p>
          </div>
          <div className="border border-black p-2">
            <p className="text-xs">Emotions</p>
          </div>
          <div className="border border-black p-2">
            <p className="text-xs">Settings</p>
          </div>
          <div className="border border-black p-2">
            <p className="text-xs">Privacy</p>
          </div>
          <div className="border border-black p-2">
            <p className="text-xs">Help</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="max-w-lg w-full">
          <h1 className="text-lg font-bold mb-6 text-center">Connect Child Account</h1>

          {/* Pairing Flow */}
          <div className="border-4 border-black p-6 mb-6">
            <p className="text-sm font-bold mb-4 text-center">Step 1: Generate Pairing Code</p>
            
            {/* QR Code Placeholder */}
            <div className="border-2 border-black w-48 h-48 mx-auto mb-4 flex items-center justify-center">
              <p className="text-xs text-center">QR Code<br/>Placeholder</p>
            </div>

            {/* Alternative Code */}
            <div className="bg-gray-100 border border-black p-4 text-center mb-4">
              <p className="text-xs mb-2">Or enter code manually:</p>
              <p className="font-bold text-xl">ABC-123-DEF</p>
            </div>

            <div className="border border-black p-3 text-center">
              <p className="text-xs">Regenerate Code Button</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="border-2 border-black p-4 mb-6">
            <p className="text-xs font-bold mb-3">Instructions:</p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <p className="text-xs font-bold">1.</p>
                <p className="text-xs text-gray-600">Open SafeMentor app on child's device</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xs font-bold">2.</p>
                <p className="text-xs text-gray-600">Select "Connect to Parent"</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xs font-bold">3.</p>
                <p className="text-xs text-gray-600">Scan QR code or enter pairing code</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xs font-bold">4.</p>
                <p className="text-xs text-gray-600">Review and approve connection request</p>
              </div>
            </div>
          </div>

          {/* Consent Notice */}
          <div className="bg-gray-100 border border-black p-4 mb-4">
            <p className="text-xs font-bold mb-2">Parental Consent Required:</p>
            <p className="text-xs text-gray-600 mb-3">By connecting, you confirm that you are the legal guardian and consent to monitoring of AI interactions for child safety.</p>
            
            <div className="border border-black p-2">
              <p className="text-xs">☐ I confirm parental consent</p>
            </div>
          </div>

          {/* Annotations */}
          <div className="p-4 bg-gray-50 border border-gray-400">
            <p className="text-xs font-bold mb-2">GDPR Compliance:</p>
            <p className="text-xs">• Explicit parental consent before child data processing</p>
            <p className="text-xs">• Time-limited pairing codes (expire after 15 minutes)</p>
            <p className="text-xs">• Verifiable parental authority required</p>
            <p className="text-xs">• Connection can be revoked by either party anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}