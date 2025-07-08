import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import { auth } from "@/lib/auth";
import { getUserAiGenerationsCount } from "@/lib/aiGenerations";
import { AiGenerationsCountProvider } from "../AiGenerationsCountProvider";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const noOfAiGenerations = await getUserAiGenerationsCount(userId);
  // console.log("No of AI generations:", noOfAiGenerations);

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return (
    <AiGenerationsCountProvider noOfAiGenerations={noOfAiGenerations}>
      <ResumeEditor resumeToEdit={resumeToEdit} />
    </AiGenerationsCountProvider>
  );
}
