
import React, { useMemo } from 'react';
import { DocumentContent, ThemeType, AspectRatio } from '../types';

interface PreviewProps {
  content: DocumentContent;
  theme: ThemeType;
  aspectRatio?: AspectRatio;
  seed: number; // Random seed for consistent generative effects
}

// Simple seeded PRNG (Linear Congruential Generator)
const LCG = (seed: number) => {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
};

const PreviewRenderer: React.FC<PreviewProps> = ({ content, theme, aspectRatio = '3:4', seed }) => {
  const { title, subtitle, author, body } = content;
  const paragraphs = body.split('\n').filter(p => p.trim() !== '');
  const charCount = body.length;

  // Initialize Random Generator for this render
  const rng = useMemo(() => LCG(seed), [seed]);
  const random = (min: number, max: number) => min + rng() * (max - min);
  const randomInt = (min: number, max: number) => Math.floor(random(min, max));
  const randomChoice = <T,>(arr: T[]): T => arr[Math.floor(random(0, arr.length))];

  // --- Dynamic Layout Logic ---
  
  // Content Density Classification
  const isShortContent = charCount < 150;

  // Adaptive Canvas Logic - NOW FORCED TO 3:4
  const getAdaptiveStyles = (themeId: ThemeType) => {
    let styles = "w-full shadow-sm relative overflow-hidden transition-all duration-300 ease-in-out bg-white ";
    
    // FORCE 3:4 Aspect Ratio
    styles += "aspect-[3/4] h-auto flex flex-col ";

    // Center content for short text in most themes, unless overridden
    if (isShortContent) {
       // styles += "justify-center "; 
    }
    return styles;
  };

  const containerClass = getAdaptiveStyles(theme);

  // Helper for Layout Jitter (random slight movements)
  const getJitterStyle = (intensity = 5) => ({
    transform: `translate(${random(-intensity, intensity)}px, ${random(-intensity, intensity)}px) rotate(${random(-1, 1)}deg)`
  });

  // Text Jitter for Handwriting Styles (X-axis offset)
  const getTextJitter = () => ({
      transform: `translateX(${random(-2, 2)}px)`
  });

  // --- Helper Components ---

  // Random Minimalist Icon for Clear Grid
  const MinimalistIcon = () => {
      const type = randomChoice(['cat', 'coffee', 'pen', 'cloud']);
      const stroke = "#2c2c2c";
      
      if (type === 'cat') {
          return <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21S3 17.9 3 13.44C3 12.24 3.43 11.07 4 10c0 0-1.82-6.42-.42-7 1.39-.58 4.64.26 6.42 2.26.65-.17 1.33-.26 2-.26z"/></svg>;
      }
      if (type === 'coffee') {
        return <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>;
      }
      if (type === 'pen') {
          return <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
      }
      return <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>; // Cloud
  };

  // Vinyl Component for Torn Scrap
  const VinylComponent = () => (
      <div className="w-24 h-24 rounded-full bg-black relative flex items-center justify-center animate-[spin_10s_linear_infinite]" style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
          {/* Grooves */}
          <div className="absolute inset-2 border border-gray-800 rounded-full"></div>
          <div className="absolute inset-4 border border-gray-800 rounded-full"></div>
          <div className="absolute inset-6 border border-gray-800 rounded-full"></div>
          {/* Label */}
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
      </div>
  );

  // Helper: Generative Stamp
  const GenerativeStamp = ({ name }: { name: string }) => {
    if (!name) return null;
    const shape = randomChoice(['rounded-sm', 'rounded-full', 'rounded-none']);
    const stampFont = '"Ma Shan Zheng", cursive';
    const stampText = name.substring(0, 2);
    
    return (
      <div 
        className={`w-12 h-12 border-4 border-red-800 text-red-800 flex items-center justify-center text-lg font-bold ${shape} opacity-80 mix-blend-multiply`}
        style={{ 
            fontFamily: stampFont,
            transform: `rotate(${random(-15, 15)}deg)`,
            maskImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)',
        }}
      >
        <div className="border border-red-800/50 w-[90%] h-[90%] flex items-center justify-center">
            {stampText}
        </div>
      </div>
    );
  };

  // --- NEW THEME IMPLEMENTATIONS ---

  // NEW 1: MINIMALIST HEALING (极简治愈弥散风) - REDESIGNED 2.0
  if (theme === ThemeType.MINIMAL_HEALING) {
    return (
      <div className={`${containerClass} bg-[#FDFCF8] relative overflow-hidden flex flex-col items-center justify-center`}>
         {/* 1. Core Visual: Diffused Gradient Halo (Pale Pink/Purple) - Centered & Focal Point */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] rounded-full pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle, rgba(243,232,255, 0.7) 0%, rgba(252,231,243, 0.4) 50%, transparent 70%)', // Pale purple to pale pink
                filter: 'blur(70px)',
              }}>
         </div>

         {/* 3. Decorative Curves (Dynamic Waves) - Subtle, guiding, not interfering */}
         <div className="absolute inset-0 pointer-events-none opacity-20 text-slate-300 z-0">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M-10 10 Q 30 40 60 10 T 120 30" fill="none" stroke="currentColor" strokeWidth="0.3" />
                 <path d="M-10 90 Q 70 60 110 90" fill="none" stroke="currentColor" strokeWidth="0.3" />
             </svg>
         </div>

         {/* Content Layer - Forced Vertical Center, Extreme Padding */}
         <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-16 md:p-24">
             <header className="mb-10 text-center">
                 {subtitle && (
                   <div className="text-[10px] text-slate-400 tracking-[0.4em] uppercase mb-4 font-sans">
                      {subtitle}
                   </div>
                 )}
                 <h1 className="text-3xl font-light text-slate-700 tracking-wide" style={{ fontFamily: '"Lora", serif' }}>
                    {title || 'Breathe'}
                 </h1>
             </header>

             <article className="text-base md:text-lg leading-loose text-slate-600 font-light tracking-wide text-center max-w-sm" style={{ fontFamily: '"Inter", sans-serif' }}>
                 {paragraphs.map((p, i) => (
                    <p key={i} className="mb-6">{p}</p>
                 ))}
             </article>

             {/* Author - Minimal */}
             <div className="mt-10">
                 <div className="w-6 h-px bg-slate-200 mx-auto mb-3"></div>
                 <p className="text-[10px] text-slate-300 font-serif italic tracking-widest">{author}</p>
             </div>
         </div>
      </div>
    );
  }

  // NEW 2: VINTAGE SCRAPBOOK (复古手作拼贴风)
  if (theme === ThemeType.VINTAGE_SCRAPBOOK) {
     return (
       <div className={`${containerClass} relative flex items-center justify-center overflow-hidden`}
            style={{ backgroundColor: 'rgb(210, 196, 185)' }}
       >
           {/* Background Texture (Kraft Paper noise) */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`
           }}></div>

           {/* Decor: Old Newspaper Fragment (Back Layer) */}
           <div className="absolute top-20 right-[-40px] w-48 h-64 bg-[#f0e6d2] rotate-12 shadow-md p-4 text-[6px] text-justify text-slate-500 font-serif leading-tight opacity-80 overflow-hidden border border-slate-300">
               <h3 className="font-bold text-lg mb-2 text-black">DAILY NEWS</h3>
               {Array(30).fill("lorem ipsum dolor sit amet vintage news print texture text filler ").join(" ")}
           </div>

           {/* Decor: Green Cutting Mat Grid (Optional, subtle bottom layer) */}
           <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-green-800/20 rotate-45 z-0" 
                style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
           </div>

           {/* Main Paper Note */}
           <div className="relative z-10 bg-[#fdfdfd] w-[85%] max-w-lg p-8 md:p-12 shadow-[5px_10px_15px_rgba(0,0,0,0.2)]"
                style={{ 
                  transform: `rotate(${random(-2, 1)}deg)`,
                  // Jagged bottom edge via clip-path
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 96% 98%, 94% 100%, 92% 98%, 90% 100%, 88% 98%, 86% 100%, 84% 98%, 82% 100%, 80% 98%, 78% 100%, 76% 98%, 74% 100%, 72% 98%, 70% 100%, 68% 98%, 66% 100%, 64% 98%, 62% 100%, 60% 98%, 58% 100%, 56% 98%, 54% 100%, 52% 98%, 50% 100%, 48% 98%, 46% 100%, 44% 98%, 42% 100%, 40% 98%, 38% 100%, 36% 98%, 34% 100%, 32% 98%, 30% 100%, 28% 98%, 26% 100%, 24% 98%, 22% 100%, 20% 98%, 18% 100%, 16% 98%, 14% 100%, 12% 98%, 10% 100%, 8% 98%, 6% 100%, 4% 98%, 2% 100%, 0% 98%)',
                  // Lined paper pattern
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e5e5 32px)'
                }}
           >
               {/* Tape Element */}
               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-orange-300/60 backdrop-blur-sm rotate-[-2deg] shadow-sm"></div>

               <div className="pt-4">
                  <header className="mb-6 text-center border-b-2 border-black pb-4">
                      <h1 className="text-2xl font-bold font-mono uppercase tracking-widest text-slate-800 bg-black text-white inline-block px-2 py-1 transform -rotate-1">
                          {title || 'JOURNAL'}
                      </h1>
                  </header>

                  <article className="text-lg leading-[32px] font-handwriting text-slate-800" style={{ fontFamily: '"Indie Flower", cursive' }}>
                      {paragraphs.map((p, i) => (
                         <p key={i} className="mb-0">{p}</p>
                      ))}
                  </article>

                  {/* Author - Fixed 2 line heights below content */}
                  <div className="mt-8 flex justify-end">
                      <div className="bg-slate-100 border border-slate-300 p-2 shadow-sm transform rotate-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Archive No. {randomInt(100, 999)}</p>
                          <p className="font-serif text-sm italic text-slate-700">{author}</p>
                      </div>
                  </div>
               </div>
           </div>

           {/* Decor: Paperclip (CSS) */}
           <div className="absolute top-[15%] left-[5%] w-4 h-12 border-2 border-gray-400 rounded-full z-20 transform -rotate-12"></div>
       </div>
     );
  }

  // NEW 3: EUROPEAN CLASSICAL ART LETTER (欧式古典艺术信函风) - No Date
  if (theme === ThemeType.EUROPEAN_CLASSIC) {
    return (
      <div className={`${containerClass} bg-[#f0e6d2] relative flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden`}>
         {/* Background Texture: Floral Embossed Wallpaper */}
         <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ 
            backgroundImage: `url("https://www.transparenttextures.com/patterns/floral-linen.png")`,
            backgroundSize: '200px 200px'
         }}></div>

         {/* Content Box */}
         <div className="relative z-10 w-full max-w-2xl bg-white/60 backdrop-blur-[2px] shadow-sm border border-[#d4c5b0] p-12 md:p-16 flex flex-col items-center text-center">
             
             {/* Header Section */}
             <div className="mb-10 w-full flex flex-col items-center">
                 {/* Top Guide */}
                 <div className="text-[10px] tracking-[0.4em] uppercase text-slate-500 mb-6 font-serif">
                     {subtitle || 'The Archive Collection'}
                 </div>

                 {/* Divider Top */}
                 <div className="w-full max-w-[120px] h-px bg-slate-400 mb-2"></div>
                 <div className="w-full max-w-[80px] h-px bg-slate-300 mb-6"></div>

                 {/* Main Title */}
                 <h1 className="text-4xl md:text-5xl text-slate-800 font-normal mb-4 relative inline-block px-8" style={{ fontFamily: '"Playfair Display", serif' }}>
                     <span className="absolute top-0 left-0 text-slate-300 text-4xl transform -translate-x-2 -translate-y-2">“</span>
                     {title || 'Untitled'}
                     <span className="absolute bottom-0 right-0 text-slate-300 text-4xl transform translate-x-2 translate-y-4">”</span>
                 </h1>

                 {/* Handwriting Embellishment */}
                 <div className="text-xl text-[#8b4513] opacity-60 my-2 transform -rotate-3" style={{ fontFamily: '"Great Vibes", cursive' }}>
                     ~ {author || 'Original'} ~
                 </div>

                 {/* Divider Bottom */}
                 <div className="w-full max-w-[80px] h-px bg-slate-300 mt-6 mb-2"></div>
                 <div className="w-full max-w-[120px] h-px bg-slate-400 mb-8"></div>
             </div>

             {/* Body Section */}
             <article className="w-full text-justify text-slate-800 text-lg leading-relaxed font-serif px-8" style={{ fontFamily: '"Lora", serif' }}>
                 {paragraphs.map((p, i) => (
                     <p key={i} className="mb-6 first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-bold first-letter:text-slate-900">
                         {p}
                     </p>
                 ))}
             </article>

             {/* Footer / Seal Section - DATE REMOVED */}
             <div className="mt-12 w-full flex justify-end items-end px-8">
                 {/* Wax Seal Component */}
                 <div className="relative w-20 h-20 flex items-center justify-center transform rotate-12">
                     <div className="absolute inset-0 rounded-full bg-red-900 shadow-md" style={{ 
                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 2px 2px 5px rgba(0,0,0,0.4)',
                         border: '4px double rgba(255,255,255,0.2)'
                     }}></div>
                     <div className="absolute inset-2 rounded-full border border-red-800 opacity-50"></div>
                     <span className="relative z-10 text-red-200 font-bold text-2xl font-serif" style={{ fontFamily: '"Playfair Display", serif' }}>
                         {author ? author.charAt(0).toUpperCase() : 'W'}
                     </span>
                 </div>
             </div>
         </div>
      </div>
    );
  }

  // NEW: MINIMAL ILLUSTRATION (简约插画风)
  if (theme === ThemeType.MINIMAL_ILLUSTRATION) {
      const illType = randomChoice(['dessert', 'pet']);
      
      const CutePet = () => (
        <svg viewBox="0 0 200 200" width="120" height="120" className="mx-auto my-6 text-slate-800">
             <path fill="none" stroke="currentColor" strokeWidth="2" d="M50 140 Q40 100 60 70 Q80 40 100 60 Q120 40 140 70 Q160 100 150 140" />
             <circle cx="80" cy="90" r="4" fill="currentColor"/>
             <circle cx="120" cy="90" r="4" fill="currentColor"/>
             <path fill="none" stroke="currentColor" strokeWidth="2" d="M90 110 Q100 120 110 110" />
             <path fill="none" stroke="currentColor" strokeWidth="2" d="M40 100 L20 110 M160 100 L180 110" />
        </svg>
      );
      
      const CuteCake = () => (
        <svg viewBox="0 0 200 200" width="120" height="120" className="mx-auto my-6 text-slate-800">
             <rect x="50" y="100" width="100" height="60" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
             <path d="M50 100 Q60 120 70 100 Q80 120 90 100 Q100 120 110 100 Q120 120 130 100 Q140 120 150 100" fill="none" stroke="currentColor" strokeWidth="2"/>
             <rect x="95" y="60" width="10" height="40" fill="currentColor" opacity="0.5"/>
             <circle cx="100" cy="55" r="5" fill="currentColor" className="text-red-500"/>
             <path d="M60 130 L140 130" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
        </svg>
      );

      return (
        <div className={`${containerClass} bg-[#fffcf5] p-12 md:p-16 relative flex flex-col items-center justify-center`}>
            {/* Edge Vertical Text */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 writing-vertical-rl text-xs font-bold tracking-[0.4em] text-slate-300">
               WH DIARY
            </div>

            {/* Illustration Area */}
            <div className="w-full max-w-lg border-b border-black pb-2 mb-8">
                 {illType === 'dessert' ? <CuteCake /> : <CutePet />}
            </div>

            {/* Content Area */}
            <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-slate-900">{title || 'Untitled'}</h1>
                <article className="text-base leading-loose text-justify text-slate-800 font-serif">
                   {paragraphs.map((p, i) => (
                       <p key={i} className="mb-4">{p}</p>
                   ))}
                </article>
            </div>
            
            {/* Author - Fixed 2 line heights below content */}
            <div className="mt-8 text-center">
                <div className="inline-block w-8 h-1 bg-black mb-2"></div>
                <p className="text-xs uppercase font-bold tracking-widest text-slate-400">{author}</p>
            </div>
        </div>
      );
  }

  // 19. MIDNIGHT MOOD (Blue/Pink Gradient Blur) - REDESIGNED
  if (theme === ThemeType.MIDNIGHT_MOOD) {
      return (
          <div className={`${containerClass} bg-slate-50 text-slate-800 p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center`}>
              {/* Blue and Pink Gaussian Blur Background */}
              <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-200 rounded-full blur-[100px] opacity-70 mix-blend-multiply"></div>
              <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-pink-200 rounded-full blur-[100px] opacity-70 mix-blend-multiply"></div>

              <div className="relative z-10 w-full max-w-2xl">
                  {/* Header */}
                  <div className="mb-10 text-center">
                      <h1 className="text-2xl font-medium tracking-widest text-slate-700 mb-2 uppercase">
                          {title || 'MIDNIGHT'}
                      </h1>
                      {subtitle && <p className="text-xs text-slate-400 font-light tracking-widest uppercase">{subtitle}</p>}
                  </div>

                  {/* Body with Underlines */}
                  <article className="font-serif text-lg md:text-xl leading-loose tracking-wide">
                      {paragraphs.map((p, i) => (
                          <div key={i} className="mb-6">
                              <p className="border-b border-slate-300/50 pb-1 text-slate-800 drop-shadow-sm">
                                  {p}
                              </p>
                          </div>
                      ))}
                  </article>

                  {/* Author - Fixed 2 line heights below content */}
                  <div className="mt-8 text-center text-xs text-slate-400 flex justify-center items-center gap-4">
                      <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                      <span>{author || 'Anonymous'}</span>
                  </div>
              </div>
          </div>
      );
  }

  // 20. WARM MEMO (Warm Gradient, Floating Card)
  if (theme === ThemeType.WARM_MEMO) {
      return (
          <div className={`${containerClass} bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 p-8 md:p-16 flex items-center justify-center`}>
               {/* Floating Card */}
               <div className="bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(251,191,36,0.2)] w-full max-w-lg p-8 md:p-10 flex flex-col relative">
                   {/* Skeuomorphic Tape (Optional detail) */}
                   <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-yellow-200/50 backdrop-blur-sm rotate-1"></div>

                   {/* Title */}
                   <h1 className="text-2xl font-bold text-slate-800 mb-2 mt-4">
                       {title || 'Daily Review'}
                   </h1>
                   {subtitle && <p className="text-sm text-orange-400 mb-6 font-medium">{subtitle}</p>}

                   {/* Content */}
                   <article className="text-slate-600 leading-relaxed font-sans text-base">
                       {paragraphs.map((p, i) => (
                           <p key={i} className="mb-4">{p}</p>
                       ))}
                   </article>

                   {/* Signature - Fixed 2 line heights below content */}
                   <div className="mt-8 pt-4 border-t border-dashed border-gray-100 text-right text-xs text-gray-400 font-bold uppercase tracking-wider">
                       Written by {author || 'Me'}
                   </div>
               </div>
          </div>
      );
  }

  // 21. CLEAR GRID (Beige, Lines, Handwritten, Icon)
  if (theme === ThemeType.CLEAR_GRID) {
      return (
          <div className={`${containerClass} bg-[#fdfbf7] p-8 md:p-16 relative flex flex-col items-center justify-center`}>
               {/* Horizontal Lines Background */}
               <div className="absolute inset-0 z-0 pointer-events-none" 
                    style={{
                        backgroundImage: `linear-gradient(transparent 95%, #e5e5e5 95%)`,
                        backgroundSize: '100% 40px',
                        backgroundPosition: '0 10px' // Align lines
                    }}>
               </div>

               <div className="relative z-10 w-full max-w-2xl mx-auto">
                   <header className="mb-10 pl-2">
                       <h1 className="text-3xl text-slate-800 mb-1" style={{ fontFamily: '"Long Cang", "Indie Flower", cursive' }}>
                           {title || 'Untitled'}
                       </h1>
                       {subtitle && <p className="text-slate-400 text-sm font-light">{subtitle}</p>}
                   </header>

                   <article className="text-xl md:text-2xl leading-[40px] text-slate-700 tracking-wide" style={{ fontFamily: '"Long Cang", "Indie Flower", cursive', letterSpacing: '0.1em' }}>
                       {paragraphs.map((p, i) => (
                           <p key={i} className="mb-10" style={getTextJitter()}>
                               {p}
                           </p>
                       ))}
                   </article>
                   
                   {/* Author & Icon - Fixed 2 line heights below content */}
                   <div className="mt-8 flex justify-end items-center gap-2 opacity-60 mix-blend-multiply" style={getJitterStyle(2)}>
                       <span className="text-[10px] text-slate-400 uppercase tracking-widest">{author}</span>
                       <MinimalistIcon />
                   </div>
               </div>
          </div>
      );
  }

  // 22. TORN SCRAP (Ripped Paper, Vinyl)
  if (theme === ThemeType.TORN_SCRAP) {
      return (
          <div className={`${containerClass} bg-stone-300 p-8 flex items-center justify-center relative`}>
              {/* Table texture overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 mix-blend-multiply"></div>

              {/* The Torn Paper */}
              <div className="bg-white p-8 md:p-12 w-full max-w-2xl shadow-xl relative min-h-[400px]" style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 2%, black 100%)', 
                  clipPath: `polygon(
                    0% 10px, 
                    2% 0px, 4% 10px, 6% 0px, 8% 10px, 10% 0px, 
                    12% 10px, 14% 0px, 16% 10px, 18% 0px, 20% 10px, 
                    22% 0px, 24% 10px, 26% 0px, 28% 10px, 30% 0px, 
                    32% 10px, 34% 0px, 36% 10px, 38% 0px, 40% 10px,
                    42% 0px, 44% 10px, 46% 0px, 48% 10px, 50% 0px,
                    52% 10px, 54% 0px, 56% 10px, 58% 0px, 60% 10px,
                    62% 0px, 64% 10px, 66% 0px, 68% 10px, 70% 0px,
                    72% 10px, 74% 0px, 76% 10px, 78% 0px, 80% 10px,
                    82% 0px, 84% 10px, 86% 0px, 88% 10px, 90% 0px,
                    92% 10px, 94% 0px, 96% 10px, 98% 0px, 100% 10px,
                    100% 100%, 0% 100%
                  )`
              }}>
                  {/* Punch Holes */}
                  <div className="absolute top-8 left-4 w-4 h-4 bg-stone-300 rounded-full shadow-inner"></div>
                  <div className="absolute top-8 left-12 w-4 h-4 bg-stone-300 rounded-full shadow-inner"></div>

                  <h1 className="text-3xl mb-6 font-bold text-slate-800 mt-6" style={{ fontFamily: '"Long Cang", "Indie Flower", cursive', transform: 'rotate(-1deg)' }}>
                      {title || 'Thoughts...'}
                  </h1>

                  <article className="text-xl leading-loose text-slate-800 font-handwriting tracking-wide" style={{ fontFamily: '"Long Cang", "Indie Flower", cursive' }}>
                      {paragraphs.map((p, i) => (
                           <p key={i} className="mb-6" style={getTextJitter()}>
                               {p}
                           </p>
                       ))}
                  </article>

                  {/* Author - Fixed 2 line heights below content */}
                  <div className="mt-8 font-mono text-xs text-gray-400 text-right">
                      REC: {author || 'Unknown'}
                  </div>

                  {/* Vinyl Record Decor */}
                  <div className="absolute bottom-[-20px] right-[-20px] transform scale-75 md:scale-100 rotate-12 z-0 opacity-50">
                      <VinylComponent />
                  </div>
              </div>
          </div>
      );
  }

  // --- THEME IMPLEMENTATIONS ---

  // 1. SURPRISE ME (Mixed Style)
  if (theme === ThemeType.SURPRISE_ME) {
    // Randomize Fonts
    const fonts = ['"Playfair Display"', 'Inter', '"Courier New"', '"Ma Shan Zheng"'];
    const selectedFont = randomChoice(fonts);
    
    // Randomize Colors (HSL shift)
    const baseHue = randomInt(0, 360);
    const bgStyle = { backgroundColor: `hsl(${baseHue}, ${random(10, 40)}%, ${random(90, 98)}%)` };
    const textStyle = { color: `hsl(${baseHue}, ${random(40, 60)}%, 20%)` };

    // Randomize Alignment
    const align = randomChoice(['text-left', 'text-center', 'text-justify']);

    return (
      <div className={`${containerClass} p-12 md:p-16 flex flex-col justify-center`} style={{ ...bgStyle, fontFamily: selectedFont, ...textStyle }}>
          <header className={`mb-12 ${align}`} style={getJitterStyle(10)}>
             <h1 className="text-5xl font-bold mb-4">{title || 'Serendipity'}</h1>
             {subtitle && <p className="text-xl opacity-60 italic">{subtitle}</p>}
          </header>
          
          <article className={`text-xl leading-loose ${align}`}>
             {paragraphs.map((p, i) => (
               <p key={i} className="mb-6" style={getJitterStyle(2)}>{p}</p>
             ))}
          </article>

          {/* Author - Fixed 2 line heights below content */}
          <div className={`mt-8 flex items-center gap-4 ${align === 'text-center' ? 'justify-center' : 'justify-end'}`}>
             <div className="flex items-center gap-4">
                <span className="uppercase tracking-widest text-xs opacity-50">{author}</span>
                <GenerativeStamp name={author || 'Luck'} />
             </div>
          </div>
      </div>
    );
  }

  // 2. FLOATING NOTE (Torn Edge, Compact)
  if (theme === ThemeType.FLOATING_NOTE) {
    return (
      <div className={`w-full bg-stone-200 flex items-center justify-center p-8 overflow-hidden aspect-[3/4]`}>
         {/* The Note Card */}
         <div 
           className="bg-[#fffdf0] max-w-lg w-full p-8 md:p-12 shadow-[10px_15px_30px_rgba(0,0,0,0.15)] relative transform"
           style={{ 
             transform: `rotate(${random(-2, 2)}deg)`,
             clipPath: `polygon(0% 2%, 5% 0%, 10% 2%, 15% 0%, 20% 2%, 25% 0%, 30% 2%, 35% 0%, 40% 2%, 45% 0%, 50% 2%, 55% 0%, 60% 2%, 65% 0%, 70% 2%, 75% 0%, 80% 2%, 85% 0%, 90% 2%, 95% 0%, 100% 2%, 100% 98%, 95% 100%, 90% 98%, 85% 100%, 80% 98%, 75% 100%, 70% 98%, 65% 100%, 60% 98%, 55% 100%, 50% 98%, 45% 100%, 40% 98%, 35% 100%, 30% 98%, 25% 100%, 20% 98%, 15% 100%, 10% 98%, 5% 100%, 0% 98%)`
           }}
         >
            <div className="font-handwriting text-slate-800" style={{ fontFamily: '"Indie Flower", "Fredoka", sans-serif' }}>
                <h1 className="text-2xl font-bold mb-6 text-slate-900 border-b-2 border-slate-200 pb-2 inline-block">
                    {title || 'Note'}
                </h1>
                <article className="text-lg leading-relaxed text-slate-700">
                    {paragraphs.map((p, i) => <p key={i} className="mb-4">{p}</p>)}
                </article>
                
                {/* Author - Fixed 2 line heights below content */}
                <div className="mt-8 pt-4 border-t border-dotted border-slate-300 flex justify-end items-center text-sm text-slate-400 font-mono">
                    <span>{author}</span>
                </div>
            </div>
         </div>
      </div>
    );
  }

  // 3. ORGANIC STAMP (Seal focus)
  if (theme === ThemeType.ORGANIC_STAMP) {
    // Generate a subtle paper grain pattern via SVG
    const paperPattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`;

    return (
      <div className={`${containerClass} bg-[#fdfbf7] p-12 md:p-20 font-serif relative overflow-hidden justify-center`}
           style={{
             backgroundImage: paperPattern,
           }}
      >
         {/* Decorative red wash */}
         <div className="absolute top-[-10%] right-[-10%] opacity-10 w-64 h-64 rounded-full bg-[#7f1d1d] blur-[80px]" 
              style={{ transform: `scale(${random(0.8, 1.2)})` }}>
         </div>
         
         <div className={`relative z-10 flex flex-col ${isShortContent ? 'items-center text-center' : ''}`}>
             <header className="mb-12 relative">
                {/* Vertical accent line if long content */}
                {!isShortContent && <div className="absolute -left-8 top-1 w-1 h-full max-h-16 bg-[#7f1d1d] opacity-20"></div>}
                
                <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#2c2c2c] tracking-tight" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                   {title || 'Untitled'}
                </h1>
                {subtitle && <p className="text-lg text-[#7f1d1d] font-medium italic opacity-80">{subtitle}</p>}
             </header>

             <article className={`text-xl leading-loose text-[#333] ${isShortContent ? 'max-w-xl' : ''}`}>
                {paragraphs.map((p, i) => (
                    <p key={i} className="mb-8">{p}</p>
                ))}
             </article>

             {/* Author - Fixed 2 line heights below content */}
             <div 
               className={`mt-8 flex items-center gap-6 ${isShortContent ? 'justify-center' : 'justify-end'}`}
             >
                 <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-1">Signed</p>
                    <p className="font-bold text-slate-800 font-serif tracking-widest">{author || 'Me'}</p>
                 </div>
                 <GenerativeStamp name={author || 'Me'} />
             </div>
         </div>
      </div>
    );
  }

  // 4. LIVE TEXTURE (Dynamic Noise)
  if (theme === ThemeType.LIVE_TEXTURE) {
    // Generate noise opacity
    const noiseOpacity = random(0.05, 0.15);
    
    return (
      <div className={`${containerClass} bg-[#e5e5e5] p-12 md:p-16 relative font-mono text-slate-800 justify-center`}>
          {/* Procedural Noise Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${random(0.6, 0.9)}' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='${noiseOpacity}'/%3E%3C/svg%3E")`,
              filter: 'contrast(120%) brightness(100%)'
          }}></div>

          <div className="relative z-10 max-w-3xl mx-auto border-l-4 border-slate-900 pl-8 py-4">
              <header className="mb-12" style={getJitterStyle(2)}>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                     {title || 'TEXTURE'}
                  </h1>
              </header>

              <article className="text-lg md:text-xl leading-relaxed font-medium">
                  {paragraphs.map((p, i) => <p key={i} className="mb-6">{p}</p>)}
              </article>
              
              {/* Author - Fixed 2 line heights below content */}
              <div className="mt-8 pt-8 border-t border-slate-900/20 flex justify-between items-end">
                  <div className="w-16 h-16 bg-slate-900 rounded-full blur-xl opacity-20"></div>
                  <div className="text-right">
                      <p className="font-bold uppercase tracking-widest">{author}</p>
                  </div>
              </div>
          </div>
      </div>
    );
  }

  // --- EXISTING THEMES (Modified with Jitter/Randomness where applicable) ---
  // Apply mild color shuffling to Monet Garden
  if (theme === ThemeType.MONET_GARDEN) {
    // Shift hue slightly
    const hueShift = random(-15, 15);
    return (
      <div className={`${containerClass} p-8 md:p-16 bg-gradient-to-br from-purple-100 via-white to-green-100 font-serif justify-center`}
           style={{ filter: `hue-rotate(${hueShift}deg)` }}>
         <div className="w-full h-auto border-4 border-double border-purple-200/50 bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg flex flex-col">
            <header className="text-center mb-12" style={getJitterStyle(3)}>
               <h1 className="text-5xl md:text-6xl text-slate-700 italic mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {title || 'The Garden'}
               </h1>
               {subtitle && (
                 <p className="text-lg text-purple-800/70 font-light">{subtitle}</p>
               )}
            </header>
            <article className="text-slate-800 text-lg leading-loose text-justify max-w-2xl mx-auto">
               {paragraphs.map((p, i) => <p key={i} className="mb-6 first-letter:text-3xl first-letter:text-purple-900 first-letter:font-light">{p}</p>)}
            </article>
            
            {/* Author - Fixed 2 line heights below content */}
            <div className="mt-8 text-center text-green-800/50 text-sm italic">
               ~ {author || 'Impressionist'} ~
            </div>
         </div>
      </div>
    );
  }

  // Keep other existing themes mostly standard but ensure they respect containerClass
  
  // Minimal Memo
  if (theme === ThemeType.MODERN_MEMO) {
    return (
      <div className={`${containerClass} bg-white text-slate-800 p-12 md:p-16 border border-gray-200 font-sans flex flex-col justify-center`}>
        <header className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-slate-900 leading-tight">
            {title || 'Untitled'}
          </h1>
          <div className="w-12 h-1 bg-gray-200 mb-6"></div>
          {subtitle && (
            <h2 className="text-lg text-slate-500 font-normal">
              {subtitle}
            </h2>
          )}
        </header>
        <article className={`prose prose-slate max-w-none text-lg leading-relaxed text-justify ${isShortContent ? 'flex flex-col justify-center' : ''}`}>
          {paragraphs.map((p, i) => <p key={i} className="mb-6">{p}</p>)}
        </article>
        
        {/* Author - Fixed 2 line heights below content */}
        <div className="mt-8 text-right text-xs text-gray-400 uppercase">
             {author || 'Author'}
        </div>
      </div>
    );
  }

  // Retro Grid - REDESIGNED 2.0 (Left Alignment, Boxed Title)
  if (theme === ThemeType.CLASSIC_GRID) {
    return (
      <div className={`${containerClass} bg-[#f0f9f0] text-[#0a2f1d] p-0 font-mono relative flex flex-col`}>
         {/* Grid Background simulating 20x20 squares */}
         <div 
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
                // Green grid lines
                backgroundImage: `
                  linear-gradient(#166534 1px, transparent 1px), 
                  linear-gradient(90deg, #166534 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0'
            }}
         />

         {/* Red Sidebar Lines (Margins) */}
         <div className="absolute top-0 bottom-0 left-8 w-px bg-red-400/50"></div>
         <div className="absolute top-0 bottom-0 right-8 w-px bg-red-400/50"></div>

         <div className="relative z-10 w-full max-w-3xl flex flex-col items-start pl-12 pr-12 pt-12">
            {/* Left Aligned Boxed Title stuck to margin */}
            <header className="mb-10 w-full">
                 <div className="border-[2px] border-[#0a2f1d] px-4 py-2 bg-[#f0f9f0]/90 mb-4 inline-block ml-[-2px]">
                     <h1 className="text-3xl font-bold tracking-widest text-[#0a2f1d] text-left" style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
                         {title || 'UNTITLED'}
                     </h1>
                 </div>
                 
                 {subtitle && (
                    <div className="text-[#1a4a30] italic text-sm font-serif pl-1">
                        {subtitle}
                    </div>
                 )}
            </header>
            
            {/* Left Aligned Body */}
            <article className={`text-xl leading-[40px] tracking-widest text-left w-full`} style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
                {paragraphs.map((p, i) => (
                    <p key={i} className="mb-8">{p}</p>
                ))}
            </article>
            
            {/* Author - Fixed 2 line heights below content */}
            <div className="mt-8 text-right w-full text-[#0a2f1d] text-sm font-bold opacity-80" style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
               {author ? `[ ${author} ]` : ''}
            </div>
         </div>
      </div>
    );
  }

  // Classic Serif
  if (theme === ThemeType.PROSE_ART) {
    return (
      <div className={`${containerClass} bg-[#fdfbf7] text-[#2c2c2c] p-12 md:p-20 font-serif relative justify-center`}>
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col">
          <header className={`mb-16 text-center`}>
            <h1 className="text-4xl md:text-5xl font-normal mb-6 tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
              {title || 'Untitled'}
            </h1>
            {subtitle && (
                 <h2 className="text-lg text-gray-600 italic border-t border-b border-gray-200 py-2 inline-block px-8">
                   {subtitle}
                 </h2>
            )}
          </header>
          
          <article className="text-lg leading-[2] font-serif">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-8 indent-8 text-justify">
                {p}
              </p>
            ))}
          </article>
          
           {/* Author - Fixed 2 line heights below content */}
           <div className={`mt-8 text-center text-xs uppercase tracking-[0.3em] text-gray-400`}>
             {author}
           </div>
        </div>
      </div>
    );
  }

  // LITERARY ESSAY (散文随笔)
  if (theme === ThemeType.LITERARY_ESSAY) {
    return (
      <div className={`${containerClass} bg-[#f9f7f1] text-[#333] p-12 md:p-24 font-serif relative justify-center`}>
         {/* Subtle paper grain texture */}
         <div className="absolute inset-0 pointer-events-none opacity-40" 
              style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}>
         </div>

         <div className="relative z-10 max-w-3xl mx-auto flex flex-col">
            {/* Header */}
            <header className="mb-16 text-center">
               <div className="mb-6 flex justify-center">
                   <div className="w-px h-12 bg-red-800 opacity-40"></div>
               </div>
               <h1 className="text-4xl md:text-5xl font-medium tracking-wide mb-4 text-[#2c2c2c]" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                  {title || 'Untitled'}
               </h1>
               {subtitle && (
                 <p className="text-base text-gray-500 font-light tracking-widest uppercase mt-4">
                   {subtitle}
                 </p>
               )}
            </header>

            {/* Content */}
            <article className="text-xl leading-[2.2] tracking-wide text-justify text-slate-800">
               {paragraphs.map((p, i) => (
                   <p key={i} className={`mb-8 ${i === 0 ? 'first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-[#8b2d2d] first-letter:font-bold' : ''}`}>
                       {p}
                   </p>
               ))}
            </article>

            {/* Author - Fixed 2 line heights below content */}
            <div className="mt-8 flex justify-end items-end gap-6 border-t border-gray-200/50 pt-8">
                <div className="text-right">
                    <p className="font-bold text-slate-900 tracking-widest">{author || 'Writer'}</p>
                </div>
                <GenerativeStamp name={author || 'Essay'} />
            </div>
         </div>
      </div>
    );
  }

  // Neo-Chinese Narrative
  if (theme === ThemeType.NEO_CHINESE_NARRATIVE) {
    return (
      <div className={`${containerClass} bg-[#eef2f3] text-[#2c3e50] p-8 md:p-12 relative font-serif justify-center`}>
         <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/subtle-grey.png')` }}></div>

         <div className="relative z-10 w-full flex flex-row-reverse gap-8 md:gap-12 justify-center">
            <div className="h-full pt-12 shrink-0 border-l border-slate-300 pl-6 md:pl-8 flex flex-col items-center">
               <h1 className="text-4xl md:text-5xl text-slate-800 font-normal writing-vertical-rl tracking-[0.2em] leading-loose" style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
                  {title || '无题'}
               </h1>
               
               {/* Author - Under title (Vertical flow) */}
               {author && (
                 <div className="mt-8 writing-vertical-rl text-xs text-slate-500 tracking-widest pt-4 border-t border-slate-300">
                    {author}
                 </div>
               )}
            </div>

            <div className={`flex flex-col pt-16 md:pt-20 ${isShortContent ? 'justify-center' : ''}`}>
                {subtitle && (
                   <div className="mb-12 text-center w-full pb-4">
                      <p className="text-base text-slate-500 italic font-light tracking-widest border-b border-slate-200 inline-block pb-2">
                        {subtitle}
                      </p>
                   </div>
                )}

                <article className="text-lg leading-loose text-slate-700 tracking-wide" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                   {paragraphs.map((p, i) => (
                      <div key={i} className="mb-8 relative pl-6">
                         <span className="absolute left-0 top-3 w-2 h-2 bg-slate-800 rotate-45"></span>
                         <p className="text-justify">{p}</p>
                      </div>
                   ))}
                </article>
            </div>
         </div>
      </div>
    );
  }

  // Ink Wash
  if (theme === ThemeType.INK_WASH) {
    return (
      <div className={`${containerClass} bg-[#fdfdfd] text-[#1a1a1a] p-12 md:p-20 relative font-serif justify-center`}>
         <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-gray-900 rounded-full opacity-10 blur-3xl ink-splash-mask" style={{ transform: `scale(${random(0.9, 1.1)})` }}></div>
         <div className="absolute bottom-[10%] left-[5%] w-64 h-64 bg-gray-800 rounded-full opacity-5 blur-2xl ink-splash-mask"></div>

         <div className={`relative z-10 max-w-2xl mx-auto flex flex-col items-center`}>
            <header className="mb-16 text-center">
               <div className="w-1 h-16 bg-black/80 rounded-full mx-auto mb-6 opacity-60"></div>
               <h1 className="text-6xl mb-6 font-normal tracking-wide" style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
                  {title || '无 题'}
               </h1>
               {subtitle && (
                 <h2 className="text-xl text-gray-500 font-light tracking-widest" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                   {subtitle}
                 </h2>
               )}
            </header>
            
            <article className="text-xl leading-[2.5] text-center text-gray-800" style={{ fontFamily: '"Noto Serif SC", serif' }}>
               {paragraphs.map((p, i) => <p key={i} className="mb-12">{p}</p>)}
            </article>

            {/* Author - Fixed 2 line heights below content */}
            <div className="mt-8 opacity-70">
               <div className="w-10 h-10 border-2 border-red-800 text-red-800 flex items-center justify-center text-xs font-bold" style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
                  {author ? author.substring(0, 2) : '墨'}
               </div>
            </div>
         </div>
      </div>
    );
  }

  // Wabi-sabi
  if (theme === ThemeType.WABI_SABI) {
    return (
      <div className={`${containerClass} bg-[#e6e2d3] text-[#4a473e] p-12 md:p-24 font-serif flex flex-col justify-center relative`}>
         {/* Texture: Embossed Paper */}
         <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" 
              style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cardboard-flat.png")` }}>
         </div>

         <div className="relative z-10 max-w-xl mx-auto md:ml-12 flex flex-col justify-center">
            <article className="text-lg md:text-xl font-light leading-loose mb-16 tracking-wide flex flex-col justify-center" style={{ fontFamily: '"Lora", serif' }}>
               {paragraphs.map((p, i) => <p key={i} className="mb-10">{p}</p>)}
            </article>

            {/* Author */}
            <div className="mt-8">
                <header className="border-t border-[#4a473e]/30 pt-6">
                   <h1 className="text-3xl font-normal mb-2 text-[#2b2924]">
                      {title || 'Silence'}
                   </h1>
                   {subtitle && <p className="text-sm opacity-60 italic mb-4">{subtitle}</p>}
                   {author && <p className="text-xs uppercase tracking-[0.2em] opacity-40">{author}</p>}
                </header>
            </div>
         </div>
         <div className="absolute top-20 right-20 w-32 h-40 bg-[#dcd8c5] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-50 pointer-events-none mix-blend-multiply"></div>
      </div>
    );
  }

  // Y2K PIXEL ART (千禧像素风) - REDESIGNED: Very Pale Pink & White Stripes
  if (theme === ThemeType.Y2K_MILLENNIUM) {
    const PixelStar = ({ className, style }: { className?: string, style?: any }) => (
      <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" shapeRendering="crispEdges">
         <path d="M11 0h2v4h4v2h4v2h-2v2h2v4h-2v2h-2v2h-4v4h-2v-4h-4v-2h-2v-2h-2v-4h2v-2h-2v-2h4v-2h4V0z" />
      </svg>
    );

    const PixelHeart = ({ className, style }: { className?: string, style?: any }) => (
      <svg viewBox="0 0 16 16" className={className} style={style} fill="currentColor" shapeRendering="crispEdges">
        <path d="M4 0h4v2h-4z M8 0h4v2h-4z M0 4h4v4h-4z M12 4h4v4h-4z M4 8h8v4h-8z M6 12h4v4h-4z" />
      </svg>
    );

    const PixelMail = () => (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" shapeRendering="crispEdges">
         <path d="M2 4h16v2h-2v2h-2v2h-4v-2h-2v-2h-2v-2H2V4z M2 16h16v-6h-2v2h-2v2h-8v-2H4v-2H2v6z" />
      </svg>
    );

    return (
      <div className={`${containerClass} relative overflow-hidden flex flex-col items-center justify-center p-8`}
           style={{ 
             fontFamily: '"VT323", "SimSun", "Songti SC", monospace',
             backgroundColor: '#FFF0F5', // LavenderBlush
             backgroundImage: 'repeating-linear-gradient(45deg, #FFF0F5 0px, #FFF0F5 20px, #FFFFFF 20px, #FFFFFF 40px)',
           }}
      >
         {/* Floating BG Elements (Pink/Purple) */}
         <PixelStar className="absolute top-10 left-10 text-pink-400 w-12 h-12 animate-pulse" />
         <PixelStar className="absolute bottom-40 right-[10%] text-purple-400 w-8 h-8 animate-ping" style={{animationDuration: '3s'}} />
         
         {/* Random Glitch Bars */}
         <div className="absolute top-[20%] left-0 w-full h-1 bg-pink-500/20"></div>
         <div className="absolute bottom-[30%] left-0 w-full h-2 bg-purple-500/20"></div>

         {/* Retro RPG Chat Bubble Container */}
         <div className="relative w-full max-w-2xl">
             {/* The Box */}
             <div 
                className="bg-white border-b-4 border-r-4 border-black border-t-2 border-l-2 p-1 shadow-[8px_8px_0px_rgba(255,0,255,0.3)]"
             >
                 {/* Inner Content Padding */}
                 <div className="border-2 border-slate-200 p-6 md:p-8 flex flex-col min-h-[400px]">
                     {/* Title Area */}
                     <div className="mb-6 border-b-2 border-dashed border-slate-300 pb-4">
                        <h1 className="text-3xl font-bold text-black mb-1 flex items-center gap-2">
                           <span className="text-purple-600">&gt;</span> {title || 'START'}
                        </h1>
                        {subtitle && <p className="text-slate-500 text-lg">{subtitle}</p>}
                     </div>

                     {/* Body Text */}
                     <article className="text-xl md:text-2xl leading-relaxed text-slate-900 flex-1 font-medium">
                         {paragraphs.map((p, i) => (
                             <p key={i} className="mb-6">{p}</p>
                         ))}
                     </article>

                     {/* Bottom Status Bar / Author */}
                     <div className="mt-8 pt-4 border-t-4 border-black flex justify-between items-center bg-[#E0E0E0] -mx-6 -mb-8 p-4">
                         <div className="flex items-center gap-4 text-sm font-bold text-purple-900">
                             <span>USER: {author || 'Guest'}</span>
                         </div>
                         <div className="flex gap-4 text-pink-600">
                             <PixelHeart className="w-6 h-6 animate-bounce" />
                             <PixelStar className="w-6 h-6 animate-pulse" />
                             <PixelMail />
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </div>
    );
  }

  // Polaroid
  if (theme === ThemeType.POLAROID) {
    return (
        <div className={`${containerClass} bg-[#e8e8e8] p-8 flex items-center justify-center`}>
            {/* Polaroid Frame */}
            <div 
              className="bg-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] p-4 pb-20 max-w-lg w-full transform rotate-1 transition-transform hover:rotate-0 duration-300"
              style={{ aspectRatio: '3.5/4.2' }} // Classic Polaroid ratio approx
            >
                {/* Image Area (Now Text Area) */}
                <div className="w-full aspect-square bg-gray-50/50 border border-gray-100 inner-shadow-sm p-6 relative overflow-hidden flex flex-col">
                     {/* Film Grain Overlay */}
                     <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
                     
                     <article className="relative z-10 text-slate-800 text-lg leading-relaxed font-handwriting" style={{ fontFamily: '"Indie Flower", cursive' }}>
                        {paragraphs.map((p, i) => (
                           <p key={i} className="mb-4 indent-8 text-left">{p}</p>
                        ))}
                     </article>
                </div>

                {/* Signature Area - Fixed spacing */}
                <div className="mt-8 px-4 flex justify-end transform -rotate-2">
                     <div className="font-handwriting text-slate-600 text-2xl" style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
                         {title || 'Signature'}
                     </div>
                </div>
            </div>
        </div>
    );
  }

  return <div>Unknown Theme</div>;
};

export default PreviewRenderer;
