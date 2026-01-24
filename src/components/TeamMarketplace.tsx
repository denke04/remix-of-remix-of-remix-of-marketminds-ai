import { Star, Camera, Palette, Globe, Video, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const freelancers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Photographer",
    icon: Camera,
    rating: 4.9,
    reviews: 127,
    rate: "$50/hr",
    available: true,
    skills: ["Product Photography", "Lifestyle", "Food"],
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Graphic Designer",
    icon: Palette,
    rating: 4.8,
    reviews: 94,
    rate: "$45/hr",
    available: true,
    skills: ["Social Media Graphics", "Branding", "Ads"],
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Video Editor",
    icon: Video,
    rating: 5.0,
    reviews: 156,
    rate: "$60/hr",
    available: false,
    skills: ["Reels", "TikTok", "YouTube Shorts"],
  },
  {
    id: 4,
    name: "David Park",
    role: "Web Designer",
    icon: Globe,
    rating: 4.7,
    reviews: 82,
    rate: "$55/hr",
    available: true,
    skills: ["Landing Pages", "E-commerce", "UI/UX"],
  },
  {
    id: 5,
    name: "Lisa Martinez",
    role: "Content Writer",
    icon: PenTool,
    rating: 4.9,
    reviews: 203,
    rate: "$40/hr",
    available: true,
    skills: ["Captions", "Blog Posts", "Ad Copy"],
  },
];

const workTypes = ["All", "One-time", "Ongoing"];

interface TeamMarketplaceProps {
  selectedWorkType?: string;
  onWorkTypeChange?: (type: string) => void;
}

export const TeamMarketplace = ({ 
  selectedWorkType = "All",
  onWorkTypeChange 
}: TeamMarketplaceProps) => {
  return (
    <div className="space-y-4">
      {/* Work Type Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {workTypes.map((type) => (
          <button
            key={type}
            onClick={() => onWorkTypeChange?.(type)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300",
              selectedWorkType === type
                ? "gradient-primary text-primary-foreground"
                : "bg-card border border-border hover:border-primary/50"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Freelancer Cards */}
      <div className="space-y-3">
        {freelancers.map((freelancer) => (
          <div
            key={freelancer.id}
            className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <freelancer.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{freelancer.name}</h3>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      freelancer.available
                        ? "bg-green-500/20 text-green-400"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {freelancer.available ? "Available" : "Busy"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {freelancer.role} • {freelancer.rate}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{freelancer.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({freelancer.reviews} reviews)
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="gradient" size="sm" className="flex-1">
                Hire Now
              </Button>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
