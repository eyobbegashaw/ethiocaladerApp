import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { useApp } from '../context/AppContext';
import {
  ETHIOPIAN_MONTHS_DATA,
  isEthLeap,
  ethToGC,
  gcToEth,
  toEthNum,
  checkOrthodoxFasting,
  MONTHLY_SAINTS,
} from '../calendar/calendarCore';
import { saintsData } from '../data/saintsData';
import { gizaeData } from '../data/gizaeData';
import { ethHolidays } from '../data/holidaysData';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Heart,
  Share2,
  X,
  BookOpen,
  Calendar as CalendarIcon,
} from 'lucide-react';

interface CalendarDay {
  day: number;
  empty?: boolean;
  isToday?: boolean;
  gDate?: Date;
  hasSaint?: boolean;
  isFasting?: boolean;
  fastName?: string;
  holidayName?: string;
  monthlySaint?: string;
}

export const CalendarScreen: React.FC = () => {
  const {
    theme,
    fontScale,
    todayEth,
    language,
    t,
    settings,
    updateSettings,
    toggleFavorite,
    isFavorite,
  } = useApp();

  const [currentYear, setCurrentYear] = useState<number>(todayEth.year);
  const [currentMonth, setCurrentMonth] = useState<number>(todayEth.month);
  const [selectedDayObj, setSelectedDayObj] = useState<CalendarDay | null>(null);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(13);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 13) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleGoToToday = () => {
    setCurrentYear(todayEth.year);
    setCurrentMonth(todayEth.month);
  };

  const monthData = ETHIOPIAN_MONTHS_DATA[currentMonth - 1];
  const daysInMonth =
    currentMonth === 13 ? (isEthLeap(currentYear) ? 6 : 5) : 30;

  // Calculate calendar grid days
  const calendarDays = useMemo(() => {
    const days: CalendarDay[] = [];
    // Day 1 Ethiopian date converted to Gregorian to get weekday
    const firstDayGC = ethToGC(currentYear, currentMonth, 1);
    const firstWeekday = firstDayGC.getDay(); // 0 = Sunday, 1 = Monday ...

    // Prepend empty slots
    for (let i = 0; i < firstWeekday; i++) {
      days.push({ day: 0, empty: true });
    }

    // Populate actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const gDate = ethToGC(currentYear, currentMonth, d);
      const isToday =
        todayEth.year === currentYear &&
        todayEth.month === currentMonth &&
        todayEth.day === d;

      const key = `${currentMonth}-${d}`;
      const saintList = saintsData[key];
      const hasSaint = Boolean(saintList && saintList.length > 0);
      const holidayName = ethHolidays[key];
      const fasting = checkOrthodoxFasting(currentYear, currentMonth, d, gDate);
      const monthlySaint = MONTHLY_SAINTS[d]?.amharic;

      days.push({
        day: d,
        isToday,
        gDate,
        hasSaint,
        isFasting: fasting.isFasting,
        fastName: fasting.fastNameAmharic,
        holidayName,
        monthlySaint,
      });
    }

    return days;
  }, [currentYear, currentMonth, daysInMonth, todayEth]);

  const selectedKey = selectedDayObj ? `${currentMonth}-${selectedDayObj.day}` : '';
  const selectedSaints = selectedDayObj ? saintsData[selectedKey] || [] : [];
  const selectedReadings = selectedDayObj ? gizaeData[selectedKey] || [] : [];
  const selectedTitle = selectedDayObj
    ? selectedDayObj.monthlySaint ||
      selectedDayObj.holidayName ||
      selectedSaints[0]?.name ||
      `${monthData.amharic} ${selectedDayObj.day}`
    : '';

  const isSelectedFav = selectedDayObj
    ? isFavorite(selectedTitle, currentMonth, selectedDayObj.day)
    : false;

  const handleToggleFavoriteSelected = () => {
    if (!selectedDayObj) return;
    toggleFavorite({
      type: selectedDayObj.holidayName ? 'feast' : 'saint',
      titleAmharic: selectedTitle,
      titleEnglish: `${monthData.english} ${selectedDayObj.day}`,
      description: selectedDayObj.holidayName || selectedSaints[0]?.description,
      dateEth: { month: currentMonth, day: selectedDayObj.day, year: currentYear },
    });
  };

  const handleShareSelected = async () => {
    if (!selectedDayObj) return;
    const shareText = `♰ ${monthData.amharic} ${toEthNum(selectedDayObj.day)} (${selectedDayObj.day}) ${currentYear} ዓ.ም. ♰\n` +
      `${selectedDayObj.monthlySaint ? `የዕለቱ ጽላት፡ ${selectedDayObj.monthlySaint}\n` : ''}` +
      `${selectedDayObj.holidayName ? `በዓል፡ ${selectedDayObj.holidayName}\n` : ''}` +
      `${selectedDayObj.isFasting ? `ጾም፡ ${selectedDayObj.fastName}\n` : ''}` +
      `ኢትዮጵያ ቀን መቁጠሪያ - Ethiopian Calendar`;

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: selectedTitle, text: shareText });
      }
    } catch (e) {
      console.warn('Share error:', e);
    }
  };

  const weekdays = [
    { am: 'እሁድ', en: 'Sun' },
    { am: 'ሰኞ', en: 'Mon' },
    { am: 'ማክሰኞ', en: 'Tue' },
    { am: 'ረቡዕ', en: 'Wed' },
    { am: 'ሐሙስ', en: 'Thu' },
    { am: 'ዓርብ', en: 'Fri' },
    { am: 'ቅዳሜ', en: 'Sat' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Month & Year Navigation Header */}
      <View style={[styles.navCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.stepperBtn, { backgroundColor: theme.goldLight }]}
            onPress={handlePrevMonth}
            accessibilityLabel={t('prevMonth')}
          >
            <ChevronLeft size={22} color={theme.gold} />
          </TouchableOpacity>

          <View style={styles.monthHeaderTitle}>
            <Text style={[styles.monthNameAmharic, { color: theme.text, fontSize: fontScale.header }]}>
              {monthData.amharic} ({monthData.english})
            </Text>
            <Text style={[styles.yearSubtitle, { color: theme.gold, fontSize: fontScale.caption }]}>
              {toEthNum(currentYear)} ({currentYear} ዓ.ም.)
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.stepperBtn, { backgroundColor: theme.goldLight }]}
            onPress={handleNextMonth}
            accessibilityLabel={t('nextMonth')}
          >
            <ChevronRight size={22} color={theme.gold} />
          </TouchableOpacity>
        </View>

        {/* Action Pills: Today & Geez toggle */}
        <View style={styles.actionPillsRow}>
          <TouchableOpacity
            style={[styles.pillButton, { backgroundColor: theme.primary }]}
            onPress={handleGoToToday}
          >
            <RotateCcw size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={[styles.pillText, { color: '#FFFFFF', fontSize: fontScale.caption }]}>
              {t('todayButton')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pillButton,
              {
                borderColor: theme.goldBorder,
                borderWidth: 1,
                backgroundColor: settings.showGeezNumerals ? theme.goldLight : 'transparent',
              },
            ]}
            onPress={() => updateSettings({ showGeezNumerals: !settings.showGeezNumerals })}
          >
            <Text style={[styles.pillText, { color: theme.gold, fontSize: fontScale.caption }]}>
              {settings.showGeezNumerals ? '፲፪ ግእዝ' : '12 አረብኛ'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Weekdays Header */}
      <View style={[styles.weekdayRow, { backgroundColor: theme.surfaceVariant }]}>
        {weekdays.map((w, i) => (
          <View key={`weekday-${i}`} style={styles.weekdayCell}>
            <Text style={[styles.weekdayText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
              {language === 'am' ? w.am : w.en}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <ScrollView
        style={styles.gridScrollView}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.daysGrid}>
          {calendarDays.map((item, idx) => {
            if (item.empty) {
              return <View key={`empty-${idx}`} style={styles.emptyDayCell} />;
            }

            const isSelected = selectedDayObj?.day === item.day;

            return (
              <TouchableOpacity
                key={`day-${item.day}`}
                style={[
                  styles.dayCell,
                  { backgroundColor: theme.card, borderColor: theme.cardBorder },
                  item.isToday && [styles.todayCell, { borderColor: theme.gold, backgroundColor: theme.goldLight }],
                  isSelected && [styles.selectedCell, { borderColor: theme.primary, borderWidth: 2 }],
                ]}
                onPress={() => setSelectedDayObj(item)}
                activeOpacity={0.7}
              >
                {/* Ethiopian Day */}
                <Text
                  style={[
                    styles.ethDayNumber,
                    {
                      color: item.isToday ? theme.gold : theme.text,
                      fontSize: settings.showGeezNumerals ? fontScale.ethiopianNumeral : fontScale.body,
                      fontWeight: item.isToday ? '800' : '600',
                    },
                  ]}
                >
                  {settings.showGeezNumerals ? toEthNum(item.day) : item.day}
                </Text>

                {/* Gregorian Equivalent Day Number */}
                <Text
                  style={[
                    styles.gcDayNumber,
                    { color: theme.textMuted, fontSize: fontScale.caption - 1 },
                  ]}
                >
                  {item.gDate?.getDate()}
                </Text>

                {/* Indicator Dots */}
                <View style={styles.indicatorsRow}>
                  {item.holidayName && (
                    <View style={[styles.dot, { backgroundColor: theme.crimson }]} />
                  )}
                  {item.isFasting && (
                    <View style={[styles.dot, { backgroundColor: theme.primary }]} />
                  )}
                  {item.hasSaint && !item.holidayName && (
                    <View style={[styles.dot, { backgroundColor: theme.gold }]} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Legend */}
        <View style={[styles.legendBox, { borderTopColor: theme.divider }]}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: theme.crimson, marginRight: 6 }]} />
            <Text style={[styles.legendText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
              {language === 'am' ? 'በዓል (Holiday)' : 'Feast Day'}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: theme.primary, marginRight: 6 }]} />
            <Text style={[styles.legendText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
              {language === 'am' ? 'ጾም (Fasting)' : 'Fasting Day'}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: theme.gold, marginRight: 6 }]} />
            <Text style={[styles.legendText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
              {language === 'am' ? 'ቅዱሳን (Saint)' : 'Saint'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Selected Date Detail Modal / Sheet */}
      {selectedDayObj && (
        <Modal
          visible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedDayObj(null)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setSelectedDayObj(null)}
            />

            <View style={[styles.detailSheet, { backgroundColor: theme.surface, borderTopColor: theme.cardBorder }]}>
              {/* Sheet Handle */}
              <View style={[styles.sheetHandle, { backgroundColor: theme.divider }]} />

              {/* Sheet Header */}
              <View style={styles.sheetHeader}>
                <View style={styles.sheetTitleCol}>
                  <Text style={[styles.sheetDateTitle, { color: theme.text, fontSize: fontScale.header }]}>
                    {monthData.amharic} {toEthNum(selectedDayObj.day)} ({selectedDayObj.day}) {currentYear} ዓ.ም.
                  </Text>
                  <Text style={[styles.sheetDateGc, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                    {selectedDayObj.gDate?.toLocaleDateString(language === 'am' ? 'en-US' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>

                <View style={styles.sheetActions}>
                  <TouchableOpacity
                    onPress={handleToggleFavoriteSelected}
                    style={styles.sheetIconBtn}
                    accessibilityLabel="Favorite"
                  >
                    <Heart
                      size={20}
                      color={isSelectedFav ? theme.crimson : theme.gold}
                      fill={isSelectedFav ? theme.crimson : 'transparent'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleShareSelected}
                    style={styles.sheetIconBtn}
                    accessibilityLabel="Share"
                  >
                    <Share2 size={20} color={theme.gold} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedDayObj(null)}
                    style={styles.sheetIconBtn}
                    accessibilityLabel="Close"
                  >
                    <X size={20} color={theme.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sheet Body Scroll */}
              <ScrollView style={styles.sheetContentScroll} showsVerticalScrollIndicator={false}>
                {/* Holiday Badge if present */}
                {selectedDayObj.holidayName && (
                  <View style={[styles.sheetBadgeBox, { backgroundColor: theme.feastBadge, borderColor: theme.goldBorder }]}>
                    <Text style={[styles.sheetBadgeTitle, { color: theme.feastText, fontSize: fontScale.bodySmall }]}>
                      🎉 {selectedDayObj.holidayName}
                    </Text>
                  </View>
                )}

                {/* Fasting Indicator */}
                <View
                  style={[
                    styles.sheetInfoBox,
                    {
                      backgroundColor: selectedDayObj.isFasting ? theme.fastingBadge : theme.surfaceVariant,
                      borderColor: theme.divider,
                    },
                  ]}
                >
                  <Text style={[styles.sheetInfoLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                    {t('fastingStatus')}
                  </Text>
                  <Text
                    style={[
                      styles.sheetInfoValue,
                      {
                        color: selectedDayObj.isFasting ? theme.primary : theme.textSecondary,
                        fontSize: fontScale.bodySmall,
                        fontWeight: '700',
                      },
                    ]}
                  >
                    {selectedDayObj.isFasting
                      ? `🕊️ ${selectedDayObj.fastName || t('isFastingToday')}`
                      : `🌿 ${t('isNotFastingToday')}`}
                  </Text>
                </View>

                {/* Monthly Saint */}
                {selectedDayObj.monthlySaint && (
                  <View style={[styles.sheetInfoBox, { backgroundColor: theme.goldLight, borderColor: theme.goldBorder }]}>
                    <Text style={[styles.sheetInfoLabel, { color: theme.gold, fontSize: fontScale.caption }]}>
                      {language === 'am' ? 'ወርሃዊ ጽላት' : 'Monthly Commemoration'}
                    </Text>
                    <Text style={[styles.sheetInfoValue, { color: theme.text, fontSize: fontScale.bodySmall, fontWeight: '700' }]}>
                      ⛪ {selectedDayObj.monthlySaint}
                    </Text>
                  </View>
                )}

                {/* Synaxarium Entries */}
                <View style={styles.sheetSection}>
                  <Text style={[styles.sheetSectionHeader, { color: theme.gold, fontSize: fontScale.caption }]}>
                    {t('dateDetailSynaxarium')}
                  </Text>
                  {selectedSaints.length > 0 ? (
                    selectedSaints.map((saint, sIdx) => (
                      <View key={`saint-${sIdx}`} style={styles.sheetSaintItem}>
                        <Text style={[styles.sheetSaintName, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                          • {saint.name}
                        </Text>
                        <Text style={[styles.sheetSaintDesc, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                          {saint.description}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text style={[styles.sheetEmptyText, { color: theme.textMuted, fontSize: fontScale.caption }]}>
                      {t('noSaintsFound')}
                    </Text>
                  )}
                </View>

                {/* Liturgical Readings */}
                {selectedReadings.length > 0 && (
                  <View style={styles.sheetSection}>
                    <Text style={[styles.sheetSectionHeader, { color: theme.gold, fontSize: fontScale.caption }]}>
                      {t('dateDetailReading')} (ግጻዌ)
                    </Text>
                    {selectedReadings.map((reading, rIdx) => (
                      <View key={`reading-${rIdx}`} style={styles.sheetReadingItem}>
                        <Text style={[styles.sheetReadingTitle, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                          📖 {reading.title}
                        </Text>
                        <Text style={[styles.sheetReadingContent, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                          "{reading.content}"
                        </Text>
                        <Text style={[styles.sheetReadingRef, { color: theme.gold, fontSize: fontScale.caption }]}>
                          — {reading.reference}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={{ height: 30 }} />
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navCard: {
    margin: 14,
    marginBottom: 8,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthHeaderTitle: {
    alignItems: 'center',
    flex: 1,
  },
  monthNameAmharic: {
    fontWeight: '800',
  },
  yearSubtitle: {
    fontWeight: '700',
    marginTop: 2,
  },
  actionPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },
  pillText: {
    fontWeight: '700',
  },
  weekdayRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekdayText: {
    fontWeight: '700',
  },
  gridScrollView: {
    flex: 1,
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
  },
  emptyDayCell: {
    width: '14.28%',
    height: 64,
  },
  dayCell: {
    width: '14.28%',
    height: 64,
    borderRadius: 8,
    borderWidth: 0.5,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  todayCell: {
    borderWidth: 1.5,
  },
  selectedCell: {
    borderRadius: 8,
  },
  ethDayNumber: {
    textAlign: 'center',
  },
  gcDayNumber: {
    fontWeight: '500',
  },
  indicatorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  legendBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderTopWidth: 1,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalBackdrop: {
    flex: 1,
  },
  detailSheet: {
    maxHeight: '75%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    padding: 16,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  sheetTitleCol: {
    flex: 1,
    paddingRight: 8,
  },
  sheetDateTitle: {
    fontWeight: '800',
  },
  sheetDateGc: {
    marginTop: 3,
  },
  sheetActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sheetIconBtn: {
    padding: 6,
    borderRadius: 16,
  },
  sheetContentScroll: {
    paddingTop: 12,
  },
  sheetBadgeBox: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  sheetBadgeTitle: {
    fontWeight: '700',
  },
  sheetInfoBox: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  sheetInfoLabel: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  sheetInfoValue: {
    marginTop: 3,
  },
  sheetSection: {
    marginTop: 10,
    marginBottom: 8,
  },
  sheetSectionHeader: {
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  sheetSaintItem: {
    marginBottom: 8,
  },
  sheetSaintName: {
    fontWeight: '700',
  },
  sheetSaintDesc: {
    marginLeft: 10,
    marginTop: 2,
    lineHeight: 16,
  },
  sheetEmptyText: {
    fontStyle: 'italic',
  },
  sheetReadingItem: {
    marginBottom: 10,
    paddingLeft: 6,
  },
  sheetReadingTitle: {
    fontWeight: '700',
    marginBottom: 2,
  },
  sheetReadingContent: {
    fontStyle: 'italic',
    lineHeight: 16,
    marginBottom: 2,
  },
  sheetReadingRef: {
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
});
