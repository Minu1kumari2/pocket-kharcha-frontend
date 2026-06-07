import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Payment() {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchSkill();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSkill = async () => {
    const response = await fetch(`http://localhost:8080/api/skills/${id}`);
    const data = await response.json();
    setSkill(data);
  };

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_Sm1ekDWhqdIs1d',
      amount: skill.price * 100,
      currency: 'INR',
      name: 'Pocket Kharcha',
      description: skill.title,
      handler: function (response) {
        alert(
          (language === 'en'
            ? 'Payment successful! 🎉\nPayment ID: '
            : 'भुगतान सफल! 🎉\nपेमेंट ID: ')
          + response.razorpay_payment_id
        );
        navigate('/dashboard');
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone
      },
      theme: { color: '#7c3aed' }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!skill) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">{t('loading')}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
        <button onClick={toggleLanguage}
          className="flex items-center gap-1 bg-gray-100 hover:bg-purple-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium transition border border-gray-200">
          {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
        </button>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
            <p className="text-gray-500 mt-1">
              {language === 'en' ? 'Payment Summary' : 'भुगतान सारांश'}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-gray-500 text-sm">
              {language === 'en' ? 'Skill' : 'स्किल'}
            </p>
            <p className="font-bold text-gray-800 text-lg">{skill.title}</p>

            <p className="text-gray-500 text-sm mt-3">
              {language === 'en' ? 'Seller' : 'विक्रेता'}
            </p>
            <p className="font-semibold text-gray-800">{skill.sellerName}</p>

            <p className="text-gray-500 text-sm mt-3">
              {t('delivery_time_label')}
            </p>
            <p className="font-semibold text-gray-800">{skill.deliveryTime}</p>
          </div>

          <div className="flex justify-between items-center mb-6 p-4 bg-purple-50 rounded-xl">
            <span className="font-semibold text-gray-700">
              {language === 'en' ? 'Total Amount' : 'कुल राशि'}
            </span>
            <span className="text-2xl font-bold text-purple-600">₹{skill.price}</span>
          </div>

          <button onClick={handlePayment}
            className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition">
            {language === 'en'
              ? `Pay ₹${skill.price} Securely 🔒`
              : `₹${skill.price} सुरक्षित भुगतान करें 🔒`}
          </button>

          <p className="text-center text-gray-400 text-xs mt-3">
            {language === 'en'
              ? 'Powered by Razorpay — 100% Secure'
              : 'Razorpay द्वारा संचालित — 100% सुरक्षित'}
          </p>

          <button onClick={() => navigate(`/skill/${id}`)}
            className="w-full text-gray-400 text-sm mt-3 hover:text-gray-600">
            {t('back_browse')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;