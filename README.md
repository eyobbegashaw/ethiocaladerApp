# ♰ ኢትዮጵያ ቀን መቁጠሪያ - Ethiopian Orthodox Tewahedo Calendar
## React Native Mobile Application

A premium, offline-first Ethiopian Orthodox Tewahedo spiritual calendar application built with **React Native**, **TypeScript**, and **Expo**.

Developed by **ዲ/ን ኢዮብ በጋሻው (Eyob Begashaw)**.  
Repository: [https://github.com/eyobbegashaw/Ethiopia_Calander](https://github.com/eyobbegashaw/Ethiopia_Calander)

---

## 🌟 App Highlights & Sacred Design
- **100% Offline-First Architecture**: No backend server, cloud database, or account creation required for core functionality.
- **Accurate Calendar Calculations**: Algorithmic conversion between Ethiopian and Gregorian calendars preserving all verified leap year (2015 % 4 === 3) and Pagumē rules (5 vs. 6 days).
- **Bahre Hasab (የባሕረ ሐሳብ ቀመር)**: Canonical calculations for movable feasts (Nineveh, Great Lent, Hosanna, Good Friday, Easter/Fasika, Ascension, Pentecost, Apostles' Fast).
- **Seven Canonical Fasts (ሰባቱ አጽዋማት)**: Complete rules and spiritual meaning for Abiy Tsom, Tsome Nebiyat, Tsome Nenewe, Tsome Hawaryat, Tsome Filseta, Tsome Dihnet (Wednesdays & Fridays), and Gahad vigils.
- **Synaxarium (ስንክሳር)**: Daily commemorations of Orthodox saints with Amharic biographies and text-to-speech audio narration.
- **Daily Liturgical Readings (ግጻዊ)**: Gospel, Epistle, and Old Testament readings.
- **Ge'ez Numeral Converter (ግእዝ ቁጥሮች)**: Two-way conversion between Arabic numbers (e.g., 2018) and authentic Ge'ez numerals (፳፻፲፰).
- **Bilingual Localization**: Full Amharic (አማርኛ) and English language support with instant switching.
- **Theming & Accessibility**: Light Theme (Warm Ivory), Dark Theme (Midnight Forest), System Follow, and 4 font size scales (Small, Medium, Large, Extra Large).
- **Favorites & Bookmarks**: Local persistence for sacred feast days, saints, and scriptures.

---

## 📱 Mobile Architecture

```
├── app.json                  # Expo / React Native Android configuration
├── tests/
│   └── calendar.test.js      # Automated test suite for calculations & fasting
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Main React Native application root
│   │   ├── calendar/
│   │   │   └── calendarCore.ts # Algorithmic calendar, leap year, Bahre Hasab, fasting logic
│   │   ├── components/
│   │   │   ├── BottomTabBar.tsx    # 5-tab mobile bottom bar
│   │   │   ├── MobileHeader.tsx    # Header with Ethiopian Cross motif & language toggle
│   │   │   ├── DrawerMenu.tsx      # Slide drawer for tools & quick settings
│   │   │   └── ManuscriptCard.tsx  # Sacred manuscript border card with cross accents
│   │   ├── context/
│   │   │   └── AppContext.tsx      # Global theme, font scale, language, and storage context
│   │   ├── database/
│   │   │   └── storage.ts          # Offline storage abstraction (AsyncStorage/localStorage)
│   │   ├── data/
│   │   │   ├── saintsData.ts       # Verified Synaxarium records for 365+ days
│   │   │   ├── gizaeData.ts        # Daily liturgical readings
│   │   │   ├── fastingData.ts      # The 7 canonical fasts & dietary rules
│   │   │   └── holidaysData.ts     # Major annual Orthodox feasts
│   │   ├── i18n/
│   │   │   └── translations.ts     # Complete Amharic & English translations
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx      # Today's Ethiopian date, saints, fasting, reflections
│   │   │   ├── CalendarScreen.tsx  # Interactive monthly calendar & date detail sheet
│   │   │   ├── SpiritualScreen.tsx # Synaxarium, Liturgical readings, Fasts, & Feasts
│   │   │   ├── ConverterScreen.tsx # Eth ⇄ GC date & Ge'ez numerals converter
│   │   │   ├── FavoritesScreen.tsx # Saved dates & commemorations
│   │   │   ├── ProfileScreen.tsx   # User profile, baptismal name, & preferences
│   │   │   ├── FastingScreen.tsx   # Dedicated fasting calendar guide
│   │   │   └── AboutScreen.tsx     # Developer info, mission, & offline verification
│   │   └── theme/
│   │       └── colors.ts           # Sacred color palettes and typography scales
```

---

## 🛠️ Setup & Running Instructions

### 1. Prerequisites
- **Node.js**: v20.x or v22.x
- **npm**: v10.x+
- **Expo CLI** (optional for native Android builds): `npm install -g expo-cli`
- **Android Studio & SDK** (for local Android emulator / device testing)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Automated Tests
Verify all calendar conversions, leap years, Ge'ez numerals, and fasting algorithms:
```bash
npm test
```

### 4. Run Development Server
```bash
npm run dev
```
The app will start at `http://localhost:3000` (available immediately in the preview).

---

## 🤖 Building the Android APK

### Option A: Using EAS Build (Cloud APK)
1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
2. Log in to your Expo account:
   ```bash
   eas login
   ```
3. Configure build credentials:
   ```bash
   eas build:configure
   ```
4. Build a standalone Android APK:
   ```bash
   eas build -p android --profile preview
   ```
   Download the generated `.apk` file directly to your Android device.

### Option B: Local Android Build (Bare React Native / Expo Prebuild)
1. Generate native Android project:
   ```bash
   npx expo prebuild --platform android
   ```
2. Run on connected Android device or emulator:
   ```bash
   npx expo run:android
   ```
3. Or assemble release APK via Gradle:
   ```bash
   cd android && ./gradlew assembleRelease
   ```
   The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`.

---

## 📜 Verified Religious Datasets & Guidelines
- **Fasting Calculations**: Implemented strictly according to the *Fetha Negest* (ፍትሐ ነገሥት) and the canons of the Ethiopian Orthodox Tewahedo Church.
- **Leap Year Rule**: An Ethiopian year is a leap year (ዘመነ ሉቃስ) if `year % 4 === 3`. Pagumē has 6 days in leap years and 5 days in common years.
- **Saints & Liturgy**: Bundled offline from verified traditional synaxarium and gizae liturgical records.

---

## 👤 Developer Information
- **Name**: ዲ/ን ኢዮብ በጋሻው (Eyob Begashaw)
- **Role**: Software Engineer & Church Servant
- **GitHub**: [https://github.com/eyobbegashaw/Ethiopia_Calander](https://github.com/eyobbegashaw/Ethiopia_Calander)
- **License**: MIT
