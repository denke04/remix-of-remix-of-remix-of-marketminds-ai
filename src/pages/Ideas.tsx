import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Sparkles, Video, Image, LayoutGrid, Megaphone, BookOpen, Plus, RefreshCw, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { CampaignPlanner } from "@/components/CampaignPlanner";
import { api, ApiError } from "@/lib/api";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const categories = [
  { id: "all", label: "All Ideas", icon: Sparkles },
  { id: "reels", label: "Reels", icon: Video },
  { id: "stories", label: "Stories", icon: Image },
  { id: "carousel", label: "Carousel", icon: LayoutGrid },
  { id: "promo", label: "Promotional", icon: Megaphone },
  { id: "educational", label: "Educational", icon: BookOpen },
];

const tabs = ["Ideas", "Campaigns"];

const Ideas = () => {
  const { userData } = useUser();
  const [activeTab, setActiveTab] = useState("Ideas");
  const [activeCategory, setActiveCategory] = useState("all");
  const [ideas, setIdeas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateIdeas = async () => {
    setIsLoading(true);
    
    try {
      const response = await api.generateIdeas({
        industry: userData.industry || userData.businessDescription || "business",
        goals: userData.goals || [],
        platforms: userData.platforms || [],
      });
      
      setIdeas(response.ideas);
      toast.success("New ideas generated!");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to generate ideas");
      }
      console.error("Generate ideas error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredIdeas = activeCategory === "all" 
    ? ideas 
    : ideas.filter(idea => idea.type === activeCategory);

  return (
    <AppLayout>
      <div className="min-h-screen px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Content Ideas</h1>
            <p className="text-muted-foreground text-sm">
              AI-generated ideas for your business
            </p>
          </div>
          <Button variant="glass" size="icon" onClick={generateIdeas} disabled={isLoading}>
            <RefreshCw className={cn("w-5 h-5", isLoading && "animate-spin")} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2",
                activeTab === tab
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card border border-border"
              )}
            >
              {tab === "Campaigns" && <Target className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Ideas" && (
          <>
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300",
                    activeCategory === cat.id
                      ? "gradient-primary text-primary-foreground"
                      : "bg-card border border-border hover:border-primary/50"
                  )}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Ideas Grid */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Generating ideas...</p>
                </div>
              ) : filteredIdeas.length > 0 ? (
                filteredIdeas.map((idea) => (
                  <div 
                    key={idea.id}
                    className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary uppercase bg-primary/10 px-2 py-1 rounded-md">
                          {idea.type}
                        </span>
                        {idea.trending && (
                          <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-md flex items-center gap-1">
                            🔥 Trending
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg mb-3">{idea.title}</h3>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-primary font-medium min-w-[60px]">Hook:</span>
                        <span className="text-muted-foreground">{idea.hook}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-primary font-medium min-w-[60px]">Flow:</span>
                        <span className="text-muted-foreground">{idea.structure}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-primary font-medium min-w-[60px]">CTA:</span>
                        <span className="text-muted-foreground">{idea.cta}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="gradient" size="sm" className="flex-1">
                        Use This Idea
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No ideas yet. Click the refresh button to generate!</p>
                  <Button variant="gradient" onClick={generateIdeas}>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Ideas
                  </Button>
                </div>
              )}
            </div>

            {/* Generate More */}
            {filteredIdeas.length > 0 && (
              <Button variant="outline" size="lg" className="w-full mt-6" onClick={generateIdeas} disabled={isLoading}>
                <RefreshCw className={cn("w-5 h-5 mr-2", isLoading && "animate-spin")} />
                {isLoading ? "Generating..." : "Generate More Ideas"}
              </Button>
            )}
          </>
        )}

        {activeTab === "Campaigns" && (
          <div>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-semibold">Campaign Planner</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Create targeted campaigns based on your audience demographics, location, and budget.
              </p>
            </div>
            <CampaignPlanner />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Ideas;
