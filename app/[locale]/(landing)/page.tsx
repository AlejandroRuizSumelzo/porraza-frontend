import { Header } from "@/presentation/components/ui/landing/header";
import { Hero } from "@/presentation/components/ui/landing/hero";
import { Features } from "@/presentation/components/ui/landing/features";
import { HowItWorks } from "@/presentation/components/ui/landing/how-it-works";
import { Pricing } from "@/presentation/components/ui/landing/pricing";
import { Footer } from "@/presentation/components/ui/landing/footer";
import { SectionSeparator } from "@/presentation/components/ui/landing/section-separator";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />

        <SectionSeparator variant="gradient" />

        <Features />

        <SectionSeparator variant="dots" />

        <HowItWorks />

        <SectionSeparator variant="simple" />

        <Pricing />
      </main>

      <SectionSeparator variant="wave" />

      <Footer />
    </div>
  );
}
