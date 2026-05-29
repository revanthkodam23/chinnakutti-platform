export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  countLabel: string;
};

export type Author = {
  name: string;
  role: string;
};

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: Author;
  coverImage: string;
  publishedAt: string;
  readingTimeMinutes: number;
  ageRange: string;
  emoji: string;
  color: string;
  featured?: boolean;
  tags: string[];
};

export type StorySummary = Omit<Story, "content">;
