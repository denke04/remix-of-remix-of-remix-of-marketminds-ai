import { Home, Scan, BarChart3, Lightbulb, Calendar } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Scan, label: "Analyze", path: "/analyze" },
  { icon: BarChart3, label: "Performance", path: "/performance" },
  { icon: Lightbulb, label: "Ideas", path: "/ideas" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-300 min-w-[60px]",
                isActive 
                  ? "text-primary nav-glow" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon 
                className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive && "gradient-text"
                )}
                style={isActive ? {
                  filter: "drop-shadow(0 0 8px hsl(24 100% 62% / 0.6))"
                } : {}}
              />
              <span className={cn(
                "text-[10px] font-medium transition-all duration-300",
                isActive && "gradient-text"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
