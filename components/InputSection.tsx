
import React from 'react';

interface InputSectionProps {
  url: string;
  setUrl: (url: string) => void;
  context: string;
  setContext: (context: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ url, setUrl, context, setContext, onSubmit, isLoading }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 shadow-2xl transition-all hover:border-red-500/30">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">YouTube Video URL</label>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-lg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Video Context (Topic, Keywords, or Goals)</label>
            <textarea
              rows={3}
              placeholder="Tell us what this video is about to get even better results..."
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all resize-none"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={isLoading || !url}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 flex items-center justify-center space-x-2 ${
              isLoading || !url 
              ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
              : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white shadow-lg shadow-red-900/20'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing Video...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                <span>Optimize My Video</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
