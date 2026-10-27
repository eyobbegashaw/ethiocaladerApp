import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { ManuscriptCard } from '../components/ManuscriptCard';
import { CANONICAL_FASTS, CanonicalFast } from '../data/fastingData';
import { Clock, Shield, CheckCircle2 } from 'lucide-react';

export const FastingScreen: React.FC = () => {
  const { theme, fontScale, language, t } = useApp();
  const [filter, setFilter] = useState<'all' | 'fixed' | 'movable'>('all');

  const filteredFasts = CANONICAL_FASTS.filter((f) => {
    if (filter === 'fixed') return f.timing.includes('Fixed') || f.timing.includes('ቋሚ');
    if (filter === 'movable') return f.timing.includes('Movable') || f.timing.includes('ተንቀሳቃሽ');
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header Banner */}
      <View style={[styles.headerCard, { backgroundColor: theme.primary, borderColor: theme.goldBorder }]}>
        <View style={styles.headerTitleRow}>
          <Clock size={20} color={theme.gold} style={{ marginRight: 8 }} />
          <Text style={[styles.headerTitle, { color: '#FFFFFF', fontSize: fontScale.header }]}>
            {t('fastingScreenTitle')}
          </Text>
        </View>
        <Text style={[styles.headerSub, { color: theme.gold, fontSize: fontScale.caption }]}>
          {t('fastingSubtitle')}
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterPill,
            filter === 'all' && [styles.filterPillActive, { backgroundColor: theme.primary }],
            { borderColor: theme.divider },
          ]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, { color: filter === 'all' ? '#FFFFFF' : theme.textSecondary, fontSize: fontScale.caption }]}>
            {language === 'am' ? 'ሁሉም (7 አጽዋማት)' : 'All 7 Fasts'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            filter === 'movable' && [styles.filterPillActive, { backgroundColor: theme.primary }],
            { borderColor: theme.divider },
          ]}
          onPress={() => setFilter('movable')}
        >
          <Text style={[styles.filterText, { color: filter === 'movable' ? '#FFFFFF' : theme.textSecondary, fontSize: fontScale.caption }]}>
            {language === 'am' ? 'ተንቀሳቃሽ' : 'Movable'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            filter === 'fixed' && [styles.filterPillActive, { backgroundColor: theme.primary }],
            { borderColor: theme.divider },
          ]}
          onPress={() => setFilter('fixed')}
        >
          <Text style={[styles.filterText, { color: filter === 'fixed' ? '#FFFFFF' : theme.textSecondary, fontSize: fontScale.caption }]}>
            {language === 'am' ? 'ቋሚ' : 'Fixed'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {filteredFasts.map((fast) => (
          <ManuscriptCard
            key={fast.id}
            title={language === 'am' ? fast.nameAmharic : fast.nameEnglish}
            subtitle={language === 'am' ? fast.nameEnglish : fast.nameAmharic}
            badge={fast.duration}
            badgeType="fasting"
            icon="🕊️"
          >
            <View style={styles.sectionRow}>
              <Text style={[styles.label, { color: theme.gold, fontSize: fontScale.caption }]}>
                {t('fastTiming')}:
              </Text>
              <Text style={[styles.value, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                {fast.timing}
              </Text>
            </View>

            <View style={styles.sectionRow}>
              <Text style={[styles.label, { color: theme.gold, fontSize: fontScale.caption }]}>
                {t('fastPurpose')}:
              </Text>
              <Text style={[styles.value, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                {fast.purpose}
              </Text>
            </View>

            <View style={styles.sectionRow}>
              <Text style={[styles.label, { color: theme.gold, fontSize: fontScale.caption }]}>
                {t('fastRules')}:
              </Text>
              <Text style={[styles.value, { color: theme.text, fontSize: fontScale.bodySmall }]}>
                {fast.dietaryRules}
              </Text>
            </View>

            <View style={[styles.scriptureBox, { backgroundColor: theme.surfaceVariant }]}>
              <Text style={[styles.scriptureText, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                📜 {t('scripturalBasis')}: {fast.scripturalBasis}
              </Text>
            </View>
          </ManuscriptCard>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 14,
    marginBottom: 8,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontWeight: '800',
  },
  headerSub: {
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    gap: 8,
    marginBottom: 10,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  filterPillActive: {},
  filterText: {
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 14,
    paddingBottom: 40,
  },
  sectionRow: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  value: {
    marginTop: 2,
    lineHeight: 18,
  },
  scriptureBox: {
    padding: 8,
    borderRadius: 8,
    marginTop: 6,
  },
  scriptureText: {
    fontWeight: '600',
  },
});
