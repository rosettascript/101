#!/usr/bin/env node
/**
 * Generate static HTML files for each route to prevent 404s on GitHub Pages
 * This creates physical files that GitHub Pages can serve directly
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const indexHtml = path.join(distDir, 'index.html');

// Routes that need static HTML files
const routes = [
  '/tools',
  '/tools/word-to-html',
  '/tools/json-formatter',
  '/tools/base64',
  '/tools/url-encoder',
  '/tools/color-converter',
  '/tools/uuid-generator',
  '/tools/regex-tester',
  '/tools/hash-generator',
  '/tools/hash-decoder',
  '/tools/jwt-decoder',
  '/tools/timestamp-converter',
  '/tools/web-scraper',
  '/tools/json-extractor',
  '/tools/qr-code-generator',
  '/tools/text-diff',
  '/tools/csv-to-json',
  '/tools/image-tool',
  '/downloads',
  '/blogs',
  '/school-projects',
  '/about',
];

if (!fs.existsSync(indexHtml)) {
  console.error('Error: index.html not found in dist directory');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtml, 'utf-8');

// Create directory structure and copy index.html for each route
routes.forEach(route => {
  // Remove leading slash and split path
  const routePath = route.startsWith('/') ? route.slice(1) : route;
  const routeDir = path.join(distDir, routePath);
  
  // Create directory if it doesn't exist
  fs.mkdirSync(routeDir, { recursive: true });
  
  // Copy index.html to route directory
  const routeHtml = path.join(routeDir, 'index.html');
  fs.writeFileSync(routeHtml, indexContent);
  
  console.log(`Created: ${route}/index.html`);
});

console.log('✅ Static routes generated successfully');

