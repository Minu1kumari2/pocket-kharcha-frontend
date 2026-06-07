import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', city: '', state: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (data.success) {
        alert(language === 'en' ? 'Account created! Now login 🎉' : 'अकाउंट बन गया! अब लॉगिन करो 🎉');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(language === 'en' ? 'Server connection failed!' : 'सर्वर से कनेक्शन नहीं हो रहा!');
    } finally {
      setLoading(false);
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana',
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Other'
  ];

  const RequiredStar = () => <span className="text-red-500 ml-1">*</span>;

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

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
            <p className="text-gray-500 mt-2">{t('register_title')}</p>
            <p className="text-sm text-purple-500 mt-1">{t('register_subtitle')}</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {t('full_name')}<RequiredStar />
              </label>
              <input type="text" name="name" value={form.name}
                onChange={handleChange}
                placeholder={language === 'en' ? 'Your full name' : 'आपका पूरा नाम'}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {t('email')}<RequiredStar />
              </label>
              <input type="email" name="email" value={form.email}
                onChange={handleChange}
                placeholder={language === 'en' ? 'your@email.com' : 'आपका@ईमेल.com'}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {t('phone')}<RequiredStar />
              </label>
              <input type="tel" name="phone" value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {t('password')}<RequiredStar />
              </label>
              <input type="password" name="password" value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {t('city')}
              </label>
              <input type="text" name="city" value={form.city}
                onChange={handleChange}
                placeholder={language === 'en' ? 'Your city' : 'आपका शहर'}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                {t('state')}
              </label>
              <select name="state" value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500">
                <option value="">{language === 'en' ? 'Select state' : 'राज्य चुनें'}</option>
                {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <p className="text-gray-400 text-xs mb-4">
              <span className="text-red-500">*</span>{' '}
              {language === 'en' ? 'Required fields' : 'आवश्यक फ़ील्ड'}
            </p>

            <button type="submit" disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50">
              {loading ? t('creating_account') : t('create_account_btn')}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            {t('already_have_account')}{' '}
            <span onClick={() => navigate('/login')}
              className="text-purple-600 font-semibold cursor-pointer hover:underline">
              {t('login_here')}
            </span>
          </p>

          <p className="text-center mt-4">
            <span onClick={() => navigate('/')}
              className="text-gray-400 text-sm cursor-pointer hover:underline">
              {t('back_home')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;