# Changelog

All notable changes to YAML Path Copy are documented here.

## [0.2.1] — 2026-05-16 (Stable)

### Fixed
- CI: publish from packaged vsix to avoid double prepublish run
- CI: add `permissions: contents: write` for GitHub release creation
- CI: upgrade to Node.js 24
- Bump version scripts + CHANGELOG guard added

## [0.2.0] — Stable

### Added
- Initial stable marketplace release
- Full dotted-path resolution for nested YAML keys
- Keybinding: `Cmd+Alt+Y` (Mac) / `Ctrl+Alt+Y` (Win/Linux)
- Command Palette: `Copy YAML Path`
- Right-click context menu entry
- Skips blank lines and comment lines when resolving parent keys
- Handles values containing colons (URLs, timestamps)

## [0.1.0] — Pre-release

### Added
- Core `getYamlPath` pure function with 16 unit tests
- esbuild bundling — single 1 KB output file
- ESLint + Mocha CI via GitHub Actions
- `vscode:prepublish` gated on lint + unit tests passing
