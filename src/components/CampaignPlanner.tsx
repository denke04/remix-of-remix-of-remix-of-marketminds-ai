import { useState } from "react";
import { Target, MapPin, Users, DollarSign, Clock, TrendingUp, Sparkles, Calendar, ChevronRight, ChevronLeft, Instagram, Video, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, differenceInDays, addDays } from "date-fns";

const objectives = [
  { id: "awareness", label: "Brand Awareness", description: "Increase visibility and reach" },
  { id: "engagement", label: "Engagement", description: "Boost likes, comments, shares" },
  { id: "traffic", label: "Website Traffic", description: "Drive visits to your site" },
  { id: "sales", label: "Sales & Conversions", description: "Generate purchases or signups" },
  { id: "followers", label: "Grow Followers", description: "Increase your audience" },
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", 
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
];

type CampaignStep = "idea" | "objective" | "timeframe" | "schedule" | "budget" | "results";

interface CampaignData {
  campaignIdea: string;
  objective: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  postingDays: string[];
  postingTime: string;
  budget: string;
}

interface GeneratedCampaign {
  dailyBudget: string;
  totalPosts: number;
  platforms: string[];
  ageRange: string;
  radius: string;
  ideas: {
    day: number;
    type: string;
    title: string;
    description: string;
    budget: string;
  }[];
}

export const CampaignPlanner = () => {
  const [step, setStep] = useState<CampaignStep>("idea");
  const [campaignData, setCampaignData] = useState<CampaignData>({
    campaignIdea: "",
    objective: "",
    startDate: undefined,
    endDate: undefined,
    postingDays: ["Mon", "Wed", "Fri"],
    postingTime: "12:00 PM",
    budget: "100",
  });
  const [generatedCampaign, setGeneratedCampaign] = useState<GeneratedCampaign | null>(null);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day: string) => {
    setCampaignData(prev => ({
      ...prev,
      postingDays: prev.postingDays.includes(day)
        ? prev.postingDays.filter(d => d !== day)
        : [...prev.postingDays, day]
    }));
  };

  const generateCampaign = () => {
    const numDays = campaignData.startDate && campaignData.endDate
      ? differenceInDays(campaignData.endDate, campaignData.startDate) + 1
      : 7;
    
    const budgetNum = parseInt(campaignData.budget) || 100;
    const postsCount = Math.min(numDays, campaignData.postingDays.length * Math.ceil(numDays / 7));
    const dailyBudget = (budgetNum / numDays).toFixed(2);

    // Generate content ideas based on objective
    const ideas = [];
    for (let i = 0; i < Math.min(postsCount, 5); i++) {
      const postDate = campaignData.startDate ? addDays(campaignData.startDate, i * Math.floor(numDays / postsCount)) : new Date();
      
      let contentType = "Post";
      let title = "";
      let description = "";
      
      switch (campaignData.objective) {
        case "awareness":
          contentType = i % 2 === 0 ? "Reel" : "Story";
          title = i === 0 ? "Brand Introduction" : i === 1 ? "Behind the Scenes" : `Day ${i + 1} Highlight`;
          description = "Focus on visual storytelling to maximize reach";
          break;
        case "engagement":
          contentType = i % 3 === 0 ? "Poll" : i % 3 === 1 ? "Question" : "Interactive Post";
          title = i === 0 ? "Ask Your Audience" : i === 1 ? "This or That" : `Engagement ${i + 1}`;
          description = "Use CTAs and interactive elements";
          break;
        case "traffic":
          contentType = "Link Post";
          title = i === 0 ? "Feature Highlight" : `Traffic Driver ${i + 1}`;
          description = "Include clear link in bio CTA";
          break;
        case "sales":
          contentType = i % 2 === 0 ? "Promo Post" : "Carousel";
          title = i === 0 ? "Limited Offer" : i === 1 ? "Product Showcase" : `Sale Push ${i + 1}`;
          description = "Urgency-driven content with clear offers";
          break;
        default:
          contentType = "Reel";
          title = `Content ${i + 1}`;
          description = "Optimized for follower growth";
      }

      ideas.push({
        day: i + 1,
        type: contentType,
        title,
        description,
        budget: `$${(budgetNum / postsCount).toFixed(0)}`,
      });
    }

    setGeneratedCampaign({
      dailyBudget: `$${dailyBudget}`,
      totalPosts: postsCount,
      platforms: ["Instagram", "TikTok", "Facebook", "Google"],
      ageRange: campaignData.objective === "sales" ? "25-44" : "18-35",
      radius: "5 miles",
      ideas,
    });

    setStep("results");
  };

  const renderStep = () => {
    switch (step) {
      case "idea":
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-1">What's your campaign about?</h3>
              <p className="text-sm text-muted-foreground">Describe the core idea, message, or theme of this campaign</p>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Campaign Idea / Concept</label>
              <Textarea
                value={campaignData.campaignIdea}
                onChange={(e) => setCampaignData(prev => ({ ...prev, campaignIdea: e.target.value }))}
                placeholder="E.g., Summer sale promotion with 20% off all drinks, featuring our new cold brew collection. Emphasize refreshment and beat-the-heat messaging..."
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                This helps us generate targeted content ideas and recommendations for your campaign.
              </p>
            </div>

            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full mt-6"
              disabled={!campaignData.campaignIdea.trim()}
              onClick={() => setStep("objective")}
            >
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        );

      case "objective":
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-1">What's your campaign goal?</h3>
              <p className="text-sm text-muted-foreground">Select the main objective for this campaign</p>
            </div>
            
            <div className="space-y-3">
              {objectives.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setCampaignData(prev => ({ ...prev, objective: obj.id }))}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-300 border",
                    campaignData.objective === obj.id
                      ? "gradient-primary border-transparent"
                      : "bg-card border-border hover:border-primary/50"
                  )}
                >
                  <div className="font-medium">{obj.label}</div>
                  <div className={cn(
                    "text-sm",
                    campaignData.objective === obj.id ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {obj.description}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("idea")} className="flex-1">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                variant="gradient" 
                className="flex-1"
                disabled={!campaignData.objective}
                onClick={() => setStep("timeframe")}
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      case "timeframe":
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-1">Campaign Timeframe</h3>
              <p className="text-sm text-muted-foreground">When should this campaign run?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      {campaignData.startDate ? format(campaignData.startDate, "MMM d") : "Select"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={campaignData.startDate}
                      onSelect={(date) => setCampaignData(prev => ({ ...prev, startDate: date }))}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      {campaignData.endDate ? format(campaignData.endDate, "MMM d") : "Select"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={campaignData.endDate}
                      onSelect={(date) => setCampaignData(prev => ({ ...prev, endDate: date }))}
                      disabled={(date) => date < (campaignData.startDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {campaignData.startDate && campaignData.endDate && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <span className="text-primary font-medium">
                  {differenceInDays(campaignData.endDate, campaignData.startDate) + 1} days
                </span>
                <span className="text-muted-foreground"> campaign duration</span>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("idea")} className="flex-1">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                variant="gradient" 
                className="flex-1"
                disabled={!campaignData.startDate || !campaignData.endDate}
                onClick={() => setStep("schedule")}
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-1">Posting Schedule</h3>
              <p className="text-sm text-muted-foreground">Which days and time should we post?</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Posting Days</label>
              <div className="flex gap-2 flex-wrap">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={cn(
                      "w-12 h-12 rounded-xl text-sm font-medium transition-all",
                      campaignData.postingDays.includes(day)
                        ? "gradient-primary text-white"
                        : "bg-card border border-border hover:border-primary/50"
                    )}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Best Time to Post</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setCampaignData(prev => ({ ...prev, postingTime: time }))}
                    className={cn(
                      "px-2 py-2 rounded-lg text-xs font-medium transition-all",
                      campaignData.postingTime === time
                        ? "gradient-primary text-white"
                        : "bg-card border border-border hover:border-primary/50"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("timeframe")} className="flex-1">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                variant="gradient" 
                className="flex-1"
                disabled={campaignData.postingDays.length === 0}
                onClick={() => setStep("budget")}
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      case "budget":
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-1">Campaign Budget</h3>
              <p className="text-sm text-muted-foreground">Set your total campaign budget</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Total Budget
              </label>
              <Input
                type="number"
                value={campaignData.budget}
                onChange={(e) => setCampaignData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="Enter your total budget"
                min="10"
                className="text-lg"
              />
            </div>

            {campaignData.startDate && campaignData.endDate && campaignData.budget && (
              <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily spend estimate</span>
                  <span className="font-medium">
                    ${(parseInt(campaignData.budget) / (differenceInDays(campaignData.endDate, campaignData.startDate) + 1)).toFixed(2)}/day
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Campaign duration</span>
                  <span className="font-medium">
                    {differenceInDays(campaignData.endDate, campaignData.startDate) + 1} days
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Posting schedule</span>
                  <span className="font-medium">
                    {campaignData.postingDays.length}x per week
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("schedule")} className="flex-1">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                variant="gradient" 
                className="flex-1"
                disabled={!campaignData.budget || parseInt(campaignData.budget) < 10}
                onClick={generateCampaign}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Plan
              </Button>
            </div>
          </div>
        );

      case "results":
        if (!generatedCampaign) return null;
        
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Your Campaign Plan</h3>
              <Button variant="outline" size="sm" onClick={() => {
                setStep("objective");
                setGeneratedCampaign(null);
              }}>
                Start Over
              </Button>
            </div>

            {/* Campaign Overview */}
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Daily Budget</span>
                  <div className="font-semibold text-lg">{generatedCampaign.dailyBudget}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Posts</span>
                  <div className="font-semibold text-lg">{generatedCampaign.totalPosts}</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-medium mb-3">Recommendations</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Target Age:</span>
                  <span className="font-medium">{generatedCampaign.ageRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Radius:</span>
                  <span className="font-medium">{generatedCampaign.radius}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Platforms:</span>
                  <div className="flex gap-1">
                    <Instagram className="w-4 h-4" />
                    <Video className="w-4 h-4" />
                    <Facebook className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Ideas */}
            <div>
              <h4 className="font-medium mb-3">Content Plan</h4>
              <div className="space-y-3">
                {generatedCampaign.ideas.map((idea, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs font-medium text-primary uppercase bg-primary/10 px-2 py-1 rounded-md">
                          Day {idea.day} • {idea.type}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{idea.budget}</span>
                    </div>
                    <h5 className="font-medium mt-2">{idea.title}</h5>
                    <p className="text-sm text-muted-foreground">{idea.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="gradient" size="lg" className="w-full">
              Add to Schedule
            </Button>
          </div>
        );
    }
  };

  // Progress indicator
  const steps: CampaignStep[] = ["idea", "objective", "timeframe", "schedule", "budget", "results"];
  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      {step !== "results" && (
        <div className="flex gap-1 mb-4">
          {steps.slice(0, 5).map((s, idx) => (
            <div
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-all",
                idx <= currentStepIndex ? "gradient-primary" : "bg-border"
              )}
            />
          ))}
        </div>
      )}

      {renderStep()}
    </div>
  );
};
