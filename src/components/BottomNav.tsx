import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from './AppIcon';
import { TabType } from '../types';
import { Theme } from '../theme';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  theme: Theme;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Trang chủ', icon: 'home' },
  { id: 'courses', label: 'Môn học', icon: 'book-open' },
  { id: 'assignments', label: 'Bài tập', icon: 'clipboard-list', badge: 4 },
  { id: 'profile', label: 'Cá nhân', icon: 'user' },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  theme,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.bottomNavBg,
          borderTopColor: theme.bottomNavBorder,
        },
      ]}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => onTabChange(item.id)}
            style={styles.tabButton}
          >
            <View style={styles.iconContainer}>
              <AppIcon
                name={item.icon}
                size={22}
                color={isActive ? theme.primary : theme.textMuted}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {item.badge && item.badge > 0 && (
                <View style={[styles.badge, { backgroundColor: theme.danger }]}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </View>

            <Text
              style={[
                styles.tabLabel,
                {
                  color: isActive ? theme.primary : theme.textSecondary,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {item.label}
            </Text>

            {/* Active indicator dot */}
            {isActive && (
              <View
                style={[styles.activeIndicator, { backgroundColor: theme.primary }]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    position: 'relative',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  tabIconActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  activeIndicator: {
    width: 16,
    height: 3,
    borderRadius: 1.5,
    marginTop: 3,
  },
});
