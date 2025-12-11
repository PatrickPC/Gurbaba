
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { LogOut, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/Client';

const AdminEdit = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    images: [] as string[],
    tags: ''
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    'Local', 'National', 'Agriculture', 'Culture and Lifestyle', 'Foreign', 'Sports'
  ];

  const uploadImageToStorage = async (file: File): Promise<string | null> => {
    try {
      setIsUploadingImage(true);
      
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
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setImageFiles(prev => [...prev, ...fileArray]);
      
      const uploadPromises = fileArray.map(file => uploadImageToStorage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      const successfulUrls = uploadedUrls.filter(url => url !== null) as string[];
      
      if (successfulUrls.length > 0) {
        setNewsForm(prev => ({
          ...prev, 
          images: [...prev.images, ...successfulUrls]
        }));
        toast({
          title: "Images Uploaded",
          description: `${successfulUrls.length} image(s) uploaded successfully.`,
        });
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewsForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchArticle();
    } else {
      navigate('/login');
    }
  }, [navigate, id]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setNewsForm({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        category: data.category,
        images: data.images || [],
        tags: data.tags ? data.tags.join(', ') : ''
      });
    } catch (error) {
      console.error('Error fetching article:', error);
      toast({
        title: "Error",
        description: "Failed to load article for editing.",
        variant: "destructive"
      });
      navigate('/admin/manage');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsForm.title || !newsForm.excerpt || !newsForm.content || !newsForm.author || !newsForm.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);

    try {
      const tagsArray = newsForm.tags 
        ? newsForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const { error } = await supabase
        .from('news_articles')
        .update({
          title: newsForm.title,
          excerpt: newsForm.excerpt,
          content: newsForm.content,
          author: newsForm.author,
          category: newsForm.category,
          images: newsForm.images.length > 0 ? newsForm.images : ['https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800'],
          tags: tagsArray,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Article Updated!",
        description: "Your changes have been saved successfully.",
      });

      navigate('/admin/manage');
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the article. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel - Edit Article</h1>
              <p className="text-sm text-gray-500">The Kathmandu Post</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/admin/manage')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Manage
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Article</CardTitle>
            <CardDescription>Update the article information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
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
                    <Label htmlFor="images">Article Images (Multiple)</Label>
                    <div className="mt-2">
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="mb-2"
                        disabled={isUploadingImage}
                      />
                      {isUploadingImage && (
                        <p className="text-sm text-blue-600">Uploading images...</p>
                      )}
                      {newsForm.images.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {newsForm.images.map((imageUrl, index) => (
                            <div key={index} className="relative">
                              <img
                                src={imageUrl}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md border"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                              >
                                ×
                              </button>
                            </div>
                          ))}
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
                  onClick={() => navigate('/admin/manage')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminEdit;