import React from 'react';

interface ActionButtonsProps {
  onNext: () => void;
  onCopy: () => void;
  loading: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onNext, onCopy, loading }) => {
  return (
    <div className="w-full px-6 pb-8 pt-4 bg-gradient-to-t from-paper to-transparent">
      <div className="flex items-center justify-between max-w-md mx-auto space-x-4">
        
        <button
          onClick={onCopy}
          className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm text-gray-600 active:scale-95 transition-all hover:bg-gray-50"
          title="复制"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
          </svg>
          <span className="text-[10px] mt-1 font-medium">复制</span>
        </button>

        <button
          onClick={onNext}
          disabled={loading}
          className={`
            flex-1 h-14 rounded-2xl bg-ink text-white font-serif text-lg tracking-widest shadow-lg flex items-center justify-center
            active:scale-95 transition-all
            ${loading ? 'opacity-80 cursor-wait' : 'hover:bg-gray-800'}
          `}
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
            </span>
          ) : (
            "下一个"
          )}
        </button>

      </div>
    </div>
  );
};

export default ActionButtons;