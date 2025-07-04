
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Video, Eye } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/Client';

const VideoUploadForm = () => {
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    thumbnail: '',
    tags: ''
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const { toast } = useToast();

  const categories = [
    'News Report', 'Interview', 'Documentary', 'Sports', 'Entertainment', 
    'Politics', 'Technology', 'Culture', 'Breaking News', 'Live Coverage'
  ];

  const uploadFileToStorage = async (file: File, bucket: string, folder: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast({
          title: "File Too Large",
          description: "Video file must be less than 100MB.",
          variant: "destructive"
        });
        return;
      }

      setVideoFile(file);
      toast({
        title: "Video Selected",
        description: `Selected video: ${file.name}`,
      });
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
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
          description: "Failed to upload thumbnail. Please try again.",
          variant: "destructive"
        });
      }
      setIsUploadingThumbnail(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoForm.title || !videoForm.description || !videoForm.author || !videoForm.category || !videoFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a video file.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload video file
      const videoUrl = await uploadFileToStorage(videoFile, 'videos', 'video-files');
      
      if (!videoUrl) {
        throw new Error('Failed to upload video file');
      }

      // Convert tags string to array
      const tagsArray = videoForm.tags 
        ? videoForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const videoData = {
        title: videoForm.title,
        description: videoForm.description,
        author: videoForm.author,
        category: videoForm.category,
        video_url: videoUrl,
        thumbnail: videoForm.thumbnail || 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800',
        tags: tagsArray,
        duration: '00:00'
      };

      // Insert video data into database
      const { data, error } = await supabase
        .from('videos')
        .insert([videoData])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Video Published!",
        description: "Your video has been uploaded and published successfully.",
      });

      // Reset form
      setVideoForm({
        title: '',
        description: '',
        author: '',
        category: '',
        thumbnail: '',
        tags: ''
      });
      setVideoFile(null);
      setThumbnailFile(null);

    } catch (error) {
      console.error('Publishing error:', error);
      toast({
        title: "Publishing Failed",
        description: "There was an error publishing your video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreview = () => {
    if (videoFile) {
      const videoUrl = URL.createObjectURL(videoFile);
      window.open(videoUrl, '_blank');
    } else {
      toast({
        title: "No Video Selected",
        description: "Please select a video file to preview.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="text-red-600" size={24} />
          Upload Video Content
        </CardTitle>
        <CardDescription>Upload and publish video content that will appear on the homepage</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePublish} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="video-title">Video Title *</Label>
                <Input
                  id="video-title"
                  required
                  placeholder="Enter video title"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="video-author">Author *</Label>
                <Input
                  id="video-author"
                  required
                  placeholder="Author name"
                  value={videoForm.author}
                  onChange={(e) => setVideoForm({...videoForm, author: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="video-category">Category *</Label>
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
                <Label htmlFor="video-tags">Tags</Label>
                <Input
                  id="video-tags"
                  placeholder="Tag1, Tag2, Tag3"
                  value={videoForm.tags}
                  onChange={(e) => setVideoForm({...videoForm, tags: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="video-file">Video File *</Label>
                <Input
                  id="video-file"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="mb-2"
                  disabled={isUploading}
                />
                {videoFile && (
                  <p className="text-sm text-green-600">Selected: {videoFile.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="video-thumbnail">Thumbnail Image</Label>
                <Input
                  id="video-thumbnail"
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
                      alt="Thumbnail preview"
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="video-description">Description *</Label>
                <Textarea
                  id="video-description"
                  required
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
              onClick={handlePreview}
              className="flex items-center gap-2"
              disabled={!videoFile}
            >
              <Eye size={16} />
              Preview Video
            </Button>
            <Button
              type="submit"
              disabled={isUploading || isUploadingThumbnail}
              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
            >
              <Upload size={16} />
              {isUploading ? 'Uploading Video...' : 'Publish Video'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VideoUploadForm;