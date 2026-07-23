export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 text-center md:mb-12">
      <h2 className="mb-2 text-2xl font-bold text-ink md:mb-3 md:text-3xl lg:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto max-w-2xl text-sm text-muted md:text-base">{subtitle}</p>}
    </div>
  );
}
