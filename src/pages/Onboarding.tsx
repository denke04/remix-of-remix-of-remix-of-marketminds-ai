import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Building2, Target, Smartphone, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  "Cafe / Restaurant",
  "Fitness / Gym",
  "E-commerce",
  "Real Estate",
  "Beauty / Salon",
  "Healthcare",
  "Education",
  "Other",
];

const goals = [
  { id: "sales", label: "More Sales", icon: Target },
  { id: "followers", label: "More Followers", icon: BarChart },
  { id: "engagement", label: "More Engagement", icon: Smartphone },
];

const platforms = [
  { id: "instagram", label: "Instagram", color: "from-purple-500 to-pink-500" },
  { id: "tiktok", label: "TikTok", color: "from-cyan-400 to-pink-500" },
  { id: "youtube", label: "YouTube Shorts", color: "from-red-500 to-red-600" },
  { id: "facebook", label: "Facebook", color: "from-blue-600 to-blue-700" },
  { id: "twitter", label: "X (Twitter)", color: "from-gray-600 to-gray-800" },
];

const experienceLevels = [
  { id: "beginner", label: "Beginner", desc: "Just getting started" },
  { id: "intermediate", label: "Intermediate", desc: "Some experience" },
  { id: "advanced", label: "Advanced", desc: "Very experienced" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [experience, setExperience] = useState("");

  const totalSteps = 5;

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
      case 1: return businessName.trim().length > 0;
      case 2: return industry.length > 0;
      case 3: return selectedGoals.length > 0;
      case 4: return selectedPlatforms.length > 0;
      case 5: return experience.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate("/dashboard");
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
        {/* Step 1: Business Name */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
              <Building2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">What's your business name?</h1>
            <p className="text-muted-foreground mb-8">
              We'll personalize your experience based on this
            </p>
            <Input
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="mb-4"
            />
          </div>
        )}

        {/* Step 2: Industry */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold mb-2">What industry are you in?</h1>
            <p className="text-muted-foreground mb-8">
              This helps us tailor content ideas and trends for you
            </p>
            <div className="grid grid-cols-2 gap-3">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustry(ind)}
                  className={cn(
                    "p-4 rounded-xl text-sm font-medium transition-all duration-300 text-left",
                    industry === ind 
                      ? "gradient-primary text-primary-foreground glow-subtle" 
                      : "bg-card border border-border hover:border-primary/50"
                  )}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div className="animate-fade-in">
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
                    "w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-300",
                    selectedGoals.includes(goal.id)
                      ? "gradient-primary text-primary-foreground glow-subtle"
                      : "bg-card border border-border hover:border-primary/50"
                  )}
                >
                  <goal.icon className="w-6 h-6" />
                  <span className="font-medium">{goal.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Platforms */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold mb-2">Which platforms do you use?</h1>
            <p className="text-muted-foreground mb-8">
              Select all platforms you want to manage
            </p>
            <div className="space-y-3">
              {platforms.map((platform) => (
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
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{platform.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Experience */}
        {step === 5 && (
          <div className="animate-fade-in">
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
            disabled={!canProceed()}
            onClick={handleNext}
          >
            {step === totalSteps ? "Complete Setup" : "Continue"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
