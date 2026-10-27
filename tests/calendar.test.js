// Automated verification test suite for Ethiopian Orthodox Calendar algorithms
import {
  isEthLeap,
  toEthNum,
  ethToGC,
  gcToEth,
  arabicToGeez,
  geezToArabic,
  checkOrthodoxFasting,
  calculateBahreHasab,
} from '../frontend/src/calendar/calendarCore.ts';

function runTests() {
  console.log('--- RUNNING ETHIOPIAN CALENDAR TEST SUITE ---');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Leap year tests
  assert(isEthLeap(2015) === true, '2015 is an Ethiopian leap year (2015 % 4 === 3)');
  assert(isEthLeap(2016) === false, '2016 is not an Ethiopian leap year');
  assert(isEthLeap(2017) === false, '2017 is not an Ethiopian leap year');
  assert(isEthLeap(2018) === false, '2018 is not an Ethiopian leap year');
  assert(isEthLeap(2019) === true, '2019 is an Ethiopian leap year (2019 % 4 === 3)');

  // 2. Ethiopian to Gregorian Conversion (Known benchmarks)
  // Meskerem 1, 2018 is Sep 11, 2025 (since 2017 was not leap)
  const gcDate2018 = ethToGC(2018, 1, 1);
  assert(
    gcDate2018.getFullYear() === 2025 &&
    gcDate2018.getMonth() === 8 && // September is 8 (0-indexed)
    gcDate2018.getDate() === 11,
    'Meskerem 1, 2018 corresponds to September 11, 2025'
  );

  // 3. Roundtrip GC -> Eth -> GC
  const testDate = new Date(2026, 4, 15); // May 15, 2026
  const ethFromTest = gcToEth(testDate);
  const backToGc = ethToGC(ethFromTest.year, ethFromTest.month, ethFromTest.day);
  assert(
    testDate.getFullYear() === backToGc.getFullYear() &&
    testDate.getMonth() === backToGc.getMonth() &&
    testDate.getDate() === backToGc.getDate(),
    'Roundtrip GC -> Eth -> GC conversion preserves exact date'
  );

  // 4. Ge'ez Numerals
  assert(toEthNum(1) === '፩', 'toEthNum(1) is ፩');
  assert(toEthNum(10) === '፲', 'toEthNum(10) is ፲');
  assert(toEthNum(2018) === '፳፻፲፰', 'toEthNum(2018) is ፳፻፲፰');
  assert(arabicToGeez(2018) === '፳፻፲፰', 'arabicToGeez(2018) is ፳፻፲፰');
  assert(geezToArabic('፳፻፲፰') === 2018, 'geezToArabic(፳፻፲፰) is 2018');

  // 5. Fasting Logic Check
  // Hidar 20 (month 3, day 20) is within Tsome Nebiyat (Advent)
  const gDateAdvent = ethToGC(2018, 3, 20);
  const fastingAdvent = checkOrthodoxFasting(2018, 3, 20, gDateAdvent);
  assert(
    fastingAdvent.isFasting === true &&
    fastingAdvent.fastName.includes('Prophets'),
    'Hidar 20 is verified as Tsome Nebiyat (Fast of the Prophets)'
  );

  // Nehase 5 (month 12, day 5) is within Tsome Filseta
  const gDateFilseta = ethToGC(2018, 12, 5);
  const fastingFilseta = checkOrthodoxFasting(2018, 12, 5, gDateFilseta);
  assert(
    fastingFilseta.isFasting === true &&
    fastingFilseta.fastName.includes('Filseta'),
    'Nehase 5 is verified as Tsome Filseta (Fast of the Assumption)'
  );

  // 6. Bahre Hasab Calculation
  const feasts2018 = calculateBahreHasab(2018);
  assert(
    feasts2018.fasika.month > 0 && feasts2018.fasika.day > 0,
    `Bahre Hasab 2018 calculates Fasika successfully on month ${feasts2018.fasika.month}, day ${feasts2018.fasika.day}`
  );

  console.log(`\nTEST RESULTS: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
