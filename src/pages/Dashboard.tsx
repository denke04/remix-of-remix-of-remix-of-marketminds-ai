import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share2, ArrowRight, BarChart3, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";

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

const topPosts = [
  { title: "Coffee Art Reel", views: "8.2K", engagement: "12.4%", platform: "Instagram" },
  { title: "Behind the Scenes", views: "5.1K", engagement: "9.8%", platform: "TikTok" },
  { title: "New Menu Launch", views: "3.4K", engagement: "7.2%", platform: "Facebook" },
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
  const navigate = useNavigate();
  const { userData } = useUser();

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

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
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

        {/* Performance Chart */}
        <div className="mb-6 p-4 rounded-xl bg-card border border-border animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Weekly Performance</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/performance")}>
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
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

        {/* Top Performing Content */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="font-semibold mb-4">Top Performing Content</h2>
          <div className="space-y-3">
            {topPosts.map((post, index) => (
              <div
                key={post.title}
                className="p-4 rounded-xl bg-card border border-border flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.platform} • {post.views} views
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-green-400 text-sm font-medium">{post.engagement}</span>
                  <p className="text-xs text-muted-foreground">engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/performance")}
          >
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="text-sm">Full Analytics</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/schedule")}
          >
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm">Schedule Posts</span>
          </Button>
        </div>

        {/* Growth Summary */}
        <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30 animate-slide-up" style={{ animationDelay: "0.5s" }}>
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
