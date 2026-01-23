export const BrainIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(24 100% 62%)" />
        <stop offset="100%" stopColor="hsl(350 100% 68%)" />
      </linearGradient>
    </defs>
    <path 
      d="M24 4C16 4 10 10 10 18C10 22 12 26 15 29C15 29 16 34 14 38C14 38 20 36 24 36C28 36 34 38 34 38C32 34 33 29 33 29C36 26 38 22 38 18C38 10 32 4 24 4Z" 
      stroke="url(#brainGradient)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M17 16C17 16 19 14 24 14C29 14 31 16 31 16" 
      stroke="url(#brainGradient)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M24 14V26" 
      stroke="url(#brainGradient)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M18 22C18 22 20 24 24 24C28 24 30 22 30 22" 
      stroke="url(#brainGradient)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <circle cx="18" cy="18" r="2" fill="url(#brainGradient)" />
    <circle cx="30" cy="18" r="2" fill="url(#brainGradient)" />
    <path 
      d="M24 44V36" 
      stroke="url(#brainGradient)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <circle cx="24" cy="44" r="2" fill="url(#brainGradient)" />
  </svg>
);
