import { supabase } from '@/integrations/supabase/Client';

export const MAX_AUDIO_SIZE_MB = 50;
export const MAX_IMAGE_SIZE_MB = 10;

export type UploadResult =
  | { url: string; error?: undefined }
  | { url: null; error: string };

const sanitize = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(-60);

/** Unique, safe storage path that keeps a hint of the original file name. */
export const buildStoragePath = (folder: string, file: File) => {
  const base = sanitize(file.name.replace(/\.[^.]+$/, '')) || 'file';
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
  return `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}.${ext}`;
};

export const checkFileSize = (file: File, maxMb: number): string | null =>
  file.size > maxMb * 1024 * 1024
    ? `"${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Maximum allowed is ${maxMb}MB.`
    : null;

/** Uploads a file to a public bucket and returns its public URL. */
export const uploadToBucket = async (
  file: File,
  bucket: string,
  folder: string,
  maxMb?: number
): Promise<UploadResult> => {
  if (maxMb) {
    const sizeError = checkFileSize(file, maxMb);
    if (sizeError) return { url: null, error: sizeError };
  }

  const filePath = buildStoragePath(folder, file);
  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) {
    console.error(`Upload to ${bucket} failed:`, error);
    return {
      url: null,
      error: /exceeded|too large|413/i.test(error.message)
        ? `"${file.name}" is too large for the storage limit.`
        : error.message || 'Upload failed. Please try again.',
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return { url: publicUrl };
};

export const formatDuration = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return '00:00';
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

/** Reads the real duration of a local audio/video file, in mm:ss. */
export const readMediaDuration = (file: File) =>
  new Promise<string>((resolve) => {
    const url = URL.createObjectURL(file);
    const el = document.createElement(file.type.startsWith('video') ? 'video' : 'audio');
    const done = (value: string) => {
      URL.revokeObjectURL(url);
      resolve(value);
    };
    el.preload = 'metadata';
    el.onloadedmetadata = () => done(formatDuration(el.duration));
    el.onerror = () => done('00:00');
    el.src = url;
  });

export const isSpotifyUrl = (url: string) => /(?:open\.)?spotify\.com/i.test(url);
export const isYouTubeUrl = (url: string) => /youtube\.com|youtu\.be/i.test(url);

export const getMediaPlatform = (url: string) => {
  if (isSpotifyUrl(url)) return 'Spotify';
  if (isYouTubeUrl(url)) return 'YouTube';
  return 'External Link';
};

export const isValidHttpUrl = (url: string) => {
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};