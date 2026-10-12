# Simpli Noti

A simple reminder app for Android and iOS, built with Expo and React Native. Reminders are scheduled as exact native alarms, so they fire on time, and they are kept in step after reboots, clock changes and app updates.

## Run it

Requires a development build (it does not run in Expo Go).

```bash
pnpm install
npx expo run:android
```

Useful checks: `npx expo lint`, `npx tsc --noEmit`, `pnpm test`.

## Notes

- **Help Me tips:** purchases need three one-time products (`tip_coffee`, `tip_lunch`, `tip_feature`) set up in Google Play Console for the package `com.ahmersdev.simplinoti`, and a build installed from a Play test track. Without them the tip cards stay disabled, which is expected on a local build.
- See [docs/structure.md](docs/structure.md) for the project layout and patterns.
