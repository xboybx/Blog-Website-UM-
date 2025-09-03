import React, { useState } from 'react';
import { Calendar, Book, Heart, MessageCircle, Share2, Bookmark, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
}

interface BlogPostProps {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ id, title, content, date, image, category, readTime }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentForm, setCommentForm] = useState({ name: '', message: '' });
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);
  const [views] = useState(Math.floor(Math.random() * 500) + 100);
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentForm.name.trim() && commentForm.message.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        name: commentForm.name,
        message: commentForm.message,
        date: new Date().toLocaleDateString()
      };
      setComments([newComment, ...comments]);
      setCommentForm({ name: '', message: '' });
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: content.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <article className="bg-white border-2 border-black rounded-xl neo-shadow mb-8 animate-card-hover">
      {/* Image */}
      <div className="relative">
        <img 
          src={`https://images.unsplash.com/${image}?w=800&h=400&fit=crop`}
          alt={title}
          className="w-full h-64 object-cover"
        />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-yellow-300 text-black px-3 py-1 text-sm font-bold border-2 border-black rounded-lg neo-shadow-sm">
            {category.toUpperCase()}
          </span>
        </div>
        
        {/* Quick actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="sm"
            className={`neo-button w-10 h-10 p-0 ${isBookmarked ? 'bg-blue-300' : 'bg-white'}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            className="neo-button bg-white w-10 h-10 p-0"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-6 rounded-b-xl">
        {/* Meta information */}
        <div className="flex items-center gap-6 text-gray-600 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{views} views</span>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-4 leading-tight hover:underline cursor-pointer">
          {title}
        </h2>
        
        {/* Content preview */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed line-clamp-3">
            {content}
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 neo-button ${
                isLiked 
                  ? 'bg-red-300 text-black' 
                  : 'bg-white text-black'
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">{likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 neo-button bg-white text-black"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{comments.length}</span>
            </Button>
          </div>
          
          <Button className="neo-button bg-black text-white hover:bg-gray-800">
            READ MORE
          </Button>
        </div>
        
        {/* Comments Section */}
        {showComments && (
          <div className="mt-6 pt-6 border-t-2 border-gray-100 rounded-lg animate-fade-in">
            <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              COMMENTS ({comments.length})
            </h3>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                  className="px-4 py-3 border-2 border-black focus:outline-none bg-white"
                  required
                />
              </div>
              <textarea
                placeholder="Share your thoughts..."
                value={commentForm.message}
                onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none resize-none bg-white"
                required
              />
              <Button
                type="submit"
                className="neo-button bg-green-300 text-black hover:bg-green-400"
              >
                POST COMMENT
              </Button>
            </form>
            
            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 border-2 border-black p-4 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 border-2 border-black">
                      <AvatarFallback className="bg-black text-white font-bold">
                        {comment.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-black">{comment.name}</h4>
                        <span className="text-sm text-gray-600">{comment.date}</span>
                      </div>
                      <p className="text-gray-700">{comment.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {comments.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">NO COMMENTS YET</p>
                  <p className="text-gray-400">Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPost;