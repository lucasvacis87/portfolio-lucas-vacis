import { Navbar } from "../components/layout/Navbar";
import { Container } from "../components/layout/Container";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { RepositoriesSection } from "../components/sections/RepositoriesSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { VisionSection } from "../components/sections/VisionSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/layout/Footer";

export function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(155,167,180,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.045)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(circle_at_center,black,transparent_74%)]" />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <Container className="space-y-20 pb-20 pt-8 md:space-y-36 md:pt-14">
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ServicesSection />
          <RepositoriesSection />
          <VisionSection />
          <ContactSection />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
