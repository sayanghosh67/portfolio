import fs from 'fs';
import path from 'path';

const filesToExport = [
  'package.json',
  'vite.config.js',
  'index.html',
  'src/index.css',
  'src/main.jsx',
  'src/App.jsx',
  'src/components/Cursor.jsx',
  'src/components/ThreeCanvas.jsx',
  'src/components/Hero.jsx',
  'src/components/About.jsx',
  'src/components/Skills.jsx',
  'src/components/Projects.jsx',
  'src/components/Showcase.jsx',
  'src/components/Contact.jsx',
];

let output = 'Please review the following React + Vite + Tailwind CSS + Three.js codebase for my 3D Portfolio website.\n\n';

for (const file of filesToExport) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf-8');
    const ext = path.extname(file).replace('.', '');
    const lang = ext === 'jsx' ? 'javascript' : ext;
    output += `\n\n### File: \`${file}\`\n\`\`\`${lang}\n${content}\n\`\`\`\n`;
  }
}

fs.writeFileSync('full-code-export.txt', output);
console.log('Successfully bundled project into full-code-export.txt');
