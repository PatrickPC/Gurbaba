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

const AdminEditVideo = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    video_url: '',
    thumbnail: '',
    duration: '',
    tags: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    'Politics', 'Sports', 'Money', 'Science & Technology', 'World', 
    'Features', 'Columns', 'Editorial', 'Interviews', 'Opinion'
  ];

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchVideo();
    } else {
      navigate('/login');
    }
  }, [navigate, id]);

  const uploadFileToStorage = async (file: File, bucket: string, folder: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingThumbnail(true);
      
      const uploadedUrl = await uploadFileToStorage(file, 'video-thumbnails', 'thumbnails');
      if (uploadedUrl) {
        setVideoForm({...videoForm, thumbnail: uploadedUrl});
        toast({
          title: "Thumbnail Uploaded",
          description: "Thumbnail has been uploaded successfully.",
        });
      } else {
        toast({
          title: "Upload Failed",
          description: "Failed to upload thumbnail.",
          variant: "destructive"
        });
      }
      setIsUploadingThumbnail(false);
    }
  };

  const fetchVideo = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setVideoForm({
        title: data.title,
        description: data.description || '',
        author: data.author,
        category: data.category,
        video_url: data.video_url,
        thumbnail: data.thumbnail || '',
        duration: data.duration || '',
        tags: data.tags ? data.tags.join(', ') : ''
      });
    } catch (error) {
      console.error('Error fetching video:', error);
      toast({
        title: "Error",
        description: "Failed to load video for editing.",
        variant: "destructive"
      });
      navigate('/admin/manage-videos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminAuthExpiry');
    localStorage.removeItem('adminLoginTime');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoForm.title || !videoForm.author || !videoForm.category || !videoForm.video_url) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);

    try {
      const tagsArray = videoForm.tags 
        ? videoForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const { error } = await supabase
        .from('videos')
        .update({
          title: videoForm.title,
          description: videoForm.description,
          author: videoForm.author,
          category: videoForm.category,
          video_url: videoForm.video_url,
          thumbnail: videoForm.thumbnail,
          duration: videoForm.duration,
          tags: tagsArray,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Video Updated!",
        description: "Your changes have been saved successfully.",
      });

      navigate('/admin/manage-videos');
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the video. Please try again.",
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
              <h1 className="text-xl font-bold text-gray-900">Admin Panel - Edit Video</h1>
              <p className="text-sm text-gray-500">The Gurbaba Post</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/admin/manage-videos')}
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
            <CardTitle>Edit Video</CardTitle>
            <CardDescription>Update the video information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Video Title *</Label>
                    <Input
                      id="title"
                      required
                      placeholder="Enter video title"
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      required
                      placeholder="Author name"
                      value={videoForm.author}
                      onChange={(e) => setVideoForm({...videoForm, author: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={videoForm.category} onValueChange={(value) => setVideoForm({...videoForm, category: value})}>
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
                    <Label htmlFor="duration">Duration (e.g., 5:23)</Label>
                    <Input
                      id="duration"
                      placeholder="5:23"
                      value={videoForm.duration}
                      onChange={(e) => setVideoForm({...videoForm, duration: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="Tag1, Tag2, Tag3"
                      value={videoForm.tags}
                      onChange={(e) => setVideoForm({...videoForm, tags: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="video_url">Video URL *</Label>
                    <Input
                      id="video_url"
                      required
                      placeholder="YouTube URL or uploaded video URL"
                      value={videoForm.video_url}
                      onChange={(e) => setVideoForm({...videoForm, video_url: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="thumbnail">Thumbnail Image</Label>
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="mb-2"
                      disabled={isUploadingThumbnail}
                    />
                    {isUploadingThumbnail && (
                      <p className="text-sm text-blue-600">Uploading thumbnail...</p>
                    )}
                    {videoForm.thumbnail && (
                      <div className="mt-2">
                        <img
                          src={videoForm.thumbnail}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-md border"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the video"
                      rows={4}
                      value={videoForm.description}
                      onChange={(e) => setVideoForm({...videoForm, description: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/manage-videos')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving || isUploadingThumbnail}
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

export default AdminEditVideo;