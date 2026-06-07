import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  const cards = [
    {
      icon: '💼',
      titleKey: 'add_skill',
      descKey: 'add_skill_desc',
      btnColor: 'bg-purple-600 hover:bg-purple-700',
      borderColor: 'border-l-purple-500',
      action: () => navigate('/add-skill')
    },
    {
      icon: '🔍',
      titleKey: 'browse_skills',
      descKey: 'browse_desc',
      btnColor: 'bg-blue-500 hover:bg-blue-600',
      borderColor: 'border-l-blue-500',
      action: () => navigate('/browse')
    },
    {
      icon: '📋',
      titleKey: 'my_orders',
      descKey: 'orders_desc',
      btnColor: 'bg-green-500 hover:bg-green-600',
      borderColor: 'border-l-green-500',
      action: () => {}
    },
    {
      icon: '💰',
      titleKey: 'my_earnings',
      descKey: 'earnings_desc',
      borderColor: 'border-l-yellow-500',
      isEarnings: true
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl md:text-2xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-gray-100 hover:bg-purple-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium transition border border-gray-200">
            {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </button>
          <span className="text-gray-600 text-sm hidden md:block">
            {language === 'en' ? 'Hello' : 'नमस्ते'}, <strong>{user.name}</strong> 👋
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-red-600 text-sm">
            {t('logout')}
          </button>
        </div>
      </nav>

      {/* Welcome Banner */}
      <div className="bg-purple-600 text-white px-4 md:px-8 py-8 md:py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {t('welcome')}, {user.name}! 🎉
        </h2>
        <p className="text-purple-200 text-base md:text-lg">
          {t('dashboard_subtitle')}
        </p>
      </div>

      {/* Cards */}
      <div className="px-4 md:px-8 py-6 md:py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <div key={index}
            className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${card.borderColor}`}>
            <div className="text-3xl mb-2">{card.icon}</div>
            <h3 className="text-lg font-bold text-gray-800">{t(card.titleKey)}</h3>
            <p className="text-gray-500 mt-1 text-sm">{t(card.descKey)}</p>
            {card.isEarnings ? (
              <div className="mt-4 text-2xl font-bold text-yellow-500">₹0</div>
            ) : (
              <button
                onClick={card.action}
                className={`mt-4 ${card.btnColor} text-white px-4 py-2 rounded-lg w-full text-sm transition`}>
                {t(card.titleKey)}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Profile */}
      <div className="px-4 md:px-8 pb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t('my_profile')} 👤</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">{t('naam')}</p>
              <p className="font-semibold text-gray-800">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{t('email')}</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{t('phone_label')}</p>
              <p className="font-semibold text-gray-800">{user.phone}</p>
            </div>
            {user.city && (
              <div>
                <p className="text-gray-500 text-sm">{t('city')}</p>
                <p className="font-semibold text-gray-800">{user.city}{user.state ? `, ${user.state}` : ''}</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;