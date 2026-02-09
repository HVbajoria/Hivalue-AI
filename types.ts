export interface IdeaItem {
  id: string;
  idea: string;
  category: string;
  description: string;
}

export interface Tool {
  name: string;
  url: string;
  description: string;
  icon?: string;
}

export interface SubStep {
  id: string;
  text: string;
  tool?: {
    name: string;
    url: string;
  };
  preview?: {
    label: string;
    content: string;
    image?: string;
  };
  aiPromptContext?: string;
}

export interface BlueprintStep {
  id: string;
  title: string;
  description: string;
  subSteps: SubStep[];
}

export interface Blueprint {
  steps: BlueprintStep[];
  tools: Record<string, Tool[]>; // Grouped by category
  workflow: string[]; // Simple text representation of flow for the diagram
}