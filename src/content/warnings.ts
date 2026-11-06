import type { Portfolio } from './portfolio.ts';

const CONTACT_FIELDS = ['github', 'linkedin', 'email', 'resume', 'photo', 'repo'] as const;

function walkPlaceholders(value: unknown, path: string, into: string[]): void {
  if (typeof value === 'string') {
    if (value.includes('[PLACEHOLDER]')) into.push(`${path} contains [PLACEHOLDER]`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkPlaceholders(item, `${path}[${index}]`, into));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      walkPlaceholders(child, path ? `${path}.${key}` : key, into);
    }
  }
}

/** Warnings printed by `npm run build`. Empty project links are hidden and are not warned. */
export function collectContentWarnings(data: Portfolio, renderedHtml: string): string[] {
  const warnings: string[] = [];

  for (const key of CONTACT_FIELDS) {
    const value = data.contact[key].trim();
    if (!value) {
      warnings.push(`contact.${key} is empty, so it is hidden on the page`);
    } else if (value.includes('[PLACEHOLDER]')) {
      warnings.push(`contact.${key} still contains [PLACEHOLDER]`);
    }
  }

  const placeholders: string[] = [];
  walkPlaceholders(data, 'portfolio', placeholders);
  for (const line of placeholders) {
    if (!warnings.includes(line)) warnings.push(line);
  }

  if (renderedHtml.includes('TODO')) {
    warnings.push('Rendered HTML contains the word TODO. Take it out of src/content/portfolio.ts or the renderer.');
  }

  return warnings;
}

export function formatContentWarnings(warnings: string[]): string {
  if (!warnings.length) return '';
  return [
    '',
    '⚠ Portfolio content still to fill before you ship (src/content/portfolio.ts):',
    ...warnings.map((warning) => `  - ${warning}`),
    '',
  ].join('\n');
}
