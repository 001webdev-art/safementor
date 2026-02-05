'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SafeMentorLogo } from '@/components/landing/SafeMentorIcons';
import { useDisclosure } from '@nextui-org/react';
import { AccessLegalModal } from '@/components/auth/AccessLegalModal';

export default function AccessPage() {
  const t = useTranslations('Access');
  const tLegal = useTranslations('AccessLegal');
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.refresh();
        router.push('/');
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF8] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <SafeMentorLogo size={64} />
      </div>
      
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-[#F5F2EC]">
        <h1 className="font-serif text-2xl font-bold mb-4 text-[#4A4540] text-center">{t('title')}</h1>
        <p className="text-[#4A4540] opacity-80 mb-6 text-center">{t('description')}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('placeholder')}
              className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] focus:outline-none focus:ring-2 focus:ring-[#7B8F71] bg-[#FDFBF8] text-[#4A4540]"
              autoFocus
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">{t('error')}</p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#4A4540] text-[#FDFBF8] rounded-full font-medium hover:bg-[#3A3632] transition-colors disabled:opacity-50"
          >
            {loading ? '...' : t('button')}
          </button>
        </form>
      </div>
      <div className="mt-8 text-center text-[#4A4540] opacity-80 text-sm">
         <p className="mb-2">{tLegal('contactLabel')}</p>
         <a href="mailto:safementor-pilot@mail.com" className="font-medium underline hover:opacity-70 transition-opacity">safementor-pilot@mail.com</a>
      </div>

      <div className="absolute bottom-8 text-center w-full">
         <button 
            onClick={onOpen}
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors underline decoration-dotted underline-offset-4"
         >
            {tLegal('linkText')}
         </button>
      </div>

      <AccessLegalModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
