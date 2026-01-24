import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Upload, Link, Image, Video, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "instagram", label: "Instagram", active: true },
  { id: "tiktok", label: "TikTok", active: false },
  { id: "youtube", label: "Shorts", active: false },
  { id: "facebook", label: "Facebook", active: false },
];

const platformTips: Record<string, { good: string[]; issues: string[]; tips: string[] }> = {
  instagram: {
    good: [
      "Strong visual composition",
      "Good use of natural lighting",
      "Clear product focus",
    ],
    issues: [
      "Hook takes too long — first 2 seconds should grab attention",
      "Caption lacks a clear CTA",
      "Hashtags could be more targeted",
    ],
    tips: [
      "Use visual storytelling with concise captions",
      "Add 'Link in bio' or 'DM us' as CTA",
      "Use 15-20 niche-specific hashtags",
    ],
  },
  tiktok: {
    good: [
      "Great energy and authenticity",
      "Trending audio potential",
      "Good vertical framing",
    ],
    issues: [
      "Hook needs to be in the first 0.5 seconds",
      "Pacing could be faster to match platform style",
      "Missing text overlays for silent viewers",
    ],
    tips: [
      "Start with your most eye-catching moment immediately",
      "Speed up cuts — TikTok users scroll fast",
      "Add captions/text overlays for 80% who watch on mute",
    ],
  },
  youtube: {
    good: [
      "Good thumbnail potential",
      "Clear subject focus",
      "Appropriate length for Shorts",
    ],
    issues: [
      "Opening could be more engaging",
      "Missing subscribe CTA",
      "Audio could be clearer",
    ],
    tips: [
      "Hook viewers in first 3 seconds with a question or promise",
      "Include a verbal subscribe reminder",
      "Use trending Shorts sounds when relevant",
    ],
  },
  facebook: {
    good: [
      "Good context and storytelling",
      "Shareable content format",
      "Appropriate for older demographics",
    ],
    issues: [
      "Caption is too short — Facebook users engage with longer posts",
      "Missing context about the story behind the content",
      "No question to encourage comments",
    ],
    tips: [
      "Write longer, more informative captions (150-300 words work well)",
      "Include background story and context",
      "End with a question to boost engagement",
    ],
  },
};

const Analyze = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [uploadType, setUploadType] = useState<"upload" | "link" | null>(null);
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [contentType, setContentType] = useState<"photo" | "video">("photo");

  const analysisResult = {
    score: 72,
    ...platformTips[selectedPlatform],
  };

  const handleAnalyze = () => {
    setHasAnalysis(true);
  };

  return (
    <AppLayout>
      <div className="min-h-screen px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Content Analyzer</h1>
          <p className="text-muted-foreground">
            Upload planned content to receive AI feedback on quality, clarity, and performance potential.
          </p>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">Select Platform</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => {
                  setSelectedPlatform(platform.id);
                  if (hasAnalysis) setHasAnalysis(false);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300",
                  selectedPlatform === platform.id
                    ? "gradient-primary text-primary-foreground glow-subtle"
                    : "bg-card border border-border hover:border-primary/50"
                )}
              >
                {platform.label}
              </button>
            ))}
          </div>
        </div>

        {!hasAnalysis ? (
          <>
            {/* Upload Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setUploadType("upload")}
                className={cn(
                  "p-6 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center gap-3",
                  uploadType === "upload"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Upload className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">Upload File</span>
              </button>
              <button
                onClick={() => setUploadType("link")}
                className={cn(
                  "p-6 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center gap-3",
                  uploadType === "link"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Link className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">Paste Link</span>
              </button>
            </div>

            {/* Content Type */}
            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-3">Content Type</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setContentType("photo")}
                  className={cn(
                    "flex-1 p-4 rounded-xl bg-card border flex items-center justify-center gap-2 transition-colors",
                    contentType === "photo" ? "border-primary/50" : "border-border hover:border-primary/50"
                  )}
                >
                  <Image className={cn("w-5 h-5", contentType === "photo" ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", contentType === "photo" ? "" : "text-muted-foreground")}>Photo</span>
                </button>
                <button 
                  onClick={() => setContentType("video")}
                  className={cn(
                    "flex-1 p-4 rounded-xl bg-card border flex items-center justify-center gap-2 transition-colors",
                    contentType === "video" ? "border-primary/50" : "border-border hover:border-primary/50"
                  )}
                >
                  <Video className={cn("w-5 h-5", contentType === "video" ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", contentType === "video" ? "" : "text-muted-foreground")}>Video</span>
                </button>
              </div>
            </div>

            {/* Upload Area */}
            <div className="mb-8 p-8 rounded-2xl border-2 border-dashed border-border bg-card/50 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium mb-1">Drop your file here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>

            {/* Analyze Button */}
            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full"
              onClick={handleAnalyze}
            >
              Analyze Content
            </Button>
          </>
        ) : (
          /* Analysis Results */
          <div className="space-y-6 animate-fade-in">
            {/* Platform Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-primary uppercase bg-primary/10 px-2 py-1 rounded-md">
                {selectedPlatform} Optimized Analysis
              </span>
            </div>

            {/* Score */}
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${analysisResult.score * 2.51} 251`}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(24 100% 62%)" />
                      <stop offset="100%" stopColor="hsl(350 100% 68%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{analysisResult.score}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Performance Score for {platforms.find(p => p.id === selectedPlatform)?.label}</p>
            </div>

            {/* What's Good */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold">What's Working</span>
              </div>
              <ul className="space-y-2">
                {analysisResult.good.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Issues */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="font-semibold">What Needs Work</span>
              </div>
              <ul className="space-y-2">
                {analysisResult.issues.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl bg-card border border-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-primary" />
                <span className="font-semibold">How to Fix for {platforms.find(p => p.id === selectedPlatform)?.label}</span>
              </div>
              <ul className="space-y-2">
                {analysisResult.tips.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="gradient-text mt-1">{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => setHasAnalysis(false)}
            >
              Analyze Another
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Analyze;
