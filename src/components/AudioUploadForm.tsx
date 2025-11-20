import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Music2, Eye } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/Client';
import { useQueryClient } from '@tanstack/react-query';

const AudioUploadForm = () => {
  const [audioForm, setAudioForm] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    thumbnail: '',
    tags: ''
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const categories = [
    'Podcast', 'Interview', 'News Bulletin', 'Music', 'Talk Show',
    'Documentary', 'Report', 'Culture', 'Technology', 'Sports'
  ];

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

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Audio file must be less than 50MB on the free plan.',
          variant: 'destructive'
        });
        return;
      }
      setAudioFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAudioPreviewUrl(previewUrl);
      toast({ title: 'Audio Selected', description: `Selected audio: ${file.name}` });
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setIsUploadingThumbnail(true);
      const uploadedUrl = await uploadFileToStorage(file, 'audio-thumbnails', 'thumbnails');
      if (uploadedUrl) {
        setAudioForm({ ...audioForm, thumbnail: uploadedUrl });
        toast({ title: 'Thumbnail Uploaded', description: 'Thumbnail uploaded successfully.' });
      } else {
        toast({ title: 'Upload Failed', description: 'Failed to upload thumbnail.', variant: 'destructive' });
      }
      setIsUploadingThumbnail(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!audioForm.title || !audioForm.description || !audioForm.author || !audioForm.category) {
      toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }

    if (!audioFile) {
      toast({ title: 'Missing Audio File', description: 'Please select an audio file to upload.', variant: 'destructive' });
      return;
    }

    setIsUploading(true);

    try {
      let audioUrl = await uploadFileToStorage(audioFile, 'audios', 'audio-files');
      if (!audioUrl) throw new Error('Failed to upload audio');

      const tagsArray = audioForm.tags
        ? audioForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const audioData = {
        title: audioForm.title,
        description: audioForm.description,
        author: audioForm.author,
        category: audioForm.category,
        audio_url: audioUrl,
        thumbnail: audioForm.thumbnail || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
        tags: tagsArray,
        duration: '00:00'
      };

      const { data, error } = await supabase
        .from('audios')
        .insert([audioData])
        .select();

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['audios'] });

      toast({ title: 'Audio Published!', description: 'Your audio has been uploaded and published successfully.' });

      setAudioForm({ title: '', description: '', author: '', category: '', thumbnail: '', tags: '' });
      setAudioFile(null);
      setThumbnailFile(null);
      if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
      setAudioPreviewUrl(null);
    } catch (error) {
      console.error('Publishing error:', error);
      toast({ title: 'Publishing Failed', description: 'There was an error publishing your audio.', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreview = () => {
    if (audioPreviewUrl && audioFile) {
      const previewWindow = window.open('', '_blank', 'width=600,height=200');
      if (previewWindow) {
        previewWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Audio Preview - ${audioForm.title || audioFile.name}</title>
              <style>
                body { margin: 0; background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; color: white; font-family: Arial, sans-serif; }
                .wrap { width: 90%; max-width: 800px; text-align: center; }
                h1 { font-size: 18px; margin-bottom: 16px; }
              </style>
            </head>
            <body>
              <div class="wrap">
                <h1>${audioForm.title || audioFile.name}</h1>
                <audio controls autoplay src="${audioPreviewUrl}">Your browser does not support the audio element.</audio>
              </div>
            </body>
          </html>
        `);
        previewWindow.document.close();
      }
    } else {
      toast({ title: 'No Audio to Preview', description: 'Please select an audio file to preview.', variant: 'destructive' });
    }
  };

  React.useEffect(() => () => { if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl); }, [audioPreviewUrl]);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music2 className="text-red-600" size={24} />
          Upload Audio Content
        </CardTitle>
        <CardDescription>Upload and publish audio content that will appear on the Audio page</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePublish} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="audio-title">Audio Title *</Label>
                <Input id="audio-title" required placeholder="Enter audio title" value={audioForm.title} onChange={(e) => setAudioForm({ ...audioForm, title: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="audio-author">Author *</Label>
                <Input id="audio-author" required placeholder="Author name" value={audioForm.author} onChange={(e) => setAudioForm({ ...audioForm, author: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="audio-category">Category *</Label>
                <Select value={audioForm.category} onValueChange={(value) => setAudioForm({ ...audioForm, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="audio-tags">Tags</Label>
                <Input id="audio-tags" placeholder="Tag1, Tag2, Tag3" value={audioForm.tags} onChange={(e) => setAudioForm({ ...audioForm, tags: e.target.value })} />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="audio-file">Audio File *</Label>
                <Input id="audio-file" type="file" accept="audio/*" onChange={handleAudioUpload} className="mb-2" disabled={isUploading} />
                {audioFile && (
                  <p className="text-sm text-green-600">Selected: {audioFile.name} ({(audioFile.size / (1024 * 1024)).toFixed(2)} MB)</p>
                )}
                <p className="text-sm text-gray-600">Maximum file size: 50MB </p>
              </div>
              <div>
                <Label htmlFor="audio-thumbnail">Thumbnail Image</Label>
                <Input id="audio-thumbnail" type="file" accept="image/*" onChange={handleThumbnailUpload} className="mb-2" disabled={isUploadingThumbnail} />
                {isUploadingThumbnail && <p className="text-sm text-blue-600">Uploading thumbnail...</p>}
                {audioForm.thumbnail && (
                  <div className="mt-2">
                    <img src={audioForm.thumbnail} alt="Thumbnail preview" className="w-full h-32 object-cover rounded-md border" />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="audio-description">Description *</Label>
                <Textarea id="audio-description" required placeholder="Brief description of the audio" rows={4} value={audioForm.description} onChange={(e) => setAudioForm({ ...audioForm, description: e.target.value })} />
              </div>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={handlePreview} className="flex items-center gap-2" disabled={!audioFile}>
              <Eye size={16} />
              Preview Audio
            </Button>
            <Button type="submit" disabled={isUploading || isUploadingThumbnail} className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
              <Upload size={16} />
              {isUploading ? 'Uploading Audio...' : 'Publish Audio'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AudioUploadForm;