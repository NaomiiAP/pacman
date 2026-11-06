import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { HumanPage } from '../human/HumanPage.tsx';

export function renderPortfolio(): string {
  return renderToString(createElement(HumanPage));
}
