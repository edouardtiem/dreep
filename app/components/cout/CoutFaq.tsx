import type { CoutFaqItem } from "@/app/lib/cout-types";

interface CoutFaqProps {
  items: CoutFaqItem[];
}

export default function CoutFaq({ items }: CoutFaqProps) {
  return (
    <section className="space-y-6">
      <h2 className="font-serif text-[22px] font-normal text-ink tracking-[-0.01em]">
        Questions fr&eacute;quentes
      </h2>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.question} className="space-y-2">
            <h3 className="font-serif text-[18px] font-normal text-ink tracking-[-0.01em]">
              {item.question}
            </h3>
            <p className="text-[15px] text-slate leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
