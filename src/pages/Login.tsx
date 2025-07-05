import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';
import AdminSecurityGate from '../components/AdminSecurityGate';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated and session is valid
    const auth = localStorage.getItem('isAdminAuthenticated');
    const expiry = localStorage.getItem('adminAuthExpiry');
    
    if (auth === 'true' && expiry) {
      const expiryTime = parseInt(expiry);
      if (Date.now() < expiryTime) {
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        // Session expired, clear authentication
        localStorage.removeItem('isAdminAuthenticated');
        localStorage.removeItem('adminAuthExpiry');
        localStorage.removeItem('adminLoginTime');
      }
    }
  }, [navigate]);

  const handleAccessGranted = () => {
    setIsAuthenticated(true);
    navigate('/admin');
  };

  if (isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to admin panel...</p>
      </div>
    </div>;
  }

  return (
    <div className="relative">
      <AdminSecurityGate onAccessGranted={handleAccessGranted} />
      
      {/* Back to homepage button */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          <Home size={16} />
          Back to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Login;