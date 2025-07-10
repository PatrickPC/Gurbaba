import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { LogOut, Edit, Trash2, Plus, Home, Clock, Shield, Play } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/Client';
import { useQuery } from '@tanstack/react-query';

interface Video {
  id: string;
  title: string;
  author: string;
  category: string;
  created_at: string;
  video_url: string;
  thumbnail?: string;
  duration?: string;
}

const AdminManageVideos = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch videos using react-query
  const { data: videos = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Video[];
    },
  });

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Video Deleted",
        description: "The video has been successfully deleted.",
      });

      refetch();
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the video. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (id: string) => {
    // For now, just show a message - video editing functionality can be added later
    toast({
      title: "Edit Video",
      description: "Video editing functionality will be available soon.",
    });
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error loading videos: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="text-red-600" size={20} />
                Admin Panel - Manage Videos
              </h1>
              <p className="text-sm text-gray-500">The Gurbaba Post</p>
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
                Upload New Video
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
            <CardTitle>Uploaded Videos</CardTitle>
            <CardDescription>Manage all uploaded videos</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {video.title}
                    </TableCell>
                    <TableCell>{video.author}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {video.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Play size={12} />
                        {isYouTubeUrl(video.video_url) ? 'YouTube' : 'Upload'}
                      </div>
                    </TableCell>
                    <TableCell>{video.duration || 'N/A'}</TableCell>
                    <TableCell>{formatDate(video.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(video.id)}
                          className="flex items-center gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(video.id)}
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
            {videos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No videos found. Upload your first video to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminManageVideos;