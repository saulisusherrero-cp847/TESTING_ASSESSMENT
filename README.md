# FashionHub Automation Framework

**Playwright + TypeScript** · **Multi‑Environment** · **Cross‑Browser** · **CI‑Ready** · **Runs from PowerShell/CLI**

This repository contains a lean but production‑grade UI automation framework designed for the **FashionHub** site.
It emphasizes clean architecture (Page Object Model), deterministic configuration, and simple, repeatable commands.

- ✅ No manual browser installation (Playwright manages its own browser binaries)
- ✅ Multi‑environment support out of the box (CLI `TEST_ENV` with fallback to `env.config.json`)
- ✅ Cross‑browser execution (Chromium, Firefox, WebKit/Safari)
- ✅ CI‑friendly (retries, traces, screenshots/videos on failures)
- ✅ PowerShell‑ready commands (Windows) and cross‑platform compatible

---

## 1) Requirements

- **Node.js 18+**
- PowerShell, CMD or Bash (scripts are cross‑platform)

---

## 2) Project Structure

TESTING_ASSESSMENT/
├─ env.config.json               # Environment defaults and URLs (local/staging/production)
├─ package.json                  # NPM scripts and dev deps
├─ playwright.config.ts          # Global Playwright config
└─ src/
   ├─ pages/                     # Page Objects
   ├─ tests/                     # Test specs
   └─ utils/
      └─ envResolver.ts          # Resolves TEST_ENV + env.config.json

---

## 3) Install & First Run

```powershell
npm install
npm test
npm run test:report
```

---

## 4) Run by Environment

```powershell
npm run test:local
npm run test:staging
npm run test:production
```

---

## 5) Run by Browser & Headed Mode

```powershell
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:headed
npm run test:login
```

---

## 6) Local Development Notes

Ensure your local site is running at:

http://localhost:4000/fashionhub/

To check the port:

```powershell
Test-NetConnection -ComputerName localhost -Port 4000
```

---

## 7) Architecture & Design Principles

- Page Object Model (POM)
- Environment‑agnostic tests
- Centralized URL resolution
- Cross‑browser execution
- Traces, screenshots, and videos for debugging

---

## 8) CI/CD Tips

```bash
npm ci
npx playwright install --with-deps
npm test
npm run test:report
```

---

## 9) Troubleshooting

- Ensuring local server is running when testing local
- Ensuring port 4000 is open
- Ensuring correct environment using TEST_ENV

---

READY TEST.
