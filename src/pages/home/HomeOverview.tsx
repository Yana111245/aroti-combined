import { useState } from "react";
import { DaySelector } from "@/components/home/DaySelector";
import { Calendar, Sparkles, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TabBar } from "@/components/navigation/TabBar";

const HomeOverview = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<"yesterday" | "today" | "tomorrow">("today");

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Day Selector */}
      <DaySelector selectedDay={selectedDay} onDayChange={setSelectedDay} />

      {/* Header Section */}
      <div className="px-6 py-8 space-y-4">
        <p className="text-sm text-muted-foreground">Hi Yana, it&apos;s cycle day 53</p>
        
        <h1 className="font-serif text-4xl">
          Today&apos;s Energy
        </h1>
        
        <p className="text-accent font-medium">
          A day of new beginnings and clarity
        </p>
      </div>

      {/* Content Sections */}
      <div className="flex-1 px-6 pb-24 space-y-4">
        {/* Daily Reading Card */}
        <button 
          onClick={() => navigate("/home/daily-insight-pre")}
          className="glass-card w-full p-6 text-left hover:scale-[1.01] transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-secondary to-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Daily Insight</h3>
              <p className="text-sm text-muted-foreground">
                Your card is ready to reveal
              </p>
            </div>
            <div className="text-accent text-sm font-medium">
              View
            </div>
          </div>
        </button>

        {/* Reflection Summary */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-terracotta" />
            <h3 className="font-semibold">Today&apos;s Reflection</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Focus on balance and inner peace. The universe encourages you to trust your intuition and embrace new opportunities with an open heart.
          </p>
        </div>

        {/* Energy Insights Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Energy Level</p>
              <p className="font-semibold text-lg">High</p>
            </div>
          </div>

          <div className="glass-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Moon Phase</p>
              <p className="font-semibold text-lg">Waxing</p>
            </div>
          </div>
        </div>

        {/* Quote of the Day */}
        <div className="glass-card p-8 text-center space-y-3">
          <p className="text-xs text-muted-foreground">Quote of the day</p>
          <p className="font-serif text-xl text-accent leading-relaxed">
            Every phase of your journey is an opportunity for growth and transformation.
          </p>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default HomeOverview;
