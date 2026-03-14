import { Navbar } from "../components/layout/Navbar";
import { Container } from "../components/layout/Container";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { VisionSection } from "../components/sections/VisionSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/layout/Footer";

export function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <main>
        <Container className="space-y-24 pb-20 pt-14 md:space-y-28 md:pt-20">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ServicesSection />
          <ProjectsSection />
          <ExperienceSection />
          <VisionSection />
          <ContactSection />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

