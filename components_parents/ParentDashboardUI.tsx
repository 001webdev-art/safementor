import React, { useState, useEffect } from 'react';
import { 
  Shield, TriangleAlert, Info, ChevronRight, Bell, Settings, CircleHelp, 
  LogOut, User, Clock, CircleCheck, BarChart3, Lock, Loader2, Menu,
  ChevronDown, Calendar, Trash2, Smartphone, Monitor, QrCode, Mail, Pause, Check,
  FileText, CheckCircle2
} from 'lucide-react';
import { ParentService, AuthService, Child, SafetyAlert, EmotionTrend, ChatMessage } from '../src/app/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

import { WelcomeScreen as ChildWelcome } from '../src/app/WelcomeScreen';
import { ChatScreen as ChildChatScreen } from '../src/app/ChatScreen';
import { HelpScreen as ChildHelp } from '../src/app/HelpScreen';
import { ExitScreen as ChildExit } from '../src/app/ExitScreen';

// --- SUB-COMPONENTS FOR PAGES ---

const PrivacyConsentPage = ({ onConfirm, onBack }: { onConfirm: () => void, onBack: () => void }) => {
  const [step, setStep] = useState<'vpc' | 'agreements'>('vpc');
  const [verificationMethod, setVerificationMethod] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [agreements, setAgreements] = useState({
    dataMinimization: false,
    safetyProtocols: false,
    nonFriend: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async () => {
    const allAgreed = Object.values(agreements).every(v => v);
    if (!allAgreed) return;
    
    setIsLoading(true);
    try {
      // Use the service to verify and finalize account creation
      await AuthService.verifyIdentity(verificationMethod || 'unknown', { 
        phoneNumber: verificationMethod === 'sms' ? phoneNumber : undefined,
        countryCode: verificationMethod === 'sms' ? countryCode : undefined
      });
      onConfirm();
    } catch (err) {
      console.error(err);
      // Handle error UI if needed
    } finally {
      setIsLoading(false);
    }
  };

  const VerificationCard = ({ id, icon: Icon, title, desc }: any) => (
    <button 
      onClick={() => setVerificationMethod(id)}
      className={`relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
        verificationMethod === id 
          ? 'border-[#889A7F] bg-[#F5F7F4]' 
          : 'border-gray-200 bg-white hover:border-[#BFC9B9] hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${verificationMethod === id ? 'bg-[#889A7F] text-white' : 'bg-gray-100 text-gray-500'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className={`font-bold ${verificationMethod === id ? 'text-[#4A5445]' : 'text-gray-900'}`}>{title}</h4>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
      {verificationMethod === id && (
        <div className="absolute top-4 right-4 text-[#889A7F]">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}
    </button>
  );

  if (step === 'vpc') {
    return (
      <div className="min-h-full w-full bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-gray-100">
             <div className="flex items-center gap-3 mb-2">
               <div className="w-10 h-10 bg-[#E8EDE6] rounded-full flex items-center justify-center">
                 <Shield className="w-5 h-5 text-[#889A7F]" />
               </div>
               <h2 className="text-xl font-bold text-gray-900">Verifiable Parental Consent (VPC)</h2>
             </div>
             <p className="text-gray-600 text-sm leading-relaxed">
               Because SafeMentor processes a child's data, federal law (COPPA) requires "verifiable" proof that you are the legal guardian. Please select a verification method:
             </p>
          </div>
          
          <div className="p-8 space-y-4 bg-gray-50/50">
             <VerificationCard 
               id="sms" 
               icon={Smartphone} 
               title="SMS Verification" 
               desc="We will send a secure 6-digit code to your mobile device to verify your identity as the account holder." 
             />
             
             {verificationMethod === 'sms' && (
               <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Phone Number</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-24 px-2 py-2.5 rounded-xl border border-[#D4DDD0] focus:border-[#9AAE8F] focus:ring-2 focus:ring-[#E8EDE6] outline-none transition-all text-sm bg-white"
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                    </select>
                    <div className="relative flex-1">
                      <Smartphone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4DDD0] focus:border-[#9AAE8F] focus:ring-2 focus:ring-[#E8EDE6] outline-none transition-all text-sm bg-white"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Number used for verification only. Never shared.
                  </p>
               </div>
             )}
          </div>

          <div className="p-6 border-t border-gray-100 bg-white flex justify-between items-center">
             <button onClick={onBack} className="text-gray-500 font-medium hover:text-gray-800 transition-colors">Back</button>
             <button 
               onClick={() => setStep('agreements')}
               disabled={!verificationMethod || (verificationMethod === 'sms' && phoneNumber.length < 10)}
               className="bg-[#889A7F] hover:bg-[#748866] text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
             >
               Verify & Continue
               <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[800px]">
        
        {/* Left Side: Summary */}
        <div className="bg-[#889A7F] p-8 md:w-1/3 flex flex-col justify-between text-white relative overflow-hidden shrink-0">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-4">Final Agreement</h2>
            <p className="text-[#E8EDE6] text-sm leading-relaxed mb-6">
              SafeMentor is a tool, not a replacement for parenting. These terms ensure you understand the limitations and safety protocols.
            </p>
            
            <div className="bg-[#748866]/50 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#D4DDD0] mt-0.5" />
                <div className="text-xs text-[#E8EDE6]">
                  <strong className="block text-white">Identity Verified</strong>
                  Using {verificationMethod === 'sms' ? 'SMS Verification' : verificationMethod === 'credit' ? 'Credit Card' : verificationMethod === 'id' ? 'ID Upload' : 'Facial Scan'}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#D4DDD0] mt-0.5" />
                <div className="text-xs text-[#E8EDE6]">
                  <strong className="block text-white">Bank-Grade Privacy</strong>
                  Data encrypted at rest and in transit.
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#9AAE8F] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#748866] rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Right Side: Detailed Terms */}
        <div className="flex-1 flex flex-col h-full bg-gray-50">
           <div className="p-8 overflow-y-auto flex-1 space-y-8">
             
             {/* Section 1 */}
             <section>
               <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-4">
                 <div className="w-6 h-6 rounded-full bg-[#E8EDE6] text-[#4A5445] flex items-center justify-center text-xs">1</div>
                 Data Privacy & Safe Training
               </h3>
               <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                 <p className="text-sm text-gray-600">You must agree to how your child’s data is handled. Unlike standard AI, we enforce:</p>
                 <ul className="space-y-2 text-sm text-gray-600 pl-2">
                   <li className="flex gap-2">
                     <span className="font-bold text-gray-800 whitespace-nowrap">Data Minimization:</span>
                     <span>Only collecting what is strictly necessary.</span>
                   </li>
                   <li className="flex gap-2">
                     <span className="font-bold text-gray-800 whitespace-nowrap">No Commercial Use:</span>
                     <span>Data is never sold to advertisers.</span>
                   </li>
                   <li className="flex gap-2">
                     <span className="font-bold text-gray-800 whitespace-nowrap">Human-in-the-loop:</span>
                     <span>Consent for alerts on "red flag" risks.</span>
                   </li>
                 </ul>
                 <label className="flex items-start gap-3 pt-2 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-all flex-shrink-0 ${agreements.dataMinimization ? 'bg-[#889A7F] border-[#889A7F]' : 'bg-white border-gray-300 group-hover:border-[#9AAE8F]'}`}>
                     {agreements.dataMinimization && <Check className="w-3.5 h-3.5 text-white" />}
                   </div>
                   <input type="checkbox" className="hidden" checked={agreements.dataMinimization} onChange={() => setAgreements({...agreements, dataMinimization: !agreements.dataMinimization})} />
                   <span className="text-sm font-medium text-gray-800">I agree to the Data Privacy Standards</span>
                 </label>
               </div>
             </section>

             {/* Section 2 */}
             <section>
               <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-4">
                 <div className="w-6 h-6 rounded-full bg-[#E8EDE6] text-[#4A5445] flex items-center justify-center text-xs">2</div>
                 Safety Protocols & Limitations
               </h3>
               <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                 <ul className="space-y-3 text-sm text-gray-600 pl-2">
                   <li className="flex gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#889A7F] mt-1.5 shrink-0"></div>
                     <span><strong>Safety Logic:</strong> The AI uses an "Honest Bridge" approach—it will tell the child if it needs to alert you.</span>
                   </li>
                   <li className="flex gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#889A7F] mt-1.5 shrink-0"></div>
                     <span><strong>Content Guardrails:</strong> It will refuse to answer questions about self-harm or illegal acts.</span>
                   </li>
                 </ul>
                 <label className="flex items-start gap-3 pt-2 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-all flex-shrink-0 ${agreements.safetyProtocols ? 'bg-[#889A7F] border-[#889A7F]' : 'bg-white border-gray-300 group-hover:border-[#9AAE8F]'}`}>
                     {agreements.safetyProtocols && <Check className="w-3.5 h-3.5 text-white" />}
                   </div>
                   <input type="checkbox" className="hidden" checked={agreements.safetyProtocols} onChange={() => setAgreements({...agreements, safetyProtocols: !agreements.safetyProtocols})} />
                   <span className="text-sm font-medium text-gray-800">I acknowledge these Safety Protocols</span>
                 </label>
               </div>
             </section>

             {/* Section 3 */}
             <section>
               <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-4">
                 <div className="w-6 h-6 rounded-full bg-[#E8EDE6] text-[#4A5445] flex items-center justify-center text-xs">3</div>
                 The "Non-Friend" Clause
               </h3>
               <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                 <p className="text-sm text-gray-600">
                   You agree that the AI is a tool, not a human, and you will help your child understand the difference to prevent emotional dependency.
                 </p>
                 <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-800 border border-amber-100">
                    <strong>Quick Checklist:</strong>
                    <ul className="mt-1 space-y-1 list-disc pl-4">
                       <li>Data deleted after 30 days or on account closure.</li>
                       <li>Real-time notifications for high-severity flags.</li>
                       <li>You can withdraw consent at any time.</li>
                    </ul>
                 </div>
                 <label className="flex items-start gap-3 pt-2 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-all flex-shrink-0 ${agreements.nonFriend ? 'bg-[#889A7F] border-[#889A7F]' : 'bg-white border-gray-300 group-hover:border-[#9AAE8F]'}`}>
                     {agreements.nonFriend && <Check className="w-3.5 h-3.5 text-white" />}
                   </div>
                   <input type="checkbox" className="hidden" checked={agreements.nonFriend} onChange={() => setAgreements({...agreements, nonFriend: !agreements.nonFriend})} />
                   <span className="text-sm font-medium text-gray-800">I agree to the "Non-Friend" Clause</span>
                 </label>
               </div>
             </section>
           </div>

           <div className="p-6 bg-white border-t border-gray-200 flex items-center justify-between shrink-0">
             <button onClick={() => setStep('vpc')} className="text-gray-500 font-medium hover:text-gray-800 transition-colors">Back</button>
             <button 
               onClick={handleCreateAccount}
               disabled={isLoading || !Object.values(agreements).every(v => v)}
               className="bg-[#889A7F] hover:bg-[#748866] text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-[#D4DDD0] disabled:shadow-none"
             >
               {isLoading ? (
                 <>
                   <Loader2 className="w-5 h-5 animate-spin" />
                   Creating Account...
                 </>
               ) : (
                 <>
                   Accept & Create Account
                   <ChevronRight className="w-4 h-4" />
                 </>
               )}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const SignupPage = ({ onSignup, onNavigateToLogin }: { onSignup: () => void, onNavigateToLogin: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('All fields are required.');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }
      
      await AuthService.signup({ name, email, password });
      onSignup();
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="w-12 h-12 bg-[#889A7F] rounded-xl shadow-lg shadow-[#D4DDD0] flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2 text-sm">Join SafeMentor to protect your family.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 flex items-center gap-2">
              <TriangleAlert className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#889A7F] focus:ring-2 focus:ring-[#E8EDE6] outline-none transition-all text-sm"
                placeholder="Jane Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#889A7F] focus:ring-2 focus:ring-[#E8EDE6] outline-none transition-all text-sm"
                placeholder="parent@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#889A7F] focus:ring-2 focus:ring-[#E8EDE6] outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#889A7F] focus:ring-2 focus:ring-[#E8EDE6] outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#889A7F] hover:bg-[#748866] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#D4DDD0] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={onNavigateToLogin}
                className="text-[#889A7F] font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
        
        {/* Footer info */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Lock className="w-3 h-3" />
          <span>Bank-grade encryption & AADC Compliant</span>
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin, onNavigateToSignup }: { onLogin: () => void, onNavigateToSignup: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }
      
      await AuthService.login(email, password);
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="w-12 h-12 bg-[#889A7F] rounded-xl shadow-lg shadow-[#D4DDD0] flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">Sign in to monitor your child's safety.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 flex items-center gap-2">
              <TriangleAlert className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#889A7F] focus:ring-2 focus:ring-[#E8EDE6] outline-none transition-all text-sm"
                placeholder="parent@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <button type="button" className="text-xs text-[#889A7F] font-medium hover:text-[#748866]">Forgot password?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#889A7F] focus:ring-2 focus:ring-[#E8EDE6] outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#889A7F] hover:bg-[#748866] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#D4DDD0] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={onNavigateToSignup}
                className="text-[#889A7F] font-bold hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </form>
        
        {/* Footer info */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Lock className="w-3 h-3" />
          <span>Bank-grade encryption & AADC Compliant</span>
        </div>
      </div>
    </div>
  );
};

const INITIAL_MESSAGE: ChatMessage = {
  id: "1",
  sender: "ai",
  text: "I can help you dream up ideas and chat! I’m a robot, not a person. I sometimes make mistakes—stay curious!",
  timestamp: new Date().toISOString(),
};

const ChildPreviewPage = ({ onNewAlert }: { onNewAlert?: () => void }) => {
  const [activeScreen, setActiveScreen] = useState<'welcome' | 'chat' | 'help' | 'exit' | 'safety'>('welcome');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);

  const renderScreen = () => {
    switch(activeScreen) {
      case 'welcome': return <ChildWelcome onNavigate={(screen) => setActiveScreen(screen.replace('child-', '') as any)} />;
      case 'chat': return <ChildChatScreen onNavigate={(screen) => setActiveScreen(screen.replace('child-', '') as any)} messages={messages} setMessages={setMessages} />;
      case 'help': return <ChildHelp onNavigate={(screen) => setActiveScreen(screen.replace('child-', '') as any)} />;
      case 'exit': return <ChildExit onNavigate={(screen) => setActiveScreen(screen.replace('child-', '') as any)} />;
      default: return <ChildWelcome onNavigate={() => {}} />;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Child App Preview</h1>
        <p className="text-sm md:text-base text-gray-600">Experience exactly what your child sees. Audit safety features and flow.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
        
        {/* Phone Simulator */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <div className="relative mx-auto border-gray-900 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white relative">
              {/* Render Child App Components Here */}
              <div className="h-full w-full overflow-hidden absolute inset-0 bg-white">
                {renderScreen()}
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500 font-medium text-center">Interactive Preview • iPhone 13 Frame</p>
        </div>

        {/* Controls & Context */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto">
          
          {/* View Switcher */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#889A7F]" />
              Navigate Preview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => setActiveScreen('welcome')}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${activeScreen === 'welcome' ? 'border-[#889A7F] bg-[#F5F7F4] text-[#4A5445]' : 'border-gray-200 hover:border-[#D4DDD0] hover:bg-gray-50'}`}
              >
                Welcome Screen
              </button>
              <button 
                onClick={() => setActiveScreen('chat')}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${activeScreen === 'chat' ? 'border-[#889A7F] bg-[#F5F7F4] text-[#4A5445]' : 'border-gray-200 hover:border-[#D4DDD0] hover:bg-gray-50'}`}
              >
                Chat Interface
              </button>
              <button 
                onClick={() => setActiveScreen('safety')}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${activeScreen === 'safety' ? 'border-[#889A7F] bg-[#F5F7F4] text-[#4A5445]' : 'border-gray-200 hover:border-[#D4DDD0] hover:bg-gray-50'}`}
              >
                Safety Notice
              </button>
              <button 
                onClick={() => setActiveScreen('help')}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${activeScreen === 'help' ? 'border-[#889A7F] bg-[#F5F7F4] text-[#4A5445]' : 'border-gray-200 hover:border-[#D4DDD0] hover:bg-gray-50'}`}
              >
                Help Section
              </button>
              <button 
                onClick={() => setActiveScreen('exit')}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${activeScreen === 'exit' ? 'border-[#889A7F] bg-[#F5F7F4] text-[#4A5445]' : 'border-gray-200 hover:border-[#D4DDD0] hover:bg-gray-50'}`}
              >
                Exit Flow
              </button>
            </div>
          </div>

          {/* Safety Features Explanation */}
          <div className="bg-[#F5F7F4] border border-[#D4DDD0] rounded-2xl p-6">
            <h3 className="font-bold text-[#4A5445] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Safety & Compliance Highlights
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#E8EDE6] flex items-center justify-center shrink-0 text-[#889A7F] font-bold text-sm">1</div>
                 <div>
                   <h4 className="font-bold text-sm text-[#2F3A2A]">Practical & Safe Positioning</h4>
                   <p className="text-sm text-[#4A5445]/80">
                     The welcome screen focuses on homework and projects, not "friendship." It explicitly states "I am not a human" to prevent emotional dependency (KOSA/AADC).
                   </p>
                 </div>
              </div>

              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#E8EDE6] flex items-center justify-center shrink-0 text-[#889A7F] font-bold text-sm">2</div>
                 <div>
                   <h4 className="font-bold text-sm text-[#2F3A2A]">Just-in-Time PII Warnings</h4>
                   <p className="text-sm text-[#4A5445]/80">
                     Try typing a phone number or address in the Chat. The system detects it locally and warns the child <em>before</em> sending, teaching digital safety habits.
                   </p>
                 </div>
              </div>

              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#E8EDE6] flex items-center justify-center shrink-0 text-[#889A7F] font-bold text-sm">3</div>
                 <div>
                   <h4 className="font-bold text-sm text-[#2F3A2A]">Frictionless Exit</h4>
                   <p className="text-sm text-[#4A5445]/80">
                     No "Are you sure?" loops. The exit screen confirms data deletion from the device, respecting the child's right to privacy and disengagement.
                   </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Trigger Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Test Safety Triggers</h3>
            <p className="text-sm text-gray-500 mb-4">Simulate events to see how the system responds.</p>
            
            <div className="space-y-3">
               <button 
                 onClick={() => setActiveScreen('safety')}
                 className="w-full flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors"
               >
                 <span className="text-sm font-medium text-amber-900">Simulate "Concerning Content" Detection</span>
                 <TriangleAlert className="w-4 h-4 text-amber-600" />
               </button>
               
               <button 
                 className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors opacity-60 cursor-not-allowed"
               >
                 <span className="text-sm font-medium text-gray-600">Simulate Connectivity Loss (Mock)</span>
                 <div className="w-2 h-2 rounded-full bg-gray-400"></div>
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const OverviewPage = ({ children, alerts, onNavigate }: { children: Child[], alerts: SafetyAlert[], onNavigate: (view: any) => void }) => {
  const [selectedChild, setSelectedChild] = useState<string>(children[0]?.id || 'all');
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Overview</h1>
        <p className="text-sm md:text-base text-gray-600">Welcome back! Here's your child safety summary.</p>
      </div>

      {/* Risk Level Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Current Risk Level</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last checked: Just now</span>
            </div>
          </div>
          <div className="bg-green-100 rounded-full p-2 md:p-3">
            <CircleCheck className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
          <p className="text-lg md:text-xl font-bold text-green-800 mb-1">No Concerns Detected</p>
          <p className="text-sm text-green-700">Your child's conversations show healthy patterns. Continue regular check-ins.</p>
        </div>

        {/* Signal Types Legend */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-900 mb-3">Understanding Risk Signals:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#889A7F] flex-shrink-0" />
              <span className="text-sm text-gray-600">Info: General patterns</span>
            </div>
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">Yellow: Potential concern</span>
            </div>
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">Red: Immediate action</span>
            </div>
          </div>
        </div>
      </div>

      {/* Child Selector and Time Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <label className="block text-xs font-medium text-gray-500 mb-2">Viewing Data For</label>
          <div className="relative">
            <select 
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-2.5 pl-4 pr-10 text-gray-700 focus:outline-none focus:border-[#889A7F] focus:ring-1 focus:ring-[#889A7F]"
            >
              <option value="all">All Children</option>
              {children.map(c => (
                <option key={c.id} value={c.id}>{c.nickname}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <label className="block text-xs font-medium text-gray-500 mb-2">Time Period</label>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('7d')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                timeRange === '7d'
                  ? 'bg-[#889A7F] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                timeRange === '30d'
                  ? 'bg-[#889A7F] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>
      </div>

      {/* Emotional Trend Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Emotional Trend Summary</h2>
            <p className="text-sm text-gray-500">Aggregated emotional patterns over time</p>
          </div>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>

        {/* Chart Placeholder */}
        <div className="bg-gradient-to-br from-gray-50 to-[#F5F7F4] border border-gray-200 rounded-xl h-48 md:h-64 flex items-center justify-center mb-4">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-medium">Emotional Trend Chart</p>
            <p className="text-xs text-gray-500 mt-1">Shows aggregated emotional patterns over time</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-400 border border-green-500"></div>
            <p className="text-xs text-gray-600">Positive</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-300 border border-gray-400"></div>
            <p className="text-xs text-gray-600">Neutral</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-300 border border-orange-400"></div>
            <p className="text-xs text-gray-600">Needs Support</p>
          </div>
        </div>
      </div>

      {/* Important Disclaimers */}
      <div className="space-y-4 mb-6">
        {/* Important Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <TriangleAlert className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-yellow-900 mb-1">⚠️ Important:</p>
              <p className="text-sm text-yellow-800">
                SafeMentor looks for patterns that may indicate risk. It cannot see everything and may miss or 
                misinterpret signals. This tool supports—but does not replace—your relationship with your child.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-[#F5F7F4] border border-[#D4DDD0] rounded-2xl p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Lock className="w-5 h-5 text-[#889A7F]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#4A5445] mb-1">Privacy Protection Active:</p>
              <p className="text-sm text-[#4A5445]">
                Only aggregated emotional trends are shown. Individual messages remain private to protect child's 
                confidential space. Safety alerts are shown separately if AI detects concerning patterns.
              </p>
            </div>
          </div>
        </div>
      </div>

     </div>
  );
};

const EmotionsPage = ({ children }: { children: Child[] }) => {
  const [selectedChild, setSelectedChild] = useState<string>(children[0]?.id || '');
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const [trends, setTrends] = useState<EmotionTrend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedChild) {
      setIsLoading(true);
      ParentService.getEmotionTrends(selectedChild, timeRange === '7d' ? 7 : 30)
        .then(data => {
          setTrends(data);
          setIsLoading(false);
        });
    }
  }, [selectedChild, timeRange]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Emotional Trends</h1>
        <p className="text-gray-600">Aggregated insights into your child's wellbeing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Controls */}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Viewing Data For</label>
            <div className="relative">
              <select 
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-2.5 pl-4 pr-10 text-gray-700 focus:outline-none focus:border-[#889A7F] focus:ring-1 focus:ring-[#889A7F]"
              >
                {children.map(c => (
                  <option key={c.id} value={c.id}>{c.nickname}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="relative w-full sm:w-48">
            <label className="block text-xs font-medium text-gray-500 mb-1">Time Period</label>
            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
              <button 
                onClick={() => setTimeRange('7d')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${timeRange === '7d' ? 'bg-[#F5F7F4] text-[#889A7F]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                7 Days
              </button>
              <button 
                onClick={() => setTimeRange('30d')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${timeRange === '30d' ? 'bg-[#F5F7F4] text-[#889A7F]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                30 Days
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
        <TriangleAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-amber-800">Important Note</h4>
          <p className="text-xs md:text-sm text-amber-700 mt-1">
            SafeMentor looks for patterns that may indicate risk. It cannot see everything and may miss or misinterpret signals. This tool supports—but does not replace—your relationship with your child.
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Sentiment Analysis</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-500">Neutral</span>
            </div>
             <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span className="text-xs text-gray-500">Concern</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#889A7F]" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  cursor={{stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#889A7F" 
                  strokeWidth={3}
                  dot={{fill: '#889A7F', strokeWidth: 2, r: 4, stroke: '#fff'}}
                  activeDot={{r: 6, strokeWidth: 0}}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 font-medium mb-1">Total Sessions Analyzed</p>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 font-medium mb-1">Average Sentiment</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">Positive</span>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 font-medium mb-1">Safety Alerts</p>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-[#F5F7F4] border border-[#D4DDD0] rounded-xl p-4 flex gap-3">
        <Lock className="w-5 h-5 text-[#889A7F] flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-[#4A5445]">Privacy Protection Active</h4>
          <p className="text-xs md:text-sm text-[#4A5445] mt-1">
            Only aggregated emotional trends are shown. Individual messages remain private to protect your child's confidential space. Safety alerts are shown separately if AI detects concerning patterns.
          </p>
        </div>
      </div>
    </div>
  );
};

const HelpPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
      <p className="text-gray-600">Everything you need to know about SafeMentor.</p>
    </div>

    {/* Quick Links */}
    <div className="bg-gradient-to-br from-[#F5F7F4] to-[#E8EDE6] rounded-2xl shadow-sm border border-[#D4DDD0] p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#889A7F] rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Complete Documentation</h3>
          <p className="text-sm text-gray-600">Visit our help center for full guides and FAQs</p>
        </div>
      </div>
      <button className="w-full px-4 py-3 bg-[#889A7F] text-white rounded-xl font-semibold hover:bg-[#748866] transition-colors flex items-center justify-center gap-2">
        Visit Help Center
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>

    <div className="space-y-6">
      {/* Not a Surveillance Tool */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Why This Is Not a Surveillance Tool</h3>
          <p className="text-sm text-gray-600 mt-1">Protecting child privacy while ensuring safety</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="text-sm font-bold text-red-900 mb-2">✗ What SafeMentor Does NOT Do:</p>
            <ul className="text-sm text-red-700 space-y-1 ml-4">
              <li>• No live monitoring of conversations</li>
              <li>• No chat replay or message history viewing</li>
              <li>• No emotion scoring or behavioral surveillance</li>
              <li>• No tracking of child's location or device usage</li>
              <li>• No parent access to raw chat logs</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-sm font-bold text-green-900 mb-2">✓ What SafeMentor Does:</p>
            <ul className="text-sm text-green-700 space-y-1 ml-4">
              <li>• Provides AI companion for child to talk to freely</li>
              <li>• Detects patterns that may indicate risk</li>
              <li>• Sends aggregated emotional trends (not messages)</li>
              <li>• Alerts parents only when serious concerns detected</li>
            </ul>
          </div>

          <div className="bg-[#F5F7F4] rounded-xl p-4 border border-[#D4DDD0]">
            <p className="text-sm font-bold text-[#4A5445] mb-1">Why this is safer for kids:</p>
            <p className="text-sm text-[#4A5445]">
              Privacy protection encourages honest communication. Children need a confidential space 
              to process emotions without fear of surveillance. This builds trust and enables earlier 
              intervention when needed.
            </p>
          </div>
        </div>
      </div>

      {/* Child Rights Protection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">How Child Rights Are Protected</h3>
          <p className="text-sm text-gray-600 mt-1">EU-compliant privacy safeguards</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="border-l-4 border-[#889A7F] pl-4">
            <p className="text-sm font-bold text-gray-900 mb-1">Why Parents Don't See Raw Chats:</p>
            <p className="text-sm text-gray-600">
              Protecting child dignity and developmental autonomy. Children need private space to develop 
              identity and emotional regulation. Constant surveillance damages trust and healthy development.
            </p>
          </div>

          <div className="border-l-4 border-[#889A7F] pl-4">
            <p className="text-sm font-bold text-gray-900 mb-1">How Escalation Works:</p>
            <p className="text-sm text-gray-600">
              Only serious concerns trigger alerts. This avoids "snitching dynamics" where children stop 
              talking honestly. The AI distinguishes between normal struggles and genuine risk.
            </p>
          </div>

          <div className="border-l-4 border-[#889A7F] pl-4">
            <p className="text-sm font-bold text-gray-900 mb-1">Trust + Safety Balance:</p>
            <p className="text-sm text-gray-600">
              SafeMentor is designed to support parent-child relationship, not replace it. Privacy-by-default 
              maintains trust while safety alerts enable timely intervention.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">How SafeMentor Works</h3>
          <p className="text-sm text-gray-600 mt-1">Our privacy-first approach</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-8 h-8 bg-[#889A7F] rounded-lg flex items-center justify-center text-white font-bold text-sm mb-3">1</div>
              <p className="text-sm font-bold text-gray-900 mb-1">Child Talks to AI Companion</p>
              <p className="text-sm text-gray-600">Private conversations in a safe space</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-8 h-8 bg-[#889A7F] rounded-lg flex items-center justify-center text-white font-bold text-sm mb-3">2</div>
              <p className="text-sm font-bold text-gray-900 mb-1">AI Analyzes Patterns</p>
              <p className="text-sm text-gray-600">Looking for emotional trends and risk indicators</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-8 h-8 bg-[#889A7F] rounded-lg flex items-center justify-center text-white font-bold text-sm mb-3">3</div>
              <p className="text-sm font-bold text-gray-900 mb-1">Parents See Aggregated Data</p>
              <p className="text-sm text-gray-600">General mood trends, no raw messages</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-8 h-8 bg-[#889A7F] rounded-lg flex items-center justify-center text-white font-bold text-sm mb-3">4</div>
              <p className="text-sm font-bold text-gray-900 mb-1">Alerts When Needed</p>
              <p className="text-sm text-gray-600">Only serious concerns trigger notifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Signal Types */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Understanding Signal Types</h3>
          <p className="text-sm text-gray-600 mt-1">What each alert level means</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-[#E8EDE6] rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-[#889A7F]" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Informational Signal</p>
              <p className="text-sm text-gray-600">General patterns detected. No immediate action needed. For your awareness only.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TriangleAlert className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Yellow Flag</p>
              <p className="text-sm text-gray-600">Potential concern detected. Consider having a gentle check-in conversation with your child.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TriangleAlert className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Red Flag</p>
              <p className="text-sm text-gray-600">Serious concern requiring immediate attention. Safety issue detected (self-harm, abuse, etc.)</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Limitations */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">AI Limitations: False Signals</h3>
          <p className="text-sm text-gray-600 mt-1">Understanding detection errors</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-sm font-bold text-orange-900 mb-2">False Positives (Over-detection):</p>
            <p className="text-sm text-orange-700">
              AI may flag innocent conversations as concerning. Example: "I want to die" in context 
              of a video game. Always consider context and trust your judgment.
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-sm font-bold text-orange-900 mb-2">False Negatives (Under-detection):</p>
            <p className="text-sm text-orange-700">
              AI may miss subtle signs or coded language. This tool supports—but does not replace—your 
              parental awareness and relationship with your child.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <p className="text-sm font-bold text-yellow-900 mb-2">⚠️ Critical Reminder:</p>
            <p className="text-sm text-yellow-800">
              SafeMentor looks for patterns that may indicate risk. It cannot see everything and may 
              miss or misinterpret signals. Your judgment and relationship with your child remain primary.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Resources */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-sm border border-red-100 overflow-hidden">
        <div className="p-6 border-b border-red-100">
          <h3 className="font-bold text-red-900 text-lg flex items-center gap-2">
            🆘 Emergency Resources
          </h3>
          <p className="text-sm text-red-700 mt-1">If you have immediate safety concerns, contact professional help directly</p>
        </div>
        <div className="p-6 space-y-3">
          <div className="bg-white rounded-xl p-4 text-center border border-red-100">
            <p className="font-bold text-gray-900">National Crisis Line: <span className="text-red-600">988</span></p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-red-100">
            <p className="font-bold text-gray-900">Crisis Text Line: <span className="text-red-600">Text HOME to 741741</span></p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-red-100">
            <p className="font-bold text-gray-900">Find a Therapist: <span className="text-red-600">www.1116117.de</span></p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-red-100">
            <p className="font-bold text-gray-900">Local Emergency: <span className="text-red-600">911</span></p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
        <Mail className="w-10 h-10 mx-auto mb-3 text-gray-400" />
        <p className="font-bold text-gray-900 mb-1">SafeMentor Support Team</p>
        <p className="text-sm text-gray-600">support@safementor.com</p>
      </div>
    </div>
  </div>
);

const PrivacyPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Data & Privacy</h1>
      <p className="text-gray-600">How we protect your family's information.</p>
    </div>

    <div className="space-y-6">
      {/* Legal Basis for Processing */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-900 text-lg">Legal Basis for Processing (GDPR)</h3>
            <span className="px-2 py-0.5 bg-[#E8EDE6] text-[#455A40] text-[10px] font-bold uppercase tracking-wide rounded-full">EU Compliant</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Why we're allowed to process your child's data</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-[#F5F7F4] rounded-xl p-4 border border-[#D4DDD0]">
            <div className="space-y-3">
              <div className="border-l-4 border-[#889A7F] pl-3">
                <p className="text-sm font-bold text-[#2F3A2A]">Child Safety (Vital Interests)</p>
                <p className="text-sm text-[#4A5445]">AI analysis to detect and prevent harm to children</p>
              </div>

              <div className="border-l-4 border-[#889A7F] pl-3">
                <p className="text-sm font-bold text-[#2F3A2A]">Service Operation (Contractual Necessity)</p>
                <p className="text-sm text-[#4A5445]">Technical processing required to deliver the AI companion service</p>
              </div>

              <div className="border-l-4 border-[#889A7F] pl-3">
                <p className="text-sm font-bold text-[#2F3A2A]">Legitimate Interest (With Safeguards)</p>
                <p className="text-sm text-[#4A5445]">Improving safety features while protecting child privacy through aggregation</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-900">
              <span className="font-bold">Your consent:</span> You provided explicit consent during account setup. To view your form or withdraw your consent, go to Settings.
            </p>
          </div>
        </div>
      </div>

      {/* Data Access vs Visibility */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Data Access, visibility and deletion</h3>
          <p className="text-sm text-gray-600 mt-1">Aligned with GDPR</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-sm font-bold text-green-900 mb-2">What You See (Data Visibility):</p>
            <ul className="text-sm text-green-700 space-y-1 ml-4">
              <li>• Aggregated emotional trends only</li>
              <li>• Safety alerts with minimal context</li>
              <li>• No raw chat logs or surveillance</li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-sm font-bold text-orange-900 mb-2">What You Can Request (Data Access Rights):</p>
            <ul className="text-sm text-orange-700 space-y-1 ml-4">
              <li>• Under GDPR, you may request full data access</li>
              <li>• This is exceptional and requires legal justification</li>
              <li>• All requests are logged and reviewed</li>
              <li>• Protects child's dignity and trust</li>
            </ul>
          </div>

          <div className="bg-[#F5F7F4] rounded-xl p-4 border border-[#D4DDD0]">
            <p className="text-sm font-bold text-[#2F3A2A] mb-2">Automatic Data Deletion:</p>
            <p className="text-sm text-[#4A5445]">
              After 30 days, all conversation data is permanently deleted from our servers (GDPR compliance)
            </p>
          </div>

          <button className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Request Exceptional Data Access
          </button>
        </div>
      </div>

      {/* GDPR Rights */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Your GDPR Rights</h3>
          <p className="text-sm text-gray-600 mt-1">Manage your data and privacy preferences</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-bold text-gray-900">Right to Access</p>
                <p className="text-sm text-gray-600 mt-1">Download a copy of all data we hold</p>
              </div>
              <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap ml-4">
                Request Export
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-bold text-gray-900">Right to Erasure</p>
                <p className="text-sm text-gray-600 mt-1">Permanently delete all stored data</p>
              </div>
              <button className="px-3 py-1.5 bg-white border border-red-300 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap ml-4">
                Delete Data
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-bold text-gray-900">Right to Portability</p>
                <p className="text-sm text-gray-600 mt-1">Receive data in machine-readable format</p>
              </div>
              <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap ml-4">
                Export JSON
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-bold text-gray-900">Right to Object</p>
                <p className="text-sm text-gray-600 mt-1">Withdraw consent and stop processing</p>
              </div>
              <button className="px-3 py-1.5 bg-white border border-orange-300 rounded-lg text-xs font-medium text-orange-600 hover:bg-orange-50 transition-colors whitespace-nowrap ml-4">
                Withdraw Consent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SettingsPage = ({ children }: { children: Child[] }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
     <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600">Manage your account and safety preferences.</p>
    </div>

    <div className="space-y-6">
      
      {/* Child Management */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900">Child Management</h3>
            <p className="text-sm text-gray-500">Connect and manage child devices</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#889A7F] text-white rounded-lg text-sm font-medium hover:bg-[#748866] transition-colors">
            <User className="w-4 h-4" />
            Add Child
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
             {children.map(child => (
               <div key={child.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                        {child.nickname.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{child.nickname}</p>
                        <p className="text-xs text-gray-500">{child.device} </p>
                      </div>
                   </div>
                   <div className="flex gap-2 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none items-center justify-center flex gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                        <QrCode className="w-3.5 h-3.5" />
                        QR Code
                      </button>
                      <button className="flex-1 sm:flex-none items-center justify-center flex gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 hover:border-red-200">
                        <Pause className="w-3.5 h-3.5" />
                        Pause
                      </button>
                      <button className="flex-1 sm:flex-none items-center justify-center flex gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 hover:border-red-200">
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Account
                      </button>

                     
                   </div>
                 </div>
                 
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Personal Data - Parent Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Personal Data</h3>
          <p className="text-sm text-gray-500">Your account and contact information</p>
        </div>
        <div className="p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Parent Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Name</label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                <p className="text-sm text-gray-700">Maria Mustermann</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Email</label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                <p className="text-sm text-gray-700">maria.mustermann@email.com</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Street and Number</label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                <p className="text-sm text-gray-700">Hauptstraße 123</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Phone</label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                <p className="text-sm text-gray-700">+49 30 12345678</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">City</label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                <p className="text-sm text-gray-700">Berlin</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Zip Code</label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                <p className="text-sm text-gray-700">10115</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-2">Country</label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                <p className="text-sm text-gray-700">Germany</p>
              </div>
            </div>
          </div>

          {/* Child Information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Child Information</h4>
            <div className="space-y-3">
              {children.map(child => (
                <div key={child.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-4">{child.nickname}</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">Nickname</label>
                      <input 
                        type="text" 
                        defaultValue={child.nickname}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#889A7F] focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-2">Birthdate (MM/YY)</label>
                        <input 
                          type="text" 
                          defaultValue="05/18"
                          placeholder="MM/YY"
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#889A7F] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-2">Language</label>
                        <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#889A7F] focus:border-transparent">
                          <option>Deutsch</option>
                          <option>English</option>
                          <option>Français</option>
                          <option>Español</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">Time Limit</label>
                      <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#889A7F] focus:border-transparent">
                        <option>30 minutes/day</option>
                        <option>15 minutes/day</option>
                        <option>60 minutes/day</option>
                        <option>Unlimited</option>
                      </select>
                    </div>
                    <button className="w-full mt-2 py-2 bg-[#889A7F] text-white rounded-lg text-xs font-medium hover:bg-[#748866] transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Protection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Data Protection</h3>
          <p className="text-sm text-gray-500">Manage your data consent and deletion options</p>
        </div>
        <div className="p-6 space-y-4">
          {/* Data Processing Consent */}
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-sm font-semibold text-gray-900">Data Processing Consent</h4>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md border border-green-200">
                ✓ Active
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              You have consented to AI analysis of child interactions for safety purposes
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Provided on: Jan 15, 2026 via www.safementor.com account setup
            </p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Review Original Consent
              </button>
              <button className="flex-1 py-2 px-3 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                Withdraw Consent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Notification Preferences</h3>
          <p className="text-sm text-gray-500">Configure how you receive safety alerts</p>
        </div>
        <div className="p-6 space-y-4">
          {/* Yellow Flags */}
          <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Yellow Flags (Potential Concerns)</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">SMS Notifications</span>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 bg-yellow-500 text-white rounded-lg text-xs font-medium border-2 border-yellow-600">
                    Yes
                  </button>
                  <button className="px-4 py-1.5 bg-white text-gray-600 rounded-lg text-xs font-medium border border-gray-300 hover:bg-gray-50">
                    No
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Email Notifications</span>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 bg-yellow-500 text-white rounded-lg text-xs font-medium border-2 border-yellow-600">
                    Yes
                  </button>
                  <button className="px-4 py-1.5 bg-white text-gray-600 rounded-lg text-xs font-medium border border-gray-300 hover:bg-gray-50">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Red Flags */}
          <div className="border-2 border-red-200 bg-red-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Red Flags (Serious Concerns)</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">SMS Notifications</span>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium border-2 border-red-700">
                    Yes
                  </button>
                  <button className="px-4 py-1.5 bg-white text-gray-600 rounded-lg text-xs font-medium border border-gray-300 hover:bg-gray-50">
                    No
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Email Notifications</span>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium border-2 border-red-700">
                    Yes
                  </button>
                  <button className="px-4 py-1.5 bg-white text-gray-600 rounded-lg text-xs font-medium border border-gray-300 hover:bg-gray-50">
                    No
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-red-700 mt-4 flex items-start gap-2">
              <TriangleAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Recommended to keep both enabled for serious safety concerns</span>
            </p>
          </div>
        </div>
      </div>

      {/* Payment Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Payment Data</h3>
          <p className="text-sm text-gray-500">Manage your subscription and billing</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Current Payment Method</h4>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-900 font-medium">Visa •••• 4242</p>
                <p className="text-xs text-gray-500">Expires: 12/26</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md border border-green-200">
                ✓ Active
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Update Card
              </button>
              <button className="flex-1 py-2 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                Remove Card
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Billing Information</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Current Plan:</span>
                <span className="text-gray-900 font-medium">Family Plan (€19.99/month)</span>
              </div>
              <div className="flex justify-between">
                <span>Next Billing Date:</span>
                <span className="text-gray-900">Feb 15, 2026</span>
              </div>
              <div className="flex justify-between">
                <span>Children Enrolled:</span>
                <span className="text-gray-900">2</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-xs font-medium text-[#889A7F] bg-[#F5F7F4] border border-[#D4DDD0] rounded-lg hover:bg-[#E8EDE6] transition-colors">
              View Billing History
            </button>
          </div>
        </div>
      </div>

      {/* Data Deletion */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-red-900">Data & Account Deletion</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your data retention preferences.</p>
        </div>
        <div className="p-6 space-y-4">
           <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h4 className="font-semibold text-gray-900 text-sm">Delete Child Data</h4>
                   <p className="text-xs text-gray-600 mt-1 max-w-md">Permanently delete all conversation and emotional data for a specific child. They can reconnect later with a fresh start.</p>
                </div>
                <button className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-transparent hover:border-red-200">
                  Delete Data
                </button>
              </div>
           </div>

           <div className="p-4 rounded-xl border border-red-200 bg-red-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h4 className="font-semibold text-red-900 text-sm">Delete Parent Account</h4>
                   <p className="text-xs text-red-700 mt-1 max-w-md">Permanently delete your account and all associated child data. This action cannot be undone.</p>
                </div>
                <button className="bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm">
                  Delete Account
                </button>
              </div>
           </div>
        </div>
      </div>

    </div>
  </div>
);

const NotificationsPage = ({ alerts }: { alerts: SafetyAlert[] }) => {
  const redAlert = alerts.find(a => a.type === 'red');
  const otherAlerts = alerts.filter(a => a.type !== 'red');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Safety Notifications</h1>
        <p className="text-sm md:text-base text-gray-600">Monitor and respond to safety alerts for your children.</p>
      </div>

      {/* Active Alerts - Red Flags */}
      {redAlert && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-4 md:p-6">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-red-600 text-white">
                RED FLAG
              </span>
              <span className="text-sm text-gray-500">{redAlert.timestamp}</span>
            </div>
            <p className="text-base font-bold text-gray-900 mb-3">{redAlert.title}</p>
            
            {redAlert.quote && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4">
                <p className="text-sm text-gray-700 italic">"{redAlert.quote}"</p>
              </div>
            )}

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm font-bold text-red-900 mb-3">Guidance</p>
              <div className="space-y-2">
                <p className="text-sm text-red-900">1) Talk to an expert, helpline 988</p>
                <p className="text-sm text-red-900">2) Stay calm and be gentle</p>
                <p className="text-sm text-red-900">3) Have a caring conversation</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
        <div className="flex gap-3">
          <TriangleAlert className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-yellow-900 mb-1">⚠️ Important:</p>
            <p className="text-sm text-yellow-800">
              SafeMentor <span className="font-bold underline">is not</span> a human expert and{" "}
              <span className="font-bold underline">can make errors</span>. For help,{" "}
              <span className="font-bold underline">please always first contact a human expert</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Resources */}
      <div className="bg-[#F5F7F4] border border-[#D4DDD0] rounded-2xl p-4 md:p-6 mb-6">
        <h3 className="text-lg font-bold text-[#2F3A2A] mb-2">Need to Talk? Find Support Now</h3>
        <p className="text-sm text-[#4A5445] mb-4">
          If you have immediate safety concerns, there is professional help:
        </p>
        <div className="space-y-3">
          <div className="bg-white border border-[#BFC9B9] rounded-xl p-4 text-center">
            <p className="text-base font-bold text-gray-900">Crisis Helpline: 988</p>
          </div>
          <div className="bg-white border border-[#BFC9B9] rounded-xl p-4 text-center">
            <p className="text-base font-bold text-gray-900">Local Emergency Services: 112</p>
          </div>
        </div>
      </div>

      {/* Recent Safety Notifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Safety Notifications</h2>

        {otherAlerts.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No recent notifications</p>
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            {otherAlerts.map((alert) => (
              <div key={alert.id} className={`border rounded-xl p-4 ${
                alert.type === 'yellow' ? 'bg-yellow-50 border-yellow-200' : 'bg-[#F5F7F4] border-[#D4DDD0]'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      alert.type === 'yellow' ? 'bg-yellow-500 text-white' : 'bg-[#889A7F] text-white'
                    }`}>
                      {alert.type === 'yellow' ? 'Yellow Flag' : 'Info'}
                    </span>
                    <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Get Advice
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Mark Acknowledged
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="w-full py-2 text-sm text-[#889A7F] font-medium hover:text-[#748866] hover:bg-[#F5F7F4] rounded-lg transition-colors flex items-center justify-center gap-1">
          View All Notifications
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      
      {/* What to Do Next */}
      <div className="bg-gradient-to-br from-[#F5F7F4] to-[#E8EDE6] border border-[#D4DDD0] rounded-2xl p-4 md:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">What to Do Next</h3>
        <p className="text-sm text-gray-700 mb-4">
          Immediate safety concerns should be addressed directly. Use our guide for conversation starters.
        </p>
        <button className="w-full py-3 bg-[#889A7F] text-white rounded-xl font-medium hover:bg-[#748866] transition-colors shadow-sm">
          Read Crisis Guide
        </button>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD SHELL ---

type ViewState = 'login' | 'signup' | 'signup-privacy' | 'overview' | 'emotions' | 'settings' | 'privacy' | 'help' | 'notifications' | 'preview' | 'menu';

const MobileMenu = ({ onNavigate, onLogout }: { onNavigate: (view: ViewState) => void, onLogout: () => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Menu</h1>
      <p className="text-sm text-gray-600">Account settings and support.</p>
    </div>

    <div className="space-y-3">
      <button onClick={() => onNavigate('settings')} className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
        <div className="p-2 bg-[#F5F7F4] rounded-lg text-[#889A7F]">
          <Settings className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="font-bold text-gray-900">Settings</p>
          <p className="text-xs text-gray-500">Manage account & child devices</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
      </button>

      <button onClick={() => onNavigate('privacy')} className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
        <div className="p-2 bg-[#F5F7F4] rounded-lg text-[#889A7F]">
          <Lock className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="font-bold text-gray-900">Data & Privacy</p>
          <p className="text-xs text-gray-500">Manage consent & data retention</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
      </button>

      <button onClick={() => onNavigate('help')} className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
        <div className="p-2 bg-[#F5F7F4] rounded-lg text-[#889A7F]">
          <CircleHelp className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="font-bold text-gray-900">Help & Support</p>
          <p className="text-xs text-gray-500">FAQs and resources</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
      </button>
      
      <button onClick={onLogout} className="w-full flex items-center gap-4 p-4 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors mt-6">
        <div className="p-2 bg-white rounded-lg text-red-600">
          <LogOut className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="font-bold text-red-900">Log Out</p>
          <p className="text-xs text-red-700">Sign out of your account</p>
        </div>
      </button>
    </div>
  </div>
);

export function ParentDashboardUI() {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Simulate Data Fetching
  useEffect(() => {
    const isDashboard = !['login', 'signup', 'signup-privacy'].includes(currentView);

    if (isDashboard && !dataLoaded) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const [childData, alertData] = await Promise.all([
            ParentService.getChildren(),
            ParentService.getAlerts()
          ]);
          setChildren(childData);
          setAlerts(alertData);
          setDataLoaded(true);
        } catch (error) {
          console.error("Failed to fetch dashboard data", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [currentView, dataLoaded]);

  const handleSimulatedAlert = () => {
    const newAlert: SafetyAlert = {
      id: Date.now().toString(),
      type: 'yellow',
      title: 'Help Requested',
      description: 'Child pressed "Ask Parent for Help" in the Safety Notice screen.',
      timestamp: 'Just now',
      childId: 'child-1',
      isAcknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = () => {
    setCurrentView('login');
    setDataLoaded(false);
    setAlerts([]);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button 
      onClick={() => setCurrentView(view)}
      className={`
        flex items-center transition-all duration-200
        flex-col md:flex-row gap-1 md:gap-3 px-2 py-2 md:px-4 md:py-3 rounded-xl
        text-gray-400 md:text-gray-600 md:w-full md:hover:bg-gray-100
        ${currentView === view ? 'text-[#889A7F] md:bg-[#889A7F] md:text-white md:shadow-md md:shadow-[#D4DDD0]' : ''}
      `}
    >
      <Icon className={`
        w-6 h-6 md:w-5 md:h-5
        ${currentView === view ? 'text-[#889A7F] md:text-white' : ''}
      `} />
      <span className="text-[10px] md:text-base font-medium">{label}</span>
    </button>
  );

  const renderContent = () => {
    if (currentView === 'login') {
      return <LoginPage onLogin={() => setCurrentView('overview')} onNavigateToSignup={() => setCurrentView('signup')} />;
    }

    if (currentView === 'signup') {
      return <SignupPage onSignup={() => setCurrentView('signup-privacy')} onNavigateToLogin={() => setCurrentView('login')} />;
    }

    if (currentView === 'signup-privacy') {
      return <PrivacyConsentPage onConfirm={() => setCurrentView('overview')} onBack={() => setCurrentView('signup')} />;
    }

    return (
      <div className="h-full bg-gray-50 flex flex-col md:flex-row font-sans overflow-hidden relative">
        
        {/* Toast Notification */}
        {showToast && (
          <div className="absolute z-50 animate-in fade-in slide-in-from-top-4 duration-300 top-4 right-4 left-4 md:top-8 md:right-8">
             <div className="bg-white border-l-4 border-yellow-500 shadow-xl rounded-r-xl p-4 flex items-start gap-3 w-full md:max-w-sm">
                <div className="bg-yellow-100 p-2 rounded-full shrink-0">
                   <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                   <h4 className="font-bold text-gray-900 text-sm">New Safety Alert</h4>
                   <p className="text-xs text-gray-600 mt-1">Child requested help. Check notifications for details.</p>
                </div>
             </div>
          </div>
        )}

        {/* MOBILE HEADER (Visible only on mobile) */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between shrink-0 z-10 h-[60px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#889A7F] rounded-lg flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">SafeMentor</span>
          </div>
          <button 
            onClick={() => setCurrentView('notifications')}
            className="p-2 text-gray-500 hover:text-[#889A7F] transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            {alerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
            )}
          </button>
        </div>

        {/* RESPONSIVE NAVIGATION */}
        <div className="
          bg-white flex shrink-0 z-20
          w-full border-t border-gray-200 flex-row justify-around order-last pb-safe h-[80px]
          md:w-64 md:border-r md:border-t-0 md:flex-col md:order-first md:h-auto md:pb-0
        ">
          {/* Desktop Logo Area */}
          <div className="hidden md:block p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#889A7F] rounded-xl shadow-lg shadow-[#D4DDD0] flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg tracking-tight">SafeMentor</p>
                <p className="text-xs text-[#889A7F] font-medium">Parent Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-row justify-around items-start pt-2 w-full md:flex-col md:p-4 md:space-y-1 md:w-auto md:pt-4">
            <NavItem view="overview" icon={Shield} label="Overview" />
            <NavItem view="notifications" icon={Bell} label="Notifications" />
            <div className="hidden md:block w-full">
              <NavItem view="settings" icon={Settings} label="Settings" />
            </div>
            <div className="block md:hidden">
              <NavItem view="menu" icon={Menu} label="Menu" />
            </div>
            <div className="hidden md:block w-full">
              <NavItem view="privacy" icon={Lock} label="Privacy" />
            </div>
            <div className="hidden md:block w-full">
              <NavItem view="help" icon={CircleHelp} label="Help" />
            </div>
          </nav>

          {/* Desktop Footer (Logout) */}
          <div className="hidden md:block p-4 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden w-full relative bg-gray-50/50">
          <div className="h-full p-4 pb-20 md:max-w-7xl md:mx-auto md:p-10 md:pb-10">
            {isLoading ? (
              <div className="h-[50vh] flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#889A7F]" />
                <p className="text-sm font-medium">Loading Dashboard...</p>
              </div>
            ) : (
              <>
                {currentView === 'overview' && <OverviewPage children={children} alerts={alerts} onNavigate={setCurrentView} />}
                {currentView === 'notifications' && <NotificationsPage alerts={alerts} />}
                {currentView === 'emotions' && <EmotionsPage children={children} />}
                {currentView === 'settings' && <SettingsPage children={children} />}
                {currentView === 'preview' && <ChildPreviewPage onNewAlert={handleSimulatedAlert} />}
                
                {/* Other views */}
                {currentView === 'privacy' && <PrivacyPage />} 
                {currentView === 'help' && <HelpPage />}
                {currentView === 'menu' && <MobileMenu onNavigate={setCurrentView} onLogout={handleLogout} />}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-slate-100">
       {/* Simple full screen container, no simulator wrappers */}
       <div className="w-full h-full bg-white">
          {renderContent()}
       </div>
    </div>
  );
}
