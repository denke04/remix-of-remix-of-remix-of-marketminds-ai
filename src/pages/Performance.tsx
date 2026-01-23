import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  { 
    id: "instagram", 
    label: "Instagram", 
    followers: "2,847",
    growth: "+12%",
    positive: true,
    color: "from-purple-500 to-pink-500"
  },
  { 
    id: "tiktok", 
    label: "TikTok", 
    followers: "1,234",
    growth: "+28%",
    positive: true,
    color: "from-cyan-400 to-pink-500"
  },
  { 
    id: "youtube", 
    label: "YouTube", 
    followers: "892",
    growth: "+5%",
    positive: true,
    color: "from-red-500 to-red-600"
  },
  { 
    id: "facebook", 
    label: "Facebook", 
    followers: "1,567",
    growth: "-2%",
    positive: false,
    color: "from-blue-600 to-blue-700"
  },
];

const metrics = [
  { icon: Eye, label: "Views", value: "24.5K", change: "+18%" },
  { icon: Heart, label: "Likes", value: "3,892", change: "+12%" },
  { icon: MessageCircle, label: "Comments", value: "284", change: "+8%" },
  { icon: Share2, label: "Shares", value: "156", change: "+24%" },
];

const insights = [
  {
    type: "success",
    title: "Your Reel about coffee art got 3x more engagement",
    desc: "Behind-the-scenes content resonates with your audience. Create more!"
  },
  {
    type: "warning",
    title: "Engagement drops on weekends",
    desc: "Consider scheduling your best content for weekdays, especially Tuesday-Thursday"
  },
  {
    type: "tip",
    title: "Your hashtag strategy is improving",
    desc: "Keep using niche-specific hashtags like #specialtycoffee and #latteart"
  },
];

const Performance = () => {
  return (
    <AppLayout>
      <div className="min-h-screen px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Performance</h1>
          <p className="text-muted-foreground">
            Your marketing insights across platforms
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {["7 Days", "30 Days", "90 Days"].map((range, i) => (
            <button
              key={range}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300",
                i === 1
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary/50"
              )}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold">{metric.value}</span>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Cards */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">By Platform</h2>
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div 
                key={platform.id}
                className="p-4 rounded-xl bg-card border border-border flex items-center gap-4"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                  platform.color
                )}>
                  <span className="text-white text-lg font-bold">
                    {platform.label[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{platform.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {platform.followers} followers
                  </p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  platform.positive ? "text-green-400" : "text-red-400"
                )}>
                  {platform.positive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {platform.growth}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <div 
                key={i}
                className={cn(
                  "p-4 rounded-xl border",
                  insight.type === "success" && "bg-green-500/10 border-green-500/30",
                  insight.type === "warning" && "bg-yellow-500/10 border-yellow-500/30",
                  insight.type === "tip" && "bg-primary/10 border-primary/30"
                )}
              >
                <p className="font-medium text-sm mb-1">{insight.title}</p>
                <p className="text-xs text-muted-foreground">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button variant="gradient" size="lg" className="w-full">
          Build My Marketing Plan
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </AppLayout>
  );
};

export default Performance;
