export interface CanonicalFast {
  id: string;
  nameAmharic: string;
  nameEnglish: string;
  duration: string;
  timing: string;
  purpose: string;
  dietaryRules: string;
  scripturalBasis: string;
}

export const CANONICAL_FASTS: CanonicalFast[] = [
  {
    id: 'abiy-tsom',
    nameAmharic: 'ዐቢይ ጾም (ሁዳዴ)',
    nameEnglish: 'Great Lent (Abiy Tsom)',
    duration: '55 Days (ሃምሳ አምስት ቀናት)',
    timing: 'Movable (ተንቀሳቃሽ) — 14 days after Nineveh until Easter',
    purpose: 'Commemorating our Lord Jesus Christ’s 40-day fast in the wilderness, Passion week, and spiritual preparation for the Resurrection (Fasika).',
    dietaryRules: 'Strict abstention from meat, dairy, eggs, butter, fish, and alcoholic beverages. Fasting until 3:00 PM (ዘጠኝ ሰዓት) on weekdays; Liturgical prayer followed by vegan meal.',
    scripturalBasis: 'Matthew 4:1-11; Mark 1:12-13; Joel 2:12-13',
  },
  {
    id: 'tsome-nebiyat',
    nameAmharic: 'ጾመ ነቢያት (የገና ጾም)',
    nameEnglish: 'Fast of the Prophets (Advent)',
    duration: '44 Days (አርባ አራት ቀናት)',
    timing: 'Fixed (ቋሚ) — Hidar 15 to Tahsas 28 (ኅዳር 15 – ታኅሣሥ 28)',
    purpose: 'Commemorating the longing and prophesying of the Holy Prophets of the Old Testament for the Incarnation and Nativity of the Savior.',
    dietaryRules: 'Complete abstinence from animal products. Fasting until midday or afternoon according to individual spiritual father guidance.',
    scripturalBasis: 'Isaiah 7:14; Micah 5:2; Galatians 4:4',
  },
  {
    id: 'tsome-nenewe',
    nameAmharic: 'ጾመ ነነዌ',
    nameEnglish: 'Fast of Nineveh',
    duration: '3 Days (ሦስት ቀናት)',
    timing: 'Movable (ተንቀሳቃሽ) — Monday, Tuesday, Wednesday, two weeks before Great Lent',
    purpose: 'Commemorating the repentance, humility, and deliverance of the people of Nineveh following the preaching of the Prophet Jonah.',
    dietaryRules: 'Strict fast until 3:00 PM with profound prayers of repentance, prostrations, and supplication.',
    scripturalBasis: 'Jonah 3:1-10; Matthew 12:40-41',
  },
  {
    id: 'tsome-hawaryat',
    nameAmharic: 'ጾመ ሐዋርያት',
    nameEnglish: 'Fast of the Apostles',
    duration: 'Movable duration (between 10 to 40+ days, ending Hamle 5)',
    timing: 'Movable (ተንቀሳቃሽ) — Day after Pentecost (ጰራቅሊጦስ) until Hamle 5 (ሐምሌ 5)',
    purpose: 'Commemorating the Holy Apostles who fasted, prayed, and prepared after receiving the Holy Spirit before dispersing to preach the Gospel throughout the world.',
    dietaryRules: 'Abstinence from animal products; fasting until midday.',
    scripturalBasis: 'Acts 13:2-3; 2 Corinthians 6:4-5',
  },
  {
    id: 'tsome-filseta',
    nameAmharic: 'ጾመ ፍልሰታ',
    nameEnglish: 'Fast of the Assumption of the Virgin Mary',
    duration: '16 Days (አሥራ ስድስት ቀናት)',
    timing: 'Fixed (ቋሚ) — Nehase 1 to Nehase 16 (ነሐሴ 1 – ነሐሴ 16)',
    purpose: 'Commemorating the Holy Apostles’ fasting to behold the Dormition, bodily Assumption, and crowning of the Blessed Mother of God, Saint Mary.',
    dietaryRules: 'Beloved fast observed diligently by all faithful; daily attendance at Divine Liturgy, fasting until 3:00 PM or twilight, complete vegan diet.',
    scripturalBasis: 'Psalm 45:9-17; Luke 1:46-55; Revelation 12:1',
  },
  {
    id: 'tsome-dihnet',
    nameAmharic: 'ጾመ ድኅነት (ረቡዕና ዓርብ)',
    nameEnglish: 'Fast of Salvation (Wednesday & Friday)',
    duration: 'Every Wednesday and Friday throughout the year (except 50 days of Easter)',
    timing: 'Continuous (ቋሚ ሳምንታዊ)',
    purpose: 'Wednesday commemorates the conspiracy of the Sanhedrin against Christ; Friday commemorates the Crucifixion and Death of our Lord on Golgotha for our salvation.',
    dietaryRules: 'Fasting until 1:00 PM or 3:00 PM; abstinence from meat, eggs, milk, and cheese.',
    scripturalBasis: 'Matthew 26:3-4; Luke 23:33-46',
  },
  {
    id: 'gahad',
    nameAmharic: 'ገሃድ (የገናና የጥምቀት ዋዜማ)',
    nameEnglish: 'Gahad (Vigils of Nativity and Epiphany)',
    duration: '1 Day each',
    timing: 'Fixed (ቋሚ) — Tahsas 28 (Christmas Eve) and Tir 10 (Timkat Eve)',
    purpose: 'Solemn vigil and preparation for the great feasts of the Nativity (Lidet) and the Baptism of the Lord (Timkat).',
    dietaryRules: 'Strict daytime fasting with prayers leading into the midnight festival Liturgy.',
    scripturalBasis: 'Matthew 2:1-2; Matthew 3:13-17',
  },
];
