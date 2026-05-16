# YAML Path Copy

> One keystroke to copy the full dotted key path from any YAML file to your clipboard.

[![CI](https://github.com/ldrner/yaml-path-copy/actions/workflows/ci.yml/badge.svg)](https://github.com/ldrner/yaml-path-copy/actions/workflows/ci.yml)
[![Version](https://vsmarketplacebadges.dev/version/bbrmn550.yaml-path-copy.png)](https://marketplace.visualstudio.com/items?itemName=bbrmn550.yaml-path-copy)
[![Installs](https://vsmarketplacebadges.dev/installs/bbrmn550.yaml-path-copy.png)](https://marketplace.visualstudio.com/items?itemName=bbrmn550.yaml-path-copy)
[![Rating](https://vsmarketplacebadges.dev/rating/bbrmn550.yaml-path-copy.png)](https://marketplace.visualstudio.com/items?itemName=bbrmn550.yaml-path-copy&ssr=false#review-details)
[![VS Code](https://raster.shields.io/badge/VS_Code-%3E%3D1.60-007ACC?logo=visualstudiocode)](https://code.visualstudio.com)
[![License: MIT](https://raster.shields.io/badge/license-MIT-blue)](LICENSE)

---

## What it does

Place your cursor on any YAML key and press **`Cmd+Alt+Y`** (Mac) / **`Ctrl+Alt+Y`** (Win/Linux). The full dotted path is copied to clipboard instantly — no config, no setup.

```yaml
en:
  api:
    problems:
      server_error: 'Oops, something went wrong'  # ← cursor here
```

Clipboard: **`en.api.problems.server_error`**

---

## Demo

![YAML Path Copy demo](https://raw.githubusercontent.com/ldrner/yaml-path-copy/main/images/demo.gif)

---

## Features

- **Instant** — resolves full dotted path at any nesting depth
- **Three triggers** — keybinding, Command Palette, right-click context menu
- **Smart** — skips blank lines, comments, array items when resolving parents
- **Colon-safe** — handles values with colons (URLs, timestamps)
- **Zero config** — works on all `.yml` / `.yaml` files out of the box
- **Tiny** — 1 KB bundled, activates only when a YAML file is open

---

## Usage

### Keybinding

| Platform | Shortcut |
|---|---|
| macOS | `Cmd + Alt + Y` |
| Windows / Linux | `Ctrl + Alt + Y` |

### Command Palette

`Cmd+Shift+P` → type **Copy YAML Path** → Enter

### Context Menu

Right-click in any YAML file → **Copy YAML Path**

---

## Examples

### Rails i18n locales

```yaml
en:
  activerecord:
    errors:
      models:
        user:
          attributes:
            email:
              taken: 'has already been taken'
              # → en.activerecord.errors.models.user.attributes.email.taken
```

### Kubernetes / Docker Compose

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

### Any nested config

```yaml
feature_flags:
  payments:
    stripe:
      webhook_secret: sk_live_...  # → feature_flags.payments.stripe.webhook_secret
```

---

## Rebinding the shortcut

`Cmd+K Cmd+S` → search `yaml-path-copy.copyPath`, or add to `keybindings.json`:

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
- No runtime dependencies

---

## Known Limitations

- **Flow-style YAML** (`{key: value}` inline) — path resolves to `null`
- **Multi-document YAML** (`---` separator) — each document treated independently
- **Anchors / aliases** (`&anchor`, `*alias`) — alias key name copied, not anchor's path

---

## Release Notes

See full [CHANGELOG](CHANGELOG.md).

### 0.2.1
- CI fixes: Node.js 24, publish from vsix, GitHub release permissions
- Version bump automation with CHANGELOG guard

### 0.2.0
- Initial stable marketplace release

---

## Contributing

```bash
git clone https://github.com/ldrner/yaml-path-copy
npm install
npm run watch      # rebuild on save
# Press F5 in VS Code → Extension Development Host opens
npm run test:unit  # unit tests
npm run lint       # ESLint
```

Open an issue before large changes.

---

## License

[MIT](LICENSE) © Ilia Kriachkov
