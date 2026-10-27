import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { ManuscriptCard } from '../components/ManuscriptCard';
import {
  Info,
  GitBranch,
  ShieldCheck,
  Heart,
  Share2,
  ExternalLink,
} from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const { theme, fontScale, language, t } = useApp();

  const handleShareApp = async () => {
    const text = 'ኢትዮጵያ ቀን መቁጠሪያ - Ethiopian Orthodox Tewahedo Calendar\n' +
      'https://github.com/eyobbegashaw/Ethiopia_Calander\n' +
      'Developed by Eyob Begashaw';
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: 'Ethiopian Calendar', text });
      } else {
        await Share.share({ message: text });
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
      {/* App Identity Banner */}
      <View style={[styles.brandBanner, { backgroundColor: theme.primary, borderColor: theme.goldBorder }]}>
        <Text style={styles.bannerCross}>♰</Text>
        <Text style={[styles.brandTitle, { color: '#FFFFFF', fontSize: fontScale.title }]}>
          {t('appName')}
        </Text>
        <Text style={[styles.brandSubtitle, { color: theme.gold, fontSize: fontScale.bodySmall }]}>
          {t('appSubtitle')}
        </Text>
        <Text style={[styles.brandTagline, { color: '#D4E2DF', fontSize: fontScale.caption }]}>
          {t('appTagline')}
        </Text>
      </View>

      {/* Developer Card */}
      <ManuscriptCard title={t('developedBy')} icon="👤">
        <Text style={[styles.devName, { color: theme.text, fontSize: fontScale.header }]}>
          {t('developerName')}
        </Text>
        <Text style={[styles.devBio, { color: theme.textSecondary, fontSize: fontScale.bodySmall }]}>
          {t('developerBio')}
        </Text>
      </ManuscriptCard>

      {/* App Mission Card */}
      <ManuscriptCard title={t('appMission')} icon="📜">
        <Text style={[styles.missionText, { color: theme.text, fontSize: fontScale.bodySmall }]}>
          {t('appMissionText')}
        </Text>
      </ManuscriptCard>

      {/* Offline Guarantee */}
      <ManuscriptCard title={t('offlineStatusLabel')} icon="🛡️">
        <View style={[styles.offlineHighlight, { backgroundColor: theme.fastingBadge, borderColor: theme.primary }]}>
          <ShieldCheck size={20} color={theme.primary} style={{ marginRight: 8 }} />
          <Text style={[styles.offlineHighlightText, { color: theme.primary, fontSize: fontScale.bodySmall }]}>
            {t('offlineStatusText')}
          </Text>
        </View>
        <Text style={[styles.offlineDetails, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
          {language === 'am'
            ? 'ሁሉም የዘመን ቀመሮች፣ የባሕረ ሐሳብ ስሌቶች፣ የስንክሳር መዛግብት እና የግጻዌ ምንባባት ከመተግበሪያው ጋር አብረው ስለተጫኑ ምንም አይነት የበይነመረብ ግንኙነት ሳያስፈልጋቸው ሙሉ በሙሉ ይሰራሉ።'
            : 'All calendar algorithms, Bahre Hasab calculations, Synaxarium records, and liturgical texts are bundled locally with zero cloud dependencies.'}
        </Text>
      </ManuscriptCard>

      {/* Repository Card */}
      <ManuscriptCard title={t('sourceCodeRepo')} icon="💻">
        <View style={styles.repoRow}>
          <GitBranch size={16} color={theme.gold} style={{ marginRight: 8 }} />
          <Text style={[styles.repoLink, { color: theme.text, fontSize: fontScale.bodySmall }]}>
            github.com/eyobbegashaw/Ethiopia_Calander
          </Text>
        </View>
        <Text style={[styles.repoSub, { color: theme.textMuted, fontSize: fontScale.caption }]}>
          Open source Ethiopian Orthodox calendar and spiritual calculation algorithms.
        </Text>
      </ManuscriptCard>

      {/* Acknowledgements */}
      <ManuscriptCard title={t('acknowledgements')} icon="🙏">
        <Text style={[styles.ackText, { color: theme.textSecondary, fontSize: fontScale.bodySmall }]}>
          {t('acknowledgementsText')}
        </Text>
      </ManuscriptCard>

      {/* App Metadata */}
      <View style={styles.metaRow}>
        <Text style={[styles.metaText, { color: theme.textMuted, fontSize: fontScale.caption }]}>
          {t('versionLabel')}: 1.0.0 (Production Release)
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.shareBtn, { backgroundColor: theme.primary }]}
        onPress={handleShareApp}
      >
        <Share2 size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={[styles.shareBtnText, { fontSize: fontScale.bodySmall }]}>
          {language === 'am' ? 'መተግበሪያውን አጋራ' : 'Share This App'}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  brandBanner: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  bannerCross: {
    color: '#D4AF37',
    fontSize: 26,
    marginBottom: 6,
  },
  brandTitle: {
    fontWeight: '800',
    textAlign: 'center',
  },
  brandSubtitle: {
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
  brandTagline: {
    marginTop: 6,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  devName: {
    fontWeight: '800',
    marginBottom: 6,
  },
  devBio: {
    lineHeight: 20,
  },
  missionText: {
    lineHeight: 22,
  },
  offlineHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  offlineHighlightText: {
    fontWeight: '700',
    flex: 1,
  },
  offlineDetails: {
    lineHeight: 18,
  },
  repoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  repoLink: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  repoSub: {
    lineHeight: 16,
  },
  ackText: {
    lineHeight: 20,
    fontStyle: 'italic',
  },
  metaRow: {
    alignItems: 'center',
    marginVertical: 14,
  },
  metaText: {
    fontWeight: '600',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 6,
  },
  shareBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
