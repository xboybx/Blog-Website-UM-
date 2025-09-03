import React, { useState } from 'react';
import { getRandomImage } from '../lib/randomImage';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (register(username, email, password)) {
      navigate('/');
    } else {
      setError('User with this email already exists');
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-black neo-shadow bg-white">
      <CardHeader className="bg-black text-white p-8 text-center">
        <div className="flex justify-center mb-4">
          <img src={getRandomImage()} alt="register visual" className="w-16 h-16 object-cover rounded-full border-2 border-black" />
        </div>
        <CardTitle className="text-2xl font-bold">JOIN OUR COMMUNITY</CardTitle>
        <p className="text-gray-300">Create your account to start sharing stories</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-black flex items-center gap-2">
              <User className="h-4 w-4" />
              USERNAME
            </label>
            <Input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-4 border-2 border-black focus:outline-none bg-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-black flex items-center gap-2">
              <Mail className="h-4 w-4" />
              EMAIL ADDRESS
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 border-2 border-black focus:outline-none bg-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-black flex items-center gap-2">
              <Lock className="h-4 w-4" />
              PASSWORD
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-4 pr-12 border-2 border-black focus:outline-none bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-black flex items-center gap-2">
              <Lock className="h-4 w-4" />
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-4 pr-12 border-2 border-black focus:outline-none bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="p-4 bg-red-300 border-2 border-black">
              <p className="text-black text-sm font-medium">{error}</p>
            </div>
          )}
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full neo-button bg-black text-white hover:bg-gray-800 py-4 text-lg font-bold disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin"></div>
                CREATING ACCOUNT...
              </div>
            ) : (
              'CREATE ACCOUNT'
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-black">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-black font-bold hover:underline"
              >
                SIGN IN
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;