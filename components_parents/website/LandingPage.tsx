export function LandingPage() {
  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="border-b-2 border-black p-4 flex justify-between items-center">
        <div className="border border-black px-4 py-2">
          <p className="text-sm font-bold">SafeMentor Logo</p>
        </div>
        <div className="flex gap-3">
          <div className="border border-black px-3 py-1">
            <p className="text-xs">About</p>
          </div>
          <div className="border border-black px-3 py-1">
            <p className="text-xs">Privacy</p>
          </div>
          <div className="border border-black px-3 py-1">
            <p className="text-xs">Contact</p>
          </div>
          <div className="border-2 border-black px-4 py-1">
            <p className="text-xs font-bold">Parent Login</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="border-b-2 border-black p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-lg font-bold mb-4">SafeMentor</p>
          <p className="mb-6 text-gray-600">A safe space for children to talk, with parental peace of mind</p>
          
          <div className="flex gap-4 justify-center">
            <div className="border-2 border-black px-6 py-3">
              <p className="font-bold">I am a Parent</p>
            </div>
            <div className="border border-black px-6 py-3">
              <p>I am a Child</p>
            </div>
          </div>
        </div>
      </div>

      {/* What SafeMentor Is */}
      <div className="border-b-2 border-gray-400 p-12">
        <div className="max-w-4xl mx-auto">
          <p className="font-bold mb-6 text-center">What is SafeMentor?</p>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="border-2 border-black p-6">
              <div className="border border-black w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <p className="text-xs">Icon</p>
              </div>
              <p className="text-xs font-bold mb-2 text-center">Safe AI Companion</p>
              <p className="text-xs text-gray-600 text-center">An AI mentor that listens, supports, and guides children through their challenges</p>
            </div>

            <div className="border-2 border-black p-6">
              <div className="border border-black w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <p className="text-xs">Icon</p>
              </div>
              <p className="text-xs font-bold mb-2 text-center">Privacy First</p>
              <p className="text-xs text-gray-600 text-center">Conversations remain private. Parents see only emotional trends and safety alerts</p>
            </div>

            <div className="border-2 border-black p-6">
              <div className="border border-black w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <p className="text-xs">Icon</p>
              </div>
              <p className="text-xs font-bold mb-2 text-center">Parental Control</p>
              <p className="text-xs text-gray-600 text-center">Parents stay informed and maintain full control over their child's account</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="border-b-2 border-gray-400 p-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <p className="font-bold mb-6 text-center">How It Works</p>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4 items-center">
              <div className="border-2 border-black w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <p className="font-bold">1</p>
              </div>
              <div className="flex-1 border-2 border-black p-4">
                <p className="text-xs font-bold mb-2">Parent Signs Up</p>
                <p className="text-xs text-gray-600">Create your parent account and verify your identity</p>
              </div>
              <div className="border border-black w-32 h-20 flex items-center justify-center">
                <p className="text-xs text-gray-600">Diagram</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="text-center">
              <p className="text-lg">↓</p>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-center">
              <div className="border-2 border-black w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <p className="font-bold">2</p>
              </div>
              <div className="flex-1 border-2 border-black p-4">
                <p className="text-xs font-bold mb-2">Connect Your Child</p>
                <p className="text-xs text-gray-600">Get a QR code and connect your child's device</p>
              </div>
              <div className="border border-black w-32 h-20 flex items-center justify-center">
                <p className="text-xs text-gray-600">QR Code</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="text-center">
              <p className="text-lg">↓</p>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-center">
              <div className="border-2 border-black w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <p className="font-bold">3</p>
              </div>
              <div className="flex-1 border-2 border-black p-4">
                <p className="text-xs font-bold mb-2">Child Chats Safely</p>
                <p className="text-xs text-gray-600">Your child has private conversations with their AI mentor</p>
              </div>
              <div className="border border-black w-32 h-20 flex items-center justify-center">
                <p className="text-xs text-gray-600">Chat UI</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="text-center">
              <p className="text-lg">↓</p>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 items-center">
              <div className="border-2 border-black w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <p className="font-bold">4</p>
              </div>
              <div className="flex-1 border-2 border-black p-4">
                <p className="text-xs font-bold mb-2">Parents See Insights</p>
                <p className="text-xs text-gray-600">View aggregated emotional trends and receive safety alerts only</p>
              </div>
              <div className="border border-black w-32 h-20 flex items-center justify-center">
                <p className="text-xs text-gray-600">Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Privacy */}
      <div className="border-b-2 border-gray-400 p-12">
        <div className="max-w-3xl mx-auto">
          <p className="font-bold mb-6 text-center">Safety & Privacy Built In</p>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-2">🔒 Privacy by Default</p>
              <p className="text-xs text-gray-600">Messages are never shown to parents. Children have a truly private space to express themselves.</p>
            </div>

            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-2">🛡️ AI Safety Monitoring</p>
              <p className="text-xs text-gray-600">Our AI detects concerning patterns and alerts parents when intervention may be needed.</p>
            </div>

            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-2">✓ GDPR Compliant</p>
              <p className="text-xs text-gray-600">Full compliance with child data protection regulations. Parents control all data.</p>
            </div>

            <div className="border border-black p-4">
              <p className="text-xs font-bold mb-2">👪 Parental Control</p>
              <p className="text-xs text-gray-600">Parents can pause, disconnect, or delete child accounts at any time.</p>
            </div>
          </div>

          <div className="text-center">
            <div className="border border-black px-4 py-2 inline-block">
              <p className="text-xs">Read Full Privacy Policy →</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-b-2 border-gray-400 p-12 text-center bg-gray-100">
        <div className="max-w-2xl mx-auto">
          <p className="font-bold mb-4">Ready to get started?</p>
          <p className="text-xs text-gray-600 mb-6">Create your parent account and connect your child in minutes</p>
          
          <div className="border-2 border-black px-8 py-4 inline-block">
            <p className="font-bold">Sign Up as a Parent</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-black p-8 bg-white">
        <div className="max-w-4xl mx-auto flex justify-between">
          <div>
            <p className="text-xs font-bold mb-2">SafeMentor</p>
            <p className="text-xs text-gray-600">Safe AI mentorship for children</p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs font-bold mb-2">Product</p>
              <p className="text-xs text-gray-600">How it works</p>
              <p className="text-xs text-gray-600">Pricing</p>
            </div>
            <div>
              <p className="text-xs font-bold mb-2">Legal</p>
              <p className="text-xs text-gray-600">Privacy Policy</p>
              <p className="text-xs text-gray-600">Terms of Use</p>
            </div>
            <div>
              <p className="text-xs font-bold mb-2">Support</p>
              <p className="text-xs text-gray-600">Contact Us</p>
              <p className="text-xs text-gray-600">FAQ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Annotations */}
      <div className="p-4 bg-gray-50 border-t border-gray-400">
        <p className="text-xs font-bold mb-2">Landing Page Notes:</p>
        <p className="text-xs">• Clear value proposition for parents</p>
        <p className="text-xs">• Child CTA is informational only (no signup)</p>
        <p className="text-xs">• Privacy messaging prominent throughout</p>
        <p className="text-xs">• Step-by-step "How It Works" shows complete flow</p>
      </div>
    </div>
  );
}
