import type { CoutRelatedPage } from "@/app/lib/cout-types";

interface CoutRelatedPagesProps {
  pages: CoutRelatedPage[];
}

export default function CoutRelatedPages({ pages }: CoutRelatedPagesProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-[22px] font-normal text-ink tracking-[-0.01em]">
        Voir aussi
      </h2>

      <div className="space-y-3">
        {pages.map((page) => (
          <a
            key={`${page.problem}-${page.industry}`}
            href={`/cout/${page.problem}/${page.industry}`}
            className="block bg-surface border border-border rounded-xl px-5 py-4 text-[15px] font-medium text-ink-light hover:text-ink hover:border-ink-light/30 transition-colors duration-150"
          >
            {page.label} &rarr;
          </a>
        ))}
      </div>
    </section>
  );
}
