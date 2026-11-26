import { API_URL } from '../utils/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.success) {
        alert(t('otp_sent_success'));
        setStep(2);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(t('server_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { alert(t('password_mismatch')); return; }
    if (newPassword.length < 6) { alert(t('password_too_short')); return; }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await response.json();
      if (data.success) {
        alert(t('reset_success'));
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(t('server_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 onClick={() => navigate('/')} className="text-xl md:text-2xl font-bold text-purple-600 cursor-pointer">
          Pocket Kharcha 🎯
        </h1>
        <button onClick={toggleLanguage}
          className="flex items-center gap-1 bg-gray-100 hover:bg-purple-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium transition border border-gray-200">
          {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
        </button>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
            <p className="text-gray-500 mt-2 font-medium">{t('forgot_title')}</p>
            <p className="text-gray-400 text-sm mt-1">
              {step === 1 ? t('forgot_step1_subtitle') : t('forgot_step2_subtitle')}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`h-1 w-16 mx-2 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>

          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">{t('enter_email')}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('your_email')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                  required />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50">
                {loading ? t('sending_otp') : t('send_otp_btn')}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">{t('otp_label')}</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)}
                  placeholder={t('otp_placeholder')} maxLength={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 text-center text-2xl tracking-widest font-bold"
                  required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">{t('new_password')}</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                  required />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">{t('confirm_password')}</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                  required />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50">
                {loading ? t('resetting') : t('reset_btn')}
              </button>
              <p className="text-center mt-4 text-gray-500 text-sm">
                {t('otp_not_received')}{' '}
                <span onClick={() => { setStep(1); setOtp(''); }}
                  className="text-purple-500 cursor-pointer hover:underline font-medium">
                  {t('resend_otp')}
                </span>
              </p>
            </form>
          )}

          <p className="text-center mt-6">
            <span onClick={() => navigate('/login')}
              className="text-gray-400 text-sm cursor-pointer hover:underline">
              {t('back_to_login')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
