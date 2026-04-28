# components/emergency/ – Emergency Contacts

**Epic:** E6 (Task 6.3)
**Priority:** P1 High — must be quick to locate from anywhere on the page

## Component

| Component | Epic Task | Description |
|---|---|---|
| `EmergencyContacts.jsx` | E6-T6.3 | Compact card grid: each contact has colored left border, icon, name, phone number |

## Data Source

Reads from `@/config/contacts.config.js` — the `emergencyContacts` array.

## Visual Treatment

- Each contact card has a distinct colored left border (`border-l-4`) that matches its `colorClass`
- Icon badge on the left, label + phone on the right
- Phone numbers are `<a href="tel:...">` links for mobile tap-to-call

## Branch

`feat/E6-emergency-contacts`
