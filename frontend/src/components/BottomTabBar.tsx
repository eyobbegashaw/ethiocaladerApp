import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useApp, MainTab } from '../context/AppContext';
import { Home, Calendar as CalendarIcon, BookOpen, Heart, User } from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const { theme, fontScale, activeTab, setActiveTab, t, favorites, closeSecondaryTool } = useApp();

  const tabs: { key: MainTab; label: string; icon: (color: string, size: number) => React.ReactNode }[] = [
    {
      key: 'home',
      label: t('navHome'),
      icon: (color, size) => <Home size={size} color={color} />,
    },
    {
      key: 'calendar',
      label: t('navCalendar'),
      icon: (color, size) => <CalendarIcon size={size} color={color} />,
    },
    {
      key: 'spiritual',
      label: t('navSpiritual'),
      icon: (color, size) => <BookOpen size={size} color={color} />,
    },
    {
      key: 'favorites',
      label: t('navFavorites'),
      icon: (color, size) => <Heart size={size} color={color} />,
    },
    {
      key: 'profile',
      label: t('navProfile'),
      icon: (color, size) => <User size={size} color={color} />,
    },
  ];

  const handleTabPress = (tabKey: MainTab) => {
    closeSecondaryTool();
    setActiveTab(tabKey);
  };

  return (
    <View
      style={[
        styles.barContainer,
        {
          backgroundColor: theme.navBackground,
          borderTopColor: theme.cardBorder,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const color = isActive ? theme.navActive : theme.navInactive;
        const showBadge = tab.key === 'favorites' && favorites.length > 0;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.key)}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            {/* Active top pill indicator */}
            {isActive && (
              <View style={[styles.activePill, { backgroundColor: theme.gold }]} />
            )}

            <View style={styles.iconWrapper}>
              {tab.icon(color, 22)}
              {showBadge && (
                <View style={[styles.badge, { backgroundColor: theme.crimson }]}>
                  <Text style={styles.badgeText}>
                    {favorites.length > 9 ? '9+' : favorites.length}
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={[
                styles.tabLabel,
                {
                  color,
                  fontSize: fontScale.badge,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 82 : 62,
    paddingBottom: Platform.OS === 'ios' ? 24 : 6,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 6,
  },
  activePill: {
    position: 'absolute',
    top: 0,
    width: 28,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 3,
  },
  tabLabel: {
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
});
