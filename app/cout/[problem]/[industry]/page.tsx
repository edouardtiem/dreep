import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { coutPages, getCoutPage } from "@/app/lib/cout-content";
import CoutHero from "@/app/components/cout/CoutHero";
import CoutBreakdown from "@/app/components/cout/CoutBreakdown";
import CoutMiniCalculator from "@/app/components/cout/CoutMiniCalculator";
import CoutFaq from "@/app/components/cout/CoutFaq";
import CoutCta from "@/app/components/cout/CoutCta";
import CoutRelatedPages from "@/app/components/cout/CoutRelatedPages";
import CoutFooter from "@/app/components/cout/CoutFooter";

interface PageProps {
  params: Promise<{ problem: string; industry: string }>;
}

export function generateStaticParams() {
  return coutPages.map((page) => ({
    problem: page.problem,
    industry: page.industry,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { problem, industry } = await params;
  const page = getCoutPage(problem, industry);
  if (!page) return {};

  const url = `https://www.dreep.app/cout/${problem}/${industry}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "article",
      siteName: "Dreep",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function CoutPage({ params }: PageProps) {
  const { problem, industry } = await params;
  const page = getCoutPage(problem, industry);

  if (!page) {
    notFound();
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white font-sans relative hero-noise hero-glow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-16 relative z-10">
        <CoutHero
          statNumber={page.heroStatNumber}
          statLabel={page.heroStatLabel}
          subtitle={page.heroSubtitle}
        />

        <CoutBreakdown items={page.breakdowns} />

        <CoutMiniCalculator
          sliders={page.sliders}
          formula={page.calculatorFormula}
          resultLabel={page.calculatorResultLabel}
        />

        <CoutFaq items={page.faq} />

        <CoutCta
          heading={page.ctaHeading}
          buttonLabel={page.ctaButtonLabel}
          problem={page.problem}
          industry={page.industry}
        />

        <CoutRelatedPages pages={page.relatedPages} />

        <CoutFooter />
      </div>
    </main>
  );
}
