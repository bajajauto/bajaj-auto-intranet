# Intranet Design Principles

Use this as the UX compass for the Bajaj Auto Intranet Hub. The goal is not to make a digital bulletin board; it is to create a daily workplace tool employees actually use because it is fast, findable, relevant, and trustworthy.

## North Star

- Prioritize employee experience over visual decoration.
- Make common tasks obvious and quick: services, documents, help, people, news, locations, and requests.
- Design for adoption: employees should understand the page without training.
- Treat the homepage as a productivity launchpad, not a marketing landing page.
- Keep the platform flexible enough to evolve as the organization changes.

## Core Principles

### 1. Visibility And Findability

Employees should always know where they are, what is available, and where to go next.

- Keep key tools visible near the top.
- Use clear section names and sidebar labels.
- Avoid burying important resources under deep navigation.
- Search is a safety net, not the primary wayfinding mechanism.
- Provide multiple paths to important actions: visible tiles, sidebar links, and search.

### 2. Real-World Language

Use words, icons, and flows employees already understand.

- Prefer plain labels like `Leave / Attendance`, `Policies`, `Raise Request`, `Emergency Contacts`.
- Avoid internal system jargon unless employees already know it.
- Use familiar icons from Lucide for common actions.
- Match content order to how employees think about their day.

### 3. User Freedom And Control

Employees should be able to recover, close, cancel, collapse, and navigate away easily.

- Modals need clear close/cancel actions and Escape support.
- Sidebar drawer should close on outside tap and nav selection.
- Expandable sections should be reversible.
- Form actions should provide confirmation before any future irreversible submission.

### 4. Consistency

A consistent interface reduces cognitive load and builds trust.

- Reuse the same card, button, spacing, icon, and focus patterns.
- Keep section headers and card behavior predictable.
- Use brand tokens from Tailwind; do not hardcode colors.
- Keep third-party/service links feeling like part of one workplace hub.

### 5. Prevent Failure

Good design prevents errors before they happen.

- Use disabled, placeholder, or coming-soon states honestly in Phase 1.
- Add validation to forms.
- Keep labels close to inputs.
- Use clear empty states for future data-driven sections.
- Make emergency/help content easy to locate without scrolling friction.

### 6. Recognition Over Recall

Do not make employees remember where things live.

- Show common actions visibly.
- Signpost sections clearly.
- Keep high-frequency tools in the self-service grid.
- Use obvious groupings: Employee Services, Company Resources, Support & Engagement.
- Keep repeated layout patterns stable across the page.

### 7. Flexible For Novice And Expert Users

The intranet should support both first-time and frequent users.

- Provide quick access to frequent tools.
- Keep service tile URLs config-driven.
- Future-friendly ideas: favorites, recently used tools, personalized links, role/location targeting.
- Shortcuts should speed up work without hiding core navigation.

### 8. Less Is More

Reduce clutter so employees can scan and act.

- Keep copy concise.
- Avoid dense walls of text on the homepage.
- Use cards only for meaningful grouped items.
- Prioritize high-value actions and timely information.
- Do not overload the first viewport.

### 9. Smooth Bumps In The Road

When something goes wrong, explain it clearly and help the user continue.

- Use helpful validation messages.
- Show success toasts for submitted forms.
- Use clear disabled states for unavailable Phase 1 actions.
- Avoid silent failures on buttons and links.

### 10. Help At Hand

Support should be easy to find when employees get stuck.

- Keep Help / FAQs reachable from header and sidebar.
- Keep IT Resources and Emergency Contacts prominent.
- Future help content should be searchable, concise, task-focused, and step-based.

## Homepage Guidance

- Start simple and strategic; add complexity only when usage data or employee feedback supports it.
- Lead with productivity: frequently used apps/tools should be easy to reach.
- Balance productivity widgets with communications: notifications, calendar, news, events.
- Reflect Bajaj Auto’s brand and culture through logo, tone, imagery, and content choices.
- Design for mobile/frontline access as seriously as desktop.
- Iterate over time using analytics, search terms, feedback, and focus-group input.

## Useful Patterns For This Project

- **Bread and butter:** 3-1 layout with main content plus right-side widgets.
- **Signpost:** service tiles that route employees to tools and resources.
- **Support center:** IT Resources, Feedback, Raise Request, Help / FAQs.
- **Home base:** personalized or role-relevant news and shortcuts in later phases.
- **Roadrunner:** location cards that quickly orient employees to plant/office resources.
- **People pleaser:** future employee spotlights, recognition, team/member highlights.

## Design Review Checklist

- Can an employee find the most common tools in under 5 seconds?
- Is the page scannable without reading every sentence?
- Are labels plain and familiar?
- Are section names consistent between sidebar, headings, and config?
- Does every interactive element have a visible state and focus state?
- Can mobile users complete the same core tasks?
- Are unavailable Phase 1 actions clearly represented?
- Does the design reduce clicks rather than add ceremony?
- Is help visible before the user feels stuck?
- Does the homepage feel like Bajaj Auto, not a generic dashboard?

