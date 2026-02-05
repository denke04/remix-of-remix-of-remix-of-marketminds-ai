const MarketMindIcon = ({ className = "w-20 h-20", showGlow = false }: { className?: string; showGlow?: boolean }) => {
  return (
    <div className="relative inline-flex items-center justify-center">
      {showGlow && (
        <div className="absolute inset-0 gradient-primary opacity-30 blur-xl rounded-full" />
      )}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} relative z-10`}
      >
        {/* Growth bars */}
        <rect x="12" y="65" width="14" height="25" rx="3" fill="currentColor" />
        <rect x="30" y="52" width="14" height="38" rx="3" fill="currentColor" />
        <rect x="48" y="40" width="14" height="50" rx="3" fill="currentColor" />
        <rect x="66" y="28" width="14" height="62" rx="3" fill="currentColor" />
        
        {/* Rising arrow ON TOP of the bars */}
        <path
          d="M18 58 Q 40 35, 72 12"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M62 10 L 76 8 L 73 22"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export { MarketMindIcon };
