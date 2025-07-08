import { useToast } from "@/hooks/use-toast";

import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";
import LoadingButton from "@/components/LoadingButton";
import { useAiGenerationsCount } from "../../AiGenerationsCountProvider";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();
  const { aiGenerationsCount, setAiGenerationsCount } = useAiGenerationsCount();
  // console.log(
  //   "No of AI generations: inside the button generate summary",
  //   aiGenerationsCount,
  // );

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (aiGenerationsCount >= 20) {
      toast({
        variant: "destructive",
        description: "You've reached your AI generation limit.",
      });
      return;
    }
    setAiGenerationsCount((prevCount: number): number => prevCount + 1);

    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      setAiGenerationsCount((prevCount) => prevCount - 1);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LoadingButton
        variant="ai"
        type="button"
        onClick={handleClick}
        loading={loading}
      >
        <WandSparklesIcon className="size-4" />
        Auto Generate Using AI
      </LoadingButton>
      <p className="mt-2 text-xs text-muted-foreground">
        You have used {aiGenerationsCount} out of 20 AI generations.
        <br />
        After 20 generations, auto generation using AI will be disabled.
      </p>
    </>
  );
}
