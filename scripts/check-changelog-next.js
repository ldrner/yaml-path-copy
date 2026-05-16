'use strict';

// preversion guard: fails if CHANGELOG.md has no entry for the incoming version.
// npm sets npm_new_version during version lifecycle hooks.

const fs = require('fs');
const path = require('path');

const nextVersion = process.env.npm_new_version;
if (!nextVersion) {
  console.log('check-changelog-next: no npm_new_version, skipping');
  process.exit(0);
}

const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
const changelog = fs.readFileSync(changelogPath, 'utf8');

if (!changelog.includes(`[${nextVersion}]`)) {
  console.error(`ERROR: CHANGELOG.md has no entry for v${nextVersion}`);
  console.error(`Add a ## [${nextVersion}] section before running npm version.`);
  process.exit(1);
}

console.log(`OK: CHANGELOG.md contains entry for v${nextVersion}`);
