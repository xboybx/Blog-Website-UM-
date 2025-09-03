import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageIcon, Type, Tag, Clock, Save, Eye } from 'lucide-react';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const { user } = useAuth();

  const categories = ['Technology', 'Design', 'Programming', 'Lifestyle', 'Travel', 'Business', 'Health', 'Education'];
  const estimatedReadTime = Math.ceil(content.split(' ').length / 200);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    const newPost = {
      id: Date.now(),
      title,
      content,
      category: category || 'General',
      image: image || 'photo-1486312338219-ce68d2c6f44d',
      date: new Date().toLocaleDateString(),
      readTime: `${estimatedReadTime} min read`,
      authorId: user.id,
      authorName: user.username
    };

    posts.push(newPost);
    localStorage.setItem('userPosts', JSON.stringify(posts));
    
    // Reset form
    setTitle('');
    setContent('');
    setCategory('');
    setImage('');
    
    // Refresh the page to show the new post
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-black neo-shadow bg-white">
        <CardHeader className="bg-black text-white p-8">
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <Type className="h-8 w-8" />
            CREATE YOUR STORY
          </CardTitle>
          <p className="text-gray-300 text-lg">Share your thoughts with the world</p>
        </CardHeader>
        
        <CardContent className="p-8">
          {/* Toggle buttons */}
          <div className="flex gap-2 mb-8">
            <Button
              type="button"
              className={`neo-button px-6 ${!isPreview ? 'bg-black text-white' : 'bg-white text-black'}`}
              onClick={() => setIsPreview(false)}
            >
              <Type className="h-4 w-4 mr-2" />
              WRITE
            </Button>
            <Button
              type="button"
              className={`neo-button px-6 ${isPreview ? 'bg-black text-white' : 'bg-white text-black'}`}
              onClick={() => setIsPreview(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              PREVIEW
            </Button>
          </div>

          {!isPreview ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-black flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  POST TITLE
                </label>
                <Input
                  type="text"
                  placeholder="Enter an engaging title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg p-4 border-2 border-black focus:outline-none bg-white"
                  required
                />
              </div>

              {/* Category and Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    CATEGORY
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="p-4 border-2 border-black focus:outline-none bg-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-black flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    COVER IMAGE (UNSPLASH ID)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., photo-1486312338219-ce68d2c6f44d"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="p-4 border-2 border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-black">CONTENT</label>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{estimatedReadTime} MIN READ</span>
                  </div>
                </div>
                <Textarea
                  placeholder="Write your amazing story here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={15}
                  className="p-4 border-2 border-black focus:outline-none resize-none text-base leading-relaxed bg-white"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full neo-button bg-green-300 text-black hover:bg-green-400 py-4 text-lg font-bold"
              >
                <Save className="h-5 w-5 mr-2" />
                PUBLISH STORY
              </Button>
            </form>
          ) : (
            /* Preview */
            <div className="space-y-8">
              {/* Preview header */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-black mb-4">{title || 'YOUR TITLE HERE'}</h1>
                <div className="flex items-center justify-center gap-6 text-gray-600">
                  <span className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    {category || 'CATEGORY'}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {estimatedReadTime} MIN READ
                  </span>
                </div>
              </div>

              {/* Preview image */}
              {image && (
                <div className="border-2 border-black">
                  <img 
                    src={`https://images.unsplash.com/${image}?w=800&h=400&fit=crop`}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Preview content */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {content || 'Your content will appear here...'}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;