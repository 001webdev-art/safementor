export function KidPrivacy() {
  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="border-b-2 border-black p-4 flex justify-between items-center">
        <div className="border border-black px-4 py-2">
          <p className="text-sm font-bold">SafeMentor Logo</p>
        </div>
        <div className="flex gap-3">
          <div className="border border-black px-3 py-1">
            <p className="text-xs">← Back</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-8">
        <p className="text-lg font-bold mb-2">Privacy for Kids</p>
        <p className="text-xs text-gray-600 mb-8">Easy-to-understand privacy information</p>

        {/* Intro */}
        <div className="bg-gray-100 border-2 border-black p-6 mb-6">
          <div className="border border-black w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <p className="text-xs">🛡️</p>
          </div>
          <p className="text-sm font-bold mb-3 text-center">Your Privacy Matters!</p>
          <p className="text-xs text-gray-600 text-center">We built SafeMentor to keep your conversations safe and private. Here's what that means in simple words.</p>
        </div>

        {/* What We Know About You */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">What We Know About You</p>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="border border-black w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <p className="text-xs">✓</p>
              </div>
              <div>
                <p className="text-xs font-bold">Your Nickname</p>
                <p className="text-xs text-gray-600">The name you chose when you signed up (not your real name!)</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="border border-black w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <p className="text-xs">✓</p>
              </div>
              <div>
                <p className="text-xs font-bold">Your Messages</p>
                <p className="text-xs text-gray-600">What you talk about with your AI mentor</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="border border-black w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <p className="text-xs">✓</p>
              </div>
              <div>
                <p className="text-xs font-bold">Your Age (Maybe)</p>
                <p className="text-xs text-gray-600">Only if you told us</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Messages Are Private */}
        <div className="bg-gray-100 border-4 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4 text-center">🔒 Your Messages Are PRIVATE</p>
          
          <div className="border-2 border-black p-4 bg-white mb-4">
            <p className="text-xs font-bold mb-2">Here's the important part:</p>
            <p className="text-xs text-gray-600 mb-3">Your parents CANNOT read your messages. We keep your conversations private so you can talk freely.</p>
            <p className="text-xs text-gray-600">Your mentor is just for you!</p>
          </div>

          <div className="border border-black p-4 bg-white">
            <p className="text-xs font-bold mb-2">What your parents CAN see:</p>
            <p className="text-xs text-gray-600 mb-2">• If you're feeling happy, sad, or need help (but not WHY)</p>
            <p className="text-xs text-gray-600 mb-2">• How many times you talked to your mentor</p>
            <p className="text-xs text-gray-600">• If something worrying happens (so they can help you)</p>
          </div>
        </div>

        {/* Safety */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">Keeping You Safe</p>
          
          <div className="space-y-3">
            <div className="border border-black p-3">
              <p className="text-xs font-bold mb-2">Our AI is trained to help you</p>
              <p className="text-xs text-gray-600">It listens and gives good advice, like a helpful friend</p>
            </div>

            <div className="border border-black p-3">
              <p className="text-xs font-bold mb-2">We watch out for danger</p>
              <p className="text-xs text-gray-600">If something seems really wrong, we'll tell your parents so they can help you stay safe</p>
            </div>

            <div className="border border-black p-3">
              <p className="text-xs font-bold mb-2">You can always talk to your parents</p>
              <p className="text-xs text-gray-600">If you ever feel uncomfortable, there's a button to ask your parents for help</p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="border-2 border-black p-6 mb-6">
          <p className="text-sm font-bold mb-4">What You Can Do</p>
          
          <div className="space-y-2">
            <p className="text-xs">• Ask your parents to see what information we have about you</p>
            <p className="text-xs">• Ask your parents to delete your account and all your messages</p>
            <p className="text-xs">• Stop using SafeMentor anytime you want</p>
            <p className="text-xs">• Ask questions about your privacy</p>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-gray-100 border-2 border-black p-6 mb-6 text-center">
          <p className="text-sm font-bold mb-3">Have Questions?</p>
          <p className="text-xs text-gray-600 mb-4">Talk to your parents! They can help you understand or contact us if you have questions.</p>
          
          <div className="border-2 border-black px-4 py-2 inline-block">
            <p className="text-xs font-bold">Ask a Grown-Up for Help</p>
          </div>
        </div>

        {/* Annotations */}
        <div className="p-4 bg-gray-50 border border-gray-400">
          <p className="text-xs font-bold mb-2">Kid-Friendly Privacy Notes:</p>
          <p className="text-xs">• Age-appropriate language (8-13 years old reading level)</p>
          <p className="text-xs">• Simple, reassuring tone</p>
          <p className="text-xs">• Emphasizes privacy and safety equally</p>
          <p className="text-xs">• Clear explanation of what parents can/cannot see</p>
          <p className="text-xs">• Accessible via link from main Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
