import { useState } from 'react';
import { ChatScreen as ChildChatScreen } from '../src/app/ChatScreen';
import { ParentLogin } from './ParentLogin';
import { ParentAccountOverview } from './ParentAccountOverview';
import { ParentChildConnection } from './ParentChildConnection';
import { ParentEmotionOverview } from './ParentEmotionOverview';
import { ParentSettings } from './ParentSettings';
import { ParentPrivacy } from './ParentPrivacy';
import { ParentSafetyNotifications } from './ParentSafetyNotifications';
import { ParentHelp } from './ParentHelp';
import { ParentDashboardUI } from './ParentDashboardUI';
import { ChildQRPairing } from './ChildQRPairing';
import { WelcomeScreen as ChildWelcome } from '../src/app/WelcomeScreen';
import { HelpScreen as ChildHelp } from '../src/app/HelpScreen';
import { ExitScreen as ChildExit } from '../src/app/ExitScreen';
import ChildApp from '../src/app/page';
import { LandingPage } from './website/LandingPage';
import { ParentSignup } from './website/ParentSignup';
import { AcceptTerms } from './website/AcceptTerms';
import { VerifyParent } from './website/VerifyParent';
import { GenerateQR } from './website/GenerateQR';
import { PrivacyPolicy } from './website/PrivacyPolicy';
import { KidPrivacy } from './website/KidPrivacy';
import { TermsOfUse } from './website/TermsOfUse';
import { ContactSupport } from './website/ContactSupport';
import { DownloadChildApp } from './website/DownloadChildApp';

type Screen = 
  | 'child-chat'
  | 'parent-login'
  | 'parent-overview'
  | 'parent-connection'
  | 'parent-emotions'
  | 'parent-settings'
  | 'parent-privacy'
  | 'parent-notifications'
  | 'parent-help'
  | 'parent-ui-example'
  | 'child-app-main'
  | 'child-qr'
  | 'child-welcome'
  | 'child-help'
  | 'child-exit'
  | 'landing'
  | 'signup'
  | 'accept-terms'
  | 'verify-parent'
  | 'generate-qr'
  | 'privacy-policy'
  | 'kid-privacy'
  | 'terms'
  | 'contact'
  | 'download-child-app';

export function NavigationFlow() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('download-child-app');

  const handleChildNavigate = (s: string) => setCurrentScreen(s as Screen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'child-chat':
        return <ChildChatScreen onNavigate={handleChildNavigate} messages={[]} setMessages={() => {}} />;
      case 'parent-login':
        return <ParentLogin />;
      case 'parent-overview':
        return <ParentAccountOverview />;
      case 'parent-connection':
        return <ParentChildConnection />;
      case 'parent-emotions':
        return <ParentEmotionOverview />;
      case 'parent-settings':
        return <ParentSettings />;
      case 'parent-privacy':
        return <ParentPrivacy />;
      case 'parent-notifications':
        return <ParentSafetyNotifications />;
      case 'parent-help':
        return <ParentHelp />;
      case 'parent-ui-example':
        return <ParentDashboardUI />;
      case 'child-app-main':
        return <ChildApp />;
      case 'child-qr':
        return <ChildQRPairing />;
      case 'child-welcome':
        return <ChildWelcome onNavigate={handleChildNavigate} />;
      case 'child-help':
        return <ChildHelp onNavigate={handleChildNavigate} />;
      case 'child-exit':
        return <ChildExit onNavigate={handleChildNavigate} />;
      case 'landing':
        return <LandingPage />;
      case 'signup':
        return <ParentSignup />;
      case 'accept-terms':
        return <AcceptTerms />;
      case 'verify-parent':
        return <VerifyParent />;
      case 'generate-qr':
        return <GenerateQR />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'kid-privacy':
        return <KidPrivacy />;
      case 'terms':
        return <TermsOfUse />;
      case 'contact':
        return <ContactSupport />;
      case 'download-child-app':
        return <DownloadChildApp />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Screen Navigation */}
      <div className="bg-gray-100 border-b-2 border-black p-4">
        <p className="text-xs font-bold mb-3">WIREFRAME NAVIGATION:</p>
        
        <div className="flex gap-2 mb-2">
          <p className="text-xs font-bold w-32">Website:</p>
          <button
            onClick={() => setCurrentScreen('landing')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'landing' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Landing
          </button>
          <button
            onClick={() => setCurrentScreen('signup')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'signup' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Signup
          </button>
          <button
            onClick={() => setCurrentScreen('accept-terms')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'accept-terms' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Accept Terms
          </button>
          <button
            onClick={() => setCurrentScreen('verify-parent')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'verify-parent' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Verify Parent
          </button>
          <button
            onClick={() => setCurrentScreen('generate-qr')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'generate-qr' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Generate QR
          </button>
          <button
            onClick={() => setCurrentScreen('privacy-policy')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'privacy-policy' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Privacy
          </button>
          <button
            onClick={() => setCurrentScreen('kid-privacy')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'kid-privacy' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Kid Privacy
          </button>
          <button
            onClick={() => setCurrentScreen('terms')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'terms' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Terms
          </button>
          <button
            onClick={() => setCurrentScreen('contact')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'contact' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => setCurrentScreen('download-child-app')}
            className={`border border-black px-3 py-1 text-xs font-bold ${
              currentScreen === 'download-child-app' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'
            }`}
          >
            Download App
          </button>
        </div>
        
        <div className="flex gap-2 mb-2">
          <p className="text-xs font-bold w-32">Child App:</p>
          <button
            onClick={() => setCurrentScreen('child-app-main')}
            className={`border border-black px-3 py-1 text-xs font-bold ${
              currentScreen === 'child-app-main' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600'
            }`}
          >
            📱 Launch Child App
          </button>
          <button
            onClick={() => setCurrentScreen('child-qr')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'child-qr' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            QR Pairing
          </button>
        </div>

        <div className="flex gap-2">
          <p className="text-xs font-bold w-32">Parent Dashboard:</p>
          <button
            onClick={() => setCurrentScreen('parent-login')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'parent-login' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentScreen('parent-overview')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'parent-overview' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setCurrentScreen('parent-connection')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'parent-connection' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Child Connection
          </button>
          <button
            onClick={() => setCurrentScreen('parent-emotions')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'parent-emotions' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Emotions
          </button>
          <button
            onClick={() => setCurrentScreen('parent-settings')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'parent-settings' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setCurrentScreen('parent-privacy')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'parent-privacy' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Privacy
          </button>
          <button
            onClick={() => setCurrentScreen('parent-notifications')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'parent-notifications' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setCurrentScreen('parent-help')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'parent-help' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            Help
          </button>
          <button
            onClick={() => setCurrentScreen('parent-ui-example')}
            className={`border border-black px-3 py-1 text-xs ${
              currentScreen === 'parent-ui-example' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            ✨ Polished UI
          </button>
        </div>
      </div>

      {/* Current Screen */}
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
}
