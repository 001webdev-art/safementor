export function ParentEmotionOverview() {
  return (
    <div className="h-full bg-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden border-b-2 border-black p-4 flex justify-between items-center shrink-0">
        <div>
          <p className="text-sm font-bold">SafeMentor</p>
          <p className="text-xs text-gray-600">Parent Dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <h1 className="text-lg font-bold mb-6">Emotion Overview</h1>

        {/* Child Selector */}
        <div className="mb-6 flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
          <p className="text-sm">Viewing data for:</p>
          <div className="border-2 border-black p-2 w-full md:w-auto md:min-w-48">
            <p className="text-xs">Dropdown: Select Child ▼</p>
          </div>
        </div>

        {/* Time Range */}
        <div className="mb-6 flex flex-wrap gap-2 md:gap-4 items-center">
          <p className="text-sm w-full md:w-auto">Time period:</p>
          <div className="border-2 border-black p-2 bg-gray-200">
            <p className="text-xs font-bold">Last 7 Days</p>
          </div>
          <div className="border border-black p-2">
            <p className="text-xs">Last 30 Days</p>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-gray-100 border-2 border-black p-4 mb-6">
          <p className="text-xs font-bold mb-2">⚠️ Important:</p>
          <p className="text-xs text-gray-600">SafeMentor looks for patterns that may indicate risk. It cannot see everything and may miss or misinterpret signals. This tool supports—but does not replace—your relationship with your child.</p>
        </div>

        {/* Emotional Trends - Aggregated Only */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Emotional Trend Summary</p>
          
          {/* Chart Placeholder */}
          <div className="border border-black h-48 mb-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-gray-600">Line Chart Placeholder</p>
              <p className="text-xs text-gray-600 mt-1">Shows aggregated emotional patterns over time</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="border border-black w-4 h-4 bg-gray-400"></div>
              <p className="text-xs">Positive</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="border border-black w-4 h-4 bg-gray-200"></div>
              <p className="text-xs">Neutral</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="border border-black w-4 h-4 bg-gray-300"></div>
              <p className="text-xs">Needs Support</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border-2 border-black p-4">
            <p className="text-xs text-gray-600 mb-2">Total Sessions</p>
            <p className="text-xl font-bold">12</p>
          </div>

          <div className="border-2 border-black p-4">
            <p className="text-xs text-gray-600 mb-2">Avg. Sentiment</p>
            <p className="text-xl font-bold">Positive</p>
          </div>

          <div className="border-2 border-black p-4">
            <p className="text-xs text-gray-600 mb-2">Safety Alerts</p>
            <p className="text-xl font-bold">0</p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-100 border-2 border-black p-4 mb-4">
          <p className="text-xs font-bold mb-2">Privacy Protection Active:</p>
          <p className="text-xs text-gray-600">Only aggregated emotional trends are shown. Individual messages remain private to protect child's confidential space. Safety alerts are shown separately if AI detects concerning patterns.</p>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Key Principles:</p>
          <p className="text-xs">• NO message content visible (privacy-by-default)</p>
          <p className="text-xs">• Only high-level emotional patterns shown</p>
          <p className="text-xs">• Data aggregated across sessions</p>
          <p className="text-xs">• Default view: Last 7 days (maximum retention: 30 days)</p>
          <p className="text-xs">• After 30 days, data is permanently deleted (GDPR compliance)</p>
          <p className="text-xs">• Safety alerts separate from emotional tracking</p>
        </div>
      </div>

      {/* Navigation - Sidebar (Desktop) / Bottom Bar (Mobile) */}
      <div className="w-full md:w-48 border-t-2 md:border-t-0 md:border-r-2 border-black p-2 md:p-4 shrink-0 flex flex-col order-last md:order-first">
        <div className="hidden md:block border-b-2 border-black pb-4 mb-4">
          <p className="text-sm font-bold">SafeMentor</p>
          <p className="text-xs text-gray-600">Parent Dashboard</p>
        </div>

        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
          <div className="border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs">Overview</p>
          </div>
          <div className="bg-gray-200 border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs font-bold">Emotions</p>
          </div>
          <div className="border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs">Settings</p>
          </div>
          <div className="border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs">Privacy</p>
          </div>
          <div className="border border-black p-2 min-w-[100px] md:min-w-0 text-center md:text-left shrink-0">
            <p className="text-xs">Help</p>
          </div>
          
          {/* Mobile Logout */}
          <div className="border border-black p-2 min-w-[100px] text-center md:hidden shrink-0">
            <p className="text-xs">Logout</p>
          </div>
        </div>

        <div className="mt-auto pt-8 hidden md:block">
          <div className="border border-black p-2">
            <p className="text-xs">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}