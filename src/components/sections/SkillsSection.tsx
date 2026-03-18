import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  capabilityConnections,
  capabilityNodes,
  defaultActiveCapability
} from "../../content/capabilities";

export function SkillsSection(): JSX.Element {
  const [activeNodeId, setActiveNodeId] = useState(defaultActiveCapability);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-80px" });
  const focusedNodeId = hoveredNodeId ?? activeNodeId;

  const capabilityById = useMemo(
    () => new Map(capabilityNodes.map((node) => [node.id, node])),
    []
  );

  const connectedIds = useMemo(() => {
    const ids = new Set<string>();
    if (!focusedNodeId) {
      return ids;
    }

    ids.add(focusedNodeId);
    capabilityConnections.forEach((connection) => {
      if (connection.from === focusedNodeId) {
        ids.add(connection.to);
      }
      if (connection.to === focusedNodeId) {
        ids.add(connection.from);
      }
    });

    return ids;
  }, [focusedNodeId]);

  const selectedNode = capabilityById.get(activeNodeId) ?? capabilityNodes[0];

  return (
    <section
      id="engineering-capabilities"
      className="relative py-3 md:py-6 lg:-mx-12 lg:px-16 xl:-mx-32 xl:px-24 2xl:-mx-48 2xl:px-28"
    >
      <div className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-accent-2/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-24 h-56 w-56 rounded-full bg-accent/12 blur-3xl" />

      <header className="mx-auto max-w-[76ch] text-center">
        <h2 className="section-title">Engineering Capabilities</h2>
        <p className="muted mt-2 leading-7">How I design, structure, and scale quality systems.</p>
      </header>

      <div className="mx-auto mt-8 max-w-[78rem] space-y-7 md:mt-10 md:space-y-9">
        <div ref={mapRef} className="relative px-2 py-3 md:px-4 md:py-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(55,208,201,0.1),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(155,167,180,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="relative aspect-[16/10] w-full md:aspect-[12/5]">
            <svg
              viewBox="0 0 100 64"
              role="img"
              aria-label="Capability map showing connected engineering capabilities"
              className="absolute inset-0 h-full w-full"
            >
              {capabilityConnections.map((connection, index) => {
                const from = capabilityById.get(connection.from);
                const to = capabilityById.get(connection.to);

                if (!from || !to) {
                  return null;
                }

                const isConnected =
                  !focusedNodeId ||
                  connection.from === focusedNodeId ||
                  connection.to === focusedNodeId;

                return (
                  <motion.path
                    key={`${connection.from}-${connection.to}`}
                    d={`M ${from.position.x} ${from.position.y} L ${to.position.x} ${to.position.y}`}
                    stroke={isConnected ? "rgba(91, 140, 255, 0.95)" : "rgba(155, 167, 180, 0.28)"}
                    strokeWidth={isConnected ? 0.55 : 0.35}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: mapInView ? 1 : 0,
                      opacity: mapInView ? (isConnected ? 0.95 : 0.45) : 0
                    }}
                    transition={{
                      duration: 0.65,
                      delay: 0.1 + index * 0.06,
                      ease: "easeOut"
                    }}
                  />
                );
              })}
            </svg>

            {capabilityNodes.map((node, index) => {
              const isSelected = activeNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isConnected = !focusedNodeId || connectedIds.has(node.id);

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onFocus={() => setHoveredNodeId(node.id)}
                  onBlur={() => setHoveredNodeId(null)}
                  aria-pressed={isSelected}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:text-sm"
                  style={{
                    left: `${node.position.x}%`,
                    top: `${(node.position.y / 64) * 100}%`,
                    color: isConnected ? "#e8edf2" : "rgba(155,167,180,0.85)",
                    border: `1px solid ${
                      isSelected || isHovered ? "rgba(55,208,201,0.75)" : "rgba(155,167,180,0.35)"
                    }`,
                    background:
                      isSelected || isHovered
                        ? "radial-gradient(circle at 50% 50%, rgba(55,208,201,0.35), rgba(15,20,29,0.92))"
                        : "rgba(15,20,29,0.82)",
                    boxShadow:
                      isSelected || isHovered
                        ? "0 0 0 1px rgba(55,208,201,0.16), 0 0 24px rgba(55,208,201,0.38)"
                        : "0 0 0 1px rgba(155,167,180,0.09)"
                  }}
                  initial={{ opacity: 0, y: 10, scale: 0.94 }}
                  animate={{
                    opacity: mapInView ? 1 : 0,
                    y: mapInView ? 0 : 10,
                    scale: mapInView ? 1 : 0.94
                  }}
                  transition={{
                    duration: 0.42,
                    delay: 0.36 + index * 0.08,
                    ease: "easeOut"
                  }}
                >
                  {node.name}
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="mx-auto max-w-[72ch]"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent/90">Capability Focus</p>
          <h3 className="mt-2 font-heading text-xl">{selectedNode.name}</h3>
          <p className="muted mt-2 leading-7">{selectedNode.description}</p>
        </motion.div>
      </div>
    </section>
  );
}
