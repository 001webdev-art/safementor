export function ContactSupport() {
  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="border-b-2 border-black p-4 flex justify-between items-center">
        <div className="border border-black px-4 py-2">
          <p className="text-sm font-bold">SafeMentor Logo</p>
        </div>
        <div className="flex gap-3">
          <div className="border border-black px-3 py-1">
            <p className="text-xs">← Back to Home</p>
          </div>
          <div className="border-2 border-black px-4 py-1">
            <p className="text-xs font-bold">Parent Login</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-lg font-bold mb-2">Contact & Support</p>
        <p className="text-xs text-gray-600 mb-8">We're here to help. Choose how you'd like to reach us.</p>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border-2 border-black p-6 text-center">
            <div className="border border-black w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <p className="text-xs">?</p>
            </div>
            <p className="text-xs font-bold mb-2">FAQ</p>
            <p className="text-xs text-gray-600 mb-3">Common questions</p>
            <div className="border border-black p-2">
              <p className="text-xs">Browse FAQ →</p>
            </div>
          </div>

          <div className="border-2 border-black p-6 text-center">
            <div className="border border-black w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <p className="text-xs">📧</p>
            </div>
            <p className="text-xs font-bold mb-2">Email Support</p>
            <p className="text-xs text-gray-600 mb-3">Get help via email</p>
            <div className="border border-black p-2">
              <p className="text-xs">Send Email →</p>
            </div>
          </div>

          <div className="border-2 border-black p-6 text-center">
            <div className="border border-black w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <p className="text-xs">💬</p>
            </div>
            <p className="text-xs font-bold mb-2">Live Chat</p>
            <p className="text-xs text-gray-600 mb-3">Chat with our team</p>
            <div className="border border-black p-2">
              <p className="text-xs">Start Chat →</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border-2 border-black p-8 mb-8">
          <p className="text-sm font-bold mb-6">Send Us a Message</p>

          <div className="space-y-4 mb-6">
            {/* Name */}
            <div>
              <p className="text-xs mb-2">Your Name</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Enter your name...</p>
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs mb-2">Email Address</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Enter your email...</p>
              </div>
            </div>

            {/* Category */}
            <div>
              <p className="text-xs mb-2">Topic</p>
              <div className="border-2 border-black p-3">
                <p className="text-xs text-gray-600">Select topic ▼</p>
              </div>
              <p className="text-xs text-gray-600 mt-1">(Account Help, Privacy Question, Technical Issue, etc.)</p>
            </div>

            {/* Message */}
            <div>
              <p className="text-xs mb-2">Message</p>
              <div className="border-2 border-black p-3 h-32">
                <p className="text-xs text-gray-600">Describe your question or issue...</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-black p-4 text-center">
            <p className="text-sm font-bold">Send Message</p>
          </div>
        </div>

        {/* Direct Contact Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="border-2 border-black p-6">
            <p className="text-sm font-bold mb-4">Email Us</p>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-bold">General Support:</p>
                <p className="text-xs text-gray-600">support@safementor.com</p>
              </div>
              <div>
                <p className="text-xs font-bold">Privacy Questions:</p>
                <p className="text-xs text-gray-600">privacy@safementor.com</p>
              </div>
              <div>
                <p className="text-xs font-bold">Legal/Compliance:</p>
                <p className="text-xs text-gray-600">legal@safementor.com</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-black p-6">
            <p className="text-sm font-bold mb-4">Response Time</p>
            <div className="space-y-3">
              <div className="border border-black p-3">
                <p className="text-xs font-bold mb-1">Email</p>
                <p className="text-xs text-gray-600">Within 24 hours</p>
              </div>
              <div className="border border-black p-3">
                <p className="text-xs font-bold mb-1">Live Chat</p>
                <p className="text-xs text-gray-600">Mon-Fri, 9am-5pm GMT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-gray-100 border-4 border-black p-6 mb-8">
          <p className="text-sm font-bold mb-3">⚠️ In Case of Emergency</p>
          <p className="text-xs text-gray-600 mb-3">If you or your child is experiencing a mental health crisis or emergency, please contact appropriate emergency services immediately:</p>
          <div className="border-2 border-black p-3 bg-white">
            <p className="text-xs mb-1">• Call emergency services (911, 112, etc.)</p>
            <p className="text-xs mb-1">• Contact a crisis hotline in your region</p>
            <p className="text-xs">• Seek immediate professional medical help</p>
          </div>
        </div>

        {/* Resources */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Helpful Resources</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-black p-3">
              <p className="text-xs font-bold mb-1">Getting Started Guide</p>
              <p className="text-xs text-gray-600">Setup walkthrough</p>
            </div>
            <div className="border border-black p-3">
              <p className="text-xs font-bold mb-1">Parent Handbook</p>
              <p className="text-xs text-gray-600">Best practices</p>
            </div>
            <div className="border border-black p-3">
              <p className="text-xs font-bold mb-1">Privacy Guide</p>
              <p className="text-xs text-gray-600">Understanding data</p>
            </div>
            <div className="border border-black p-3">
              <p className="text-xs font-bold mb-1">Troubleshooting</p>
              <p className="text-xs text-gray-600">Common issues</p>
            </div>
          </div>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Contact/Support Notes:</p>
          <p className="text-xs">• Multiple contact methods (email, chat, form)</p>
          <p className="text-xs">• Clear categorization for routing inquiries</p>
          <p className="text-xs">• Emergency disclaimer prominent (not for crisis support)</p>
          <p className="text-xs">• Self-service resources available (FAQ, guides)</p>
          <p className="text-xs">• Response time expectations set upfront</p>
        </div>
      </div>
    </div>
  );
}
