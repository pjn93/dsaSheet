export interface TopicItem {
  _id: string;  // Unique identifier for the subtopic
  name: string;  // Name of the subtopic
  leetcode: string;  // Link to the Leetcode problem
  youtube: string;  // Link to the YouTube video
  article: string;  // Link to the article
  level: string;  // Difficulty level of the subtopic (Easy, Medium, Hard)
  status: "Done" | "Pending";  // Status of the subtopic (Done or Pending)
}

// Define the TopicCategory interface, which represents a category of topics
export interface TopicCategory {
  _id: string;  // Unique identifier for the category
  name: string;  // Name of the category (e.g., "Arrays", "Stacks")
  subtopics: TopicItem[];  // Array of TopicItems (subtopics) for this category
  status: "Done" | "Pending";  // Status of the subtopic (Done or Pending)
}

