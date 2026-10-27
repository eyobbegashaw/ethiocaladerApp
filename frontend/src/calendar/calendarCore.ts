export interface EthiopianDate {
  year: number;
  month: number;
  day: number;
}

export interface EthiopianFullDate extends EthiopianDate {
  monthNameAmharic: string;
  monthNameEnglish: string;
  weekdayAmharic: string;
  weekdayEnglish: string;
  geezDay: string;
  geezYear: string;
  evangelist: string;
  evangelistAmharic: string;
  gregorianDate: Date;
  isFasting: boolean;
  fastingName?: string;
  fastingNameAmharic?: string;
  fastingDescription?: string;
  isFeast: boolean;
  feastName?: string;
  feastNameAmharic?: string;
  monthlySaintAmharic?: string;
}

export const ETHIOPIAN_MONTHS_DATA = [
  { amharic: 'መስከረም', english: 'Meskerem', number: 1, days: 30 },
  { amharic: 'ጥቅምት', english: 'Tikimt', number: 2, days: 30 },
  { amharic: 'ኅዳር', english: 'Hidar', number: 3, days: 30 },
  { amharic: 'ታኅሣሥ', english: 'Tahsas', number: 4, days: 30 },
  { amharic: 'ጥር', english: 'Tir', number: 5, days: 30 },
  { amharic: 'የካቲት', english: 'Yekatit', number: 6, days: 30 },
  { amharic: 'መጋቢት', english: 'Megabit', number: 7, days: 30 },
  { amharic: 'ሚያዝያ', english: 'Miazia', number: 8, days: 30 },
  { amharic: 'ግንቦት', english: 'Ginbot', number: 9, days: 30 },
  { amharic: 'ሰኔ', english: 'Sene', number: 10, days: 30 },
  { amharic: 'ሐምሌ', english: 'Hamle', number: 11, days: 30 },
  { amharic: 'ነሐሴ', english: 'Nehase', number: 12, days: 30 },
  { amharic: 'ጳጉሜ', english: 'Pagume', number: 13, days: 5 }, // 6 in leap year
];

export const ETHIOPIAN_WEEKDAYS_DATA = [
  { amharic: 'ሰኞ', english: 'Monday' },
  { amharic: 'ማክሰኞ', english: 'Tuesday' },
  { amharic: 'ረቡዕ', english: 'Wednesday' },
  { amharic: 'ሐሙስ', english: 'Thursday' },
  { amharic: 'ዓርብ', english: 'Friday' },
  { amharic: 'ቅዳሜ', english: 'Saturday' },
  { amharic: 'እሁድ', english: 'Sunday' },
];

export const GREGORIAN_MONTHS_DATA = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Existing verified Ge'ez numeral conversion (from repository)
const GEEZ_BASE: Record<number, string> = {
  1: '፩', 2: '፪', 3: '፫', 4: '፬', 5: '፭', 6: '፮', 7: '፯', 8: '፰', 9: '፱',
  10: '፲', 20: '፳', 30: '፴', 40: '፵', 50: '፶', 60: '፷', 70: '፸', 80: '፹', 90: '፺', 100: '፻',
};

const GEEZ_VALUES: Record<string, number> = {
  '፩': 1, '፪': 2, '፫': 3, '፬': 4, '፭': 5, '፮': 6, '፯': 7, '፰': 8, '፱': 9,
  '፲': 10, '፳': 20, '፴': 30, '፵': 40, '፶': 50, '፷': 60, '፸': 70, '፹': 80, '፺': 90,
};

export function toEthNum(num: number): string {
  if (num === 0) return '0';
  if (!Number.isInteger(num) || num < 0) return String(num);

  let res = '';
  if (num >= 10000) {
    const t = Math.floor(num / 10000);
    res += (t > 1 ? toEthNum(t) : '') + '፼';
    num %= 10000;
  }
  if (num >= 100) {
    const h = Math.floor(num / 100);
    res += (h > 1 ? toEthNum(h) : '') + '፻';
    num %= 100;
  }
  if (num >= 10) {
    const t = Math.floor(num / 10) * 10;
    res += GEEZ_BASE[t] || '';
    num %= 10;
  }
  if (num > 0) res += GEEZ_BASE[num];
  return res;
}

export function arabicToGeez(value: number): string {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new RangeError('Enter a positive whole number.');
  }

  const parts: string[] = [];
  let remaining = value;

  if (remaining >= 10000) {
    const tenThousands = Math.floor(remaining / 10000);
    parts.push(`${tenThousands > 1 ? arabicToGeez(tenThousands) : ''}፼`);
    remaining %= 10000;
  }

  if (remaining >= 100) {
    const hundreds = Math.floor(remaining / 100);
    parts.push(`${hundreds > 1 ? arabicToGeez(hundreds) : ''}፻`);
    remaining %= 100;
  }

  if (remaining >= 10) {
    const tens = Math.floor(remaining / 10) * 10;
    const symbol = Object.keys(GEEZ_VALUES).find((s) => GEEZ_VALUES[s] === tens);
    if (symbol) parts.push(symbol);
    remaining %= 10;
  }

  if (remaining > 0) {
    const symbol = Object.keys(GEEZ_VALUES).find((s) => GEEZ_VALUES[s] === remaining);
    if (symbol) parts.push(symbol);
  }

  return parts.join('');
}

export function geezToArabic(value: string): number {
  const numeral = value.replace(/\s+/g, '');
  if (!numeral || !/^[፩-፱፲-፺፻፼]+$/.test(numeral)) {
    throw new Error('Enter a valid Geez numeral using ፩-፱, ፲-፺, ፻, or ፼.');
  }

  let total = 0;
  let group = 0;

  for (const symbol of numeral) {
    if (symbol === '፻') {
      group = (group || 1) * 100;
    } else if (symbol === '፼') {
      total += (group || 1) * 10000;
      group = 0;
    } else {
      group += GEEZ_VALUES[symbol] || 0;
    }
  }

  const result = total + group;
  if (!Number.isSafeInteger(result)) {
    throw new RangeError('This Geez numeral is too large to convert safely.');
  }

  return result;
}

// Ethiopian leap year rule: year % 4 === 3 (e.g. 2015 % 4 === 3)
export function isEthLeap(year: number): boolean {
  return year % 4 === 3;
}

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

function utcDayNumber(year: number, month: number, day: number): number {
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month, day);
  return date.getTime() / MILLISECONDS_PER_DAY;
}

function localDateFromParts(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year, month, day);
  return date;
}

function ethiopianNewYearDayNumber(year: number): number {
  const gregorianYear = year + 7;
  const startDay = isEthLeap(year - 1) ? 12 : 11;
  return utcDayNumber(gregorianYear, 8, startDay);
}

// Verified Ethiopian to Gregorian conversion
export function ethToGC(ey: number, em: number, ed: number): Date {
  if (
    !Number.isInteger(ey) || ey < 1 ||
    !Number.isInteger(em) || em < 1 || em > 13 ||
    !Number.isInteger(ed) || ed < 1 ||
    ed > (em === 13 ? (isEthLeap(ey) ? 6 : 5) : 30)
  ) {
    throw new RangeError('Invalid Ethiopian date.');
  }

  const daysSinceNewYear = (em - 1) * 30 + ed - 1;
  const newYear = ethiopianNewYearDayNumber(ey);
  const convertedDay = newYear + daysSinceNewYear;
  const convertedDate = new Date(convertedDay * MILLISECONDS_PER_DAY);
  return localDateFromParts(
    convertedDate.getUTCFullYear(),
    convertedDate.getUTCMonth(),
    convertedDate.getUTCDate()
  );
}

// Verified Gregorian to Ethiopian conversion
export function gcToEth(gDate: Date): EthiopianDate {
  if (!(gDate instanceof Date) || Number.isNaN(gDate.getTime())) {
    throw new TypeError('A valid Gregorian date is required.');
  }

  const gregorianYear = gDate.getFullYear();
  const dateDayNumber = utcDayNumber(
    gregorianYear,
    gDate.getMonth(),
    gDate.getDate()
  );
  const possibleEthYear = gregorianYear - 7;
  const ethYear =
    dateDayNumber >= ethiopianNewYearDayNumber(possibleEthYear)
      ? possibleEthYear
      : possibleEthYear - 1;
  const daysSinceNewYear = dateDayNumber - ethiopianNewYearDayNumber(ethYear);
  const ethMonth = Math.floor(daysSinceNewYear / 30) + 1;
  const ethDay = (daysSinceNewYear % 30) + 1;

  return {
    year: ethYear,
    month: ethMonth,
    day: ethDay,
  };
}

// Evangelist of the year (የዘመኑ ወንጌላዊ)
export function getEvangelist(year: number): { amharic: string; english: string } {
  const mod = (year + 5500) % 4;
  switch (mod) {
    case 1:
      return { amharic: 'ማቴዎስ', english: 'Matthew' };
    case 2:
      return { amharic: 'ማርቆስ', english: 'Mark' };
    case 3:
      return { amharic: 'ሉቃስ', english: 'Luke' };
    case 0:
    default:
      return { amharic: 'ዮሐንስ', english: 'John' };
  }
}

// Monthly Saint commemoration by day of month (የወሩ ጽላት/መታሰቢያ)
export const MONTHLY_SAINTS: Record<number, { amharic: string; english: string }> = {
  1: { amharic: 'ልደታ (ቅድስት ሐናና ኢያቄም) / ራጉኤል', english: 'Nativity of Virgin Mary / Raguel' },
  2: { amharic: 'ታዴዎስ ሐዋርያ', english: 'Thaddaeus the Apostle' },
  3: { amharic: 'በዓታ ለማርያም', english: 'Presentation of the Virgin Mary' },
  4: { amharic: 'ዮሐንስ ወልደ ነጎድጓድ', english: 'John the Theologian' },
  5: { amharic: 'ጴጥሮስ ወጳውሎስ', english: 'Peter and Paul' },
  6: { amharic: 'ኢየሱስ / ቁስቋም', english: 'Jesus Christ / Qusqwam' },
  7: { amharic: 'ሥላሴ (አምላካችን ቅድስት ሥላሴ)', english: 'Holy Trinity' },
  8: { amharic: 'አባ ኪሮስ', english: 'Abba Kiros' },
  9: { amharic: 'ቶማስ ሐዋርያ / ሠለስቱ ምዕት', english: 'Thomas the Apostle' },
  10: { amharic: 'መስቀለ ኢየሱስ', english: 'The Holy Cross' },
  11: { amharic: 'ሐና ወኢያቄም', english: 'Hanna and Joachim' },
  12: { amharic: 'ቅዱስ ሚካኤል ሊቀ መላእክት', english: 'Archangel Michael' },
  13: { amharic: 'እግዚአብሔር አብ / ቅዱስ ሩፋኤል', english: 'God the Father / Raphael' },
  14: { amharic: 'አቡነ አረጋዊ', english: 'Abune Aregawi' },
  15: { amharic: 'ቂርቆስና ኢየሉጣ', english: 'Cyricus and Julitta' },
  16: { amharic: 'ኪዳነ ምሕረት', english: 'Kidane Mehret (Covenant of Mercy)' },
  17: { amharic: 'ቅዱስ እስጢፋኖስ', english: 'Saint Stephen the Protomartyr' },
  18: { amharic: 'ፊልጶስ ሐዋርያ', english: 'Philip the Apostle' },
  19: { amharic: 'ቅዱስ ገብርኤል ሊቀ መላእክት', english: 'Archangel Gabriel' },
  20: { amharic: 'ጽንጸታ ለማርያም', english: 'Conception of Mary' },
  21: { amharic: 'ቅድስት ድንግል ማርያም', english: 'Saint Virgin Mary' },
  22: { amharic: 'ቅዱስ ዑራኤል ሊቀ መላእክት', english: 'Archangel Uriel' },
  23: { amharic: 'ቅዱስ ጊዮርጊስ ሰማዕት', english: 'Saint George the Martyr' },
  24: { amharic: 'ተክለ ሃይማኖት', english: 'Abune Tekle Haymanot' },
  25: { amharic: 'መርቆሬዎስ ሰማዕት', english: 'Saint Mercurius' },
  26: { amharic: 'ቶማስ ዘደብረ ማውዛ', english: 'Thomas of Mawsil' },
  27: { amharic: 'መድኃኔዓለም', english: 'Medhane Alem (Savior of the World)' },
  28: { amharic: 'አማኑኤል', english: 'Emmanuel' },
  29: { amharic: 'በዓለ ወልድ', english: 'Feast of the Son' },
  30: { amharic: 'ማርቆስ ወንጌላዊ', english: 'Mark the Evangelist' },
};

// Ethiopian Orthodox Fasting System (ሰባቱ አጽዋማት)
export function checkOrthodoxFasting(year: number, month: number, day: number, gDate: Date): {
  isFasting: boolean;
  fastName?: string;
  fastNameAmharic?: string;
  description?: string;
  rule?: string;
} {
  // 1. Tsome Nebiyat (Advent): Hidar 15 (month 3, day 15) to Tahsas 28 (month 4, day 28)
  if (
    (month === 3 && day >= 15) ||
    (month === 4 && day <= 28)
  ) {
    return {
      isFasting: true,
      fastName: 'Fast of the Prophets (Tsome Nebiyat / Advent)',
      fastNameAmharic: 'ጾመ ነቢያት (የገና ጾም)',
      description: 'Commemoration of the prophetic longing for the coming of Christ (44 days).',
      rule: 'Fasting until afternoon; abstaining from meat, dairy, eggs, and animal products.',
    };
  }

  // 2. Gahad of Christmas & Epiphany
  if (month === 4 && day === 28) {
    return {
      isFasting: true,
      fastName: 'Gahad of Christmas',
      fastNameAmharic: 'የገና ገሃድ',
      description: 'The strict vigil before Christmas.',
      rule: 'Strict fast until twilight.',
    };
  }
  if (month === 5 && day === 10) {
    return {
      isFasting: true,
      fastName: 'Gahad of Timkat (Epiphany Eve)',
      fastNameAmharic: 'የጥምቀት ገሃድ (ከተራ)',
      description: 'The vigil fast leading up to Epiphany (Timkat).',
      rule: 'Strict fast with evening water blessing procession.',
    };
  }

  // 3. Tsome Filseta (Assumption of Virgin Mary): Nehase 1 to Nehase 16
  if (month === 12 && day >= 1 && day <= 16) {
    return {
      isFasting: true,
      fastName: 'Fast of the Assumption of the Virgin Mary (Tsome Filseta)',
      fastNameAmharic: 'ጾመ ፍልሰታ',
      description: 'The 16-day fast dedicated to the Holy Virgin Mary.',
      rule: 'Daily fasting until midday/3 PM; Holy Liturgy prayer.',
    };
  }

  // 4. Bahre Hasab Movable Fasts calculation for Lent & Apostles
  const movable = calculateBahreHasab(year);
  const targetEpoch = ethToGC(year, month, day).getTime();

  // Nineveh (3 days)
  const ninevehStart = ethToGC(year, movable.nenewe.month, movable.nenewe.day).getTime();
  const ninevehEnd = ninevehStart + 2 * MILLISECONDS_PER_DAY;
  if (targetEpoch >= ninevehStart && targetEpoch <= ninevehEnd) {
    return {
      isFasting: true,
      fastName: 'Fast of Nineveh (Tsome Nenewe)',
      fastNameAmharic: 'ጾመ ነነዌ',
      description: '3 days of prayer and repentance following the example of Nineveh (Jonah).',
      rule: 'Strict fast until 3 PM.',
    };
  }

  // Abiy Tsom (Great Lent - 55 days)
  const lentStart = ethToGC(year, movable.abiyTsom.month, movable.abiyTsom.day).getTime();
  const lentEnd = ethToGC(year, movable.fasika.month, movable.fasika.day).getTime() - MILLISECONDS_PER_DAY;
  if (targetEpoch >= lentStart && targetEpoch <= lentEnd) {
    return {
      isFasting: true,
      fastName: 'Great Lent (ዐቢይ ጾም / ሁዳዴ)',
      fastNameAmharic: 'ዐቢይ ጾም (ሁዳዴ)',
      description: '55 days of prayer, fasting, and almsgiving in imitation of Christ.',
      rule: 'No meat, dairy, eggs, fish, or butter. Fasting until 3 PM weekdays.',
    };
  }

  // Fifty days of Pentecost (የሃምሳ ጾም): No fasting on Wednesday & Friday!
  const easterEpoch = ethToGC(year, movable.fasika.month, movable.fasika.day).getTime();
  const pentecostEpoch = ethToGC(year, movable.peraklitos.month, movable.peraklitos.day).getTime();
  const isDuringPentecost = targetEpoch >= easterEpoch && targetEpoch <= pentecostEpoch;

  // Tsome Hawaryat (Fast of the Apostles): starts after Pentecost until Hamle 4
  const apostlesStart = pentecostEpoch + MILLISECONDS_PER_DAY;
  const apostlesEnd = ethToGC(year, 11, 4).getTime();
  if (targetEpoch >= apostlesStart && targetEpoch <= apostlesEnd) {
    return {
      isFasting: true,
      fastName: 'Fast of the Apostles (Tsome Hawaryat)',
      fastNameAmharic: 'ጾመ ሐዋርያት',
      description: 'Commemorating the fasting of the Apostles before dispersing to preach the Gospel.',
      rule: 'Fasting until midday; vegan foods only.',
    };
  }

  // 5. Tsome Dihnet: Regular Wednesday & Friday Fasting (unless during 50 days of Pentecost)
  const weekday = gDate.getDay(); // 3 = Wednesday, 5 = Friday
  if (!isDuringPentecost && (weekday === 3 || weekday === 5)) {
    return {
      isFasting: true,
      fastName: weekday === 3 ? 'Wednesday Fast (ጾመ ረቡዕ)' : 'Friday Fast (ጾመ ዓርብ)',
      fastNameAmharic: weekday === 3 ? 'ጾመ ረቡዕ (ምክረ አይሁድ)' : 'ጾመ ዓርብ (ስቅለተ ክርስቶስ)',
      description:
        weekday === 3
          ? 'Weekly commemoration of the council against Christ (Tsome Dihnet).'
          : 'Weekly commemoration of the Crucifixion of our Lord Jesus Christ.',
      rule: 'Fasting until 1 PM or 3 PM; abstaining from all animal products.',
    };
  }

  return { isFasting: false };
}

// Bahre Hasab (የባሕረ ሐሳብ ቀመር) for Movable Feasts
export interface MovableFeasts {
  year: number;
  nenewe: { month: number; day: number; nameAmharic: string; nameEnglish: string };
  abiyTsom: { month: number; day: number; nameAmharic: string; nameEnglish: string };
  debreZeyt: { month: number; day: number; nameAmharic: string; nameEnglish: string };
  hosanna: { month: number; day: number; nameAmharic: string; nameEnglish: string };
  siklet: { month: number; day: number; nameAmharic: string; nameEnglish: string };
  fasika: { month: number; day: number; nameAmharic: string; nameEnglish: string };
  rukbeKahinat: { month: number; day: number; nameAmharic: string; nameEnglish: string };
  erget: { month: number; day: number; nameAmharic: string; nameEnglish: string };
  peraklitos: { month: number; day: number; nameAmharic: string; nameEnglish: string };
  tsomeHawaryat: { month: number; day: number; nameAmharic: string; nameEnglish: string };
}

export function calculateBahreHasab(year: number): MovableFeasts {
  // Abeqte & Metqe
  const abeqte = (year * 11) % 30;
  const metqe = 30 - abeqte;

  // Determine whether Metqe is in Meskerem or Tikimt
  let metqeMonth = 1;
  let metqeDay = metqe;
  if (metqe < 14) {
    metqeMonth = 2; // Tikimt
    metqeDay = metqe;
  }

  // Find weekday of Metqe
  const metqeDate = ethToGC(year, metqeMonth, metqeDay);
  const metqeWeekday = metqeDate.getDay(); // 0 = Sun, 1 = Mon ...

  // Tewsak for Nineveh weekday
  // Days of week tewsak: Sun: 7, Mon: 6, Tue: 5, Wed: 4, Thu: 3, Fri: 2, Sat: 8
  const tewsakMap = [7, 6, 5, 4, 3, 2, 8];
  const tewsak = tewsakMap[metqeWeekday];

  const sum = metqeDay + tewsak;
  let neneweMonth: number;
  let neneweDay: number;

  if (metqeMonth === 1) {
    // Meskerem metqe -> Tir
    if (sum > 30) {
      neneweMonth = 6; // Yekatit
      neneweDay = sum - 30;
    } else {
      neneweMonth = 5; // Tir
      neneweDay = sum;
    }
  } else {
    // Tikimt metqe -> Yekatit
    neneweMonth = 6; // Yekatit
    neneweDay = sum;
    if (neneweDay > 30) {
      neneweMonth = 7; // Megabit
      neneweDay = neneweDay - 30;
    }
  }

  // Helper to add days from Nineveh
  const addDaysToNenewe = (daysToAdd: number): { month: number; day: number } => {
    const gcBase = ethToGC(year, neneweMonth, neneweDay);
    const targetGc = new Date(gcBase.getTime() + daysToAdd * MILLISECONDS_PER_DAY);
    const ethTarget = gcToEth(targetGc);
    return { month: ethTarget.month, day: ethTarget.day };
  };

  return {
    year,
    nenewe: {
      month: neneweMonth,
      day: neneweDay,
      nameAmharic: 'ጾመ ነነዌ',
      nameEnglish: 'Fast of Nineveh',
    },
    abiyTsom: {
      ...addDaysToNenewe(14),
      nameAmharic: 'ዐቢይ ጾም (ሁዳዴ)',
      nameEnglish: 'Great Lent',
    },
    debreZeyt: {
      ...addDaysToNenewe(41),
      nameAmharic: 'ደብረ ዘይት',
      nameEnglish: 'Mount of Olives',
    },
    hosanna: {
      ...addDaysToNenewe(62),
      nameAmharic: 'ሆሣዕና',
      nameEnglish: 'Palm Sunday (Hosanna)',
    },
    siklet: {
      ...addDaysToNenewe(67),
      nameAmharic: 'ስቅለት',
      nameEnglish: 'Good Friday (Siklet)',
    },
    fasika: {
      ...addDaysToNenewe(69),
      nameAmharic: 'ትንሣኤ (ፋሲካ)',
      nameEnglish: 'Easter (Tensae / Fasika)',
    },
    rukbeKahinat: {
      ...addDaysToNenewe(93),
      nameAmharic: 'ርክበ ካህናት',
      nameEnglish: 'Synod of Priests',
    },
    erget: {
      ...addDaysToNenewe(108),
      nameAmharic: 'ዕርገት',
      nameEnglish: 'Ascension (Erget)',
    },
    peraklitos: {
      ...addDaysToNenewe(118),
      nameAmharic: 'ጰራቅሊጦስ',
      nameEnglish: 'Pentecost (Peraklitos)',
    },
    tsomeHawaryat: {
      ...addDaysToNenewe(119),
      nameAmharic: 'ጾመ ሐዋርያት',
      nameEnglish: 'Fast of the Apostles',
    },
  };
}

// Convert a Gregorian or Ethiopian date into full descriptive object
export function getFullEthiopianDate(date: Date = new Date()): EthiopianFullDate {
  const eth = gcToEth(date);
  const monthData = ETHIOPIAN_MONTHS_DATA[eth.month - 1];
  const gWeekday = date.getDay(); // 0 is Sunday
  // Ethiopian weekdays match 0->Sunday (እሁድ), 1->Monday (ሰኞ)...
  const weekdayAmharic = ETHIOPIAN_WEEKDAYS_DATA[(gWeekday + 6) % 7].amharic;
  const weekdayEnglish = ETHIOPIAN_WEEKDAYS_DATA[(gWeekday + 6) % 7].english;
  const evangelist = getEvangelist(eth.year);
  const fasting = checkOrthodoxFasting(eth.year, eth.month, eth.day, date);
  const monthlySaint = MONTHLY_SAINTS[eth.day]?.amharic;

  return {
    year: eth.year,
    month: eth.month,
    day: eth.day,
    monthNameAmharic: monthData.amharic,
    monthNameEnglish: monthData.english,
    weekdayAmharic,
    weekdayEnglish,
    geezDay: toEthNum(eth.day),
    geezYear: toEthNum(eth.year),
    evangelist: evangelist.english,
    evangelistAmharic: evangelist.amharic,
    gregorianDate: date,
    isFasting: fasting.isFasting,
    fastingName: fasting.fastName,
    fastingNameAmharic: fasting.fastNameAmharic,
    fastingDescription: fasting.description,
    isFeast: Boolean(monthlySaint),
    monthlySaintAmharic: monthlySaint,
  };
}
