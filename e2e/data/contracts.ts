export type SectionAnchor = `#${string}`;
export type HrefExpectation = string | RegExp;

export type NavigationCase = {
  label: string;
  anchor: SectionAnchor;
};

export type RepeatedNavScenario = NavigationCase & {
  times: number;
};

export type ContactLinkCase = {
  label: string;
  href: HrefExpectation;
  target?: string;
  rel?: string;
  download?: string;
};

type Viewport = {
  width: number;
  height: number;
};

const anchorPattern = /^#[a-z0-9][a-z0-9-]*$/;
const progressPattern = /^(\d+)\/(\d+)$/;

function assertContract(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[e2e:data-contract] ${message}`);
  }
}

function isNonEmptyText(value: string): boolean {
  return value.trim().length > 0;
}

function serializeCaseKey(input: NavigationCase): string {
  return `${input.label}::${input.anchor}`;
}

export function createNavigationCases(contractName: string, cases: readonly NavigationCase[]): readonly NavigationCase[] {
  assertContract(cases.length > 0, `${contractName} must include at least one navigation case.`);

  const uniqueKeys = new Set<string>();

  for (const [index, item] of cases.entries()) {
    assertContract(isNonEmptyText(item.label), `${contractName}[${index}] label must be non-empty.`);
    assertContract(anchorPattern.test(item.anchor), `${contractName}[${index}] anchor must match ${anchorPattern}.`);

    const key = serializeCaseKey(item);
    assertContract(!uniqueKeys.has(key), `${contractName} includes duplicated case "${key}".`);
    uniqueKeys.add(key);
  }

  return cases;
}

export function createMobileNavigationCases(
  contractName: string,
  mobileCases: readonly NavigationCase[],
  desktopCases: readonly NavigationCase[]
): readonly NavigationCase[] {
  const validatedMobile = createNavigationCases(contractName, mobileCases);
  const desktopKeysByIndex = desktopCases.map((item) => serializeCaseKey(item));

  let desktopCursor = -1;
  for (const [index, mobileItem] of validatedMobile.entries()) {
    const key = serializeCaseKey(mobileItem);
    const desktopIndex = desktopKeysByIndex.indexOf(key, desktopCursor + 1);
    assertContract(
      desktopIndex !== -1,
      `${contractName}[${index}] "${key}" must exist in desktop navigation with the same order.`
    );
    desktopCursor = desktopIndex;
  }

  return validatedMobile;
}

export function createRepeatedNavigationScenarios(
  contractName: string,
  scenarios: readonly RepeatedNavScenario[],
  allowedCases: readonly NavigationCase[]
): readonly RepeatedNavScenario[] {
  assertContract(scenarios.length > 0, `${contractName} must include at least one repeated scenario.`);

  const allowedKeys = new Set(allowedCases.map((item) => serializeCaseKey(item)));

  for (const [index, item] of scenarios.entries()) {
    const key = serializeCaseKey(item);
    assertContract(allowedKeys.has(key), `${contractName}[${index}] "${key}" must exist in navigation cases.`);
    assertContract(Number.isInteger(item.times), `${contractName}[${index}] times must be an integer.`);
    assertContract(item.times >= 2, `${contractName}[${index}] times must be >= 2.`);
  }

  return scenarios;
}

export function createAlternatingNavigationScenarios(
  contractName: string,
  scenarios: readonly NavigationCase[],
  allowedCases: readonly NavigationCase[]
): readonly NavigationCase[] {
  const validatedScenarios = createNavigationCases(contractName, scenarios);
  const allowedKeys = new Set(allowedCases.map((item) => serializeCaseKey(item)));

  for (const [index, item] of validatedScenarios.entries()) {
    const key = serializeCaseKey(item);
    assertContract(allowedKeys.has(key), `${contractName}[${index}] "${key}" must exist in navigation cases.`);
  }

  return validatedScenarios;
}

export function createContactCases<
  TActions extends Record<string, ContactLinkCase>,
  TDetails extends Record<string, ContactLinkCase>
>(contractName: string, cases: { actions: TActions; details: TDetails }): { actions: TActions; details: TDetails } {
  const validateGroup = (groupName: "actions" | "details", entries: Record<string, ContactLinkCase>) => {
    const keys = Object.keys(entries);
    assertContract(keys.length > 0, `${contractName}.${groupName} must include at least one case.`);

    for (const key of keys) {
      const item = entries[key];
      assertContract(isNonEmptyText(item.label), `${contractName}.${groupName}.${key}.label must be non-empty.`);

      if (item.target === "_blank") {
        assertContract(
          typeof item.rel === "string" && /(noreferrer|noopener)/.test(item.rel),
          `${contractName}.${groupName}.${key}.rel must include noreferrer or noopener when target is _blank.`
        );
      }
    }
  };

  validateGroup("actions", cases.actions);
  validateGroup("details", cases.details);

  return cases;
}

function parseProgress(value: string, key: string, contractName: string): { current: number; total: number } {
  const matches = progressPattern.exec(value);
  assertContract(Boolean(matches), `${contractName}.progress.${key} must match "${progressPattern}".`);

  const current = Number(matches?.[1]);
  const total = Number(matches?.[2]);
  assertContract(total > 0, `${contractName}.progress.${key} total must be > 0.`);
  assertContract(current >= 0, `${contractName}.progress.${key} current must be >= 0.`);
  assertContract(current <= total, `${contractName}.progress.${key} current must be <= total.`);

  return { current, total };
}

export function createSandboxCases<T extends {
  progress: { initial: string; firstBug: string; completed: string };
  status: { bugReported: string; scanning: string; completed: string };
  mode: { automation: string };
  timeoutMs: { completion: number };
}>(contractName: string, cases: T): T {
  const initial = parseProgress(cases.progress.initial, "initial", contractName);
  const firstBug = parseProgress(cases.progress.firstBug, "firstBug", contractName);
  const completed = parseProgress(cases.progress.completed, "completed", contractName);

  assertContract(firstBug.total === initial.total, `${contractName}.progress totals must be consistent.`);
  assertContract(completed.total === initial.total, `${contractName}.progress totals must be consistent.`);
  assertContract(firstBug.current > initial.current, `${contractName}.progress.firstBug must be greater than initial.`);
  assertContract(
    completed.current === completed.total,
    `${contractName}.progress.completed must represent a completed run (current == total).`
  );

  assertContract(isNonEmptyText(cases.status.bugReported), `${contractName}.status.bugReported must be non-empty.`);
  assertContract(isNonEmptyText(cases.status.scanning), `${contractName}.status.scanning must be non-empty.`);
  assertContract(isNonEmptyText(cases.status.completed), `${contractName}.status.completed must be non-empty.`);
  assertContract(isNonEmptyText(cases.mode.automation), `${contractName}.mode.automation must be non-empty.`);
  assertContract(
    Number.isInteger(cases.timeoutMs.completion) && cases.timeoutMs.completion >= 1000,
    `${contractName}.timeoutMs.completion must be an integer >= 1000.`
  );

  return cases;
}

export function createViewportPresets<T extends Record<string, Viewport>>(contractName: string, presets: T): T {
  const keys = Object.keys(presets);
  assertContract(keys.length > 0, `${contractName} must include at least one viewport preset.`);

  for (const key of keys) {
    const viewport = presets[key];
    assertContract(Number.isInteger(viewport.width) && viewport.width > 0, `${contractName}.${key}.width must be > 0.`);
    assertContract(
      Number.isInteger(viewport.height) && viewport.height > 0,
      `${contractName}.${key}.height must be > 0.`
    );
  }

  return presets;
}
