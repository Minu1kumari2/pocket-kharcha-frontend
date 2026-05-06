import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        alert('Account ban gaya! Ab login karo 🎉');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Server se connection nahi ho raha!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
          <p className="text-gray-500 mt-2">Naya account banao — bilkul free!</p>
          <p className="text-sm text-purple-500 mt-1">Skill becho ya hire karo — sab ek jagah!</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Poora Naam</label>
            <input type="text" name="name" value={form.name}
              onChange={handleChange} placeholder="Tumhara naam"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="apna@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input type="tel" name="phone" value={form.phone}
              onChange={handleChange} placeholder="9876543210"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" name="password" value={form.password}
              onChange={handleChange} placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50">
            {loading ? 'Account ban raha hai...' : 'Account Banao 🚀'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Pehle se account hai?{' '}
          <span onClick={() => navigate('/login')}
            className="text-purple-600 font-semibold cursor-pointer hover:underline">
            Login karo
          </span>
        </p>
        <p className="text-center mt-4">
          <span onClick={() => navigate('/')}
            className="text-gray-400 text-sm cursor-pointer hover:underline">
            ← Wapas Home
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;