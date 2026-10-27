import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import { AppProvider, useApp } from './context/AppContext';
import { MobileHeader } from './components/MobileHeader';
import { BottomTabBar } from './components/BottomTabBar';
import { DrawerMenu } from './components/DrawerMenu';
import { HomeScreen } from './screens/HomeScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { SpiritualScreen } from './screens/SpiritualScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ConverterScreen } from './screens/ConverterScreen';
import { FastingScreen } from './screens/FastingScreen';
import { AboutScreen } from './screens/AboutScreen';

const MainNavigator: React.FC = () => {
  const {
    theme,
    isDark,
    activeTab,
    secondaryTool,
    closeSecondaryTool,
    t,
  } = useApp();

  const renderCurrentScreen = () => {
    // If a secondary tool (drawer item) is active, show it with back button
    if (secondaryTool === 'converter') {
      return <ConverterScreen />;
    }
    if (secondaryTool === 'fasting') {
      return <FastingScreen />;
    }
    if (secondaryTool === 'bahre-hasab') {
      return <SpiritualScreen />;
    }
    if (secondaryTool === 'about') {
      return <AboutScreen />;
    }

    // Otherwise render active tab
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'spiritual':
        return <SpiritualScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const getHeaderTitle = () => {
    if (secondaryTool === 'converter') return t('menuConverter');
    if (secondaryTool === 'fasting') return t('menuFasting');
    if (secondaryTool === 'bahre-hasab') return t('menuBahreHasab');
    if (secondaryTool === 'about') return t('menuAbout');

    switch (activeTab) {
      case 'home':
        return t('appName');
      case 'calendar':
        return t('monthCalendar');
      case 'spiritual':
        return t('navSpiritual');
      case 'favorites':
        return t('favoritesTitle');
      case 'profile':
        return t('profileTitle');
      default:
        return t('appName');
    }
  };

  return (
    <SafeAreaView style={[styles.rootContainer, { backgroundColor: theme.headerBackground }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'light-content'}
        backgroundColor={theme.headerBackground}
      />

      {/* Mobile Top Header */}
      <MobileHeader
        title={getHeaderTitle()}
        showBack={Boolean(secondaryTool)}
        onBack={closeSecondaryTool}
      />

      {/* Main Screen Body */}
      <View style={[styles.screenBody, { backgroundColor: theme.background }]}>
        {renderCurrentScreen()}
      </View>

      {/* Bottom Tab Bar */}
      <BottomTabBar />

      {/* Drawer Menu Modal */}
      <DrawerMenu />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainNavigator />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    ...(Platform.OS === 'web'
      ? {
          maxWidth: 600,
          marginHorizontal: 'auto',
          boxShadow: '0 0 24px rgba(0,0,0,0.18)',
        }
      : {}),
  },
  screenBody: {
    flex: 1,
  },
});
