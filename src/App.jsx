import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
        <div className="text-6xl mb-6">🎓</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          BunkMate AI
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Your attendance, sorted. 📚
        </p>
        <div className="bg-purple-100 border-2 border-purple-300 rounded-2xl p-4">
          <p className="text-purple-800 font-semibold">
            ✅ Day 1 Setup Complete!
          </p>
          <p className="text-purple-600 text-sm mt-2">
            Ready to build something awesome 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;