import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from './AppIcon';
import { StatItem } from '../types';
import { Theme } from '../theme';

interface StatCardsProps {
  stats: StatItem[];
  theme: Theme;
  onSelectStat?: (stat: StatItem) => void;
}

export const StatCards: React.FC<StatCardsProps> = ({
  stats,
  theme,
  onSelectStat,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Tổng quan học tập
        </Text>
        <Text style={[styles.termBadge, { color: theme.primary, backgroundColor: theme.primaryLight }]}>
          HK2 2025-2026
        </Text>
      </View>

      <View style={styles.cardsRow}>
        {stats.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => onSelectStat && onSelectStat(item)}
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              theme.cardShadow,
            ]}
          >
            {/* Top row with icon badge */}
            <View style={[styles.iconWrapper, { backgroundColor: item.bgColor }]}>
              <AppIcon name={item.icon} size={18} color={item.color} strokeWidth={2.2} />
            </View>

            {/* Stat Value */}
            <Text style={[styles.statValue, { color: item.color }]}>
              {item.value}
            </Text>

            {/* Stat Title */}
            <Text
              style={[styles.statTitle, { color: theme.textPrimary }]}
              numberOfLines={1}
            >
              {item.title}
            </Text>

            {/* Subtitle / Note */}
            <Text
              style={[styles.statSubtitle, { color: theme.textSecondary }]}
              numberOfLines={1}
            >
              {item.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  termBadge: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  card: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 18,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 26,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  statSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
});
