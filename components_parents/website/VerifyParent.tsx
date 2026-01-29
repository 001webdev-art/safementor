export function VerifyParent() {
  return (
    <div className="h-full bg-white flex items-center justify-center overflow-y-auto">
      <div className="max-w-2xl w-full p-8">
        {/* Header */}
        <div className="border-b-2 border-black pb-6 mb-6">
          <p className="text-lg font-bold mb-2">Verify Parent Status</p>
          <p className="text-xs text-gray-600">Step 3 of 4: Confirm you are a legal guardian</p>
        </div>

        {/* Why Verify */}
        <div className="bg-gray-100 border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-3">Why do we verify parents?</p>
          <p className="text-xs text-gray-600 mb-3">Child protection laws require us to verify parental authority before processing children's data. This ensures only authorized adults can monitor child accounts.</p>
          <p className="text-xs text-gray-600">Your verification details are encrypted and stored securely.</p>
        </div>

        {/* Verification Method Selection */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Select Verification Method</p>

          {/* Email Verification (MVP) */}
          <div className="border-2 border-black p-5 mb-4 bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs font-bold mb-2">Email Verification (Recommended)</p>
                <p className="text-xs text-gray-600">We'll send a verification link to your email address</p>
              </div>
              <div className="border border-black w-5 h-5"></div>
            </div>
            
            <div className="bg-white border border-black p-3 mb-3">
              <p className="text-xs text-gray-600">Email: parent@email.com</p>
            </div>

            <div className="border-2 border-black p-3 text-center">
              <p className="text-xs font-bold">Send Verification Email</p>
            </div>
          </div>

          {/* Credit Card Verification (Future) */}
          <div className="border border-gray-400 p-5 mb-4 bg-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs font-bold mb-2 text-gray-500">Credit Card Verification</p>
                <p className="text-xs text-gray-600">Small refundable charge to verify card ownership</p>
                <p className="text-xs text-gray-500 mt-2">(Coming Soon)</p>
              </div>
              <div className="border border-gray-400 w-5 h-5"></div>
            </div>
          </div>

          {/* ID Verification (Future) */}
          <div className="border border-gray-400 p-5 bg-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs font-bold mb-2 text-gray-500">Government ID Verification</p>
                <p className="text-xs text-gray-600">Upload ID document for instant verification</p>
                <p className="text-xs text-gray-500 mt-2">(Coming Soon)</p>
              </div>
              <div className="border border-gray-400 w-5 h-5"></div>
            </div>
          </div>
        </div>

        {/* Email Verification State */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Verification Status</p>
          
          <div className="border border-black p-4 text-center">
            <p className="text-xs font-bold mb-2">Waiting for verification...</p>
            <p className="text-xs text-gray-600 mb-4">Check your email inbox and click the verification link</p>
            
            <div className="border border-black w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <p className="text-xs">Mail<br/>Icon</p>
            </div>

            <p className="text-xs text-gray-600 mb-3">Didn't receive the email?</p>
            <div className="border border-black p-2 inline-block">
              <p className="text-xs">Resend Email</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <div className="border border-black p-3 flex-1 text-center">
            <p className="text-sm">← Back</p>
          </div>
          
          <div className="border border-gray-400 p-3 flex-1 text-center bg-gray-100">
            <p className="text-sm text-gray-500">Continue (verify first)</p>
          </div>
        </div>

        {/* Annotations */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Verification Implementation:</p>
          <p className="text-xs">• MVP: Email link verification (simple, quick)</p>
          <p className="text-xs">• Future: Credit card micro-transaction</p>
          <p className="text-xs">• Future: Government ID upload + OCR</p>
          <p className="text-xs">• GDPR: Verification method logged for audit trail</p>
          <p className="text-xs">• After verification → Generate QR for child pairing</p>
        </div>
      </div>
    </div>
  );
}
