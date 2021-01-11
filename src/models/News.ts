export interface News {
  groups: NewsCategory[];
}

export interface NewsCategory {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related?: string;
  source?: string;
  summary: string;
  url: string;
}