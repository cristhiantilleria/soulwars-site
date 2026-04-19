export interface NewsItem {
  tag: string;
  text: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  { tag: "⚔ WIPE LIVE",    text: "Version 3.0 is live — 130,000+ lines of code changed. Race skill trees, Wandenreich faction, and much more" },
  { tag: "🆕 NEW",          text: "Wandenreich is now its own faction — Quincies have their own territory and Schrift system" },
  { tag: "🌳 SKILL TREES",  text: "Every race now has a unique skill tree with ~200 nodes. 1 point every 4 levels, more via achievements" },
  { tag: "⚗ ALCHEMY",       text: "New Alchemy profession — craft gems, necklaces, potions, guild traps, and equipment enhancers" },
  { tag: "⛏ MINING",        text: "New Mining profession — 11 ore types, rarest recipe adds an extra gem slot to gear" },
  { tag: "🎭 VAIZARD",      text: "Vaizards are their own race again — no squad access, no Limit Release. Full mask perk breakdown in status menu" },
  { tag: "⚔ PVP",           text: "Faction War Map is live — capture points for buffs. Bonuses were halved in emergency hotfix" },
  { tag: "🔥 BALANCE",      text: "Attack speed overhaul — most forms upgraded to fast. Full balance transparency via Balance Viewer" },
  { tag: "💀 SCHRIFT",      text: "All Quincy Schrifts added. Emperor assigns 1 Schrift per player. Weak variants removed." },
];
