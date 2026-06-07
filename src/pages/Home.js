import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const categories = [
    { emoji: "💄", en: "Makeup & Beauty", hi: "मेकअप और ब्यूटी" },
    { emoji: "🍳", en: "Cooking & Recipes", hi: "कुकिंग और रेसिपी" },
    { emoji: "🎨", en: "Art & Painting", hi: "आर्ट और पेंटिंग" },
    { emoji: "💻", en: "Coding & Projects", hi: "कोडिंग और प्रोजेक्ट" },
    { emoji: "📝", en: "Assignments & Notes", hi: "असाइनमेंट और नोट्स" },
    { emoji: "✂️", en: "Stitching & Tailoring", hi: "सिलाई और टेलरिंग" },
    { emoji: "🎵", en: "Music & Dance", hi: "संगीत और डांस" },
    { emoji: "🧶", en: "Knitting & Craft", hi: "बुनाई और क्राफ्ट" },
  ];

  const steps = [
    { step: "1", emoji: "✍️", titleKey: "step1_title", descKey: "step1_desc" },
    { step: "2", emoji: "📱", titleKey: "step2_title", descKey: "step2_desc" },
    { step: "3", emoji: "💸", titleKey: "step3_title", descKey: "step3_desc" },
  ];

  const whyItems = [
    { emoji: "🎯", titleKey: "why1_title", descKey: "why1_desc" },
    { emoji: "🔒", titleKey: "why2_title", descKey: "why2_desc" },
    { emoji: "🇮🇳", titleKey: "why3_title", descKey: "why3_desc" },
    { emoji: "⚡", titleKey: "why4_title", descKey: "why4_desc" },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 md:px-8 py-4 shadow-sm sticky top-0 bg-white z-50">
        <h1 className="text-xl md:text-2xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
        <div className="flex gap-2 md:gap-4 items-center">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-gray-100 hover:bg-purple-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium transition border border-gray-200">
            {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </button>
          <button onClick={() => navigate('/login')}
            className="text-gray-600 hover:text-purple-600 font-medium text-sm md:text-base">
            {t('login')}
          </button>
          <button onClick={() => navigate('/register')}
            className="bg-purple-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-purple-700 text-sm md:text-base">
            {t('signup')}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-10 md:py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          {t('hero_title')}
        </h2>
        <p className="text-base md:text-xl text-gray-500 mb-8 max-w-2xl">
          {t('hero_subtitle')}
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-4 md:px-0">
          <button onClick={() => navigate('/register')}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 w-full md:w-auto">
            {t('list_skill_btn')}
          </button>
          <button onClick={() => navigate('/browse')}
            className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-50 w-full md:w-auto">
            {t('find_skill_btn')}
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-purple-50 py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-purple-600">100+</p>
            <p className="text-gray-500 text-sm">{t('stats_skills')}</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-purple-600">50+</p>
            <p className="text-gray-500 text-sm">{t('stats_users')}</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-purple-600">₹0</p>
            <p className="text-gray-500 text-sm">{t('stats_fee')}</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 md:px-8 py-12 bg-gray-50">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          {t('categories_title')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {categories.map((cat, index) => (
            <div key={index}
              onClick={() => navigate('/browse')}
              className="bg-white rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md cursor-pointer hover:border-purple-300 border-2 border-transparent transition-all">
              <div className="text-3xl md:text-4xl mb-2">{cat.emoji}</div>
              <div className="font-semibold text-gray-700 text-sm md:text-base">
                {language === 'en' ? cat.en : cat.hi}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="px-4 md:px-8 py-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          {t('how_title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl md:text-5xl mb-4">{item.emoji}</div>
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{t(item.titleKey)}</h4>
              <p className="text-gray-500 text-sm md:text-base">{t(item.descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Pocket Kharcha */}
      <div className="px-4 md:px-8 py-12 bg-gray-50">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          {t('why_title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {whyItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">{t(item.titleKey)}</h4>
                <p className="text-gray-500 text-sm">{t(item.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white px-4 py-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {t('cta_title')}
        </h3>
        <p className="text-purple-200 mb-6 text-base md:text-lg">
          {t('cta_subtitle')}
        </p>
        <button onClick={() => navigate('/register')}
          className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-purple-50 transition">
          {t('cta_btn')}
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Pocket Kharcha 🎯</h3>
              <p className="text-gray-400 text-sm">{t('footer_tagline')}</p>
              <p className="text-gray-400 text-sm mt-1">🇮🇳 Made in India</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t('footer_links')}</h4>
              <div className="flex flex-col gap-2">
                <span onClick={() => navigate('/browse')}
                  className="text-gray-400 text-sm cursor-pointer hover:text-white">
                  {t('footer_browse')}
                </span>
                <span onClick={() => navigate('/register')}
                  className="text-gray-400 text-sm cursor-pointer hover:text-white">
                  {t('footer_sell')}
                </span>
                <span onClick={() => navigate('/login')}
                  className="text-gray-400 text-sm cursor-pointer hover:text-white">
                  {t('login')}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t('footer_contact')}</h4>
              <p className="text-gray-400 text-sm">📧 pocketkharcha@gmail.com</p>
              <p className="text-gray-400 text-sm mt-1">📱 {t('footer_support')}</p>
              <p className="text-gray-400 text-sm mt-1">🕐 {t('footer_hours')}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-gray-400 text-sm">{t('footer_rights')}</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;