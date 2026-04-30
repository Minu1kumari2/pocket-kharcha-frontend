import React from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-purple-600">Pocket Kharcha 🎯</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-purple-600 font-medium">Login</button>
          <button onClick={() => navigate('/register')} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Apna Hunar, Apni Kamai 💰
        </h2>
        <p className="text-xl text-gray-500 mb-8 max-w-2xl">
          India ka pehla peer-to-peer skill marketplace — makeup, cooking, 
          art, assignments, coding aur bahut kuch. Sikhao, seekho, kamao!
        </p>
        <div className="flex gap-4">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700">
            Apni Skill List Karo
          </button>
          <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-50">
            Koi Skill Dhundo
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-8 py-12 bg-gray-50">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Kya Dhundh Rahe Ho? 🔍
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { emoji: "💄", title: "Makeup & Beauty" },
            { emoji: "🍳", title: "Cooking & Recipes" },
            { emoji: "🎨", title: "Art & Painting" },
            { emoji: "💻", title: "Coding & Projects" },
            { emoji: "📝", title: "Assignments & Notes" },
            { emoji: "✂️", title: "Stitching & Tailoring" },
            { emoji: "🎵", title: "Music & Dance" },
            { emoji: "🧶", title: "Knitting & Craft" },
          ].map((cat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md cursor-pointer hover:border-purple-300 border-2 border-transparent transition-all">
              <div className="text-4xl mb-2">{cat.emoji}</div>
              <div className="font-semibold text-gray-700">{cat.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="px-8 py-12">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Kaise Kaam Karta Hai? 🤔
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "1", title: "Apni Skill List Karo", desc: "Batao tum kya kar sakte ho — makeup, cooking, coding, kuch bhi", emoji: "✍️" },
            { step: "2", title: "Order Milega", desc: "Koi tumhari skill book karega aur payment karega", emoji: "📱" },
            { step: "3", title: "Kaam Karo, Kamao", desc: "Kaam complete karo aur seedha apne account mein paisa pao", emoji: "💸" },
          ].map((item, index) => (
            <div key={index} className="text-center p-6">
              <div className="text-5xl mb-4">{item.emoji}</div>
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-600 text-white text-center py-6">
        <p className="text-lg font-semibold">Pocket Kharcha 🎯</p>
        <p className="text-purple-200 text-sm mt-1">Har hunar ki kimat hoti hai</p>
      </footer>

    </div>
  );
}

export default Home;