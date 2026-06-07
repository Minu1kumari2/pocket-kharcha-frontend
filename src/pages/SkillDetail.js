import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function SkillDetail() {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchSkill();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSkill = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/skills/${id}`);
      const data = await response.json();
      setSkill(data);
    } catch (error) {
      console.error('Skill load failed');
    } finally {
      setLoading(false);
    }
  };

  const handleHire = () => {
    if (!user) { alert(t('login_to_hire')); navigate('/login'); return; }
    navigate(`/payment/${id}`);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-xl">{t('loading')}</p>
    </div>
  );

  if (!skill) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-xl">{t('skill_not_found')}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
        <div className="flex items-center gap-3">
          <button onClick={toggleLanguage}
            className="flex items-center gap-1 bg-gray-100 hover:bg-purple-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium transition border border-gray-200">
            {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </button>
          <button onClick={() => navigate('/browse')} className="text-gray-600 hover:text-purple-600 text-sm">
            {t('back_browse')}
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left */}
          <div className="md:col-span-2">
            <span className="bg-purple-100 text-purple-600 text-sm font-medium px-3 py-1 rounded-full">
              {skill.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-3">{skill.title}</h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {skill.sellerName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{skill.sellerName}</p>
                <p className="text-gray-400 text-sm">{skill.sellerEmail}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t('description_heading')}</h3>
              <p className="text-gray-600 leading-relaxed">{skill.description}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('details_heading')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <p className="text-gray-400 text-sm">{t('delivery_time_label')}</p>
                    <p className="font-semibold text-gray-800">{skill.deliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="text-gray-400 text-sm">{t('category_label')}</p>
                    <p className="font-semibold text-gray-800">{skill.category}</p>
                  </div>
                </div>
                {skill.city && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-gray-400 text-sm">{t('location_label')}</p>
                      <p className="font-semibold text-gray-800">{skill.city}, {skill.state}</p>
                    </div>
                  </div>
                )}
                {skill.deliveryMethod && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚚</span>
                    <div>
                      <p className="text-gray-400 text-sm">{t('delivery_label')}</p>
                      <p className="font-semibold text-gray-800 capitalize">{skill.deliveryMethod}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — Hire Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="text-4xl font-bold text-green-600 mb-2">₹{skill.price}</div>
              <p className="text-gray-500 text-sm mb-6">{t('one_time_payment')}</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>{t('delivery_in')} {skill.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>{t('direct_contact')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>{t('secure_payment')}</span>
                </div>
              </div>
              <button onClick={handleHire}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition text-lg">
                {t('hire_now')}₹{skill.price} 🚀
              </button>
              <a href={`https://wa.me/91${skill.sellerPhone || ''}?text=Hi! I saw your skill on Pocket Kharcha — "${skill.title}". Is it available?`}
                target="_blank" rel="noreferrer"
                className="w-full mt-3 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition text-lg flex items-center justify-center gap-2 block text-center">
                {t('whatsapp_contact')}
              </a>
              <p className="text-center text-gray-400 text-xs mt-3">{t('secured_by')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillDetail;