import { credentials } from "../../content/credentials";
import { Section } from "../layout/Section";

export function CredentialsSection(): JSX.Element {
  return (
    <Section id="credentials" variant="flow" accent="aqua" headerAlign="center" title={credentials.title} subtitle={credentials.subtitle}>
      <div className="grid gap-4 md:grid-cols-3">
        {credentials.groups.map((group) => (
          <article key={group.title} className="capability-card rounded-xl p-4 md:p-5">
            <h3 className="font-heading text-[1.02rem] tracking-[-0.015em] text-text">{group.title}</h3>
            <ul className="mt-4 space-y-3.5">
              {group.items.map((item) => (
                <li key={`${item.label}-${item.value}`} className="border-t border-white/8 pt-3.5 first:border-t-0 first:pt-0">
                  <p className="text-sm font-semibold text-text/92">{item.label}</p>
                  <p className="mt-1 text-[13px] leading-5 text-[#c8d2e3]">{item.value}</p>
                  {item.detail ? <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{item.detail}</p> : null}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
