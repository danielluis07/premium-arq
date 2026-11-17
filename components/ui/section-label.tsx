type SectionLabelProps = {
  index: string;
  title: string;
  className?: string;
};

export function SectionLabel({ index, title, className = "" }: SectionLabelProps) {
  return (
    <p className={`flex items-baseline gap-2 ${className}`}>
      <span className="text-small">({index})</span>
      <span className="text-h2 border-b border-black">{title}</span>
    </p>
  );
}
