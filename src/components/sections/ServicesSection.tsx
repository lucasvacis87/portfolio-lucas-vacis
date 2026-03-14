import { services } from "../../content/services";
import { Section } from "../layout/Section";

export function ServicesSection(): JSX.Element {
  return (
    <Section id="services" title="What I Bring" subtitle="Strategic QA and quality acceleration outcomes.">
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-2xl border border-border bg-surface/70 p-4">
            <h3 className="font-heading">{service.title}</h3>
            <p className="muted mt-2 text-sm leading-6">{service.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

