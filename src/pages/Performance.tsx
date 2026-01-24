import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share2, ArrowRight, Calendar, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { TeamMarketplace } from "@/components/TeamMarketplace";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, subDays, subYears } from "date-fns";

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

const bestTimes = [
  { day: "Monday", hours: ["9:00 AM", "12:00 PM", "7:00 PM"] },
  { day: "Tuesday", hours: ["10:00 AM", "1:00 PM", "8:00 PM"] },
  { day: "Wednesday", hours: ["9:00 AM", "11:00 AM", "7:00 PM"] },
  { day: "Thursday", hours: ["10:00 AM", "2:00 PM", "8:00 PM"] },
  { day: "Friday", hours: ["9:00 AM", "12:00 PM", "6:00 PM"] },
  { day: "Saturday", hours: ["11:00 AM", "3:00 PM"] },
  { day: "Sunday", hours: ["12:00 PM", "5:00 PM"] },
];

const tabs = ["Analytics", "Best Times", "Team"];

const Performance = () => {
  const [activeTab, setActiveTab] = useState("Analytics");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [workType, setWorkType] = useState("All");

  const minDate = subYears(new Date(), 5);

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

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300",
                activeTab === tab
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary/50"
              )}
            >
              {tab === "Team" && <Users className="w-4 h-4 inline-block mr-1" />}
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Analytics" && (
          <>
            {/* Custom Date Range */}
            <div className="mb-6">
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">From</label>
                        <CalendarComponent
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => date && setDateRange((prev) => ({ ...prev, from: date }))}
                          disabled={(date) => date > dateRange.to || date < minDate || date > new Date()}
                          className="pointer-events-auto"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">To</label>
                        <CalendarComponent
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => date && setDateRange((prev) => ({ ...prev, to: date }))}
                          disabled={(date) => date < dateRange.from || date < minDate || date > new Date()}
                          className="pointer-events-auto"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t">
                      {["7 Days", "30 Days", "90 Days", "1 Year"].map((preset) => (
                        <Button
                          key={preset}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const days = preset === "7 Days" ? 7 : preset === "30 Days" ? 30 : preset === "90 Days" ? 90 : 365;
                            setDateRange({
                              from: subDays(new Date(), days),
                              to: new Date(),
                            });
                          }}
                        >
                          {preset}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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
          </>
        )}

        {activeTab === "Best Times" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold">Optimal Posting Times</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on your audience activity and engagement patterns, here are the best times to post each day.
              </p>
            </div>

            {bestTimes.map((day) => (
              <div
                key={day.day}
                className="p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{day.day}</span>
                  <span className="text-xs text-muted-foreground">
                    {day.hours.length} optimal time{day.hours.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {day.hours.map((hour) => (
                    <span
                      key={hour}
                      className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-sm font-medium"
                    >
                      {hour}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Team" && (
          <div>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold">Build Your Team</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Find skilled freelancers to help improve your content quality and marketing performance.
              </p>
            </div>
            <TeamMarketplace selectedWorkType={workType} onWorkTypeChange={setWorkType} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Performance;
