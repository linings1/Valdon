const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'Paypath.html'), 'utf8');
const outDir = path.join(__dirname, '..', 'sections');
fs.mkdirSync(outDir, { recursive: true });

const sections = [
  { name: 'header', start: '1.1. header section', end: 'End of 1.1. header section' },
  { name: 'hero', start: '1.2. hero section', end: 'End of 1.2. hero section' },
  { name: 'about', start: '1.3. about section', end: 'End of 1.3. about section' },
  { name: 'finance', start: '1.4. finance section', end: 'End of 1.4. finance section' },
  { name: 'ipsum-logo', start: '1.5. ispsum section', end: 'End of 1.5. ispsum section' },
  { name: 'gateway', start: '1.6. gateway section', end: 'End of 1.6. gateway section' },
  { name: 'services', start: '1.7. services section', end: 'End of 1.7. services section' },
  { name: 'visa', start: '1.8. visa section', end: 'End of 1.8. visa section' },
  { name: 'pricing', start: '1.9. pricing section', end: 'End of 1.9. pricing section' },
  { name: 'professional', start: '1.10. profaessional section', end: 'End of 1.10. profaessional section' },
  { name: 'question', start: '1.11. question section', end: 'End of 1.11. question section' },
  { name: 'news-cards', start: '1.12. news-cards section', end: 'End of 1.12. news-cards section' },
  { name: 'footer', start: '1.13. footer section', end: 'End of 1.13. footer section' },
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extract(startMarker, endMarker) {
  const startRe = new RegExp(`<!-- ========\\s+${escapeRegex(startMarker)} ========\\s*-->`);
  const endRe = new RegExp(`<!-- ========\\s+${escapeRegex(endMarker)} ========\\s*-->`);
  const startMatch = html.match(startRe);
  const endMatch = html.match(endRe);
  if (!startMatch || !endMatch) {
    return null;
  }
  return html.slice(startMatch.index + startMatch[0].length, endMatch.index).trim();
}

for (const section of sections) {
  const content = extract(section.start, section.end);
  if (!content) {
    console.error('Failed to extract:', section.name);
    process.exitCode = 1;
    continue;
  }
  fs.writeFileSync(path.join(outDir, `${section.name}.html`), `${content}\n`);
  console.log(`Created sections/${section.name}.html`);
}
