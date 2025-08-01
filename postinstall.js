const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..'); // node_modules/@rishovt/angular-nepali-datepicker",
const DIST_FOLDER = path.resolve(__dirname); // dist/angular-nepali-datepicker
const SOURCE_FOLDER = DIST_FOLDER;

function findPackageJsonRoot(startDir) {
  let currentDir = startDir;
  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }
  return currentDir;
}

function getAngularVersion(startDir) {
  const consumerRoot = findConsumerRoot(startDir);
  if (!consumerRoot) {
    console.warn('[angular-nepali-datepicker] Unable to find consumer project root. Defaulting to View Engine.');
    return '0.0.0';
  }
  const angularPkgPath = path.join(consumerRoot, 'node_modules', '@angular/core/package.json');
  try {
    const angularPkg = require(angularPkgPath);
    return angularPkg.version || '0.0.0';
  } catch (err) {
    console.warn(`[angular-nepali-datepicker] Angular not found at ${angularPkgPath}. Defaulting to View Engine.`);
    return '0.0.0';
  }
}

function findConsumerRoot(startDir) {
  let currentDir = startDir;
  while (true) {
    const pkgPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = require(pkgPath);
        // Skip if it's your own library
        if (pkg.name && pkg.name !== '@rishovt/angular-nepali-datepicker') {
          return currentDir;
        }
      } catch (_) {
        // ignore malformed package.json
      }
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }

  return null;
}

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(file => {
    const currentSrc = path.join(src, file);
    const currentDest = path.join(dest, file);
    if (fs.statSync(currentSrc).isDirectory()) {
      copyRecursiveSync(currentSrc, currentDest);
    } else {
      fs.copyFileSync(currentSrc, currentDest);
    }
  });
}

// Detect Node version
const nodeVersion = process.version.match(/^v(\d+\.\d+\.\d+)/)[1];
const isOldNode = parseFloat(nodeVersion) < 10;

// Detect Angular version
const angularVersion = getAngularVersion(path.resolve(__dirname, '..', '..'));
const isIvy = !isOldNode && /^1[1-9]|2[0-9]/.test(angularVersion);

const buildType = isIvy ? 'angular-nepali-datepicker-ivy' : 'angular-nepali-datepicker-ve';
const buildPath = path.join(SOURCE_FOLDER, buildType);

// Validate source path
if (!fs.existsSync(buildPath)) {
  console.warn(`[angular-nepali-datepicker] Source folder does not exist: ${buildPath}. Falling back to View Engine.`);
  const fallbackBuildPath = path.join(SOURCE_FOLDER, 'angular-nepali-datepicker-ve');
  if (!fs.existsSync(fallbackBuildPath)) {
    console.error(`[angular-nepali-datepicker] Fallback View Engine folder does not exist: ${fallbackBuildPath}. Installation failed.`);
    process.exit(1);
  }
  copyRecursiveSync(fallbackBuildPath, ROOT);
  console.log(`[angular-nepali-datepicker] ✅ Installed angular-nepali-datepicker-ve (fallback) for Angular ${angularVersion}`);
} else {
  copyRecursiveSync(buildPath, ROOT);
  console.log(`[angular-nepali-datepicker] ✅ Installed ${buildType} ${isIvy ? 'IVY' : 'VE'} build for Angular ${angularVersion}`);
}
