import fs from "node:fs";
import path from "node:path";

type PlaywrightAttachment = {
  name: string;
  contentType?: string;
  path?: string;
};

type PlaywrightResult = {
  status?: string;
  duration?: number;
  error?: { message?: string; value?: string };
  attachments?: PlaywrightAttachment[];
};

type PlaywrightTest = {
  title?: string;
  outcome?: string;
  status?: string;
  results?: PlaywrightResult[];
  projectName?: string;
};

type PlaywrightSpec = {
  title?: string;
  tests?: PlaywrightTest[];
};

type PlaywrightSuite = {
  title?: string;
  suites?: PlaywrightSuite[];
  specs?: PlaywrightSpec[];
};

type PlaywrightJsonReport = {
  suites?: PlaywrightSuite[];
};

type FlattenedTest = {
  suiteTitle: string;
  testTitle: string;
  fullTitle: string;
  projectName: string;
  outcome: string;
  retries: number;
  durationMs: number;
  errorMessage: string;
  attachments: PlaywrightAttachment[];
};

type EvidenceLink = {
  href: string;
  label: string;
  kind: "screenshot" | "video" | "trace" | "other";
  hint?: string;
};

const rootDir = process.cwd();
const resultsPath = path.join(rootDir, "artifacts", "playwright", "results.json");
const reportDir = path.join(rootDir, "report");
const customReportDir = path.join(rootDir, "artifacts", "playwright", "custom");
const evidenceDir = path.join(reportDir, "evidence");

function ensureDir(directoryPath: string): void {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function readResultsFile(): PlaywrightJsonReport {
  if (!fs.existsSync(resultsPath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(resultsPath, "utf8")) as PlaywrightJsonReport;
  } catch {
    return {};
  }
}

function flattenTests(suites: PlaywrightSuite[], parentTitles: string[] = []): FlattenedTest[] {
  const all: FlattenedTest[] = [];

  for (const suite of suites) {
    const suiteTitle = suite.title ? [...parentTitles, suite.title] : parentTitles;

    if (suite.specs) {
      for (const spec of suite.specs) {
        const specTitle = spec.title ?? "Untitled spec";
        const tests = spec.tests ?? [];

        for (const testCase of tests) {
          const results = testCase.results ?? [];
          const lastResult = results[results.length - 1] ?? {};
          const rawOutcome = (testCase.outcome ?? testCase.status ?? lastResult.status ?? "unknown").toLowerCase();
          const outcome = normalizeOutcome(rawOutcome);
          const errorMessage =
            lastResult.error?.message ??
            lastResult.error?.value ??
            (outcome === "unexpected" ? "Unexpected failure without explicit error message." : "");

          all.push({
            suiteTitle: suiteTitle.join(" > ") || "Root suite",
            testTitle: testCase.title ?? specTitle,
            fullTitle: [...suiteTitle, specTitle, testCase.title ?? ""].filter(Boolean).join(" > "),
            projectName: testCase.projectName ?? "unknown-project",
            outcome,
            retries: Math.max(results.length - 1, 0),
            durationMs: results.reduce((total, result) => total + (result.duration ?? 0), 0),
            errorMessage,
            attachments: lastResult.attachments ?? []
          });
        }
      }
    }

    if (suite.suites && suite.suites.length > 0) {
      all.push(...flattenTests(suite.suites, suiteTitle));
    }
  }

  return all;
}

function normalizeOutcome(rawOutcome: string): string {
  switch (rawOutcome) {
    case "passed":
    case "expected":
      return "expected";
    case "failed":
    case "unexpected":
    case "timedout":
      return "unexpected";
    case "skipped":
      return "skipped";
    case "interrupted":
      return "interrupted";
    default:
      return rawOutcome;
  }
}

function sanitizeForFileName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function getAttachmentExtension(contentType?: string, filePath?: string): string {
  if (filePath) {
    const ext = path.extname(filePath);
    if (ext) {
      return ext;
    }
  }

  switch (contentType) {
    case "video/webm":
      return ".webm";
    case "image/png":
      return ".png";
    case "application/zip":
      return ".zip";
    default:
      return ".bin";
  }
}

function getEvidenceKind(contentType?: string, filePath?: string): EvidenceLink["kind"] {
  const normalizedPath = filePath?.toLowerCase() ?? "";

  if (contentType === "image/png" || normalizedPath.endsWith(".png")) {
    return "screenshot";
  }

  if (contentType === "video/webm" || normalizedPath.endsWith(".webm")) {
    return "video";
  }

  if (contentType === "application/zip" || normalizedPath.endsWith(".zip")) {
    return "trace";
  }

  return "other";
}

function getEvidenceLabel(kind: EvidenceLink["kind"], itemPath: string): string {
  switch (kind) {
    case "screenshot":
      return "Open Screenshot";
    case "video":
      return "Play Video";
    case "trace":
      return "Play Trace";
    default:
      return itemPath.split("/").pop() ?? "Open Attachment";
  }
}

function copyEvidence(tests: FlattenedTest[], timestamp: string): Map<string, EvidenceLink[]> {
  const links = new Map<string, EvidenceLink[]>();
  ensureDir(evidenceDir);

  tests.forEach((testCase, index) => {
    if (testCase.outcome !== "unexpected" && testCase.outcome !== "flaky") {
      return;
    }

    const savedPaths: EvidenceLink[] = [];
    const suiteLabel = sanitizeForFileName(testCase.suiteTitle || "suite");
    const testLabel = sanitizeForFileName(testCase.testTitle || `test-${index + 1}`);
    const attachments = testCase.attachments.filter((attachment) => attachment.path && fs.existsSync(attachment.path));

    attachments.forEach((attachment, attachmentIndex) => {
      const extension = getAttachmentExtension(attachment.contentType, attachment.path);
      const fileName = `${suiteLabel}__${testLabel}__${timestamp}__${String(attachmentIndex + 1).padStart(2, "0")}${extension}`;
      const targetPath = path.join(evidenceDir, fileName);
      fs.copyFileSync(attachment.path as string, targetPath);
      const relativePath = path.join("evidence", fileName).replace(/\\/g, "/");
      const kind = getEvidenceKind(attachment.contentType, attachment.path);

      savedPaths.push({
        href: `./${relativePath}`,
        label: getEvidenceLabel(kind, relativePath),
        kind,
        hint: kind === "trace" ? `Run: npx playwright show-trace ${relativePath}` : undefined
      });
    });

    links.set(testCase.fullTitle, savedPaths);
  });

  return links;
}

function formatDuration(durationMs: number): string {
  const seconds = Math.round(durationMs / 1000);
  return `${seconds}s`;
}

function buildEvidenceMarkup(links: EvidenceLink[]): string {
  if (!links.length) {
    return "No evidence files";
  }

  return links
    .map((link) => {
      const hintMarkup = link.hint ? `<span class="evidence-hint">${link.hint}</span>` : "";
      return `<span class="evidence-item"><a class="evidence-button evidence-${link.kind}" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>${hintMarkup}</span>`;
    })
    .join(" ");
}

function buildHtml(tests: FlattenedTest[], evidenceLinks: Map<string, EvidenceLink[]>, generatedAt: string): string {
  const total = tests.length;
  const passed = tests.filter((testCase) => testCase.outcome === "expected").length;
  const failed = tests.filter((testCase) => testCase.outcome === "unexpected").length;
  const flaky = tests.filter((testCase) => testCase.outcome === "flaky").length;
  const skipped = tests.filter((testCase) => testCase.outcome === "skipped").length;
  const durationMs = tests.reduce((totalDuration, testCase) => totalDuration + testCase.durationMs, 0);
  const retryRate = total === 0 ? 0 : Number(((tests.filter((testCase) => testCase.retries > 0).length / total) * 100).toFixed(1));

  const failureRows = tests
    .filter((testCase) => testCase.outcome === "unexpected" || testCase.outcome === "flaky")
    .map((testCase) => {
      const links = evidenceLinks.get(testCase.fullTitle) ?? [];
      const linksMarkup = buildEvidenceMarkup(links);
      const shortError = testCase.errorMessage
        ? testCase.errorMessage.replace(/\s+/g, " ").slice(0, 220)
        : "No explicit error message available.";

      return `
        <tr>
          <td>${testCase.projectName}</td>
          <td>${testCase.fullTitle}</td>
          <td>${testCase.outcome}</td>
          <td>${shortError}</td>
          <td>${linksMarkup}</td>
        </tr>
      `;
    })
    .join("\n");

  const suiteRows = tests
    .map((testCase) => {
      return `
        <tr>
          <td>${testCase.projectName}</td>
          <td>${testCase.suiteTitle}</td>
          <td>${testCase.testTitle}</td>
          <td>${testCase.outcome}</td>
          <td>${testCase.retries}</td>
          <td>${formatDuration(testCase.durationMs)}</td>
        </tr>
      `;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Portfolio QA E2E Report</title>
    <style>
      :root {
        --bg: #0a1018;
        --panel: #111827;
        --text: #e5e7eb;
        --muted: #9ca3af;
        --accent: #60a5fa;
        --ok: #34d399;
        --warn: #fbbf24;
        --bad: #f87171;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Arial, sans-serif;
        background: radial-gradient(circle at top, #15233a 0%, var(--bg) 35%);
        color: var(--text);
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 24px; }
      .panel {
        background: linear-gradient(180deg, rgba(17,24,39,.95), rgba(17,24,39,.78));
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 16px;
        padding: 18px;
        margin-bottom: 16px;
      }
      h1, h2 { margin: 0 0 12px; }
      p { margin: 4px 0; color: var(--muted); }
      .kpis { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); margin-top: 12px; }
      .kpi {
        border-radius: 12px;
        padding: 12px;
        background: rgba(255,255,255,.03);
        border: 1px solid rgba(255,255,255,.08);
      }
      .kpi strong { display: block; font-size: 20px; color: var(--text); }
      .ok { color: var(--ok); }
      .warn { color: var(--warn); }
      .bad { color: var(--bad); }
      a { color: var(--accent); text-decoration: none; }
      .evidence-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 32px;
        margin: 4px 6px 4px 0;
        padding: 0 12px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,.1);
        background: rgba(255,255,255,.04);
        color: var(--text);
        font-size: 12px;
        font-weight: 600;
      }
      .evidence-item {
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        margin: 4px 8px 4px 0;
      }
      .evidence-hint {
        color: var(--muted);
        font-size: 11px;
        font-family: Consolas, "Courier New", monospace;
      }
      .evidence-screenshot { background: rgba(96,165,250,.12); }
      .evidence-video { background: rgba(52,211,153,.12); }
      .evidence-trace { background: rgba(251,191,36,.12); }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
      }
      th, td {
        border-bottom: 1px solid rgba(255,255,255,.08);
        text-align: left;
        padding: 8px;
        vertical-align: top;
      }
      th { color: #cbd5e1; font-weight: 600; }
      code {
        color: #93c5fd;
        background: rgba(147,197,253,.1);
        border-radius: 6px;
        padding: 1px 6px;
      }
    </style>
  </head>
  <body>
    <main class="container">
      <section class="panel">
        <h1>Portfolio QA - E2E Custom Report</h1>
        <p>Generated: ${generatedAt}</p>
        <p>Source artifacts: <code>artifacts/playwright/html</code>, <code>artifacts/playwright/test-results</code></p>
        <div class="kpis">
          <div class="kpi"><span>Total Tests</span><strong>${total}</strong></div>
          <div class="kpi"><span>Passed</span><strong class="ok">${passed}</strong></div>
          <div class="kpi"><span>Failed</span><strong class="bad">${failed}</strong></div>
          <div class="kpi"><span>Flaky</span><strong class="warn">${flaky}</strong></div>
          <div class="kpi"><span>Skipped</span><strong>${skipped}</strong></div>
          <div class="kpi"><span>Total Duration</span><strong>${formatDuration(durationMs)}</strong></div>
          <div class="kpi"><span>Retry Rate</span><strong>${retryRate}%</strong></div>
        </div>
      </section>

      <section class="panel">
        <h2>Interview Highlights</h2>
        <p>1) Parallel smoke execution with deterministic CI evidence collection.</p>
        <p>2) Multi-layer reporting: HTML, JSON, JUnit, plus this custom executive report.</p>
        <p>3) Failure triage package with videos, screenshots, and traces linked per test.</p>
      </section>

      <section class="panel">
        <h2>Failure & Flaky Analysis</h2>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Scenario</th>
              <th>Outcome</th>
              <th>Error</th>
              <th>Evidence</th>
            </tr>
          </thead>
          <tbody>
            ${failureRows || `<tr><td colspan="5">No failures or flaky scenarios detected.</td></tr>`}
          </tbody>
        </table>
      </section>

      <section class="panel">
        <h2>Scenario Results</h2>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Suite</th>
              <th>Scenario</th>
              <th>Outcome</th>
              <th>Retries</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            ${suiteRows || `<tr><td colspan="6">No test data available.</td></tr>`}
          </tbody>
        </table>
      </section>
    </main>
  </body>
</html>`;
}

function writeOutputs(tests: FlattenedTest[], html: string): void {
  ensureDir(reportDir);
  ensureDir(customReportDir);

  fs.writeFileSync(path.join(reportDir, "index.html"), html, "utf8");
  fs.writeFileSync(path.join(customReportDir, "index.html"), html, "utf8");

  const metrics = {
    total: tests.length,
    passed: tests.filter((item) => item.outcome === "expected").length,
    failed: tests.filter((item) => item.outcome === "unexpected").length,
    flaky: tests.filter((item) => item.outcome === "flaky").length,
    skipped: tests.filter((item) => item.outcome === "skipped").length,
    retryRate: tests.length ? Number(((tests.filter((item) => item.retries > 0).length / tests.length) * 100).toFixed(1)) : 0,
    durationMs: tests.reduce((sum, item) => sum + item.durationMs, 0)
  };

  fs.writeFileSync(path.join(customReportDir, "metrics.json"), JSON.stringify(metrics, null, 2), "utf8");
}

function run(): void {
  const report = readResultsFile();
  const suites = report.suites ?? [];
  const tests = flattenTests(suites);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const evidenceLinks = copyEvidence(tests, timestamp);
  const generatedAt = new Date().toISOString();
  const html = buildHtml(tests, evidenceLinks, generatedAt);

  writeOutputs(tests, html);
}

run();
