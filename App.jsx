import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import VideoFeed from './components/VideoFeed'
import Upload from './components/Upload'
import Auth from './components/Auth'
import Profile from './components/Profile'

export default function App(){
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MSW Video App</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<VideoFeed/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </main>
    </div>
  )
}
