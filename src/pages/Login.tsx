import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@example.com');
    setPassword('demo123');
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-serif mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-error-500 bg-opacity-10 border border-error-500 text-error-500 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input focus:ring-[#722F37]"
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input focus:ring-[#722F37]"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn bg-[#722F37] hover:bg-[#8B383F] text-white w-full flex items-center justify-center"
            >
              {loading ? (
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <LogIn size={18} className="mr-2" />
              )}
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-[#722F37] hover:text-[#8B383F] text-sm"
              >
                Use demo credentials
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;