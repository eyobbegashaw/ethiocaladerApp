import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import { useApp, SecondaryTool } from '../context/AppContext';
import { ArrowLeftRight, Clock, Star, Hash, Info, Settings, X, Moon, Sun, Monitor, Type } from 'lucide-react';

export const DrawerMenu: React.FC = () => {
  const {
    theme,
    fontScale,
    drawerOpen,
    setDrawerOpen,
    openSecondaryTool,
    setActiveTab,
    t,
    themeMode,
    setThemeMode,
    fontSize,
    setFontSize,
    language,
    setLanguage,
  } = useApp();

  const menuItems: { id: SecondaryTool; label: string; icon: any; amharicSubtitle: string }[] = [
    {
      id: 'converter',
      label: t('menuConverter'),
      icon: ArrowLeftRight,
      amharicSubtitle: 'ቀን መቀየሪያ · Eth ⇄ GC',
    },
    {
      id: 'fasting',
      label: t('menuFasting'),
      icon: Clock,
      amharicSubtitle: 'ሰባቱ ታላላቅ አጽዋማት',
    },
    {
      id: 'bahre-hasab',
      label: t('menuBahreHasab'),
      icon: Star,
      amharicSubtitle: 'የዓመቱ ተንቀሳቃሽ በዓላት',
    },
    {
      id: 'converter', // Ge'ez tab within converter
      label: t('menuGeezNumbers'),
      icon: Hash,
      amharicSubtitle: 'ግእዝ ⇄ አረብኛ ቁጥሮች',
    },
    {
      id: 'about',
      label: t('menuAbout'),
      icon: Info,
      amharicSubtitle: 'ዲ/ን ኢዮብ በጋሻው · Eyob Begashaw',
    },
  ];

  const handleSelectTool = (tool: SecondaryTool) => {
    openSecondaryTool(tool);
  };

  const handleOpenSettings = () => {
    setDrawerOpen(false);
    setActiveTab('profile');
  };

  return (
    <Modal
      visible={drawerOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setDrawerOpen(false)}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdropPressable}
          activeOpacity={1}
          onPress={() => setDrawerOpen(false)}
        />

        <View style={[styles.drawerContent, { backgroundColor: theme.surface, borderLeftColor: theme.cardBorder }]}>
          {/* Header banner */}
          <View style={[styles.drawerHeader, { backgroundColor: theme.primary }]}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.crossSymbol}>♰</Text>
              <Text style={[styles.drawerTitle, { fontSize: fontScale.header }]}>
                {t('menuTitle')}
              </Text>
              <TouchableOpacity
                onPress={() => setDrawerOpen(false)}
                style={styles.closeBtn}
                accessibilityLabel="Close drawer"
              >
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={[styles.drawerSubtitle, { fontSize: fontScale.caption }]}>
              {t('appSubtitle')}
            </Text>
          </View>

          <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
            {/* Spiritual Tools Section */}
            <Text style={[styles.sectionHeading, { color: theme.gold, fontSize: fontScale.caption }]}>
              {language === 'am' ? 'መንፈሳዊ መሣሪያዎች' : 'SPIRITUAL TOOLS'}
            </Text>

            {menuItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <TouchableOpacity
                  key={`${item.id}-${index}`}
                  style={[styles.menuItem, { borderBottomColor: theme.divider }]}
                  onPress={() => handleSelectTool(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconCircle, { backgroundColor: theme.goldLight }]}>
                    <IconComp size={18} color={theme.gold} />
                  </View>
                  <View style={styles.itemTextContainer}>
                    <Text style={[styles.itemLabel, { color: theme.text, fontSize: fontScale.body }]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.itemSub, { color: theme.textMuted, fontSize: fontScale.caption }]}>
                      {item.amharicSubtitle}
                    </Text>
                  </View>
                  <Text style={[styles.itemChevron, { color: theme.gold }]}>›</Text>
                </TouchableOpacity>
              );
            })}

            {/* Quick Settings Section */}
            <Text style={[styles.sectionHeading, { color: theme.gold, fontSize: fontScale.caption, marginTop: 24 }]}>
              {language === 'am' ? 'ፈጣን ማስተካከያ' : 'QUICK PREFERENCES'}
            </Text>

            {/* Language Selector */}
            <View style={[styles.quickSettingCard, { backgroundColor: theme.surfaceVariant }]}>
              <Text style={[styles.quickSettingLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                {t('languageSection')}
              </Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    styles.groupBtn,
                    language === 'am' && [styles.groupBtnActive, { backgroundColor: theme.primary }],
                  ]}
                  onPress={() => setLanguage('am')}
                >
                  <Text style={[styles.groupBtnText, { color: language === 'am' ? '#FFFFFF' : theme.textSecondary }]}>
                    አማርኛ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.groupBtn,
                    language === 'en' && [styles.groupBtnActive, { backgroundColor: theme.primary }],
                  ]}
                  onPress={() => setLanguage('en')}
                >
                  <Text style={[styles.groupBtnText, { color: language === 'en' ? '#FFFFFF' : theme.textSecondary }]}>
                    English
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Theme Selector */}
            <View style={[styles.quickSettingCard, { backgroundColor: theme.surfaceVariant }]}>
              <Text style={[styles.quickSettingLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                {t('themeSection')}
              </Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    styles.groupBtn,
                    themeMode === 'light' && [styles.groupBtnActive, { backgroundColor: theme.primary }],
                  ]}
                  onPress={() => setThemeMode('light')}
                >
                  <Sun size={14} color={themeMode === 'light' ? '#FFF' : theme.textSecondary} style={{ marginRight: 4 }} />
                  <Text style={[styles.groupBtnText, { color: themeMode === 'light' ? '#FFFFFF' : theme.textSecondary }]}>
                    {language === 'am' ? 'ብርሃን' : 'Light'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.groupBtn,
                    themeMode === 'dark' && [styles.groupBtnActive, { backgroundColor: theme.primary }],
                  ]}
                  onPress={() => setThemeMode('dark')}
                >
                  <Moon size={14} color={themeMode === 'dark' ? '#FFF' : theme.textSecondary} style={{ marginRight: 4 }} />
                  <Text style={[styles.groupBtnText, { color: themeMode === 'dark' ? '#FFFFFF' : theme.textSecondary }]}>
                    {language === 'am' ? 'ጨለማ' : 'Dark'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.groupBtn,
                    themeMode === 'system' && [styles.groupBtnActive, { backgroundColor: theme.primary }],
                  ]}
                  onPress={() => setThemeMode('system')}
                >
                  <Monitor size={14} color={themeMode === 'system' ? '#FFF' : theme.textSecondary} style={{ marginRight: 4 }} />
                  <Text style={[styles.groupBtnText, { color: themeMode === 'system' ? '#FFFFFF' : theme.textSecondary }]}>
                    {language === 'am' ? 'ራስ-ሰር' : 'Auto'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Font Size Selector */}
            <View style={[styles.quickSettingCard, { backgroundColor: theme.surfaceVariant }]}>
              <Text style={[styles.quickSettingLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                {t('fontSizeSection')}
              </Text>
              <View style={styles.buttonGroup}>
                {(['small', 'medium', 'large', 'xlarge'] as const).map((sz) => (
                  <TouchableOpacity
                    key={sz}
                    style={[
                      styles.groupBtn,
                      fontSize === sz && [styles.groupBtnActive, { backgroundColor: theme.primary }],
                    ]}
                    onPress={() => setFontSize(sz)}
                  >
                    <Text
                      style={[
                        styles.groupBtnText,
                        { color: fontSize === sz ? '#FFFFFF' : theme.textSecondary, textTransform: 'capitalize' },
                      ]}
                    >
                      {sz === 'xlarge' ? 'XL' : sz[0].toUpperCase() + sz.slice(1, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* More Settings Link */}
            <TouchableOpacity
              style={[styles.fullSettingsBtn, { borderColor: theme.goldBorder }]}
              onPress={handleOpenSettings}
            >
              <Settings size={16} color={theme.gold} style={{ marginRight: 8 }} />
              <Text style={[styles.fullSettingsText, { color: theme.gold, fontSize: fontScale.bodySmall }]}>
                {t('profileTitle')}
              </Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  backdropPressable: {
    flex: 1,
  },
  drawerContent: {
    width: '84%',
    maxWidth: 340,
    height: '100%',
    borderLeftWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 16,
  },
  drawerHeader: {
    paddingTop: Platform.OS === 'ios' ? 50 : 24,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  crossSymbol: {
    color: '#D4AF37',
    fontSize: 16,
    marginRight: 6,
  },
  drawerTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    flex: 1,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 16,
  },
  drawerSubtitle: {
    color: '#D4AF37',
    marginTop: 4,
    opacity: 0.9,
  },
  menuScroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeading: {
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemLabel: {
    fontWeight: '600',
  },
  itemSub: {
    marginTop: 2,
  },
  itemChevron: {
    fontSize: 22,
    fontWeight: '300',
    paddingHorizontal: 6,
  },
  quickSettingCard: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  quickSettingLabel: {
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  groupBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 6,
  },
  groupBtnActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  groupBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  fullSettingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 16,
  },
  fullSettingsText: {
    fontWeight: '700',
  },
});
