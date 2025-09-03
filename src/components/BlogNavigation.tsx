import React from 'react';
import { Filter } from 'lucide-react';

interface BlogNavigationProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const BlogNavigation: React.FC<BlogNavigationProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <nav className="bg-white border-b-2 border-black sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5" />
            <span className="font-medium">FILTER:</span>
          </div>
        </div>
        
        <div className="pb-4">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 text-sm font-medium border-2 border-black transition-all duration-150 ${
                  selectedCategory === category
                    ? 'bg-black text-white neo-shadow-sm'
                    : 'bg-white text-black hover:bg-gray-100 neo-button'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BlogNavigation;