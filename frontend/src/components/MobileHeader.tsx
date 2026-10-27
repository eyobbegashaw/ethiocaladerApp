import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useApp } from '../context/AppContext';
import { Menu, Globe, Sparkles } from 'lucide-react';

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  subtitle,
  showBack,
  onBack,
}) => {
  const { theme, fontScale, language, setLanguage, t, setDrawerOpen } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === 'am' ? 'en' : 'am');
  };

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.headerBackground }]}>
      {/* Decorative top border in gold */}
      <View style={[styles.goldTopBorder, { backgroundColor: theme.gold }]} />

      <View style={styles.headerContent}>
        {/* Left icon / Drawer / Back button */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={showBack && onBack ? onBack : () => setDrawerOpen(true)}
          accessibilityLabel={showBack ? 'Go back' : 'Open menu'}
          accessibilityRole="button"
        >
          {showBack ? (
            <Text style={[styles.backText, { color: theme.gold }]}>‹</Text>
          ) : (
            <Menu size={22} color={theme.gold} />
          )}
        </TouchableOpacity>

        {/* Center Title & Cross Motif */}
        <View style={styles.titleContainer}>
          <View style={styles.crossRow}>
            <Text style={[styles.crossIcon, { color: theme.gold }]}>♰</Text>
            <Text
              style={[
                styles.titleText,
                { color: theme.headerText, fontSize: fontScale.header },
              ]}
              numberOfLines={1}
            >
              {title || t('appName')}
            </Text>
            <Text style={[styles.crossIcon, { color: theme.gold }]}>♰</Text>
          </View>
          <Text
            style={[
              styles.subtitleText,
              { color: theme.gold, fontSize: fontScale.caption },
            ]}
            numberOfLines={1}
          >
            {subtitle || t('appSubtitle')}
          </Text>
        </View>

        {/* Right Language Toggle Button */}
        <TouchableOpacity
          style={[styles.langButton, { borderColor: theme.goldBorder, backgroundColor: theme.goldLight }]}
          onPress={toggleLanguage}
          accessibilityLabel="Switch language"
          accessibilityRole="button"
        >
          <Globe size={14} color={theme.gold} style={{ marginRight: 4 }} />
          <Text style={[styles.langText, { color: theme.gold, fontSize: fontScale.caption }]}>
            {language === 'am' ? 'EN' : 'አማ'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 44 : 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 100,
  },
  goldTopBorder: {
    height: 3,
    width: '100%',
    marginBottom: 8,
    borderRadius: 2,
    opacity: 0.85,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '700',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  crossRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossIcon: {
    fontSize: 14,
    marginHorizontal: 6,
    opacity: 0.9,
  },
  titleText: {
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  subtitleText: {
    marginTop: 2,
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '500',
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  langText: {
    fontWeight: '700',
  },
});
