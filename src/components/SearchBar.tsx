import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppIcon } from './AppIcon';
import { Theme } from '../theme';

interface SearchBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  onClear: () => void;
  resultCount: number;
  theme: Theme;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchChange,
  onClear,
  resultCount,
  theme,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.inputBg,
            borderColor: searchText ? theme.primary : theme.border,
          },
        ]}
      >
        <AppIcon
          name="search"
          size={18}
          color={theme.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          value={searchText}
          onChangeText={onSearchChange}
          placeholder="Tìm môn học, mã môn (vd: INT1434, Web...)"
          placeholderTextColor={theme.textMuted}
          style={[styles.input, { color: theme.textPrimary }]}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClear}
            style={[styles.clearButton, { backgroundColor: theme.textMuted }]}
          >
            <AppIcon name="x" size={12} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        )}
      </View>

      {searchText.length > 0 && (
        <View style={styles.resultInfoRow}>
          <Text style={[styles.resultCountText, { color: theme.textSecondary }]}>
            Tìm thấy{' '}
            <Text style={{ fontWeight: '700', color: theme.primary }}>
              {resultCount}
            </Text>{' '}
            kết quả cho "{searchText}"
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  clearText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  resultInfoRow: {
    marginTop: 6,
    paddingHorizontal: 4,
  },
  resultCountText: {
    fontSize: 12,
  },
});
