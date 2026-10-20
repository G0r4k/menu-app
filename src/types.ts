export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  type: 'restaurant' | 'bar' | 'club';
  logo?: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  bgGradient: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
  headerFont: string;
  bodyFont: string;
  categoryStyle: string;
  itemStyle: string;
  badgeStyle: string;
  divider: string;
  overlay?: string;
}

export type ViewMode = 'setup' | 'preview';
