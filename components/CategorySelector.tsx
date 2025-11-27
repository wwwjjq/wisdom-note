import React from 'react';
import { Category, CATEGORY_LABELS } from '../types';

interface CategorySelectorProps {
  currentCategory: Category;
  onSelect: (category: Category) => void;
  disabled?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ currentCategory, onSelect, disabled }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 px-4">
      <div className="flex space-x-3 whitespace-nowrap">
        {Object.values(Category).map((cat) => {
          const isActive = currentCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              disabled={disabled}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-ink text-white shadow-lg scale-105' 
                  : 'bg-white text-ink-light border border-gray-200 hover:border-gray-400'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
              `}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;