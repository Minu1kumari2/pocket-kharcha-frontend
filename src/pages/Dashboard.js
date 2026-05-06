import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Namaste, <strong>{user.name}</strong> 👋</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

{/* Banner */}
<div className="bg-purple-600 text-white px-8 py-10">
  <h2 className="text-3xl font-bold mb-2">Welcome, {user.name}! 🎉</h2>
  <p className="text-purple-200 text-lg">Skill becho, skill hire karo — sab ek jagah!</p>
</div>

{/* Cards */}
<div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
    <div className="text-3xl mb-2">💼</div>
    <h3 className="text-lg font-bold text-gray-800">Skill Add Karo</h3>
    <p className="text-gray-500 mt-1 text-sm">Apni skill list karke kamao</p>
    <button onClick={() => navigate('/add-skill')}
      className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full text-sm">
      Add Karo
    </button>
  </div>

  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
    <div className="text-3xl mb-2">🔍</div>
    <h3 className="text-lg font-bold text-gray-800">Skills Dhundo</h3>
    <p className="text-gray-500 mt-1 text-sm">Koi bhi skill hire karo</p>
    <button onClick={() => navigate('/browse')}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full text-sm">
      Browse Karo
    </button>
  </div>

  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
    <div className="text-3xl mb-2">📋</div>
    <h3 className="text-lg font-bold text-gray-800">Mere Orders</h3>
    <p className="text-gray-500 mt-1 text-sm">Tumhare aaye orders dekho</p>
    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full text-sm">
      Dekho
    </button>
  </div>

  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-yellow-500">
    <div className="text-3xl mb-2">💰</div>
    <h3 className="text-lg font-bold text-gray-800">Meri Kamai</h3>
    <p className="text-gray-500 mt-1 text-sm">Total earnings dekho</p>
    <div className="mt-4 text-2xl font-bold text-yellow-500">₹0</div>
  </div>

</div>

      {/* Profile Info */}
      <div className="px-8 pb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Meri Profile 👤</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Naam</p>
              <p className="font-semibold text-gray-800">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="font-semibold text-gray-800">{user.phone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Role</p>
              <p className="font-semibold text-purple-600 capitalize">{user.role === 'seller' ? '💼 Skill Seller' : '🛍️ Khareedaar'}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;