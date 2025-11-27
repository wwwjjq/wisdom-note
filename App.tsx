import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Quote } from './types';
import { fetchMixedQuotes } from './services/geminiService';
import QuoteSlide from './components/QuoteDisplay';

const App: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const fetchingRef = useRef<boolean>(false);

  // Helper to get today's date string for storage key
  const getTodayKey = () => {
    const now = new Date();
    return `daily-quotes-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  };

  const loadQuotes = useCallback(async (isRefresh = false) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    
    // Only show full screen loading on first load or refresh
    if (isRefresh) {
      setLoading(true);
    }

    try {
      const newQuotes = await fetchMixedQuotes();
      
      setQuotes(prev => {
        const updated = isRefresh ? newQuotes : [...prev, ...newQuotes];
        // Cache the updated list for today
        try {
          localStorage.setItem(getTodayKey(), JSON.stringify(updated));
        } catch (e) {
          console.warn("Storage full or unavailable");
        }
        return updated;
      });
    } catch (e) {
      console.error(e);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Initial load logic
  useEffect(() => {
    const key = getTodayKey();
    const stored = localStorage.getItem(key);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuotes(parsed);
          setLoading(false);
        } else {
          loadQuotes(true);
        }
      } catch (e) {
        loadQuotes(true);
      }
    } else {
      // Clear old keys to save space (optional cleanup)
      for(let i=0; i<localStorage.length; i++) {
        const k = localStorage.key(i);
        if(k && k.startsWith('daily-quotes-') && k !== key) {
          localStorage.removeItem(k);
        }
      }
      loadQuotes(true);
    }
  }, [loadQuotes]);

  // Handle infinite scroll
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    // If we are close to the end (within 1.5 screens width), load more
    if (scrollWidth - (scrollLeft + clientWidth) < clientWidth * 1.5) {
      loadQuotes(false);
    }
  };

  const handleRefresh = () => {
    // Scroll back to start
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
    loadQuotes(true);
  };

  return (
    <div className="relative h-screen w-full bg-slate-900 overflow-hidden font-sans">
      
      {/* Header / Brand */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-start pointer-events-none">
        {/* Logo - Updated for better visibility on color backgrounds */}
        <div className="mix-blend-overlay opacity-80">
           <div className="w-10 h-10 border-2 border-white/50 rounded-lg flex items-center justify-center">
              <span className="font-serif font-bold text-white text-xl">智</span>
           </div>
        </div>
        
        {/* Refresh Button */}
        <button 
          onClick={handleRefresh}
          className="pointer-events-auto p-2 bg-white/20 backdrop-blur-md rounded-full shadow-sm text-white hover:bg-white/30 active:scale-95 transition-all border border-white/30"
          title="刷新语录"
          disabled={loading && quotes.length === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>

      {/* Loading Indicator (Initial) */}
      {loading && quotes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#fdfbf7]">
           <div className="flex flex-col items-center space-y-4">
             <div className="w-10 h-10 border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin"></div>
             <p className="text-gray-400 font-serif text-xs tracking-widest">每日语录更新中...</p>
           </div>
        </div>
      )}

      {/* Swipe Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {quotes.map((quote, index) => (
          <QuoteSlide key={`${index}-${quote.author}`} quote={quote} index={index} />
        ))}
        
        {/* Loading placeholder at the end of the list */}
        {quotes.length > 0 && (
          <div className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center bg-transparent">
             <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none opacity-40 z-10 mix-blend-overlay">
        <p className="text-[10px] text-white tracking-widest font-serif">左右滑动阅览 · 智语</p>
      </div>

    </div>
  );
};

export default App;