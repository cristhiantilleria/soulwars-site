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
        <span className="absolute -bottom-2 left-[20%] right-[20%] block h-px bg-gradient-to-r from-transparent via-[#e74c3c] to-transparent" />
      </h2>
    </div>
  );
}
