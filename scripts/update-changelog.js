'use strict';

// Called by `npm version` lifecycle hook (`version` script).
// Prepends a new dated section to CHANGELOG.md for the incoming version.
// npm sets process.env.npm_package_version to the NEW version before running this.

const fs = require('fs');
const path = require('path');

const version = process.env.npm_package_version;
if (!version) {
  console.error('npm_package_version not set — run via npm version, not directly');
  process.exit(1);
}

const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
const existing = fs.readFileSync(changelogPath, 'utf8');

const date = new Date().toISOString().slice(0, 10);
const minor = parseInt(version.split('.')[1], 10);
const releaseType = minor % 2 === 1 ? 'Pre-release' : 'Stable';

const newSection = `## [${version}] — ${date} (${releaseType})\n\n### Changed\n- <!-- describe changes -->\n\n`;

// Insert after the first line (# Changelog heading)
const firstNewline = existing.indexOf('\n');
const updated = existing.slice(0, firstNewline + 1) + '\n' + newSection + existing.slice(firstNewline + 1);

fs.writeFileSync(changelogPath, updated);
console.log(`CHANGELOG.md updated for v${version}`);
