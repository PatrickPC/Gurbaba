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
import { supabase } from '../integrations/supabase/client';

const AdminEditAudio = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [audioForm, setAudioForm] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    audio_url: '',
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
      fetchAudio();
    } else {
      navigate('/login');
    }
  }, [navigate, id]);

  const fetchAudio = async () => {
    try {
      const { data, error } = await supabase
        .from('audios')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setAudioForm({
        title: data.title,
        description: data.description || '',
        author: data.author,
        category: data.category,
        audio_url: data.audio_url,
        thumbnail: data.thumbnail || '',
        duration: data.duration || '',
        tags: data.tags ? data.tags.join(', ') : ''
      });
    } catch (error) {
      console.error('Error fetching audio:', error);
      toast({
        title: "Error",
        description: "Failed to load audio for editing.",
        variant: "destructive"
      });
      navigate('/admin/manage-audios');
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
    
    if (!audioForm.title || !audioForm.author || !audioForm.category || !audioForm.audio_url) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);

    try {
      const tagsArray = audioForm.tags 
        ? audioForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const { error } = await supabase
        .from('audios')
        .update({
          title: audioForm.title,
          description: audioForm.description,
          author: audioForm.author,
          category: audioForm.category,
          audio_url: audioForm.audio_url,
          thumbnail: audioForm.thumbnail,
          duration: audioForm.duration,
          tags: tagsArray,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Audio Updated!",
        description: "Your changes have been saved successfully.",
      });

      navigate('/admin/manage-audios');
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the audio. Please try again.",
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
              <h1 className="text-xl font-bold text-gray-900">Admin Panel - Edit Audio</h1>
              <p className="text-sm text-gray-500">The Gurbaba Post</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/admin/manage-audios')}
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
            <CardTitle>Edit Audio</CardTitle>
            <CardDescription>Update the audio information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Audio Title *</Label>
                    <Input
                      id="title"
                      required
                      placeholder="Enter audio title"
                      value={audioForm.title}
                      onChange={(e) => setAudioForm({...audioForm, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      required
                      placeholder="Author name"
                      value={audioForm.author}
                      onChange={(e) => setAudioForm({...audioForm, author: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={audioForm.category} onValueChange={(value) => setAudioForm({...audioForm, category: value})}>
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
                      value={audioForm.duration}
                      onChange={(e) => setAudioForm({...audioForm, duration: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="Tag1, Tag2, Tag3"
                      value={audioForm.tags}
                      onChange={(e) => setAudioForm({...audioForm, tags: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="audio_url">Audio URL *</Label>
                    <Input
                      id="audio_url"
                      required
                      placeholder="Uploaded audio URL"
                      value={audioForm.audio_url}
                      onChange={(e) => setAudioForm({...audioForm, audio_url: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <Input
                      id="thumbnail"
                      placeholder="Thumbnail URL"
                      value={audioForm.thumbnail}
                      onChange={(e) => setAudioForm({...audioForm, thumbnail: e.target.value})}
                    />
                    {audioForm.thumbnail && (
                      <div className="mt-2">
                        <img
                          src={audioForm.thumbnail}
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
                      placeholder="Brief description of the audio"
                      rows={4}
                      value={audioForm.description}
                      onChange={(e) => setAudioForm({...audioForm, description: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/manage-audios')}
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

export default AdminEditAudio;