# Wyltek Industries website

Source for **[wyltekindustries.com](https://wyltekindustries.com)**, the home of Wyltek Industries' open-source embedded hardware, ESP32 firmware and **Nervos CKB** tooling.

It is a static, no-build site served by GitHub Pages (`CNAME` → `wyltekindustries.com`). Each page is plain HTML with shared scripts in `js/`.

## What's on the site

| Area | Pages |
|---|---|
| CKB tools | `ckb.html`, `ckb-node-finder.html`, `ckb-node-update.html`, `ckb-sync.html`, `ckb-light-esp.html`, `ckbfs-viewer.html`, `spore-burner.html`, `mint/` |
| Hardware and firmware | `hardware.html`, `blackbox.html`, `flasher.html` (Web Serial flasher), `firmware/` (Guition 4848, NerdMiner CYD builds), `wyterminal/` |
| Projects | `fiberquest.html`, `fiberquest-rom-verifier.html`, `nervos-launcher.html`, `games/` |
| Research | `research.html` renders the Markdown notes in `research/`, `blog.html` + `posts/` |
| Community | `members.html`, `lounge.html`, `profile.html` (JoyID login, Supabase-backed) |
| AI | `ai-hub/` |

## Structure

- `js/`: shared site scripts. These include the JoyID connector (`joyid-connector.js`, `joyid-callback.html`), auth and member gating, CKB address formatting, the node finder, and PWA/offline support (`sw.js`, `site.webmanifest`).
- `workers/`: Cloudflare Worker sources used by the site, such as FiberQuest submissions.
- `research/`: research notes. **Synced automatically** from the research workspace; see below.
- `supabase-setup.sql`, `lounge-schema.sql`: database schema for the member and lounge features.
- `tests/`, `tests.html`: browser-run tests.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

JoyID login and Supabase-backed pages need the production origin or a configured callback URL to work fully.

## Automated commits

The `research/` folder and the stats on the home page are updated by an automated sync job (commits titled `research: sync findings…` and `stats: …[auto]`). Pull before you edit. Prefer pull requests for hand edits, so they don't race the sync.

## Related

- Everything else Wyltek publishes: [github.com/toastmanAu](https://github.com/toastmanAu)
