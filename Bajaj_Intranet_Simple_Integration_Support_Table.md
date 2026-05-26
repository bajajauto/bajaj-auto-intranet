# Bajaj Intranet Integration Support Matrix

This is a simplified handoff document for deciding what each intranet element needs from SharePoint, dev access, Microsoft Graph / Outlook, API support, and redirect links.

## Quick Decision Guide

| Need | Best Approach | Support Required |
|---|---|---|
| Content that HR, Comms, Admin, Sales, or IT must update regularly | SharePoint List / SharePoint News | SharePoint site, list columns, editor permissions |
| Personal employee data like name, title, department, profile photo | Microsoft Graph API | Azure AD app registration, `User.Read` permission |
| Personal Outlook calendar, meetings count, meetings list | Microsoft Graph API / Outlook calendar | Azure AD app registration, `Calendars.Read` permission |
| Tool buttons that only redirect users to another portal | Redirect links | Final production URLs from IT/tool owners |
| Rarely changing static company/location data | Dev access / code update | Developer updates config/component and deploys |
| Feedback submissions | SharePoint List + Power Automate | SharePoint list, submit permission, email workflow |

## Element Integration Table

| Element | Element Description | What Support Is Needed | How To Do It |
|---|---|---|---|
| Top Banner / Alert Strip | Urgent company-wide message at the very top of the site. Shows active alert text and optional link. | SharePoint support from Corporate Communications or HR. Need list ownership and editor access. | Create SharePoint list `Active Banner` with columns: `message`, `type`, `isActive`, `link`. Site reads the active row. Comms/HR updates SharePoint directly. |
| Header Logo and Navigation | Shows Bajaj branding, navigation links, and employee identity area. | Dev support for navigation changes. Azure AD / Graph support for user profile. | Keep navigation in code config for now. Use Graph API `GET /me` for employee name, title, department, and optionally `GET /me/photo/$value` for photo. |
| Hero Greeting and User Info | Personalized greeting with employee name, designation, and department. | Azure AD / Microsoft Graph access. No SharePoint needed. | Use Graph API `GET /me`. Required permission: `User.Read`. Map `displayName`, `jobTitle`, and `department`. |
| Meetings Today Card | Shows today's meeting count for the logged-in employee. | Outlook calendar connection through Microsoft Graph. IT admin must approve calendar permission. | Use Graph API `GET /me/calendarView` with today's start and end time. Required permission: `Calendars.Read`. Count returned calendar events. |
| Sales Snapshot | Monthly manufactured/sold units and trend percentage. | Sales Analytics / MIS owner support. SharePoint editor access for Sales team. | Create SharePoint list `Sales Snapshot` with monthly rows: `manufactured`, `sold`, `trendPercent`, `periodLabel`. Site reads latest row. ERP/SAP API can be a later phase. |
| Employee Self Service Tiles | Clickable HR/service tiles like Team Directory, Policies, Travel, Recognition-GEM, Benefits, Leave, Documents, Forms, CSR. | IT/tool owners must provide final redirect URLs. Optional SharePoint list if URLs should be editable without dev. | Short term: update `services.config.js`. Better: SharePoint list `Self-Service Links` with `label`, `redirectUrl`, `enabled`, `iconKey`. Site reads list and renders tiles. |
| Self Service Redirect Links | Destination URLs for each tile. | Final production links from IT, HR, Payroll, Travel, Learning, Benefits, CSR, and Documents owners. | Maintain one master link list. Either put links in SharePoint `Self-Service Links` or hardcode in config if they rarely change. |
| Bajaj Bytes / Newsletter | Internal newsletter/catalog and company story links. | Corporate Communications support. Need newsletter URLs, cover images, and ownership for future volumes. | For simple links, use SharePoint list `Bajaj Bytes` with `volume`, `month`, `coverImageUrl`, `redirectUrl`, `isLatest`. For rich articles, use SharePoint News pages. |
| Company News Feed | News cards with headline, date, image, summary, and article body. | Corporate Communications / Marketing ownership. SharePoint News permissions. | Use SharePoint News pages from Site Pages where `PromotedState = 2`. Pull headline, image, date, category, and page URL through SharePoint REST API. |
| Notifications / Alerts Panel | List of company announcements such as IT maintenance, policy updates, urgent notices. | Corporate Communications / HR support. SharePoint list ownership. | Create SharePoint list `Announcements` with `title`, `body`, `date`, `type`, `isActive`. Store read/unread locally in browser unless user-level tracking is required. |
| Upcoming Events | Company-wide events like town halls, board meetings, training, annual events. | Admin / Corporate Affairs support. SharePoint calendar ownership. | Create SharePoint Calendar list `Company Events`. Site reads upcoming items. Fields: `label`, `date`, `time`, `location`, `eventType`. |
| Meetings Panel | Logged-in employee's upcoming Outlook meetings. | Outlook / Graph API support. IT approval for calendar access. | Same Graph API as Meetings Today: `GET /me/calendarView`. Required permission: `Calendars.Read`. Show meeting subject, time, location/Teams link. |
| Outlook Calendar Link | Button/link to open Outlook calendar. | No API needed for redirect. Need confirmation of enterprise Outlook URL. | Use redirect URL `https://outlook.office.com/calendar/`. For deep links to specific meetings, use Graph event `webLink` if available. |
| Holiday Calendar | Annual company/public holidays shown in dashboard and calendar widget. | HR support. SharePoint list editor access or yearly dev request. | Recommended: SharePoint list `Holiday Calendar` with `date`, `label`, `type`, `location`, `remarks`. Alternative: dev updates code once per year. |
| Calendar Widget | Month calendar view that highlights holidays/events. | Same data support as Holiday Calendar and Company Events. | Combine data from `Holiday Calendar` and `Company Events`. If personal calendar items are needed, add Graph calendar data separately. |
| Company Overview | Company/subsidiary cards and business descriptions. | Corporate Strategy / HR Leadership for approved content. Dev support for updates. | Keep hardcoded in `CompanyOverview.jsx` because it changes rarely. Update by dev when company structure/content changes. |
| Global Presence Globe | 3D globe with country dots and country names. | Export Sales / Corporate Strategy validates countries. Dev support for updates. | Keep country coordinates in code. Dev updates `BAJAJ_COUNTRIES` when countries change. SharePoint is not recommended because lat/lng and UI behavior need dev validation. |
| Bajaj Auto Presence Title | Location section title now shown inside the globe card. | Dev support only. | Keep title passed from `MainContent` to `LocationsSection`, then into `GlobePresence`. No SharePoint/API required. |
| Plants and Offices | Bajaj Auto plants, Bajaj Auto Technology Limited, regional office cards. | Facilities/Admin validates names, locations, and sub-locations. Dev support for updates. | Keep in `LOCATION_GROUPS` in code. Dev updates cards because map/satellite positions need manual visual alignment. |
| IT Resources | IT support links like ServiceNow, Intercom, BI Dashboard, CDMS, IT Portal. | IT team provides final URLs and owns updates. | Recommended: SharePoint list `IT Resource Links` with `label`, `sublabel`, `href`, `category`. Alternative: hardcode in `ITResources.jsx`. |
| Emergency Contacts | Fire, Dispensary/Medical, Security Control, HR Helpline. | Admin/Security/HR must own numbers. SharePoint edit access recommended. | Create SharePoint list `Emergency Contacts` with `label`, `phone`, `icon`, `priority`. Site reads four active rows. This avoids dev delay during number changes. |
| Feedback and Support | Feedback modal for employees to submit comments/issues. | HR/Platform team owns review. SharePoint list and Power Automate support. | Submit form to SharePoint list `Feedback Submissions`. Columns: `feedbackText`, `category`, `submittedBy`, `submittedAt`. Power Automate sends email notification to HR. |
| Jarvis Chatbot | Floating assistant for quick HR/IT/payroll/company questions. | Future API/backend support if real chatbot is needed. Content owners for approved answers. | Current version can stay static/mock. For live phase, connect to approved knowledge base/API. For ticket actions, integrate ServiceNow or ITSM API. |
| Footer | Brand lockup, social links, copyright, company description. | Dev support. Social link confirmation from Comms/Marketing. | Keep hardcoded. Update LinkedIn/Instagram URLs in Footer if they change. Copyright year is automatic through code. |

## SharePoint Lists Needed

| SharePoint List / Feature | Used For | Editors |
|---|---|---|
| `Active Banner` | Top urgent alert strip | Corporate Communications / HR |
| `Announcements` | Notifications and alerts panel | Corporate Communications / HR |
| `Sales Snapshot` | Monthly manufactured/sold metrics | Sales Analytics / MIS |
| `Self-Service Links` | Employee Self Service redirect URLs | IT / HR tool owners |
| `Bajaj Bytes` or SharePoint News | Newsletter volumes and company news | Corporate Communications |
| `Company Events` | Upcoming events | Admin / Corporate Affairs |
| `Holiday Calendar` | Annual holiday list | HR |
| `IT Resource Links` | IT tools and support URLs | IT |
| `Emergency Contacts` | Emergency phone numbers | Admin / Security / HR |
| `Feedback Submissions` | Employee feedback form responses | HR / Platform team |

## Developer Access Needed

| Area | Why Dev Access Is Needed |
|---|---|
| Header/navigation config | Rare navigation changes and section anchors |
| Company Overview | Static approved company/subsidiary content |
| Global Presence Globe | Country coordinates and 3D globe behavior |
| Plants and Offices | Location cards, satellite preview positions, visual alignment |
| Footer | Brand copy, social URLs, layout updates |
| Service adapters | Replacing mock data with SharePoint/Graph API adapters |
| Authentication setup in app | Login flow, token handling, Graph/SharePoint API calls |

## API / Microsoft Access Needed

| API / Access | Used For | Permission / Setup Needed |
|---|---|---|
| Microsoft Graph `GET /me` | Employee name, title, department | Azure AD app registration, `User.Read` |
| Microsoft Graph `GET /me/photo/$value` | Employee profile photo | Azure AD app registration, `User.Read` |
| Microsoft Graph `GET /me/calendarView` | Meetings today count and meetings list | Azure AD app registration, `Calendars.Read` |
| SharePoint REST API | Lists, news, calendar, announcements, links | SharePoint site access and app/user permissions |
| Power Automate | Email notification for feedback submissions | Flow owner and SharePoint trigger |
| ServiceNow / ITSM API, optional | Raise IT tickets from Jarvis or IT Resources | API endpoint, auth token, ITSM approval |

## Redirect Links Needed From Owners

| Link Area | Owner | Needed URLs |
|---|---|---|
| Employee Self Service tiles | IT / HR system owners | Team Directory, Policies, Travel, GEM, Compensation, Leave, Benefits, BOLT, Health, Documents, Idea Hub, Holiday Calendar, Mediclaim, Forms, CSR |
| IT Resources | IT | ServiceNow, Intercom/Internal ticketing, Qlik/BI Dashboard, CDMS, IT Portal |
| Bajaj Bytes | Corporate Communications | Volume 6, Volume 7, and future volume URLs |
| Outlook Calendar | IT/M365 | Usually `https://outlook.office.com/calendar/` |
| Social Links | Corporate Communications / Marketing | LinkedIn and Instagram official URLs |

## Recommended Rollout

| Phase | What To Do | Owner |
|---|---|---|
| Phase 1 | Confirm final redirect URLs and content owners | IT + HR + Comms |
| Phase 2 | Create SharePoint site and lists | SharePoint admin / IT |
| Phase 3 | Register Azure AD app for Graph and SharePoint access | IT / M365 admin |
| Phase 4 | Replace mock adapters with SharePoint and Graph adapters | Dev team |
| Phase 5 | Test profile, meetings, calendar, events, news, and feedback in staging | Dev + content owners |
| Phase 6 | Train list owners and go live | Project owner |

