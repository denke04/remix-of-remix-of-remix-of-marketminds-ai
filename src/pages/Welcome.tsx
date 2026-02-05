import { Button } from "@/components/ui/button";
import { MarketMindIcon } from "@/components/icons/MarketMindIcon";
import { useNavigate } from "react-router-dom";
import { Sparkles, TrendingUp, Calendar, CheckCircle } from "lucide-react";

const features = [
  { icon: Sparkles, text: "Generate content ideas" },
  { icon: TrendingUp, text: "Review & improve posts" },
  { icon: Calendar, text: "Schedule automatically" },
];

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] gradient-primary opacity-10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-sm flex flex-col items-center text-center relative z-10">
        {/* Logo */}
        <div className="mb-8 animate-float">
          <MarketMindIcon className="w-20 h-20 text-primary" showGlow />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 animate-fade-in">
          Welcome to{" "}
          <span className="gradient-text">MarketMind</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Your AI Marketing Advisor
        </p>

        {/* Features */}
        <div className="w-full space-y-4 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.text}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 animate-slide-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-foreground font-medium">{feature.text}</span>
              <CheckCircle className="w-5 h-5 text-primary ml-auto" />
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="w-full space-y-3 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Button 
            variant="gradient" 
            size="lg" 
            className="w-full"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className="w-full text-muted-foreground"
            onClick={() => navigate("/login")}
          >
            I already have an account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
