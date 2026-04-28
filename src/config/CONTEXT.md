# config/ – Static Configuration Layer

**Epic:** E1 (Task 1.3), E3 (Task 3.3)
**Purpose:** Centralised data configuration. All static URLs, nav structure, and contact lists live here.

Changing a tile URL, adding a nav item, or updating a contact number means editing only this folder — no component changes needed.

## Files

| File | What it drives |
|---|---|
| `services.config.js` | The 13 Employee Self-Service tiles (id, label, icon name, redirectUrl, enabled) |
| `navigation.config.js` | Sidebar group/item structure (groups → items → id, label, icon, sectionId) |
| `contacts.config.js` | Emergency contact entries (name, phone, icon, colorClass) |

## Rules

- Export as plain JS arrays/objects — no React, no hooks here
- `redirectUrl` values are `'#'` placeholders in Phase 1; swap real URLs in Phase 2 without touching components
- `sectionId` in navigation must exactly match the `id` attribute on the corresponding section element
- `enabled: false` on a service tile hides it from the grid without deleting the config entry
