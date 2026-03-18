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
      subtitle="Technical execution backed by strategy, maintainability, and delivery impact."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="rounded-xl border border-border/50 bg-[#111722]/88 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_14px_30px_rgba(0,0,0,0.28),0_0_24px_rgba(55,208,201,0.08)]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent/85">Capability {String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-heading text-lg">{service.title}</h3>
            <p className="muted mt-2 text-sm leading-6">{service.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
