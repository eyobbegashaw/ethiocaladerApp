export interface ThemeColors {
  background: string;
  surface: string;
  surfaceVariant: string;
  card: string;
  cardBorder: string;
  primary: string;
  primaryDark: string;
  gold: string;
  goldLight: string;
  goldBorder: string;
  accent: string;
  crimson: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  divider: string;
  fastingBadge: string;
  fastingText: string;
  feastBadge: string;
  feastText: string;
  headerBackground: string;
  headerText: string;
  navBackground: string;
  navActive: string;
  navInactive: string;
  crossAccent: string;
}

export const lightTheme: ThemeColors = {
  background: '#FAF7F2',
  surface: '#FFFFFF',
  surfaceVariant: '#F3EDE4',
  card: '#FFFFFF',
  cardBorder: '#E5DCce',
  primary: '#183B36',
  primaryDark: '#0E2723',
  gold: '#B38A2B',
  goldLight: '#FBF6EA',
  goldBorder: '#D8B868',
  accent: '#265C53',
  crimson: '#8B1E1E',
  text: '#1C2623',
  textSecondary: '#4A5B56',
  textMuted: '#7E8F8A',
  border: '#E8E1D5',
  divider: '#EFEAE0',
  fastingBadge: '#EBF4F2',
  fastingText: '#183B36',
  feastBadge: '#FBF4DC',
  feastText: '#875F11',
  headerBackground: '#183B36',
  headerText: '#FAF7F2',
  navBackground: '#FFFFFF',
  navActive: '#183B36',
  navInactive: '#8A9995',
  crossAccent: '#C5A059',
};

export const darkTheme: ThemeColors = {
  background: '#0F1A17',
  surface: '#152420',
  surfaceVariant: '#1D302B',
  card: '#162622',
  cardBorder: '#273C36',
  primary: '#245E53',
  primaryDark: '#0B1714',
  gold: '#D6AE47',
  goldLight: '#262315',
  goldBorder: '#997B28',
  accent: '#3C8476',
  crimson: '#A83232',
  text: '#F2F6F5',
  textSecondary: '#A9BDB8',
  textMuted: '#68807A',
  border: '#233732',
  divider: '#1C2B27',
  fastingBadge: '#17362E',
  fastingText: '#68C4AF',
  feastBadge: '#382D12',
  feastText: '#F0C766',
  headerBackground: '#12221E',
  headerText: '#F2F6F5',
  navBackground: '#13211D',
  navActive: '#D6AE47',
  navInactive: '#6E8580',
  crossAccent: '#D6AE47',
};

export type FontSizeOption = 'small' | 'medium' | 'large' | 'xlarge';

export interface FontScale {
  title: number;
  subtitle: number;
  header: number;
  body: number;
  bodySmall: number;
  caption: number;
  badge: number;
  ethiopianNumeral: number;
}

export const fontScales: Record<FontSizeOption, FontScale> = {
  small: {
    title: 20,
    subtitle: 16,
    header: 14,
    body: 13,
    bodySmall: 11,
    caption: 10,
    badge: 10,
    ethiopianNumeral: 16,
  },
  medium: {
    title: 23,
    subtitle: 18,
    header: 16,
    body: 15,
    bodySmall: 13,
    caption: 11,
    badge: 11,
    ethiopianNumeral: 18,
  },
  large: {
    title: 26,
    subtitle: 20,
    header: 18,
    body: 17,
    bodySmall: 15,
    caption: 13,
    badge: 12,
    ethiopianNumeral: 21,
  },
  xlarge: {
    title: 29,
    subtitle: 22,
    header: 20,
    body: 19,
    bodySmall: 17,
    caption: 14,
    badge: 13,
    ethiopianNumeral: 24,
  },
};
