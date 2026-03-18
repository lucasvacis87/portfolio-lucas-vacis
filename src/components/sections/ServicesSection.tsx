import { services } from "../../content/services";
import { Section } from "../layout/Section";

export function ServicesSection(): JSX.Element {
  return (
    <Section
      id="services"
      variant="flow"
      accent="aqua"
      title="What I Bring"
      subtitle="Technical execution backed by strategy, maintainability, and delivery impact."
    >
      <div className="grid gap-7 md:grid-cols-2 md:gap-x-10 md:gap-y-8">
        {services.map((service, index) => (
          <article key={service.title} className="relative pl-4">
            <span className="absolute left-0 top-2 h-5 w-px bg-gradient-to-b from-accent to-accent/0" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent/85">Capability {String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-heading text-xl">{service.title}</h3>
            <p className="muted mt-2 text-sm leading-7">{service.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
