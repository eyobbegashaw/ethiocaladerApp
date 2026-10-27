export type SupportedLanguage = 'am' | 'en';

export const translations = {
  am: {
    // App Branding
    appName: 'ኢትዮጵያ ቀን መቁጠሪያ',
    appSubtitle: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን',
    appTagline: 'በጊዜ የጸና · በባሕል የደመቀ · በእምነት የታነጸ',

    // Navigation Tabs
    navHome: 'ዋና ገጽ',
    navCalendar: 'መቁጠሪያ',
    navSpiritual: 'መንፈሳዊ',
    navFavorites: 'የተወደዱ',
    navProfile: 'መገለጫ',

    // Drawer / Secondary Menu
    menuTitle: 'ተጨማሪ መሣሪያዎች',
    menuConverter: 'ቀን መቀየሪያ',
    menuFasting: 'አጽዋማት',
    menuBahreHasab: 'ባሕረ ሐሳብ',
    menuGeezNumbers: 'ግእዝ ቁጥሮች',
    menuAbout: 'ስለ መተግበሪያው',
    menuSettings: 'ማስተካከያ',
    closeMenu: 'ዝጋ',

    // Home Screen
    todayEthiopia: 'ዛሬ በኢትዮጵያ',
    gregorianEquivalent: 'የፈረንጆች አቆጣጠር',
    evangelistYear: 'የዘመኑ ወንጌላዊ',
    todaySaint: 'የዕለቱ ቅዱሳንና መታሰቢያ',
    fastingStatus: 'የዕለቱ የጾም ሁኔታ',
    isFastingToday: 'ዛሬ የጾም ቀን ነው',
    isNotFastingToday: 'ዛሬ የፍስክ ቀን ነው',
    dailyReflection: 'የዕለቱ ቃለ እግዚአብሔር',
    dailyReading: 'የዕለቱ ግጻዌ ንባብ',
    quickAccess: 'ፈጣን መዳረሻዎች',
    upcomingFeasts: 'የሚመጡ በዓላትና አጽዋማት',
    viewAllFeasts: 'ሁሉንም በዓላት ይመልከቱ',
    exploreCalendar: 'ወደ መቁጠሪያው ሂድ',
    convertDate: 'ቀን ቀይር',
    readSynaxarium: 'ስንክሳር አንብብ',
    readScripture: 'ግጻዊ ንባብ',
    readBahreHasab: 'የባሕረ ሐሳብ ቀመር',

    // Calendar Screen
    monthCalendar: 'የወሩ መቁጠሪያ',
    todayButton: 'ዛሬ',
    prevMonth: 'ቀዳሚ ወር',
    nextMonth: 'ቀጣይ ወር',
    toggleGeezNumerals: 'ግእዝ ቁጥሮች',
    calendarDaysHeader: ['እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
    selectedDateTitle: 'የተመረጠው ቀን ዝርዝር',
    dateDetailGregorian: 'የፈረንጅ አቻ ቀን',
    dateDetailFasting: 'የጾም ሁኔታ',
    dateDetailCommemoration: 'የዕለቱ ጽላት / መታሰቢያ',
    dateDetailSynaxarium: 'ስንክሳር',
    dateDetailReading: 'የዕለቱ ንባብ',
    addToFavorites: 'ወደ ተወደዱ አክል',
    removeFromFavorites: 'ከተወደዱ አስወግድ',
    closeDetail: 'ዝጋ',

    // Spiritual Screen
    spiritualTabs: {
      synaxarium: 'ስንክሳር',
      readings: 'ግጻዊ (ንባባት)',
      fasts: 'ሰባቱ አጽዋማት',
      feasts: 'የባሕረ ሐሳብ በዓላት',
    },
    synaxariumSearchPlaceholder: 'ቅዱሳንን በስም ወይም በወር ፈልግ...',
    noSaintsFound: 'ለዚህ ቀን የተመዘገበ ዝርዝር አልተገኘም።',
    shareText: 'አጋራ',
    copyText: 'ገልብጥ',
    copiedAlert: 'ጽሑፉ ወደ ቅንጥብ ሰሌዳ ተገልብጧል!',
    listenAudio: 'አዳምጥ',
    stopAudio: 'አቁም',

    // Converter Screen
    converterTitle: 'ቀንና ግእዝ ቁጥር መቀየሪያ',
    ethToGcTab: 'ከኢትዮጵያ ወደ ፈረንጅ',
    gcToEthTab: 'ከፈረንጅ ወደ ኢትዮጵያ',
    geezConverterTab: 'ግእዝ ⇄ አረብኛ ቁጥር',
    selectEthDate: 'የኢትዮጵያ ቀን ይምረጡ',
    selectGcDate: 'የፈረንጅ ቀን ይምረጡ',
    yearLabel: 'ዓመተ ምሕረት (ዓ.ም.)',
    monthLabel: 'ወር',
    dayLabel: 'ቀን',
    convertAction: 'ቀይር',
    conversionResult: 'የተቀየረው ውጤት',
    copyResult: 'ውጤቱን ቅዳ',
    shareResult: 'ውጤቱን አጋራ',
    invalidDateError: 'እባክዎ ትክክለኛ ቀን ያስገቡ። ጳጉሜ በዘመነ ሉቃስ 6 ቀን፤ በሌሎች ዘመናት 5 ቀን ናት።',

    // Ge'ez Numbers
    arabicNumberInput: 'የአረብኛ ቁጥር ያስገቡ (ምሳሌ፡ 2018)',
    geezNumberInput: 'የግእዝ ቁጥር ያስገቡ (ምሳሌ፡ ፳፻፲፰)',
    toGeezBtn: 'ወደ ግእዝ ቀይር',
    toArabicBtn: 'ወደ አረብኛ ቀይር',

    // Fasting Screen
    fastingScreenTitle: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ሰባቱ አጽዋማት',
    fastingSubtitle: 'በፍትሐ ነገሥትና በቀኖና ቤተ ክርስቲያን የተደነገጉ ታላላቅ አጽዋማት',
    fastDuration: 'የጾሙ ቆይታ',
    fastTiming: 'የሚጾምበት ወቅት',
    fastPurpose: 'የጾሙ ምክንያትና መንፈሳዊ ትርጉም',
    fastRules: 'የአመጋገብና የጾም ደንብ',
    scripturalBasis: 'የመጽሐፍ ቅዱስ መሠረት',

    // Favorites Screen
    favoritesTitle: 'የተወደዱ ቀናትና መታሰቢያዎች',
    noFavoritesYet: 'እስካሁን ያከሏቸው የተወደዱ ቀናት የሉም። ከመቁጠሪያው ወይም ከስንክሳሩ ላይ የልብ ምልክቱን በመንካት ማከል ይችላሉ።',
    clearAllFavorites: 'ሁሉንም አጽዳ',

    // Profile & Settings
    profileTitle: 'የተጠቃሚ መገለጫና ማስተካከያ',
    displayName: 'የስም መገለጫ',
    baptismalName: 'የክርስትና ስም',
    parishLabel: 'ደብር / አጥቢያ ቤተ ክርስቲያን',
    editProfile: 'መገለጫ አድስ',
    saveProfile: 'አስቀምጥ',
    languageSection: 'ቋንቋ (Language)',
    themeSection: 'ገጽታ (Theme)',
    fontSizeSection: 'የፊደል መጠን (Font Size)',
    geezNumeralsSetting: 'በቀን መቁጠሪያው ላይ የግእዝ ቁጥሮችን አሳይ',
    notificationsSetting: 'የጾም ቀናት ማሳሰቢያ',
    resetSettings: 'ሁሉንም ማስተካከያዎች ወደ ቀደመው መልስ',
    resetConfirm: 'እርግጠኛ ነዎት ሁሉንም ማስተካከያዎችና የተወደዱትን ማጥፋት ይፈልጋሉ?',

    // Themes
    themeLight: 'ብርሃናማ (Light)',
    themeDark: 'ጨለማ (Dark)',
    themeSystem: 'እንደ መሣሪያው (System)',

    // Font Sizes
    fontSmall: 'አነስተኛ (Small)',
    fontMedium: 'መካከለኛ (Medium)',
    fontLarge: 'ትልቅ (Large)',
    fontXLarge: 'በጣም ትልቅ (Extra Large)',

    // About Screen
    aboutTitle: 'ስለ መተግበሪያውና አዘጋጁ',
    developedBy: 'አዘጋጅ (Developer)',
    developerName: 'ዲ/ን ኢዮብ በጋሻው (Eyob Begashaw)',
    developerBio: 'የሶፍትዌር መሃንዲስና የቤተ ክርስቲያን አገልጋይ፤ የኢትዮጵያን የበለጸገ መንፈሳዊና ባሕላዊ ቅርስ በዘመናዊ የሞባይል ቴክኖሎጂ ለማቅረብ የተተጋ።',
    appMission: 'የመተግበሪያው ዓላማ',
    appMissionText: 'ይህ የሞባይል መተግበሪያ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ምእመናን ትክክለኛውን የዘመን አቆጣጠር፣ የባሕረ ሐሳብ ቀመር፣ ስንክሳር፣ ግጻዌና አጽዋማትን ያለ ምንም የበይነመረብ (Internet) ግንኙነት በቀላሉ በእጃቸው እንዲያገኙ ታስቦ የተዘጋጀ ነው።',
    sourceCodeRepo: 'የምንጭ ኮድ (GitHub Repository)',
    versionLabel: 'የስሪት ቁጥር',
    offlineStatusLabel: 'ከበይነመረብ ውጭ (Offline) አሠራር',
    offlineStatusText: 'ሙሉ በሙሉ ያለ ኢንተርኔት ይሰራል (100% Offline Ready)',
    acknowledgements: 'ምስጋናና ክብር',
    acknowledgementsText: 'ስለ ሁሉ ነገር ስሙ ለዘላለም የተመሰገነ ይሁን አምላካችን እግዚአብሔር! እንዲሁም ለኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ሊቃውንት ክብር ይሁን።',
  },
  en: {
    // App Branding
    appName: 'Ethiopian Calendar',
    appSubtitle: 'Ethiopian Orthodox Tewahedo Church',
    appTagline: 'Rooted in Time · Guided by Tradition · Anchored in Faith',

    // Navigation Tabs
    navHome: 'Home',
    navCalendar: 'Calendar',
    navSpiritual: 'Spiritual',
    navFavorites: 'Favorites',
    navProfile: 'Profile',

    // Drawer / Secondary Menu
    menuTitle: 'Spiritual Tools',
    menuConverter: 'Date Converter',
    menuFasting: 'Fasting Calendar',
    menuBahreHasab: 'Bahre Hasab',
    menuGeezNumbers: "Ge'ez Numerals",
    menuAbout: 'About App',
    menuSettings: 'Settings',
    closeMenu: 'Close',

    // Home Screen
    todayEthiopia: 'Today in Ethiopia',
    gregorianEquivalent: 'Gregorian Equivalent',
    evangelistYear: 'Year of Evangelist',
    todaySaint: "Today's Saints & Commemoration",
    fastingStatus: 'Fasting Status',
    isFastingToday: 'Today is a Fasting Day',
    isNotFastingToday: 'Non-Fasting Day',
    dailyReflection: 'Daily Spiritual Reflection',
    dailyReading: 'Liturgical Reading (Gizae)',
    quickAccess: 'Quick Access',
    upcomingFeasts: 'Upcoming Feasts & Fasts',
    viewAllFeasts: 'View All Feasts',
    exploreCalendar: 'Open Calendar',
    convertDate: 'Convert Date',
    readSynaxarium: 'Read Synaxarium',
    readScripture: 'Daily Scripture',
    readBahreHasab: 'Bahre Hasab Calculator',

    // Calendar Screen
    monthCalendar: 'Monthly Calendar',
    todayButton: 'Today',
    prevMonth: 'Previous Month',
    nextMonth: 'Next Month',
    toggleGeezNumerals: "Ge'ez Numerals",
    calendarDaysHeader: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    selectedDateTitle: 'Selected Date Details',
    dateDetailGregorian: 'Gregorian Date',
    dateDetailFasting: 'Fasting Status',
    dateDetailCommemoration: 'Daily Commemoration',
    dateDetailSynaxarium: 'Synaxarium (Sinksar)',
    dateDetailReading: 'Daily Liturgy',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    closeDetail: 'Close',

    // Spiritual Screen
    spiritualTabs: {
      synaxarium: 'Synaxarium',
      readings: 'Liturgy (Gizae)',
      fasts: 'The 7 Fasts',
      feasts: 'Bahre Hasab Feasts',
    },
    synaxariumSearchPlaceholder: 'Search saints by name or month...',
    noSaintsFound: 'No commemorations recorded for this date.',
    shareText: 'Share',
    copyText: 'Copy',
    copiedAlert: 'Copied to clipboard!',
    listenAudio: 'Listen',
    stopAudio: 'Stop',

    // Converter Screen
    converterTitle: "Date & Ge'ez Converter",
    ethToGcTab: 'Ethiopian to Gregorian',
    gcToEthTab: 'Gregorian to Ethiopian',
    geezConverterTab: "Ge'ez ⇄ Arabic Numbers",
    selectEthDate: 'Select Ethiopian Date',
    selectGcDate: 'Select Gregorian Date',
    yearLabel: 'Ethiopian Year (E.C.)',
    monthLabel: 'Month',
    dayLabel: 'Day',
    convertAction: 'Convert',
    conversionResult: 'Conversion Result',
    copyResult: 'Copy Result',
    shareResult: 'Share Result',
    invalidDateError: 'Please enter a valid date. Pagume has 6 days in leap years and 5 in common years.',

    // Ge'ez Numbers
    arabicNumberInput: 'Enter Arabic number (e.g., 2018)',
    geezNumberInput: "Enter Ge'ez numeral (e.g., ፳፻፲፰)",
    toGeezBtn: "Convert to Ge'ez",
    toArabicBtn: 'Convert to Arabic',

    // Fasting Screen
    fastingScreenTitle: 'The Seven Canonical Fasts',
    fastingSubtitle: 'Fasts decreed in the Fetha Negest and canons of the Ethiopian Orthodox Tewahedo Church',
    fastDuration: 'Duration',
    fastTiming: 'Observed Period',
    fastPurpose: 'Spiritual Meaning & Purpose',
    fastRules: 'Dietary & Fasting Rules',
    scripturalBasis: 'Biblical Foundation',

    // Favorites Screen
    favoritesTitle: 'Saved Dates & Commemorations',
    noFavoritesYet: 'No favorites saved yet. Tap the heart icon on any calendar date or commemoration to bookmark it.',
    clearAllFavorites: 'Clear All',

    // Profile & Settings
    profileTitle: 'User Profile & Settings',
    displayName: 'Display Name',
    baptismalName: 'Baptismal Name (Christian Name)',
    parishLabel: 'Parish / Home Church',
    editProfile: 'Edit Profile',
    saveProfile: 'Save Profile',
    languageSection: 'Language',
    themeSection: 'Theme',
    fontSizeSection: 'Font Size',
    geezNumeralsSetting: "Show Ge'ez numerals on calendar",
    notificationsSetting: 'Fasting day reminders',
    resetSettings: 'Reset All Preferences',
    resetConfirm: 'Are you sure you want to reset all preferences and favorites to default?',

    // Themes
    themeLight: 'Warm Ivory (Light)',
    themeDark: 'Midnight Forest (Dark)',
    themeSystem: 'Follow System',

    // Font Sizes
    fontSmall: 'Small',
    fontMedium: 'Medium',
    fontLarge: 'Large',
    fontXLarge: 'Extra Large',

    // About Screen
    aboutTitle: 'About & Developer',
    developedBy: 'Developer',
    developerName: 'Deacon Eyob Begashaw',
    developerBio: 'Software engineer and dedicated servant of the Ethiopian Orthodox Tewahedo Church, committed to bringing sacred cultural heritage to modern mobile experiences.',
    appMission: 'Mission & Purpose',
    appMissionText: 'This mobile application is built to empower Ethiopian Orthodox Tewahedo faithful and enthusiasts worldwide with verified calendar calculations, Bahre Hasab, daily Synaxarium commemorations, liturgical readings, and fasting guides without requiring an active internet connection.',
    sourceCodeRepo: 'Source Code Repository',
    versionLabel: 'Version',
    offlineStatusLabel: 'Offline Architecture',
    offlineStatusText: '100% Offline Capable — zero external server dependencies',
    acknowledgements: 'Acknowledgements',
    acknowledgementsText: 'Glory be to God in the highest! Heartfelt gratitude to the fathers, scholars, and teachers of the Ethiopian Orthodox Tewahedo Church who preserved this sacred calendar.',
  },
};
