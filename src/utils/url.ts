export function withBaseUrl(path: string): string {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.replace(/^\/+/, "");

  return `${normalizedBase}${normalizedPath}`;
}

export function toMailtoLink(email: string, subject?: string): string {
  const encodedSubject = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${encodedSubject}`;
}
