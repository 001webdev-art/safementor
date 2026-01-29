export function TermsOfUse() {
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
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-lg font-bold mb-2">Terms of Use</p>
        <p className="text-xs text-gray-600 mb-8">Last Updated: January 2026</p>

        {/* Key Points */}
        <div className="bg-gray-100 border-2 border-black p-6 mb-8">
          <p className="text-sm font-bold mb-4">Key Points</p>
          <div className="space-y-2">
            <p className="text-xs">• Service is for children with parental supervision and consent</p>
            <p className="text-xs">• Parents must be legal guardians of connected children</p>
            <p className="text-xs">• AI provides mentorship, not medical or professional advice</p>
            <p className="text-xs">• Parents responsible for monitoring child's overall wellbeing</p>
            <p className="text-xs">• Service available in specific regions only</p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">1. Acceptance of Terms</p>
          <div className="border border-black p-4 bg-gray-50">
            <p className="text-xs text-gray-600">[Full legal text placeholder]</p>
            <p className="text-xs text-gray-600 mt-2">By creating an account or using SafeMentor, you agree to these Terms of Use. If you do not agree, you may not use the service...</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">2. Service Description</p>
          <div className="border border-black p-4 bg-gray-50 mb-3">
            <p className="text-xs text-gray-600 mb-2">SafeMentor provides AI-powered mentorship conversations for children under parental supervision.</p>
            <p className="text-xs text-gray-600 mb-2">The service includes:</p>
            <p className="text-xs text-gray-600">• Child chat application with AI mentor</p>
            <p className="text-xs text-gray-600">• Parent dashboard with aggregated insights</p>
            <p className="text-xs text-gray-600">• Safety monitoring and alert system</p>
            <p className="text-xs text-gray-600">• Privacy-by-default conversation protection</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">3. Eligibility & Parental Responsibilities</p>
          
          <div className="bg-gray-100 border-2 border-black p-4 mb-3">
            <p className="text-xs font-bold mb-2">Parent/Guardian Requirements:</p>
            <p className="text-xs text-gray-600 mb-1">• Must be at least 18 years old</p>
            <p className="text-xs text-gray-600 mb-1">• Must be legal guardian of child(ren) connected</p>
            <p className="text-xs text-gray-600 mb-1">• Must provide verifiable parental consent</p>
            <p className="text-xs text-gray-600">• Responsible for monitoring child's use and wellbeing</p>
          </div>

          <div className="border border-black p-4 bg-gray-50">
            <p className="text-xs font-bold mb-2">Child Requirements:</p>
            <p className="text-xs text-gray-600 mb-1">• Must have parent/guardian approval</p>
            <p className="text-xs text-gray-600 mb-1">• Must not share personal identifying information in chats</p>
            <p className="text-xs text-gray-600">• Must follow community guidelines and safety rules</p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">4. Not Medical or Professional Advice</p>
          <div className="bg-gray-100 border-4 border-black p-4">
            <p className="text-xs font-bold mb-2">IMPORTANT DISCLAIMER:</p>
            <p className="text-xs text-gray-600 mb-2">SafeMentor is NOT a substitute for professional medical, psychological, or therapeutic services. The AI provides general mentorship and support only.</p>
            <p className="text-xs text-gray-600">In case of medical or mental health emergencies, contact appropriate professional services immediately.</p>
          </div>
        </div>

        {/* Section 5 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">5. Account Security</p>
          <div className="border border-black p-4 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Parents are responsible for:</p>
            <p className="text-xs text-gray-600">• Maintaining account password security</p>
            <p className="text-xs text-gray-600">• Monitoring authorized child connections</p>
            <p className="text-xs text-gray-600">• Reporting unauthorized access immediately</p>
            <p className="text-xs text-gray-600">• Ensuring QR codes are used securely</p>
          </div>
        </div>

        {/* Section 6 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">6. Prohibited Use</p>
          <div className="border border-black p-3 bg-gray-50">
            <p className="text-xs text-gray-600 mb-1">• Impersonating others</p>
            <p className="text-xs text-gray-600 mb-1">• Attempting to bypass safety systems</p>
            <p className="text-xs text-gray-600 mb-1">• Sharing accounts with non-authorized users</p>
            <p className="text-xs text-gray-600 mb-1">• Using service for illegal activities</p>
            <p className="text-xs text-gray-600">• Reverse engineering or extracting AI models</p>
          </div>
        </div>

        {/* Section 7 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">7. Data Usage & Privacy</p>
          <div className="border border-black p-4 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Data handling is governed by our Privacy Policy. By using SafeMentor, you agree to data processing as described in the Privacy Policy.</p>
            <p className="text-xs text-gray-600">Parents maintain full control and can request data deletion at any time.</p>
          </div>
        </div>

        {/* Section 8 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">8. Termination</p>
          <div className="border border-black p-3 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Either party may terminate service at any time:</p>
            <p className="text-xs text-gray-600 mb-1">• Parents can delete accounts via dashboard</p>
            <p className="text-xs text-gray-600 mb-1">• We may suspend accounts for Terms violations</p>
            <p className="text-xs text-gray-600">• Data deletion follows Privacy Policy procedures</p>
          </div>
        </div>

        {/* Section 9 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">9. Limitation of Liability</p>
          <div className="border border-black p-4 bg-gray-50">
            <p className="text-xs text-gray-600">[Full legal disclaimer placeholder] Service provided "as is" without warranties. Not liable for indirect damages. Maximum liability limited to subscription fees paid...</p>
          </div>
        </div>

        {/* Section 10 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">10. Changes to Terms</p>
          <div className="border border-black p-3 bg-gray-50">
            <p className="text-xs text-gray-600">We may update these Terms. Users will be notified of material changes via email. Continued use after changes constitutes acceptance.</p>
          </div>
        </div>

        {/* Contact */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-3">Contact</p>
          <p className="text-xs text-gray-600 mb-3">Questions about these Terms?</p>
          <p className="text-xs mb-1">Email: legal@safementor.com</p>
          <p className="text-xs">Address: [Company address placeholder]</p>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Terms of Use Notes:</p>
          <p className="text-xs">• Full legal document (lawyer-reviewed in production)</p>
          <p className="text-xs">• Clear parental responsibility clauses</p>
          <p className="text-xs">• Medical/professional advice disclaimer prominent</p>
          <p className="text-xs">• References Privacy Policy for data handling</p>
          <p className="text-xs">• Standard liability limitations and dispute resolution</p>
        </div>
      </div>
    </div>
  );
}
