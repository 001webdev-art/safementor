import React from 'react';

export function ParentSafetyNotifications() {
  return (
    <div className="flex flex-col h-full bg-white p-6 font-sans border-2 border-black max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">SAFETY NOTIFICATIONS</h1>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">ACTIVE ALERTS</h2>
        <div className="border-2 border-black p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold bg-black text-white px-2 py-0.5 text-sm">RED FLAG</span>
            <span className="text-sm">Today, 10:30 AM</span>
          </div>
          <p className="mb-3 font-bold">LittlePrincess : Self-harm pattern detected</p>
          <div className="bg-gray-200 p-2 mb-2 text-sm">
            "I don't want to be here anymore..."
          </div>
          <div className="border-2 border-black bg-white p-4">
            <p className="text-sm font-bold mb-3">Guidance</p>
            <div className="space-y-2">
              <p className="text-sm">1) Talk to an expert, help line 123 123</p>
              <p className="text-sm">2) Stay calm and be gentle</p>
              <p className="text-sm">3) Say hello</p>
            </div>
          </div>
        </div>
      </div>


      {/* Important Warning */}
      <div className="border-2 border-black p-4 bg-gray-50 mb-6">
        <p className="text-sm mb-2">
          <span className="font-bold">⚠️ Important:</span>
        </p>
        <p className="text-sm">
          SafeMentor <span className="font-bold underline">is not</span> a human expert and{" "}
          <span className="font-bold underline">can make errors</span>. For help,{" "}
          <span className="font-bold underline">please always first contact a human expert</span>.
        </p>
      </div>

      {/* Emergency Resources */}
        <div className="border-2 border-black p-4 bg-gray-100 mb-6">
          <h3 className="font-bold text-lg mb-3">Need to Talk? Find Support Now</h3>
          <p className="text-sm mb-4">
            If you have immediate safety concerns, there is professional help:
          </p>
          <div className="space-y-2">
            <div className="border-2 border-black bg-white p-3 text-center font-bold">
              Sorgentelefon: 988
            </div>
            <div className="border-2 border-black bg-white p-3 text-center font-bold">
              Local Emergency Services: 112
            </div>
          </div>
        </div>

      
      {/* Recent Safety Notifications */}
      <div className="border-2 border-black p-6 mb-6">
        <p className="text-sm font-bold mb-4">
          Recent Safety Notifications
        </p>

        <div className="space-y-3 mb-4">
          <div className="border border-black p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="border border-black px-2 py-1">
                  <p className="text-xs font-bold">
                    Yellow Flag
                  </p>
                </div>
                <p className="text-xs font-bold">
                  School anxiety mentioned
                </p>
              </div>
              <p className="text-xs text-gray-600">
                Yesterday, 4:15 PM
              </p>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              Pattern detected in recent conversations
            </p>
            <div className="flex gap-2">
              <div className="border border-black px-3 py-1">
                <p className="text-xs">Get Advice</p>
              </div>
              <div className="border border-black px-3 py-1">
                <p className="text-xs">Mark Acknowledged</p>
              </div>
            </div>
          </div>

          <div className="border border-black p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="border border-black px-2 py-1">
                  <p className="text-xs font-bold">Info</p>
                </div>
                <p className="text-xs">
                  Positive mood patterns
                </p>
              </div>
              <p className="text-xs text-gray-600">
                Jan 5, 10:20 AM
              </p>
            </div>
            <p className="text-xs text-gray-600">
              Increased positive sentiment this week
            </p>
          </div>
        </div>

        <div className="border-t border-black pt-3">
          <div className="border border-black p-2 text-center">
            <p className="text-xs">
              View All Notifications →
            </p>
          </div>
        </div>
      </div>

      {/* Parental Action Log (KOSA - Accountability) */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">PARENTAL ACTION LOG</h2>
        <p className="text-sm mb-4">
          Track your responses to alerts (for accountability, not enforcement)
        </p>
        
        <div className="space-y-2">
          <div className="border border-black p-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold">Red Flag Alert</span>
              <span className="text-sm">Today, 10:30 AM</span>
            </div>
            <p className="text-sm text-gray-600">✓ Alert acknowledged</p>
            <p className="text-sm text-gray-600">✓ Crisis guide viewed</p>
          </div>

          <div className="border border-black p-3 bg-gray-100">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold">Yellow Flag Alert</span>
              <span className="text-sm">Yesterday, 4:15 PM</span>
            </div>
            <p className="text-sm text-gray-600">⚠ No action taken yet</p>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t-2 border-black pt-4">
        <h3 className="font-bold mb-2">WHAT TO DO NEXT</h3>
        <p className="text-sm mb-4">
          Immediate safety concerns should be addressed directly. 
          Use our guide for conversation starters.
        </p>
        <button className="border-2 border-black px-4 py-2 w-full font-bold">
          READ CRISIS GUIDE
        </button>
      </div>
    </div>
  );
}