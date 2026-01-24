import { useState } from "react";
import { Target, MapPin, Users, DollarSign, Clock, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55+"];
const interests = [
  "Coffee & Cafes",
  "Restaurants",
  "Art & Design",
  "Fitness",
  "Fashion",
  "Technology",
  "Travel",
  "Food & Cooking",
];

const suggestedCampaigns = [
  {
    id: 1,
    title: "Local Coffee Lovers Campaign",
    concept: "Target coffee enthusiasts within 3 miles with behind-the-scenes content and exclusive offers",
    audience: "25-44, Coffee & Cafe lovers",
    duration: "5 days",
    budget: "$70",
    effectiveness: 85,
  },
  {
    id: 2,
    title: "Weekend Brunch Push",
    concept: "Promote weekend brunch specials to foodies and families in your area",
    audience: "25-54, Food & Restaurants",
    duration: "7 days",
    budget: "$120",
    effectiveness: 78,
  },
  {
    id: 3,
    title: "New Customer Welcome",
    concept: "First-time visitor discount campaign to attract new local customers",
    audience: "18-44, All interests",
    duration: "14 days",
    budget: "$200",
    effectiveness: 92,
  },
];

export const CampaignPlanner = () => {
  const [selectedAges, setSelectedAges] = useState<string[]>(["25-34"]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Coffee & Cafes"]);
  const [radius, setRadius] = useState("3");
  const [budget, setBudget] = useState("100");
  const [showResults, setShowResults] = useState(false);

  const toggleAge = (age: string) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Recommended Campaigns</h3>
          <Button variant="outline" size="sm" onClick={() => setShowResults(false)}>
            Adjust Filters
          </Button>
        </div>
        
        {suggestedCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold">{campaign.title}</h4>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">{campaign.effectiveness}%</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{campaign.concept}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{campaign.audience}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{campaign.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{campaign.budget}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{radius} miles</span>
              </div>
            </div>
            
            <Button variant="gradient" size="sm" className="w-full">
              Use This Campaign
            </Button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Age Range */}
      <div>
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Target Age Range
        </label>
        <div className="flex flex-wrap gap-2">
          {ageRanges.map((age) => (
            <button
              key={age}
              onClick={() => toggleAge(age)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                selectedAges.includes(age)
                  ? "gradient-primary text-white"
                  : "bg-card border border-border hover:border-primary/50"
              )}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Location Radius */}
      <div>
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Location Radius (miles)
        </label>
        <Input
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Enter radius in miles"
          min="1"
          max="50"
        />
      </div>

      {/* Interests */}
      <div>
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Interests
        </label>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                selectedInterests.includes(interest)
                  ? "gradient-primary text-white"
                  : "bg-card border border-border hover:border-primary/50"
              )}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          Budget
        </label>
        <Input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter your budget"
          min="10"
        />
      </div>

      <Button variant="gradient" size="lg" className="w-full" onClick={handleGenerate}>
        <Sparkles className="w-5 h-5 mr-2" />
        Generate Campaign Ideas
      </Button>
    </div>
  );
};
