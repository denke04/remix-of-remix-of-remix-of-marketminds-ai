export const BrandLightbulbIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(24 100% 62%)" />
        <stop offset="100%" stopColor="hsl(350 100% 68%)" />
      </linearGradient>
    </defs>
    {/* Lightbulb */}
    <path 
      d="M24 4C17.4 4 12 9.4 12 16C12 20.4 14.4 24.2 18 26.4V30C18 31.1 18.9 32 20 32H28C29.1 32 30 31.1 30 30V26.4C33.6 24.2 36 20.4 36 16C36 9.4 30.6 4 24 4Z" 
      stroke="url(#brandGradient)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    {/* Rays */}
    <path d="M24 0V2" stroke="url(#brandGradient)" strokeWidth="2" strokeLinecap="round" />
    <path d="M38 10L40 8" stroke="url(#brandGradient)" strokeWidth="2" strokeLinecap="round" />
    <path d="M42 24H44" stroke="url(#brandGradient)" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 10L8 8" stroke="url(#brandGradient)" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 24H4" stroke="url(#brandGradient)" strokeWidth="2" strokeLinecap="round" />
    {/* Filament */}
    <path 
      d="M20 18C20 18 22 20 24 18C26 16 28 18 28 18" 
      stroke="url(#brandGradient)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    {/* Base */}
    <rect x="19" y="34" width="10" height="2" rx="1" fill="url(#brandGradient)" />
    <rect x="20" y="38" width="8" height="2" rx="1" fill="url(#brandGradient)" />
    <rect x="21" y="42" width="6" height="2" rx="1" fill="url(#brandGradient)" />
    {/* Brand M */}
    <path 
      d="M21 12L24 16L27 12" 
      stroke="url(#brandGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);
