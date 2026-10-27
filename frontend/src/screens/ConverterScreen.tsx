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
import {
  ETHIOPIAN_MONTHS_DATA,
  GREGORIAN_MONTHS_DATA,
  isEthLeap,
  ethToGC,
  gcToEth,
  toEthNum,
  arabicToGeez,
  geezToArabic,
} from '../calendar/calendarCore';
import {
  ArrowLeftRight,
  Copy,
  Share2,
  Check,
  AlertCircle,
  Hash,
} from 'lucide-react';

type ConverterTab = 'ethToGc' | 'gcToEth' | 'geezNumbers';

export const ConverterScreen: React.FC = () => {
  const { theme, fontScale, todayEth, language, t } = useApp();

  const [activeTab, setActiveTab] = useState<ConverterTab>('ethToGc');

  // Ethiopian to GC state
  const [ethYear, setEthYear] = useState<string>(String(todayEth.year));
  const [ethMonth, setEthMonth] = useState<number>(todayEth.month);
  const [ethDay, setEthDay] = useState<string>(String(todayEth.day));
  const [ethResult, setEthResult] = useState<string | null>(null);
  const [ethError, setEthError] = useState<string | null>(null);

  // Gregorian to Eth state
  const todayGc = new Date();
  const [gcYear, setGcYear] = useState<string>(String(todayGc.getFullYear()));
  const [gcMonth, setGcMonth] = useState<number>(todayGc.getMonth() + 1);
  const [gcDay, setGcDay] = useState<string>(String(todayGc.getDate()));
  const [gcResult, setGcResult] = useState<string | null>(null);
  const [gcError, setGcError] = useState<string | null>(null);

  // Ge'ez converter state
  const [arabicInput, setArabicInput] = useState<string>('2018');
  const [geezOutput, setGeezOutput] = useState<string>('፳፻፲፰');
  const [geezInput, setGeezInput] = useState<string>('፳፻፲፰');
  const [arabicOutput, setArabicOutput] = useState<string>('2018');
  const [geezError, setGeezError] = useState<string | null>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Convert Eth to GC
  const handleConvertEthToGc = () => {
    setEthError(null);
    const y = parseInt(ethYear, 10);
    const d = parseInt(ethDay, 10);

    if (isNaN(y) || y < 1 || y > 9999) {
      setEthError(language === 'am' ? 'እባክዎ ትክክለኛ ዓመተ ምሕረት ያስገቡ።' : 'Please enter a valid year.');
      return;
    }
    const maxDays = ethMonth === 13 ? (isEthLeap(y) ? 6 : 5) : 30;
    if (isNaN(d) || d < 1 || d > maxDays) {
      setEthError(
        language === 'am'
          ? `የተመረጠው ወር የቀናት ብዛት ${maxDays} ነው። እባክዎ ከ1 እስከ ${maxDays} ያስገቡ።`
          : `Selected month has ${maxDays} days. Enter between 1 and ${maxDays}.`
      );
      return;
    }

    try {
      const converted = ethToGC(y, ethMonth, d);
      const formatted = converted.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const monthData = ETHIOPIAN_MONTHS_DATA[ethMonth - 1];
      setEthResult(
        `${monthData.amharic} ${toEthNum(d)} (${d}) ${y} ዓ.ም.\n= ${formatted}`
      );
    } catch (e: any) {
      setEthError(e.message || t('invalidDateError'));
    }
  };

  // Convert GC to Eth
  const handleConvertGcToEth = () => {
    setGcError(null);
    const y = parseInt(gcYear, 10);
    const d = parseInt(gcDay, 10);

    if (isNaN(y) || y < 1900 || y > 2100) {
      setGcError(language === 'am' ? 'እባክዎ ከ1900 እስከ 2100 ዓ.ም. ያስገቡ።' : 'Enter a year between 1900 and 2100.');
      return;
    }
    if (isNaN(d) || d < 1 || d > 31) {
      setGcError(language === 'am' ? 'እባክዎ ትክክለኛ ቀን ያስገቡ።' : 'Please enter a valid day.');
      return;
    }

    try {
      const gDate = new Date(y, gcMonth - 1, d);
      const converted = gcToEth(gDate);
      const mData = ETHIOPIAN_MONTHS_DATA[converted.month - 1];
      setGcResult(
        `${GREGORIAN_MONTHS_DATA[gcMonth - 1]} ${d}, ${y}\n= ${mData.amharic} ${toEthNum(converted.day)} (${converted.day}) ${converted.year} ዓ.ም.`
      );
    } catch (e: any) {
      setGcError(e.message || t('invalidDateError'));
    }
  };

  // Convert Arabic to Geez
  const handleArabicToGeez = () => {
    setGeezError(null);
    const val = parseInt(arabicInput, 10);
    if (isNaN(val) || val < 1) {
      setGeezError(language === 'am' ? 'እባክዎ አዎንታዊ ሙሉ ቁጥር ያስገቡ።' : 'Enter a positive whole number.');
      return;
    }
    try {
      setGeezOutput(arabicToGeez(val));
    } catch (e: any) {
      setGeezError(e.message);
    }
  };

  // Convert Geez to Arabic
  const handleGeezToArabic = () => {
    setGeezError(null);
    try {
      const val = geezToArabic(geezInput);
      setArabicOutput(String(val));
    } catch (e: any) {
      setGeezError(e.message || 'Invalid Ge\'ez numeral.');
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2500);
      }
    } catch (e) {
      console.warn('Clipboard error:', e);
    }
  };

  const shareConversion = async (text: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: 'Date Conversion', text });
      } else {
        await Share.share({ message: text });
      }
    } catch (e) {
      console.warn('Share error:', e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Segmented Tabs */}
      <View style={[styles.tabBar, { backgroundColor: theme.surface, borderBottomColor: theme.cardBorder }]}>
        <TouchableOpacity
          style={[
            styles.segmentTab,
            activeTab === 'ethToGc' && [styles.segmentTabActive, { borderBottomColor: theme.gold }],
          ]}
          onPress={() => setActiveTab('ethToGc')}
        >
          <Text
            style={[
              styles.segmentLabel,
              {
                color: activeTab === 'ethToGc' ? theme.gold : theme.textSecondary,
                fontSize: fontScale.caption,
                fontWeight: activeTab === 'ethToGc' ? '800' : '600',
              },
            ]}
          >
            {t('ethToGcTab')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentTab,
            activeTab === 'gcToEth' && [styles.segmentTabActive, { borderBottomColor: theme.gold }],
          ]}
          onPress={() => setActiveTab('gcToEth')}
        >
          <Text
            style={[
              styles.segmentLabel,
              {
                color: activeTab === 'gcToEth' ? theme.gold : theme.textSecondary,
                fontSize: fontScale.caption,
                fontWeight: activeTab === 'gcToEth' ? '800' : '600',
              },
            ]}
          >
            {t('gcToEthTab')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentTab,
            activeTab === 'geezNumbers' && [styles.segmentTabActive, { borderBottomColor: theme.gold }],
          ]}
          onPress={() => setActiveTab('geezNumbers')}
        >
          <Text
            style={[
              styles.segmentLabel,
              {
                color: activeTab === 'geezNumbers' ? theme.gold : theme.textSecondary,
                fontSize: fontScale.caption,
                fontWeight: activeTab === 'geezNumbers' ? '800' : '600',
              },
            ]}
          >
            {t('geezConverterTab')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* ================= TAB 1: ETHIOPIAN TO GREGORIAN ================= */}
        {activeTab === 'ethToGc' && (
          <ManuscriptCard title={t('selectEthDate')} icon="🔄">
            <View style={styles.formRow}>
              <View style={styles.inputGroup}>
                <Text style={[styles.fieldLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                  {t('monthLabel')}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.miniMonthScroll}>
                  {ETHIOPIAN_MONTHS_DATA.map((m) => (
                    <TouchableOpacity
                      key={`eth-m-${m.number}`}
                      style={[
                        styles.miniMonthPill,
                        {
                          backgroundColor: ethMonth === m.number ? theme.primary : theme.surfaceVariant,
                          borderColor: ethMonth === m.number ? theme.gold : theme.divider,
                        },
                      ]}
                      onPress={() => setEthMonth(m.number)}
                    >
                      <Text
                        style={[
                          styles.miniMonthText,
                          {
                            color: ethMonth === m.number ? '#FFFFFF' : theme.textSecondary,
                            fontSize: fontScale.caption,
                            fontWeight: ethMonth === m.number ? '700' : '500',
                          },
                        ]}
                      >
                        {m.amharic}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.inputsDualRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.fieldLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                  {t('dayLabel')} (1 - {ethMonth === 13 ? 6 : 30})
                </Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: theme.surfaceVariant, color: theme.text, borderColor: theme.divider }]}
                  value={ethDay}
                  onChangeText={setEthDay}
                  keyboardType="numeric"
                  placeholder="Day"
                  placeholderTextColor={theme.textMuted}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.fieldLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                  {t('yearLabel')}
                </Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: theme.surfaceVariant, color: theme.text, borderColor: theme.divider }]}
                  value={ethYear}
                  onChangeText={setEthYear}
                  keyboardType="numeric"
                  placeholder="2018"
                  placeholderTextColor={theme.textMuted}
                />
              </View>
            </View>

            {ethError && (
              <View style={styles.errorBox}>
                <AlertCircle size={15} color={theme.crimson} style={{ marginRight: 6 }} />
                <Text style={[styles.errorText, { color: theme.crimson, fontSize: fontScale.caption }]}>
                  {ethError}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.primaryConvertBtn, { backgroundColor: theme.primary }]}
              onPress={handleConvertEthToGc}
            >
              <ArrowLeftRight size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={[styles.primaryConvertText, { fontSize: fontScale.body }]}>
                {t('convertAction')}
              </Text>
            </TouchableOpacity>

            {ethResult && (
              <View style={[styles.resultBox, { backgroundColor: theme.goldLight, borderColor: theme.goldBorder }]}>
                <Text style={[styles.resultHeading, { color: theme.gold, fontSize: fontScale.caption }]}>
                  {t('conversionResult')}
                </Text>
                <Text style={[styles.resultValueText, { color: theme.text, fontSize: fontScale.body }]}>
                  {ethResult}
                </Text>

                <View style={styles.resultActionsRow}>
                  <TouchableOpacity
                    style={[styles.resultActionBtn, { borderColor: theme.goldBorder }]}
                    onPress={() => copyToClipboard(ethResult, 'eth')}
                  >
                    {copiedKey === 'eth' ? (
                      <Check size={14} color={theme.primary} style={{ marginRight: 4 }} />
                    ) : (
                      <Copy size={14} color={theme.gold} style={{ marginRight: 4 }} />
                    )}
                    <Text style={[styles.resultActionText, { color: theme.gold, fontSize: fontScale.caption }]}>
                      {copiedKey === 'eth' ? t('copiedAlert') : t('copyResult')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.resultActionBtn, { borderColor: theme.goldBorder }]}
                    onPress={() => shareConversion(ethResult)}
                  >
                    <Share2 size={14} color={theme.gold} style={{ marginRight: 4 }} />
                    <Text style={[styles.resultActionText, { color: theme.gold, fontSize: fontScale.caption }]}>
                      {t('shareResult')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ManuscriptCard>
        )}

        {/* ================= TAB 2: GREGORIAN TO ETHIOPIAN ================= */}
        {activeTab === 'gcToEth' && (
          <ManuscriptCard title={t('selectGcDate')} icon="🔄">
            <View style={styles.formRow}>
              <View style={styles.inputGroup}>
                <Text style={[styles.fieldLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                  Gregorian Month
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.miniMonthScroll}>
                  {GREGORIAN_MONTHS_DATA.map((m, idx) => (
                    <TouchableOpacity
                      key={`gc-m-${idx}`}
                      style={[
                        styles.miniMonthPill,
                        {
                          backgroundColor: gcMonth === idx + 1 ? theme.primary : theme.surfaceVariant,
                          borderColor: gcMonth === idx + 1 ? theme.gold : theme.divider,
                        },
                      ]}
                      onPress={() => setGcMonth(idx + 1)}
                    >
                      <Text
                        style={[
                          styles.miniMonthText,
                          {
                            color: gcMonth === idx + 1 ? '#FFFFFF' : theme.textSecondary,
                            fontSize: fontScale.caption,
                            fontWeight: gcMonth === idx + 1 ? '700' : '500',
                          },
                        ]}
                      >
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.inputsDualRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.fieldLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                  Day (1 - 31)
                </Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: theme.surfaceVariant, color: theme.text, borderColor: theme.divider }]}
                  value={gcDay}
                  onChangeText={setGcDay}
                  keyboardType="numeric"
                  placeholder="Day"
                  placeholderTextColor={theme.textMuted}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.fieldLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                  Year (Gregorian)
                </Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: theme.surfaceVariant, color: theme.text, borderColor: theme.divider }]}
                  value={gcYear}
                  onChangeText={setGcYear}
                  keyboardType="numeric"
                  placeholder="2026"
                  placeholderTextColor={theme.textMuted}
                />
              </View>
            </View>

            {gcError && (
              <View style={styles.errorBox}>
                <AlertCircle size={15} color={theme.crimson} style={{ marginRight: 6 }} />
                <Text style={[styles.errorText, { color: theme.crimson, fontSize: fontScale.caption }]}>
                  {gcError}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.primaryConvertBtn, { backgroundColor: theme.primary }]}
              onPress={handleConvertGcToEth}
            >
              <ArrowLeftRight size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={[styles.primaryConvertText, { fontSize: fontScale.body }]}>
                {t('convertAction')}
              </Text>
            </TouchableOpacity>

            {gcResult && (
              <View style={[styles.resultBox, { backgroundColor: theme.goldLight, borderColor: theme.goldBorder }]}>
                <Text style={[styles.resultHeading, { color: theme.gold, fontSize: fontScale.caption }]}>
                  {t('conversionResult')}
                </Text>
                <Text style={[styles.resultValueText, { color: theme.text, fontSize: fontScale.body }]}>
                  {gcResult}
                </Text>

                <View style={styles.resultActionsRow}>
                  <TouchableOpacity
                    style={[styles.resultActionBtn, { borderColor: theme.goldBorder }]}
                    onPress={() => copyToClipboard(gcResult, 'gc')}
                  >
                    {copiedKey === 'gc' ? (
                      <Check size={14} color={theme.primary} style={{ marginRight: 4 }} />
                    ) : (
                      <Copy size={14} color={theme.gold} style={{ marginRight: 4 }} />
                    )}
                    <Text style={[styles.resultActionText, { color: theme.gold, fontSize: fontScale.caption }]}>
                      {copiedKey === 'gc' ? t('copiedAlert') : t('copyResult')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.resultActionBtn, { borderColor: theme.goldBorder }]}
                    onPress={() => shareConversion(gcResult)}
                  >
                    <Share2 size={14} color={theme.gold} style={{ marginRight: 4 }} />
                    <Text style={[styles.resultActionText, { color: theme.gold, fontSize: fontScale.caption }]}>
                      {t('shareResult')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ManuscriptCard>
        )}

        {/* ================= TAB 3: GE'EZ NUMERALS CONVERTER ================= */}
        {activeTab === 'geezNumbers' && (
          <View>
            {/* Arabic to Geez */}
            <ManuscriptCard title={t('toGeezBtn')} icon="፩">
              <Text style={[styles.fieldLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                {t('arabicNumberInput')}
              </Text>
              <View style={styles.inputsDualRow}>
                <TextInput
                  style={[styles.textInput, { flex: 1, backgroundColor: theme.surfaceVariant, color: theme.text, borderColor: theme.divider }]}
                  value={arabicInput}
                  onChangeText={setArabicInput}
                  keyboardType="numeric"
                  placeholder="2018"
                  placeholderTextColor={theme.textMuted}
                />
                <TouchableOpacity
                  style={[styles.inlineActionBtn, { backgroundColor: theme.primary }]}
                  onPress={handleArabicToGeez}
                >
                  <Text style={[styles.inlineActionText, { color: '#FFFFFF', fontSize: fontScale.caption }]}>
                    {t('convertAction')}
                  </Text>
                </TouchableOpacity>
              </View>

              {geezOutput && (
                <View style={[styles.geezResultCard, { backgroundColor: theme.goldLight, borderColor: theme.goldBorder }]}>
                  <Text style={[styles.geezResultBig, { color: theme.gold }]}>
                    {geezOutput}
                  </Text>
                  <TouchableOpacity
                    style={[styles.miniCopyBtn, { borderColor: theme.goldBorder }]}
                    onPress={() => copyToClipboard(geezOutput, 'geezOut')}
                  >
                    <Copy size={13} color={theme.gold} style={{ marginRight: 4 }} />
                    <Text style={[styles.miniCopyText, { color: theme.gold, fontSize: fontScale.caption }]}>
                      {copiedKey === 'geezOut' ? t('copiedAlert') : t('copyText')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ManuscriptCard>

            {/* Geez to Arabic */}
            <ManuscriptCard title={t('toArabicBtn')} icon="🔢">
              <Text style={[styles.fieldLabel, { color: theme.textSecondary, fontSize: fontScale.caption }]}>
                {t('geezNumberInput')}
              </Text>
              <View style={styles.inputsDualRow}>
                <TextInput
                  style={[styles.textInput, { flex: 1, backgroundColor: theme.surfaceVariant, color: theme.text, borderColor: theme.divider }]}
                  value={geezInput}
                  onChangeText={setGeezInput}
                  placeholder="፳፻፲፰"
                  placeholderTextColor={theme.textMuted}
                />
                <TouchableOpacity
                  style={[styles.inlineActionBtn, { backgroundColor: theme.primary }]}
                  onPress={handleGeezToArabic}
                >
                  <Text style={[styles.inlineActionText, { color: '#FFFFFF', fontSize: fontScale.caption }]}>
                    {t('convertAction')}
                  </Text>
                </TouchableOpacity>
              </View>

              {geezError && (
                <View style={styles.errorBox}>
                  <AlertCircle size={15} color={theme.crimson} style={{ marginRight: 6 }} />
                  <Text style={[styles.errorText, { color: theme.crimson, fontSize: fontScale.caption }]}>
                    {geezError}
                  </Text>
                </View>
              )}

              {arabicOutput && (
                <View style={[styles.geezResultCard, { backgroundColor: theme.goldLight, borderColor: theme.goldBorder }]}>
                  <Text style={[styles.arabicResultBig, { color: theme.text }]}>
                    {arabicOutput}
                  </Text>
                  <TouchableOpacity
                    style={[styles.miniCopyBtn, { borderColor: theme.goldBorder }]}
                    onPress={() => copyToClipboard(arabicOutput, 'arabOut')}
                  >
                    <Copy size={13} color={theme.gold} style={{ marginRight: 4 }} />
                    <Text style={[styles.miniCopyText, { color: theme.gold, fontSize: fontScale.caption }]}>
                      {copiedKey === 'arabOut' ? t('copiedAlert') : t('copyText')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ManuscriptCard>
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
  formRow: {
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontWeight: '700',
    marginBottom: 6,
  },
  miniMonthScroll: {
    flexDirection: 'row',
  },
  miniMonthPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 6,
  },
  miniMonthText: {},
  inputsDualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textInput: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inlineActionBtn: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  inlineActionText: {
    fontWeight: '700',
  },
  primaryConvertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 14,
  },
  primaryConvertText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    fontWeight: '600',
  },
  resultBox: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
    marginTop: 8,
  },
  resultHeading: {
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  resultValueText: {
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 10,
  },
  resultActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resultActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
  },
  resultActionText: {
    fontWeight: '700',
  },
  geezResultCard: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  geezResultBig: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
  },
  arabicResultBig: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  miniCopyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  miniCopyText: {
    fontWeight: '700',
  },
});
