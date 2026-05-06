import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BrowseSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Makeup & Beauty', 'Cooking & Recipes',
    'Art & Painting', 'Coding & Projects', 'Assignments & Notes',
    'Stitching & Tailoring', 'Music & Dance', 'Knitting & Craft', 'Other'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/skills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Skills load nahi hui');
    } finally {
      setLoading(false);
    }
  };

  const filtered = skills.filter(skill => {
    const matchSearch = skill.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchSearch && matchCat;
  });

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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Skills Dhundo 🔍</h2>
        <p className="text-gray-500 mb-6">Apni zaroorat ki skill hire karo</p>

        {/* Search */}
        <input type="text" value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Koi bhi skill search karo..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-purple-500" />

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(cat => (
            <button key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
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
          <div className="text-center py-20 text-gray-400 text-xl">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl">Koi skill nahi mili</p>
            <p className="text-gray-400">Abhi koi seller ne skill add nahi ki hai</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(skill => (
              <div key={skill.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border border-transparent hover:border-purple-200">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
                    {skill.category}
                  </span>
                  <span className="text-green-600 font-bold text-lg">₹{skill.price}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{skill.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{skill.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span>👤 {skill.sellerName}</span>
                  <span>⏱️ {skill.deliveryTime}</span>
                </div>
                <button
                  onClick={() => navigate(`/skill/${skill.id}`)}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                  Hire Karo
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseSkills;