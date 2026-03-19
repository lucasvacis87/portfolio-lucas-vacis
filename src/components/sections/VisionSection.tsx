import { qaVision } from "../../content/vision";
import { Section } from "../layout/Section";

export function VisionSection(): JSX.Element {
  return (
    <Section id="vision" variant="flow" accent="indigo" headerAlign="center" title="QA + AI" subtitle={qaVision.subtitle}>
      <div className="relative overflow-hidden py-3">
        <div className="pointer-events-none absolute left-8 top-8 h-56 w-56 rounded-full bg-accent/14 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-24 h-52 w-52 rounded-full bg-[#59d1ff]/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-[7.1rem] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative grid gap-y-9 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/82">Positioning Statement</p>
            <h3 className="mt-4 max-w-[12ch] font-heading text-[2.5rem] leading-[0.9] tracking-[-0.055em] text-text md:text-[4.6rem]">
              {qaVision.headline}
            </h3>
          </div>

          <aside className="lg:col-span-3 lg:pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text/45">Operating Principle</p>
            <p className="mt-3 max-w-[18ch] text-[14px] leading-7 text-text/82">{qaVision.operatingNote}</p>
          </aside>

          <p className="text-[15px] leading-8 text-text/74 lg:col-span-7 lg:col-start-2 md:text-[1.02rem]">{qaVision.body}</p>

          <div className="space-y-5 lg:col-span-12">
            {qaVision.principles.map((principle, index) => {
              const rowClass =
                index === 0
                  ? "lg:col-span-7"
                  : index === 1
                    ? "lg:col-span-8 lg:col-start-4"
                    : "lg:col-span-6 lg:col-start-7";

              return (
                <article key={principle.title} className={`grid gap-2 border-t border-white/10 pt-4 lg:grid-cols-12 ${rowClass}`}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text/35">{`0${index + 1}`}</span>
                  <p className="font-heading text-[1.05rem] tracking-[-0.015em] text-text lg:col-span-4">{principle.title}</p>
                  <p className="text-sm leading-7 text-text/66 lg:col-span-7">{principle.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
