import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Share,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { ManuscriptCard } from '../components/ManuscriptCard';
import { saintsData } from '../data/saintsData';
import { gizaeData } from '../data/gizaeData';
import { CANONICAL_FASTS } from '../data/fastingData';
import {
  ETHIOPIAN_MONTHS_DATA,
  toEthNum,
  calculateBahreHasab,
} from '../calendar/calendarCore';
import { sampleHolidays } from '../data/holidaysData';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Search,
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
} from 'lucide-react';

type SpiritualTab = 'synaxarium' | 'readings' | 'fasts' | 'feasts';

export const SpiritualScreen: React.FC = () => {
  const {
    theme,
    fontScale,
    todayEth,
    language,
    t,
    toggleFavorite,
    isFavorite,
  } = useApp();

  const [activeTab, setActiveTab] = useState<SpiritualTab>('synaxarium');

  // Synaxarium state
  const [selectedMonth, setSelectedMonth] = useState<number>(todayEth.month);
  const [selectedDay, setSelectedDay] = useState<number>(todayEth.day);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  // Bahre Hasab Year input
  const [calcYear, setCalcYear] = useState<number>(todayEth.year);

  const monthData = ETHIOPIAN_MONTHS_DATA[selectedMonth - 1];
  const daysInMonth = selectedMonth === 13 ? 5 : 30;

  const currentKey = `${selectedMonth}-${selectedDay}`;
  const currentSaints = saintsData[currentKey] || [];
  const currentReadings = gizaeData[currentKey] || [];

  const handlePrevDay = () => {
    if (selectedDay === 1) {
      const prevM = selectedMonth === 1 ? 13 : selectedMonth - 1;
      setSelectedMonth(prevM);
      setSelectedDay(prevM === 13 ? 5 : 30);
    } else {
      setSelectedDay((d) => d - 1);
    }
  };

  const handleNextDay = () => {
    if (selectedDay >= daysInMonth) {
      const nextM = selectedMonth === 13 ? 1 : selectedMonth + 1;
      setSelectedMonth(nextM);
      setSelectedDay(1);
    } else {
      setSelectedDay((d) => d + 1);
    }
  };

  // Text-to-Speech audio toggle
  const handleToggleSpeech = (id: string, textToRead: string) => {
    if (activeSpeakingId === id) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setActiveSpeakingId(null);
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.onend = () => setActiveSpeakingId(null);
        utterance.onerror = () => setActiveSpeakingId(null);
        window.speechSynthesis.speak(utterance);
        setActiveSpeakingId(id);
      }
    }
  };

  const handleShare = async (title: string, desc: string) => {
    const text = `♰ ${monthData.amharic} ${toEthNum(selectedDay)} ♰\n${title}\n${desc}\nኢትዮጵያ ቀን መቁጠሪያ - Ethiopian Calendar`;
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title, text });
      } else {
        await Share.share({ message: text });
      }
    } catch (e) {
      console.warn('Share error:', e);
    }
  };

  // Movable feasts from Bahre Hasab
  const movableFeasts = calculateBahreHasab(calcYear);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Segmented Tabs */}
      <View style={[styles.tabBar, { backgroundColor: theme.surface, borderBottomColor: theme.cardBorder }]}>
        <TouchableOpacity
          style={[
            styles.segmentTab,
            activeTab === 'synaxarium' && [styles.segmentTabActive, { borderBottomColor: theme.gold }],
          ]}
          onPress={() => setActiveTab('synaxarium')}
        >
          <Text
            style={[
              styles.segmentLabel,
              {
                color: activeTab === 'synaxarium' ? theme.gold : theme.textSecondary,
                fontSize: fontScale.caption,
                fontWeight: activeTab === 'synaxarium' ? '800' : '600',
              },
            ]}
          >
            {t('spiritualTabs.synaxarium')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentTab,
            activeTab === 'readings' && [styles.segmentTabActive, { borderBottomColor: theme.gold }],
          ]}
          onPress={() => setActiveTab('readings')}
        >
          <Text
            style={[
              styles.segmentLabel,
              {
                color: activeTab === 'readings' ? theme.gold : theme.textSecondary,
                fontSize: fontScale.caption,
                fontWeight: activeTab === 'readings' ? '800' : '600',
              },
            ]}
          >
            {t('spiritualTabs.readings')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentTab,
            activeTab === 'fasts' && [styles.segmentTabActive, { borderBottomColor: theme.gold }],
          ]}
          onPress={() => setActiveTab('fasts')}
        >
          <Text
            style={[
              styles.segmentLabel,
              {
                color: activeTab === 'fasts' ? theme.gold : theme.textSecondary,
                fontSize: fontScale.caption,
                fontWeight: activeTab === 'fasts' ? '800' : '600',
              },
            ]}
          >
            {t('spiritualTabs.fasts')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentTab,
            activeTab === 'feasts' && [styles.segmentTabActive, { borderBottomColor: theme.gold }],
          ]}
          onPress={() => setActiveTab('feasts')}
        >
          <Text
            style={[
              styles.segmentLabel,
              {
                color: activeTab === 'feasts' ? theme.gold : theme.textSecondary,
                fontSize: fontScale.caption,
                fontWeight: activeTab === 'feasts' ? '800' : '600',
              },
            ]}
          >
            {t('spiritualTabs.feasts')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* ================= TAB 1: SYNAXARIUM ================= */}
        {activeTab === 'synaxarium' && (
          <View>
            {/* Date Selector Header */}
            <View style={[styles.dateSelectorCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
              <TouchableOpacity
                style={[styles.arrowBtn, { backgroundColor: theme.goldLight }]}
                onPress={handlePrevDay}
              >
                <ChevronLeft size={20} color={theme.gold} />
              </TouchableOpacity>

              <View style={styles.dateSelectorCenter}>
                <Text style={[styles.selectorMonth, { color: theme.text, fontSize: fontScale.header }]}>
                  {monthData.amharic} {toEthNum(selectedDay)}
                </Text>
                <Text style={[styles.selectorSub, { color: theme.gold, fontSize: fontScale.caption }]}>
                  {monthData.english} {selectedDay}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.arrowBtn, { backgroundColor: theme.goldLight }]}
                onPress={handleNextDay}
              >
                <ChevronRight size={20} color={theme.gold} />
              </TouchableOpacity>
            </View>

            {/* Quick Month Picker Horizontal Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthPillsScroll}>
              {ETHIOPIAN_MONTHS_DATA.map((m) => (
                <TouchableOpacity
                  key={`m-${m.number}`}
                  style={[
                    styles.monthPill,
                    {
                      backgroundColor: selectedMonth === m.number ? theme.primary : theme.surfaceVariant,
                      borderColor: selectedMonth === m.number ? theme.gold : theme.divider,
                    },
                  ]}
                  onPress={() => {
                    setSelectedMonth(m.number);
                    setSelectedDay(1);
                  }}
                >
                  <Text
                    style={[
                      styles.monthPillText,
                      {
                        color: selectedMonth === m.number ? '#FFFFFF' : theme.textSecondary,
                        fontSize: fontScale.caption,
                        fontWeight: selectedMonth === m.number ? '700' : '500',
                      },
                    ]}
                  >
                    {m.amharic}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Saints List */}
            {currentSaints.length > 0 ? (
              currentSaints.map((saint, sIndex) => {
                const speechId = `saint-${selectedMonth}-${selectedDay}-${sIndex}`;
                const isSpeaking = activeSpeakingId === speechId;
                const isFav = isFavorite(saint.name, selectedMonth, selectedDay);

                return (
                  <ManuscriptCard
                    key={`saint-${sIndex}`}
                    title={saint.name}
                    badge={selectedDay === 1 ? 'መጀመሪያ' : undefined}
                    badgeType="gold"
                    icon="♰"
                  >
                    <Text style={[styles.saintDescText, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                      {saint.description}
                    </Text>

                    <View style={styles.itemActionRow}>
                      <TouchableOpacity
                        style={[styles.actionBtn, { borderColor: theme.divider }]}
                        onPress={() => handleToggleSpeech(speechId, `${saint.name}. ${saint.description}`)}
                      >
                        {isSpeaking ? (
                          <VolumeX size={15} color={theme.crimson} style={{ marginRight: 4 }} />
                        ) : (
                          <Volume2 size={15} color={theme.gold} style={{ marginRight: 4 }} />
                        )}
                        <Text style={[styles.actionBtnText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                          {isSpeaking ? t('stopAudio') : t('listenAudio')}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionBtn, { borderColor: theme.divider }]}
                        onPress={() =>
                          toggleFavorite({
                            type: 'saint',
                            titleAmharic: saint.name,
                            titleEnglish: `${monthData.english} ${selectedDay}`,
                            description: saint.description,
                            dateEth: { month: selectedMonth, day: selectedDay },
                          })
                        }
                      >
                        <Heart
                          size={15}
                          color={isFav ? theme.crimson : theme.gold}
                          fill={isFav ? theme.crimson : 'transparent'}
                          style={{ marginRight: 4 }}
                        />
                        <Text style={[styles.actionBtnText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                          {isFav ? t('removeFromFavorites') : t('addToFavorites')}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionBtn, { borderColor: theme.divider }]}
                        onPress={() => handleShare(saint.name, saint.description)}
                      >
                        <Share2 size={15} color={theme.gold} style={{ marginRight: 4 }} />
                        <Text style={[styles.actionBtnText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                          {t('shareText')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ManuscriptCard>
                );
              })
            ) : (
              <ManuscriptCard icon="⛪">
                <Text style={[styles.emptyNotice, { color: theme.textMuted, fontSize: fontScale.bodySmall }]}>
                  {t('noSaintsFound')}
                </Text>
              </ManuscriptCard>
            )}
          </View>
        )}

        {/* ================= TAB 2: LITURGICAL READINGS (GIZAE) ================= */}
        {activeTab === 'readings' && (
          <View>
            <View style={[styles.dateSelectorCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
              <TouchableOpacity
                style={[styles.arrowBtn, { backgroundColor: theme.goldLight }]}
                onPress={handlePrevDay}
              >
                <ChevronLeft size={20} color={theme.gold} />
              </TouchableOpacity>

              <View style={styles.dateSelectorCenter}>
                <Text style={[styles.selectorMonth, { color: theme.text, fontSize: fontScale.header }]}>
                  {monthData.amharic} {toEthNum(selectedDay)} — {language === 'am' ? 'ግጻዌ' : 'Liturgy'}
                </Text>
                <Text style={[styles.selectorSub, { color: theme.gold, fontSize: fontScale.caption }]}>
                  {monthData.english} {selectedDay}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.arrowBtn, { backgroundColor: theme.goldLight }]}
                onPress={handleNextDay}
              >
                <ChevronRight size={20} color={theme.gold} />
              </TouchableOpacity>
            </View>

            {currentReadings.length > 0 ? (
              currentReadings.map((reading, rIndex) => (
                <ManuscriptCard
                  key={`reading-${rIndex}`}
                  title={reading.title}
                  badge={reading.reference}
                  badgeType="gold"
                  icon="📖"
                >
                  <Text style={[styles.readingBody, { color: theme.text, fontSize: fontScale.body }]}>
                    "{reading.content}"
                  </Text>

                  <View style={styles.itemActionRow}>
                    <TouchableOpacity
                      style={[styles.actionBtn, { borderColor: theme.divider }]}
                      onPress={() => handleShare(reading.title, `"${reading.content}"\n— ${reading.reference}`)}
                    >
                      <Share2 size={15} color={theme.gold} style={{ marginRight: 4 }} />
                      <Text style={[styles.actionBtnText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                        {t('shareText')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ManuscriptCard>
              ))
            ) : (
              <ManuscriptCard icon="📜">
                <Text style={[styles.emptyNotice, { color: theme.textMuted, fontSize: fontScale.bodySmall }]}>
                  {language === 'am'
                    ? 'ለዚህ ቀን በባንክ ውስጥ የተመዘገበ ንባብ የለም። እባክዎ መስከረም 1፣ 5 ወይም ታኅሣሥ 29 ን ይምረጡ።'
                    : 'No specific reading recorded for this date. Sample available on Meskerem 1, 5, or Tahsas 29.'}
                </Text>
              </ManuscriptCard>
            )}
          </View>
        )}

        {/* ================= TAB 3: THE 7 CANONICAL FASTS ================= */}
        {activeTab === 'fasts' && (
          <View>
            <View style={[styles.infoBanner, { backgroundColor: theme.fastingBadge, borderColor: theme.primary }]}>
              <Text style={[styles.infoBannerTitle, { color: theme.primary, fontSize: fontScale.header }]}>
                {t('fastingScreenTitle')}
              </Text>
              <Text style={[styles.infoBannerSub, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                {t('fastingSubtitle')}
              </Text>
            </View>

            {CANONICAL_FASTS.map((fast) => (
              <ManuscriptCard
                key={fast.id}
                title={language === 'am' ? fast.nameAmharic : fast.nameEnglish}
                subtitle={language === 'am' ? fast.nameEnglish : fast.nameAmharic}
                badge={fast.duration}
                badgeType="fasting"
                icon="🕊️"
              >
                <View style={styles.fastDetailSection}>
                  <Text style={[styles.fastFieldLabel, { color: theme.gold, fontSize: fontScale.caption }]}>
                    {t('fastTiming')}:
                  </Text>
                  <Text style={[styles.fastFieldValue, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                    {fast.timing}
                  </Text>
                </View>

                <View style={styles.fastDetailSection}>
                  <Text style={[styles.fastFieldLabel, { color: theme.gold, fontSize: fontScale.caption }]}>
                    {t('fastPurpose')}:
                  </Text>
                  <Text style={[styles.fastFieldValue, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                    {fast.purpose}
                  </Text>
                </View>

                <View style={styles.fastDetailSection}>
                  <Text style={[styles.fastFieldLabel, { color: theme.gold, fontSize: fontScale.caption }]}>
                    {t('fastRules')}:
                  </Text>
                  <Text style={[styles.fastFieldValue, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                    {fast.dietaryRules}
                  </Text>
                </View>

                <View style={[styles.scriptureBadge, { backgroundColor: theme.surfaceVariant }]}>
                  <Text style={[styles.scriptureText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                    📜 {t('scripturalBasis')}: {fast.scripturalBasis}
                  </Text>
                </View>
              </ManuscriptCard>
            ))}
          </View>
        )}

        {/* ================= TAB 4: BAHRE HASAB FEASTS ================= */}
        {activeTab === 'feasts' && (
          <View>
            {/* Year Selector */}
            <View style={[styles.yearSelectorCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
              <Text style={[styles.yearSelectorLabel, { color: theme.text, fontSize: fontScale.header }]}>
                {language === 'am' ? 'የባሕረ ሐሳብ ዓመተ ምሕረት፡' : 'Bahre Hasab Year:'}
              </Text>

              <View style={styles.yearButtonsRow}>
                <TouchableOpacity
                  style={[styles.yearBtn, { backgroundColor: theme.surfaceVariant }]}
                  onPress={() => setCalcYear((y) => y - 1)}
                >
                  <Text style={[styles.yearBtnText, { color: theme.text }]}>-1</Text>
                </TouchableOpacity>

                <Text style={[styles.calcYearDisplay, { color: theme.gold, fontSize: fontScale.title }]}>
                  {calcYear} ዓ.ም.
                </Text>

                <TouchableOpacity
                  style={[styles.yearBtn, { backgroundColor: theme.surfaceVariant }]}
                  onPress={() => setCalcYear((y) => y + 1)}
                >
                  <Text style={[styles.yearBtnText, { color: theme.text }]}>+1</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Movable Feasts List */}
            <Text style={[styles.groupHeading, { color: theme.gold, fontSize: fontScale.header }]}>
              {language === 'am' ? 'ተንቀሳቃሽ በዓላትና አጽዋማት (Movable)' : 'Movable Feasts & Fasts'}
            </Text>

            {[
              movableFeasts.nenewe,
              movableFeasts.abiyTsom,
              movableFeasts.debreZeyt,
              movableFeasts.hosanna,
              movableFeasts.siklet,
              movableFeasts.fasika,
              movableFeasts.rukbeKahinat,
              movableFeasts.erget,
              movableFeasts.peraklitos,
              movableFeasts.tsomeHawaryat,
            ].map((feast, fIdx) => (
              <View
                key={`movable-${fIdx}`}
                style={[styles.feastCardRow, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
              >
                <View style={[styles.feastDateBadge, { backgroundColor: theme.feastBadge }]}>
                  <Text style={[styles.feastDateText, { color: theme.feastText, fontSize: fontScale.caption }]}>
                    {ETHIOPIAN_MONTHS_DATA[feast.month - 1].amharic} {toEthNum(feast.day)}
                  </Text>
                  <Text style={[styles.feastDateSub, { color: theme.feastText, fontSize: 10 }]}>
                    ({feast.month}/{feast.day})
                  </Text>
                </View>

                <View style={styles.feastInfoCol}>
                  <Text style={[styles.feastTitle, { color: theme.text, fontSize: fontScale.body }]}>
                    {feast.nameAmharic}
                  </Text>
                  <Text style={[styles.feastSubTitle, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                    {feast.nameEnglish}
                  </Text>
                </View>
              </View>
            ))}

            {/* Fixed Holidays */}
            <Text style={[styles.groupHeading, { color: theme.gold, fontSize: fontScale.header, marginTop: 24 }]}>
              {language === 'am' ? 'ቋሚ ዓመታዊ በዓላት (Fixed)' : 'Annual Fixed Holidays'}
            </Text>

            {sampleHolidays.map((h, hIdx) => (
              <View
                key={`fixed-${hIdx}`}
                style={[styles.feastCardRow, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
              >
                <View style={[styles.feastDateBadge, { backgroundColor: theme.goldLight }]}>
                  <Text style={[styles.feastDateText, { color: theme.gold, fontSize: fontScale.caption }]}>
                    {ETHIOPIAN_MONTHS_DATA[h.month - 1].amharic} {toEthNum(h.day)}
                  </Text>
                </View>

                <View style={styles.feastInfoCol}>
                  <Text style={[styles.feastTitle, { color: theme.text, fontSize: fontScale.body }]}>
                    {h.name}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  segmentTabActive: {},
  segmentLabel: {
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  dateSelectorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  arrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateSelectorCenter: {
    alignItems: 'center',
  },
  selectorMonth: {
    fontWeight: '800',
  },
  selectorSub: {
    fontWeight: '600',
    marginTop: 2,
  },
  monthPillsScroll: {
    marginBottom: 16,
  },
  monthPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  monthPillText: {},
  saintDescText: {
    lineHeight: 20,
    marginBottom: 12,
  },
  itemActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionBtnText: {
    fontWeight: '600',
  },
  emptyNotice: {
    fontStyle: 'italic',
    lineHeight: 20,
    textAlign: 'center',
    paddingVertical: 12,
  },
  readingBody: {
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 14,
  },
  infoBanner: {
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 14,
    marginBottom: 16,
  },
  infoBannerTitle: {
    fontWeight: '800',
    marginBottom: 4,
  },
  infoBannerSub: {
    lineHeight: 18,
  },
  fastDetailSection: {
    marginBottom: 8,
  },
  fastFieldLabel: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  fastFieldValue: {
    marginTop: 2,
    lineHeight: 18,
  },
  scriptureBadge: {
    padding: 8,
    borderRadius: 8,
    marginTop: 6,
  },
  scriptureText: {
    fontWeight: '600',
  },
  yearSelectorCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  yearSelectorLabel: {
    fontWeight: '700',
    marginBottom: 10,
  },
  yearButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  yearBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  yearBtnText: {
    fontWeight: '700',
  },
  calcYearDisplay: {
    fontWeight: '800',
  },
  groupHeading: {
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  feastCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  feastDateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
    marginRight: 12,
  },
  feastDateText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  feastDateSub: {
    marginTop: 1,
    fontWeight: '500',
  },
  feastInfoCol: {
    flex: 1,
  },
  feastTitle: {
    fontWeight: '700',
  },
  feastSubTitle: {
    marginTop: 2,
  },
});
