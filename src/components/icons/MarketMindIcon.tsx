const MarketMindIcon = ({ className = "w-20 h-20" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Growth bars */}
      <rect x="10" y="60" width="14" height="30" rx="3" fill="currentColor" />
      <rect x="28" y="45" width="14" height="45" rx="3" fill="currentColor" />
      <rect x="46" y="30" width="14" height="60" rx="3" fill="currentColor" />
      <rect x="64" y="15" width="14" height="75" rx="3" fill="currentColor" />
      
      {/* Arrow swoosh */}
      <path
        d="M8 85 Q 45 70, 85 25"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M75 22 L 88 20 L 85 33"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export { MarketMindIcon };
