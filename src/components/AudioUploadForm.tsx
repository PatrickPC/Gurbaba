import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Music2, Eye, Link } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/Client';
import { useQueryClient } from '@tanstack/react-query';
import {
  uploadToBucket,
  readMediaDuration,
  getMediaPlatform,
  isValidHttpUrl,
  MAX_AUDIO_SIZE_MB,
  MAX_IMAGE_SIZE_MB,
  checkFileSize,
} from '../utils/mediaUpload';
import { DEFAULT_NEWS_IMAGE } from '@/constants/images';

const AudioUploadForm = () => {
  const [audioForm, setAudioForm] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    thumbnail: '',
    tags: '',
    audioUrl: ''
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState('00:00');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'link'>('link');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const categories = [
    'Podcast', 'Interview', 'News Bulletin', 'Music', 'Talk Show',
    'Documentary', 'Report', 'Culture', 'Technology', 'Sports'
  ];

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeError = checkFileSize(file, MAX_AUDIO_SIZE_MB);
    if (sizeError) {
      e.target.value = '';
      toast({ title: 'File Too Large', description: sizeError, variant: 'destructive' });
      return;
    }

    setAudioFile(file);
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setAudioPreviewUrl(URL.createObjectURL(file));
    setAudioDuration(await readMediaDuration(file));
    toast({ title: 'Audio Selected', description: `Selected audio: ${file.name}` });
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumbnail(true);
    const { url, error } = await uploadToBucket(file, 'audio-thumbnails', 'thumbnails', MAX_IMAGE_SIZE_MB);
    setIsUploadingThumbnail(false);
    e.target.value = '';

    if (!url) {
      toast({ title: 'Upload Failed', description: error, variant: 'destructive' });
      return;
    }
    setAudioForm(prev => ({ ...prev, thumbnail: url }));
    toast({ title: 'Thumbnail Uploaded', description: 'Thumbnail uploaded successfully.' });
  };

  const resetForm = () => {
    setAudioForm({ title: '', description: '', author: '', category: '', thumbnail: '', tags: '', audioUrl: '' });
    setAudioFile(null);
    setAudioDuration('00:00');
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setAudioPreviewUrl(null);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!audioForm.title || !audioForm.description || !audioForm.author || !audioForm.category) {
      toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }

    if (uploadMethod === 'file' && !audioFile) {
      toast({ title: 'Missing Audio File', description: 'Please select an audio file to upload.', variant: 'destructive' });
      return;
    }

    if (uploadMethod === 'link') {
      if (!audioForm.audioUrl) {
        toast({ title: 'Missing Audio URL', description: 'Please enter an audio URL (YouTube or Spotify).', variant: 'destructive' });
        return;
      }
      if (!isValidHttpUrl(audioForm.audioUrl)) {
        toast({ title: 'Invalid Audio URL', description: 'Please enter a valid link starting with https://', variant: 'destructive' });
        return;
      }
    }

    setIsUploading(true);

    try {
      let audioUrl = audioForm.audioUrl.trim();

      if (uploadMethod === 'file') {
        const result = await uploadToBucket(audioFile!, 'audios', 'audio-files', MAX_AUDIO_SIZE_MB);
        if (!result.url) throw new Error(result.error);
        audioUrl = result.url;
      }

      const tagsArray = audioForm.tags
        ? audioForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const { error } = await supabase.from('audios').insert([{
        title: audioForm.title.trim(),
        description: audioForm.description.trim(),
        author: audioForm.author.trim(),
        category: audioForm.category,
        audio_url: audioUrl,
        thumbnail: audioForm.thumbnail || DEFAULT_NEWS_IMAGE,
        tags: tagsArray,
        duration: audioDuration
      }]);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['audios'] });
      toast({ title: 'Audio Published!', description: 'Your audio has been uploaded and published successfully.' });
      resetForm();
    } catch (error) {
      console.error('Publishing error:', error);
      toast({
        title: 'Publishing Failed',
        description: error instanceof Error ? error.message : 'There was an error publishing your audio.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };


  const handlePreview = () => {
    if (uploadMethod === 'link' && audioForm.audioUrl) {
      // Open the external URL in new tab
      window.open(audioForm.audioUrl, '_blank');
    } else if (uploadMethod === 'file' && audioPreviewUrl && audioFile) {
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
      toast({ 
        title: 'No Audio to Preview', 
        description: uploadMethod === 'link' ? 'Please enter an audio URL to preview.' : 'Please select an audio file to preview.', 
        variant: 'destructive' 
      });
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
          {/* Upload Method Toggle */}
          <div className="mb-6">
            <Label className="text-base font-semibold">Upload Method</Label>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => setUploadMethod('link')}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  uploadMethod === 'link' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Link size={16} />
                URL Link (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod('file')}
                className={`px-4 py-2 rounded-md ${
                  uploadMethod === 'file' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                File Upload (50MB max)
              </button>
            </div>
          </div>

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
              {uploadMethod === 'link' ? (
                <div>
                  <Label htmlFor="audio-url">Audio URL *</Label>
                  <Input
                    id="audio-url"
                    type="url"
                    placeholder="https://open.spotify.com/episode/... or https://youtube.com/watch?v=..."
                    value={audioForm.audioUrl}
                    onChange={(e) => setAudioForm({ ...audioForm, audioUrl: e.target.value })}
                    className="mb-2"
                  />
                  {audioForm.audioUrl && (
                    <p className="text-sm text-green-600">
                      Platform detected: {getMediaPlatform(audioForm.audioUrl)}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Paste a Spotify episode/podcast URL or YouTube audio URL to link instead of uploading a file
                  </p>
                </div>
              ) : (
                <div>
                  <Label htmlFor="audio-file">Audio File *</Label>
                  <Input id="audio-file" type="file" accept="audio/*" onChange={handleAudioUpload} className="mb-2" disabled={isUploading} />
                  {audioFile && (
                    <p className="text-sm text-green-600">
                      Selected: {audioFile.name} ({(audioFile.size / (1024 * 1024)).toFixed(2)} MB) — length {audioDuration}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">Maximum file size: {MAX_AUDIO_SIZE_MB}MB</p>

                </div>
              )}
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
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePreview} 
              className="flex items-center gap-2" 
              disabled={uploadMethod === 'file' ? !audioFile : !audioForm.audioUrl}
            >
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