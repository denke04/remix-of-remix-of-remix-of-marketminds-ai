import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Scan, CalendarDays, BarChart3, Sparkles, TrendingUp, AlertCircle, ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickActions = [
  { icon: Scan, label: "Analyze Content", path: "/analyze" },
  { icon: Sparkles, label: "Content Plan", path: "/ideas" },
  { icon: CalendarDays, label: "Schedule Posts", path: "/schedule" },
  { icon: BarChart3, label: "View Performance", path: "/performance" },
];

const insights = [
  { 
    icon: TrendingUp, 
    title: "Trending in Cafes", 
    desc: "Behind-the-scenes content is getting 3x more engagement",
    type: "trend" 
  },
  { 
    icon: Sparkles, 
    title: "Content Tip", 
    desc: "Short-form videos under 30s perform best for your industry",
    type: "tip" 
  },
  { 
    icon: AlertCircle, 
    title: "Improve Next", 
    desc: "Your captions could use stronger CTAs",
    type: "warning" 
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="min-h-screen px-4 py-6 pb-24">
        {/* Ambient glow */}
        <div className="fixed top-0 right-0 w-[400px] h-[400px] gradient-primary opacity-5 blur-[120px] rounded-full pointer-events-none" />

        {/* Greeting */}
        <div className="mb-8 animate-fade-in">
          <p className="text-muted-foreground mb-1">Good morning,</p>
          <h1 className="text-2xl font-bold">
            Alex <span className="text-2xl">👋</span>
          </h1>
          <p className="text-secondary mt-1">
            Ready to boost <span className="font-semibold text-foreground">Studio Bloom's</span> marketing today?
          </p>
        </div>

        {/* Featured Card */}
        <div 
          className="relative rounded-2xl overflow-hidden mb-6 animate-slide-up cursor-pointer group"
          style={{ animationDelay: "0.1s" }}
          onClick={() => navigate("/analyze")}
        >
          <div className="absolute inset-0 gradient-primary opacity-20" />
          <div className="relative p-5 bg-card/80 backdrop-blur-sm border border-primary/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-medium text-primary mb-1 block">RECOMMENDATION</span>
                <h3 className="font-semibold text-lg">Analyze your latest post</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Get AI feedback on how to improve your content
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scan className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <Button variant="gradient" size="sm" className="mt-2">
              Start Analysis
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 flex flex-col items-start gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Insights */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-lg font-semibold mb-4">Today's Insights</h2>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={insight.title}
                className="p-4 rounded-xl bg-card border border-border flex items-start gap-4"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  insight.type === 'trend' ? 'bg-green-500/20 text-green-400' :
                  insight.type === 'tip' ? 'bg-primary/20 text-primary' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Progress */}
        <div className="mt-8 p-4 rounded-xl bg-card border border-border animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Setup Progress</span>
            <span className="text-sm text-primary">60%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-3/5 gradient-primary rounded-full" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Connect your first platform to get started
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
