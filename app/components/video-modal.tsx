'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleWatchClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const watchButton = document.getElementById('dashboard-preview-btn');

    if (watchButton) {
      watchButton.addEventListener('click', handleWatchClick);
    }

    return () => {
      if (watchButton) {
        watchButton.removeEventListener('click', handleWatchClick);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMounted]);

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/30">
          <h3 className="text-xl font-semibold text-slate-100">
            Healthcare AI Demo
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Video Container */}
        <div className="aspect-video bg-black relative">
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
            playsInline
          >
            <source 
              src="https://s3.us-east-1.wasabisys.com/healthcare-ai/healthcare-ai-demo-05-02-25.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Duration: 1:05 • AI-Powered Healthcare Solutions
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
