import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Settings2, Video, Image, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const scheduledPosts = [
  {
    id: 1,
    title: "Coffee Art Reel",
    platform: "instagram",
    type: "video",
    time: "9:00 AM",
    status: "scheduled",
    day: 1,
  },
  {
    id: 2,
    title: "Behind the Scenes",
    platform: "tiktok",
    type: "video",
    time: "2:00 PM",
    status: "scheduled",
    day: 1,
  },
  {
    id: 3,
    title: "New Menu Carousel",
    platform: "instagram",
    type: "image",
    time: "11:00 AM",
    status: "draft",
    day: 3,
  },
  {
    id: 4,
    title: "Customer Story",
    platform: "facebook",
    type: "video",
    time: "4:00 PM",
    status: "scheduled",
    day: 5,
  },
];

const autoScheduleRules = [
  { label: "Post Reels Mon/Wed/Fri", enabled: true },
  { label: "Stories daily at 10 AM", enabled: true },
  { label: "Avoid weekends", enabled: false },
];

const Schedule = () => {
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const [selectedDay, setSelectedDay] = useState(1);

  const dayPosts = scheduledPosts.filter(post => post.day === selectedDay);

  return (
    <AppLayout>
      <div className="min-h-screen px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Schedule</h1>
            <p className="text-muted-foreground text-sm">
              Plan and schedule your content
            </p>
          </div>
          <Button variant="gradient" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            New Post
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode("weekly")}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              viewMode === "weekly"
                ? "gradient-primary text-primary-foreground"
                : "bg-card border border-border"
            )}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              viewMode === "monthly"
                ? "gradient-primary text-primary-foreground"
                : "bg-card border border-border"
            )}
          >
            Monthly
          </button>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold">Jan 20 - Jan 26</span>
          <button className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekDays.map((day, i) => {
            const dayNumber = i + 1;
            const hasPosts = scheduledPosts.some(post => post.day === dayNumber);
            const isSelected = selectedDay === dayNumber;
            
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(dayNumber)}
                className={cn(
                  "flex flex-col items-center py-3 rounded-xl transition-all duration-300",
                  isSelected
                    ? "gradient-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50"
                )}
              >
                <span className="text-xs text-inherit opacity-70">{day}</span>
                <span className="text-lg font-semibold">{20 + i}</span>
                {hasPosts && (
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1",
                    isSelected ? "bg-white" : "bg-primary"
                  )} />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Day Posts */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {weekDays[selectedDay - 1]}, Jan {20 + selectedDay - 1}
          </h2>
          
          {dayPosts.length > 0 ? (
            <div className="space-y-3">
              {dayPosts.map((post) => (
                <div 
                  key={post.id}
                  className="p-4 rounded-xl bg-card border border-border flex items-center gap-4"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    post.platform === "instagram" && "bg-gradient-to-br from-purple-500 to-pink-500",
                    post.platform === "tiktok" && "bg-gradient-to-br from-cyan-400 to-pink-500",
                    post.platform === "facebook" && "bg-gradient-to-br from-blue-600 to-blue-700"
                  )}>
                    {post.type === "video" ? (
                      <Video className="w-5 h-5 text-white" />
                    ) : (
                      <Image className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{post.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        post.status === "scheduled" 
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      )}>
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-card border border-dashed border-border text-center">
              <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">No posts scheduled</p>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Schedule Post
              </Button>
            </div>
          )}
        </div>

        {/* Auto-Schedule Rules */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" />
              <span className="font-semibold">Auto-Schedule Rules</span>
            </div>
          </div>
          <div className="space-y-3">
            {autoScheduleRules.map((rule) => (
              <div key={rule.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{rule.label}</span>
                <button
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative",
                    rule.enabled ? "gradient-primary" : "bg-muted"
                  )}
                >
                  <span 
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                      rule.enabled ? "right-1" : "left-1"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Best Times */}
        <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/30">
          <p className="text-sm font-medium mb-1">💡 Best Times to Post</p>
          <p className="text-xs text-muted-foreground">
            Based on your audience: <strong className="text-foreground">9-11 AM</strong> and <strong className="text-foreground">7-9 PM</strong> get the most engagement
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Schedule;
