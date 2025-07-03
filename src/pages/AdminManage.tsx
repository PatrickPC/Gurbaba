
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { LogOut, Edit, Trash2, Plus, Home, Clock, Shield } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useNews } from '../contexts/NewsContext';
import { supabase } from '../integrations/supabase/Client';

const AdminManage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { articles, refreshArticles } = useNews();

  useEffect(() => {
    const checkAuthentication = () => {
      const auth = localStorage.getItem('isAdminAuthenticated');
      const expiry = localStorage.getItem('adminAuthExpiry');
      
      if (auth === 'true' && expiry) {
        const expiryTime = parseInt(expiry);
        const timeLeft = Math.max(0, expiryTime - Date.now());
        
        if (timeLeft > 0) {
          setIsAuthenticated(true);
          setSessionTimeLeft(Math.floor(timeLeft / 1000));
        } else {
          handleSessionExpiry();
        }
      } else {
        navigate('/login');
      }
    };

    checkAuthentication();
    
    // Check authentication every minute
    const authInterval = setInterval(checkAuthentication, 60000);
    
    // Update session timer every second
    const timerInterval = setInterval(() => {
      setSessionTimeLeft(prev => {
        if (prev <= 1) {
          handleSessionExpiry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(authInterval);
      clearInterval(timerInterval);
    };
  }, [navigate]);

  const handleSessionExpiry = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminAuthExpiry');
    localStorage.removeItem('adminLoginTime');
    toast({
      title: "Session Expired",
      description: "Your admin session has expired. Please log in again.",
      variant: "destructive",
    });
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminAuthExpiry');
    localStorage.removeItem('adminLoginTime');
    toast({
      title: "Logged Out",
      description: "You have been securely logged out.",
    });
    navigate('/login');
  };

  const extendSession = () => {
    const newExpiryTime = Date.now() + (2 * 60 * 60 * 1000); // Extend by 2 hours
    localStorage.setItem('adminAuthExpiry', newExpiryTime.toString());
    setSessionTimeLeft(2 * 60 * 60); // 2 hours in seconds
    toast({
      title: "Session Extended",
      description: "Your session has been extended by 2 hours.",
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Article Deleted",
        description: "The article has been successfully deleted.",
      });

      refreshArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the article. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/edit/${id}`);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="text-red-600" size={20} />
                Admin Panel - Manage Articles
              </h1>
              <p className="text-sm text-gray-500">The Kathmandu Post</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                <Clock size={14} />
                <span>Session: {formatTime(sessionTimeLeft)}</span>
                {sessionTimeLeft < 1800 && ( // Less than 30 minutes
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={extendSession}
                    className="ml-2 text-xs px-2 py-1 h-6"
                  >
                    Extend
                  </Button>
                )}
              </div>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Home size={16} />
                Homepage
              </Button>
              <Button
                onClick={() => navigate('/admin')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Create New Article
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut size={16} />
                Secure Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Published Articles</CardTitle>
            <CardDescription>Manage all published news articles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {article.title}
                    </TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {article.category}
                      </span>
                    </TableCell>
                    <TableCell>{article.published_at}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(article.id)}
                          className="flex items-center gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(article.id)}
                          className="flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {articles.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No articles found. Create your first article to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminManage;