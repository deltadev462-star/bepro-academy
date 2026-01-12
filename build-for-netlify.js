const fs = require('fs');
const path = require('path');

// Create web-build directory
const buildDir = path.join(__dirname, 'web-build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Create assets directory
const assetsDir = path.join(buildDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

console.log('Building for Netlify...');

// Copy the HTML file as index.html
const htmlSource = path.join(__dirname, 'bepro-academy-complete.html');
const htmlDest = path.join(buildDir, 'index.html');

if (fs.existsSync(htmlSource)) {
  fs.copyFileSync(htmlSource, htmlDest);
  console.log('✅ Copied HTML file');
} else {
  console.error('❌ bepro-academy-complete.html not found!');
  process.exit(1);
}

// Copy assets
const assetsToCopy = [
  'assets/tinywow_02176818438403900000000000000000000ffffac14ab68de1c6b_87206537.mp4',
  'assets/hero-background.png',
  'assets/nanobana-generated.jpg.png'
];

assetsToCopy.forEach(asset => {
  const sourcePath = path.join(__dirname, asset);
  const fileName = path.basename(asset);
  const destPath = path.join(assetsDir, fileName);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copied ${fileName}`);
  } else {
    console.warn(`⚠️  ${asset} not found, skipping...`);
  }
});

// Create a _redirects file for Netlify
const redirectsContent = `/* /index.html 200`;
fs.writeFileSync(path.join(buildDir, '_redirects'), redirectsContent);
console.log('✅ Created _redirects file');

console.log('\n🎉 Build completed successfully!');
console.log(`📁 Output directory: ${buildDir}`);