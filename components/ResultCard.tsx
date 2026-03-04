
import React, { useState } from 'react';

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  copyable?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, icon, content, copyable }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copyable) {
      navigator.clipboard.writeText(copyable);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-all flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 text-gray-400">
          <div className="p-2 bg-white/5 rounded-lg text-red-500">
            {icon}
          </div>
          <h3 className="font-semibold text-lg text-gray-200">{title}</h3>
        </div>
        {copyable && (
          <button 
            onClick={handleCopy}
            className={`text-xs px-3 py-1.5 rounded-full transition-all flex items-center space-x-1 ${
              copied ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Copied</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      <div className="text-gray-400 text-sm leading-relaxed flex-grow">
        {content}
      </div>
    </div>
  );
};

export default ResultCard;
