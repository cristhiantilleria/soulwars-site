export type NodeType = 'skill' | 'augment' | 'passive' | 'mastery';

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  type: NodeType;
  prerequisites?: string[];
  requiredSkills?: string[];
  masteryGroup?: string;
  requiredLevel?: number;
}

export interface SkillTree {
  faction: string;
  displayName: string;
  nodes: SkillNode[];
}
