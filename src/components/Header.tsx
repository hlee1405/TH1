import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppIcon } from './AppIcon';
import { StudentProfile } from '../types';
import { Theme } from '../theme';

interface HeaderProps {
  student: StudentProfile;
  theme: Theme;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  theme,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const handleNotificationPress = () => {
    Alert.alert(
      'Thông báo mới',
      `Bạn có ${student.unreadNotifications} thông báo chưa đọc:\n- Hạn nộp bài tập React Native (23:59 hôm nay)\n- Điểm kiểm tra Cấu trúc dữ liệu đã được cập nhật\n- Lịch thi kết thúc học phần tuần tới`,
      [{ text: 'Đã hiểu' }]
    );
  };

  const handleAvatarPress = () => {
    Alert.alert(
      'Thông tin sinh viên',
      `Họ và tên: ${student.name}\nMSSV: ${student.studentId}\nLớp: ${student.className}\nChuyên ngành: ${student.major}`,
      [{ text: 'Đóng' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
      {/* User Info Section */}
      <View style={styles.leftSection}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAvatarPress}
          style={styles.avatarWrapper}
        >
          <Image
            source={{ uri: student.avatarUrl }}
            style={[styles.avatar, { borderColor: theme.primary }]}
            resizeMode="cover"
          />
          <View style={styles.onlineBadge} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={[styles.greetingText, { color: theme.textSecondary }]}>
            Xin chào,
          </Text>
          <Text style={[styles.nameText, { color: theme.textPrimary }]} numberOfLines={1}>
            {student.name}
          </Text>
          <View style={[styles.studentIdBadge, { backgroundColor: theme.primaryLight }]}>
            <Text style={[styles.studentIdText, { color: theme.primary }]}>
              {student.studentId} • {student.className}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons: Dark Mode Toggle & Notification */}
      <View style={styles.rightActions}>
        {/* Dark Mode Toggle Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleDarkMode}
          style={[styles.iconButton, { backgroundColor: theme.inputBg, borderColor: theme.border }]}
        >
          <AppIcon
            name={isDarkMode ? 'sun' : 'moon'}
            size={20}
            color={theme.textPrimary}
          />
        </TouchableOpacity>

        {/* Notification Bell Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNotificationPress}
          style={[styles.iconButton, { backgroundColor: theme.inputBg, borderColor: theme.border }]}
        >
          <AppIcon name="bell" size={20} color={theme.textPrimary} />
          {student.unreadNotifications > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.danger }]}>
              <Text style={styles.badgeText}>
                {student.unreadNotifications > 9 ? '9+' : student.unreadNotifications}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '500',
  },
  waveEmoji: {
    fontSize: 13,
  },
  nameText: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 1,
  },
  studentIdBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  studentIdText: {
    fontSize: 11,
    fontWeight: '600',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  actionIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
