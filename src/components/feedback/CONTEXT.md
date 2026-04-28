# components/feedback/ – Feedback & Raise Request

**Epic:** E7 (Tasks 7.3–7.5)
**Priority:** P2 Medium

## Components

| Component | Epic Task | Description |
|---|---|---|
| `FeedbackSection.jsx` | E7-T7.3 | Three CTA buttons: Submit Feedback, Raise Request, Take a Poll |
| `FeedbackModal.jsx` | E7-T7.4 | Modal form: category dropdown, subject, description, optional file; success toast on submit |

## Modal Form Fields

- Category dropdown: HR, IT, Facilities, Finance, Other
- Subject: text input
- Description: textarea
- File attachment: `<input type="file">` (UI only — no upload in Phase 1)
- Submit: shows `<Toast>` success message, closes modal

## Behavior

- On submit: display success toast, close modal — no data persistence in Phase 1
- Raise Request opens same modal but pre-selects appropriate category
- Take a Poll: placeholder button, opens nothing in Phase 1

## Branch

`feat/E7-feedback-section`, `feat/E7-feedback-modal`
