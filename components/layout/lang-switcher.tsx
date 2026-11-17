export function LangSwitcher({ className = "" }: { className?: string }) {
  return (
    <div role="group" aria-label="Idioma" className={`text-base ${className}`}>
      <span aria-current="true" className="border-b border-black pb-0.5">
        PT
      </span>
      <span aria-hidden className="mx-1">
        /
      </span>
      <span>EN</span>
    </div>
  );
}
