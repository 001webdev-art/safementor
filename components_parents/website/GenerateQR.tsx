export function GenerateQR() {
  return (
    <div className="h-full bg-white flex items-center justify-center overflow-y-auto">
      <div className="max-w-2xl w-full p-8">
        {/* Header */}
        <div className="border-b-2 border-black pb-6 mb-6 text-center">
          <p className="text-lg font-bold mb-2">Welcome to SafeMentor!</p>
          <p className="text-xs text-gray-600">Step 4 of 4: Connect your child's device</p>
        </div>

        {/* Success Message */}
        <div className="bg-gray-100 border-2 border-black p-6 mb-6 text-center">
          <div className="border border-black w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <p className="text-lg">✓</p>
          </div>
          <p className="text-sm font-bold mb-2">Account Created & Verified!</p>
          <p className="text-xs text-gray-600">Your parent dashboard is ready. Now let's connect your child.</p>
        </div>

        {/* QR Code Section */}
        <div className="border-4 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4 text-center">Connect Your Child</p>
          
          {/* QR Code */}
          <div className="border-2 border-black w-56 h-56 mx-auto mb-4 flex items-center justify-center">
            <p className="text-xs text-center">QR Code<br/>Placeholder<br/>(Active for 15 min)</p>
          </div>

          {/* Alternative Code */}
          <div className="bg-gray-100 border border-black p-4 text-center mb-4">
            <p className="text-xs mb-2">Or enter this code manually:</p>
            <p className="font-bold text-xl">ABC-123-DEF</p>
          </div>

          <div className="border border-black p-3 text-center">
            <p className="text-xs">🔄 Regenerate Code</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Next Steps:</p>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="border-2 border-black w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <p className="text-xs font-bold">1</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-1">Download SafeMentor Child App</p>
                <p className="text-xs text-gray-600">Get the app on your child's device (iOS or Android)</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="border-2 border-black w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <p className="text-xs font-bold">2</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-1">Open App on Child's Device</p>
                <p className="text-xs text-gray-600">Launch the SafeMentor app</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="border-2 border-black w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <p className="text-xs font-bold">3</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-1">Scan QR Code</p>
                <p className="text-xs text-gray-600">Use the app to scan this QR code or enter the code above</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="border-2 border-black w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <p className="text-xs font-bold">4</p>
              </div>
              <div>
                <p className="text-xs font-bold mb-1">Confirm Connection</p>
                <p className="text-xs text-gray-600">Approve the connection request on your parent dashboard</p>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Links */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-xs font-bold mb-3 text-center">Download Child App</p>
          
          <div className="flex gap-3 justify-center">
            <div className="border-2 border-black px-6 py-3">
              <p className="text-xs font-bold">App Store</p>
              <p className="text-xs text-gray-600">iOS</p>
            </div>
            <div className="border-2 border-black px-6 py-3">
              <p className="text-xs font-bold">Google Play</p>
              <p className="text-xs text-gray-600">Android</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <div className="border border-black p-3 flex-1 text-center">
            <p className="text-sm">Skip for Now</p>
          </div>
          
          <div className="border-2 border-black p-3 flex-1 text-center">
            <p className="text-sm font-bold">Go to Dashboard →</p>
          </div>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Onboarding Complete:</p>
          <p className="text-xs">• QR code time-limited (15min expiry for security)</p>
          <p className="text-xs">• Can regenerate or skip and do later from dashboard</p>
          <p className="text-xs">• After pairing: Child → Safe Chat → Parent sees aggregated signals</p>
          <p className="text-xs">• User can add multiple children via dashboard</p>
        </div>
      </div>
    </div>
  );
}
