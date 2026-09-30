import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Theme } from '../theme';

export type FilterType = 'all' | 'ongoing' | 'completed';

interface CategoryFilterProps {
  currentFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
  counts: {
    all: number;
    ongoing: number;
    completed: number;
  };
  theme: Theme;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  currentFilter,
  onSelectFilter,
  counts,
  theme,
}) => {
  const filters: { id: FilterType; label: string; count: number }[] = [
    { id: 'all', label: 'Tất cả', count: counts.all },
    { id: 'ongoing', label: 'Đang học', count: counts.ongoing },
    { id: 'completed', label: 'Đã hoàn thành', count: counts.completed },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((item) => {
          const isActive = currentFilter === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => onSelectFilter(item.id)}
              style={[
                styles.filterChip,
                {
                  backgroundColor: isActive ? theme.primary : theme.card,
                  borderColor: isActive ? theme.primary : theme.border,
                },
                !isActive && theme.cardShadow,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: isActive ? '#FFFFFF' : theme.textSecondary,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {item.label}
              </Text>
              <View
                style={[
                  styles.countPill,
                  {
                    backgroundColor: isActive
                      ? 'rgba(255, 255, 255, 0.25)'
                      : theme.inputBg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    {
                      color: isActive ? '#FFFFFF' : theme.textPrimary,
                    },
                  ]}
                >
                  {item.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 13,
  },
  countPill: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
