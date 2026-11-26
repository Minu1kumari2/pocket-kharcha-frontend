import { API_URL } from '../utils/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function BrowseSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const categories = {
    en: ['All', 'Makeup & Beauty', 'Cooking & Recipes', 'Art & Painting',
      'Coding & Projects', 'Assignments & Notes', 'Stitching & Tailoring',
      'Music & Dance', 'Knitting & Craft', 'Other'],
    hi: ['सभी', 'मेकअप और ब्यूटी', 'कुकिंग और रेसिपी', 'आर्ट और पेंटिंग',
      'कोडिंग और प्रोजेक्ट', 'असाइनमेंट और नोट्स', 'सिलाई और टेलरिंग',
      'संगीत और डांस', 'बुनाई और क्राफ्ट', 'अन्य']
  };

  const categoryMap = {
    'सभी': 'All', 'मेकअप और ब्यूटी': 'Makeup & Beauty',
    'कुकिंग और रेसिपी': 'Cooking & Recipes', 'आर्ट और पेंटिंग': 'Art & Painting',
    'कोडिंग और प्रोजेक्ट': 'Coding & Projects', 'असाइनमेंट और नोट्स': 'Assignments & Notes',
    'सिलाई और टेलरिंग': 'Stitching & Tailoring', 'संगीत और डांस': 'Music & Dance',
    'बुनाई और क्राफ्ट': 'Knitting & Craft', 'अन्य': 'Other'
  };

  const getCategoryEmoji = (category) => {
    const map = {
      'Makeup & Beauty': { emoji: '💄', bg: 'bg-pink-50' },
      'Cooking & Recipes': { emoji: '🍳', bg: 'bg-orange-50' },
      'Art & Painting': { emoji: '🎨', bg: 'bg-yellow-50' },
      'Coding & Projects': { emoji: '💻', bg: 'bg-blue-50' },
      'Assignments & Notes': { emoji: '📝', bg: 'bg-green-50' },
      'Stitching & Tailoring': { emoji: '✂️', bg: 'bg-purple-50' },
      'Music & Dance': { emoji: '🎵', bg: 'bg-red-50' },
      'Knitting & Craft': { emoji: '🧶', bg: 'bg-indigo-50' },
      'Other': { emoji: '⭐', bg: 'bg-gray-50' }
    };
    return map[category] || { emoji: '⭐', bg: 'bg-gray-50' };
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_URL}/api/skills`);
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Skills load nahi hui');
    } finally {
      setLoading(false);
    }
  };

  const getEnglishCategory = (cat) => categoryMap[cat] || cat;

  const filtered = skills.filter(skill => {
    const matchSearch = skill.title.toLowerCase().includes(search.toLowerCase());
    const englishSelected = getEnglishCategory(selectedCategory);
    const matchCat = englishSelected === 'All' || skill.category === englishSelected;
    return matchSearch && matchCat;
  });

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
          <button onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-purple-600 text-sm font-medium">
            ← {t('dashboard')}
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('browse_title')}</h2>
        <p className="text-gray-500 mb-6">{t('browse_subtitle')}</p>

        {/* Search */}
        <input type="text" value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search_placeholder')}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-purple-500" />

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {categories[language].map((cat, index) => (
            <button key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-purple-400'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-xl">
            {language === 'en' ? 'Loading...' : 'लोड हो रहा है...'}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl">{t('no_skill_found')}</p>
            <p className="text-gray-400">{t('no_skill_desc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(skill => (
              <div key={skill.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition border border-transparent hover:border-purple-200">

                {/* Category Banner */}
                <div className={`${getCategoryEmoji(skill.category).bg} py-6 flex items-center justify-center text-5xl`}>
                  {getCategoryEmoji(skill.category).emoji}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
                      {skill.category}
                    </span>
                    <span className="text-green-600 font-bold text-lg">₹{skill.price}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{skill.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{skill.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                    <span>👤 {skill.sellerName}</span>
                    <span>⏱️ {skill.deliveryTime}</span>
                  </div>
                  {skill.city && (
                    <p className="text-gray-400 text-xs mb-3">📍 {skill.city}{skill.state ? `, ${skill.state}` : ''}</p>
                  )}
                  {skill.rating > 0 && (
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm font-medium">{skill.rating}</span>
                      <span className="text-gray-400 text-xs">({skill.totalRatings})</span>
                    </div>
                  )}
                  <button
                    onClick={() => navigate(`/skill/${skill.id}`)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                    {t('hire_btn')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseSkills;
