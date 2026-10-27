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
import { ETHIOPIAN_MONTHS_DATA, toEthNum } from '../calendar/calendarCore';
import { Heart, Trash2, Share2, Calendar as CalendarIcon, Bookmark } from 'lucide-react';

export const FavoritesScreen: React.FC = () => {
  const {
    theme,
    fontScale,
    favorites,
    clearFavorites,
    toggleFavorite,
    language,
    t,
    setActiveTab,
  } = useApp();

  const handleShareFavorite = async (item: any) => {
    const text = `♰ ${item.titleAmharic} ♰\n` +
      `${item.description ? `${item.description}\n` : ''}` +
      `${ETHIOPIAN_MONTHS_DATA[item.dateEth.month - 1].amharic} ${toEthNum(item.dateEth.day)}\n` +
      `ኢትዮጵያ ቀን መቁጠሪያ - Ethiopian Calendar`;

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: item.titleAmharic, text });
      } else {
        await Share.share({ message: text });
      }
    } catch (e) {
      console.warn('Share error:', e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header bar */}
      <View style={[styles.headerBar, { backgroundColor: theme.surface, borderBottomColor: theme.cardBorder }]}>
        <View style={styles.headerLeft}>
          <Heart size={20} color={theme.crimson} fill={theme.crimson} style={{ marginRight: 8 }} />
          <Text style={[styles.headerTitle, { color: theme.text, fontSize: fontScale.header }]}>
            {t('favoritesTitle')} ({favorites.length})
          </Text>
        </View>

        {favorites.length > 0 && (
          <TouchableOpacity
            style={[styles.clearBtn, { borderColor: theme.divider }]}
            onPress={clearFavorites}
          >
            <Trash2 size={14} color={theme.crimson} style={{ marginRight: 4 }} />
            <Text style={[styles.clearText, { color: theme.crimson, fontSize: fontScale.caption }]}>
              {t('clearAllFavorites')}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        {favorites.length === 0 ? (
          <View style={[styles.emptyContainer, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Bookmark size={44} color={theme.gold} style={{ marginBottom: 12, opacity: 0.6 }} />
            <Text style={[styles.emptyTitle, { color: theme.text, fontSize: fontScale.header }]}>
              {language === 'am' ? 'የተወደዱ ቀናት የሉም' : 'No Saved Favorites'}
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary, fontSize: fontScale.bodySmall }]}>
              {t('noFavoritesYet')}
            </Text>

            <TouchableOpacity
              style={[styles.exploreBtn, { backgroundColor: theme.primary }]}
              onPress={() => setActiveTab('calendar')}
            >
              <CalendarIcon size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={[styles.exploreBtnText, { fontSize: fontScale.bodySmall }]}>
                {t('exploreCalendar')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          favorites.map((fav) => {
            const mData = ETHIOPIAN_MONTHS_DATA[fav.dateEth.month - 1];
            return (
              <ManuscriptCard
                key={fav.id}
                title={fav.titleAmharic}
                subtitle={`${mData.amharic} ${toEthNum(fav.dateEth.day)} (${mData.english} ${fav.dateEth.day})`}
                badge={fav.type === 'feast' ? 'በዓል' : 'ቅዱሳን'}
                badgeType={fav.type === 'feast' ? 'feast' : 'gold'}
                icon="♰"
              >
                {fav.description && (
                  <Text style={[styles.favDesc, { color: theme.textSecondary, fontSize: fontScale.bodySmall }]}>
                    {fav.description}
                  </Text>
                )}

                {fav.note && (
                  <View style={[styles.noteBox, { backgroundColor: theme.surfaceVariant }]}>
                    <Text style={[styles.noteText, { color: theme.text, fontSize: fontScale.caption }]}>
                      📝 {fav.note}
                    </Text>
                  </View>
                )}

                <View style={styles.favActionsRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { borderColor: theme.divider }]}
                    onPress={() => handleShareFavorite(fav)}
                  >
                    <Share2 size={14} color={theme.gold} style={{ marginRight: 4 }} />
                    <Text style={[styles.actionBtnText, { color: theme.gold, fontSize: fontScale.caption }]}>
                      {t('shareText')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, { borderColor: theme.divider }]}
                    onPress={() =>
                      toggleFavorite({
                        type: fav.type,
                        titleAmharic: fav.titleAmharic,
                        titleEnglish: fav.titleEnglish,
                        dateEth: fav.dateEth,
                      })
                    }
                  >
                    <Trash2 size={14} color={theme.crimson} style={{ marginRight: 4 }} />
                    <Text style={[styles.actionBtnText, { color: theme.crimson, fontSize: fontScale.caption }]}>
                      {t('removeFromFavorites')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ManuscriptCard>
            );
          })
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '800',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  clearText: {
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontWeight: '800',
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  favDesc: {
    lineHeight: 18,
    marginBottom: 10,
  },
  noteBox: {
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  noteText: {
    fontStyle: 'italic',
  },
  favActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
  },
  actionBtnText: {
    fontWeight: '600',
  },
});
