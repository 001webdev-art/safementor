export function PrivacyPolicy() {
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
        <p className="text-lg font-bold mb-2">Privacy Policy</p>
        <p className="text-xs text-gray-600 mb-8">Last Updated: January 2026</p>

        {/* Quick Summary */}
        <div className="bg-gray-100 border-2 border-black p-6 mb-8">
          <p className="text-sm font-bold mb-4">Quick Summary</p>
          <div className="space-y-2">
            <p className="text-xs">• Children's conversations remain private (not shown to parents)</p>
            <p className="text-xs">• Parents see only aggregated emotional trends and safety alerts</p>
            <p className="text-xs">• We collect minimal data required for service operation</p>
            <p className="text-xs">• Full GDPR compliance including child data protection (Art. 8)</p>
            <p className="text-xs">• Parents control all data and can delete anytime</p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">1. Introduction</p>
          <div className="border border-black p-4 bg-gray-50 mb-3">
            <p className="text-xs text-gray-600">[Full legal text placeholder]</p>
            <p className="text-xs text-gray-600 mt-2">This Privacy Policy describes how SafeMentor ("we," "our," or "us") collects, uses, and protects information when you use our AI mentorship service for children...</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">2. Information We Collect</p>
          
          <p className="text-xs font-bold mb-2">Parent Data:</p>
          <div className="border border-black p-3 mb-3">
            <p className="text-xs text-gray-600">• Email address</p>
            <p className="text-xs text-gray-600">• Full name</p>
            <p className="text-xs text-gray-600">• Password (encrypted)</p>
            <p className="text-xs text-gray-600">• Country/region</p>
            <p className="text-xs text-gray-600">• Verification data (email confirmation)</p>
          </div>

          <p className="text-xs font-bold mb-2">Child Data:</p>
          <div className="border border-black p-3 mb-3">
            <p className="text-xs text-gray-600">• Nickname (no real name required)</p>
            <p className="text-xs text-gray-600">• Age range (optional)</p>
            <p className="text-xs text-gray-600">• Conversation content (encrypted, not shown to parents)</p>
            <p className="text-xs text-gray-600">• Aggregated emotional sentiment data</p>
            <p className="text-xs text-gray-600">• Safety alert triggers (if concerning patterns detected)</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">3. How We Use Data</p>
          <div className="border border-black p-4 bg-gray-50 mb-3">
            <p className="text-xs text-gray-600 mb-2">• Provide AI mentorship conversations</p>
            <p className="text-xs text-gray-600 mb-2">• Analyze emotional patterns for parent insights</p>
            <p className="text-xs text-gray-600 mb-2">• Detect safety concerns and generate alerts</p>
            <p className="text-xs text-gray-600 mb-2">• Improve AI response quality</p>
            <p className="text-xs text-gray-600">• Comply with legal obligations</p>
          </div>
        </div>

        {/* Section 4 - Privacy by Default */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">4. Privacy by Default</p>
          <div className="bg-gray-100 border-2 border-black p-4 mb-3">
            <p className="text-xs font-bold mb-2">Core Privacy Principle:</p>
            <p className="text-xs text-gray-600 mb-3">Children's conversation content is NEVER displayed to parents. This ensures children have a safe, confidential space to express themselves.</p>
            <p className="text-xs text-gray-600">Parents receive only: (1) Aggregated emotional trends, (2) Safety alerts when AI detects concerning patterns. No message details are shared.</p>
          </div>
        </div>

        {/* Section 5 - GDPR */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">5. GDPR Compliance & Child Data Protection</p>
          <div className="border border-black p-4 bg-gray-50 mb-3">
            <p className="text-xs text-gray-600 mb-2">Under GDPR Article 8, we require verifiable parental consent before processing child data.</p>
            
            <p className="text-xs font-bold mt-3 mb-2">Your Rights:</p>
            <p className="text-xs text-gray-600 mb-1">• Right to Access: Export all data</p>
            <p className="text-xs text-gray-600 mb-1">• Right to Erasure: Delete child account and all data</p>
            <p className="text-xs text-gray-600 mb-1">• Right to Rectification: Update incorrect information</p>
            <p className="text-xs text-gray-600 mb-1">• Right to Withdraw Consent: Disconnect child at any time</p>
            <p className="text-xs text-gray-600">• Right to Data Portability: Download data in machine-readable format</p>
          </div>
        </div>

        {/* Section 6 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">6. Data Retention</p>
          <div className="border border-black p-3 mb-3">
            <p className="text-xs text-gray-600 mb-2">• Conversation data: Configurable (default 30 days)</p>
            <p className="text-xs text-gray-600 mb-2">• Aggregated insights: Retained while account active</p>
            <p className="text-xs text-gray-600 mb-2">• Account deletion: All data permanently erased within 30 days</p>
            <p className="text-xs text-gray-600">• Legal hold: Data retained only if required by law</p>
          </div>
        </div>

        {/* Section 7 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">7. Security Measures</p>
          <div className="border border-black p-4 bg-gray-50 mb-3">
            <p className="text-xs text-gray-600">End-to-end encryption, secure data centers, regular security audits, access controls, and incident response procedures in place. [Full technical details placeholder]</p>
          </div>
        </div>

        {/* Section 8 */}
        <div className="border-b-2 border-gray-400 pb-6 mb-6">
          <p className="text-sm font-bold mb-3">8. Third-Party Sharing</p>
          <div className="bg-gray-100 border-2 border-black p-4 mb-3">
            <p className="text-xs font-bold mb-2">We do NOT sell or share your data with third parties.</p>
            <p className="text-xs text-gray-600">Limited sharing only for: Service providers (cloud hosting, AI processing), legal compliance, safety emergencies.</p>
          </div>
        </div>

        {/* Contact */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-3">Contact & Data Requests</p>
          <p className="text-xs text-gray-600 mb-3">For privacy questions, data access requests, or to exercise your GDPR rights:</p>
          <p className="text-xs mb-1">Email: privacy@safementor.com</p>
          <p className="text-xs mb-1">Data Protection Officer: dpo@safementor.com</p>
          <p className="text-xs">Address: [Company address placeholder]</p>
        </div>

        {/* Kid-Friendly Link */}
        <div className="border-2 border-black p-4 text-center mb-6 bg-gray-100">
          <p className="text-xs font-bold mb-2">Are you a kid?</p>
          <div className="border-2 border-black px-4 py-2 inline-block">
            <p className="text-xs font-bold">Read the Kid-Friendly Privacy Summary →</p>
          </div>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Privacy Policy Notes:</p>
          <p className="text-xs">• Full legal document (lawyer-reviewed in production)</p>
          <p className="text-xs">• GDPR Article 8 compliance for child data</p>
          <p className="text-xs">• Clear explanation of privacy-by-default principle</p>
          <p className="text-xs">• All parent rights clearly listed</p>
          <p className="text-xs">• Link to kid-friendly summary version</p>
        </div>
      </div>
    </div>
  );
}
