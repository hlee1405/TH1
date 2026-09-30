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
import { Course } from '../types';
import { Theme } from '../theme';

interface CourseItemProps {
  course: Course;
  theme: Theme;
  onPress?: (course: Course) => void;
}

export const CourseItem: React.FC<CourseItemProps> = ({
  course,
  theme,
  onPress,
}) => {
  const isCompleted = course.progress === 100;

  const handlePress = () => {
    if (onPress) {
      onPress(course);
      return;
    }

    Alert.alert(
      course.name,
      `Mã môn: ${course.code}\nGiảng viên: ${course.instructor}\nSố tín chỉ: ${course.credits}\nTiến độ: ${course.completedLessons}/${course.totalLessons} bài học (${course.progress}%)\nTrạng thái: ${
        isCompleted ? 'Đã hoàn thành xuất sắc' : 'Đang trong quá trình học'
      }`,
      [
        { text: 'Đóng', style: 'cancel' },
        {
          text: 'Vào bài học',
          onPress: () => {
            Alert.alert('Thông báo', `Đang mở môn học: ${course.name}`);
          },
        },
      ]
    );
  };

  const progressColor = isCompleted
    ? theme.success
    : course.progress > 50
    ? theme.primary
    : theme.warning;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handlePress}
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: isCompleted ? theme.success : theme.border,
        },
        theme.cardShadow,
      ]}
    >
      {/* Top row: Code + Credits and Status Badge */}
      <View style={styles.topRow}>
        <View style={styles.codeRow}>
          <View style={[styles.codeBadge, { backgroundColor: theme.primaryLight }]}>
            <Text style={[styles.codeText, { color: theme.primary }]}>
              {course.code}
            </Text>
          </View>
          <Text style={[styles.creditsText, { color: theme.textSecondary }]}>
            • {course.credits} Tín chỉ
          </Text>
        </View>

        {/* Status Tag */}
        {isCompleted ? (
          <View style={[styles.statusBadge, { backgroundColor: theme.successLight }]}>
            <AppIcon name="check" size={12} color={theme.success} strokeWidth={2.5} />
            <Text style={[styles.statusText, { color: theme.success }]}>
              Đã hoàn thành
            </Text>
          </View>
        ) : (
          <View style={[styles.statusBadge, { backgroundColor: theme.inputBg }]}>
            <AppIcon name="clock" size={11} color={theme.textSecondary} strokeWidth={2} />
            <Text style={[styles.statusText, { color: theme.textSecondary }]}>
              Đang học
            </Text>
          </View>
        )}
      </View>

      {/* Main Content: Thumbnail image + Info */}
      <View style={styles.contentRow}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: course.imageUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <View style={[styles.iconOverlay, { backgroundColor: course.bgLight }]}>
            <AppIcon name={course.icon} size={13} color={course.color} strokeWidth={2.2} />
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text
            style={[styles.courseName, { color: theme.textPrimary }]}
            numberOfLines={2}
          >
            {course.name}
          </Text>
          <View style={styles.metaRow}>
            <AppIcon name="teacher" size={13} color={theme.textSecondary} strokeWidth={2} />
            <Text
              style={[styles.instructorText, { color: theme.textSecondary }]}
              numberOfLines={1}
            >
              {course.instructor}
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLabelRow}>
          <View style={styles.metaRow}>
            <AppIcon name="book-open" size={12} color={theme.textSecondary} strokeWidth={2} />
            <Text style={[styles.lessonCountText, { color: theme.textSecondary }]}>
              Bài học: {course.completedLessons}/{course.totalLessons} bài
            </Text>
          </View>
          <Text style={[styles.percentageText, { color: progressColor }]}>
            {course.progress}%
          </Text>
        </View>

        {/* Progress Bar Track and Indicator */}
        <View style={[styles.progressTrack, { backgroundColor: theme.inputBg }]}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${course.progress}%`,
                backgroundColor: progressColor,
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  creditsText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  imageContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  courseIconText: {
    fontSize: 12,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  courseName: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 4,
  },
  instructorText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 2,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  lessonCountText: {
    fontSize: 12,
    fontWeight: '500',
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});
