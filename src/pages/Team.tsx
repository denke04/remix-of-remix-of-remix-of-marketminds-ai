import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Users } from "lucide-react";
import { TeamMarketplace } from "@/components/TeamMarketplace";

const Team = () => {
  const [workType, setWorkType] = useState("All");

  return (
    <AppLayout>
      <div className="min-h-screen px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Team</h1>
          <p className="text-muted-foreground">
            Find skilled freelancers to boost your marketing
          </p>
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-semibold">Build Your Team</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Hire photographers, designers, video editors, and marketing specialists to help improve your content quality and performance.
          </p>
        </div>

        {/* Marketplace */}
        <TeamMarketplace selectedWorkType={workType} onWorkTypeChange={setWorkType} />
      </div>
    </AppLayout>
  );
};

export default Team;
