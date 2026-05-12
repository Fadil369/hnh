# Oracle Portals — Local Browser Steps

Date: 2026-05-12
Mode: Local Chromium via OpenClaw browser only

## Goal
Log into each Oracle portal one by one from the local browser, capture a screenshot, and keep a clear repeatable procedure.

## Procedure used
1. Ensure local browser is healthy with `browser status`.
2. Retrieve one portal credential at a time from the secrets vault.
3. Open the portal login page in local Chromium.
4. Snapshot the page to identify username/password/login refs.
5. Type username and password directly into the detected fields.
6. Click Login.
7. Wait for the post-login page/dashboard.
8. Capture a screenshot.
9. Repeat for the next portal.

## Notes
- Avoid bulk vault reads; fetch each credential individually.
- Prefer direct typing over form-fill on Oracle ADF login pages.
- If CDP gets unstable, restart `openclaw-browser.service` before continuing.

## Targets
- oracle_riyadh ✅ logged in via local browser, screenshot captured
- oracle_madinah ✅ logged in via local browser, screenshot captured
- oracle_unaizah
- oracle_khamis ✅ logged in via local browser, screenshot captured
- oracle_jizan
- oracle_abha
