import { API_URL } from '../utils/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function AddSkill() {
  const [form, setForm] = useState({
    title: '', category: '', description: '', skillType: 'digital',
    whatIsIncluded: '', extraWorkPolicy: '',
    price: '', priceUnit: 'fixed',
    deliveryMethod: '', deliveryTime: '', city: '', state: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  const categories = {
    en: ['Makeup & Beauty','Cooking & Recipes','Art & Painting','Coding & Projects',
         'Assignments & Notes','Stitching & Tailoring','Music & Dance','Knitting & Craft','Other'],
    hi: ['मेकअप और ब्यूटी','कुकिंग और रेसिपी','आर्ट और पेंटिंग','कोडिंग और प्रोजेक्ट',
         'असाइनमेंट और नोट्स','सिलाई और टेलरिंग','संगीत और डांस','बुनाई और क्राफ्ट','अन्य']
  };

  const categoryMap = {
    'मेकअप और ब्यूटी':'Makeup & Beauty','कुकिंग और रेसिपी':'Cooking & Recipes',
    'आर्ट और पेंटिंग':'Art & Painting','कोडिंग और प्रोजेक्ट':'Coding & Projects',
    'असाइनमेंट और नोट्स':'Assignments & Notes','सिलाई और टेलरिंग':'Stitching & Tailoring',
    'संगीत और डांस':'Music & Dance','बुनाई और क्राफ्ट':'Knitting & Craft','अन्य':'Other'
  };

  const indianStates = ['Andhra Pradesh','Bihar','Delhi','Gujarat','Haryana','Jharkhand',
    'Karnataka','Kerala','Madhya Pradesh','Maharashtra','Punjab','Rajasthan',
    'Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal','Other'];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleNext = (e) => { e.preventDefault(); setStep(step + 1); window.scrollTo(0, 0); };
  const handleBack = () => { setStep(step - 1); window.scrollTo(0, 0); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const englishCategory = categoryMap[form.category] || form.category;
      const skillData = {
        ...form,
        category: englishCategory,
        price: parseFloat(form.price),
        sellerId: user.id, sellerName: user.name,
        sellerEmail: user.email, sellerPhone: user.phone,
        sellerCity: user.city || ''
      };
      const response = await fetch(`${API_URL}/api/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData)
      });
      const data = await response.json();
      if (data.success) {
        alert(t('skill_listed_success'));
        navigate('/dashboard');
      }
    } catch (error) {
      alert(t('skill_listed_error'));
    } finally {
      setLoading(false);
    }
  };

  const RequiredStar = () => <span className="text-red-500 ml-1">*</span>;

  const priceUnits = [
    { value: 'fixed', label: t('price_fixed') },
    { value: 'per_page', label: t('price_per_page') },
    { value: 'per_hour', label: t('price_per_hour') },
    { value: 'per_piece', label: t('price_per_piece') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
        <div className="flex items-center gap-3">
          <button onClick={toggleLanguage}
            className="flex items-center gap-1 bg-gray-100 hover:bg-purple-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium transition border border-gray-200">
            {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </button>
          <button onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-purple-600 text-sm">
            {t('back_to_dashboard')}
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{t('add_skill_title')}</h2>
        <p className="text-gray-500 mb-6">{t('add_skill_subtitle')}</p>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1,2,3,4].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step === s ? 'bg-purple-600 text-white' : step > s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>{step > s ? '✓' : s}</div>
              {s < 4 && <div className={`flex-1 h-1 rounded ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleNext}>
              <h3 className="text-lg font-bold text-gray-800 mb-6">{t('step1_heading')}</h3>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('skill_title')}<RequiredStar /></label>
                <input type="text" name="title" value={form.title} onChange={handleChange}
                  placeholder={t('skill_title_placeholder')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500" required />
                <p className="text-gray-400 text-xs mt-1">{t('skill_title_hint')}</p>
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('category')}<RequiredStar /></label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500" required>
                  <option value="">{t('select_category')}</option>
                  {categories[language].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('description')}<RequiredStar /></label>
                <textarea name="description" value={form.description} onChange={handleChange}
                  placeholder={t('description_placeholder')} rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500" required />
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('skill_type')}<RequiredStar /></label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'digital', label: t('digital'), desc: t('digital_desc') },
                    { value: 'physical', label: t('physical'), desc: t('physical_desc') },
                    { value: 'both', label: t('both'), desc: t('both_desc') }
                  ].map(type => (
                    <button key={type.value} type="button"
                      onClick={() => setForm({ ...form, skillType: type.value })}
                      className={`py-3 px-2 rounded-lg font-medium border-2 transition text-sm ${
                        form.skillType === type.value ? 'bg-purple-600 text-white border-purple-600' : 'text-gray-600 border-gray-300 hover:border-purple-400'
                      }`}>
                      <div>{type.label}</div>
                      <div className={`text-xs mt-1 ${form.skillType === type.value ? 'text-purple-200' : 'text-gray-400'}`}>{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                {t('next_btn')}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleNext}>
              <h3 className="text-lg font-bold text-gray-800 mb-6">{t('step2_heading')}</h3>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('whats_included')}<RequiredStar /></label>
                <textarea name="whatIsIncluded" value={form.whatIsIncluded} onChange={handleChange}
                  placeholder={t('whats_included_placeholder')} rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 font-mono text-sm" required />
                <p className="text-gray-400 text-xs mt-1">{t('whats_included_hint')}</p>
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('extra_work')}</label>
                <input type="text" name="extraWorkPolicy" value={form.extraWorkPolicy} onChange={handleChange}
                  placeholder={t('extra_work_placeholder')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500" />
                <p className="text-gray-400 text-xs mt-1">{t('extra_work_hint')}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-blue-700 font-medium text-sm">{t('scope_tip_title')}</p>
                <p className="text-blue-600 text-sm mt-1">{t('scope_tip_body')}</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={handleBack} className="flex-1 border-2 border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:border-purple-400 transition">{t('back_btn')}</button>
                <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">{t('next_btn')}</button>
              </div>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={handleNext}>
              <h3 className="text-lg font-bold text-gray-800 mb-6">{t('step3_heading')}</h3>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('price_type')}<RequiredStar /></label>
                <div className="grid grid-cols-2 gap-3">
                  {priceUnits.map(({ value, label }) => (
                    <button key={value} type="button" onClick={() => setForm({ ...form, priceUnit: value })}
                      className={`py-3 px-3 rounded-lg border-2 transition text-sm text-left ${
                        form.priceUnit === value ? 'bg-purple-600 text-white border-purple-600' : 'text-gray-600 border-gray-300 hover:border-purple-400'
                      }`}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('amount')}<RequiredStar /></label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 font-bold">₹</span>
                  <input type="number" name="price" value={form.price} onChange={handleChange}
                    placeholder="0" min="10"
                    className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:border-purple-500 text-lg font-bold" required />
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-yellow-700 font-medium text-sm">{t('commission_title')}</p>
                <p className="text-yellow-600 text-sm mt-1">
                  {t('commission_body')} <strong>₹{form.price ? (form.price * 0.95).toFixed(0) : '0'}</strong>
                </p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={handleBack} className="flex-1 border-2 border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:border-purple-400 transition">{t('back_btn')}</button>
                <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">{t('next_btn')}</button>
              </div>
            </form>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-lg font-bold text-gray-800 mb-6">{t('step4_heading')}</h3>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('delivery_method')}<RequiredStar /></label>
                <select name="deliveryMethod" value={form.deliveryMethod} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500" required>
                  <option value="">{t('select_delivery')}</option>
                  <option value="online">{t('delivery_online')}</option>
                  <option value="inperson">{t('delivery_inperson')}</option>
                  <option value="bypost">{t('delivery_post')}</option>
                  <option value="any">{t('delivery_any')}</option>
                </select>
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">{t('delivery_time')}<RequiredStar /></label>
                <select name="deliveryTime" value={form.deliveryTime} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500" required>
                  <option value="">{t('select_delivery')}</option>
                  <option value="Same day">{t('time_sameday')}</option>
                  <option value="Within 1 day">{t('time_1day')}</option>
                  <option value="Within 2-3 days">{t('time_3days')}</option>
                  <option value="Within 1 week">{t('time_1week')}</option>
                  <option value="Will discuss">{t('time_discuss')}</option>
                </select>
                <p className="text-gray-400 text-xs mt-1">{t('time_hint')}</p>
              </div>

              {(form.deliveryMethod === 'inperson' || form.skillType === 'physical' || form.skillType === 'both') && (
                <div className="mb-5 bg-blue-50 p-4 rounded-xl">
                  <p className="text-blue-700 font-medium mb-3">{t('your_location')}<RequiredStar /></p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">{t('city')}<RequiredStar /></label>
                      <input type="text" name="city" value={form.city} onChange={handleChange}
                        placeholder={t('your_city')}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">{t('state')}<RequiredStar /></label>
                      <select name="state" value={form.state} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500" required>
                        <option value="">{t('select_state')}</option>
                        {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <p className="font-bold text-gray-800 mb-3">{t('summary_title')}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('summary_title_label')}</span>
                    <span className="font-medium text-gray-800 text-right max-w-48">{form.title || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('summary_category_label')}</span>
                    <span className="font-medium text-gray-800">{form.category || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('summary_price_label')}</span>
                    <span className="font-bold text-green-600">₹{form.price || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('summary_earn_label')}</span>
                    <span className="font-bold text-purple-600">₹{form.price ? (form.price * 0.95).toFixed(0) : '0'}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={handleBack} className="flex-1 border-2 border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:border-purple-400 transition">{t('back_btn')}</button>
                <button type="submit" disabled={loading} className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50">
                  {loading ? t('listing') : t('list_skill_submit')}
                </button>
              </div>
              <p className="text-center text-gray-400 text-xs mt-3">
                <span className="text-red-500">*</span> {t('required_fields')}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddSkill;
