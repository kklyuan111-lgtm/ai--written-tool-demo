
import { ThemeType, ThemeConfig, ThemeCategory } from './types';

export const THEMES: ThemeConfig[] = [
  // 1. Essential
  {
    id: ThemeType.MODERN_MEMO,
    category: ThemeCategory.ESSENTIAL,
    name: 'Minimal Memo',
    description: 'Sans-serif, clean, time-stamped.',
    previewColor: 'bg-white',
  },
  {
    id: ThemeType.CLASSIC_GRID,
    category: ThemeCategory.ESSENTIAL,
    name: 'Retro Grid',
    description: '20x20 Manuscript, fountain pen ink.',
    previewColor: 'bg-green-50',
  },
  {
    id: ThemeType.PROSE_ART,
    category: ThemeCategory.ESSENTIAL,
    name: 'Classic Serif',
    description: 'Pure white, centered, formal.',
    previewColor: 'bg-[#fdfbf7]',
  },
  {
    id: ThemeType.LITERARY_ESSAY,
    category: ThemeCategory.ESSENTIAL,
    name: 'Literary Essay',
    description: 'Cream paper, drop cap, seal.',
    previewColor: 'bg-[#f9f7f1]',
  },

  // 2. Oriental Art
  {
    id: ThemeType.NEO_CHINESE_NARRATIVE,
    category: ThemeCategory.ORIENTAL,
    name: 'Chinese Suspense',
    description: 'Vertical title, cold, cinematic storytelling.',
    previewColor: 'bg-slate-200',
  },
  {
    id: ThemeType.INK_WASH,
    category: ThemeCategory.ORIENTAL,
    name: 'Ink Wash',
    description: 'Calligraphy style, splashed ink.',
    previewColor: 'bg-gray-100',
  },
  {
    id: ThemeType.WABI_SABI,
    category: ThemeCategory.ORIENTAL,
    name: 'Wabi-sabi',
    description: 'Embossed texture, emptiness, zen.',
    previewColor: 'bg-[#e6e2d3]',
  },

  // 3. Avant-garde
  {
    id: ThemeType.MONET_GARDEN,
    category: ThemeCategory.AVANT_GARDE,
    name: 'Monet Garden',
    description: 'Impressionist, watercolor, soft.',
    previewColor: 'bg-purple-100',
  },
  {
    id: ThemeType.Y2K_MILLENNIUM,
    category: ThemeCategory.AVANT_GARDE,
    name: 'Y2K Pixel Art',
    description: 'Silver & Pink, retro cyber vibes.',
    previewColor: 'bg-gray-300',
  },

  // 4. Social Media
  {
    id: ThemeType.MINIMAL_HEALING,
    category: ThemeCategory.SOCIAL,
    name: 'Soft Healing',
    description: 'Milky white, soft pink halo, breathing lines.',
    previewColor: 'bg-[#fffbf0]',
  },
  {
    id: ThemeType.EUROPEAN_CLASSIC,
    category: ThemeCategory.SOCIAL,
    name: 'European Letter',
    description: 'Floral embossed, wax seal, symmetry.',
    previewColor: 'bg-[#f0e6d2]',
  },
  {
    id: ThemeType.VINTAGE_SCRAPBOOK,
    category: ThemeCategory.SOCIAL,
    name: 'Vintage Collage',
    description: 'Kraft paper, tape, layered textures.',
    previewColor: 'bg-[#D2C4B9]',
  },
  {
    id: ThemeType.MIDNIGHT_MOOD,
    category: ThemeCategory.SOCIAL,
    name: 'Midnight Mood',
    description: 'Pale cyan blur, airy, calm.',
    previewColor: 'bg-cyan-50',
  },
  {
    id: ThemeType.POLAROID,
    category: ThemeCategory.SOCIAL,
    name: 'Polaroid',
    description: 'Photo frame, handwritten note.',
    previewColor: 'bg-white border',
  },
  {
    id: ThemeType.WARM_MEMO,
    category: ThemeCategory.SOCIAL,
    name: 'Warm Memo',
    description: 'Warm yellow gradient, daily review.',
    previewColor: 'bg-yellow-100',
  },
  {
    id: ThemeType.CLEAR_GRID,
    category: ThemeCategory.SOCIAL,
    name: 'Clear Grid',
    description: 'Beige paper, minimalist sketch.',
    previewColor: 'bg-[#fdfbf7]',
  },
  {
    id: ThemeType.TORN_SCRAP,
    category: ThemeCategory.SOCIAL,
    name: 'Torn Scrap',
    description: 'Ripped paper, vinyl mood.',
    previewColor: 'bg-stone-300',
  },
  {
    id: ThemeType.MINIMAL_ILLUSTRATION,
    category: ThemeCategory.SOCIAL,
    name: 'Illustration',
    description: 'Center graphic, split layout, clean.',
    previewColor: 'bg-orange-50',
  },

  // 5. Generative
  {
    id: ThemeType.FLOATING_NOTE,
    category: ThemeCategory.GENERATIVE,
    name: 'Floating Note',
    description: 'Torn edges, compact, breathing space.',
    previewColor: 'bg-yellow-50',
  },
  {
    id: ThemeType.ORGANIC_STAMP,
    category: ThemeCategory.GENERATIVE,
    name: 'Organic Stamp',
    description: 'Custom seal, dynamic spacing.',
    previewColor: 'bg-red-50',
  },
  {
    id: ThemeType.LIVE_TEXTURE,
    category: ThemeCategory.GENERATIVE,
    name: 'Live Texture',
    description: 'Randomized noise and paper grain.',
    previewColor: 'bg-stone-300',
  },
];

export const MOCK_TITLES = [
  { title: 'Echoes of the Silent Morning', style: 'Literary', subtitle: 'A reflection on time and memory' },
  { title: 'Project Alpha Review', style: 'Documentary', subtitle: 'Summary of Q3 findings' },
  { title: 'Just Start.', style: 'Minimalist', subtitle: 'Observations on procrastination' },
];
