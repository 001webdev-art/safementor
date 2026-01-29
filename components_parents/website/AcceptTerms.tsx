export function AcceptTerms() {
  return (
    <div className="h-full bg-white flex items-center justify-center overflow-y-auto">
      <div className="max-w-3xl w-full p-8">
        {/* Header */}
        <div className="border-b-2 border-black pb-6 mb-6">
          <p className="text-lg font-bold mb-2">Terms & Privacy</p>
          <p className="text-xs text-gray-600">Step 2 of 4: Review and accept our terms</p>
        </div>

        {/* Terms Preview */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Terms of Use</p>
          
          <div className="border border-black p-4 h-48 overflow-y-auto mb-4 bg-gray-50">
            <p className="text-xs text-gray-600 mb-3">[Terms of Use content placeholder]</p>
            <p className="text-xs text-gray-600 mb-3">1. Introduction and Acceptance...</p>
            <p className="text-xs text-gray-600 mb-3">2. Service Description...</p>
            <p className="text-xs text-gray-600 mb-3">3. Parental Responsibilities...</p>
            <p className="text-xs text-gray-600 mb-3">4. Account Security...</p>
            <p className="text-xs text-gray-600 mb-3">5. Data Usage and Storage...</p>
            <p className="text-xs text-gray-600 mb-3">Lorem ipsum placeholder text continues...</p>
          </div>

          <div className="border border-black p-3 mb-4">
            <p className="text-xs">☐ I have read and agree to the Terms of Use</p>
          </div>

          <div className="border border-black p-2 text-center">
            <p className="text-xs">View Full Terms →</p>
          </div>
        </div>

        {/* Privacy Policy Preview */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Privacy Policy</p>
          
          <div className="border border-black p-4 h-48 overflow-y-auto mb-4 bg-gray-50">
            <p className="text-xs text-gray-600 mb-3">[Privacy Policy content placeholder]</p>
            <p className="text-xs text-gray-600 mb-3">Data We Collect...</p>
            <p className="text-xs text-gray-600 mb-3">How We Use Your Data...</p>
            <p className="text-xs text-gray-600 mb-3">Child Data Protection (GDPR Art. 8)...</p>
            <p className="text-xs text-gray-600 mb-3">Parent Rights and Controls...</p>
            <p className="text-xs text-gray-600 mb-3">Data Retention Policies...</p>
            <p className="text-xs text-gray-600 mb-3">Lorem ipsum placeholder text continues...</p>
          </div>

          <div className="border border-black p-3 mb-4">
            <p className="text-xs">☐ I have read and agree to the Privacy Policy</p>
          </div>

          <div className="border border-black p-2 text-center">
            <p className="text-xs">View Full Privacy Policy →</p>
          </div>
        </div>

        {/* Parental Consent */}
        <div className="bg-gray-100 border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Parental Consent Declaration</p>
          
          <div className="space-y-3 mb-4">
            <div className="border border-black p-3">
              <p className="text-xs">☐ I confirm I am at least 18 years old</p>
            </div>

            <div className="border border-black p-3">
              <p className="text-xs">☐ I confirm I am the legal guardian of the child(ren) I will connect</p>
            </div>

            <div className="border border-black p-3">
              <p className="text-xs">☐ I consent to AI analysis of my child's conversations for safety purposes</p>
            </div>

            <div className="border border-black p-3">
              <p className="text-xs">☐ I understand that conversation content remains private from me (parent)</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <div className="border border-black p-3 flex-1 text-center">
            <p className="text-sm">← Back</p>
          </div>
          
          <div className="border-2 border-black p-3 flex-1 text-center">
            <p className="text-sm font-bold">Accept & Continue →</p>
          </div>
        </div>

        {/* Annotations */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Legal Consent Notes:</p>
          <p className="text-xs">• All checkboxes must be checked to proceed</p>
          <p className="text-xs">• Links to full legal documents available</p>
          <p className="text-xs">• GDPR: Explicit, informed consent required</p>
          <p className="text-xs">• Timestamp and version logged for compliance</p>
          <p className="text-xs">• Next: Parent verification step</p>
        </div>
      </div>
    </div>
  );
}
