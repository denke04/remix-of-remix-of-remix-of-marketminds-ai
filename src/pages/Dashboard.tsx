import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share2, Calendar, Clock } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, subDays, subYears } from "date-fns";

const weeklyData = [
  { day: "Mon", views: 1200, engagement: 340 },
  { day: "Tue", views: 1800, engagement: 520 },
  { day: "Wed", views: 2400, engagement: 680 },
  { day: "Thu", views: 2100, engagement: 590 },
  { day: "Fri", views: 2800, engagement: 780 },
  { day: "Sat", views: 1600, engagement: 420 },
  { day: "Sun", views: 1400, engagement: 380 },
];

const metrics = [
  { icon: Eye, label: "Views", value: "24.5K", change: "+18%", positive: true },
  { icon: Heart, label: "Likes", value: "3,892", change: "+12%", positive: true },
  { icon: MessageCircle, label: "Comments", value: "284", change: "+8%", positive: true },
  { icon: Share2, label: "Shares", value: "156", change: "-3%", positive: false },
];

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

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(24 100% 62%)",
  },
  engagement: {
    label: "Engagement",
    color: "hsl(350 100% 68%)",
  },
};

const Dashboard = () => {
  const { userData } = useUser();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const minDate = subYears(new Date(), 5);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const displayName = userData.firstName || "there";
  const companyName = userData.companyName || "your business";

  return (
    <AppLayout>
      <div className="min-h-screen px-4 py-6 pb-24">
        {/* Ambient glow */}
        <div className="fixed top-0 right-0 w-[400px] h-[400px] gradient-primary opacity-5 blur-[120px] rounded-full pointer-events-none" />

        {/* Personalized Greeting */}
        <div className="mb-6 animate-fade-in">
          <p className="text-muted-foreground mb-1">{getGreeting()},</p>
          <h1 className="text-2xl font-bold">
            {displayName} <span className="text-2xl">👋</span>
          </h1>
          <p className="text-secondary mt-1">
            Ready to boost <span className="font-semibold text-foreground">{companyName}</span> to the world?
          </p>
        </div>

        {/* Custom Date Range */}
        <div className="mb-6 animate-slide-up">
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                <Calendar className="w-4 h-4 mr-2" />
                {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50 bg-card" align="start">
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
                <div className="flex gap-2 pt-2 border-t border-border">
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

        {/* Performance Chart */}
        <div className="mb-6 p-4 rounded-xl bg-card border border-border animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-semibold mb-4">Performance Overview</h2>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(24 100% 62%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(24 100% 62%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                width={40}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="hsl(24 100% 62%)"
                strokeWidth={2}
                fill="url(#viewsGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {metrics.map((metric) => (
            <div key={metric.label} className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold">{metric.value}</span>
                <span className={`text-xs flex items-center gap-1 ${metric.positive ? "text-green-400" : "text-red-400"}`}>
                  {metric.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Cards */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
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

        {/* Best Times to Post */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold">Best Times to Post</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your audience activity and engagement patterns.
            </p>
          </div>
          <div className="space-y-3">
            {bestTimes.slice(0, 3).map((day) => (
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
        </div>

        {/* Insights */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-lg font-semibold mb-4">Insights</h2>
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

        {/* Growth Summary */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold mb-1">Your Growth This Week</p>
              <p className="text-sm text-muted-foreground">
                You're up <span className="text-green-400 font-medium">23%</span> in engagement compared to last week. Keep posting behind-the-scenes content!
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
