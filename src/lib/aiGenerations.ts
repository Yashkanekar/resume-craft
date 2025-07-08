import prisma from "./prisma";

export const getUserAiGenerationsCount = async (
  userId: string,
): Promise<number> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("User not found");

  return user.aiGenerationCount;
};
