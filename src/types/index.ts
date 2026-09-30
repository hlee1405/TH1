export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  progress: number; // percentage 0 - 100
  credits: number;
  category: 'cntt' | 'da_phuong_tien' | 'an_toan' | 'co_so';
  icon: string;
  color: string;
  bgLight: string;
  imageUrl: string;
}

export interface StudentProfile {
  name: string;
  studentId: string;
  className: string;
  major: string;
  avatarUrl: string;
  unreadNotifications: number;
}

export interface StatItem {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
  bgColor: string;
}

export type TabType = 'home' | 'courses' | 'assignments' | 'profile';
