# YAML Path Copy

> One keystroke to copy the full dotted key path from any YAML file to your clipboard.

[![CI](https://github.com/local/yaml-path-copy/actions/workflows/ci.yml/badge.svg)](https://github.com/local/yaml-path-copy/actions/workflows/ci.yml)
[![Version](https://img.shields.io/visual-studio-marketplace/v/local.yaml-path-copy)](https://marketplace.visualstudio.com/items?itemName=local.yaml-path-copy)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/local.yaml-path-copy)](https://marketplace.visualstudio.com/items?itemName=local.yaml-path-copy)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## What it does

Place your cursor on any key in a YAML file and press **`Cmd+Alt+Y`** (Mac) / **`Ctrl+Alt+Y`** (Windows/Linux). The full dotted path to that key is copied to your clipboard instantly.

```yaml
en:
  api:
    problems:
      server_error: 'Oops, something went wrong'  # ← cursor here
```

Result in clipboard: **`en.api.problems.server_error`**

---

## Features

- **Instant path copy** — resolves full dotted path from any nesting depth
- **Three trigger options** — keybinding, Command Palette, or right-click context menu
- **Smart parsing** — skips blank lines, comment lines, and array items correctly
- **Colon-safe** — handles values containing colons (URLs, timestamps) without breaking
- **Zero config** — works out of the box on all `.yml` and `.yaml` files
- **Lightweight** — single bundled file, activates only when a YAML file is open

---

## Usage

### Keybinding

| Platform | Shortcut |
|----------|----------|
| macOS | `Cmd + Alt + Y` |
| Windows / Linux | `Ctrl + Alt + Y` |

### Command Palette

`Cmd+Shift+P` → **Copy YAML Path**

### Context Menu

Right-click anywhere in a YAML file → **Copy YAML Path**

---

## Examples

### Rails / Ruby on Rails i18n locales

```yaml
en:
  activerecord:
    errors:
      models:
        user:
          attributes:
            email:
              taken: 'has already been taken'  # → en.activerecord.errors.models.user.attributes.email.taken
```

### Kubernetes / Docker Compose config

```yaml
services:
  web:
    environment:
      DATABASE_URL: postgres://...  # → services.web.environment.DATABASE_URL
```

### GitHub Actions

```yaml
jobs:
  build:
    runs-on: ubuntu-latest  # → jobs.build.runs-on
```

---

## Rebinding the shortcut

Open **Keyboard Shortcuts** (`Cmd+K Cmd+S`) and search for `yaml-path-copy.copyPath`.

Or add directly to `keybindings.json`:

```json
{
  "key": "cmd+shift+c",
  "command": "yaml-path-copy.copyPath",
  "when": "editorLangId == yaml"
}
```

---

## Requirements

- VS Code `1.60.0` or newer
- No other extensions required

---

## Known Limitations

- **Flow-style YAML** (`{key: value}` on one line) is not supported — path resolves to `null`
- **Multi-document YAML** (`---` separator) treats each document independently
- **Anchors and aliases** (`&anchor`, `*alias`) are not resolved — the alias key name is copied, not the anchor's path

---

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for full history.

### 0.2.0 — Stable
- Initial stable release

### 0.1.0 — Pre-release
- Core path resolution
- Keybinding, Command Palette, context menu
- esbuild bundling

---

## Contributing

1. Fork the repo
2. `npm install`
3. `npm run watch` — rebuild on save
4. Press `F5` in VS Code to open Extension Development Host
5. `npm test` — unit + integration tests
6. `npm run lint` — ESLint check

Pull requests welcome. Open an issue first for large changes.

---

## License

[MIT](LICENSE) © Ilia Kriachkov
