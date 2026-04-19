export type MobTier = "early" | "mid" | "late" | "hell";

export interface Mob {
  level: number | string;
  name: string;
  tier: MobTier;
  note?: string;
}

export const MOBS: Mob[] = [
  { level: 2,   name: "Human School Delinquent",    tier: "early", note: "Tutorial quest mob — inside school" },
  { level: 5,   name: "Demi Hollow",                tier: "early" },
  { level: 10,  name: "Bandit",                     tier: "early", note: "Rukongai area" },
  { level: 13,  name: "Tree Hollow",                tier: "early", note: "Set: +70% HP Regen" },
  { level: 15,  name: "Monkey Hollow",              tier: "early", note: "Set: +30% Damage" },
  { level: 18,  name: "Bokusa Hollow",              tier: "early", note: "Set: +70% Reiryoku Regen" },
  { level: 21,  name: "Mantis Hollow",              tier: "early" },
  { level: 24,  name: "Pounder Hollow",             tier: "early" },
  { level: 27,  name: "Spider Hollow",              tier: "early" },
  { level: 30,  name: "Bat Hollow",                 tier: "mid" },
  { level: 35,  name: "Fish Bone Hollow",           tier: "mid",  note: "Good at Lv58 (community tip)" },
  { level: 40,  name: "Senotakaidesu Hollow",       tier: "mid",  note: "Set: +50% Back Hit Damage" },
  { level: 45,  name: "Menos Grande Hollow",        tier: "mid" },
  { level: 50,  name: "Gigant Menos Grande Hollow", tier: "mid" },
  { level: 55,  name: "Wolf Adjuchas Hollow",       tier: "mid" },
  { level: 60,  name: "Sado Fullbringer",           tier: "late" },
  { level: 65,  name: "Vasto Lorde Hollow",         tier: "late", note: "Set: +30% Crit Hit Damage" },
  { level: 70,  name: "Webbed Quincy",              tier: "late", note: "Set: Ignores Defence 5s CD" },
  { level: 75,  name: "Shinigami Lieutenants",      tier: "late" },
  { level: 80,  name: "Yylfordt Granz & Edrad Liones", tier: "late", note: "Set: +30% Max Health" },
  { level: 85,  name: "Jackie Fullbringer (Sado Forest W)", tier: "late", note: "Set: +1% dmg per 1% missing HP" },
  { level: 90,  name: "Szayelaporro Granz (Hell)",  tier: "hell" },
  { level: 95,  name: "Sinners/Kushanada (Hell Verse)", tier: "hell", note: "Set: Damage Stops Regen 5s" },
  { level: 100, name: "Sinner (Hell)",              tier: "hell" },
  { level: 120, name: "Kushanada (Hell)",           tier: "hell" },
  { level: "125–140", name: "Hell Mobs",            tier: "hell", note: "Highest tier content" },
];

export const TIER_CONFIG: Record<MobTier, { label: string; color: string; bg: string }> = {
  early: { label: "Early",  color: "#27ae60", bg: "rgba(39,174,96,0.1)" },
  mid:   { label: "Mid",    color: "#e67e22", bg: "rgba(230,126,34,0.1)" },
  late:  { label: "Late",   color: "#e74c3c", bg: "rgba(231,76,60,0.1)" },
  hell:  { label: "Hell",   color: "#8e44ad", bg: "rgba(142,68,173,0.1)" },
};
