export interface Quote {
  content: string;
  author: string;
  source?: string;
  // We keep category internally for tracking/debug if needed, but not strictly required for UI now
  category?: string; 
}

export enum Category {
  REVOLUTIONARY = 'revolutionary',
  TAOIST = 'taoist',
  PHILOSOPHY = 'philosophy',
  HEALING = 'healing',
}

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.REVOLUTIONARY]: "红色经典",
  [Category.TAOIST]: "道家智慧",
  [Category.PHILOSOPHY]: "人生哲理",
  [Category.HEALING]: "温暖治愈",
};