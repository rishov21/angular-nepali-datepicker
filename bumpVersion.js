const fs = require('fs');
const path = require('path');

const newVersion = "1.0.1"

if (!newVersion) {
  console.error('❌ Please provide a version number, e.g., node postinstall.js 1.0.2');
  process.exit(1);
}

console.log(`🔄 Updating version to ${newVersion}...`);

const filesToUpdate = [
  'package.json',
  'projects/angular-nepali-datepicker/package.json',
  'projects/angular-nepali-datepicker-ve/package.json',
  "package-lock.json",
];

filesToUpdate.forEach((filePath) => {
  const fullPath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  let parsed;

  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error(`❌ Failed to parse JSON in ${filePath}`);
    return;
  }

  if (parsed.version) {
    parsed.version = newVersion;
    fs.writeFileSync(fullPath, JSON.stringify(parsed, null, 2) + '\n');
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.warn(`ℹ️ No "version" key found in ${filePath}`);
  }
});