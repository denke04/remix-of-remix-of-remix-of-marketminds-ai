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
  typographyFiles: string[];
  website: string;
  socialLinks: string[];
  productImages: string[];
}

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
    colors: [],
    typographyFiles: [],
    website: "",
    socialLinks: [],
    productImages: [],
  });
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState("post");
  const [newColorCode, setNewColorCode] = useState("");
  const [colorError, setColorError] = useState("");

  const isValidColorCode = (color: string): boolean => {
    // HEX validation
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    // RGB validation
    const rgbPattern = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    // RGBA validation
    const rgbaPattern = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;
    // HSL validation
    const hslPattern = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
    
    return hexPattern.test(color) || rgbPattern.test(color) || rgbaPattern.test(color) || hslPattern.test(color);
  };

  const addColor = () => {
    const trimmedColor = newColorCode.trim();
    if (!trimmedColor) {
      setColorError("Please enter a color code");
      return;
    }
    if (!isValidColorCode(trimmedColor)) {
      setColorError("Invalid format. Use HEX (#FF5C7A), RGB, or HSL");
      return;
    }
    if (brandProfile.colors.includes(trimmedColor)) {
      setColorError("This color is already added");
      return;
    }
    setColorError("");
    setBrandProfile(prev => ({
      ...prev,
      colors: [...prev.colors, trimmedColor]
    }));
    setNewColorCode("");
  };

  const handleTypographyUpload = () => {
    // Simulate typography file upload
    const newFile = `typography-${brandProfile.typographyFiles.length + 1}.png`;
    setBrandProfile(prev => ({
      ...prev,
      typographyFiles: [...prev.typographyFiles, newFile]
    }));
  };

  const removeTypographyFile = (file: string) => {
    setBrandProfile(prev => ({
      ...prev,
      typographyFiles: prev.typographyFiles.filter(f => f !== file)
    }));
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

            {/* Brand Colors - Code-based input */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Brand Colors</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Enter exact color codes (HEX, RGB, or HSL) for precise brand matching
              </p>
              
              {/* Added Colors */}
              {brandProfile.colors.length > 0 && (
                <div className="space-y-2 mb-4">
                  {brandProfile.colors.map((color) => (
                    <div
                      key={color}
                      className="flex items-center gap-3 p-2 rounded-lg bg-background border border-border"
                    >
                      <div
                        className="w-8 h-8 rounded-md border border-border flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <code className="flex-1 text-sm font-mono text-foreground">{color}</code>
                      <button
                        onClick={() => removeColor(color)}
                        className="w-6 h-6 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Add new color input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="#FF5C7A or rgb(255, 92, 122)"
                    value={newColorCode}
                    onChange={(e) => {
                      setNewColorCode(e.target.value);
                      setColorError("");
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && addColor()}
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={addColor}
                    className="flex-shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {colorError && (
                  <p className="text-xs text-destructive">{colorError}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Supported formats: #HEX, rgb(), rgba(), hsl()
                </p>
              </div>
            </div>

            {/* Typography - Upload based */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-bold text-lg">Aa</span>
                <h3 className="font-semibold">Typography</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Upload images of your brand typography, font files, or brand guidelines
              </p>
              
              {/* Uploaded typography files */}
              {brandProfile.typographyFiles.length > 0 && (
                <div className="space-y-2 mb-4">
                  {brandProfile.typographyFiles.map((file) => (
                    <div
                      key={file}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border"
                    >
                      <FileImage className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="flex-1 text-sm truncate">{file}</span>
                      <button
                        onClick={() => removeTypographyFile(file)}
                        className="w-6 h-6 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Upload button */}
              <button
                onClick={handleTypographyUpload}
                className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-2"
              >
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload typography sample</span>
                <span className="text-xs text-muted-foreground/70">
                  PNG, JPG, PDF, TTF, OTF, WOFF
                </span>
              </button>
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
              disabled={!brandProfile.logo || brandProfile.colors.length < 1}
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
