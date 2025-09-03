import React from 'react';
import { getRandomImage } from '../lib/randomImage';
import { Search, LogOut, User, PenTool } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

interface BlogHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCreatePost?: () => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ searchTerm, onSearchChange, onCreatePost }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b-2 border-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <img src={getRandomImage()} alt="header visual" className="w-8 h-8 object-cover rounded-lg border-2 border-black" />
            <span className="text-2xl font-bold">
              BREEZY STORIES
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 bg-gray-100 border-2 border-black px-4 py-2">
                  <div className="w-6 h-6 bg-gray-200 flex items-center justify-center rounded-md">
                    <User className="h-3 w-3 text-black" />
                  </div>
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                {onCreatePost && (
                  <Button 
                    onClick={onCreatePost} 
                    className="neo-button bg-yellow-300 text-black hover:bg-yellow-400"
                  >
                    <PenTool className="h-4 w-4 mr-2" />
                    Write
                  </Button>
                )}
                <Button 
                  onClick={logout} 
                  className="neo-button bg-red-300 text-black hover:bg-red-400"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => window.location.href = '/auth'} 
                className="neo-button bg-green-300 text-black hover:bg-green-400"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            DISCOVER
            <br />
            <span className="bg-yellow-300 px-4 py-2 inline-block transform -rotate-1">
              STORIES
            </span>
          </h1>
          
          <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
            A minimalistic platform for passionate writers and curious readers
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-white border-2 border-black neo-shadow p-1">
              <div className="flex items-center">
                <div className="absolute left-4 z-10">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-transparent text-black placeholder-gray-400 focus:outline-none"
                />
                <Button className="neo-button bg-gray-800 text-white hover:bg-gray-700 m-1 rounded-lg">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;