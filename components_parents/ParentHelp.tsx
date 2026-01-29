import React from "react";

export function ParentHelp() {
  return (
    <div className="flex flex-col h-full bg-white p-6 font-sans border-2 border-black max-w-4xl mx-auto overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">
        HELP & SUPPORT
      </h1>

      {/* Link to Website Help */}
      <div className="bg-gray-100 border-2 border-black p-4 mb-6">
        <p className="text-sm font-bold mb-2">
          📚 Complete Documentation
        </p>
        <p className="text-sm mb-3">
          Visit www.safementor.com/help for full guides, FAQs,
          and resources.
        </p>
        <button className="border-2 border-black px-4 py-2 font-bold">
          Visit Help Center →
        </button>
      </div>

      <div className="space-y-6">
        {/* Why This Is Not a Surveillance Tool (AADC) */}
        <div className="border-2 border-black p-4">
          <h3 className="font-bold text-lg mb-3">
            WHY THIS IS NOT A SURVEILLANCE TOOL
          </h3>

          <div className="space-y-3 mb-4">
            <div>
              <p className="text-sm font-bold mb-1">
                ✗ What SafeMentor Does NOT Do:
              </p>
              <p className="text-sm">
                • No live monitoring of conversations
              </p>
              <p className="text-sm">
                • No chat replay or message history viewing
              </p>
              <p className="text-sm">
                • No emotion scoring or behavioral surveillance
              </p>
              <p className="text-sm">
                • No tracking of child's location or device
                usage
              </p>
              <p className="text-sm">
                • No parent access to raw chat logs
              </p>
            </div>

            <div className="border-t-2 border-black pt-3">
              <p className="text-sm font-bold mb-1">
                ✓ What SafeMentor Does:
              </p>
              <p className="text-sm">
                • Provides AI companion for child to talk to
                freely
              </p>
              <p className="text-sm">
                • Detects patterns that may indicate risk
              </p>
              <p className="text-sm">
                • Sends aggregated emotional trends (not
                messages)
              </p>
              <p className="text-sm">
                • Alerts parents only when serious concerns
                detected
              </p>
            </div>
          </div>

          <div className="bg-gray-100 border border-black p-3">
            <p className="text-sm font-bold mb-1">
              Why this is safer for kids:
            </p>
            <p className="text-sm">
              Privacy protection encourages honest
              communication. Children need a confidential space
              to process emotions without fear of surveillance.
              This builds trust and enables earlier intervention
              when needed.
            </p>
          </div>
        </div>

        {/* Child Rights Safeguards (EU Requirement) */}
        <div className="border-2 border-black p-4">
          <h3 className="font-bold text-lg mb-3">
            HOW CHILD RIGHTS ARE PROTECTED
          </h3>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-bold mb-1">
                Why Parents Don't See Raw Chats:
              </p>
              <p className="text-sm">
                Protecting child dignity and developmental
                autonomy. Children need private space to develop
                identity and emotional regulation. Constant
                surveillance damages trust and healthy
                development.
              </p>
            </div>

            <div className="border-t border-gray-400 pt-3">
              <p className="text-sm font-bold mb-1">
                How Escalation Works:
              </p>
              <p className="text-sm">
                Only serious concerns trigger alerts. This
                avoids "snitching dynamics" where children stop
                talking honestly. The AI distinguishes between
                normal struggles and genuine risk.
              </p>
            </div>

            <div className="border-t border-gray-400 pt-3">
              <p className="text-sm font-bold mb-1">
                Trust + Safety Balance:
              </p>
              <p className="text-sm">
                SafeMentor is designed to support parent-child
                relationship, not replace it. Privacy-by-default
                maintains trust while safety alerts enable
                timely intervention.
              </p>
            </div>
          </div>
        </div>

        {/* How SafeMentor Works */}
        <div className="border-2 border-black p-4">
          <h3 className="font-bold text-lg mb-3">
            HOW SAFEMENTOR WORKS
          </h3>
          <p className="text-sm mb-3">
            Our privacy-first approach protects your child while
            keeping you informed of what matters.
          </p>

          <div className="space-y-2">
            <div className="border border-black p-3">
              <p className="text-sm font-bold mb-1">
                1. Child Talks to AI Companion
              </p>
              <p className="text-sm">
                Private conversations in a safe space
              </p>
            </div>
            <div className="border border-black p-3">
              <p className="text-sm font-bold mb-1">
                2. AI Analyzes Patterns
              </p>
              <p className="text-sm">
                Looking for emotional trends and risk indicators
              </p>
            </div>
            <div className="border border-black p-3">
              <p className="text-sm font-bold mb-1">
                3. Parents See Aggregated Data
              </p>
              <p className="text-sm">
                General mood trends, no raw messages
              </p>
            </div>
            <div className="border border-black p-3">
              <p className="text-sm font-bold mb-1">
                4. Alerts When Needed
              </p>
              <p className="text-sm">
                Only serious concerns trigger notifications
              </p>
            </div>
          </div>
        </div>

        {/* Understanding Emotional Trends */}
        <div className="border-2 border-black p-4">
          <h3 className="font-bold text-lg mb-3">
            UNDERSTANDING EMOTIONAL TRENDS
          </h3>

          <div className="space-y-3">
            <div className="border border-black p-3">
              <p className="text-sm font-bold mb-1">
                What the charts show:
              </p>
              <p className="text-sm">
                Aggregated patterns over time, not individual
                messages. Look for trends, not single data
                points.
              </p>
            </div>

            <div className="border border-black p-3">
              <p className="text-sm font-bold mb-1">
                Interpreting changes:
              </p>
              <p className="text-sm">
                Gradual shifts are normal. Sudden changes or
                sustained negative patterns warrant attention.
              </p>
            </div>
          </div>
        </div>

        {/* Signal Types Explanation */}
        <div className="border-2 border-black p-4">
          <h3 className="font-bold text-lg mb-3">
            UNDERSTANDING SIGNAL TYPES
          </h3>

          <div className="space-y-3">
            <div className="border-l-4 border-black pl-3">
              <p className="text-sm font-bold">
                Informational Signal
              </p>
              <p className="text-sm">
                General patterns detected. No immediate action
                needed. For your awareness only.
              </p>
            </div>

            <div className="border-l-4 border-black pl-3">
              <p className="text-sm font-bold">Yellow Flag</p>
              <p className="text-sm">
                Potential concern detected. Consider having a
                gentle check-in conversation with your child.
              </p>
            </div>

            <div className="border-l-4 border-black pl-3">
              <p className="text-sm font-bold">Red Flag</p>
              <p className="text-sm">
                Serious concern requiring immediate attention.
                Safety issue detected (self-harm, abuse, etc.)
              </p>
            </div>
          </div>
        </div>

        {/* False Positives / False Negatives */}
        <div className="border-2 border-black p-4">
          <h3 className="font-bold text-lg mb-3">
            AI LIMITATIONS: FALSE SIGNALS
          </h3>

          <div className="space-y-3 mb-4">
            <div className="bg-gray-100 border border-black p-3">
              <p className="text-sm font-bold mb-1">
                False Positives (Over-detection):
              </p>
              <p className="text-sm">
                AI may flag innocent conversations as
                concerning. Example: "I want to die" in context
                of a video game. Always consider context and
                trust your judgment.
              </p>
            </div>

            <div className="bg-gray-100 border border-black p-3">
              <p className="text-sm font-bold mb-1">
                False Negatives (Under-detection):
              </p>
              <p className="text-sm">
                AI may miss subtle signs or coded language. This
                tool supports—but does not replace—your parental
                awareness and relationship with your child.
              </p>
            </div>
          </div>

          <div className="border-2 border-black p-3">
            <p className="text-sm font-bold">
              ⚠️ Critical Reminder:
            </p>
            <p className="text-sm">
              SafeMentor looks for patterns that may indicate
              risk. It cannot see everything and may miss or
              misinterpret signals. Your judgment and
              relationship with your child remain primary.
            </p>
          </div>
        </div>

        {/* Emergency Resources */}
        <div className="border-2 border-black p-4 bg-gray-100">
          <h3 className="font-bold text-lg mb-3">
            🆘 EMERGENCY RESOURCES
          </h3>
          <p className="text-sm mb-4">
            If you have immediate safety concerns, contact
            professional help directly:
          </p>
          <div className="space-y-2">
            <div className="border-2 border-black bg-white p-3 text-center font-bold">
              National Crisis Line: 988
            </div>
            <div className="border-2 border-black bg-white p-3 text-center font-bold">
              Crisis Text Line: Text HOME to 741741
            </div>
            <div className="border-2 border-black bg-white p-3 text-center font-bold">
              Find a Therapist (www.1116117.de)
            </div>
            <div className="border-2 border-black bg-white p-3 text-center font-bold">
              Local Emergency Services: 911
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-6 text-center border-t-2 border-black pt-6">
        <p className="text-sm font-bold">
          SafeMentor Support Team
        </p>
        <p className="text-sm">support@safementor.com</p>
      </div>

      {/* Annotations */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-400">
        <p className="text-xs font-bold mb-2">
          Help Page Expansion:
        </p>
        <p className="text-xs">
          • Link to website help (easier to maintain
          documentation)
        </p>
        <p className="text-xs">
          • "Not a Surveillance Tool" section (AADC alignment)
        </p>
        <p className="text-xs">
          • Child Rights Safeguards (EU regulatory expectation)
        </p>
        <p className="text-xs">
          • False positives/negatives explanation (transparency)
        </p>
        <p className="text-xs">
          • Clear explanation of signal types and limitations
        </p>
      </div>
    </div>
  );
}