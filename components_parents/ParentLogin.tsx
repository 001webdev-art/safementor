export function ParentLogin() {
  return (
    <div className="h-full bg-white flex items-center justify-center">
      <div className="max-w-md w-full p-8">
        {/* Header */}
        <div className="border-b-2 border-black pb-6 mb-6 text-center">
          <p className="text-lg font-bold mb-2">SafeMentor</p>
          <p className="text-sm">Parent Dashboard Login</p>
        </div>

        {/* Login Form */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="font-bold mb-6">Sign In</p>

          <div className="space-y-4 mb-6">
            {/* Email Input */}
            <div>
              <p className="text-xs mb-2">Email Address</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Enter email...</p>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <p className="text-xs mb-2">Password</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Enter password...</p>
              </div>
            </div>

            {/* Remember Me */}
            <div className="border border-black p-2">
              <p className="text-xs">☐ Remember me</p>
            </div>
          </div>

          {/* Login Button */}
          <div className="border-2 border-black p-4 text-center mb-4">
            <p className="text-sm font-bold">Login</p>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <div className="border-b border-black inline-block">
              <p className="text-xs">Forgot password?</p>
            </div>
          </div>
        </div>

        {/* Account Creation Notice */}
        <div className="bg-gray-100 border border-black p-4 mb-4">
          <p className="text-xs font-bold mb-2">Don't have an account?</p>
          <p className="text-xs text-gray-600 mb-3">Parent accounts are created on the SafeMentor website www.safementor.com when you set up your family account.</p>
          
          <div className="border border-black p-2 text-center">
            <p className="text-xs">Visit www.safementor.com</p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="border-2 border-black p-4 mb-4">
          <p className="text-xs font-bold mb-2">Security & Privacy</p>
          <p className="text-xs text-gray-600">All data is encrypted. We never share your information with third parties. See our privacy policy for details.</p>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Login Flow Notes:</p>
          <p className="text-xs">• No manual account creation (accounts auto-created via child pairing)</p>
          <p className="text-xs">• Email-based authentication only</p>
          <p className="text-xs">• Password recovery flow available</p>
          <p className="text-xs">• GDPR: Clear privacy notice before login</p>
          <p className="text-xs">• 2FA could be added for enhanced security</p>
        </div>
      </div>
    </div>
  );
}