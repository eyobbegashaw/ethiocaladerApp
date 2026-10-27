import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { ManuscriptCard } from '../components/ManuscriptCard';
import { FontSizeOption } from '../theme/colors';
import {
  User,
  Globe,
  Sun,
  Moon,
  Monitor,
  Type,
  Bell,
  RotateCcw,
  Info,
  Check,
  Edit2,
  Save,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    theme,
    fontScale,
    profile,
    updateProfile,
    themeMode,
    setThemeMode,
    fontSize,
    setFontSize,
    language,
    setLanguage,
    settings,
    updateSettings,
    resetAllPreferences,
    openSecondaryTool,
    t,
  } = useApp();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(profile.name);
  const [baptismalName, setBaptismalName] = useState<string>(profile.baptismalName);
  const [parish, setParish] = useState<string>(profile.parish);
  const [bio, setBio] = useState<string>(profile.bio);

  const handleSaveProfile = () => {
    updateProfile({
      name,
      baptismalName,
      parish,
      bio,
      avatarInitials: name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'EB',
    });
    setIsEditing(false);
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm(t('resetConfirm'))) {
        resetAllPreferences();
      }
    } else {
      Alert.alert(t('resetSettings'), t('resetConfirm'), [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetAllPreferences },
      ]);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Avatar Card */}
      <View style={[styles.avatarCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
        <View style={[styles.avatarCircle, { backgroundColor: theme.primary, borderColor: theme.gold }]}>
          <Text style={[styles.avatarInitials, { color: theme.gold }]}>
            {profile.avatarInitials || 'EB'}
          </Text>
        </View>

        <View style={styles.avatarInfo}>
          <Text style={[styles.profileNameText, { color: theme.text, fontSize: fontScale.header }]}>
            {profile.name}
          </Text>
          <Text style={[styles.profileBaptismal, { color: theme.gold, fontSize: fontScale.bodySmall }]}>
            ✝ {profile.baptismalName}
          </Text>
          <Text style={[styles.profileParish, { color: theme.textMuted, fontSize: fontScale.caption }]}>
            ⛪ {profile.parish}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.editToggleBtn, { backgroundColor: theme.goldLight, borderColor: theme.goldBorder }]}
          onPress={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
        >
          {isEditing ? (
            <Save size={16} color={theme.gold} />
          ) : (
            <Edit2 size={16} color={theme.gold} />
          )}
          <Text style={[styles.editToggleText, { color: theme.gold, fontSize: fontScale.caption }]}>
            {isEditing ? t('saveProfile') : t('editProfile')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Edit Form if active */}
      {isEditing && (
        <ManuscriptCard title={t('editProfile')} icon="✏️">
          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
              {t('displayName')}
            </Text>
            <TextInput
              style={[styles.formInput, { backgroundColor: theme.surfaceVariant, color: theme.text, borderColor: theme.divider }]}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
              {t('baptismalName')}
            </Text>
            <TextInput
              style={[styles.formInput, { backgroundColor: theme.surfaceVariant, color: theme.text, borderColor: theme.divider }]}
              value={baptismalName}
              onChangeText={setBaptismalName}
              placeholder="ምሳሌ፡ ወልደ ማርያም"
              placeholderTextColor={theme.textMuted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
              {t('parishLabel')}
            </Text>
            <TextInput
              style={[styles.formInput, { backgroundColor: theme.surfaceVariant, color: theme.text, borderColor: theme.divider }]}
              value={parish}
              onChangeText={setParish}
            />
          </View>

          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: theme.primary }]}
            onPress={handleSaveProfile}
          >
            <Check size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={[styles.saveBtnText, { fontSize: fontScale.bodySmall }]}>
              {t('saveProfile')}
            </Text>
          </TouchableOpacity>
        </ManuscriptCard>
      )}

      {/* App Preferences */}
      <Text style={[styles.sectionHeading, { color: theme.gold, fontSize: fontScale.header }]}>
        {language === 'am' ? 'የመተግበሪያ ማስተካከያዎች' : 'APP PREFERENCES'}
      </Text>

      {/* Language Section */}
      <ManuscriptCard title={t('languageSection')} icon="🌐">
        <View style={styles.choiceRow}>
          <TouchableOpacity
            style={[
              styles.choiceBtn,
              language === 'am' && [styles.choiceBtnActive, { backgroundColor: theme.primary, borderColor: theme.gold }],
              { borderColor: theme.divider },
            ]}
            onPress={() => setLanguage('am')}
          >
            <Text style={[styles.choiceBtnText, { color: language === 'am' ? '#FFFFFF' : theme.textSecondary, fontSize: fontScale.bodySmall }]}>
              አማርኛ (Amharic)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.choiceBtn,
              language === 'en' && [styles.choiceBtnActive, { backgroundColor: theme.primary, borderColor: theme.gold }],
              { borderColor: theme.divider },
            ]}
            onPress={() => setLanguage('en')}
          >
            <Text style={[styles.choiceBtnText, { color: language === 'en' ? '#FFFFFF' : theme.textSecondary, fontSize: fontScale.bodySmall }]}>
              English
            </Text>
          </TouchableOpacity>
        </View>
      </ManuscriptCard>

      {/* Theme Section */}
      <ManuscriptCard title={t('themeSection')} icon="🎨">
        <View style={styles.themeRow}>
          <TouchableOpacity
            style={[
              styles.themeChoiceBtn,
              themeMode === 'light' && [styles.themeChoiceBtnActive, { backgroundColor: theme.primary }],
              { borderColor: theme.divider },
            ]}
            onPress={() => setThemeMode('light')}
          >
            <Sun size={16} color={themeMode === 'light' ? '#FFF' : theme.textSecondary} style={{ marginBottom: 4 }} />
            <Text style={[styles.themeChoiceText, { color: themeMode === 'light' ? '#FFFFFF' : theme.textSecondary, fontSize: fontScale.caption }]}>
              {language === 'am' ? 'ብርሃናማ' : 'Light'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeChoiceBtn,
              themeMode === 'dark' && [styles.themeChoiceBtnActive, { backgroundColor: theme.primary }],
              { borderColor: theme.divider },
            ]}
            onPress={() => setThemeMode('dark')}
          >
            <Moon size={16} color={themeMode === 'dark' ? '#FFF' : theme.textSecondary} style={{ marginBottom: 4 }} />
            <Text style={[styles.themeChoiceText, { color: themeMode === 'dark' ? '#FFFFFF' : theme.textSecondary, fontSize: fontScale.caption }]}>
              {language === 'am' ? 'ጨለማ' : 'Dark'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeChoiceBtn,
              themeMode === 'system' && [styles.themeChoiceBtnActive, { backgroundColor: theme.primary }],
              { borderColor: theme.divider },
            ]}
            onPress={() => setThemeMode('system')}
          >
            <Monitor size={16} color={themeMode === 'system' ? '#FFF' : theme.textSecondary} style={{ marginBottom: 4 }} />
            <Text style={[styles.themeChoiceText, { color: themeMode === 'system' ? '#FFFFFF' : theme.textSecondary, fontSize: fontScale.caption }]}>
              {language === 'am' ? 'ራስ-ሰር' : 'System'}
            </Text>
          </TouchableOpacity>
        </View>
      </ManuscriptCard>

      {/* Font Size Section */}
      <ManuscriptCard title={t('fontSizeSection')} icon="🔤">
        <View style={styles.fontSizeRow}>
          {(['small', 'medium', 'large', 'xlarge'] as FontSizeOption[]).map((sz) => {
            const labels = {
              small: language === 'am' ? 'አነስተኛ' : 'Small',
              medium: language === 'am' ? 'መካከለኛ' : 'Medium',
              large: language === 'am' ? 'ትልቅ' : 'Large',
              xlarge: language === 'am' ? 'በጣም ትልቅ' : 'X-Large',
            };
            return (
              <TouchableOpacity
                key={sz}
                style={[
                  styles.fontChoiceBtn,
                  fontSize === sz && [styles.fontChoiceBtnActive, { backgroundColor: theme.primary }],
                  { borderColor: theme.divider },
                ]}
                onPress={() => setFontSize(sz)}
              >
                <Text
                  style={[
                    styles.fontChoiceText,
                    {
                      color: fontSize === sz ? '#FFFFFF' : theme.textSecondary,
                      fontSize: fontScale.caption,
                      fontWeight: fontSize === sz ? '700' : '500',
                    },
                  ]}
                >
                  {labels[sz]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ManuscriptCard>

      {/* Switches & Toggles */}
      <ManuscriptCard icon="⚙️">
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, { color: theme.text, fontSize: fontScale.bodySmall }]}>
            {t('geezNumeralsSetting')}
          </Text>
          <Switch
            value={settings.showGeezNumerals}
            onValueChange={(val) => updateSettings({ showGeezNumerals: val })}
            trackColor={{ false: theme.divider, true: theme.gold }}
          />
        </View>

        <View style={[styles.switchRow, { borderTopWidth: 1, borderTopColor: theme.divider }]}>
          <Text style={[styles.switchLabel, { color: theme.text, fontSize: fontScale.bodySmall }]}>
            {t('notificationsSetting')}
          </Text>
          <Switch
            value={settings.fastingNotifications}
            onValueChange={(val) => updateSettings({ fastingNotifications: val })}
            trackColor={{ false: theme.divider, true: theme.gold }}
          />
        </View>
      </ManuscriptCard>

      {/* About Developer Button */}
      <TouchableOpacity
        style={[styles.aboutCardBtn, { backgroundColor: theme.surface, borderColor: theme.goldBorder }]}
        onPress={() => openSecondaryTool('about')}
      >
        <View style={styles.aboutCardLeft}>
          <Info size={20} color={theme.gold} style={{ marginRight: 10 }} />
          <View>
            <Text style={[styles.aboutBtnTitle, { color: theme.text, fontSize: fontScale.bodySmall }]}>
              {t('aboutTitle')}
            </Text>
            <Text style={[styles.aboutBtnSub, { color: theme.textMuted, fontSize: fontScale.caption }]}>
              Eyob Begashaw · GitHub · Offline Details
            </Text>
          </View>
        </View>
        <Text style={[styles.aboutChevron, { color: theme.gold }]}>›</Text>
      </TouchableOpacity>

      {/* Reset Preferences */}
      <TouchableOpacity
        style={[styles.resetPreferencesBtn, { borderColor: theme.divider }]}
        onPress={handleReset}
      >
        <RotateCcw size={16} color={theme.crimson} style={{ marginRight: 6 }} />
        <Text style={[styles.resetText, { color: theme.crimson, fontSize: fontScale.caption }]}>
          {t('resetSettings')}
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
  avatarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarInitials: {
    fontSize: 20,
    fontWeight: '800',
  },
  avatarInfo: {
    flex: 1,
  },
  profileNameText: {
    fontWeight: '800',
  },
  profileBaptismal: {
    fontWeight: '700',
    marginTop: 2,
  },
  profileParish: {
    marginTop: 2,
  },
  editToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  editToggleText: {
    fontWeight: '700',
    marginLeft: 4,
  },
  formGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontWeight: '700',
    marginBottom: 4,
  },
  formInput: {
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 8,
    marginTop: 6,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sectionHeading: {
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 10,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: 10,
  },
  choiceBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  choiceBtnActive: {},
  choiceBtnText: {
    fontWeight: '700',
  },
  themeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themeChoiceBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeChoiceBtnActive: {},
  themeChoiceText: {
    fontWeight: '700',
  },
  fontSizeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  fontChoiceBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  fontChoiceBtnActive: {},
  fontChoiceText: {},
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  switchLabel: {
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },
  aboutCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 12,
  },
  aboutCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  aboutBtnTitle: {
    fontWeight: '700',
  },
  aboutBtnSub: {
    marginTop: 2,
  },
  aboutChevron: {
    fontSize: 22,
    fontWeight: '300',
  },
  resetPreferencesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  resetText: {
    fontWeight: '700',
  },
});
