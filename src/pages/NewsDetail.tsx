import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, Facebook, Twitter, Mail, Bookmark, Eye, Link2, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RadioPlayer from '@/components/RadioPlayer';
import { mockNews } from '../data/mockNews';
import { useNews } from '../contexts/NewsContext';
import { getPublishedDate, getReadTime, getImages } from '../utils/newsHelpers';
import { DEFAULT_NEWS_IMAGE } from '@/constants/images';


const NewsDetail = () => {
  const { id } = useParams();
  const { getArticleById, articles, loading, incrementArticleViews } = useNews();
  const viewCountedRef = useRef<string | null>(null);
  const [copied, setCopied] = useState(false);

  
  // Try to get article from database first, fallback to mock data

  const databaseArticle = getArticleById(id || '');
  const mockArticle = mockNews.find(news => news.id === id);
  const article = databaseArticle || mockArticle;
  
  // Get related news from the same category
  const allNews = articles.length > 0 ? articles : mockNews;
  const relatedNews = allNews.filter(news => 
    news.id !== id && news.category === article?.category
  ).slice(0, 6);


  // Increment view count only once per article visit
  useEffect(() => {
    if (id && databaseArticle && viewCountedRef.current !== id) {
      viewCountedRef.current = id;
      incrementArticleViews(id);
    }
    }, [id, databaseArticle, incrementArticleViews]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
          <Link to="/" className="text-red-600 hover:underline mt-4 inline-block">
            Return to homepage
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const publishedDate = getPublishedDate(article);
  const readTime = getReadTime(article);

   const shareUrl = typeof window !== 'undefined'

    ? `${window.location.origin}/news/${article.id}`
    : `/news/${article.id}`;
  const shareText = `${article.title} | FM News Portal`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank', 'width=600,height=400');
  };

  const shareToEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${article.excerpt}\n\n${shareUrl}`)}`;
  };

  // Build the right player for an attached audio: YouTube embed, Spotify embed, or a plain audio player
  const audioUrl = databaseArticle?.audio_url;
  const getYouTubeEmbed = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };
  const getSpotifyEmbed = (url: string): string | null => {
    const match = url.match(/open\.spotify\.com\/(episode|track|show|playlist|album)\/([\w]+)/);
    return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : null;
  };
  const youtubeEmbed = audioUrl ? getYouTubeEmbed(audioUrl) : null;
  const spotifyEmbed = audioUrl ? getSpotifyEmbed(audioUrl) : null;

  return (

    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Homepage
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
            {/* Article Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="mb-4">
                <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded">
                  {article.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {article.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Published: {publishedDate}</span>
                  </div>
                  {readTime && (
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{readTime}</span>
                    </div>
                  )}
                  {databaseArticle && (
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>{databaseArticle.views.toLocaleString()} views</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">

                  <button
                    onClick={handleCopyLink}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label={copied ? 'Link copied' : 'Copy link'}
                    title={copied ? 'Link copied' : 'Copy link'}
                  >
                    {copied ? <Check size={16} className="text-green-600" /> : <Link2 size={16} />}
                  </button>

                  <button
                    onClick={handleNativeShare}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Share article"
                    title="Share article"
                  >
                    <Share2 size={16} />
                  </button>

                </div>

              </div>

            </div>

            {/* Article Content with Interspersed Images */}
            <div className="p-6">
              <div className="prose max-w-none">
             {(() => {
                  const paragraphs = article.content.split('\n\n');
                  const images = getImages(article);
                  const content = [];
                  
                  paragraphs.forEach((paragraph, pIndex) => {
                    // Add image before paragraph if available
                    if (pIndex < images.length) {
                      content.push(
                        <div key={`image-${pIndex}`} className="relative my-6">
                          <img
                            src={images[pIndex]}
                            alt={`${article.title} - Image ${pIndex + 1}`}
                            className="w-full h-64 md:h-96 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-sm rounded">
                            Image {pIndex + 1} of {images.length}
                          </div>
                        </div>
                      );
                    }
                    
                    // Add paragraph
                    content.push(
                      <p key={`para-${pIndex}`} className="mb-4 text-gray-800 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  });
                  
                  // Add remaining images if there are more images than paragraphs
                  for (let i = paragraphs.length; i < images.length; i++) {
                    content.push(
                      <div key={`image-${i}`} className="relative my-6">
                        <img
                          src={images[i]}
                          alt={`${article.title} - Image ${i + 1}`}
                          className="w-full h-64 md:h-96 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-sm rounded">
                          Image {i + 1} of {images.length}
                        </div>
                      </div>
                    );
                  }
                  
                  return content;
                })()}
              </div>

                  {/* Attached Audio (only shown on the detail page when present) */}
              {audioUrl && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Listen to this article</h3>
                  {youtubeEmbed ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={youtubeEmbed}
                        title={`${article.title} - audio`}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : spotifyEmbed ? (
                    <iframe
                      src={spotifyEmbed}
                      title={`${article.title} - audio`}
                      className="w-full rounded-lg"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  ) : (
                    <audio controls className="w-full" src={audioUrl}>
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              )}
              
              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {(article.tags || []).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Sharing */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={shareToFacebook}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={16} />
                    Share
                  </button>
                  <button
                    onClick={shareToTwitter}
                    className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={16} />
                    Tweet
                  </button>
                   <button
                    onClick={shareToEmail}
                    className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    aria-label="Share via Email"
                  >
                    <Mail size={16} />
                    Email
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    aria-label="Copy article link"
                  >
                    {copied ? <Check size={16} /> : <Link2 size={16} />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2">
                EDITOR'S PICKS
              </h2>
              
              <div className="space-y-6">
                {relatedNews.slice(0, 4).map((news) => (
                  <Link key={news.id} to={`/news/${news.id}`} className="block group">
                    <div className="flex gap-3">
                      <img
                        src={getImages(news)[0] || DEFAULT_NEWS_IMAGE}
                        alt={news.title}
                        className="w-20 h-16 object-cover rounded group-hover:opacity-80 transition-opacity"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                          {news.title}
                        </h3>
                        <div className="text-xs text-gray-500">
                          {getPublishedDate(news)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related News Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-red-600 mb-8 border-b-2 border-red-600 pb-2 inline-block">
            RELATED NEWS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedNews.map((news) => (
              <Link key={news.id} to={`/news/${news.id}`} className="block group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={getImages(news)[0] || DEFAULT_NEWS_IMAGE}
                    alt={news.title}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{getPublishedDate(news)}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {news.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <RadioPlayer/>
    </div>
  );
};

export default NewsDetail;