import React from 'react';
import { Quote } from '../types';

interface QuoteSlideProps {
  quote: Quote;
  index: number;
}

// 定义一组“偏灰色”的暗色主题配置
// 包含背景渐变(bg)、纹理类型(pattern)、文字颜色(text)等
const THEMES = [
  // 1. Slate (Cool Grey) - 冷峻
  {
    bg: "bg-gradient-to-b from-slate-800 to-slate-900",
    text: "text-slate-100",
    subtext: "text-slate-400",
    accent: "bg-slate-600",
  },
  // 2. Zinc (Metal Grey) - 坚毅
  {
    bg: "bg-gradient-to-b from-zinc-800 to-zinc-950",
    text: "text-zinc-100",
    subtext: "text-zinc-400",
    accent: "bg-zinc-600",
  },
  // 3. Stone (Warm Grey) - 厚重
  {
    bg: "bg-gradient-to-b from-stone-800 to-stone-950",
    text: "text-stone-100",
    subtext: "text-stone-400",
    accent: "bg-stone-600",
  },
  // 4. Neutral (Pure Grey) - 中正
  {
    bg: "bg-gradient-to-b from-neutral-800 to-neutral-950",
    text: "text-neutral-100",
    subtext: "text-neutral-400",
    accent: "bg-neutral-600",
  },
  // 5. Gray (Deep Blue Grey) - 深邃
  {
    bg: "bg-gradient-to-b from-gray-800 to-gray-900",
    text: "text-gray-100",
    subtext: "text-gray-400",
    accent: "bg-gray-600",
  }
];

const QuoteSlide: React.FC<QuoteSlideProps> = ({ quote, index }) => {
  const theme = THEMES[index % THEMES.length];
  
  return (
    <div className={`w-full h-full flex-shrink-0 snap-center flex flex-col items-center justify-center p-8 relative overflow-hidden transition-colors duration-700 ${theme.bg}`}>
      
      {/* 噪点纹理层 */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center pb-20">
        {/* Quote Icon */}
        <div className={`mb-10 opacity-30 flex justify-center ${theme.text}`}>
             <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
             </svg>
        </div>

        {/* Content */}
        <h1 className={`text-2xl sm:text-3xl font-serif leading-loose tracking-wider font-bold text-center drop-shadow-lg ${theme.text}`}>
          {quote.content}
        </h1>
        
        {/* Author Divider - Right Aligned, Single Line */}
        <div className="w-full mt-12 flex justify-end">
           <div className={`text-lg font-serif tracking-widest opacity-90 ${theme.text}`}>
              <span>{quote.author}</span>
              {quote.source && (
                <>
                  <span className="mx-2 opacity-50">·</span>
                  <span className={`text-base ${theme.subtext}`}>{quote.source}</span>
                </>
              )}
           </div>
        </div>
      </div>
      
      {/* 底部高山曲线 (Mountain SVG) */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none opacity-20 text-white mix-blend-overlay">
        <svg viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Page number */}
      <div className={`absolute bottom-4 right-6 text-[10px] font-bold tracking-[0.3em] font-serif opacity-30 ${theme.text}`}>
         {index + 1}
      </div>
    </div>
  );
};

export default QuoteSlide;
