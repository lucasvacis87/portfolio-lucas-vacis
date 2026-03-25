import { qaVision } from "../../content/vision";
import { Section } from "../layout/Section";

export function VisionSection(): JSX.Element {
  return (
    <Section id="vision" variant="flow" accent="indigo" headerAlign="center" title="QA + AI" subtitle={qaVision.subtitle}>
      <div className="relative overflow-hidden py-2.5 md:py-3">
        <div className="pointer-events-none absolute left-8 top-8 h-56 w-56 rounded-full bg-accent/14 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-24 h-52 w-52 rounded-full bg-[#59d1ff]/10 blur-3xl" />
        <div className="separator-soft pointer-events-none absolute inset-x-0 top-[7.1rem] h-px" />

        <div className="relative grid gap-y-7 md:gap-y-9 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/82">Positioning Statement</p>
            <h3 className="mt-3.5 max-w-[12ch] font-heading text-[2.02rem] leading-[0.92] tracking-[-0.055em] text-text md:mt-4 md:text-[4.6rem]">
              {qaVision.headline}
            </h3>
          </div>

          <aside className="lg:col-span-3 lg:pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text/45">Operating Principle</p>
            <p className="mt-2.5 max-w-[18ch] text-[13px] leading-6 text-text/82 md:mt-3 md:text-[14px] md:leading-7">{qaVision.operatingNote}</p>
          </aside>

          <p className="text-[14px] leading-7 text-text/74 md:text-[1.02rem] md:leading-8 lg:col-span-7 lg:col-start-2">{qaVision.body}</p>

          <div className="space-y-5 lg:col-span-12">
            {qaVision.principles.map((principle, index) => {
              const rowClass =
                index === 0
                  ? "lg:col-span-7"
                  : index === 1
                    ? "lg:col-span-8 lg:col-start-4"
                    : "lg:col-span-6 lg:col-start-7";

              return (
                <article key={principle.title} className={`relative grid gap-1.5 pt-3.5 md:gap-2 md:pt-4 lg:grid-cols-12 ${rowClass}`}>
                  <span className="separator-soft pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden="true" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text/35">{`0${index + 1}`}</span>
                  <p className="font-heading text-[0.98rem] tracking-[-0.015em] text-text md:text-[1.05rem] lg:col-span-4">{principle.title}</p>
                  <p className="text-[13px] leading-6 text-text/66 md:text-sm md:leading-7 lg:col-span-7">{principle.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
