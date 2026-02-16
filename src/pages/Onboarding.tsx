import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";
import { MarketMindIcon } from "@/components/icons/MarketMindIcon";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";

// Platform brand icons as SVG components
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const platformIcons: Record<string, React.FC<{ className?: string }>> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
  twitter: XIcon,
  google: GoogleIcon,
};

const goals = [
  { id: "sales", label: "More Sales", description: "Increase revenue and conversions" },
  { id: "followers", label: "More Followers", description: "Grow your audience" },
  { id: "engagement", label: "More Engagement", description: "Boost likes, comments, shares" },
];

const platforms = [
  { id: "instagram", label: "Instagram", color: "from-purple-500 to-pink-500" },
  { id: "tiktok", label: "TikTok", color: "from-cyan-400 to-pink-500" },
  { id: "youtube", label: "YouTube Shorts", color: "from-red-500 to-red-600" },
  { id: "facebook", label: "Facebook", color: "from-blue-600 to-blue-700" },
  { id: "twitter", label: "X (Twitter)", color: "from-gray-600 to-gray-800" },
  { id: "google", label: "Google", color: "from-green-500 to-blue-500" },
];

const experienceLevels = [
  { id: "beginner", label: "Beginner", desc: "Just getting started" },
  { id: "intermediate", label: "Intermediate", desc: "Some experience" },
  { id: "advanced", label: "Advanced", desc: "Very experienced" },
];

const teamSizes = [
  { id: "solo", label: "Solo (1)", desc: "Just me" },
  { id: "small", label: "2–10", desc: "Small team" },
  { id: "medium", label: "10–50", desc: "Growing team" },
  { id: "large", label: "50+", desc: "Large organization" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessMessage, setBusinessMessage] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 6;

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1: return firstName.trim().length > 0 && businessName.trim().length > 0;
      case 2: return teamSize.length > 0;
      case 3: return businessDescription.trim().length > 0 && businessMessage.trim().length > 0;
      case 4: return selectedGoals.length > 0;
      case 5: return selectedPlatforms.length > 0;
      case 6: return experience.length > 0;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      
      try {
        // Save to local context
        const userData = {
          firstName,
          companyName: businessName,
          teamSize,
          industry: businessDescription,
          goals: selectedGoals,
          platforms: selectedPlatforms,
          experience,
          businessDescription,
          businessMessage,
        };
        
        setUserData(userData);
        
        // Save to backend
        await api.saveOnboarding({
          businessName,
          industry: businessDescription,
          goals: selectedGoals,
          platforms: selectedPlatforms,
          experience,
          teamSize,
          businessDescription,
          businessMessage,
        });
        
        toast.success("Setup complete! Welcome to MarketMind");
        navigate("/dashboard");
      } catch (error) {
        if (error instanceof ApiError) {
          toast.error(error.message);
        } else {
          toast.error("Failed to save onboarding data");
        }
        console.error("Onboarding error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Progress bar */}
      <div className="w-full max-w-sm mx-auto mb-8">
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                i < step ? "gradient-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Step {step} of {totalSteps}
        </p>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] gradient-primary opacity-10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        {/* Step 1: Name & Business */}
        {step === 1 && (
          <div className="animate-fade-in">
            <MarketMindIcon className="w-12 h-12 text-primary mb-6" />
            <h1 className="text-2xl font-bold mb-2">Let's get to know you</h1>
            <p className="text-muted-foreground mb-8">
              Tell us about yourself and your business
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your First Name</label>
                <Input
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Business Name</label>
                <Input
                  placeholder="Enter your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Team Size */}
        {step === 2 && (
          <div className="animate-fade-in">
            <MarketMindIcon className="w-12 h-12 text-primary mb-6" />
            <h1 className="text-2xl font-bold mb-2">How big is your team?</h1>
            <p className="text-muted-foreground mb-8">
              This helps us personalize recommendations
            </p>
            <div className="space-y-3">
              {teamSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setTeamSize(size.id)}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-300",
                    teamSize === size.id
                      ? "gradient-primary text-primary-foreground glow-subtle"
                      : "bg-card border border-border hover:border-primary/50"
                  )}
                >
                  <span className="font-medium block">{size.label}</span>
                  <span className={cn(
                    "text-sm",
                    teamSize === size.id ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {size.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Business Description */}
        {step === 3 && (
          <div className="animate-fade-in">
            <MarketMindIcon className="w-12 h-12 text-primary mb-6" />
            <h1 className="text-2xl font-bold mb-2">Tell us about your business</h1>
            <p className="text-muted-foreground mb-8">
              This helps our AI deeply understand your brand identity
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Describe your business</label>
                <Textarea
                  placeholder="E.g., We're a specialty coffee shop focusing on single-origin beans and artisanal brewing methods. We serve breakfast and pastries in a cozy, minimalist environment..."
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">What is the message behind this business?</label>
                <Textarea
                  placeholder="E.g., We want people to feel that great coffee is an art form worth savoring. Our brand represents mindfulness, quality over quantity, and authentic human connection..."
                  value={businessMessage}
                  onChange={(e) => setBusinessMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Goals */}
        {step === 4 && (
          <div className="animate-fade-in">
            <MarketMindIcon className="w-12 h-12 text-primary mb-6" />
            <h1 className="text-2xl font-bold mb-2">What's your main goal?</h1>
            <p className="text-muted-foreground mb-8">
              Select all that apply
            </p>
            <div className="space-y-3">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-300",
                    selectedGoals.includes(goal.id)
                      ? "gradient-primary text-primary-foreground glow-subtle"
                      : "bg-card border border-border hover:border-primary/50"
                  )}
                >
                  <span className="font-medium block">{goal.label}</span>
                  <span className={cn(
                    "text-sm",
                    selectedGoals.includes(goal.id) ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {goal.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Platforms */}
        {step === 5 && (
          <div className="animate-fade-in">
            <MarketMindIcon className="w-12 h-12 text-primary mb-6" />
            <h1 className="text-2xl font-bold mb-2">Which platforms do you use?</h1>
            <p className="text-muted-foreground mb-8">
              Select all platforms you want to manage
            </p>
            <div className="space-y-3">
              {platforms.map((platform) => {
                const PlatformIcon = platformIcons[platform.id];
                return (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={cn(
                    "w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-300",
                    selectedPlatforms.includes(platform.id)
                      ? "gradient-primary text-primary-foreground glow-subtle"
                      : "bg-card border border-border hover:border-primary/50"
                  )}
                >
                  <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center", platform.color)}>
                    <PlatformIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{platform.label}</span>
                </button>
              );
              })}
            </div>
          </div>
        )}

        {/* Step 6: Experience */}
        {step === 6 && (
          <div className="animate-fade-in">
            <MarketMindIcon className="w-12 h-12 text-primary mb-6" />
            <h1 className="text-2xl font-bold mb-2">What's your experience level?</h1>
            <p className="text-muted-foreground mb-8">
              We'll adjust our recommendations accordingly
            </p>
            <div className="space-y-3">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setExperience(level.id)}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-300",
                    experience === level.id
                      ? "gradient-primary text-primary-foreground glow-subtle"
                      : "bg-card border border-border hover:border-primary/50"
                  )}
                >
                  <span className="font-medium block">{level.label}</span>
                  <span className={cn(
                    "text-sm",
                    experience === level.id ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {level.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Continue button */}
        <div className="mt-auto pt-8">
          <Button 
            variant="gradient" 
            size="lg" 
            className="w-full"
            disabled={!canProceed() || isLoading}
            onClick={handleNext}
          >
            {isLoading ? "Saving..." : (step === totalSteps ? "Complete Setup" : "Continue")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
