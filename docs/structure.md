# Simpli Noti: project structure and patterns

This document explains how the project is laid out and the patterns to follow when adding code. Read it before adding a screen, component or icon. The layout deliberately matches the other apps in this family (Pass Dice, Pay Slice), so what you learn here carries over.

## Overview

Simpli Noti is an Expo (SDK 57) React Native app that schedules reminders as exact native alarms, built for Android first with iOS kept in step.

| Concern | Choice |
|---|---|
| Navigation | Expo Router (file-based), bottom tabs with a custom tab bar |
| Styling and theming | `react-native-unistyles` (light and dark themes) |
| Persisted settings | `react-native-mmkv` (the chosen theme) |
| Persisted reminders | `zustand` with `persist` on AsyncStorage (see `store/`) |
| Forms | `react-hook-form` with `zod` and the `components/react-hook-form` fields |
| Icons | `lucide-react-native`, plus two local brand logos |
| Fonts | Bebas Neue (headings), DM Sans (body), via `@expo-google-fonts` |
| Exact alarms | the local native module `modules/exact-notifications` (Kotlin and Swift) |
| In-app purchases | `expo-iap` (one-time tips on the Help Me tab) |
| Toasts | `react-native-toast-message` |
| Tests | Jest with the `jest-expo` preset |

Native modules (MMKV, Unistyles, `expo-iap`, the exact-notifications module) mean the app needs a development build. It does not run in Expo Go: `npx expo run:android`.

## Top-level layout

```
simpli-noti/
├── app.json              Expo config (name, package, plugins)
├── babel.config.js       Babel preset plus the Unistyles plugin (root: "src")
├── tsconfig.json         TypeScript config and the "@/..." path aliases
├── eslint.config.js      Lint config (`npx expo lint`)
├── eas.json              EAS build profiles
├── package.json          Dependencies, scripts and the Jest config
├── assets/               App icon, splash and adaptive icon layers, and expo.icon (iOS)
├── docs/                 Project documentation (this folder)
├── modules/              Local native modules (exact-notifications)
├── plugins/              Expo config plugins (with-gradle-memory)
├── .claude/, .vscode/    Editor and Claude Code settings (not app code)
└── src/                  All application code
```

`ios/`, `android/` and `.expo/` are generated and git-ignored. Never edit them by hand; native settings go in `app.json` or config plugins.

## `src/` layout

```
src/
├── app/            Routes only (Expo Router). Thin files.
├── features/       One folder per screen: the screen's UI, logic, data
├── layouts/        RootLayout (app shell), TabsLayout (tab pages) and StackLayout (pages outside the tabs)
├── components/     Reusable UI components, plus a barrel (index.ts)
├── assets/icon/    Our own SVG icon components (GitHub, LinkedIn)
├── constants/      Route names, page titles, layout numbers and the tab bar style (`getTabBarStyle`), date/time formats, storage keys
├── services/       Non-UI logic that talks to the native module (notifications)
├── store/          Zustand stores (the persisted reminders)
├── utils/          Small pure helpers (date and time display text) and their types
└── theme/          Unistyles setup: themes, fonts, saved-theme loading
```

### `app/` (routes)

Every file here is a route. Keep them thin: a route file only renders the matching feature.

```
app/
├── _layout.tsx                 Theme import, then renders layouts/root (RootLayout); re-exports expo-router's `ErrorBoundary` so a render error shows a retry screen instead of crashing
├── upsert-notifications.tsx    Add / edit screen -> features/upsert-notifications
└── (tabs)/
    ├── _layout.tsx             `TabsNavigator`: tabs navigator using the custom tab bar
    ├── index.tsx               Home tab      -> features/home
    ├── help-me.tsx             Help Me tab   -> features/help-me
    └── settings.tsx            Settings tab  -> features/settings
```

### `features/` (screens)

A feature folder holds everything for one screen:

| File | Purpose |
|---|---|
| `index.tsx` | The screen component (markup only) |
| `use-<feature>.ts` | The screen's logic and state, as a hook |
| `<feature>.interface.ts` | Types for the hook and screen |
| `<feature>.data.ts` | Static data (lists, labels, product IDs) |
| `<feature>.utils.ts` | Pure helper functions |
| `<feature>.styles.ts` | Unistyles styles |

Create only the files a feature needs. Examples:
- `home/`: the reminder list, grouped into Active and Disabled. `use-home.ts` reads the store and handles navigation.
- `upsert-notifications/`: the add and edit form. `use-upsert-notifications.ts` holds the form and the save flow, `upsert-notifications.utils.ts` the validation schema and form mapping, `upsert-notifications.data.ts` the repeat options, `upsert-notifications.interface.ts` the form types.
- `settings/`: `use-settings.ts` (theme toggle and saving, opening links, the Android battery-settings shortcut), `settings.interface.ts`, `settings.data.ts` (contact links), `settings.styles.ts`.
- `help-me/`: `use-help-me.ts` (store connection and purchases), `help-me.utils.ts` (product-ID and purchase-error helpers, plus the success, pending and error toasts), `help-me.data.ts` (tip tiers), `help-me.interface.ts`, `help-me.styles.ts`.

### `components/` (reusable UI)

Each component gets its own folder, named in kebab-case, with the same anatomy:

```
components/card/
├── index.tsx            The component (default export, a function declaration)
├── card.interface.ts    Props types
└── card.styles.ts       Styles (exported as cardStyles)
```

Add `use-<name>.ts` when the component has logic (state, animation, handlers) and `<name>.utils.ts` or `<name>.data.ts` for helpers and static data. Current components:
- `custom-switch/`, `custom-tab-bar/`, `tab-item/`, `app-icon/`, `action-card/`, `card/`, `screen-title/`, `short-heading/`, `button/`: the building blocks shared with the other apps. `app-icon/` renders any Lucide-style icon at a given size, color and stroke width. `app-icon/`, `custom-switch/` and `tab-item/` keep their static constants in `<name>.data.ts`.
- `notification-card/`, `error-and-no-data/`: the reminder row and the empty state.
- `time-picker/`: the wheel time picker used by the form.
- `react-hook-form/`: form fields wired to `react-hook-form` (`RHFForm`, `RHFTextField`, `RHFDatePicker`, `RHFTimePicker`, `RHFSelect`). `rhf-field-label/`, `rhf-field-error/`, `rhf-picker-field/` (the label, tappable trigger and error shared by the date, time and select fields) and `rhf-modal-sheet/` (the bottom sheet, with an optional Confirm button) are the shared pieces those fields are built from. Their hooks use `export default function`, like every other hook.
- Components never import from `features/`, and import each other with relative paths. Shared constants (such as date formats) come from `@/constants`.

`components/index.ts` is the barrel. Every component is exported from it. Inside `components/`, import siblings by relative path (`../card`), not through the barrel. Screens import from `@/components`. Interface files import each other's types by path (for example `@/components/app-icon/app-icon.interface`), because the barrel exports components only. `assets/icon/` does the same for `IBrandIconProps`.

### `layouts/`

Each layout is a folder with the same anatomy as a component and is exported from `layouts/index.ts`.

- `root/` (`RootLayout`): the app shell rendered by `app/_layout.tsx`. It loads fonts, keeps the splash screen up until they are ready, syncs the native alarms with the saved reminders (on start and whenever the app returns to the foreground), and renders the gesture root, safe area provider, status bar, stack and toast host. Its logic is in `use-root-layout.ts`.
- `tabs/` (`TabsLayout`): safe area, the page title (`ScreenTitle`), a scrolling body, and padding so content clears the floating tab bar. Every tab screen renders inside it and passes its title as `titleProps`.
- `stack/` (`StackLayout`): the same page frame without tab-bar padding, for screens outside the tabs (the add and edit screen).

### `assets/icon/` (our own icons)

Lucide 1.x no longer includes brand logos, so `github.tsx` and `linkedin.tsx` are small outlined SVG components built with `react-native-svg`. They are exported from `index.ts` and take `size`, `color` and `strokeWidth` like Lucide icons. Add any other custom icon here.

### `services/` and `store/`

- `services/notifications/` (`services/index.ts` is the barrel; the logic is in `notifications.service.ts`, and `schedule-time.ts` has the time maths) wraps `modules/exact-notifications`: permission handling, scheduling, cancelling and `reconcile` (re-syncs the native alarms with the saved reminders after reboots, permission changes, clock changes and app upgrades).
- `store/notifications/` is the persisted Zustand store of reminders (`notifications.store.ts`, with its types in `notifications.interface.ts`, `notifications.data.ts` for the repeat values, and `notifications.utils.ts`, which checks stored records on load and drops invalid ones; `hydrationFailed` is set when the saved list cannot be read, so Home shows an error and hides the add button instead of waiting forever; re-exported from `index.ts`). Reminder data is saved in AsyncStorage, so changing that storage would need a migration for existing users.

### `utils/`

Small pure helpers with no framework code. `date-time-display.ts` turns a reminder's date, time and repeat into the text shown on its card, and has a test next to it.

### Hard-coded colours (intentional)

Theme colours come from the theme everywhere except two places: the dimmed backdrop behind the pickers' modals (`rgba(0,0,0,0.5)`, the same on both themes), and the default `color` of the GitHub and LinkedIn icons (`#000000`, a fallback prop value).

## Android manifest hardening

`app.json` sets `android.allowBackup` to `false`, so Google Drive auto-backup never copies the reminders or the saved theme. It also lists `blockedPermissions` for `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE` and `SYSTEM_ALERT_WINDOW`, which the Expo template adds but this app never uses. `VIBRATE` is left in place because the reminder channel vibrates. The native module's manifest adds `POST_NOTIFICATIONS` and `RECEIVE_BOOT_COMPLETED`. Its delivery receiver is not exported; the boot receiver is exported for system broadcasts and ignores any other action. These take effect on the next native build.

## App icon and splash

The icon is a red bell with a clock. The files are in `assets/`, and `app.json` points at them:
- `images/icon.png`: the main icon.
- `images/android-icon-foreground.png`, `android-icon-background.png` and `android-icon-monochrome.png`: the Android adaptive icon. Launchers keep only the monochrome layer's transparency and tint it one colour.
- `images/splash-icon.png`: the splash image, shown on the app's dark background.
- `expo.icon/`: the iOS icon (`Assets/bell.png` is its layer).

## Theme

`theme/unistyles.ts` defines the light and dark themes, loads the saved theme from MMKV and registers them with Unistyles. Dark is the default when nothing has been saved.

- Fonts: `theme.typography.heading.regular` (Bebas Neue) for screen titles and section headings, and `theme.typography.body.regular | medium | bold` (DM Sans) for everything else. Bebas Neue is all-caps, so never use it for text where upper and lower case must differ. The other apps also have a `mono` font (DM Mono); simpli-noti has no use for it yet. Each font is imported from its own sub-path (for example `@expo-google-fonts/dm-sans/700Bold`) so only the weights in use are bundled.
- Theme colors beyond the basics: `onPrimary` (text and icons on the primary color), `warning` and `destructive`, each with a `...Muted` background. Add new colors to both themes.

## Tests

Jest with the `jest-expo` preset (`pnpm test`). Tests so far: `utils/date-time-display.test.ts` and `services/notifications/schedule-time.test.ts`. Put a test next to the file it covers.
