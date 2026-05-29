import type { Category, Story } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "moral-stories",
    name: "Moral Stories",
    description: "Tiny life lessons wrapped in warm, funny tales.",
    icon: "📖",
    color: "#FF6B6B",
    countLabel: "24 Stories"
  },
  {
    slug: "rhymes",
    name: "Rhymes & Songs",
    description: "Catchy Telugu and English rhymes kids love to sing.",
    icon: "🎵",
    color: "#F59E0B",
    countLabel: "18 Rhymes"
  },
  {
    slug: "worksheets",
    name: "Worksheets",
    description: "Free printable learning sheets for little hands.",
    icon: "✏️",
    color: "#10B981",
    countLabel: "30 Sheets"
  },
  {
    slug: "puzzles",
    name: "Puzzles & Games",
    description: "Gentle brain games for curious young minds.",
    icon: "🧩",
    color: "#6366F1",
    countLabel: "12 Games"
  }
];

export const stories: Story[] = [
  {
    slug: "kind-elephant-little-mouse",
    title: "The Kind Elephant & The Little Mouse",
    excerpt:
      "A gentle forest tale about kindness, courage, and helping friends big and small.",
    content:
      "In a sunny forest, a little mouse found an elephant crying beside a mango tree. A thorn was stuck in the elephant's foot, and every step made him say, ouch!\n\nThe tiny mouse was not scared. She climbed carefully, pulled out the thorn, and smiled. The elephant trumpeted with joy and promised to help her whenever she needed a friend.\n\nA few days later, the mouse's kite got stuck on a tall branch. The elephant lifted his trunk, brought it down, and said, kindness always comes back with a happy song.",
    category: categories[0],
    author: {
      name: "Chinnakutti Team",
      role: "Story Makers"
    },
    coverImage: "",
    publishedAt: "2026-03-08",
    readingTimeMinutes: 4,
    ageRange: "3-8 yrs",
    emoji: "🐘",
    color: "#FF6B6B",
    featured: true,
    tags: ["kindness", "friendship", "animals"]
  },
  {
    slug: "lion-who-learned-to-share",
    title: "The Lion Who Learned to Share",
    excerpt:
      "A cheerful story about a hungry lion who discovers that snacks taste better with friends.",
    content:
      "Leo the lion found a basket full of sweet bananas, crunchy peanuts, and one shiny red apple. Mine, mine, mine, he roared, hugging the basket.\n\nSoon, his friends sat nearby with rumbling tummies. Leo looked at the big basket, then at their small smiles. He split the snacks into little piles and passed them around.\n\nThe forest became noisy with laughter. Leo learned that sharing does not make joy smaller. It makes the picnic bigger.",
    category: categories[0],
    author: {
      name: "Meera Akka",
      role: "Learning Friend"
    },
    coverImage: "",
    publishedAt: "2026-02-18",
    readingTimeMinutes: 5,
    ageRange: "4-9 yrs",
    emoji: "🦁",
    color: "#F59E0B",
    tags: ["sharing", "friendship", "forest"]
  },
  {
    slug: "little-birds-big-journey",
    title: "The Little Bird's Big Journey",
    excerpt:
      "A brave little bird follows a rainbow and learns that home can cheer you on.",
    content:
      "Pihu was the smallest bird in the neem tree. One morning, she saw a rainbow stretching across the sky and decided to follow it.\n\nThe wind whooshed, the clouds giggled, and Pihu flapped her tiny wings with all her might. Whenever she felt tired, she remembered her family chirping, you can do it!\n\nBy sunset, Pihu came home with a feather full of stories. She had not reached the rainbow, but she had found her brave heart.",
    category: categories[0],
    author: {
      name: "Arun Anna",
      role: "Adventure Writer"
    },
    coverImage: "",
    publishedAt: "2026-01-26",
    readingTimeMinutes: 6,
    ageRange: "5-10 yrs",
    emoji: "🐦",
    color: "#10B981",
    tags: ["bravery", "family", "adventure"]
  }
];
