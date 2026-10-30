import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { portfolio } from './src/content/portfolio.ts';
import { renderPortfolio } from './src/content/render.ts';
import { collectContentWarnings, formatContentWarnings } from './src/content/warnings.ts';

const VIRTUAL_OUTPUTS = 'virtual:amplify-outputs';

function portfolioPlugin(): Plugin {
  let warned = false;
  return {
    name: 'portfolio-content',
    resolveId(id) {
      if (id === VIRTUAL_OUTPUTS) return `\0${VIRTUAL_OUTPUTS}`;
      return undefined;
    },
    load(id) {
      if (id !== `\0${VIRTUAL_OUTPUTS}`) return undefined;
      const file = path.resolve('amplify_outputs.json');
      if (!fs.existsSync(file)) return 'export default null';
      const raw = fs.readFileSync(file, 'utf8');
      JSON.parse(raw);
      return `export default ${raw}`;
    },
    transformIndexHtml(html) {
      if (!html.includes('<!--PORTFOLIO-->')) return html;
      const rendered = renderPortfolio();
      const warnings = collectContentWarnings(portfolio, rendered);
      if (!warned && warnings.length) {
        warned = true;
        process.stderr.write(formatContentWarnings(warnings));
      }
      return html.replace('<!--PORTFOLIO-->', rendered);
    },
    closeBundle() {
      if (warned) return;
      const rendered = renderPortfolio();
      const warnings = collectContentWarnings(portfolio, rendered);
      if (warnings.length) process.stderr.write(formatContentWarnings(warnings));
    },
  };
}

export default defineConfig({
  plugins: [portfolioPlugin()],
  build: {
    rolldownOptions: {
      checks: {
        pluginTimings: false,
      },
    },
  },
});
