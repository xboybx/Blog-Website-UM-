import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BlogHeader from '../components/BlogHeader';
import BlogNavigation from '../components/BlogNavigation';
import BlogPost from '../components/BlogPost';
import BlogFooter from '../components/BlogFooter';
import CreatePost from '../components/CreatePost';
import Auth from './Auth';
import { blogPosts } from '../data/blogPosts';
import { FileText, TrendingUp, Clock } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    setUserPosts(savedPosts);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // Combine default posts with user posts
  const allPosts = useMemo(() => {
    return [...blogPosts, ...userPosts];
  }, [userPosts]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allPosts.map(post => post.category))];
    return ['All', ...uniqueCategories];
  }, [allPosts]);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allPosts]);

  if (!user) {
    return <Auth />;
  }

  if (showCreatePost) {
    return (
      <div className="min-h-screen bg-white">
        <BlogHeader 
          searchTerm=""
          onSearchChange={() => {}}
        />
        <main className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <button
              onClick={() => setShowCreatePost(false)}
              className="neo-button bg-gray-200 text-black hover:bg-gray-300 px-4 py-2"
            >
              ← BACK TO STORIES
            </button>
          </div>
          <CreatePost />
        </main>
        <BlogFooter />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <span className="w-16 h-16 inline-block border-8 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></span>
          <p className="text-black text-lg font-bold">LOADING STORIES...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreatePost={() => setShowCreatePost(true)}
      />
      
      <BlogNavigation 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-yellow-300 border-2 border-black neo-shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{allPosts.length}</p>
                <p className="text-black font-medium">TOTAL STORIES</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-300 border-2 border-black neo-shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{categories.length - 1}</p>
                <p className="text-black font-medium">CATEGORIES</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-300 border-2 border-black neo-shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{Math.round(allPosts.reduce((acc, post) => acc + parseInt(post.readTime), 0) / allPosts.length)}</p>
                <p className="text-black font-medium">AVG. READ TIME</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search results info */}
        {(searchTerm || selectedCategory !== 'All') && (
          <div className="mb-8 p-6 bg-gray-100 border-2 border-black">
            <p className="text-black font-medium">
              {filteredPosts.length > 0 ? (
                <>
                  FOUND <span className="font-bold">{filteredPosts.length}</span> STORIES
                  {searchTerm && <> MATCHING "<span className="font-bold">{searchTerm.toUpperCase()}</span>"</>}
                  {selectedCategory !== 'All' && <> IN <span className="font-bold">{selectedCategory.toUpperCase()}</span></>}
                </>
              ) : (
                <>NO STORIES FOUND MATCHING YOUR CRITERIA</>
              )}
            </p>
          </div>
        )}

        {filteredPosts.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogPost {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-black mx-auto mb-6"></div>
            <h2 className="text-3xl font-bold text-black mb-4">NO STORIES FOUND</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Try adjusting your search terms or explore different categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="neo-button bg-black text-white hover:bg-gray-800 px-8 py-3"
            >
              SHOW ALL STORIES
            </button>
          </div>
        )}
      </main>
      
      <BlogFooter />
    </div>
  );
};

export default Index;