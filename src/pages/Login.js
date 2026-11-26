import { API_URL } from '../utils/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(language === 'en' ? 'Server connection failed. Is backend running?' : 'सर्वर से कनेक्शन नहीं हो रहा। बैकएंड चालू है?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 onClick={() => navigate('/')}
          className="text-xl md:text-2xl font-bold text-purple-600 cursor-pointer">
          Pocket Kharcha 🎯
        </h1>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 bg-gray-100 hover:bg-purple-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium transition border border-gray-200">
          {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
        </button>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
            <p className="text-gray-500 mt-2">{t('login_title')}</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {t('email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'en' ? 'your@email.com' : 'आपका@ईमेल.com'}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-2">
                {t('password')} <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required />
            </div>

            <div className="text-right mb-6">
              <span
                onClick={() => navigate('/forgot-password')}
                className="text-purple-600 text-sm cursor-pointer hover:underline">
                {t('forgot_password')}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50">
              {loading
                ? (language === 'en' ? 'Logging in...' : 'लॉगिन हो रहा है...')
                : t('login')}
            </button>
          </form>

          <div className="text-center my-4 text-gray-400">— {language === 'en' ? 'or' : 'या'} —</div>

          <p className="text-center text-gray-600">
            {t('no_account')}{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-purple-600 font-semibold cursor-pointer hover:underline">
              {t('register_here')}
            </span>
          </p>

          <p className="text-center mt-4">
            <span
              onClick={() => navigate('/')}
              className="text-gray-400 text-sm cursor-pointer hover:underline">
              {t('back_home')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
