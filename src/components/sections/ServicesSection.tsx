import { services } from "../../content/services";
import { Section } from "../layout/Section";

export function ServicesSection(): JSX.Element {
  return (
    <Section
      id="services"
      variant="flow"
      accent="aqua"
      headerAlign="center"
      title="What I Bring"
      subtitle="Leadership capabilities to run quality as an operating system across teams."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="capability-card rounded-xl p-3.5 md:p-4">
            <h3 className="font-heading text-[1.02rem] tracking-[-0.015em] text-text sm:text-[1.08rem]">
              {service.title}
            </h3>
            <p className="mt-1.5 text-[13px] leading-5 text-[#c8d2e3] sm:mt-2 sm:text-sm sm:leading-6">
              {service.description}
            </p>
            <p className="mt-2.5 border-t border-white/8 pt-2.5 font-mono text-[11px] leading-5 text-muted sm:mt-3 sm:pt-3">
              {service.managerLens}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
