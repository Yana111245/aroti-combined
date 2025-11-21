import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, Check } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { Switch } from "@/components/ui/switch";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "ru", name: "Russian" },
];

export default function Language() {
  const navigate = useNavigate();
  const [matchDevice, setMatchDevice] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageSelect = (code: string) => {
    if (!matchDevice) {
      setSelectedLanguage(code);
    }
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Language"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-4">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Language settings">
          {/* Match Device Language Toggle */}
          <BaseCard className="p-5 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-subhead font-medium text-foreground">Match device language</p>
                </div>
              </div>
              <Switch 
                checked={matchDevice}
                onCheckedChange={setMatchDevice}
              />
            </div>
          </BaseCard>

          {/* App Language List */}
          <BaseCard className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 text-accent" />
              <h2 className="text-headline font-semibold text-foreground">App Language</h2>
            </div>
            
            <div className="space-y-2">
              {languages.map((language) => {
                const isSelected = selectedLanguage === language.code;
                const isDisabled = matchDevice;
                
                return (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    disabled={isDisabled}
                    className={`w-full flex items-center justify-between p-3 rounded-[10px] transition-all ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-white/5 cursor-pointer"
                    } ${
                      isSelected && !isDisabled
                        ? "bg-accent/10 border border-accent/30"
                        : "border border-transparent"
                    }`}
                  >
                    <span className="text-body text-foreground">{language.name}</span>
                    {isSelected && !isDisabled && (
                      <Check className="h-5 w-5 text-accent" />
                    )}
                  </button>
                );
              })}
            </div>
          </BaseCard>
        </main>
      </div>
    </PageWrapper>
  );
}

