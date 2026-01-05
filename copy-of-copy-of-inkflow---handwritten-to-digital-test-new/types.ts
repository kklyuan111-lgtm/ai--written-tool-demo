
export interface DocumentContent {
  id?: string; // Unique ID for history
  lastModified?: number;
  title: string;
  subtitle: string;
  author: string;
  body: string;
  extractedFromImage?: boolean;
}

export interface TitleSuggestion {
  title: string;
  style: 'Literary' | 'Documentary' | 'Minimalist';
  subtitle: string;
}

export enum ThemeCategory {
  ESSENTIAL = 'Essential',
  ORIENTAL = 'Oriental Art',
  AVANT_GARDE = 'Avant-garde',
  SOCIAL = 'Social Media',
  GENERATIVE = 'Generative & Dynamic', // New Category
}

export enum ThemeType {
  // Essential
  MODERN_MEMO = 'modern_memo',
  CLASSIC_GRID = 'classic_grid',
  PROSE_ART = 'prose_art',
  LITERARY_ESSAY = 'literary_essay', // Replaces BAUHAUS, new Prose Art style

  // Oriental
  NEO_CHINESE_NARRATIVE = 'neo_chinese_narrative',
  INK_WASH = 'ink_wash',
  WABI_SABI = 'wabi_sabi',

  // Avant-garde
  MONET_GARDEN = 'monet_garden',
  Y2K_MILLENNIUM = 'y2k_millennium', // Replaces CYBER_NEON

  // Social
  POLAROID = 'polaroid',
  
  // New Social/Handwritten Styles
  MIDNIGHT_MOOD = 'midnight_mood',
  WARM_MEMO = 'warm_memo',
  CLEAR_GRID = 'clear_grid',
  TORN_SCRAP = 'torn_scrap',
  MINIMAL_ILLUSTRATION = 'minimal_illustration',
  MINIMAL_HEALING = 'minimal_healing', // NEW
  VINTAGE_SCRAPBOOK = 'vintage_scrapbook', // NEW
  EUROPEAN_CLASSIC = 'european_classic', // NEW: European Classical Art Letter

  // Generative (New)
  FLOATING_NOTE = 'floating_note',
  ORGANIC_STAMP = 'organic_stamp',
  LIVE_TEXTURE = 'live_texture',
  SURPRISE_ME = 'surprise_me', // The "Mixer" theme
}

export interface ProcessingState {
  isAnalyzing: boolean;
  isGenerativeTitles: boolean;
  progressMessage: string;
}

export interface ThemeConfig {
  id: ThemeType;
  category: ThemeCategory;
  name: string;
  description: string;
  previewColor: string;
}

export type AspectRatio = 'auto' | '3:4' | '9:16';
