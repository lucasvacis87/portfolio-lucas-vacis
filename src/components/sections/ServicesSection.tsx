import { services } from "../../content/services";
import { Section } from "../layout/Section";

export function ServicesSection(): JSX.Element {
  return (
    <Section id="services" title="What I Bring" subtitle="Technical execution backed by strategy, maintainability, and delivery impact.">
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-2xl border border-border/80 bg-surface/75 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow"
          >
            <h3 className="font-heading text-xl">{service.title}</h3>
            <p className="muted mt-2 text-sm leading-6">{service.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
