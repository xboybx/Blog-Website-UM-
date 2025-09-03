import React from 'react';
import { Heart, Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

const BlogFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white mt-20 border-t-4 border-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              BREEZY BLOG STORIES
            </h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
              A minimalistic platform for discovering amazing stories and connecting with passionate writers.
            </p>
            <div className="flex gap-4">
              <Button className="neo-button bg-white text-black hover:bg-gray-200 w-12 h-12 p-0">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button className="neo-button bg-white text-black hover:bg-gray-200 w-12 h-12 p-0">
                <Github className="h-5 w-5" />
              </Button>
              <Button className="neo-button bg-white text-black hover:bg-gray-200 w-12 h-12 p-0">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button className="neo-button bg-white text-black hover:bg-gray-200 w-12 h-12 p-0">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-xl font-bold mb-6">QUICK LINKS</h4>
            <ul className="space-y-3">
              {['ABOUT US', 'WRITE FOR US', 'CONTACT', 'PRIVACY POLICY', 'TERMS OF SERVICE'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline font-medium"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-xl font-bold mb-6">CATEGORIES</h4>
            <ul className="space-y-3">
              {['TECHNOLOGY', 'DESIGN', 'PROGRAMMING', 'LIFESTYLE', 'TRAVEL'].map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline font-medium"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="bg-white text-black border-4 border-white p-8 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold mb-4">STAY UPDATED</h4>
            <p className="text-gray-700 mb-6">Get the latest stories delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border-2 border-black focus:outline-none"
              />
              <Button className="neo-button bg-black text-white hover:bg-gray-800">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t-2 border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-4 md:mb-0">
            <span>© 2024 BREEZY BLOG STORIES. MADE WITH</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>USING REACT & TAILWIND CSS</span>
          </div>
          
          <Button
            onClick={scrollToTop}
            className="neo-button bg-white text-black hover:bg-gray-200 w-12 h-12 p-0"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;