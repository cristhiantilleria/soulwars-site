interface Props {
  eyebrow: string;
  title: string;
}

export default function SectionHeader({ eyebrow, title }: Props) {
  return (
    <div className="mb-12 text-center">
      <span className="font-title mb-3 block text-[0.68rem] tracking-[0.5em] uppercase text-[#d4af37]">
        {eyebrow}
      </span>
      <h2 className="font-display relative inline-block text-[clamp(1.8rem,4vw,2.8rem)] text-[#e8eaf0]">
        {title}
        {/* Slash divider: gradient lines + center diamond */}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 w-48">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#e74c3c]/60" />
          <span className="w-2 h-2 rotate-45 bg-[#e74c3c]/80 shrink-0 shadow-[0_0_6px_rgba(231,76,60,0.6)]" />
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#e74c3c]/60" />
        </span>
      </h2>
    </div>
  );
}
