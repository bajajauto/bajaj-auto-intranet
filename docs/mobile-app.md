# Bajaj One on Android (work profile)

The intranet ships to phones as an installable web app (PWA), published to the
Android work profile through Intune as a **Managed Google Play web app**. There
is no APK to build or sign — every web deploy is also the app update.

## What the app provides

- `manifest.webmanifest` — name "Bajaj One", standalone display, brand-dark
  theme, icons (any + maskable) generated from the product mark (`npm run icons`)
- `sw.js` — precaches the app shell so launches are fast and survive a flaky
  connection. Policies, forms and API responses are **not** cached.
- Sign-in: the same Entra ID (MSAL) redirect flow as the browser. When launched
  from the home screen the token cache is `localStorage`, so users are not asked
  to sign in every time Android kills the app; browser tabs keep `sessionStorage`
  for shared plant PCs.

The service worker exists only in `npm run build` output, never in `npm run dev`.

## Prerequisites (before IT can publish)

1. **HTTPS hosting reachable from the phone.** Either public hosting protected
   by Entra sign-in + Conditional Access, or internal hosting published through
   Entra Application Proxy / Microsoft Tunnel. Service workers require HTTPS.
2. **API auth (step C).** The API must verify Entra JWTs before it is reachable
   from outside the network.
3. **Entra app registration** (`bajaj-intranet-web`, SPA platform): add
   `https://<prod-host>/auth/callback` as a redirect URI and
   `https://<prod-host>/signed-out` as the logout URL. No Android-specific
   registration is needed — this is still a web app.

## Intune steps (Intune admin)

1. Intune admin center → Apps → Android → Add → **Managed Google Play app**.
2. In the Managed Google Play iframe → **Web apps** → `+`:
   - Title: `Bajaj One`
   - URL: `https://<prod-host>/`
   - Display: **Standalone**
   - Icon: upload `public/icons/icon-512.png`
3. Save, wait for Google to publish it (can take ~10 minutes), sync in Intune.
4. Assign as **Required** (or Available) to the target group for
   *Android Enterprise personally-owned / corporate work profile* devices.

## Sign-in experience

- The web app opens in the work profile's Chrome. The first launch shows the
  Microsoft sign-in page; with Authenticator or Company Portal installed as the
  broker, MFA and device-compliance Conditional Access work as they do for other
  Entra web apps.
- Optional Conditional Access: require a compliant device for the
  `bajaj-intranet-web` and `bajaj-intranet-api` app registrations.

## Testing without Intune

On an Android phone, open `https://<host>/` in Chrome or Edge →
menu → **Install app** / **Add to home screen**. It behaves the same as the
Intune-published app.
