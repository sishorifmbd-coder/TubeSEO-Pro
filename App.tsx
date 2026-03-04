
import React, { useState } from 'react';
import { SEOResult, LoadingStatus } from './types';
import { optimizeYouTubeVideo } from './services/geminiService';
import InputSection from './components/InputSection';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [context, setContext] = useState('');
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
  const [result, setResult] = useState<SEOResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!url) return;
    
    setError(null);
    setStatus(LoadingStatus.ANALYZING);
    
    try {
      const data = await optimizeYouTubeVideo(url, context);
      setResult(data);
      setStatus(LoadingStatus.COMPLETED);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setStatus(LoadingStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-red-600 p-2 rounded-lg shadow-lg shadow-red-600/20">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white italic">TubeSEO<span className="text-red-600">PRO</span></h1>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Unleash the power of AI to rank your videos higher. Get high-converting titles, descriptions, and tags in seconds.
        </p>
      </div>

      {/* Main Content */}
      <InputSection 
        url={url} 
        setUrl={setUrl} 
        context={context} 
        setContext={setContext} 
        onSubmit={handleOptimize} 
        isLoading={status === LoadingStatus.ANALYZING}
      />

      {error && (
        <div className="mt-8 bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl max-w-4xl w-full flex items-center space-x-3">
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <p>{error}</p>
        </div>
      )}

      {/* Results Section */}
      {result && status === LoadingStatus.COMPLETED && (
        <div className="mt-16 w-full space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <span className="w-2 h-8 bg-red-600 rounded-full"></span>
              <span>Optimization Report</span>
            </h2>
            <button 
              onClick={() => {
                setResult(null);
                setStatus(LoadingStatus.IDLE);
              }}
              className="text-gray-500 hover:text-white transition-colors flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              <span>Start Over</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Titles */}
            <ResultCard 
              title="Optimized Titles"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>}
              copyable={result.titles.join('\n')}
              content={
                <ul className="space-y-3">
                  {result.titles.map((title, i) => (
                    <li key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 group hover:border-red-500/20 transition-all">
                      <span className="text-red-500 text-xs font-bold mr-2 uppercase tracking-tighter">Title {i+1}</span>
                      <p className="text-gray-200">{title}</p>
                    </li>
                  ))}
                </ul>
              }
            />

            {/* Tags & Keywords */}
            <ResultCard 
              title="Tags & Keywords"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>}
              copyable={result.tags.join(', ')}
              content={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, i) => (
                      <span key={i} className="bg-white/5 px-2 py-1 rounded border border-white/5 text-xs hover:bg-white/10">{tag}</span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Suggested Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {result.suggestedKeywords.map((kw, i) => (
                        <span key={i} className="text-xs text-gray-300">#{kw.replace(/\s+/g, '')}</span>
                      ))}
                    </div>
                  </div>
                </div>
              }
            />

            {/* Thumbnail Concept */}
            <ResultCard 
              title="Thumbnail Strategy"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
              content={
                <div className="space-y-4">
                  <p className="text-gray-300 italic">"{result.thumbnailConcept}"</p>
                  <div className="p-3 bg-white/5 rounded-lg border-l-2 border-red-500">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Target Audience</p>
                    <p className="text-sm text-gray-300">{result.targetAudience}</p>
                  </div>
                </div>
              }
            />

            {/* Description */}
            <div className="lg:col-span-2">
              <ResultCard 
                title="Optimized SEO Description"
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>}
                copyable={result.description}
                content={
                  <div className="space-y-4">
                    <div className="max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-red-500/40">
                      <p className="whitespace-pre-wrap text-gray-200 leading-relaxed text-base">{result.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                      {result.hashtags.map((ht, i) => (
                        <span key={i} className="text-red-500 font-semibold bg-red-500/10 px-2 py-1 rounded text-sm transition-colors hover:bg-red-500/20">#{ht}</span>
                      ))}
                    </div>
                  </div>
                }
              />
            </div>

            {/* Chapters */}
            <ResultCard 
              title="Video Chapters"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
              copyable={result.chapters.map(c => `${c.timestamp} ${c.title}`).join('\n')}
              content={
                <ul className="space-y-2">
                  {result.chapters.map((chapter, i) => (
                    <li key={i} className="flex items-center space-x-3 group bg-white/5 p-2 rounded-lg border border-transparent hover:border-red-500/20 transition-all">
                      <span className="text-red-500 font-mono text-sm font-bold min-w-[50px]">{chapter.timestamp}</span>
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{chapter.title}</span>
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-white/5 w-full text-center text-gray-600 text-sm">
        <p>© 2024 TubeSEO Pro - Advanced Video Intelligence Engine</p>
      </footer>

      {/* Styles for animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        /* Custom scrollbar for description */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-track-white\/5::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .hover\:scrollbar-thumb-red-500\/40:hover::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.4);
        }
      `}</style>
    </div>
  );
};

export default App;
