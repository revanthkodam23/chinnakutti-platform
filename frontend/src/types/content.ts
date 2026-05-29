export type SupportedContentKind = "story" | "rhyme" | "worksheet";

export type AiStoryGenerationRequest = {
  prompt: string;
  ageGroupId?: string;
  languageCodes: string[];
  categoryId?: string;
  difficultyLevel?: 1 | 2 | 3 | 4;
};

export type AudioNarrationRequest = {
  storyId: string;
  languageCode: string;
  voiceId?: string;
};
