import React, { useState } from 'react';
import { getRandomImage } from '../lib/randomImage';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-black neo-shadow bg-white">
      <div className="mb-6 p-4 bg-yellow-100 border-2 border-yellow-400 rounded text-black text-center">
        <p className="font-semibold mb-2">New here?</p>
        <p className="mb-2">Please <span className="font-bold">create an account</span> before logging in.</p>
        <p className="mb-2">After logging in, you can start creating your own stories by clicking the <span className="font-bold">Write</span> button at the top of the page.</p>
      </div>
      <CardHeader className="bg-black text-white p-8 text-center">
        <div className="flex justify-center mb-4">
          <img src={getRandomImage()} alt="login visual" className="w-16 h-16 object-cover rounded-full border-2 border-black" />
        </div>
        <CardTitle className="text-2xl font-bold">WELCOME BACK</CardTitle>
        <p className="text-gray-300">Sign in to continue your journey</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
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
                <span className="w-6 h-6 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                SIGNING IN...
              </div>
            ) : (
              'SIGN IN'
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-black">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-black font-bold hover:underline"
              >
                CREATE ACCOUNT
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;