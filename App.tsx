import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Header } from './src/components/Header';
import { StatCards } from './src/components/StatCards';
import { SearchBar } from './src/components/SearchBar';
import { CategoryFilter, FilterType } from './src/components/CategoryFilter';
import { CourseItem } from './src/components/CourseItem';
import { BottomNav } from './src/components/BottomNav';

import { AppIcon } from './src/components/AppIcon';
import { mockCourses, mockStats, mockStudent } from './src/data/mockData';
import { darkTheme, lightTheme } from './src/theme';
import { TabType } from './src/types';

function MainApp() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    systemColorScheme === 'dark'
  );
  const [searchText, setSearchText] = useState<string>('');
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const insets = useSafeAreaInsets();
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Filter courses based on search text and category filter
  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      // 1. Text search filter
      const matchesSearch =
        course.name.toLowerCase().includes(searchText.toLowerCase()) ||
        course.code.toLowerCase().includes(searchText.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchText.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Category filter
      if (currentFilter === 'ongoing') {
        return course.progress < 100;
      }
      if (currentFilter === 'completed') {
        return course.progress === 100;
      }
      return true;
    });
  }, [searchText, currentFilter]);

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: mockCourses.length,
      ongoing: mockCourses.filter((c) => c.progress < 100).length,
      completed: mockCourses.filter((c) => c.progress === 100).length,
    };
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  // Header element inside FlatList for smooth scrolling
  const renderListHeader = () => (
    <View>
      {/* a. Header section with student info & actions */}
      <Header
        student={mockStudent}
        theme={theme}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* b. Statistics section with 3 cards */}
      <StatCards
        stats={mockStats}
        theme={theme}
        onSelectStat={(stat) => {
          if (stat.id === '3') {
            setCurrentFilter('completed');
          } else if (stat.id === '1') {
            setCurrentFilter('all');
          }
        }}
      />

      {/* c. Search Bar */}
      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        onClear={handleClearSearch}
        resultCount={filteredCourses.length}
        theme={theme}
      />

      {/* Category Filter Chips */}
      <CategoryFilter
        currentFilter={currentFilter}
        onSelectFilter={setCurrentFilter}
        counts={counts}
        theme={theme}
      />

      {/* Section Header for Course List */}
      <View style={styles.courseSectionHeader}>
        <View style={styles.titleWithBadge}>
          <Text style={[styles.courseSectionTitle, { color: theme.textPrimary }]}>
            Danh sách môn học
          </Text>
          <View style={[styles.courseCountBadge, { backgroundColor: theme.primaryLight }]}>
            <Text style={[styles.courseCountText, { color: theme.primary }]}>
              {filteredCourses.length}
            </Text>
          </View>
        </View>

        {currentFilter !== 'all' && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCurrentFilter('all')}
          >
            <Text style={[styles.resetFilterText, { color: theme.primary }]}>
              Xem tất cả
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // Empty state when no courses match search
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconWrapper, { backgroundColor: theme.inputBg }]}>
        <AppIcon name="search-x" size={36} color={theme.textMuted} strokeWidth={1.75} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
        Không tìm thấy môn học
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        Không có kết quả nào khớp với "{searchText}". Vui lòng thử từ khóa khác.
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleClearSearch}
        style={[styles.emptyButton, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.emptyButtonText}>Xóa bộ lọc tìm kiếm</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* d. Danh sách môn học sử dụng FlatList (Yêu cầu nâng cao) */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseItem course={item} theme={theme} />}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      />

      {/* e. Thanh điều hướng phía dưới (Bottom Navigation) */}
      <View
        style={[
          styles.bottomNavWrapper,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom - 4 : 8,
            backgroundColor: theme.bottomNavBg,
          },
        ]}
      >
        <BottomNav
          currentTab={activeTab}
          onTabChange={setActiveTab}
          theme={theme}
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  courseSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 12,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  courseCountBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  courseCountText: {
    fontSize: 12,
    fontWeight: '700',
  },
  resetFilterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    paddingHorizontal: 32,
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  emptyButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
});
