import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Sparkles, Video, Image, LayoutGrid, Megaphone, BookOpen, Plus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Ideas", icon: Sparkles },
  { id: "reels", label: "Reels", icon: Video },
  { id: "stories", label: "Stories", icon: Image },
  { id: "carousel", label: "Carousel", icon: LayoutGrid },
  { id: "promo", label: "Promotional", icon: Megaphone },
  { id: "educational", label: "Educational", icon: BookOpen },
];

const ideas = [
  {
    id: 1,
    type: "reels",
    title: "Behind-the-scenes coffee making",
    hook: "\"Watch me make the perfect latte in 60 seconds\"",
    structure: "Show process → Close-up of art → Reveal final drink",
    cta: "\"Double tap if you'd try this!\"",
    trending: true,
  },
  {
    id: 2,
    type: "carousel",
    title: "5 Coffee Facts Your Customers Don't Know",
    hook: "\"Think you know coffee? Think again 👀\"",
    structure: "1 fact per slide with visual → End with CTA",
    cta: "\"Save this for later!\"",
    trending: false,
  },
  {
    id: 3,
    type: "stories",
    title: "This or That: Coffee Edition",
    hook: "Interactive poll stories",
    structure: "Espresso vs Americano → Latte vs Cappuccino → Vote results",
    cta: "\"DM us your favorite!\"",
    trending: true,
  },
  {
    id: 4,
    type: "promo",
    title: "Flash Sale Announcement",
    hook: "\"24 hours only ⏰\"",
    structure: "Urgency → Offer details → How to redeem",
    cta: "\"Link in bio to order!\"",
    trending: false,
  },
];

const Ideas = () => {
  const [activeCategory, setActiveCategory] = useState("all");

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
          <Button variant="glass" size="icon">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>

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
          {filteredIdeas.map((idea) => (
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
          ))}
        </div>

        {/* Generate More */}
        <Button variant="outline" size="lg" className="w-full mt-6">
          <RefreshCw className="w-5 h-5 mr-2" />
          Generate More Ideas
        </Button>
      </div>
    </AppLayout>
  );
};

export default Ideas;
