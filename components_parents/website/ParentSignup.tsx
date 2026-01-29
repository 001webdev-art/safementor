export function ParentSignup() {
  return (
    <div className="h-full bg-white flex items-center justify-center overflow-y-auto">
      <div className="max-w-lg w-full p-8">
        {/* Header */}
        <div className="border-b-2 border-black pb-6 mb-6 text-center">
          <p className="text-lg font-bold mb-2">SafeMentor</p>
          <p className="text-sm">Create Parent Account</p>
        </div>

        {/* Signup Form */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="font-bold mb-6">Sign Up</p>

          <div className="space-y-4 mb-6">
            {/* Full Name */}
            <div>
              <p className="text-xs mb-2">Full Name</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Enter your full name...</p>
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs mb-2">Email Address</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Enter email...</p>
              </div>
            </div>

            {/* Password */}
            <div>
              <p className="text-xs mb-2">Password</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Create password...</p>
              </div>
              <p className="text-xs text-gray-600 mt-1">Min. 8 characters, 1 number, 1 special character</p>
            </div>

            {/* Confirm Password */}
            <div>
              <p className="text-xs mb-2">Confirm Password</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Re-enter password...</p>
              </div>
            </div>

            {/* Country/Region */}
            <div>
              <p className="text-xs mb-2">Country/Region</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Select country ▼</p>
              </div>
            </div>
          </div>

          {/* Create Button */}
          <div className="border-2 border-black p-4 text-center">
            <p className="text-sm font-bold">Create Account</p>
          </div>
        </div>

        {/* Already Have Account */}
        <div className="text-center mb-6">
          <p className="text-xs text-gray-600">Already have an account? <span className="border-b border-black">Log in</span></p>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Signup Flow Notes:</p>
          <p className="text-xs">• Minimal data collection (name, email, password)</p>
          <p className="text-xs">• Password requirements shown upfront</p>
          <p className="text-xs">• After signup → Accept Terms → Verify Parent → Generate QR</p>
          <p className="text-xs">• GDPR: Location needed for regional compliance</p>
        </div>
      </div>
    </div>
  );
}
