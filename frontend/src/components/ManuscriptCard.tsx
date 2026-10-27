import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useApp } from '../context/AppContext';

interface ManuscriptCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeType?: 'fasting' | 'feast' | 'gold' | 'default';
  style?: ViewStyle;
  icon?: string;
}

export const ManuscriptCard: React.FC<ManuscriptCardProps> = ({
  children,
  title,
  subtitle,
  badge,
  badgeType = 'default',
  style,
  icon,
}) => {
  const { theme, fontScale } = useApp();

  const getBadgeColors = () => {
    switch (badgeType) {
      case 'fasting':
        return { bg: theme.fastingBadge, text: theme.fastingText };
      case 'feast':
        return { bg: theme.feastBadge, text: theme.feastText };
      case 'gold':
        return { bg: theme.goldLight, text: theme.gold };
      default:
        return { bg: theme.surfaceVariant, text: theme.textSecondary };
    }
  };

  const badgeColors = getBadgeColors();

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
        },
        style,
      ]}
    >
      {/* Corner cross accents */}
      <Text style={[styles.cornerCross, styles.crossTL, { color: theme.gold }]}>†</Text>
      <Text style={[styles.cornerCross, styles.crossTR, { color: theme.gold }]}>†</Text>
      <Text style={[styles.cornerCross, styles.crossBL, { color: theme.gold }]}>†</Text>
      <Text style={[styles.cornerCross, styles.crossBR, { color: theme.gold }]}>†</Text>

      {/* Header if title or badge provided */}
      {(title || badge) && (
        <View style={[styles.cardHeader, { borderBottomColor: theme.divider }]}>
          <View style={styles.headerLeft}>
            {icon ? <Text style={styles.headerIcon}>{icon}</Text> : null}
            <View>
              {title && (
                <Text
                  style={[
                    styles.cardTitle,
                    { color: theme.text, fontSize: fontScale.header },
                  ]}
                >
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text
                  style={[
                    styles.cardSubtitle,
                    { color: theme.textSecondary, fontSize: fontScale.caption },
                  ]}
                >
                  {subtitle}
                </Text>
              )}
            </View>
          </View>

          {badge && (
            <View style={[styles.badge, { backgroundColor: badgeColors.bg }]}>
              <Text
                style={[
                  styles.badgeText,
                  { color: badgeColors.text, fontSize: fontScale.badge },
                ]}
              >
                {badge}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Card Body */}
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  cornerCross: {
    position: 'absolute',
    fontSize: 10,
    opacity: 0.45,
  },
  crossTL: { top: 4, left: 6 },
  crossTR: { top: 4, right: 6 },
  crossBL: { bottom: 4, left: 6 },
  crossBR: { bottom: 4, right: 6 },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  cardTitle: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  cardSubtitle: {
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 8,
  },
  badgeText: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  cardBody: {
    width: '100%',
  },
});
