import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { LogOut, Upload, Eye, Home, Clock, Shield } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useNews } from '../contexts/NewsContext';
import { supabase } from '../integrations/supabase/Client';
import VideoUploadForm from '../components/VideoUploadForm';
import BreakingNewsManager from '../components/BreakingNewsManager';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '',
    tags: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createArticle } = useNews();

  const categories = [
    'Politics', 'Sports', 'Money', 'Science & Technology', 'World', 
    'Features', 'Columns', 'Editorial', 'Interviews', 'Opinion'
  ];

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

  const uploadImageToStorage = async (file: File): Promise<string | null> => {
    try {
      setIsUploadingImage(true);
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `news-articles/${fileName}`;

      const { data, error } = await supabase.storage
        .from('news-images')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Upload to Supabase Storage
      const uploadedUrl = await uploadImageToStorage(file);
      if (uploadedUrl) {
        setNewsForm({...newsForm, image: uploadedUrl});
        toast({
          title: "Image Uploaded",
          description: "Image has been uploaded successfully.",
        });
      }
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsForm.title || !newsForm.excerpt || !newsForm.content || !newsForm.author || !newsForm.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsPublishing(true);

    try {
      // Convert tags string to array
      const tagsArray = newsForm.tags 
        ? newsForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const articleData = {
        title: newsForm.title,
        excerpt: newsForm.excerpt,
        content: newsForm.content,
        author: newsForm.author,
        category: newsForm.category,
        image: newsForm.image || 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
        tags: tagsArray
      };

      const result = await createArticle(articleData);
      
      if (result.success) {
        toast({
          title: "Article Published!",
          description: "Your news article has been published successfully and is now live on the homepage.",
        });

        // Reset form
        setNewsForm({
          title: '',
          excerpt: '',
          content: '',
          author: '',
          category: '',
          image: '',
          tags: ''
        });
        setImageFile(null);
      } else {
        throw new Error('Failed to publish article');
      }
    } catch (error) {
      console.error('Publishing error:', error);
      toast({
        title: "Publishing Failed",
        description: "There was an error publishing your article. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handlePreview = () => {
    toast({
      title: "Preview Mode",
      description: "Preview functionality would open in a new window.",
    });
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
                Secure Admin Panel
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
                onClick={() => navigate('/admin/manage')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Eye size={16} />
                Manage Articles
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

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Publish New Article</CardTitle>
            <CardDescription>Create and publish news articles that will appear on the homepage</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePublish} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Article Title *</Label>
                    <Input
                      id="title"
                      required
                      placeholder="Enter article title"
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      required
                      placeholder="Author name"
                      value={newsForm.author}
                      onChange={(e) => setNewsForm({...newsForm, author: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newsForm.category} onValueChange={(value) => setNewsForm({...newsForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="Tag1, Tag2, Tag3"
                      value={newsForm.tags}
                      onChange={(e) => setNewsForm({...newsForm, tags: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image">Featured Image</Label>
                    <div className="mt-2">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mb-2"
                        disabled={isUploadingImage}
                      />
                      {isUploadingImage && (
                        <p className="text-sm text-blue-600">Uploading image...</p>
                      )}
                      {newsForm.image && (
                        <div className="mt-2">
                          <img
                            src={newsForm.image}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-md border"
                          />
                          <p className="text-xs text-gray-500 mt-1">Image uploaded successfully</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Description/Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      required
                      placeholder="Brief description of the article"
                      rows={4}
                      value={newsForm.excerpt}
                      onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="content">Article Content *</Label>
                <Textarea
                  id="content"
                  required
                  placeholder="Write your article content here..."
                  rows={12}
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreview}
                  className="flex items-center gap-2"
                >
                  <Eye size={16} />
                  Preview
                </Button>
                <Button
                  type="submit"
                  disabled={isPublishing || isUploadingImage}
                  className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                >
                  <Upload size={16} />
                  {isPublishing ? 'Publishing...' : 'Publish Article'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <BreakingNewsManager />
        <VideoUploadForm />
      </main>
    </div>
  );
};

export default Admin;