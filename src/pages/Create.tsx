import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Palette, 
  Upload, 
  Globe, 
  Instagram, 
  Image, 
  FileImage, 
  Sparkles,
  Check,
  Plus,
  X,
  Megaphone,
  LayoutGrid,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandProfile {
  logo: string | null;
  colors: string[];
  fonts: { primary: string; secondary: string };
  website: string;
  socialLinks: string[];
  productImages: string[];
}

const defaultColors = ["#FF8A3D", "#FF5C7A", "#171A21", "#FFFFFF", "#9CA3AF"];
const fontOptions = ["Inter", "Poppins", "Montserrat", "Playfair Display", "Roboto", "Open Sans"];

const contentTypes = [
  { id: "post", label: "Social Post", icon: Image, description: "Square format for feeds" },
  { id: "story", label: "Story", icon: Video, description: "Vertical 9:16 format" },
  { id: "flyer", label: "Flyer", icon: FileImage, description: "Promotional materials" },
  { id: "carousel", label: "Carousel", icon: LayoutGrid, description: "Multi-slide content" },
  { id: "ad", label: "Ad Creative", icon: Megaphone, description: "Paid campaign visuals" },
];

const generatedContent = [
  {
    id: 1,
    type: "post",
    title: "Product Highlight",
    preview: "gradient-primary",
    status: "ready",
  },
  {
    id: 2,
    type: "story",
    title: "Behind the Scenes",
    preview: "bg-gradient-to-br from-pink-500 to-orange-400",
    status: "ready",
  },
  {
    id: 3,
    type: "flyer",
    title: "Weekend Sale",
    preview: "bg-gradient-to-br from-purple-500 to-pink-500",
    status: "ready",
  },
];

const Create = () => {
  const [brandProfile, setBrandProfile] = useState<BrandProfile>({
    logo: null,
    colors: defaultColors.slice(0, 3),
    fonts: { primary: "Inter", secondary: "Poppins" },
    website: "",
    socialLinks: [],
    productImages: [],
  });
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState("post");
  const [newColor, setNewColor] = useState("#FF8A3D");

  const addColor = () => {
    if (brandProfile.colors.length < 5 && !brandProfile.colors.includes(newColor)) {
      setBrandProfile(prev => ({
        ...prev,
        colors: [...prev.colors, newColor]
      }));
    }
  };

  const removeColor = (color: string) => {
    setBrandProfile(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const handleLogoUpload = () => {
    // Simulate logo upload
    setBrandProfile(prev => ({ ...prev, logo: "uploaded" }));
  };

  const handleSetupComplete = () => {
    setIsSetupComplete(true);
  };

  if (!isSetupComplete) {
    return (
      <AppLayout>
        <div className="min-h-screen px-4 py-6 pb-24">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Create</h1>
            <p className="text-muted-foreground text-sm">
              Set up your brand to generate consistent content
            </p>
          </div>

          {/* Brand Setup */}
          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Brand Logo</h3>
              </div>
              
              <button
                onClick={handleLogoUpload}
                className={cn(
                  "w-full h-32 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2",
                  brandProfile.logo
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                {brandProfile.logo ? (
                  <>
                    <Check className="w-8 h-8 text-primary" />
                    <span className="text-sm text-primary">Logo uploaded</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Tap to upload logo</span>
                  </>
                )}
              </button>
            </div>

            {/* Brand Colors */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Brand Colors</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {brandProfile.colors.map((color) => (
                  <div
                    key={color}
                    className="relative group"
                  >
                    <div
                      className="w-12 h-12 rounded-lg border border-border"
                      style={{ backgroundColor: color }}
                    />
                    <button
                      onClick={() => removeColor(color)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {brandProfile.colors.length < 5 && (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <button
                      onClick={addColor}
                      className="w-12 h-12 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center transition-all"
                    >
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Typography */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary font-bold text-lg">Aa</span>
                <h3 className="font-semibold">Typography</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Primary Font</label>
                  <select
                    value={brandProfile.fonts.primary}
                    onChange={(e) => setBrandProfile(prev => ({
                      ...prev,
                      fonts: { ...prev.fonts, primary: e.target.value }
                    }))}
                    className="w-full p-2 rounded-lg bg-background border border-border"
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Secondary Font</label>
                  <select
                    value={brandProfile.fonts.secondary}
                    onChange={(e) => setBrandProfile(prev => ({
                      ...prev,
                      fonts: { ...prev.fonts, secondary: e.target.value }
                    }))}
                    className="w-full p-2 rounded-lg bg-background border border-border"
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Website & Social Links */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Links (Optional)</h3>
              </div>
              
              <div className="space-y-3">
                <Input
                  placeholder="Website URL"
                  value={brandProfile.website}
                  onChange={(e) => setBrandProfile(prev => ({ ...prev, website: e.target.value }))}
                />
                <Input
                  placeholder="Instagram handle"
                />
                <Input
                  placeholder="TikTok handle"
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Image className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Product Images (Optional)</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center transition-all"
                  >
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full"
              onClick={handleSetupComplete}
              disabled={!brandProfile.logo || brandProfile.colors.length < 2}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Save Brand & Start Creating
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Create</h1>
            <p className="text-muted-foreground text-sm">
              Generate on-brand content
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsSetupComplete(false)}>
            Edit Brand
          </Button>
        </div>

        {/* Brand Preview */}
        <div className="p-4 rounded-xl bg-card border border-border mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <span className="font-semibold">Brand Ready</span>
              <div className="flex gap-1 mt-1">
                {brandProfile.colors.map(color => (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">What do you want to create?</h3>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedContentType(type.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                  selectedContentType === type.id
                    ? "gradient-primary text-white"
                    : "bg-card border border-border hover:border-primary/50"
                )}
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button variant="gradient" size="lg" className="w-full mb-6">
          <Sparkles className="w-5 h-5 mr-2" />
          Generate {contentTypes.find(t => t.id === selectedContentType)?.label}
        </Button>

        {/* Generated Content */}
        <div>
          <h3 className="font-semibold mb-3">Recent Creations</h3>
          <div className="grid grid-cols-2 gap-3">
            {generatedContent.map((content) => (
              <div
                key={content.id}
                className="rounded-xl overflow-hidden border border-border"
              >
                <div className={cn("aspect-square", content.preview)} />
                <div className="p-3 bg-card">
                  <span className="text-xs text-primary uppercase font-medium">{content.type}</span>
                  <h4 className="font-medium text-sm mt-1">{content.title}</h4>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      Use
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
