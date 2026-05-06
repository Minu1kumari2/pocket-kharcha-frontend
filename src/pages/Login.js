import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Login ho gaya! Welcome ' + data.user.name + ' 🎉');
      navigate('/dashboard');
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Server se connection nahi ho raha. Backend chalu hai?');
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
          <p className="text-gray-500 mt-2">Apne account mein login karo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="apna@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4 text-gray-400">— ya —</div>

        {/* Register link */}
        <p className="text-center text-gray-600">
          Naya account banana hai?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
          >
            Register karo
          </span>
        </p>

        {/* Back to home */}
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

export default Login;