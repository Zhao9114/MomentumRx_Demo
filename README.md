# Momentum Rx

An AI fitness coaching demo app built with Expo + React Native. Shows a personalised 4-week training plan, macro tracking, and a real-time coach chat powered by Claude.

> **Demo note:** All screens work out of the box with mock data. Live AI responses require a backend — see the optional section at the bottom.

---

## What it looks like

- **Splash** — branded intro screen
- **Intake** — 7-step onboarding (name, goal, days, experience, weight, injuries, friction point)
- **Today** — daily session, macros, coach message, weekly Physics 101 theme
- **Plan** — 4-week calendar view with expandable sessions per day
- **Coach** — real-time chat with an AI coach persona
- **Progress** — weight trend, streak, phase progress

---

## Prerequisites

You need three things installed on your computer:

### 1. Node.js (v20 or higher)

Check if you have it:
```bash
node --version
```

If not, download from [nodejs.org](https://nodejs.org) — pick the LTS version.

### 2. Expo Go on your phone

- **iPhone:** [App Store → Expo Go](https://apps.apple.com/app/expo-go/id982107779)
- **Android:** [Play Store → Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)

> This app must be **SDK 54**. If you already have Expo Go installed, make sure it's up to date.

### 3. A code editor (optional but recommended)

[VS Code](https://code.visualstudio.com) is free and works well.

---

## Running the app

### Step 1 — Clone the repo

```bash
git clone https://github.com/your-username/momentum-rx.git
cd momentum-rx
```

### Step 2 — Install dependencies

```bash
npm install
```

This will take 1–2 minutes the first time.

### Step 3 — Start the development server

```bash
npx expo start
```

A QR code will appear in the terminal.

### Step 4 — Open on your phone

- **iPhone:** Open the Camera app, point it at the QR code, tap the banner that appears.
- **Android:** Open the Expo Go app, tap "Scan QR code", point at the QR code.

> Your phone and computer must be on the **same WiFi network.**
>
> If that doesn't work (e.g. corporate WiFi, separate networks), run this instead:
> ```bash
> npx expo start --tunnel
> ```
> Tunnel routes through Expo's servers so WiFi doesn't matter — it's slightly slower to load.

### Step 5 — Use the app

The app loads with mock data so everything works immediately. Go through the intake flow, explore the Today/Plan/Progress tabs, and try the Coach tab (it will show a "backend not connected" message until the API is set up).

---

## Project structure

```
app/
  index.tsx              # splash screen
  intake/
    [step].tsx           # 7-step intake form (dynamic route)
    loading.tsx          # plan generation loading screen
  (tabs)/
    today.tsx            # daily workout + macros
    plan.tsx             # 4-week plan calendar
    coach.tsx            # AI chat
    progress.tsx         # stats + trends
components/
  Card.tsx               # white surface card
  ChatBubble.tsx         # chat message bubble
  MacroRing.tsx          # circular macro progress ring
  WorkoutBlock.tsx       # single exercise row
  ProgressDots.tsx       # intake step indicator
lib/
  api.ts                 # fetch calls to the backend
  schemas/               # zod validation schemas
  prompts/               # system prompt builders
  mock/                  # mock plan + workout (used without backend)
store/
  useProfile.ts          # intake answers (zustand)
  useChat.ts             # chat messages (zustand)
  usePlan.ts             # active plan (zustand)
types/
  index.ts               # TypeScript types inferred from schemas
```

---

## Tech stack

| Layer | Library | Why |
|---|---|---|
| Framework | Expo SDK 54 + TypeScript | Fastest path to a real phone app |
| Routing | expo-router | File-based, like Next.js |
| Styling | NativeWind v4 (Tailwind CSS) | Write Tailwind classes in React Native |
| State | Zustand | Simple, no boilerplate |
| Validation | Zod | Runtime schema checking |
| Icons | @expo/vector-icons (Feather) | Ships with Expo |

---

## Common issues

**"Unable to find expo in this project" or similar**
Run `npm install` first, then try again.

**QR code doesn't work on iPhone**
Make sure you're using the default Camera app, not a third-party one. Tap the notification banner that appears at the top of the screen.

**App loads but shows a red error screen**
Take a screenshot of the error and open an issue. Most common cause is a Node version below 20 — check with `node --version`.

**"Network request failed" in the Coach tab**
Expected — the AI backend isn't connected. All other screens still work normally.

**Changes aren't showing on my phone**
The app hot-reloads automatically when you save a file. If it gets stuck, shake your phone to open the Expo menu and tap "Reload".

---

## Optional: connecting the AI backend

The Coach chat and plan generation use a separate Python FastAPI backend that holds the Anthropic API key. Without it, the app uses mock data and shows an error in the Coach tab.

To connect it:

1. Deploy the backend from the `momentum-rx-api` repo (separate repository — see its README for Railway deploy steps)
2. Create a `.env` file in this project:
   ```
   EXPO_PUBLIC_BACKEND_URL=https://your-railway-url.up.railway.app
   ```
3. Restart Metro (`npx expo start`)

Live AI then works with no other changes.

---

## License

MIT
