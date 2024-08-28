const fs = require('fs');
const path = require('path');

// Correct path to the package.json file (root directory of the project)
const packageJsonPath = path.join(__dirname, '../package.json');

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Extract the version without any build metadata
const versionParts = packageJson.version.split('+')[0]; // Remove build metadata

// Split the current version into parts
const versionNumbers = versionParts.split('.').map(Number);

// Check if version parts are valid numbers
if (versionNumbers.length < 3 || versionNumbers.some(isNaN)) {
  console.error('Invalid version format in package.json');
  process.exit(1);
}

// Increment the patch version
versionNumbers[2] += 1;

// Join the version parts
const newVersion = `${versionNumbers.join('.')}`;

// Update the version in package.json
packageJson.version = newVersion;

// Write the updated package.json back to disk
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Version updated to ${newVersion}`);
