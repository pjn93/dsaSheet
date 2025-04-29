export interface TopicItem {
    name: string;
    _id: string;
    leetcode: string;
    youtube: string;
    article: string;
    level: string;
    status: "Done" | "Pending";
  }
  
  export interface TopicCategory {
    _id: string;
    category: string;
    status: string;
    items: TopicItem[];
  }
  