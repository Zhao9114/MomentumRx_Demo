# Momentum Rx — React Native App

AI fitness coaching demo app built with Expo + TypeScript. Pitch demo for Momentum gym.

## Stack

- **Expo SDK 54** + expo-router (file-based routing)
- **NativeWind v4** (Tailwind CSS for React Native)
- **Zustand** (state: profile, chat, plan)
- **Zod** (schema validation)
- **Python FastAPI backend** — see `momentum-rx-api/`

## Getting started

### Prerequisites

- Node 20+
- Expo Go on your phone (SDK 54)

### Run

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go. Phone and laptop must be on the same WiFi, or use `--tunnel`.

### Backend

Set the backend URL in `.env` (copy from `.env.example`):

```
EXPO_PUBLIC_BACKEND_URL=https://your-railway-url.up.railway.app
```

Without this, the app falls back to mock data — all screens still work.

## Project structure

```
app/
  index.tsx           # splash
  intake/             # 7-step intake flow
  (tabs)/             # today, plan, coach, progress
components/           # Card, ChatBubble, MacroRing, WorkoutBlock, ProgressDots
lib/
  api.ts              # fetch calls to backend
  schemas/            # zod schemas
  prompts/            # system prompt builders
  mock/               # mock plan + workout data
store/                # zustand stores
types/                # inferred from zod schemas
```

## Demo flow

1. Splash → Get Started
2. 7-step intake (name, goal, days, experience, weight, injuries, friction)
3. Loading screen (rotating messages, calls backend or falls back to mock)
4. Today tab — daily session, macros, coach message, weekly focus
5. Plan tab — 4-week calendar view, expandable sessions
6. Coach tab — real-time chat with Claude Haiku (requires backend)
7. Progress tab — stats, weight trend, phase progress
