# اكتشف الناظور (Discover Nador) — Android Application

A modern, native Android application built with **Kotlin** and **Jetpack Compose**, rewritten from the original Nador guide to deliver an immersive visitor guide for Nador, Marchica Lagoon, Mount Gourougou, and the Rif region.

## Key Features

- **Multilingual Support (i18n):** Instant switching between Arabic (العربية with full RTL layout support), English, and French.
- **Curated Destinations:** Beaches (Charrana, Boukana, Ras El Ma), Marchica Lagoon, Mount Gourougou, and Gourougou Forest with high-resolution imagery and area highlights.
- **Interactive Map Explorer:** Category-based visual map canvas and coordinate markers with direct one-tap opening in Google Maps or OpenStreetMap navigation.
- **Outdoor Activities & Safety:** Lagoon boat tours, mountain trekking, and swimming guidance paired with live safety checks.
- **Flexible Itineraries:** Step-by-step curated day plans for families ("يوم عائلي") and youth adventure ("يوم للشباب").
- **Dining & Refreshment Directory:** Filterable by category (Restaurants vs. Cafés) and region (Corniche, Marchica, Central Nador, Ras El Ma).
- **Rif Heritage & Culture:** Historic Kasbah of Selouane, authentic Amazigh culture, and verified tourist service categories.
- **Personal Travel Checklist & Bookmarks:** Interactive checklist and saved places manager with persistent state.

## Architecture & Tech Stack

- **UI Framework:** 100% Jetpack Compose with Material 3 (M3).
- **Design System:** "Emerald & Brass" palette reflecting Nador's pine-covered hills and Mediterranean sands.
- **Language:** Kotlin 2.x
- **Image Loading:** Coil Compose with asynchronous decoding and placeholder support.
- **Architecture:** Clean Architecture / MVVM pattern with type-safe state models.
- **Navigation:** Adaptive bottom navigation bar with `BackHandler` support.

## Building and Running

```bash
# Build debug APK
gradle :app:assembleDebug

# Run unit tests
gradle :app:testDebugUnitTest
```

The resulting APK will be generated at `app/build/outputs/apk/debug/app-debug.apk`.
