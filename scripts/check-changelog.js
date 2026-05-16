'use strict';

// CI guard: fails if CHANGELOG.md has no section for the current package.json version.
// Run via `npm run lint:version` or in CI before release.

const fs = require('fs');
const path = require('path');

const version = require('../package.json').version;
const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
const changelog = fs.readFileSync(changelogPath, 'utf8');

if (!changelog.includes(`[${version}]`)) {
  console.error(`ERROR: CHANGELOG.md has no entry for v${version}`);
  console.error(`Add a ## [${version}] section before releasing.`);
  process.exit(1);
}

console.log(`OK: CHANGELOG.md contains entry for v${version}`);
