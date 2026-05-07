# Company Overview - Interactive Subsidiary Structure

## Overview
Completely redesigned the Company Overview section to showcase Bajaj Group's three core subsidiaries (BAL, BACL, BATL) with an interactive, engaging, and visually stunning interface featuring smooth transitions, carousel-like interactions, and detailed segment exploration.

## New Components

### 1. **SubsidiaryCard.jsx**
Interactive card component that displays each subsidiary with:
- **Visual States:**
  - Inactive: Subtle gray/light theme with scale-down effect
  - Active: Full-color gradient (brand-primary to brand-dark) with ring highlight
- **Interactive Features:**
  - Hover effects with scale transitions
  - Segment preview with smooth reveal animations
  - Hover state for individual segments with slide-in effect
  - Employee count and navigation indicator
- **Color Scheme:**
  - Uses Bajaj brand colors (primary, light, dark)
  - Smooth transitions on all interactions
  - Backdrop blur and transparency effects

### 2. **SubsidiaryDetailModal.jsx**
Full-screen modal that displays detailed information when a subsidiary is clicked:
- **Sections:**
  - Header with subsidiary code, name, and close button
  - Overview section with detailed description
  - Key statistics (employees, segments, founding year)
  - Complete list of all business segments
  - Key focus areas with icons and descriptions
- **Design Features:**
  - Slide-in animation from bottom
  - Gradient background matching subsidiary
  - Hover effects on segments with right-border highlight
  - Responsive layout (bottom sheet on mobile, centered modal on desktop)

### 3. **Updated CompanyOverview.jsx**
Main component orchestrating the interactive experience:
- **Features:**
  - Grid layout (1 column on mobile, 3 columns on desktop)
  - State management for active subsidiary and modal display
  - Helpful hint prompting user interaction
  - Seamless modal integration
  - Responsive hint message

## Subsidiary Data Structure

### BAL (Bajaj Auto Limited)
- **Employee Count:** 24,500
- **Founded:** 1945
- **Segments:**
  1. Motorcycle Division (🏍️)
  2. Commercial Vehicle Division (🚙)
  3. Electric Vehicle Division (⚡)
  4. Finance & Leasing Division (💳)
- **Key Focus:** Market leadership, EV transition, global expansion, innovation

### BACL (Bajaj Auto Credit Limited)
- **Employee Count:** 2,800
- **Founded:** 1987
- **Segments:**
  1. Auto Finance (💰)
  2. Credit Products (📊)
  3. Digital Solutions (📱)
  4. Risk & Collections (🛡️)
- **Key Focus:** Credit penetration, digital delivery, transparent pricing, risk management

### BATL (Bajaj Auto Technology Limited)
- **Employee Count:** 1,200
- **Founded:** 2015
- **Segments:**
  1. Software Development (💻)
  2. IoT & Analytics (📡)
  3. Digital Platforms (🌐)
  4. Emerging Technologies (🚀)
- **Key Focus:** Digital transformation, innovative tech, scalable platforms, innovation culture

## UI/UX Features

### Transitions & Animations
- **Card Transitions:** 500ms duration on all state changes
- **Hover Effects:** Scale, color, and border animations
- **Modal Animations:** Slide-in from bottom (300ms) with fade-in backdrop
- **Segment Hover:** Translate-x slide effect with background color transition
- **Scale Transitions:** Inactive cards scale from 0.95 to 1 on active state

### Responsive Design
- **Mobile:** Single column layout, larger touch targets
- **Tablet:** 3-column grid with adjusted spacing
- **Desktop:** Full 3-column grid with enhanced hover effects

### Color & Typography
- **Primary Color:** Brand primary (#1A56A8) for active states
- **Light Color:** Brand light (#EBF2FA) for badges and backgrounds
- **Dark Color:** Brand dark (#133E82) for gradients
- **Typography:** Bold headings with consistent hierarchy
- **Icons:** Lucide React icons (20-24px) + emoji indicators for segments

## CSS Enhancements
Added new utility classes and keyframes:
- `animate-in` - General fade-in animation
- `slide-in-from-bottom-5` - Slide animation for modals
- `scale-98` - Scale utility for hover effects
- Keyframe animations for smooth transitions

## Brand Compliance
✅ Follows CLAUDE.md guidelines:
- Functional components only, one per file, default export
- Tailwind classes only (no inline styles)
- Brand tokens used throughout
- React Context + useState for state management
- Path alias (@/) used correctly
- Service pattern maintained
- No direct mock data imports

## User Experience Flow
1. User sees three subsidiary cards in grid layout
2. Hover over card to preview segments (50px scale hover effect)
3. Click any subsidiary to open detailed modal
4. Modal shows complete information with:
   - Overview section
   - Employee statistics
   - All business segments with highlights
   - Key focus areas
5. Click close or outside modal to return to card view
6. Seamless transitions throughout entire experience

## Files Modified/Created
- ✨ `SubsidiaryCard.jsx` (NEW)
- ✨ `SubsidiaryDetailModal.jsx` (NEW)
- 🔄 `CompanyOverview.jsx` (UPDATED)
- 🔄 `src/index.css` (UPDATED - added animations)

## Performance Considerations
- Smooth 500ms transitions for optimal UX
- Lazy rendering of modal content
- No unnecessary re-renders with proper state management
- CSS transitions for performant animations (GPU-accelerated)
