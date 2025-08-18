const { build } = require('esbuild');

build({
  entryPoints: ['src/main.ts'], 
  bundle: true,
  platform: 'node',
  target: 'node22', 
  outfile: 'dist/main.js',
  minify: true,
  sourcemap: false,
  treeShaking: true,
  external: [
    '@nestjs/*', 
    'class-validator',
    'class-transformer',
  ],
}).catch(() => process.exit(1));