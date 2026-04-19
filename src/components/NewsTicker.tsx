"use client";
import { NEWS_ITEMS } from "@/data/news";

export default function NewsTicker() {
  const doubled = [...NEWS_ITEMS, ...NEWS_ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-[#2a3450] bg-[#151a27] py-2.5">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#151a27] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#151a27] to-transparent" />

      <div className="animate-ticker hover:[animation-play-state:paused] flex w-max gap-16 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="font-title text-xs tracking-widest text-[#7a8aaa]">
            <span className="mr-2 font-bold text-[#e74c3c]">{item.tag}</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
