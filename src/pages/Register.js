import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', role: 'buyer'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Registration coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
          <p className="text-gray-500 mt-2">Naya account banao — bilkul free!</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setForm({ ...form, role: 'buyer' })}
            className={`flex-1 py-3 rounded-lg font-semibold border-2 transition ${
              form.role === 'buyer'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'text-gray-600 border-gray-300'
            }`}
          >
            🛍️ Khareedaar
          </button>
          <button
            onClick={() => setForm({ ...form, role: 'seller' })}
            className={`flex-1 py-3 rounded-lg font-semibold border-2 transition ${
              form.role === 'seller'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'text-gray-600 border-gray-300'
            }`}
          >
            💼 Skill Seller
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Poora Naam</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tumhara naam"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="apna@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Account Banao 🚀
          </button>
        </form>

        {/* Login link */}
        <p className="text-center mt-4 text-gray-600">
          Pehle se account hai?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
          >
            Login karo
          </span>
        </p>

        {/* Back */}
        <p className="text-center mt-4">
          <span
            onClick={() => navigate('/')}
            className="text-gray-400 text-sm cursor-pointer hover:underline"
          >
            ← Wapas Home
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;