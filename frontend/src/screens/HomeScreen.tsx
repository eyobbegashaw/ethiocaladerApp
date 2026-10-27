import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { ManuscriptCard } from '../components/ManuscriptCard';
import { saintsData } from '../data/saintsData';
import { gizaeData } from '../data/gizaeData';
import { sampleHolidays } from '../data/holidaysData';
import {
  Calendar as CalendarIcon,
  ArrowLeftRight,
  BookOpen,
  Clock,
  Star,
  Heart,
  Share2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    theme,
    fontScale,
    todayEth,
    language,
    t,
    setActiveTab,
    openSecondaryTool,
    toggleFavorite,
    isFavorite,
    settings,
  } = useApp();

  const todayKey = `${todayEth.month}-${todayEth.day}`;
  const todaySaints = saintsData[todayKey] || [];
  const primarySaint = todaySaints[0];
  const todayReading = (gizaeData[todayKey] || [])[0];

  const isTodayFav = isFavorite(
    todayEth.monthlySaintAmharic || `${todayEth.monthNameAmharic} ${todayEth.day}`,
    todayEth.month,
    todayEth.day
  );

  const handleToggleFavToday = () => {
    toggleFavorite({
      type: 'saint',
      titleAmharic: todayEth.monthlySaintAmharic || primarySaint?.name || `${todayEth.monthNameAmharic} ${todayEth.day}`,
      titleEnglish: todayEth.weekdayEnglish,
      description: primarySaint?.description || todayEth.fastingName || '',
      dateEth: { month: todayEth.month, day: todayEth.day, year: todayEth.year },
    });
  };

  const handleShareToday = async () => {
    const shareText = `♰ ${todayEth.monthNameAmharic} ${todayEth.geezDay} (${todayEth.day}) ${todayEth.year} ዓ.ም. ♰\n` +
      `${t('gregorianEquivalent')}: ${todayEth.gregorianDate.toLocaleDateString()}\n` +
      `${t('evangelistYear')}: ${todayEth.evangelistAmharic}\n` +
      `${todayEth.isFasting ? `[${todayEth.fastingNameAmharic}]` : `[${t('isNotFastingToday')}]`}\n` +
      `${todayEth.monthlySaintAmharic ? `መታሰቢያ፡ ${todayEth.monthlySaintAmharic}\n` : ''}` +
      `ኢትዮጵያ ቀን መቁጠሪያ - Ethiopian Calendar`;

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: todayEth.monthNameAmharic, text: shareText });
      } else {
        await Share.share({ message: shareText });
      }
    } catch (e) {
      console.warn('Share error:', e);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* TODAY BANNER CARD */}
      <View style={[styles.heroCard, { backgroundColor: theme.primary, borderColor: theme.goldBorder }]}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroTagBadge}>
            <Text style={[styles.heroTagText, { color: theme.gold }]}>
              {language === 'am' ? 'ዛሬ በኢትዮጵያ' : 'TODAY IN ETHIOPIA'}
            </Text>
          </View>
          <View style={styles.heroActionButtons}>
            <TouchableOpacity
              onPress={handleToggleFavToday}
              style={styles.heroIconBtn}
              accessibilityLabel="Add today to favorites"
            >
              <Heart
                size={18}
                color={isTodayFav ? theme.crimson : theme.gold}
                fill={isTodayFav ? theme.crimson : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShareToday}
              style={styles.heroIconBtn}
              accessibilityLabel="Share today date"
            >
              <Share2 size={18} color={theme.gold} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Big Numbers */}
        <View style={styles.dateDisplayRow}>
          <View style={styles.bigNumberContainer}>
            <Text style={[styles.bigGeezNumber, { color: theme.gold }]}>
              {settings.showGeezNumerals ? todayEth.geezDay : todayEth.day}
            </Text>
            {settings.showGeezNumerals && (
              <Text style={[styles.subArabicNumber, { color: '#E0E8E6', fontSize: fontScale.caption }]}>
                ({todayEth.day})
              </Text>
            )}
          </View>

          <View style={styles.dateMetaContainer}>
            <Text style={[styles.monthYearTitle, { fontSize: fontScale.title }]}>
              {todayEth.monthNameAmharic}{' '}
              <Text style={{ color: theme.gold }}>{todayEth.year}</Text>
            </Text>
            <Text style={[styles.monthEnglishText, { fontSize: fontScale.bodySmall }]}>
              {todayEth.monthNameEnglish} · {todayEth.evangelistAmharic} (ዘመነ {todayEth.evangelist})
            </Text>
            <Text style={[styles.weekdayText, { fontSize: fontScale.body, color: theme.gold }]}>
              {todayEth.weekdayAmharic} · {todayEth.weekdayEnglish}
            </Text>
          </View>
        </View>

        {/* Gregorian Equivalent Footnote */}
        <View style={[styles.gregorianBox, { backgroundColor: 'rgba(0,0,0,0.22)' }]}>
          <Text style={[styles.gregorianLabel, { color: '#B5C9C4', fontSize: fontScale.caption }]}>
            {t('gregorianEquivalent')}:
          </Text>
          <Text style={[styles.gregorianValue, { color: '#FFFFFF', fontSize: fontScale.bodySmall }]}>
            {todayEth.gregorianDate.toLocaleDateString(language === 'am' ? 'en-US' : 'en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
      </View>

      {/* FASTING STATUS BANNER */}
      <ManuscriptCard
        title={t('fastingStatus')}
        badge={todayEth.isFasting ? t('isFastingToday') : t('isNotFastingToday')}
        badgeType={todayEth.isFasting ? 'fasting' : 'default'}
        icon="🕊️"
      >
        <Text style={[styles.fastingTitle, { color: theme.text, fontSize: fontScale.body }]}>
          {todayEth.fastingNameAmharic || (language === 'am' ? 'ዛሬ የጾም ቀን አይደለም።' : 'Regular non-fasting day.')}
        </Text>
        {todayEth.fastingDescription && (
          <Text style={[styles.fastingDesc, { color: theme.textSecondary, fontSize: fontScale.bodySmall }]}>
            {todayEth.fastingDescription}
          </Text>
        )}
        <TouchableOpacity
          style={styles.learnMoreLink}
          onPress={() => openSecondaryTool('fasting')}
        >
          <Text style={[styles.learnMoreText, { color: theme.gold, fontSize: fontScale.caption }]}>
            {language === 'am' ? 'የሰባቱ አጽዋማት ሕግጋት ይመልከቱ ›' : 'View the Seven Canonical Fasts rules ›'}
          </Text>
        </TouchableOpacity>
      </ManuscriptCard>

      {/* TODAY'S COMMEMORATION & SAINTS */}
      <ManuscriptCard
        title={t('todaySaint')}
        badge={todayEth.monthlySaintAmharic ? 'ወርሃዊ ጽላት' : undefined}
        badgeType="gold"
        icon="⛪"
      >
        {todayEth.monthlySaintAmharic && (
          <View style={[styles.highlightBox, { backgroundColor: theme.goldLight, borderColor: theme.goldBorder }]}>
            <Text style={[styles.monthlySaintHeader, { color: theme.gold, fontSize: fontScale.caption }]}>
              {language === 'am' ? 'የዕለቱ ወርሃዊ መታሰቢያ' : 'Monthly Commemoration'}
            </Text>
            <Text style={[styles.monthlySaintName, { color: theme.text, fontSize: fontScale.body }]}>
              {todayEth.monthlySaintAmharic}
            </Text>
          </View>
        )}

        {primarySaint ? (
          <View style={styles.saintItem}>
            <Text style={[styles.saintName, { color: theme.text, fontSize: fontScale.body }]}>
              {primarySaint.name}
            </Text>
            <Text style={[styles.saintDesc, { color: theme.textSecondary, fontSize: fontScale.bodySmall }]}>
              {primarySaint.description}
            </Text>
          </View>
        ) : (
          <Text style={[styles.saintDesc, { color: theme.textMuted, fontSize: fontScale.bodySmall }]}>
            {t('noSaintsFound')}
          </Text>
        )}

        <TouchableOpacity
          style={styles.viewSynaxariumBtn}
          onPress={() => setActiveTab('spiritual')}
        >
          <Text style={[styles.viewSynaxariumText, { color: theme.primary, fontSize: fontScale.caption }]}>
            {t('readSynaxarium')} ›
          </Text>
        </TouchableOpacity>
      </ManuscriptCard>

      {/* DAILY SCRIPTURE / LITURGY */}
      {todayReading && (
        <ManuscriptCard title={t('dailyReading')} icon="📖">
          <Text style={[styles.readingTitle, { color: theme.text, fontSize: fontScale.body }]}>
            {todayReading.title}
          </Text>
          <Text
            style={[styles.readingContent, { color: theme.textSecondary, fontSize: fontScale.bodySmall }]}
            numberOfLines={4}
          >
            "{todayReading.content}"
          </Text>
          <Text style={[styles.readingRef, { color: theme.gold, fontSize: fontScale.caption }]}>
            — {todayReading.reference}
          </Text>
        </ManuscriptCard>
      )}

      {/* QUICK ACCESS GRID */}
      <Text style={[styles.sectionTitle, { color: theme.text, fontSize: fontScale.header }]}>
        {t('quickAccess')}
      </Text>

      <View style={styles.quickGrid}>
        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
          onPress={() => setActiveTab('calendar')}
          activeOpacity={0.7}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: theme.goldLight }]}>
            <CalendarIcon size={20} color={theme.gold} />
          </View>
          <Text style={[styles.quickCardTitle, { color: theme.text, fontSize: fontScale.bodySmall }]}>
            {t('navCalendar')}
          </Text>
          <Text style={[styles.quickCardSub, { color: theme.textMuted, fontSize: fontScale.caption }]}>
            {language === 'am' ? 'የወሩ መቁጠሪያ' : 'Full Month'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
          onPress={() => openSecondaryTool('converter')}
          activeOpacity={0.7}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: theme.goldLight }]}>
            <ArrowLeftRight size={20} color={theme.gold} />
          </View>
          <Text style={[styles.quickCardTitle, { color: theme.text, fontSize: fontScale.bodySmall }]}>
            {t('convertDate')}
          </Text>
          <Text style={[styles.quickCardSub, { color: theme.textMuted, fontSize: fontScale.caption }]}>
            Eth ⇄ GC
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
          onPress={() => openSecondaryTool('fasting')}
          activeOpacity={0.7}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: theme.goldLight }]}>
            <Clock size={20} color={theme.gold} />
          </View>
          <Text style={[styles.quickCardTitle, { color: theme.text, fontSize: fontScale.bodySmall }]}>
            {t('menuFasting')}
          </Text>
          <Text style={[styles.quickCardSub, { color: theme.textMuted, fontSize: fontScale.caption }]}>
            {language === 'am' ? 'ሰባቱ አጽዋማት' : 'Canonical Fasts'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
          onPress={() => openSecondaryTool('bahre-hasab')}
          activeOpacity={0.7}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: theme.goldLight }]}>
            <Star size={20} color={theme.gold} />
          </View>
          <Text style={[styles.quickCardTitle, { color: theme.text, fontSize: fontScale.bodySmall }]}>
            {t('menuBahreHasab')}
          </Text>
          <Text style={[styles.quickCardSub, { color: theme.textMuted, fontSize: fontScale.caption }]}>
            {language === 'am' ? 'የዓመቱ በዓላት' : 'Feast Calculator'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* UPCOMING FEASTS LIST */}
      <View style={[styles.upcomingSection, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <View style={styles.upcomingHeader}>
          <Text style={[styles.upcomingTitle, { color: theme.text, fontSize: fontScale.header }]}>
            {t('upcomingFeasts')}
          </Text>
          <TouchableOpacity onPress={() => openSecondaryTool('bahre-hasab')}>
            <Text style={[styles.viewAllText, { color: theme.gold, fontSize: fontScale.caption }]}>
              {t('viewAllFeasts')} ›
            </Text>
          </TouchableOpacity>
        </View>

        {sampleHolidays.slice(0, 4).map((holiday, idx) => (
          <View
            key={`holiday-${idx}`}
            style={[
              styles.holidayRow,
              idx < 3 && { borderBottomColor: theme.divider, borderBottomWidth: 1 },
            ]}
          >
            <View style={[styles.holidayBadge, { backgroundColor: theme.feastBadge }]}>
              <Text style={[styles.holidayBadgeText, { color: theme.feastText, fontSize: fontScale.caption }]}>
                {holiday.month}/{holiday.day}
              </Text>
            </View>
            <View style={styles.holidayInfo}>
              <Text style={[styles.holidayName, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                {holiday.name}
              </Text>
            </View>
            <ChevronRight size={16} color={theme.textMuted} />
          </View>
        ))}
      </View>

      {/* Offline Verified Badge */}
      <View style={styles.offlineGuaranteeBox}>
        <ShieldCheck size={16} color={theme.gold} style={{ marginRight: 6 }} />
        <Text style={[styles.offlineGuaranteeText, { color: theme.textMuted, fontSize: fontScale.caption }]}>
          {language === 'am'
            ? 'ትክክለኛ የባሕረ ሐሳብ ቀመር · 100% ያለ በይነመረብ ይሰራል'
            : 'Verified Bahre Hasab algorithms · 100% Offline'}
        </Text>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  heroTagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  heroTagText: {
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  heroActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  heroIconBtn: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  dateDisplayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  bigNumberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
  },
  bigGeezNumber: {
    fontSize: 44,
    fontWeight: '800',
    lineHeight: 48,
  },
  subArabicNumber: {
    marginTop: 2,
    fontWeight: '500',
  },
  dateMetaContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  monthYearTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  monthEnglishText: {
    color: '#D4E0DC',
    marginTop: 2,
  },
  weekdayText: {
    fontWeight: '700',
    marginTop: 4,
  },
  gregorianBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  gregorianLabel: {
    fontWeight: '600',
  },
  gregorianValue: {
    fontWeight: '600',
  },
  fastingTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  fastingDesc: {
    lineHeight: 18,
    marginBottom: 6,
  },
  learnMoreLink: {
    marginTop: 4,
  },
  learnMoreText: {
    fontWeight: '700',
  },
  highlightBox: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  monthlySaintHeader: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  monthlySaintName: {
    fontWeight: '700',
    marginTop: 2,
  },
  saintItem: {
    marginTop: 4,
  },
  saintName: {
    fontWeight: '700',
  },
  saintDesc: {
    marginTop: 3,
    lineHeight: 18,
  },
  viewSynaxariumBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  viewSynaxariumText: {
    fontWeight: '700',
  },
  readingTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  readingContent: {
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 6,
  },
  readingRef: {
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
  sectionTitle: {
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 10,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  quickCard: {
    flex: 1,
    minWidth: '47%',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickCardTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },
  quickCardSub: {
    marginTop: 2,
    textAlign: 'center',
  },
  upcomingSection: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  upcomingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  upcomingTitle: {
    fontWeight: '700',
  },
  viewAllText: {
    fontWeight: '700',
  },
  holidayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  holidayBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  holidayBadgeText: {
    fontWeight: '700',
  },
  holidayInfo: {
    flex: 1,
  },
  holidayName: {
    fontWeight: '600',
  },
  offlineGuaranteeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  offlineGuaranteeText: {
    fontWeight: '500',
  },
});
