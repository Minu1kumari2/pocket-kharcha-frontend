import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddSkill() {
  const [form, setForm] = useState({
    title: '', description: '', category: '',
    price: '', deliveryTime: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
  if (!user) {
    navigate('/login');
  }
}, []);
  const categories = [
    'Makeup & Beauty', 'Cooking & Recipes', 'Art & Painting',
    'Coding & Projects', 'Assignments & Notes', 'Stitching & Tailoring',
    'Music & Dance', 'Knitting & Craft', 'Other'
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const skillData = {
        ...form,
        price: parseFloat(form.price),
        sellerId: user.id,
        sellerName: user.name,
        sellerEmail: user.email
      };
      const response = await fetch('http://localhost:8080/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData)
      });
      const data = await response.json();
      if (data.success) {
        alert('Skill list ho gayi! 🎉');
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Kuch galat hua. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
        <button onClick={() => navigate('/dashboard')}
          className="text-gray-600 hover:text-purple-600">
          ← Dashboard
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Apni Skill List Karo 💼</h2>
        <p className="text-gray-500 mb-8">Batao tum kya kar sakte ho aur kitne mein</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Skill ka Title</label>
            <input type="text" name="title" value={form.title}
              onChange={handleChange}
              placeholder="e.g. Main tumhara PPT banaunga, Bridal Makeup"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select name="category" value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required>
              <option value="">Category chuno</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea name="description" value={form.description}
              onChange={handleChange}
              placeholder="Apni skill ke baare mein detail mein batao..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
              <input type="number" name="price" value={form.price}
                onChange={handleChange}
                placeholder="199"
                min="10"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Delivery Time</label>
              <select name="deliveryTime" value={form.deliveryTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                required>
                <option value="">Select</option>
                <option value="Same day">Same day</option>
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
                <option value="1 week">1 week</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50">
            {loading ? 'List ho rahi hai...' : 'Skill List Karo 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSkill;