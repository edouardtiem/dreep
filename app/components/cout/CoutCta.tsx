interface CoutCtaProps {
  heading: string;
  buttonLabel: string;
  problem: string;
  industry: string;
}

export default function CoutCta({ heading, buttonLabel, problem, industry }: CoutCtaProps) {
  const utmContent = `${problem}-${industry}`;
  const href = `/?utm_source=seo&utm_content=${utmContent}`;

  return (
    <section className="text-center space-y-6">
      <h2 className="font-serif text-[22px] font-normal text-ink tracking-[-0.01em]">
        {heading}
      </h2>
      <a
        href={href}
        className="inline-block bg-ink text-white rounded-[10px] py-3.5 px-7 text-[15px] font-semibold hover:bg-ink-light transition-colors duration-150"
      >
        {buttonLabel} &rarr;
      </a>
    </section>
  );
}
