import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Shield, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface AdminSecurityGateProps {
  onAccessGranted: () => void;
}

const AdminSecurityGate = ({ onAccessGranted }: AdminSecurityGateProps) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    securityCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const { toast } = useToast();

  const MAX_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 300; // 5 minutes in seconds

  useEffect(() => {
    // Check if there's an existing lockout
    const lockoutEnd = localStorage.getItem('adminLockoutEnd');
    if (lockoutEnd) {
      const remaining = Math.max(0, parseInt(lockoutEnd) - Date.now());
      if (remaining > 0) {
        setIsLocked(true);
        setLockoutTimer(Math.ceil(remaining / 1000));
      } else {
        localStorage.removeItem('adminLockoutEnd');
        localStorage.removeItem('adminAttempts');
      }
    }

    // Get stored attempts
    const storedAttempts = localStorage.getItem('adminAttempts');
    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLocked && lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            localStorage.removeItem('adminLockoutEnd');
            localStorage.removeItem('adminAttempts');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLocked, lockoutTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      toast({
        title: "Access Locked",
        description: `Too many failed attempts. Try again in ${Math.floor(lockoutTimer / 60)}:${(lockoutTimer % 60).toString().padStart(2, '0')}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate server verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Enhanced security check with multiple credentials
    const isValidUsername = credentials.username === 'Gurbaba';
    const isValidPassword = credentials.password === 'radiogurbaba';
    const isValidSecurityCode = credentials.securityCode === 'RADIO2024';

    if (isValidUsername && isValidPassword && isValidSecurityCode) {
      // Reset attempts on successful login
      setAttempts(0);
      localStorage.removeItem('adminAttempts');
      localStorage.removeItem('adminLockoutEnd');
      
      // Set authentication with expiry (2 hours)
      const expiryTime = Date.now() + (2 * 60 * 60 * 1000);
      localStorage.setItem('isAdminAuthenticated', 'true');
      localStorage.setItem('adminAuthExpiry', expiryTime.toString());
      localStorage.setItem('adminLoginTime', Date.now().toString());
      
      toast({
        title: "Access Granted",
        description: "Welcome to the secure admin panel!",
      });
      
      onAccessGranted();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('adminAttempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockoutEnd = Date.now() + (LOCKOUT_DURATION * 1000);
        localStorage.setItem('adminLockoutEnd', lockoutEnd.toString());
        setIsLocked(true);
        setLockoutTimer(LOCKOUT_DURATION);
        
        toast({
          title: "Access Denied - Account Locked",
          description: `Too many failed attempts. Access locked for ${LOCKOUT_DURATION / 60} minutes.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Access Denied",
          description: `Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`,
          variant: "destructive",
        });
      }
    }
    
    setIsLoading(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Secure Admin Access
          </h2>
          <p className="text-red-200">
            Multi-factor authentication required
          </p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-sm border-red-200/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Panel Security
            </CardTitle>
            <CardDescription className="text-red-100">
              Enter all required credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLocked && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-3 text-red-200">
                  <AlertTriangle className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Account Temporarily Locked</p>
                    <p className="text-sm">Unlock in: {formatTime(lockoutTimer)}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  placeholder="Enter admin username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="bg-white/10 border-red-200/30 text-white placeholder:text-gray-400"
                  disabled={isLocked}
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter admin password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="bg-white/10 border-red-200/30 text-white placeholder:text-gray-400 pr-10"
                    disabled={isLocked}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLocked}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="securityCode" className="text-white">Security Code</Label>
                <div className="relative">
                  <Input
                    id="securityCode"
                    type={showSecurityCode ? 'text' : 'password'}
                    required
                    placeholder="Enter security code"
                    value={credentials.securityCode}
                    onChange={(e) => setCredentials({...credentials, securityCode: e.target.value})}
                    className="bg-white/10 border-red-200/30 text-white placeholder:text-gray-400 pr-10"
                    disabled={isLocked}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    onClick={() => setShowSecurityCode(!showSecurityCode)}
                    disabled={isLocked}
                  >
                    {showSecurityCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {attempts > 0 && !isLocked && (
                <div className="text-center text-yellow-300 text-sm">
                  Warning: {attempts}/{MAX_ATTEMPTS} failed attempts
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading || isLocked}
              >
                {isLoading ? 'Verifying...' : isLocked ? 'Access Locked' : 'Secure Login'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-red-200 text-sm">
          <p>Unauthorized access attempts are logged and monitored</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurityGate;